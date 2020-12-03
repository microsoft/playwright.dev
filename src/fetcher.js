// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {CriticalSection} from './utils.js';
import {Store as IDBStore, get as idbGet, set as idbSet, keys as idbKeys, del as idbDel, clear as idbClear} from './third_party/idb-keyval.mjs';

// Bump version number whenever cache format changes.
const GITHUB_FETCHER_VERSION = 1;

// Github has rate limiting for it's API. We have to cache Github
// responses locally regardless of presence of ServiceWorker so that
// website is operational no matte what.
export class GithubFetcher {
  static async create() {
    const fetcher = new GithubFetcher(await isFirefoxPrivateBrowsingMode());
    const version = await fetcher._cache.get('GITHUB_FETCHER_VERSION');
    if (!version || version !== GITHUB_FETCHER_VERSION) {
      console.warn('Clearing GithubFetcher cache');
      await fetcher._cache.clear();
      await fetcher._cache.set('GITHUB_FETCHER_VERSION', GITHUB_FETCHER_VERSION);
    }
    // Sweep outdated cache items.
    const keys = (await fetcher._cache.keys()).filter(key => key !== 'GITHUB_FETCHER_VERSION');
    const now = Date.now();
    const isKeyOutdated = await Promise.all(keys.map(key => fetcher._cache.get(key).then(data => now - data.timestamp > data.maxAge)));
    const toBeRemoved = keys.filter((key, index) => isKeyOutdated[index]);
    await Promise.all(toBeRemoved.map(key => fetcher._cache.delete(key)));
    return fetcher;
  }

  constructor(useLocalStorage) {
    this._cache = {};
    this._criticalSection = new CriticalSection();
    if (useLocalStorage) {
      const LOCALSTORAGE_KEY_PREFIX = 'github-fetcher-';
      this._cache.set = async (key, value) => localStorage.setItem(LOCALSTORAGE_KEY_PREFIX + key, JSON.stringify(value));
      this._cache.get = async (key) => JSON.parse(localStorage.getItem( + key));
      this._cache.delete = async (key) => localStorage.removeItem(LOCALSTORAGE_KEY_PREFIX + key);
      this._cache.keys = async () => Object.keys(localStorage).filter(key => key.startsWith(LOCALSTORAGE_KEY_PREFIX)).map(key => key.substr(LOCALSTORAGE_KEY_PREFIX.length));
      this._cache.clear = async () => Object.keys(localStorage).filter(key => key.startsWith(LOCALSTORAGE_KEY_PREFIX)).forEach(key => localStorage.removeItem(key));
    } else {
      const store = new IDBStore('github-fetcher', 'request-cache')
      this._cache.set = async (key, value) => idbSet(key, value, store);
      this._cache.get = async (key) => idbGet(key, store);
      this._cache.delete = async (key) => idbDel(key, store);
      this._cache.keys = async () => idbKeys(store);
      this._cache.clear = async () => idbClear(store);
    }
  }

  async get(url, maxAge = 5 * 60 * 1000 /* 5 minutes */) {
    const CACHE_KEY = JSON.stringify({method: 'get', url});
    return await this._criticalSection.run(CACHE_KEY, async () => {
      const data = await this._cache.get(CACHE_KEY);
      if (data && Date.now() - data.timestamp < data.maxAge)
        return data.text;
      const response = await fetch(url);
      if (!response.ok) {
        // Save result as `null` and cache it for the next 10 minutes.
        // Otherwise we might keep flooding GH API and might eventually run out of quota.
        await this._cache.set(CACHE_KEY, {timestamp: Date.now(), maxAge: 10 * 60 * 1000, text: null});
        return null;
      }
      const text = await response.text();
      await this._cache.set(CACHE_KEY, {timestamp: Date.now(), maxAge, text});
      return text;
    });
  }
}

// See Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=781982
// And pptr.dev bug: https://github.com/GoogleChromeLabs/pptr.dev/issues/3
function isFirefoxPrivateBrowsingMode() {
  if (!('MozAppearance' in document.documentElement.style))
    return Promise.resolve(false);

  const db = indexedDB.open('test');
  return new Promise(resolve => {
    db.onerror = resolve.bind(null, true);
    db.onsuccess = resolve.bind(null, false);
  });
}


