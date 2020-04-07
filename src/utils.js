// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function onDOMEvent(target, event, handler, capturing = false) {
  target.addEventListener(event, handler, capturing);
  return () => target.removeEventListener(event, handler, capturing);
}

const listenersSymbol = Symbol('listeners');

export function createEvent() {
  const listeners = new Set();
  const subscribeFunction = listener => {
    listeners.add(listener);
    return () => listeners.remove(listener);
  }
  subscribeFunction[listenersSymbol] = listeners;
  return subscribeFunction;
}

export function emitEvent(event, ...args) {
  let listeners = event[listenersSymbol];
  if (!listeners || !listeners.size)
    return;
  listeners = new Set(listeners);
  for (const listener of listeners)
    listener.call(null, ...args);
}

export function disposeAll(disposables) {
  for (const d of disposables)
    d.call(null);
  disposables.splice(0);
}

export function consumeDOMEvent(event) {
  event.stopPropagation();
  event.preventDefault();
}

export function preventTextSelectionOnDBLClick(element) {
  // Prevent text selection on dblclick.
  element.addEventListener('mousedown', event => {
    if (event.detail > 1)
      consumeDOMEvent(event);
  }, true);
}

export function humanReadableTimeInterval(diff) {
  const intervals = [
    [1000, 'second'],
    [60, 'minute'],
    [60, 'hour'],
    [24, 'day'],
    [7, 'week'],
    [52, 'year'],
  ];
  let aggr = 1;
  let time = 'Just Now';
  for (let i = 0; i < intervals.length; ++i) {
    if (diff < aggr * intervals[i][0])
      break;
    aggr = aggr * intervals[i][0];
    time = intervals[i][1];
  }
  const fraction = Math.floor(diff / aggr);
  return aggr === 1 ? 'Just Now' :  fraction + ' ' + time + (fraction > 1 ? 's' : '');
}

export function scrollIntoViewIfNeeded(element) {
  window.scrollIntoView(element, {
    block: 'center',
    behavior: 'instant',
    scrollMode: 'if-needed',
  });
}

/**
 * Serializing async operations one-by-one.
 */
export class CriticalSection {
  constructor() {
    this._rollingPromises = new Map();
  }

  async run(key, operation) {
    const rollingPromise = this._rollingPromises.get(key) || Promise.resolve();
    const resultPromise = rollingPromise.then(() => operation());
    const newRollingPromise = resultPromise.finally(() => {
      if (this._rollingPromises.get(key) === newRollingPromise)
        this._rollingPromises.delete(key);
    }).catch(e => {/* swallow error */});
    this._rollingPromises.set(key, newRollingPromise);
    return resultPromise;
  }
}

export class Throttler {
  constructor(timeout = 0) {
    this._pendingOperation = null;
    this._runningOperation = null;
    this._abortController = null;
    this._timeout = timeout;
  }

  schedule(operation) {
    this._pendingOperation = operation;
    this._maybeRun();
  }

  reset() {
    this.schedule(null);
  }

  _maybeRun() {
    if (this._runningOperation || !this._pendingOperation) {
      if (this._abortController)
        this._abortController.abort();
      this._abortController = null;
      return;
    }
    const operation = this._pendingOperation;
    this._pendingOperation = null;
    this._abortController = new AbortController();
    this._runningOperation = Promise.resolve()
        .then(() => operation.call(null, {signal: this._abortController.signal}))
        .catch(e => console.error(e))
        .then(() => this._timeout ? new Promise(x => setTimeout(x, this._timeout)) : undefined)
        .then(() => {
          this._runningOperation = null;
          this._abortController = null;
          this._maybeRun();
        });
  }
}


