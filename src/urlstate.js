// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {Throttler, onDOMEvent, disposeAll} from './utils.js';

export function newURL(state) {
  const params = new URLSearchParams(Object.entries(state));
  return '#' + params.toString();
}

export class URLState {
  constructor() {
    this._currentStateURL = null;
    this._handler = null;
    this._eventListeners = [];
    this._throttler = new Throttler();
  }

  startListening(handler) {
    if (this._handler)
      throw new Error('already listening! is this called second time?');
    this._handler = handler;
    this._eventListeners = [
      onDOMEvent(window, 'popstate', () => this._checkStateChanged()),
    ];
    this._checkStateChanged();
  }

  stopListening() {
    this._handler = null;
    disposeAll(this._eventListeners);
  }

  goto(state) {
    const params = new URLSearchParams(Object.entries(state));
    const url = params.toString();
    window.history.pushState({}, '', '#' + url);
    this._checkStateChanged();
  }

  _checkStateChanged() {
    if (!this._handler)
      return;
    const params = new URLSearchParams(window.location.hash.substring(1));
    const currentStateURL = params.toString();
    const urlChanged = currentStateURL !== this._currentStateURL;
    this._currentStateURL = currentStateURL;
    this._throttler.schedule(async ({signal}) => {
      await this._handler.call(null, Object.fromEntries(params.entries()), {signal, urlChanged});
    });
  }
}
