/* eslint-disable no-undef */
const alert = document.getElementById('page-alert')
const closeBtn = document.getElementById('page-alert-btn-close')
if (alert !== null && closeBtn !== null) {
  const version = alert.getAttribute('data-page-alert-version') || 'unknown'
  const hideAlert = getSessionStorage(`page-alert-${version}`, null, 'functional') !== null
  if (hideAlert) {
    alert.classList.add('d-none')
  }

  closeBtn.addEventListener('click', () => {
    setSessionStorage(`page-alert-${version}`, 'seen', 'functional')
    alert.classList.add('d-none')
  })
}

;
function reveal () {
  const reveals = document.querySelectorAll('.reveal')

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight
    const elementTop = reveals[i].getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active')
      reveals[i].classList.remove('reveal')
    } else {
      reveals[i].classList.remove('active')
    }
  }
}

window.addEventListener('scroll', reveal)

;
/*
Source:
  - https://simplernerd.com/hugo-add-copy-to-clipboard-button/
*/

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>'
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

const addCopyButtons = (clipboard) => {
  // 1. Look for pre > code elements in the DOM
  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    // 2. Create a button that will trigger a copy operation
    const button = document.createElement('button')
    button.className = 'clipboard-button'
    button.setAttribute('data-toast-target', 'toast-copied-code-message')
    button.setAttribute('aria-label', 'copy to clipboard')
    button.type = 'button'
    button.innerHTML = svgCopy
    button.addEventListener('click', () => {
      const text = codeBlock.innerText.split('\n').filter(Boolean).join('\n')
      clipboard.writeText(text).then(
        () => {
          button.blur()
          button.innerHTML = svgCheck
          setTimeout(() => (button.innerHTML = svgCopy), 2000)
        },
        // eslint-disable-next-line n/handle-callback-err
        (error) => (button.innerHTML = 'Error')
      )
    })
    // 3. Append the button directly before the pre tag
    const pre = codeBlock.parentNode
    pre.parentNode.insertBefore(button, pre)
  })
}

if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard)
}

document.querySelectorAll('[data-clipboard]').forEach(trigger => {
  const text = trigger.getAttribute('data-clipboard')
  trigger.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
  })
})

;
const url = new URL(window.location.href)
const menu = url.searchParams.get('menu')
const child = url.searchParams.get('child')
const menuItems = document.querySelectorAll('[data-nav="main"]')

if (menu !== null) {
  menuItems.forEach(element => {
    element.classList.remove('active')
  })

  const targetMainItems = document.querySelectorAll(`[data-nav-main="${menu}"]:not([data-nav-child])`)
  targetMainItems.forEach(element => {
    element.classList.add('active')
  })

  const targetChildItems = document.querySelectorAll(`[data-nav-main="${menu}"][data-nav-child="${child}"]`)
  targetChildItems.forEach(element => {
    element.classList.add('active')
  })
}

;
document.addEventListener('hide.bs.modal', function (event) {
  // Remove the focus from the active element
  if (document.activeElement) {
    document.activeElement.blur()
  }
})

;
/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  /**
   * Properly escape IDs selectors to handle weird IDs
   * @param {string} selector
   * @returns {string}
   */
  const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  /**
   * Public Util API
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  const isElement$1 = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }
    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }
    return typeof object.nodeType !== 'undefined';
  };
  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement$1(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  const isVisible = element => {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    // Handle `details` element as its content may falsie appear visible when it is closed
    const closedDetails = element.closest('details:not([open])');
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest('summary');
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains('disabled')) {
      return true;
    }
    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }
    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  const noop = () => {};

  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */
  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };
  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }
    return null;
  };
  const DOMContentLoadedCallbacks = [];
  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  const isRTL = () => document.documentElement.dir === 'rtl';
  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === 'function' ? possibleCallback.call(...args) : defaultValue;
  };
  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);

    // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string';
    // TODO: tooltip passes `false` instead of selector, so we need to check
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }
  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');
      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === '' || value === 'null') {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement$1(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement$1(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const VERSION = '5.3.8';

  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    // Private
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');
    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
  };
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);

      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';

  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }

    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }

    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Alert, 'close');

  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }

    // Public
    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);
        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };

  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }

    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }

    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }

    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };

  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }

    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }

    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };

  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }

    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    }

    // Private
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  const applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  const arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }, getWindow(popper)) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  const eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  const flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  const hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref) {
          var name = _ref.name,
              _ref$options = _ref.options,
              options = _ref$options === void 0 ? {} : _ref$options,
              effect = _ref.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }
  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  const Popper = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    afterMain,
    afterRead,
    afterWrite,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    auto,
    basePlacements,
    beforeMain,
    beforeRead,
    beforeWrite,
    bottom,
    clippingParents,
    computeStyles: computeStyles$1,
    createPopper,
    createPopperBase: createPopper$2,
    createPopperLite: createPopper$1,
    detectOverflow,
    end,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    left,
    main,
    modifierPhases,
    offset: offset$1,
    placements,
    popper,
    popperGenerator,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1,
    read,
    reference,
    right,
    start,
    top,
    variationPlacements,
    viewport,
    write
  }, Symbol.toStringTag, { value: 'Module' }));

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };

  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }

    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }

    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org/docs/v2/)');
      }
      let referenceElement = this._element;
      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement$1(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }

      // We need to trim the value because custom properties can also include spaces
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display or Dropdown is in Navbar
      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
      if (!items.length) {
        return;
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        }

        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command

      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();

      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements
  };
  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };

  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }

    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of
  };
  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };

  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }

    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }

    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';

  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    // Public
    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, 'overflow');
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }

    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');
      this._element.style.overflow = 'hidden';
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement$1(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };

  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }

    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);

  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };

  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }

    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);

  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  // js-docs-start allow-list
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  // js-docs-end allow-list

  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

  /**
   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
   * contexts.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
   */
  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }

    // Check if a regular expression validates the attribute.
    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };

  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }

    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }

    // Public
    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = {
        ...this._config.content,
        ...content
      };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }
      return template;
    }

    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement$1(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [undefined, this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };

  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org/docs/v2/)');
      }
      super(element, config);

      // Private
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;

      // Protected
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }

    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }

    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute('aria-describedby');
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element, this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(' ');
      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[TRIGGER_CLICK] = !(context._isShown() && context._activeTrigger[TRIGGER_CLICK]);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = {
    ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }

    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }

    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };

  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);

      // this._element is the observablesContainer and config.target the menu links wrapper
      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    }

    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }

    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    }

    // The logic of selection
    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        // if we are scrolling down, pick the bigger offsetTop
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
          if (!parentScrollTop) {
            return;
          }
          continue;
        }

        // if we are scrolling up, pick the smallest offsetTop
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

        // ensure that the observableSection exists & is visible
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const HOME_KEY = 'Home';
  const END_KEY = 'End';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
        // TODO: should throw exception in v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      }

      // Set up initial aria attributes
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    // Getters
    static get NAME() {
      return NAME$1;
    }

    // Public
    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }

      // Search for active tab on same parent to deactivate it
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }

    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
      event.preventDefault();
      const children = this._getChildren().filter(element => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute('aria-selected', isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }
      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }
      this._setAttributeIfNotExists(child, 'role', 'tab');

      // set attributes to the related panel too
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);
        if (element) {
          element.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }

    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }

    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });

  /**
   * Initialize on focus
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };

  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }

    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }

    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private
    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Toast);

  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));
//# sourceMappingURL=bootstrap.bundle.js.map

;
/**!
 * FlexSearch.js v0.8.214 (Bundle)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self){'use strict';if(typeof module!=='undefined')self=module;else if(typeof process !== 'undefined')self=process;self._factory=_f;var w;function H(a,c,b){const e=typeof b,d=typeof a;if(e!=="undefined"){if(d!=="undefined"){if(b){if(d==="function"&&e===d)return function(k){return a(b(k))};c=a.constructor;if(c===b.constructor){if(c===Array)return b.concat(a);if(c===Map){var f=new Map(b);for(var g of a)f.set(g[0],g[1]);return f}if(c===Set){g=new Set(b);for(f of a.values())g.add(f);return g}}}return a}return b}return d==="undefined"?c:a}function aa(a,c){return typeof a==="undefined"?c:a}function I(){return Object.create(null)}
function M(a){return typeof a==="string"}function ba(a){return typeof a==="object"}function ca(a,c){if(M(c))a=a[c];else for(let b=0;a&&b<c.length;b++)a=a[c[b]];return a};const ea=/[^\p{L}\p{N}]+/u,fa=/(\d{3})/g,ha=/(\D)(\d{3})/g,ia=/(\d{3})(\D)/g,ja=/[\u0300-\u036f]/g;function ka(a={}){if(!this||this.constructor!==ka)return new ka(...arguments);if(arguments.length)for(a=0;a<arguments.length;a++)this.assign(arguments[a]);else this.assign(a)}w=ka.prototype;
w.assign=function(a){this.normalize=H(a.normalize,!0,this.normalize);let c=a.include,b=c||a.exclude||a.split,e;if(b||b===""){if(typeof b==="object"&&b.constructor!==RegExp){let d="";e=!c;c||(d+="\\p{Z}");b.letter&&(d+="\\p{L}");b.number&&(d+="\\p{N}",e=!!c);b.symbol&&(d+="\\p{S}");b.punctuation&&(d+="\\p{P}");b.control&&(d+="\\p{C}");if(b=b.char)d+=typeof b==="object"?b.join(""):b;try{this.split=new RegExp("["+(c?"^":"")+d+"]+","u")}catch(f){this.split=/\s+/}}else this.split=b,e=b===!1||"a1a".split(b).length<
2;this.numeric=H(a.numeric,e)}else{try{this.split=H(this.split,ea)}catch(d){this.split=/\s+/}this.numeric=H(a.numeric,H(this.numeric,!0))}this.prepare=H(a.prepare,null,this.prepare);this.finalize=H(a.finalize,null,this.finalize);b=a.filter;this.filter=typeof b==="function"?b:H(b&&new Set(b),null,this.filter);this.dedupe=H(a.dedupe,!0,this.dedupe);this.matcher=H((b=a.matcher)&&new Map(b),null,this.matcher);this.mapper=H((b=a.mapper)&&new Map(b),null,this.mapper);this.stemmer=H((b=a.stemmer)&&new Map(b),
null,this.stemmer);this.replacer=H(a.replacer,null,this.replacer);this.minlength=H(a.minlength,1,this.minlength);this.maxlength=H(a.maxlength,1024,this.maxlength);this.rtl=H(a.rtl,!1,this.rtl);if(this.cache=b=H(a.cache,!0,this.cache))this.F=null,this.L=typeof b==="number"?b:2E5,this.B=new Map,this.D=new Map,this.I=this.H=128;this.h="";this.J=null;this.A="";this.K=null;if(this.matcher)for(const d of this.matcher.keys())this.h+=(this.h?"|":"")+d;if(this.stemmer)for(const d of this.stemmer.keys())this.A+=
(this.A?"|":"")+d;return this};w.addStemmer=function(a,c){this.stemmer||(this.stemmer=new Map);this.stemmer.set(a,c);this.A+=(this.A?"|":"")+a;this.K=null;this.cache&&Q(this);return this};w.addFilter=function(a){typeof a==="function"?this.filter=a:(this.filter||(this.filter=new Set),this.filter.add(a));this.cache&&Q(this);return this};
w.addMapper=function(a,c){if(typeof a==="object")return this.addReplacer(a,c);if(a.length>1)return this.addMatcher(a,c);this.mapper||(this.mapper=new Map);this.mapper.set(a,c);this.cache&&Q(this);return this};w.addMatcher=function(a,c){if(typeof a==="object")return this.addReplacer(a,c);if(a.length<2&&(this.dedupe||this.mapper))return this.addMapper(a,c);this.matcher||(this.matcher=new Map);this.matcher.set(a,c);this.h+=(this.h?"|":"")+a;this.J=null;this.cache&&Q(this);return this};
w.addReplacer=function(a,c){if(typeof a==="string")return this.addMatcher(a,c);this.replacer||(this.replacer=[]);this.replacer.push(a,c);this.cache&&Q(this);return this};
w.encode=function(a,c){if(this.cache&&a.length<=this.H)if(this.F){if(this.B.has(a))return this.B.get(a)}else this.F=setTimeout(Q,50,this);this.normalize&&(typeof this.normalize==="function"?a=this.normalize(a):a=ja?a.normalize("NFKD").replace(ja,"").toLowerCase():a.toLowerCase());this.prepare&&(a=this.prepare(a));this.numeric&&a.length>3&&(a=a.replace(ha,"$1 $2").replace(ia,"$1 $2").replace(fa,"$1 "));const b=!(this.dedupe||this.mapper||this.filter||this.matcher||this.stemmer||this.replacer);let e=
[],d=I(),f,g,k=this.split||this.split===""?a.split(this.split):[a];for(let l=0,m,p;l<k.length;l++)if((m=p=k[l])&&!(m.length<this.minlength||m.length>this.maxlength)){if(c){if(d[m])continue;d[m]=1}else{if(f===m)continue;f=m}if(b)e.push(m);else if(!this.filter||(typeof this.filter==="function"?this.filter(m):!this.filter.has(m))){if(this.cache&&m.length<=this.I)if(this.F){var h=this.D.get(m);if(h||h===""){h&&e.push(h);continue}}else this.F=setTimeout(Q,50,this);if(this.stemmer){this.K||(this.K=new RegExp("(?!^)("+
this.A+")$"));let u;for(;u!==m&&m.length>2;)u=m,m=m.replace(this.K,r=>this.stemmer.get(r))}if(m&&(this.mapper||this.dedupe&&m.length>1)){h="";for(let u=0,r="",t,n;u<m.length;u++)t=m.charAt(u),t===r&&this.dedupe||((n=this.mapper&&this.mapper.get(t))||n===""?n===r&&this.dedupe||!(r=n)||(h+=n):h+=r=t);m=h}this.matcher&&m.length>1&&(this.J||(this.J=new RegExp("("+this.h+")","g")),m=m.replace(this.J,u=>this.matcher.get(u)));if(m&&this.replacer)for(h=0;m&&h<this.replacer.length;h+=2)m=m.replace(this.replacer[h],
this.replacer[h+1]);this.cache&&p.length<=this.I&&(this.D.set(p,m),this.D.size>this.L&&(this.D.clear(),this.I=this.I/1.1|0));if(m){if(m!==p)if(c){if(d[m])continue;d[m]=1}else{if(g===m)continue;g=m}e.push(m)}}}this.finalize&&(e=this.finalize(e)||e);this.cache&&a.length<=this.H&&(this.B.set(a,e),this.B.size>this.L&&(this.B.clear(),this.H=this.H/1.1|0));return e};function Q(a){a.F=null;a.B.clear();a.D.clear()};function la(a,c,b){b||(c||typeof a!=="object"?typeof c==="object"&&(b=c,c=0):b=a);b&&(a=b.query||a,c=b.limit||c);let e=""+(c||0);b&&(e+=(b.offset||0)+!!b.context+!!b.suggest+(b.resolve!==!1)+(b.resolution||this.resolution)+(b.boost||0));a=(""+a).toLowerCase();this.cache||(this.cache=new ma);let d=this.cache.get(a+e);if(!d){const f=b&&b.cache;f&&(b.cache=!1);d=this.search(a,c,b);f&&(b.cache=f);this.cache.set(a+e,d)}return d}function ma(a){this.limit=a&&a!==!0?a:1E3;this.cache=new Map;this.h=""}
ma.prototype.set=function(a,c){this.cache.set(this.h=a,c);this.cache.size>this.limit&&this.cache.delete(this.cache.keys().next().value)};ma.prototype.get=function(a){const c=this.cache.get(a);c&&this.h!==a&&(this.cache.delete(a),this.cache.set(this.h=a,c));return c};ma.prototype.remove=function(a){for(const c of this.cache){const b=c[0];c[1].includes(a)&&this.cache.delete(b)}};ma.prototype.clear=function(){this.cache.clear();this.h=""};const na={normalize:!1,numeric:!1,dedupe:!1};const oa={};const ra=new Map([["b","p"],["v","f"],["w","f"],["z","s"],["x","s"],["d","t"],["n","m"],["c","k"],["g","k"],["j","k"],["q","k"],["i","e"],["y","e"],["u","o"]]);const sa=new Map([["ae","a"],["oe","o"],["sh","s"],["kh","k"],["th","t"],["ph","f"],["pf","f"]]),ta=[/([^aeo])h(.)/g,"$1$2",/([aeo])h([^aeo]|$)/g,"$1$2",/(.)\1+/g,"$1"];const ua={a:"",e:"",i:"",o:"",u:"",y:"",b:1,f:1,p:1,v:1,c:2,g:2,j:2,k:2,q:2,s:2,x:2,z:2,"\u00df":2,d:3,t:3,l:4,m:5,n:5,r:6};var va={Exact:na,Default:oa,Normalize:oa,LatinBalance:{mapper:ra},LatinAdvanced:{mapper:ra,matcher:sa,replacer:ta},LatinExtra:{mapper:ra,replacer:ta.concat([/(?!^)[aeo]/g,""]),matcher:sa},LatinSoundex:{dedupe:!1,include:{letter:!0},finalize:function(a){for(let b=0;b<a.length;b++){var c=a[b];let e=c.charAt(0),d=ua[e];for(let f=1,g;f<c.length&&(g=c.charAt(f),g==="h"||g==="w"||!(g=ua[g])||g===d||(e+=g,d=g,e.length!==4));f++);a[b]=e}}},CJK:{split:""},LatinExact:na,LatinDefault:oa,LatinSimple:oa};function wa(a,c,b,e){let d=[];for(let f=0,g;f<a.index.length;f++)if(g=a.index[f],c>=g.length)c-=g.length;else{c=g[e?"splice":"slice"](c,b);const k=c.length;if(k&&(d=d.length?d.concat(c):c,b-=k,e&&(a.length-=k),!b))break;c=0}return d}
function xa(a){if(!this||this.constructor!==xa)return new xa(a);this.index=a?[a]:[];this.length=a?a.length:0;const c=this;return new Proxy([],{get(b,e){if(e==="length")return c.length;if(e==="push")return function(d){c.index[c.index.length-1].push(d);c.length++};if(e==="pop")return function(){if(c.length)return c.length--,c.index[c.index.length-1].pop()};if(e==="indexOf")return function(d){let f=0;for(let g=0,k,h;g<c.index.length;g++){k=c.index[g];h=k.indexOf(d);if(h>=0)return f+h;f+=k.length}return-1};
if(e==="includes")return function(d){for(let f=0;f<c.index.length;f++)if(c.index[f].includes(d))return!0;return!1};if(e==="slice")return function(d,f){return wa(c,d||0,f||c.length,!1)};if(e==="splice")return function(d,f){return wa(c,d||0,f||c.length,!0)};if(e==="constructor")return Array;if(typeof e!=="symbol")return(b=c.index[e/2**31|0])&&b[e]},set(b,e,d){b=e/2**31|0;(c.index[b]||(c.index[b]=[]))[e]=d;c.length++;return!0}})}xa.prototype.clear=function(){this.index.length=0};xa.prototype.push=function(){};
function R(a=8){if(!this||this.constructor!==R)return new R(a);this.index=I();this.h=[];this.size=0;a>32?(this.B=Aa,this.A=BigInt(a)):(this.B=Ba,this.A=a)}R.prototype.get=function(a){const c=this.index[this.B(a)];return c&&c.get(a)};R.prototype.set=function(a,c){var b=this.B(a);let e=this.index[b];e?(b=e.size,e.set(a,c),(b-=e.size)&&this.size++):(this.index[b]=e=new Map([[a,c]]),this.h.push(e),this.size++)};
function S(a=8){if(!this||this.constructor!==S)return new S(a);this.index=I();this.h=[];this.size=0;a>32?(this.B=Aa,this.A=BigInt(a)):(this.B=Ba,this.A=a)}S.prototype.add=function(a){var c=this.B(a);let b=this.index[c];b?(c=b.size,b.add(a),(c-=b.size)&&this.size++):(this.index[c]=b=new Set([a]),this.h.push(b),this.size++)};w=R.prototype;w.has=S.prototype.has=function(a){const c=this.index[this.B(a)];return c&&c.has(a)};
w.delete=S.prototype.delete=function(a){const c=this.index[this.B(a)];c&&c.delete(a)&&this.size--};w.clear=S.prototype.clear=function(){this.index=I();this.h=[];this.size=0};w.values=S.prototype.values=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].values())yield c};w.keys=S.prototype.keys=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].keys())yield c};w.entries=S.prototype.entries=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].entries())yield c};
function Ba(a){let c=2**this.A-1;if(typeof a=="number")return a&c;let b=0,e=this.A+1;for(let d=0;d<a.length;d++)b=(b*e^a.charCodeAt(d))&c;return this.A===32?b+2**31:b}function Aa(a){let c=BigInt(2)**this.A-BigInt(1);var b=typeof a;if(b==="bigint")return a&c;if(b==="number")return BigInt(a)&c;b=BigInt(0);let e=this.A+BigInt(1);for(let d=0;d<a.length;d++)b=(b*e^BigInt(a.charCodeAt(d)))&c;return b};let Ca,Da;
async function Ea(a){a=a.data;var c=a.task;const b=a.id;let e=a.args;switch(c){case "init":Da=a.options||{};(c=a.factory)?(Function("return "+c)()(self),Ca=new self.FlexSearch.Index(Da),delete self.FlexSearch):Ca=new T(Da);postMessage({id:b});break;default:let d;c==="export"&&(e[1]?(e[0]=Da.export,e[2]=0,e[3]=1):e=null);c==="import"?e[0]&&(a=await Da.import.call(Ca,e[0]),Ca.import(e[0],a)):((d=e&&Ca[c].apply(Ca,e))&&d.then&&(d=await d),d&&d.await&&(d=await d.await),c==="search"&&d.result&&(d=d.result));
postMessage(c==="search"?{id:b,msg:d}:{id:b})}};function Fa(a){Ga.call(a,"add");Ga.call(a,"append");Ga.call(a,"search");Ga.call(a,"update");Ga.call(a,"remove");Ga.call(a,"searchCache")}let Ha,Ia,Ja;function Ka(){Ha=Ja=0}
function Ga(a){this[a+"Async"]=function(){const c=arguments;var b=c[c.length-1];let e;typeof b==="function"&&(e=b,delete c[c.length-1]);Ha?Ja||(Ja=Date.now()-Ia>=this.priority*this.priority*3):(Ha=setTimeout(Ka,0),Ia=Date.now());if(Ja){const f=this;return new Promise(g=>{setTimeout(function(){g(f[a+"Async"].apply(f,c))},0)})}const d=this[a].apply(this,c);b=d.then?d:new Promise(f=>f(d));e&&b.then(e);return b}};let V=0;
function La(a={},c){function b(k){function h(l){l=l.data||l;const m=l.id,p=m&&f.h[m];p&&(p(l.msg),delete f.h[m])}this.worker=k;this.h=I();if(this.worker){d?this.worker.on("message",h):this.worker.onmessage=h;if(a.config)return new Promise(function(l){V>1E9&&(V=0);f.h[++V]=function(){l(f)};f.worker.postMessage({id:V,task:"init",factory:e,options:a})});this.priority=a.priority||4;this.encoder=c||null;this.worker.postMessage({task:"init",factory:e,options:a});return this}}if(!this||this.constructor!==La)return new La(a);
let e=typeof self!=="undefined"?self._factory:typeof window!=="undefined"?window._factory:null;e&&(e=e.toString());const d=typeof window==="undefined",f=this,g=Ma(e,d,a.worker);return g.then?g.then(function(k){return b.call(f,k)}):b.call(this,g)}W("add");W("append");W("search");W("update");W("remove");W("clear");W("export");W("import");La.prototype.searchCache=la;Fa(La.prototype);
function W(a){La.prototype[a]=function(){const c=this,b=[].slice.call(arguments);var e=b[b.length-1];let d;typeof e==="function"&&(d=e,b.pop());e=new Promise(function(f){a==="export"&&typeof b[0]==="function"&&(b[0]=null);V>1E9&&(V=0);c.h[++V]=f;c.worker.postMessage({task:a,id:V,args:b})});return d?(e.then(d),this):e}}
function Ma(a,c,b){return c?typeof module!=="undefined"?new(require("worker_threads")["Worker"])(__dirname+"/node/node.js"):import("worker_threads").then(function(worker){return new worker["Worker"]((1,eval)("import.meta.dirname")+"/node/node.mjs")}):a?new window.Worker(URL.createObjectURL(new Blob(["onmessage="+Ea.toString()],{type:"text/javascript"}))):new window.Worker(typeof b==="string"?b:(0,eval)("import.meta.url").replace("/worker.js","/worker/worker.js").replace("flexsearch.bundle.module.min.js",
"module/worker/worker.js").replace("flexsearch.bundle.module.min.mjs","module/worker/worker.js"),{type:"module"})};Na.prototype.add=function(a,c,b){ba(a)&&(c=a,a=ca(c,this.key));if(c&&(a||a===0)){if(!b&&this.reg.has(a))return this.update(a,c);for(let k=0,h;k<this.field.length;k++){h=this.B[k];var e=this.index.get(this.field[k]);if(typeof h==="function"){var d=h(c);d&&e.add(a,d,b,!0)}else if(d=h.G,!d||d(c))h.constructor===String?h=[""+h]:M(h)&&(h=[h]),Oa(c,h,this.D,0,e,a,h[0],b)}if(this.tag)for(e=0;e<this.A.length;e++){var f=this.A[e];d=this.tag.get(this.F[e]);let k=I();if(typeof f==="function"){if(f=f(c),!f)continue}else{var g=
f.G;if(g&&!g(c))continue;f.constructor===String&&(f=""+f);f=ca(c,f)}if(d&&f){M(f)&&(f=[f]);for(let h=0,l,m;h<f.length;h++)if(l=f[h],!k[l]&&(k[l]=1,(g=d.get(l))?m=g:d.set(l,m=[]),!b||!m.includes(a))){if(m.length===2**31-1){g=new xa(m);if(this.fastupdate)for(let p of this.reg.values())p.includes(m)&&(p[p.indexOf(m)]=g);d.set(l,m=g)}m.push(a);this.fastupdate&&((g=this.reg.get(a))?g.push(m):this.reg.set(a,[m]))}}}if(this.store&&(!b||!this.store.has(a))){let k;if(this.h){k=I();for(let h=0,l;h<this.h.length;h++){l=
this.h[h];if((b=l.G)&&!b(c))continue;let m;if(typeof l==="function"){m=l(c);if(!m)continue;l=[l.O]}else if(M(l)||l.constructor===String){k[l]=c[l];continue}Ra(c,k,l,0,l[0],m)}}this.store.set(a,k||c)}this.worker&&(this.fastupdate||this.reg.add(a))}return this};function Ra(a,c,b,e,d,f){a=a[d];if(e===b.length-1)c[d]=f||a;else if(a)if(a.constructor===Array)for(c=c[d]=Array(a.length),d=0;d<a.length;d++)Ra(a,c,b,e,d);else c=c[d]||(c[d]=I()),d=b[++e],Ra(a,c,b,e,d)}
function Oa(a,c,b,e,d,f,g,k){if(a=a[g])if(e===c.length-1){if(a.constructor===Array){if(b[e]){for(c=0;c<a.length;c++)d.add(f,a[c],!0,!0);return}a=a.join(" ")}d.add(f,a,k,!0)}else if(a.constructor===Array)for(g=0;g<a.length;g++)Oa(a,c,b,e,d,f,g,k);else g=c[++e],Oa(a,c,b,e,d,f,g,k)};function Sa(a,c,b,e){if(!a.length)return a;if(a.length===1)return a=a[0],a=b||a.length>c?a.slice(b,b+c):a,e?Ta.call(this,a):a;let d=[];for(let f=0,g,k;f<a.length;f++)if((g=a[f])&&(k=g.length)){if(b){if(b>=k){b-=k;continue}g=g.slice(b,b+c);k=g.length;b=0}k>c&&(g=g.slice(0,c),k=c);if(!d.length&&k>=c)return e?Ta.call(this,g):g;d.push(g);c-=k;if(!c)break}d=d.length>1?[].concat.apply([],d):d[0];return e?Ta.call(this,d):d};function Ua(a,c,b,e){var d=e[0];if(d[0]&&d[0].query)return a[c].apply(a,d);if(!(c!=="and"&&c!=="not"||a.result.length||a.await||d.suggest))return e.length>1&&(d=e[e.length-1]),(e=d.resolve)?a.await||a.result:a;let f=[],g=0,k=0,h,l,m,p,u;for(c=0;c<e.length;c++)if(d=e[c]){var r=void 0;if(d.constructor===X)r=d.await||d.result;else if(d.then||d.constructor===Array)r=d;else{g=d.limit||0;k=d.offset||0;m=d.suggest;l=d.resolve;h=((p=d.highlight||a.highlight)||d.enrich)&&l;r=d.queue;let t=d.async||r,n=d.index,
q=d.query;n?a.index||(a.index=n):n=a.index;if(q||d.tag){const x=d.field||d.pluck;x&&(!q||a.query&&!p||(a.query=q,a.field=x,a.highlight=p),n=n.index.get(x));if(r&&(u||a.await)){u=1;let v;const A=a.C.length,E=new Promise(function(F){v=F});(function(F,B){E.h=function(){B.index=null;B.resolve=!1;B.enrich=!1;let C=t?F.searchAsync(B):F.search(B);if(C.then)return C.then(function(z){a.C[A]=z=z.result||z;v(z);return z});C=C.result||C;v(C);return C}})(n,Object.assign({},d));a.C.push(E);f[c]=E;continue}else d.resolve=
!1,d.enrich=!1,d.index=null,r=t?n.searchAsync(d):n.search(d),d.resolve=l,d.enrich=h,d.index=n}else if(d.and)r=Va(d,"and",n);else if(d.or)r=Va(d,"or",n);else if(d.not)r=Va(d,"not",n);else if(d.xor)r=Va(d,"xor",n);else continue}r.await?(u=1,r=r.await):r.then?(u=1,r=r.then(function(t){return t.result||t})):r=r.result||r;f[c]=r}u&&!a.await&&(a.await=new Promise(function(t){a.return=t}));if(u){const t=Promise.all(f).then(function(n){for(let q=0;q<a.C.length;q++)if(a.C[q]===t){a.C[q]=function(){return b.call(a,
n,g,k,h,l,m,p)};break}Wa(a)});a.C.push(t)}else if(a.await)a.C.push(function(){return b.call(a,f,g,k,h,l,m,p)});else return b.call(a,f,g,k,h,l,m,p);return l?a.await||a.result:a}function Va(a,c,b){a=a[c];const e=a[0]||a;e.index||(e.index=b);b=new X(e);a.length>1&&(b=b[c].apply(b,a.slice(1)));return b};X.prototype.or=function(){return Ua(this,"or",Xa,arguments)};function Xa(a,c,b,e,d,f,g){a.length&&(this.result.length&&a.push(this.result),a.length<2?this.result=a[0]:(this.result=Ya(a,c,b,!1,this.h),b=0));d&&(this.await=null);return d?this.resolve(c,b,e,g):this};X.prototype.and=function(){return Ua(this,"and",Za,arguments)};function Za(a,c,b,e,d,f,g){if(!f&&!this.result.length)return d?this.result:this;let k;if(a.length)if(this.result.length&&a.unshift(this.result),a.length<2)this.result=a[0];else{let h=0;for(let l=0,m,p;l<a.length;l++)if((m=a[l])&&(p=m.length))h<p&&(h=p);else if(!f){h=0;break}h?(this.result=$a(a,h,c,b,f,this.h,d),k=!0):this.result=[]}else f||(this.result=a);d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};X.prototype.xor=function(){return Ua(this,"xor",ab,arguments)};
function ab(a,c,b,e,d,f,g){if(a.length)if(this.result.length&&a.unshift(this.result),a.length<2)this.result=a[0];else{a:{f=b;var k=this.h;const h=[],l=I();let m=0;for(let p=0,u;p<a.length;p++)if(u=a[p]){m<u.length&&(m=u.length);for(let r=0,t;r<u.length;r++)if(t=u[r])for(let n=0,q;n<t.length;n++)q=t[n],l[q]=l[q]?2:1}for(let p=0,u,r=0;p<m;p++)for(let t=0,n;t<a.length;t++)if(n=a[t])if(u=n[p])for(let q=0,x;q<u.length;q++)if(x=u[q],l[x]===1)if(f)f--;else if(d){if(h.push(x),h.length===c){a=h;break a}}else{const v=
p+(t?k:0);h[v]||(h[v]=[]);h[v].push(x);if(++r===c){a=h;break a}}a=h}this.result=a;k=!0}else f||(this.result=a);d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};X.prototype.not=function(){return Ua(this,"not",bb,arguments)};
function bb(a,c,b,e,d,f,g){if(!f&&!this.result.length)return d?this.result:this;if(a.length&&this.result.length){a:{f=b;var k=[];a=new Set(a.flat().flat());for(let h=0,l,m=0;h<this.result.length;h++)if(l=this.result[h])for(let p=0,u;p<l.length;p++)if(u=l[p],!a.has(u))if(f)f--;else if(d){if(k.push(u),k.length===c){a=k;break a}}else if(k[h]||(k[h]=[]),k[h].push(u),++m===c){a=k;break a}a=k}this.result=a;k=!0}d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};function cb(a,c,b,e,d){let f,g,k;typeof d==="string"?(f=d,d=""):f=d.template;g=f.indexOf("$1");k=f.substring(g+2);g=f.substring(0,g);let h=d&&d.boundary,l=!d||d.clip!==!1,m=d&&d.merge&&k&&g&&new RegExp(k+" "+g,"g");d=d&&d.ellipsis;var p=0;if(typeof d==="object"){var u=d.template;p=u.length-2;d=d.pattern}typeof d!=="string"&&(d=d===!1?"":"...");p&&(d=u.replace("$1",d));u=d.length-p;let r,t;typeof h==="object"&&(r=h.before,r===0&&(r=-1),t=h.after,t===0&&(t=-1),h=h.total||9E5);p=new Map;for(let Pa=0,
da,gb,pa;Pa<c.length;Pa++){let qa;if(e)qa=c,pa=e;else{var n=c[Pa];pa=n.field;if(!pa)continue;qa=n.result}gb=b.get(pa);da=gb.encoder;n=p.get(da);typeof n!=="string"&&(n=da.encode(a),p.set(da,n));for(let ya=0;ya<qa.length;ya++){var q=qa[ya].doc;if(!q)continue;q=ca(q,pa);if(!q)continue;var x=q.trim().split(/\s+/);if(!x.length)continue;q="";var v=[];let za=[];var A=-1,E=-1,F=0;for(var B=0;B<x.length;B++){var C=x[B],z=da.encode(C);z=z.length>1?z.join(" "):z[0];let y;if(z&&C){var D=C.length,J=(da.split?
C.replace(da.split,""):C).length-z.length,G="",N=0;for(var O=0;O<n.length;O++){var P=n[O];if(P){var L=P.length;L+=J<0?0:J;N&&L<=N||(P=z.indexOf(P),P>-1&&(G=(P?C.substring(0,P):"")+g+C.substring(P,P+L)+k+(P+L<D?C.substring(P+L):""),N=L,y=!0))}}G&&(h&&(A<0&&(A=q.length+(q?1:0)),E=q.length+(q?1:0)+G.length,F+=D,za.push(v.length),v.push({match:G})),q+=(q?" ":"")+G)}if(!y)C=x[B],q+=(q?" ":"")+C,h&&v.push({text:C});else if(h&&F>=h)break}F=za.length*(f.length-2);if(r||t||h&&q.length-F>h)if(F=h+F-u*2,B=E-
A,r>0&&(B+=r),t>0&&(B+=t),B<=F)x=r?A-(r>0?r:0):A-((F-B)/2|0),v=t?E+(t>0?t:0):x+F,l||(x>0&&q.charAt(x)!==" "&&q.charAt(x-1)!==" "&&(x=q.indexOf(" ",x),x<0&&(x=0)),v<q.length&&q.charAt(v-1)!==" "&&q.charAt(v)!==" "&&(v=q.lastIndexOf(" ",v),v<E?v=E:++v)),q=(x?d:"")+q.substring(x,v)+(v<q.length?d:"");else{E=[];A={};F={};B={};C={};z={};G=J=D=0;for(O=N=1;;){var U=void 0;for(let y=0,K;y<za.length;y++){K=za[y];if(G)if(J!==G){if(B[y+1])continue;K+=G;if(A[K]){D-=u;F[y+1]=1;B[y+1]=1;continue}if(K>=v.length-
1){if(K>=v.length){B[y+1]=1;K>=x.length&&(F[y+1]=1);continue}D-=u}q=v[K].text;if(L=t&&z[y])if(L>0){if(q.length>L)if(B[y+1]=1,l)q=q.substring(0,L);else continue;(L-=q.length)||(L=-1);z[y]=L}else{B[y+1]=1;continue}if(D+q.length+1<=h)q=" "+q,E[y]+=q;else if(l)U=h-D-1,U>0&&(q=" "+q.substring(0,U),E[y]+=q),B[y+1]=1;else{B[y+1]=1;continue}}else{if(B[y])continue;K-=J;if(A[K]){D-=u;B[y]=1;F[y]=1;continue}if(K<=0){if(K<0){B[y]=1;F[y]=1;continue}D-=u}q=v[K].text;if(L=r&&C[y])if(L>0){if(q.length>L)if(B[y]=1,
l)q=q.substring(q.length-L);else continue;(L-=q.length)||(L=-1);C[y]=L}else{B[y]=1;continue}if(D+q.length+1<=h)q+=" ",E[y]=q+E[y];else if(l)U=q.length+1-(h-D),U>=0&&U<q.length&&(q=q.substring(U)+" ",E[y]=q+E[y]),B[y]=1;else{B[y]=1;continue}}else{q=v[K].match;r&&(C[y]=r);t&&(z[y]=t);y&&D++;let Qa;K?!y&&u&&(D+=u):(F[y]=1,B[y]=1);K>=x.length-1?Qa=1:K<v.length-1&&v[K+1].match?Qa=1:u&&(D+=u);D-=f.length-2;if(!y||D+q.length<=h)E[y]=q;else{U=N=O=F[y]=0;break}Qa&&(F[y+1]=1,B[y+1]=1)}D+=q.length;U=A[K]=1}if(U)J===
G?G++:J++;else{J===G?N=0:O=0;if(!N&&!O)break;N?(J++,G=J):G++}}q="";for(let y=0,K;y<E.length;y++)K=(F[y]?y?" ":"":(y&&!d?" ":"")+d)+E[y],q+=K;d&&!F[E.length]&&(q+=d)}m&&(q=q.replace(m," "));qa[ya].highlight=q}if(e)break}return c};function X(a,c){if(!this||this.constructor!==X)return new X(a,c);let b=0,e,d,f,g,k,h;if(a&&a.index){const l=a;c=l.index;b=l.boost||0;if(d=l.query){f=l.field||l.pluck;g=l.highlight;const m=l.resolve;a=l.async||l.queue;l.resolve=!1;l.highlight="";l.index=null;a=a?c.searchAsync(l):c.search(l);l.resolve=m;l.highlight=g;l.index=c;a=a.result||a}else a=[]}if(a&&a.then){const l=this;a=a.then(function(m){l.C[0]=l.result=m.result||m;Wa(l)});e=[a];a=[];k=new Promise(function(m){h=m})}this.index=c||null;this.result=
a||[];this.h=b;this.C=e||[];this.await=k||null;this.return=h||null;this.highlight=g||null;this.query=d||"";this.field=f||""}w=X.prototype;w.limit=function(a){if(this.await){const c=this;this.C.push(function(){return c.limit(a).result})}else if(this.result.length){const c=[];for(let b=0,e;b<this.result.length;b++)if(e=this.result[b])if(e.length<=a){if(c[b]=e,a-=e.length,!a)break}else{c[b]=e.slice(0,a);break}this.result=c}return this};
w.offset=function(a){if(this.await){const c=this;this.C.push(function(){return c.offset(a).result})}else if(this.result.length){const c=[];for(let b=0,e;b<this.result.length;b++)if(e=this.result[b])e.length<=a?a-=e.length:(c[b]=e.slice(a),a=0);this.result=c}return this};w.boost=function(a){if(this.await){const c=this;this.C.push(function(){return c.boost(a).result})}else this.h+=a;return this};
function Wa(a,c){let b=a.result;var e=a.await;a.await=null;for(let d=0,f;d<a.C.length;d++)if(f=a.C[d])if(typeof f==="function")b=f(),a.C[d]=b=b.result||b,d--;else if(f.h)b=f.h(),a.C[d]=b=b.result||b,d--;else if(f.then)return a.await=e;e=a.return;a.C=[];a.return=null;c||e(b);return b}
w.resolve=function(a,c,b,e,d){let f=this.await?Wa(this,!0):this.result;if(f.then){const g=this;return f.then(function(){return g.resolve(a,c,b,e,d)})}f.length&&(typeof a==="object"?(e=a.highlight||this.highlight,b=!!e||a.enrich,c=a.offset,a=a.limit):(e=e||this.highlight,b=!!e||b),f=d?b?Ta.call(this.index,f):f:Sa.call(this.index,f,a||100,c,b));return this.finalize(f,e)};
w.finalize=function(a,c){if(a.then){const e=this;return a.then(function(d){return e.finalize(d,c)})}c&&a.length&&this.query&&(a=cb(this.query,a,this.index.index,this.field,c));const b=this.return;this.highlight=this.index=this.result=this.C=this.await=this.return=null;this.query=this.field="";b&&b(a);return a};function $a(a,c,b,e,d,f,g){const k=a.length;let h=[],l,m;l=I();for(let p=0,u,r,t,n;p<c;p++)for(let q=0;q<k;q++)if(t=a[q],p<t.length&&(u=t[p]))for(let x=0;x<u.length;x++){r=u[x];(m=l[r])?l[r]++:(m=0,l[r]=1);n=h[m]||(h[m]=[]);if(!g){let v=p+(q||!d?0:f||0);n=n[v]||(n[v]=[])}n.push(r);if(g&&b&&m===k-1&&n.length-e===b)return e?n.slice(e):n}if(a=h.length)if(d)h=h.length>1?Ya(h,b,e,g,f):(h=h[0])&&b&&h.length>b||e?h.slice(e,b+e):h;else{if(a<k)return[];h=h[a-1];if(b||e)if(g){if(h.length>b||e)h=h.slice(e,b+
e)}else{d=[];for(let p=0,u;p<h.length;p++)if(u=h[p])if(e&&u.length>e)e-=u.length;else{if(b&&u.length>b||e)u=u.slice(e,b+e),b-=u.length,e&&(e-=u.length);d.push(u);if(!b)break}h=d}}return h}
function Ya(a,c,b,e,d){const f=[],g=I();let k;var h=a.length;let l;if(e)for(d=h-1;d>=0;d--){if(l=(e=a[d])&&e.length)for(h=0;h<l;h++)if(k=e[h],!g[k])if(g[k]=1,b)b--;else if(f.push(k),f.length===c)return f}else for(let m=h-1,p,u=0;m>=0;m--){p=a[m];for(let r=0;r<p.length;r++)if(l=(e=p[r])&&e.length)for(let t=0;t<l;t++)if(k=e[t],!g[k])if(g[k]=1,b)b--;else{let n=(r+(m<h-1?d||0:0))/(m+1)|0;(f[n]||(f[n]=[])).push(k);if(++u===c)return f}}return f}
function db(a,c,b,e,d){const f=I(),g=[];for(let k=0,h;k<c.length;k++){h=c[k];for(let l=0;l<h.length;l++)f[h[l]]=1}if(d)for(let k=0,h;k<a.length;k++){if(h=a[k],f[h])if(e)e--;else if(g.push(h),f[h]=0,b&&--b===0)break}else{a=a.result||a;for(let k=0,h,l;k<a.length;k++)for(h=a[k],c=0;c<h.length;c++)l=h[c],f[l]&&((g[k]||(g[k]=[])).push(l),f[l]=0)}return g};I();Na.prototype.search=function(a,c,b,e){b||(!c&&ba(a)?(b=a,a=""):ba(c)&&(b=c,c=0));let d=[];var f=[];let g;let k,h,l,m,p;let u=0,r=!0,t;if(b){b.constructor===Array&&(b={index:b});a=b.query||a;g=b.pluck;k=b.merge;l=b.boost;p=g||b.field||(p=b.index)&&(p.index?null:p);var n=this.tag&&b.tag;h=b.suggest;r=b.resolve!==!1;m=b.cache;t=r&&this.store&&b.highlight;var q=!!t||r&&this.store&&b.enrich;c=b.limit||c;var x=b.offset||0;c||(c=r?100:0);if(n&&(!this.db||!e)){n.constructor!==Array&&(n=[n]);var v=[];for(let C=
0,z;C<n.length;C++)if(z=n[C],z.field&&z.tag){var A=z.tag;if(A.constructor===Array)for(var E=0;E<A.length;E++)v.push(z.field,A[E]);else v.push(z.field,A)}else{A=Object.keys(z);for(let D=0,J,G;D<A.length;D++)if(J=A[D],G=z[J],G.constructor===Array)for(E=0;E<G.length;E++)v.push(J,G[E]);else v.push(J,G)}n=v;if(!a){f=[];if(v.length)for(n=0;n<v.length;n+=2){if(this.db){e=this.index.get(v[n]);if(!e)continue;f.push(e=e.db.tag(v[n+1],c,x,q))}else e=eb.call(this,v[n],v[n+1],c,x,q);d.push(r?{field:v[n],tag:v[n+
1],result:e}:[e])}if(f.length){const C=this;return Promise.all(f).then(function(z){for(let D=0;D<z.length;D++)r?d[D].result=z[D]:d[D]=z[D];return r?d:new X(d.length>1?$a(d,1,0,0,h,l):d[0],C)})}return r?d:new X(d.length>1?$a(d,1,0,0,h,l):d[0],this)}}r||g||!(p=p||this.field)||(M(p)?g=p:(p.constructor===Array&&p.length===1&&(p=p[0]),g=p.field||p.index));p&&p.constructor!==Array&&(p=[p])}p||(p=this.field);let F;v=(this.worker||this.db)&&!e&&[];for(let C=0,z,D,J;C<p.length;C++){D=p[C];if(this.db&&this.tag&&
!this.B[C])continue;let G;M(D)||(G=D,D=G.field,a=G.query||a,c=aa(G.limit,c),x=aa(G.offset,x),h=aa(G.suggest,h),t=r&&this.store&&aa(G.highlight,t),q=!!t||r&&this.store&&aa(G.enrich,q),m=aa(G.cache,m));if(e)z=e[C];else{A=G||b||{};E=A.enrich;var B=this.index.get(D);n&&(this.db&&(A.tag=n,A.field=p,F=B.db.support_tag_search),!F&&E&&(A.enrich=!1),F||(A.limit=0,A.offset=0));z=m?B.searchCache(a,n&&!F?0:c,A):B.search(a,n&&!F?0:c,A);n&&!F&&(A.limit=c,A.offset=x);E&&(A.enrich=E);if(v){v[C]=z;continue}}J=(z=
z.result||z)&&z.length;if(n&&J){A=[];E=0;if(this.db&&e){if(!F)for(B=p.length;B<e.length;B++){let N=e[B];if(N&&N.length)E++,A.push(N);else if(!h)return r?d:new X(d,this)}}else for(let N=0,O,P;N<n.length;N+=2){O=this.tag.get(n[N]);if(!O)if(h)continue;else return r?d:new X(d,this);if(P=(O=O&&O.get(n[N+1]))&&O.length)E++,A.push(O);else if(!h)return r?d:new X(d,this)}if(E){z=db(z,A,c,x,r);J=z.length;if(!J&&!h)return r?z:new X(z,this);E--}}if(J)f[u]=D,d.push(z),u++;else if(p.length===1)return r?d:new X(d,
this)}if(v){if(this.db&&n&&n.length&&!F)for(q=0;q<n.length;q+=2){f=this.index.get(n[q]);if(!f)if(h)continue;else return r?d:new X(d,this);v.push(f.db.tag(n[q+1],c,x,!1))}const C=this;return Promise.all(v).then(function(z){b&&(b.resolve=r);z.length&&(z=C.search(a,c,b,z));return z})}if(!u)return r?d:new X(d,this);if(g&&(!q||!this.store))return d=d[0],r?d:new X(d,this);v=[];for(x=0;x<f.length;x++){n=d[x];q&&n.length&&typeof n[0].doc==="undefined"&&(this.db?v.push(n=this.index.get(this.field[0]).db.enrich(n)):
n=Ta.call(this,n));if(g)return r?t?cb(a,n,this.index,g,t):n:new X(n,this);d[x]={field:f[x],result:n}}if(q&&this.db&&v.length){const C=this;return Promise.all(v).then(function(z){for(let D=0;D<z.length;D++)d[D].result=z[D];t&&(d=cb(a,d,C.index,g,t));return k?fb(d):d})}t&&(d=cb(a,d,this.index,g,t));return k?fb(d):d};
function fb(a){const c=[],b=I(),e=I();for(let d=0,f,g,k,h,l,m,p;d<a.length;d++){f=a[d];g=f.field;k=f.result;for(let u=0;u<k.length;u++)if(l=k[u],typeof l!=="object"?l={id:h=l}:h=l.id,(m=b[h])?m.push(g):(l.field=b[h]=[g],c.push(l)),p=l.highlight)m=e[h],m||(e[h]=m={},l.highlight=m),m[g]=p}return c}function eb(a,c,b,e,d){a=this.tag.get(a);if(!a)return[];a=a.get(c);if(!a)return[];c=a.length-e;if(c>0){if(b&&c>b||e)a=a.slice(e,e+b);d&&(a=Ta.call(this,a))}return a}
function Ta(a){if(!this||!this.store)return a;if(this.db)return this.index.get(this.field[0]).db.enrich(a);const c=Array(a.length);for(let b=0,e;b<a.length;b++)e=a[b],c[b]={id:e,doc:this.store.get(e)};return c};function Na(a){if(!this||this.constructor!==Na)return new Na(a);const c=a.document||a.doc||a;let b,e;this.B=[];this.field=[];this.D=[];this.key=(b=c.key||c.id)&&hb(b,this.D)||"id";(e=a.keystore||0)&&(this.keystore=e);this.fastupdate=!!a.fastupdate;this.reg=!this.fastupdate||a.worker||a.db?e?new S(e):new Set:e?new R(e):new Map;this.h=(b=c.store||null)&&b&&b!==!0&&[];this.store=b?e?new R(e):new Map:null;this.cache=(b=a.cache||null)&&new ma(b);a.cache=!1;this.worker=a.worker||!1;this.priority=a.priority||
4;this.index=ib.call(this,a,c);this.tag=null;if(b=c.tag)if(typeof b==="string"&&(b=[b]),b.length){this.tag=new Map;this.A=[];this.F=[];for(let d=0,f,g;d<b.length;d++){f=b[d];g=f.field||f;if(!g)throw Error("The tag field from the document descriptor is undefined.");f.custom?this.A[d]=f.custom:(this.A[d]=hb(g,this.D),f.filter&&(typeof this.A[d]==="string"&&(this.A[d]=new String(this.A[d])),this.A[d].G=f.filter));this.F[d]=g;this.tag.set(g,new Map)}}if(this.worker){this.fastupdate=!1;a=[];for(const d of this.index.values())d.then&&
a.push(d);if(a.length){const d=this;return Promise.all(a).then(function(f){let g=0;for(const k of d.index.entries()){const h=k[0];let l=k[1];l.then&&(l=f[g],d.index.set(h,l),g++)}return d})}}else a.db&&(this.fastupdate=!1,this.mount(a.db))}w=Na.prototype;
w.mount=function(a){let c=this.field;if(this.tag)for(let f=0,g;f<this.F.length;f++){g=this.F[f];var b=void 0;this.index.set(g,b=new T({},this.reg));c===this.field&&(c=c.slice(0));c.push(g);b.tag=this.tag.get(g)}b=[];const e={db:a.db,type:a.type,fastupdate:a.fastupdate};for(let f=0,g,k;f<c.length;f++){e.field=k=c[f];g=this.index.get(k);const h=new a.constructor(a.id,e);h.id=a.id;b[f]=h.mount(g);g.document=!0;f?g.bypass=!0:g.store=this.store}const d=this;return this.db=Promise.all(b).then(function(){d.db=
!0})};w.commit=async function(){const a=[];for(const c of this.index.values())a.push(c.commit());await Promise.all(a);this.reg.clear()};w.destroy=function(){const a=[];for(const c of this.index.values())a.push(c.destroy());return Promise.all(a)};
function ib(a,c){const b=new Map;let e=c.index||c.field||c;M(e)&&(e=[e]);for(let f=0,g,k;f<e.length;f++){g=e[f];M(g)||(k=g,g=g.field);k=ba(k)?Object.assign({},a,k):a;if(this.worker){var d=void 0;d=(d=k.encoder)&&d.encode?d:new ka(typeof d==="string"?va[d]:d||{});d=new La(k,d);b.set(g,d)}this.worker||b.set(g,new T(k,this.reg));k.custom?this.B[f]=k.custom:(this.B[f]=hb(g,this.D),k.filter&&(typeof this.B[f]==="string"&&(this.B[f]=new String(this.B[f])),this.B[f].G=k.filter));this.field[f]=g}if(this.h){a=
c.store;M(a)&&(a=[a]);for(let f=0,g,k;f<a.length;f++)g=a[f],k=g.field||g,g.custom?(this.h[f]=g.custom,g.custom.O=k):(this.h[f]=hb(k,this.D),g.filter&&(typeof this.h[f]==="string"&&(this.h[f]=new String(this.h[f])),this.h[f].G=g.filter))}return b}function hb(a,c){const b=a.split(":");let e=0;for(let d=0;d<b.length;d++)a=b[d],a[a.length-1]==="]"&&(a=a.substring(0,a.length-2))&&(c[e]=!0),a&&(b[e++]=a);e<b.length&&(b.length=e);return e>1?b:b[0]}w.append=function(a,c){return this.add(a,c,!0)};
w.update=function(a,c){return this.remove(a).add(a,c)};w.remove=function(a){ba(a)&&(a=ca(a,this.key));for(var c of this.index.values())c.remove(a,!0);if(this.reg.has(a)){if(this.tag&&!this.fastupdate)for(let b of this.tag.values())for(let e of b){c=e[0];const d=e[1],f=d.indexOf(a);f>-1&&(d.length>1?d.splice(f,1):b.delete(c))}this.store&&this.store.delete(a);this.reg.delete(a)}this.cache&&this.cache.remove(a);return this};
w.clear=function(){const a=[];for(const c of this.index.values()){const b=c.clear();b.then&&a.push(b)}if(this.tag)for(const c of this.tag.values())c.clear();this.store&&this.store.clear();this.cache&&this.cache.clear();return a.length?Promise.all(a):this};w.contain=function(a){return this.db?this.index.get(this.field[0]).db.has(a):this.reg.has(a)};w.cleanup=function(){for(const a of this.index.values())a.cleanup();return this};
w.get=function(a){return this.db?this.index.get(this.field[0]).db.enrich(a).then(function(c){return c[0]&&c[0].doc||null}):this.store.get(a)||null};w.set=function(a,c){typeof a==="object"&&(c=a,a=ca(c,this.key));this.store.set(a,c);return this};w.searchCache=la;w.export=jb;w.import=kb;Fa(Na.prototype);function lb(a,c=0){let b=[],e=[];c&&(c=25E4/c*5E3|0);for(const d of a.entries())e.push(d),e.length===c&&(b.push(e),e=[]);e.length&&b.push(e);return b}function mb(a,c){c||(c=new Map);for(let b=0,e;b<a.length;b++)e=a[b],c.set(e[0],e[1]);return c}function nb(a,c=0){let b=[],e=[];c&&(c=25E4/c*1E3|0);for(const d of a.entries())e.push([d[0],lb(d[1])[0]||[]]),e.length===c&&(b.push(e),e=[]);e.length&&b.push(e);return b}
function ob(a,c){c||(c=new Map);for(let b=0,e,d;b<a.length;b++)e=a[b],d=c.get(e[0]),c.set(e[0],mb(e[1],d));return c}function pb(a){let c=[],b=[];for(const e of a.keys())b.push(e),b.length===25E4&&(c.push(b),b=[]);b.length&&c.push(b);return c}function qb(a,c){c||(c=new Set);for(let b=0;b<a.length;b++)c.add(a[b]);return c}
function rb(a,c,b,e,d,f,g=0){const k=e&&e.constructor===Array;var h=k?e.shift():e;if(!h)return this.export(a,c,d,f+1);if((h=a((c?c+".":"")+(g+1)+"."+b,JSON.stringify(h)))&&h.then){const l=this;return h.then(function(){return rb.call(l,a,c,b,k?e:null,d,f,g+1)})}return rb.call(this,a,c,b,k?e:null,d,f,g+1)}
function jb(a,c,b=0,e=0){if(b<this.field.length){const g=this.field[b];if((c=this.index.get(g).export(a,g,b,e=1))&&c.then){const k=this;return c.then(function(){return k.export(a,g,b+1)})}return this.export(a,g,b+1)}let d,f;switch(e){case 0:d="reg";f=pb(this.reg);c=null;break;case 1:d="tag";f=this.tag&&nb(this.tag,this.reg.size);c=null;break;case 2:d="doc";f=this.store&&lb(this.store);c=null;break;default:return}return rb.call(this,a,c,d,f||null,b,e)}
function kb(a,c){var b=a.split(".");b[b.length-1]==="json"&&b.pop();const e=b.length>2?b[0]:"";b=b.length>2?b[2]:b[1];if(this.worker&&e)return this.index.get(e).import(a);if(c){typeof c==="string"&&(c=JSON.parse(c));if(e)return this.index.get(e).import(b,c);switch(b){case "reg":this.fastupdate=!1;this.reg=qb(c,this.reg);for(let d=0,f;d<this.field.length;d++)f=this.index.get(this.field[d]),f.fastupdate=!1,f.reg=this.reg;if(this.worker){c=[];for(const d of this.index.values())c.push(d.import(a));return Promise.all(c)}break;
case "tag":this.tag=ob(c,this.tag);break;case "doc":this.store=mb(c,this.store)}}}function sb(a,c){let b="";for(const e of a.entries()){a=e[0];const d=e[1];let f="";for(let g=0,k;g<d.length;g++){k=d[g]||[""];let h="";for(let l=0;l<k.length;l++)h+=(h?",":"")+(c==="string"?'"'+k[l]+'"':k[l]);h="["+h+"]";f+=(f?",":"")+h}f='["'+a+'",['+f+"]]";b+=(b?",":"")+f}return b};T.prototype.remove=function(a,c){const b=this.reg.size&&(this.fastupdate?this.reg.get(a):this.reg.has(a));if(b){if(this.fastupdate)for(let e=0,d,f;e<b.length;e++){if((d=b[e])&&(f=d.length))if(d[f-1]===a)d.pop();else{const g=d.indexOf(a);g>=0&&d.splice(g,1)}}else tb(this.map,a),this.depth&&tb(this.ctx,a);c||this.reg.delete(a)}this.db&&(this.commit_task.push({del:a}),this.M&&ub(this));this.cache&&this.cache.remove(a);return this};
function tb(a,c){let b=0;var e=typeof c==="undefined";if(a.constructor===Array)for(let d=0,f,g,k;d<a.length;d++){if((f=a[d])&&f.length){if(e)return 1;g=f.indexOf(c);if(g>=0){if(f.length>1)return f.splice(g,1),1;delete a[d];if(b)return 1;k=1}else{if(k)return 1;b++}}}else for(let d of a.entries())e=d[0],tb(d[1],c)?b++:a.delete(e);return b};const vb={memory:{resolution:1},performance:{resolution:3,fastupdate:!0,context:{depth:1,resolution:1}},match:{tokenize:"full"},score:{resolution:9,context:{depth:2,resolution:3}}};T.prototype.add=function(a,c,b,e){if(c&&(a||a===0)){if(!e&&!b&&this.reg.has(a))return this.update(a,c);e=this.depth;c=this.encoder.encode(c,!e);const l=c.length;if(l){const m=I(),p=I(),u=this.resolution;for(let r=0;r<l;r++){let t=c[this.rtl?l-1-r:r];var d=t.length;if(d&&(e||!p[t])){var f=this.score?this.score(c,t,r,null,0):wb(u,l,r),g="";switch(this.tokenize){case "tolerant":Y(this,p,t,f,a,b);if(d>2){for(let n=1,q,x,v,A;n<d-1;n++)q=t.charAt(n),x=t.charAt(n+1),v=t.substring(0,n)+x,A=t.substring(n+
2),g=v+q+A,Y(this,p,g,f,a,b),g=v+A,Y(this,p,g,f,a,b);Y(this,p,t.substring(0,t.length-1),f,a,b)}break;case "full":if(d>2){for(let n=0,q;n<d;n++)for(f=d;f>n;f--){g=t.substring(n,f);q=this.rtl?d-1-n:n;var k=this.score?this.score(c,t,r,g,q):wb(u,l,r,d,q);Y(this,p,g,k,a,b)}break}case "bidirectional":case "reverse":if(d>1){for(k=d-1;k>0;k--){g=t[this.rtl?d-1-k:k]+g;var h=this.score?this.score(c,t,r,g,k):wb(u,l,r,d,k);Y(this,p,g,h,a,b)}g=""}case "forward":if(d>1){for(k=0;k<d;k++)g+=t[this.rtl?d-1-k:k],Y(this,
p,g,f,a,b);break}default:if(Y(this,p,t,f,a,b),e&&l>1&&r<l-1)for(d=this.N,g=t,f=Math.min(e+1,this.rtl?r+1:l-r),k=1;k<f;k++){t=c[this.rtl?l-1-r-k:r+k];h=this.bidirectional&&t>g;const n=this.score?this.score(c,g,r,t,k-1):wb(d+(l/2>d?0:1),l,r,f-1,k-1);Y(this,m,h?g:t,n,a,b,h?t:g)}}}}this.fastupdate||this.reg.add(a)}}this.db&&(this.commit_task.push(b?{ins:a}:{del:a}),this.M&&ub(this));return this};
function Y(a,c,b,e,d,f,g){let k,h;if(!(k=c[b])||g&&!k[g]){g?(c=k||(c[b]=I()),c[g]=1,h=a.ctx,(k=h.get(g))?h=k:h.set(g,h=a.keystore?new R(a.keystore):new Map)):(h=a.map,c[b]=1);(k=h.get(b))?h=k:h.set(b,h=k=[]);if(f)for(let l=0,m;l<k.length;l++)if((m=k[l])&&m.includes(d)){if(l<=e)return;m.splice(m.indexOf(d),1);a.fastupdate&&(c=a.reg.get(d))&&c.splice(c.indexOf(m),1);break}h=h[e]||(h[e]=[]);h.push(d);if(h.length===2**31-1){c=new xa(h);if(a.fastupdate)for(let l of a.reg.values())l.includes(h)&&(l[l.indexOf(h)]=
c);k[e]=h=c}a.fastupdate&&((e=a.reg.get(d))?e.push(h):a.reg.set(d,[h]))}}function wb(a,c,b,e,d){return b&&a>1?c+(e||0)<=a?b+(d||0):(a-1)/(c+(e||0))*(b+(d||0))+1|0:0};T.prototype.search=function(a,c,b){b||(c||typeof a!=="object"?typeof c==="object"&&(b=c,c=0):(b=a,a=""));if(b&&b.cache)return b.cache=!1,a=this.searchCache(a,c,b),b.cache=!0,a;let e=[],d,f,g,k=0,h,l,m,p,u;b&&(a=b.query||a,c=b.limit||c,k=b.offset||0,f=b.context,g=b.suggest,u=(h=b.resolve)&&b.enrich,m=b.boost,p=b.resolution,l=this.db&&b.tag);typeof h==="undefined"&&(h=this.resolve);f=this.depth&&f!==!1;let r=this.encoder.encode(a,!f);d=r.length;c=c||(h?100:0);if(d===1)return xb.call(this,r[0],"",c,
k,h,u,l);if(d===2&&f&&!g)return xb.call(this,r[1],r[0],c,k,h,u,l);let t=I(),n=0,q;f&&(q=r[0],n=1);p||p===0||(p=q?this.N:this.resolution);if(this.db){if(this.db.search&&(b=this.db.search(this,r,c,k,g,h,u,l),b!==!1))return b;const x=this;return async function(){for(let v,A;n<d;n++){if((A=r[n])&&!t[A]){t[A]=1;v=await yb(x,A,q,0,0,!1,!1);if(v=zb(v,e,g,p)){e=v;break}q&&(g&&v&&e.length||(q=A))}g&&q&&n===d-1&&!e.length&&(p=x.resolution,q="",n=-1,t=I())}return Ab(e,p,c,k,g,m,h)}()}for(let x,v;n<d;n++){if((v=
r[n])&&!t[v]){t[v]=1;x=yb(this,v,q,0,0,!1,!1);if(x=zb(x,e,g,p)){e=x;break}q&&(g&&x&&e.length||(q=v))}g&&q&&n===d-1&&!e.length&&(p=this.resolution,q="",n=-1,t=I())}return Ab(e,p,c,k,g,m,h)};function Ab(a,c,b,e,d,f,g){let k=a.length,h=a;if(k>1)h=$a(a,c,b,e,d,f,g);else if(k===1)return g?Sa.call(null,a[0],b,e):new X(a[0],this);return g?h:new X(h,this)}
function xb(a,c,b,e,d,f,g){a=yb(this,a,c,b,e,d,f,g);return this.db?a.then(function(k){return d?k||[]:new X(k,this)}):a&&a.length?d?Sa.call(this,a,b,e):new X(a,this):d?[]:new X([],this)}function zb(a,c,b,e){let d=[];if(a&&a.length){if(a.length<=e){c.push(a);return}for(let f=0,g;f<e;f++)if(g=a[f])d[f]=g;if(d.length){c.push(d);return}}if(!b)return d}
function yb(a,c,b,e,d,f,g,k){let h;b&&(h=a.bidirectional&&c>b)&&(h=b,b=c,c=h);if(a.db)return a.db.get(c,b,e,d,f,g,k);a=b?(a=a.ctx.get(b))&&a.get(c):a.map.get(c);return a};function T(a,c){if(!this||this.constructor!==T)return new T(a);if(a){var b=M(a)?a:a.preset;b&&(a=Object.assign({},vb[b],a))}else a={};b=a.context;const e=b===!0?{depth:1}:b||{},d=M(a.encoder)?va[a.encoder]:a.encode||a.encoder||{};this.encoder=d.encode?d:typeof d==="object"?new ka(d):{encode:d};this.resolution=a.resolution||9;this.tokenize=b=(b=a.tokenize)&&b!=="default"&&b!=="exact"&&b||"strict";this.depth=b==="strict"&&e.depth||0;this.bidirectional=e.bidirectional!==!1;this.fastupdate=!!a.fastupdate;
this.score=a.score||null;(b=a.keystore||0)&&(this.keystore=b);this.map=b?new R(b):new Map;this.ctx=b?new R(b):new Map;this.reg=c||(this.fastupdate?b?new R(b):new Map:b?new S(b):new Set);this.N=e.resolution||3;this.rtl=d.rtl||a.rtl||!1;this.cache=(b=a.cache||null)&&new ma(b);this.resolve=a.resolve!==!1;if(b=a.db)this.db=this.mount(b);this.M=a.commit!==!1;this.commit_task=[];this.commit_timer=null;this.priority=a.priority||4}w=T.prototype;
w.mount=function(a){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return a.mount(this)};w.commit=function(){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return this.db.commit(this)};w.destroy=function(){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return this.db.destroy()};function ub(a){a.commit_timer||(a.commit_timer=setTimeout(function(){a.commit_timer=null;a.db.commit(a)},1))}
w.clear=function(){this.map.clear();this.ctx.clear();this.reg.clear();this.cache&&this.cache.clear();return this.db?(this.commit_timer&&clearTimeout(this.commit_timer),this.commit_timer=null,this.commit_task=[],this.db.clear()):this};w.append=function(a,c){return this.add(a,c,!0)};w.contain=function(a){return this.db?this.db.has(a):this.reg.has(a)};w.update=function(a,c){const b=this,e=this.remove(a);return e&&e.then?e.then(()=>b.add(a,c)):this.add(a,c)};
w.cleanup=function(){if(!this.fastupdate)return this;tb(this.map);this.depth&&tb(this.ctx);return this};w.searchCache=la;w.export=function(a,c,b=0,e=0){let d,f;switch(e){case 0:d="reg";f=pb(this.reg);break;case 1:d="cfg";f=null;break;case 2:d="map";f=lb(this.map,this.reg.size);break;case 3:d="ctx";f=nb(this.ctx,this.reg.size);break;default:return}return rb.call(this,a,c,d,f,b,e)};
w.import=function(a,c){if(c)switch(typeof c==="string"&&(c=JSON.parse(c)),a=a.split("."),a[a.length-1]==="json"&&a.pop(),a.length===3&&a.shift(),a=a.length>1?a[1]:a[0],a){case "reg":this.fastupdate=!1;this.reg=qb(c,this.reg);break;case "map":this.map=mb(c,this.map);break;case "ctx":this.ctx=ob(c,this.ctx)}};
w.serialize=function(a=!0){let c="",b="",e="";if(this.reg.size){let f;for(var d of this.reg.keys())f||(f=typeof d),c+=(c?",":"")+(f==="string"?'"'+d+'"':d);c="index.reg=new Set(["+c+"]);";b=sb(this.map,f);b="index.map=new Map(["+b+"]);";for(const g of this.ctx.entries()){d=g[0];let k=sb(g[1],f);k="new Map(["+k+"])";k='["'+d+'",'+k+"]";e+=(e?",":"")+k}e="index.ctx=new Map(["+e+"]);"}return a?"function inject(index){"+c+b+e+"}":c+b+e};Fa(T.prototype);const Bb=typeof window!=="undefined"&&(window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB),Cb=["map","ctx","tag","reg","cfg"],Db=I();
function Eb(a,c={}){if(!this||this.constructor!==Eb)return new Eb(a,c);typeof a==="object"&&(c=a,a=a.name);a||console.info("Default storage space was used, because a name was not passed.");this.id="flexsearch"+(a?":"+a.toLowerCase().replace(/[^a-z0-9_\-]/g,""):"");this.field=c.field?c.field.toLowerCase().replace(/[^a-z0-9_\-]/g,""):"";this.type=c.type;this.fastupdate=this.support_tag_search=!1;this.db=null;this.h={}}w=Eb.prototype;w.mount=function(a){if(a.index)return a.mount(this);a.db=this;return this.open()};
w.open=function(){if(this.db)return this.db;let a=this;navigator.storage&&navigator.storage.persist&&navigator.storage.persist();Db[a.id]||(Db[a.id]=[]);Db[a.id].push(a.field);const c=Bb.open(a.id,1);c.onupgradeneeded=function(){const b=a.db=this.result;for(let e=0,d;e<Cb.length;e++){d=Cb[e];for(let f=0,g;f<Db[a.id].length;f++)g=Db[a.id][f],b.objectStoreNames.contains(d+(d!=="reg"?g?":"+g:"":""))||b.createObjectStore(d+(d!=="reg"?g?":"+g:"":""))}};return a.db=Z(c,function(b){a.db=b;a.db.onversionchange=
function(){a.close()}})};w.close=function(){this.db&&this.db.close();this.db=null};w.destroy=function(){const a=Bb.deleteDatabase(this.id);return Z(a)};w.clear=function(){const a=[];for(let b=0,e;b<Cb.length;b++){e=Cb[b];for(let d=0,f;d<Db[this.id].length;d++)f=Db[this.id][d],a.push(e+(e!=="reg"?f?":"+f:"":""))}const c=this.db.transaction(a,"readwrite");for(let b=0;b<a.length;b++)c.objectStore(a[b]).clear();return Z(c)};
w.get=function(a,c,b=0,e=0,d=!0,f=!1){a=this.db.transaction((c?"ctx":"map")+(this.field?":"+this.field:""),"readonly").objectStore((c?"ctx":"map")+(this.field?":"+this.field:"")).get(c?c+":"+a:a);const g=this;return Z(a).then(function(k){let h=[];if(!k||!k.length)return h;if(d){if(!b&&!e&&k.length===1)return k[0];for(let l=0,m;l<k.length;l++)if((m=k[l])&&m.length){if(e>=m.length){e-=m.length;continue}const p=b?e+Math.min(m.length-e,b):m.length;for(let u=e;u<p;u++)h.push(m[u]);e=0;if(h.length===b)break}return f?
g.enrich(h):h}return k})};w.tag=function(a,c=0,b=0,e=!1){a=this.db.transaction("tag"+(this.field?":"+this.field:""),"readonly").objectStore("tag"+(this.field?":"+this.field:"")).get(a);const d=this;return Z(a).then(function(f){if(!f||!f.length||b>=f.length)return[];if(!c&&!b)return f;f=f.slice(b,b+c);return e?d.enrich(f):f})};
w.enrich=function(a){typeof a!=="object"&&(a=[a]);const c=this.db.transaction("reg","readonly").objectStore("reg"),b=[];for(let e=0;e<a.length;e++)b[e]=Z(c.get(a[e]));return Promise.all(b).then(function(e){for(let d=0;d<e.length;d++)e[d]={id:a[d],doc:e[d]?JSON.parse(e[d]):null};return e})};w.has=function(a){a=this.db.transaction("reg","readonly").objectStore("reg").getKey(a);return Z(a).then(function(c){return!!c})};w.search=null;w.info=function(){};
w.transaction=function(a,c,b){a+=a!=="reg"?this.field?":"+this.field:"":"";let e=this.h[a+":"+c];if(e)return b.call(this,e);let d=this.db.transaction(a,c);this.h[a+":"+c]=e=d.objectStore(a);const f=b.call(this,e);this.h[a+":"+c]=null;return Z(d).finally(function(){return f})};
w.commit=async function(a){let c=a.commit_task,b=[];a.commit_task=[];for(let e=0,d;e<c.length;e++)d=c[e],d.del&&b.push(d.del);b.length&&await this.remove(b);a.reg.size&&(await this.transaction("map","readwrite",function(e){for(const d of a.map){const f=d[0],g=d[1];g.length&&(e.get(f).onsuccess=function(){let k=this.result;var h;if(k&&k.length){const l=Math.max(k.length,g.length);for(let m=0,p,u;m<l;m++)if((u=g[m])&&u.length){if((p=k[m])&&p.length)for(h=0;h<u.length;h++)p.push(u[h]);else k[m]=u;h=
1}}else k=g,h=1;h&&e.put(k,f)})}}),await this.transaction("ctx","readwrite",function(e){for(const d of a.ctx){const f=d[0],g=d[1];for(const k of g){const h=k[0],l=k[1];l.length&&(e.get(f+":"+h).onsuccess=function(){let m=this.result;var p;if(m&&m.length){const u=Math.max(m.length,l.length);for(let r=0,t,n;r<u;r++)if((n=l[r])&&n.length){if((t=m[r])&&t.length)for(p=0;p<n.length;p++)t.push(n[p]);else m[r]=n;p=1}}else m=l,p=1;p&&e.put(m,f+":"+h)})}}}),a.store?await this.transaction("reg","readwrite",
function(e){for(const d of a.store){const f=d[0],g=d[1];e.put(typeof g==="object"?JSON.stringify(g):1,f)}}):a.bypass||await this.transaction("reg","readwrite",function(e){for(const d of a.reg.keys())e.put(1,d)}),a.tag&&await this.transaction("tag","readwrite",function(e){for(const d of a.tag){const f=d[0],g=d[1];g.length&&(e.get(f).onsuccess=function(){let k=this.result;k=k&&k.length?k.concat(g):g;e.put(k,f)})}}),a.map.clear(),a.ctx.clear(),a.tag&&a.tag.clear(),a.store&&a.store.clear(),a.document||
a.reg.clear())};function Fb(a,c,b){const e=a.value;let d,f=0;for(let g=0,k;g<e.length;g++){if(k=b?e:e[g]){for(let h=0,l,m;h<c.length;h++)if(m=c[h],l=k.indexOf(m),l>=0)if(d=1,k.length>1)k.splice(l,1);else{e[g]=[];break}f+=k.length}if(b)break}f?d&&a.update(e):a.delete();a.continue()}
w.remove=function(a){typeof a!=="object"&&(a=[a]);return Promise.all([this.transaction("map","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a)}}),this.transaction("ctx","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a)}}),this.transaction("tag","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a,!0)}}),this.transaction("reg","readwrite",function(c){for(let b=0;b<a.length;b++)c.delete(a[b])})])};
function Z(a,c){return new Promise((b,e)=>{a.onsuccess=a.oncomplete=function(){c&&c(this.result);c=null;b(this.result)};a.onerror=a.onblocked=e;a=null})};const Gb={Index:T,Charset:va,Encoder:ka,Document:Na,Worker:La,Resolver:X,IndexedDB:Eb,Language:{}},Hb=typeof self!=="undefined"?self:typeof global!=="undefined"?global:self;let Ib;(Ib=Hb.define)&&Ib.amd?Ib([],function(){return Gb}):typeof Hb.exports==="object"?Hb.exports=Gb:Hb.FlexSearch=Gb;}(this||self));

;
const search = document.querySelector('.search-input')
const suggestions = document.querySelector('.search-suggestions')
const background = document.querySelector('.search-background')

const encoder = new FlexSearch.Encoder(FlexSearch.Charset.LatinSimple);
encoder.assign({ minlength: 3 });

var index = new FlexSearch.Document({
  tokenize: "forward",
  cache: 100,
  document: {
    id: "id",
    store: ["href", "title", "description"],
    index: [
      {
        field: "title",
        tokenize: "forward",
        resolution: 3
      },
      {
        field: "description",
        encoder: encoder,
        resolution: 20,
        tokenize: "full"
      },
      {
        field: "content",
        encoder: encoder,
        resolution: 20,
        tokenize: "full"
      }
    ]
  }
});

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/
function initIndex() {
  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2
  // Note: pages without a title (such as browserconfig.xml) are excluded
  
  
  
  index.add(
    
      
      
      
      
      {
        id: 0,
        href: "/blog/about/",
        title: "About Us",
        description: "Learn more about our automated tech publication.",
        
        
        content: "Behind the Code\rWe are a next-generation technology publication powered entirely by Artificial Intelligence.\nOur Mission\rTo aggregate, analyze, and deliver the most important technology news from around the globe. We strip away the fluff and deliver comprehensive, deep-dive articles on the topics that matter.\nHow It Works\rOur proprietary automation engine scans top publishers like TechCrunch and Wired every morning. It utilizes advanced Large Language Models (LLMs) to write unique, heavily researched articles completely on autopilot."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 1,
        href: "/blog/posts/att-promo-codes-50-off-this-june-2026/",
        title: "AT\u0026T Promo Codes: $50 Off This...",
        description: "AT\u0026T promo codes help you save up to $50 on internet upgrades and the latest phones. Don't miss out on these limited-time deals.",
        
        
        content: "AT\u0026amp;T Promo Codes: Unlock Exclusive Deals This June 2026 \u0026nbsp; Are you tired of overpaying for internet and phone services? Look no further than AT\u0026amp;T promo codes, offering a range of discounts and deals to save you up to $50. Whether you\u0026rsquo;re upgrading your internet plan or purchasing the latest smartphone, these limited-time promotions can help you stay connected without breaking the bank.\nTop AT\u0026amp;T Promo Codes for June 2026 \u0026nbsp; Here are some of the most popular AT\u0026amp;T promo codes currently available:\n$50 Off Internet Upgrades: Get a $50 credit towards your next internet upgrade, perfect for boosting your speeds or adding more data to your plan. $25 Off Latest Phones: Enjoy a $25 discount on the latest smartphones from top brands, including Apple and Samsung. Free Shipping: Take advantage of free shipping on all online orders, so you can get your new device or accessories delivered right to your door. How to Use AT\u0026amp;T Promo Codes \u0026nbsp; Using AT\u0026amp;T promo codes is easy:\nFind Your Code: Browse through our selection of promo codes, or visit the AT\u0026amp;T website to see what\u0026rsquo;s currently available. Choose Your Discount: Select the code that best suits your needs, whether it\u0026rsquo;s a discount on internet upgrades or a credit towards your next phone purchase. Apply Your Code: Enter your code at checkout to receive your discount and start saving. Tips for Maximizing Your Savings \u0026nbsp; Here are some expert tips for getting the most out of your AT\u0026amp;T promo codes:\nCombine Codes: Try combining multiple codes to maximize your savings – but be sure to check the fine print for any restrictions. Check Expiration Dates: Promo codes often have limited lifespans, so be sure to check the expiration date before applying. Stack Discounts: Look for opportunities to stack discounts, such as buying a phone and upgrading your internet plan at the same time. AT\u0026amp;T Deals: Internet and Phone Upgrades \u0026nbsp; AT\u0026amp;T promo codes can be used for a range of services, including:\nInternet Upgrades: Boost your speeds and get more data with AT\u0026amp;T\u0026rsquo;s fast and reliable internet plans. Phone Upgrades: Stay connected with the latest smartphones from top brands, including Apple and Samsung. Accessories: Get discounts on phone cases, headphones, and other accessories to complement your new device. FAQ \u0026nbsp; Q: How do I find AT\u0026amp;T promo codes? A: Browse through our selection of promo codes, or visit the AT\u0026amp;T website to see what\u0026rsquo;s currently available. Q: Can I combine multiple promo codes? A: Yes, but be sure to check the fine print for any restrictions. Q: How long do promo codes last? A: Promo codes often have limited lifespans, so be sure to check the expiration date before applying. Q: Can I use promo codes on online orders? A: Yes, simply enter your code at checkout to receive your discount. By taking advantage of AT\u0026amp;T promo codes, you can save up to $50 on internet upgrades and the latest phones. Don\u0026rsquo;t miss out on these limited-time deals – visit our website today to find the best promo codes for your needs."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 2,
        href: "/blog/posts/chewy-promo-codes-20-off-june-2026/",
        title: "Chewy Promo Codes: $20 Off Jun...",
        description: "Get $20 off your first order at Chewy with our exclusive promo codes, plus more discounts on pet food and other pet supplies.",
        
        
        content: "Chewy Promo Codes: Unlock Exclusive Discounts for Pet Lovers \u0026nbsp; Are you a pet owner looking for ways to save on pet supplies and food? Look no further than Chewy, the online retailer that offers a wide range of pet products and services. In this article, we\u0026rsquo;ll explore the latest Chewy promo codes and discounts available in June 2026, including a $20 off coupon code for your first order.\nWhat Are Chewy Promo Codes? \u0026nbsp; Chewy promo codes are exclusive discounts offered by Chewy to its customers. These codes can be used to redeem discounts on pet supplies, food, and other services. Chewy promo codes are usually time-sensitive, so be sure to check the expiration dates before applying them to your order.\nTypes of Chewy Promo Codes \u0026nbsp; There are several types of Chewy promo codes available, including:\n$20 Off First Order: Get $20 off your first order at Chewy with this exclusive promo code. $30 Off: Enjoy $30 off select pet supplies and food with this promo code. 50% Off Pet Food: Stock up on pet food and save 50% with this promo code. Free Shipping: Get free shipping on select orders with this promo code. How to Use Chewy Promo Codes \u0026nbsp; Using Chewy promo codes is easy! Here\u0026rsquo;s a step-by-step guide:\nVisit Chewy\u0026rsquo;s Website: Head to Chewy.com and browse through their selection of pet supplies and food. Find a Promo Code: Look for a promo code that matches your needs, such as the $20 off code or the 50% off pet food code. Apply the Code: Enter the promo code in the checkout page to apply the discount to your order. Verify the Discount: Make sure the discount is applied correctly by checking your order summary. Frequently Asked Questions (FAQs) \u0026nbsp; Q: What is the expiration date for Chewy promo codes? \u0026nbsp; A: Chewy promo codes usually expire after a certain period, so be sure to check the expiration dates before applying them to your order.\nQ: Can I use multiple promo codes at once? \u0026nbsp; A: No, Chewy only allows one promo code per order.\nQ: Are there any restrictions on using Chewy promo codes? \u0026nbsp; A: Yes, some promo codes may have restrictions, such as minimum order requirements or exclusions on certain products.\nQ: Can I get a refund if I use a promo code and then return my order? \u0026nbsp; A: Yes, if you use a promo code and then return your order, Chewy will refund the discount amount.\nConclusion \u0026nbsp; Chewy promo codes are a great way to save on pet supplies and food. With exclusive discounts like $20 off your first order and 50% off pet food, you can stock up on your pet\u0026rsquo;s essentials without breaking the bank. Remember to check the expiration dates and restrictions before applying promo codes to your order. Happy shopping!\nNote: The featured image should be a high-quality image related to the topic, such as a picture of a pet with Chewy products. Make sure to upload the image to your website and update the image URL in the YAML frontmatter."
      })
      .add(
      
      
      
      
      
      {
        id: 3,
        href: "/blog/contact/",
        title: "Contact Us",
        description: "Get in touch with the team.",
        
        
        content: "Drop us a line\rHave a question about our AI setup, or want to collaborate? Send us a message.\nYour Name\rEmail Address\rMessage\rSend Message"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 4,
        href: "/blog/posts/dell-coupon-codes-20-off-for-june-2026/",
        title: "Dell Coupon Codes: 20% Off for...",
        description: "Get up to 20% off with verified Dell promo codes and enjoy significant discounts on laptops, Alienware monitors, and other tech products.",
        
        
        content: "Enjoy Huge Savings with Dell Coupon Codes: 20% Off for June 2026 \u0026nbsp; Are you planning to upgrade your tech arsenal or buy a new laptop? Look no further than Dell\u0026rsquo;s impressive range of products and exclusive deals. For a limited time, you can enjoy 20% off with verified Dell promo code, plus get up to $600 off laptops, Alienware monitors, and all things tech. In this article, we\u0026rsquo;ll explore the details of these incredible offers and guide you on how to redeem them.\nWhat\u0026rsquo;s on Offer? \u0026nbsp; Get 20% off with verified Dell promo code Enjoy up to $600 off laptops Take advantage of significant discounts on Alienware monitors Explore various other tech products with substantial savings Popular Dell Products with Discounts \u0026nbsp; Laptops: Save up to $600 on a wide range of Dell laptops, from budget-friendly options to high-performance gaming laptops. Alienware Monitors: Get exclusive discounts on Alienware monitors, perfect for gaming, graphics design, or video editing. Desktops: Enjoy significant savings on Dell desktops, ideal for home offices or gaming setups. Tablets: Find affordable tablet options with impressive specifications and features. How to Redeem Dell Coupon Codes? \u0026nbsp; Visit the official Dell website or authorized retailers. Browse the various product categories, including laptops, Alienware monitors, and more. Click on the \u0026ldquo;Promo Codes\u0026rdquo; or \u0026ldquo;Discounts\u0026rdquo; section to access the available offers. Apply the verified Dell promo code at checkout to enjoy the 20% discount. Complete the purchase and enjoy your new tech gear! Tips for Maximizing Your Savings: \u0026nbsp; Combine Offers: Look for opportunities to stack multiple discounts, such as using a promo code alongside a sale price. Free Shipping: Check if your order qualifies for free shipping, which can add significant savings to your purchase. Warranty and Support: Consider purchasing extended warranty or support plans to protect your investment. Frequently Asked Questions \u0026nbsp; Q: Are Dell coupon codes exclusive to new customers? A: No, Dell coupon codes are available to all customers, both new and existing.\nQ: Can I use multiple promo codes on a single order? A: Yes, you can combine multiple promo codes, but check the terms and conditions to ensure they can be stacked.\nQ: How long do Dell coupon codes typically last? A: Dell coupon codes usually have a limited validity period, ranging from a few days to a few weeks.\nQ: Can I use Dell coupon codes on refurbished products? A: No, Dell coupon codes are not applicable to refurbished products.\nQ: Where can I find verified Dell promo codes? A: You can find verified Dell promo codes on the official Dell website, authorized retailers, or through reputable coupon websites.\nDon\u0026rsquo;t miss out on this incredible opportunity to upgrade your tech arsenal with Dell\u0026rsquo;s exclusive deals. Use the verified Dell promo code to enjoy 20% off and get up to $600 off laptops, Alienware monitors, and other tech products. Happy shopping!"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 5,
        href: "/blog/posts/home-depot-promo-codes-50-off-in-june-2026/",
        title: "Home Depot Promo Codes: 50% Of...",
        description: "Save up to 50% on appliances, power tools, and more with the latest Home Depot promo codes in June 2026.",
        
        
        content: "Home Depot Promo Codes: 50% Off in June 2026 \u0026nbsp; Are you planning a home improvement project this summer? Look no further than Home Depot, the leading retailer of home improvement products and services. With their latest promo codes, you can save up to 50% on a wide range of products, including appliances, power tools, and more.\nWhat\u0026rsquo;s Included in the Promo Codes? \u0026nbsp; Home Depot\u0026rsquo;s latest promo codes offer discounts on a variety of products, including:\nAppliances: Save up to 40% on top brands like Whirlpool, LG, and Samsung Power Tools: Get up to 50% off on power tools from brands like DeWalt, Makita, and Milwaukee Building Materials: Save up to 30% on lumber, drywall, and other building materials Home Decor: Get up to 40% off on furniture, lighting, and other home decor items Lawn and Garden: Save up to 25% on lawn mowers, gardening tools, and other outdoor products How to Use the Promo Codes \u0026nbsp; Using the promo codes is easy:\nVisit the Home Depot website or mobile app Browse the products you\u0026rsquo;re interested in purchasing Click on the product to view its details Look for the promo code section at the bottom of the page Enter the promo code in the designated field Click \u0026ldquo;Apply\u0026rdquo; to see the discount applied to your order Tips and Tricks for Maxing Out Your Savings \u0026nbsp; Here are some additional tips to help you make the most of Home Depot\u0026rsquo;s promo codes:\nSign up for the Home Depot email newsletter to receive exclusive promo codes and discounts Follow Home Depot on social media to stay up-to-date on new promo codes and sales Use cashback apps like Rakuten or Ebates to earn additional rewards on your purchases Combine promo codes with other discounts, like sales or clearance events, to maximize your savings FAQ \u0026nbsp; Q: How long do the promo codes last? A: Promo codes are valid for a limited time only, usually until the end of June 2026. Q: Can I use multiple promo codes at once? A: No, you can only use one promo code per order. Q: Do promo codes apply to all products? A: No, promo codes only apply to select products, so be sure to check the terms and conditions before making a purchase. Q: Can I use promo codes in-store? A: Yes, you can use promo codes in-store by printing or showing the code on your mobile device. Conclusion \u0026nbsp; Home Depot\u0026rsquo;s latest promo codes offer a fantastic opportunity to save up to 50% on a wide range of products. Whether you\u0026rsquo;re planning a major home renovation or just need to pick up a few essentials, these promo codes can help you stay within your budget. Don\u0026rsquo;t miss out on this amazing chance to save – visit Home Depot today and start shopping!"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 6,
        href: "/blog/posts/how-to-turn-off-ai-in-your-google-docs/",
        title: "How to turn off AI in your Goo...",
        description: "Learn how to disable AI-powered features in Google Docs and stop 'write with Gemini' pop-ups.",
        
        
        content: "Introduction \u0026nbsp; Are you tired of seeing \u0026ldquo;write with Gemini\u0026rdquo; pop-ups in your Google Docs? You\u0026rsquo;re not alone. Many users have been experiencing this issue, and it can be frustrating, especially when you\u0026rsquo;re in the middle of an important project. In this article, we\u0026rsquo;ll show you how to turn off AI-powered features in Google Docs and get rid of those pesky pop-ups.\nWhat is Gemini? \u0026nbsp; Before we dive into the solution, let\u0026rsquo;s take a look at what Gemini is. Gemini is an AI-powered writing tool developed by Google. It\u0026rsquo;s designed to help users with their writing tasks, such as suggesting alternative phrases, providing grammar and spell checks, and even assisting with content creation. While it can be a useful tool for some, others may find it distracting or unnecessary.\nWhy are you seeing \u0026ldquo;write with Gemini\u0026rdquo; pop-ups? \u0026nbsp; If you\u0026rsquo;re seeing \u0026ldquo;write with Gemini\u0026rdquo; pop-ups in your Google Docs, it\u0026rsquo;s likely because you have the Gemini feature enabled. This feature can be enabled by default, or you may have accidentally turned it on while exploring the Google Docs settings. Either way, it\u0026rsquo;s easy to disable, and we\u0026rsquo;ll show you how.\nHow to turn off \u0026ldquo;write with Gemini\u0026rdquo; pop-ups \u0026nbsp; To turn off \u0026ldquo;write with Gemini\u0026rdquo; pop-ups, follow these steps:\nOpen your Google Docs document Click on the \u0026ldquo;Tools\u0026rdquo; menu Select \u0026ldquo;Settings\u0026rdquo; Scroll down to the \u0026ldquo;Gemini\u0026rdquo; section Toggle off the \u0026ldquo;Enable Gemini\u0026rdquo; switch Alternatively, you can also disable Gemini by:\nGoing to the Google Docs settings page Clicking on the \u0026ldquo;General\u0026rdquo; tab Scrolling down to the \u0026ldquo;Gemini\u0026rdquo; section Unchecking the box next to \u0026ldquo;Enable Gemini\u0026rdquo; Benefits of disabling Gemini \u0026nbsp; Disabling Gemini can have several benefits, including:\nReduced distractions: With Gemini disabled, you won\u0026rsquo;t see those pesky pop-ups anymore, allowing you to focus on your work. Improved performance: Gemini can consume system resources, which can slow down your computer. Disabling it can help improve your computer\u0026rsquo;s performance. More control: By disabling Gemini, you have more control over your writing experience. You can choose to use other writing tools or features that better suit your needs. Drawbacks of disabling Gemini \u0026nbsp; While disabling Gemini can have its benefits, there are also some drawbacks to consider:\nLoss of features: Gemini provides some useful features, such as grammar and spell checks, and content suggestions. Disabling it means you\u0026rsquo;ll no longer have access to these features. Reduced productivity: Some users may find that Gemini helps them with their writing tasks. Disabling it may reduce their productivity and slow down their writing process. Tips for using Gemini effectively \u0026nbsp; If you decide to keep Gemini enabled, here are some tips for using it effectively:\nUse it for specific tasks: Gemini can be useful for specific tasks, such as proofreading or content creation. Use it for these tasks, and disable it for others. Customize your settings: You can customize your Gemini settings to suit your needs. For example, you can adjust the frequency of pop-ups or disable certain features. Experiment with other tools: Don\u0026rsquo;t rely solely on Gemini. Experiment with other writing tools and features to find what works best for you. FAQ \u0026nbsp; Q: What is Gemini, and how does it work? \u0026nbsp; A: Gemini is an AI-powered writing tool developed by Google. It uses machine learning algorithms to analyze your writing and provide suggestions, grammar and spell checks, and content creation assistance.\nQ: Can I disable Gemini for specific documents? \u0026nbsp; A: Yes, you can disable Gemini for specific documents. To do this, open the document, click on the \u0026ldquo;Tools\u0026rdquo; menu, select \u0026ldquo;Settings,\u0026rdquo; and toggle off the \u0026ldquo;Enable Gemini\u0026rdquo; switch.\nQ: Will disabling Gemini affect my Google Docs account? \u0026nbsp; A: No, disabling Gemini will not affect your Google Docs account. It will only disable the Gemini feature for the specific document or account you\u0026rsquo;re using.\nQ: Can I re-enable Gemini if I change my mind? \u0026nbsp; A: Yes, you can re-enable Gemini at any time. To do this, follow the same steps you used to disable it, and toggle the \u0026ldquo;Enable Gemini\u0026rdquo; switch back on.\nConclusion \u0026nbsp; In conclusion, turning off \u0026ldquo;write with Gemini\u0026rdquo; pop-ups in Google Docs is easy. By following the steps outlined in this article, you can disable Gemini and get rid of those pesky pop-ups. Whether you\u0026rsquo;re a student, writer, or business professional, disabling Gemini can help you stay focused and improve your productivity. Remember to consider the benefits and drawbacks of disabling Gemini, and experiment with other writing tools and features to find what works best for you. Happy writing!"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 7,
        href: "/blog/posts/hulk-punisher-join-peter-parker-in-spider-man-brand-new-day-trailer/",
        title: "Hulk, Punisher join Peter Park...",
        description: "Peter Parker makes a shocking comment to Bruce Banner in the latest Spider-Man: Brand New Day trailer.",
        
        
        content: "The Latest Spider-Man: Brand New Day Trailer Reveals a Jaw-Dropping Moment \u0026nbsp; The highly anticipated Spider-Man: Brand New Day trailer has finally dropped, and it\u0026rsquo;s left fans stunned. The latest installment in the Marvel Cinematic Universe (MCU) has been making waves, and the latest trailer has taken it to the next level. One of the most shocking moments from the trailer has been Peter Parker\u0026rsquo;s comment to Bruce Banner, \u0026ldquo;I didn\u0026rsquo;t know you could get that big.\u0026rdquo;\nA Glimpse into the Epic Battle \u0026nbsp; The trailer gives us a glimpse into the epic battle that\u0026rsquo;s about to unfold in Spider-Man: Brand New Day. The movie promises to bring together some of the most iconic characters from the Marvel universe, including the Hulk, Punisher, and of course, Spider-Man. The trailer shows us a glimpse of the chaos that ensues when these characters come together, and it\u0026rsquo;s clear that this movie is going to be a wild ride.\nWhat\u0026rsquo;s in Store for the Fans? \u0026nbsp; The trailer promises a thrilling adventure that will take Spider-Man to new heights. We see glimpses of the Hulk, who looks like he\u0026rsquo;s been pumped up to new levels of size and power. The Punisher is also making an appearance, and it looks like he\u0026rsquo;s brought his signature intensity to the battle. Peter Parker\u0026rsquo;s comment to Bruce Banner is a clever nod to the comic book origins of the Hulk. The Hulk\u0026rsquo;s Size: A Marvel-ous Moment \u0026nbsp; Peter Parker\u0026rsquo;s comment to Bruce Banner has left fans wondering just how big the Hulk can get. In the comics, the Hulk\u0026rsquo;s size is often depicted as being enormous, but this is the first time we\u0026rsquo;ve seen him at this scale on the big screen. The trailer doesn\u0026rsquo;t give us a clear answer, but it\u0026rsquo;s clear that the Hulk is bigger and badder than ever before.\nA Closer Look at the Trailer \u0026nbsp; Here are some key takeaways from the trailer:\nThe trailer promises a lot of action and adventure. We see glimpses of the Avengers, who are likely to play a key role in the movie. The movie is set to release in theaters later this year. Fans are already speculating about the plot and the characters\u0026rsquo; roles in the movie. What\u0026rsquo;s Next for Spider-Man: Brand New Day? \u0026nbsp; The trailer has left fans eagerly anticipating the release of Spider-Man: Brand New Day. With its epic battle scenes, thrilling adventure, and nods to the comic book origins of the characters, this movie is shaping up to be a wild ride. Stay tuned for more updates and behind-the-scenes peeks into the making of this Marvel masterpiece.\nFrequently Asked Questions \u0026nbsp; Q: When is Spider-Man: Brand New Day set to release? A: The movie is set to release in theaters later this year.\nQ: Who will be starring in Spider-Man: Brand New Day? A: The movie will star Tom Holland as Spider-Man, alongside Mark Ruffalo as Bruce Banner and Jon Bernthal as the Punisher.\nQ: What\u0026rsquo;s the plot of Spider-Man: Brand New Day? A: The plot is still under wraps, but it promises to bring together some of the most iconic characters from the Marvel universe in a thrilling adventure.\nQ: Will the Hulk be a major part of the movie? A: Yes, the Hulk will be a major part of the movie, and it looks like he\u0026rsquo;s going to be bigger and badder than ever before."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 8,
        href: "/blog/posts/locked-out-of-the-world-cup-a-year-marked-by-barriers-borders-and-broken-access/",
        title: "Locked Out of the World Cup: A...",
        description: "As the 2026 World Cup approaches, concerns are rising about accessibility for Arab fans, with many facing restrictions and barriers that threaten to lock them out of the global celebration.",
        
        
        content: "Locked Out of the World Cup: A Year Marked by Barriers, Borders, and Broken Access \u0026nbsp; The 2026 World Cup is just around the corner, and excitement is building across the globe. However, a growing concern is emerging that threatens to dampen the enthusiasm of Arab fans – the very people who have been instrumental in making the World Cup a truly global event. As the big day approaches, many are finding themselves locked out of the festivities due to strict travel restrictions, visa hurdles, and other obstacles that are leaving them feeling frustrated and excluded.\nThe Problem: Restricted Access for Arab Fans \u0026nbsp; Travel restrictions: Several countries have imposed strict travel restrictions on Arab nationals, making it difficult for them to enter the host countries. Visa hurdles: The visa application process has become increasingly complex, with many Arab fans facing long delays or even being rejected. Security measures: Enhanced security measures have been put in place to prevent potential threats, but these have inadvertently created barriers for Arab fans. Language barriers: Many Arab fans may not speak the local language, making it even more challenging for them to navigate the complex visa application process. The Impact: A Celebration Marred by Exclusion \u0026nbsp; The 2026 World Cup is supposed to be a celebration of football, unity, and global culture. However, the restrictions and barriers facing Arab fans are threatening to turn this joyous occasion into a painful experience for many.\nEconomic impact: The World Cup is a significant economic driver, with millions of dollars being spent on tickets, travel, and accommodations. By locking out Arab fans, these countries are potentially losing out on revenue. Cultural impact: The World Cup is a unique opportunity for people from different cultures to come together and celebrate their shared love of football. By excluding Arab fans, these countries are denying themselves the chance to engage with a vibrant and passionate community. Reputation impact: The World Cup is a high-profile event that is watched by millions of people around the world. By restricting access to Arab fans, these countries are risking damage to their reputation and credibility. The Solution: A More Inclusive World Cup \u0026nbsp; So, what can be done to address the concerns of Arab fans and make the 2026 World Cup a more inclusive event?\nSimplify visa applications: Make the visa application process easier and more streamlined to reduce the burden on Arab fans. Increase transparency: Provide clear and concise information about travel restrictions and visa requirements to avoid confusion and misunderstandings. Language support: Offer language support to help Arab fans navigate the complex visa application process. Cultural exchange programs: Establish cultural exchange programs to promote understanding and engagement between Arab fans and fans from other countries. FAQs \u0026nbsp; Q: What are the travel restrictions facing Arab fans?\nA: Several countries have imposed strict travel restrictions on Arab nationals, making it difficult for them to enter the host countries.\nQ: What are the visa hurdles facing Arab fans?\nA: The visa application process has become increasingly complex, with many Arab fans facing long delays or even being rejected.\nQ: What are the security measures in place for the World Cup?\nA: Enhanced security measures have been put in place to prevent potential threats, but these have inadvertently created barriers for Arab fans.\nQ: How can Arab fans access more information about travel restrictions and visa requirements?\nA: Arab fans can access more information about travel restrictions and visa requirements by visiting the official website of the World Cup or contacting the relevant embassy or consulate."
      })
      .add(
      
      
      
      
      
      {
        id: 9,
        href: "/blog/thanks/",
        title: "Message Sent",
        description: "Thank you for contacting us.",
        
        
        content: "Message Sent!\rThank you for reaching out. Check your inbox for a confirmation email.\nReturn Home"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 10,
        href: "/blog/posts/midjourney-goes-from-generating-cat-images-to-full-body-ultrasound-scans/",
        title: "Midjourney goes from generatin...",
        description: "Midjourney's new ultrasound scanner marks a significant shift from AI image generation to medical tech",
        
        
        content: "Introduction to Midjourney\u0026rsquo;s New Venture \u0026nbsp; Midjourney, a company known for its AI image generator that can produce stunning \u0026ldquo;cat pictures\u0026rdquo; and other artistic creations, has recently unveiled its first hardware product. The Midjourney Scanner, an ultrasound-based full-body scanner, marks a significant shift in the company\u0026rsquo;s focus from artificial intelligence to medical technology. In this article, we will delve into the details of this new product, its potential applications, and what this means for the future of Midjourney.\nWhat is The Midjourney Scanner? \u0026nbsp; The Midjourney Scanner is an innovative device that uses a ring of sensors to capture vertical ultrasound scans of the human body. This technology has the potential to revolutionize the field of medical imaging, providing healthcare professionals with a new tool for diagnosing and monitoring various health conditions. The scanner\u0026rsquo;s ability to capture full-body scans could lead to more accurate diagnoses and better patient outcomes.\nKey Features of The Midjourney Scanner \u0026nbsp; Some of the key features of The Midjourney Scanner include:\nUltrasound-based technology: The scanner uses ultrasound waves to capture images of the body, providing a non-invasive and safe method for medical imaging. Full-body scans: The device can capture vertical scans of the entire body, allowing for a comprehensive view of a patient\u0026rsquo;s health. Ring of sensors: The scanner features a ring of sensors that work together to capture high-quality images of the body. Potential for medical breakthroughs: The Midjourney Scanner could lead to new discoveries and advancements in the field of medical imaging. Potential Applications of The Midjourney Scanner \u0026nbsp; The Midjourney Scanner has a wide range of potential applications in the medical field, including:\nCancer diagnosis: The scanner could be used to detect and monitor cancerous tumors, allowing for earlier intervention and treatment. Cardiovascular health: The device could be used to monitor cardiovascular health, detecting conditions such as heart disease and stroke. Musculoskeletal health: The scanner could be used to diagnose and monitor musculoskeletal conditions, such as osteoarthritis and sports injuries. Research and development: The Midjourney Scanner could be used in research settings to study the human body and develop new medical treatments. Midjourney\u0026rsquo;s Plans for a San Francisco Spa \u0026nbsp; In addition to developing The Midjourney Scanner, the company has also announced plans to build a San Francisco spa. This may seem like an unusual move for a company that has focused on AI image generation, but it could be an opportunity for Midjourney to explore the intersection of technology and wellness. The spa could potentially feature The Midjourney Scanner as a tool for providing personalized health and wellness services.\nThe Intersection of Technology and Wellness \u0026nbsp; The concept of a tech-enabled spa is not new, but it is an area that is gaining increasing attention. By combining advanced technology, such as The Midjourney Scanner, with traditional spa services, Midjourney could create a unique and innovative experience for its customers. This could include:\nPersonalized health assessments: The scanner could be used to provide personalized health assessments, allowing customers to gain a deeper understanding of their health and wellness. Targeted treatments: The device could be used to develop targeted treatments, such as customized exercise programs or nutrition plans. Holistic approach to health: The spa could take a holistic approach to health, incorporating traditional spa services with advanced technology to provide a comprehensive wellness experience. FAQ \u0026nbsp; Q: What is The Midjourney Scanner? \u0026nbsp; A: The Midjourney Scanner is an ultrasound-based full-body scanner that uses a ring of sensors to capture vertical scans of the human body.\nQ: What are the potential applications of The Midjourney Scanner? \u0026nbsp; A: The scanner has a wide range of potential applications, including cancer diagnosis, cardiovascular health, musculoskeletal health, and research and development.\nQ: What is Midjourney\u0026rsquo;s plan for a San Francisco spa? \u0026nbsp; A: Midjourney plans to build a San Francisco spa that could feature The Midjourney Scanner as a tool for providing personalized health and wellness services.\nQ: How does The Midjourney Scanner work? \u0026nbsp; A: The scanner uses ultrasound waves to capture images of the body, providing a non-invasive and safe method for medical imaging.\nQ: Is The Midjourney Scanner available for public use? \u0026nbsp; A: The scanner is not yet available for public use, but it has the potential to revolutionize the field of medical imaging and improve patient outcomes.\nConclusion \u0026nbsp; Midjourney\u0026rsquo;s shift from generating \u0026ldquo;cat pictures\u0026rdquo; to developing an ultrasound-based full-body scanner marks a significant change in the company\u0026rsquo;s focus. The Midjourney Scanner has the potential to revolutionize the field of medical imaging, providing healthcare professionals with a new tool for diagnosing and monitoring various health conditions. With its plans for a San Francisco spa, Midjourney is also exploring the intersection of technology and wellness, creating a unique and innovative experience for its customers. As the company continues to develop and refine its technology, it will be exciting to see the impact that The Midjourney Scanner has on the medical field and beyond."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 11,
        href: "/blog/posts/nasa-picks-eric-schmidts-rocket-company-for-mars-mission-setting-up-a-race-with-spacex/",
        title: "NASA picks Eric Schmidt’s rock...",
        description: "NASA selects Relativity Space for Mars mission, sparking competition with SpaceX",
        
        
        content: "Introduction to the Mars Mission \u0026nbsp; The space industry has been abuzz with excitement as Relativity Space, a rocket maker acquired by former Google executive chair Eric Schmidt, has been selected by NASA for a Mars mission. This news has sparked a heated competition with SpaceX, another prominent player in the space technology sector. In this article, we will delve into the details of this development and explore what it means for the future of space exploration.\nAbout Relativity Space \u0026nbsp; Relativity Space is a privately-funded aerospace manufacturer that has been making waves in the industry with its innovative approach to rocket design and manufacturing. The company\u0026rsquo;s acquisition by Eric Schmidt last year marked a significant turning point in its journey, providing it with the necessary resources to overcome the challenges it faced in its path to orbit. With a strong focus on disrupting the traditional aerospace industry, Relativity Space is poised to make a significant impact in the years to come.\nThe Mars Mission \u0026nbsp; The Mars mission, which is slated to launch in the near future, will mark a major milestone in the history of space exploration. The mission aims to send a spacecraft to the Red Planet, with the ultimate goal of establishing a human settlement. Relativity Space\u0026rsquo;s selection for this mission is a testament to its capabilities and expertise in the field of rocket design and manufacturing.\nKey Features of the Mission \u0026nbsp; Some of the key features of the Mars mission include:\nA state-of-the-art spacecraft designed to withstand the harsh conditions of space travel A advanced propulsion system that will enable the spacecraft to travel to Mars in a relatively short period of time A sophisticated communication system that will enable the spacecraft to stay in touch with Earth throughout its journey A robust landing system that will ensure a safe and successful touchdown on the Martian surface Competition with SpaceX \u0026nbsp; The selection of Relativity Space for the Mars mission has sparked a heated competition with SpaceX, which has been a dominant player in the space technology sector for several years. SpaceX, which was founded by Elon Musk, has been working towards establishing a human settlement on Mars for several years and has made significant progress in its mission to send humans to the Red Planet.\nKey Differences between Relativity Space and SpaceX \u0026nbsp; Some of the key differences between Relativity Space and SpaceX include:\nApproach to rocket design: Relativity Space is focused on developing a more traditional rocket design, while SpaceX is pushing the boundaries of innovation with its reusable rockets. Mission objectives: While both companies are working towards establishing a human settlement on Mars, their mission objectives and timelines differ significantly. Funding and resources: SpaceX has a significant advantage when it comes to funding and resources, having received billions of dollars in investment over the years. Implications of the Mission \u0026nbsp; The selection of Relativity Space for the Mars mission has significant implications for the future of space exploration. It marks a major milestone in the development of private space companies and highlights the importance of innovation and disruption in the industry.\nPotential Benefits of the Mission \u0026nbsp; Some of the potential benefits of the mission include:\nAdvancements in space technology: The mission will drive innovation and advancements in space technology, leading to significant improvements in rocket design, propulsion systems, and communication technologies. Establishment of a human settlement: The mission will pave the way for the establishment of a human settlement on Mars, which will have significant implications for the future of humanity. Inspiration and education: The mission will inspire and educate people around the world, promoting interest in science, technology, engineering, and mathematics (STEM) fields. FAQ \u0026nbsp; Q: What is the main objective of the Mars mission? \u0026nbsp; A: The main objective of the Mars mission is to establish a human settlement on the Red Planet.\nQ: Who is behind Relativity Space? \u0026nbsp; A: Relativity Space is backed by former Google executive chair Eric Schmidt, who acquired the company last year.\nQ: What is the significance of the mission for SpaceX? \u0026nbsp; A: The mission marks a significant challenge for SpaceX, which has been a dominant player in the space technology sector for several years.\nQ: What are the potential benefits of the mission? \u0026nbsp; A: The potential benefits of the mission include advancements in space technology, establishment of a human settlement, and inspiration and education.\nQ: When is the mission scheduled to launch? \u0026nbsp; A: The mission is slated to launch in the near future, although an exact date has not been announced.\nConclusion \u0026nbsp; The selection of Relativity Space for the Mars mission marks a significant development in the space industry, highlighting the importance of innovation and disruption in the sector. As the mission progresses, it will be interesting to see how Relativity Space and SpaceX compete and collaborate to achieve their goals. One thing is certain, however - the future of space exploration is looking brighter than ever, and we can expect significant advancements in the years to come."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 12,
        href: "/blog/posts/nordvpn-coupons-75-off-plus-3-months-free-in-june-2026/",
        title: "NordVPN Coupons: 75% Off, Plus...",
        description: "Save up to 77% on 2-year plans and get 3 free months with our NordVPN discount codes - A top-notch VPN service for secure online browsing.",
        
        
        content: "NordVPN Coupons: Unlock Unbeatable Savings for Secure Online Browsing \u0026nbsp; Are you tired of compromising on your online security due to high VPN costs? Look no further! NordVPN, a leading provider of top-notch VPN services, has launched an exciting promotion that lets you save up to 77% on 2-year plans, plus enjoy 3 free months. In this article, we\u0026rsquo;ll delve into the world of NordVPN coupons, exploring the benefits, features, and steps to redeem these incredible savings.\nBenefits of Using NordVPN \u0026nbsp; Before we dive into the promotional details, let\u0026rsquo;s quickly review the benefits of using NordVPN:\nFast and Secure Browsing: NordVPN uses military-grade encryption to ensure your online activities remain private and secure. Unblock Geo-Restricted Content: Access your favorite streaming services, social media platforms, and websites from anywhere in the world. Malware Protection: NordVPN\u0026rsquo;s advanced malware protection keeps your device safe from online threats. Customer Support: Enjoy 24/7 customer support through multiple channels, including live chat and email. NordVPN Coupons: Exclusive Offers for Secure Online Browsing \u0026nbsp; Now, let\u0026rsquo;s focus on the promotional aspect. NordVPN is offering an unbeatable deal:\n77% Off 2-Year Plans: Get up to 77% off on 2-year plans, making it an affordable option for those seeking long-term security. 3 Free Months: Enjoy an additional 3 months of free service on top of your 2-year plan. How to Redeem NordVPN Coupons \u0026nbsp; Redeeming these exclusive offers is a straightforward process:\nVisit the Official NordVPN Website: Head to the NordVPN website and click on the \u0026ldquo;Get Started\u0026rdquo; button. Select Your Plan: Choose a 2-year plan that suits your needs. Apply the Coupon Code: Enter the provided coupon code to unlock your exclusive savings. Complete the Payment Process: Follow the on-screen instructions to complete the payment process. Tips and Tricks for Maximizing Your Savings \u0026nbsp; To make the most of this promotion, keep the following tips in mind:\nAct Quickly: Limited-time offers might expire, so don\u0026rsquo;t hesitate to redeem your NordVPN coupons. Check for Updates: NordVPN often releases new promotions and updates, so stay informed to snag the best deals. Refer Friends: Share the benefits of NordVPN with friends and family to earn rewards and discounts. Frequently Asked Questions (FAQs) \u0026nbsp; Still have questions about NordVPN coupons or the promotion? Here are some frequently asked questions and answers:\nQ: What is the duration of the promotion? \u0026nbsp; A: The promotion is valid for a limited time only.\nQ: Can I cancel my subscription at any time? \u0026nbsp; A: Yes, you can cancel your subscription at any time, but please note that refunds may not be available for partially used services.\nQ: Is NordVPN available on multiple devices? \u0026nbsp; A: Yes, NordVPN supports multiple devices, including desktop, mobile, and smart home devices.\nQ: What payment methods are accepted? \u0026nbsp; A: NordVPN accepts various payment methods, including credit cards, PayPal, and cryptocurrencies.\nQ: How do I contact customer support? \u0026nbsp; A: You can reach out to NordVPN\u0026rsquo;s customer support team through live chat, email, or phone.\nIn conclusion, NordVPN coupons offer an unbeatable opportunity to save up to 77% on 2-year plans and enjoy 3 free months of secure online browsing. By following the steps outlined in this article, you can unlock these incredible savings and experience the best of NordVPN\u0026rsquo;s features and benefits. Don\u0026rsquo;t miss out on this limited-time offer and secure your online presence today!"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 13,
        href: "/blog/posts/second-carcass-eating-fly-species-cleared-by-fda-for-maggot-wound-therapy/",
        title: "Second carcass-eating fly spec...",
        description: "Maggot therapy lacks robust data but has fans and a fail-safe bacon therapy",
        
        
        content: "Introduction to Maggot Therapy \u0026nbsp; Maggot therapy, also known as maggot debridement therapy (MDT), is a type of biotherapy that involves the use of live maggots to clean and heal wounds. The concept of maggot therapy has been around for centuries, with reports of its use dating back to the American Civil War. Despite its long history, maggot therapy has only recently gained popularity as a treatment option for chronic wounds, such as diabetic foot ulcers and venous leg ulcers.\nHow Maggot Therapy Works \u0026nbsp; Maggot therapy works by introducing live maggots into a wound, where they feed on dead tissue, bacteria, and other debris. The maggots produce enzymes that break down the dead tissue, allowing for the growth of new, healthy tissue. The maggots also stimulate the wound to produce growth factors, which promote healing and tissue regeneration.\nBenefits of Maggot Therapy \u0026nbsp; The benefits of maggot therapy include:\nEffective debridement: Maggots are highly effective at removing dead tissue and debris from wounds, which can help to promote healing and prevent infection. Low risk of infection: Maggots are sterile and do not produce toxins, making them a low-risk treatment option for wounds. Cost-effective: Maggot therapy can be a cost-effective treatment option compared to traditional wound care methods. Fail-safe \u0026ldquo;bacon therapy\u0026rdquo;: In cases where maggot therapy is not effective, \u0026ldquo;bacon therapy\u0026rdquo; can be used as a fail-safe option. This involves wrapping the wound in bacon to attract maggots and promote healing. FDA Approval of Maggot Therapy \u0026nbsp; In recent years, the FDA has approved the use of maggot therapy for the treatment of chronic wounds. The FDA has cleared two species of flies, Lucilia sericata and Phormia regina, for use in maggot therapy. These flies are specifically bred for use in maggot therapy and are raised in controlled environments to ensure their safety and efficacy.\nRobust Data Lacking \u0026nbsp; Despite the growing popularity of maggot therapy, there is a lack of robust data to support its effectiveness. Many of the studies that have been conducted on maggot therapy are small and have methodological limitations, making it difficult to draw conclusions about its efficacy. Additionally, there is limited data on the long-term effects of maggot therapy and its potential risks and complications.\nFans of Maggot Therapy \u0026nbsp; Despite the lack of robust data, maggot therapy has a dedicated following among some healthcare professionals and patients. Proponents of maggot therapy argue that it is a safe and effective treatment option that can be used in conjunction with traditional wound care methods. They also point to the cost-effectiveness of maggot therapy and its potential to reduce the risk of infection and promote healing.\nConclusion \u0026nbsp; Maggot therapy is a type of biotherapy that involves the use of live maggots to clean and heal wounds. While it has been used for centuries, maggot therapy has only recently gained popularity as a treatment option for chronic wounds. Despite the lack of robust data to support its effectiveness, maggot therapy has a dedicated following among some healthcare professionals and patients. As research continues to emerge on the safety and efficacy of maggot therapy, it is likely that its use will become more widespread in the treatment of chronic wounds.\nFrequently Asked Questions \u0026nbsp; Q: What is maggot therapy? \u0026nbsp; A: Maggot therapy is a type of biotherapy that involves the use of live maggots to clean and heal wounds.\nQ: How does maggot therapy work? \u0026nbsp; A: Maggot therapy works by introducing live maggots into a wound, where they feed on dead tissue, bacteria, and other debris.\nQ: What are the benefits of maggot therapy? \u0026nbsp; A: The benefits of maggot therapy include effective debridement, low risk of infection, cost-effectiveness, and a fail-safe \u0026ldquo;bacon therapy\u0026rdquo; option.\nQ: Is maggot therapy FDA-approved? \u0026nbsp; A: Yes, the FDA has approved the use of maggot therapy for the treatment of chronic wounds.\nQ: What are the potential risks and complications of maggot therapy? \u0026nbsp; A: The potential risks and complications of maggot therapy include infection, allergic reactions, and the potential for the maggots to migrate to other parts of the body.\nQ: Can maggot therapy be used in conjunction with traditional wound care methods? \u0026nbsp; A: Yes, maggot therapy can be used in conjunction with traditional wound care methods, such as antibiotics and wound dressings."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 14,
        href: "/blog/posts/the-korean-telecom-giant-at-the-center-of-anthropics-mythos-controversy/",
        title: "The Korean Telecom Giant at th...",
        description: "SK Telecom's ties to China spark controversy over Anthropic's AI model",
        
        
        content: "Introduction \u0026nbsp; The world of artificial intelligence has been abuzz with the latest controversy surrounding Anthropic, a leading AI research company, and SK Telecom, a Korean telecom giant. In a shocking turn of events, the White House ordered Anthropic to revoke SK Telecom\u0026rsquo;s access to its most advanced AI model, Claude Mythos, due to alleged ties to China. This move has sent shockwaves throughout the tech industry, raising concerns about the regulation of AI and the potential risks of collaborating with companies linked to China.\nThe Background \u0026nbsp; Anthropic, a company founded by former Google researchers, has been making waves in the AI community with its cutting-edge models, including Claude Mythos. This AI model has been touted as one of the most advanced in the world, capable of processing and generating human-like language. SK Telecom, on the other hand, is one of the largest telecom companies in Korea, with a significant presence in the global market.\nThe partnership between Anthropic and SK Telecom was seen as a strategic move to bring AI technology to the Korean market. However, the White House\u0026rsquo;s intervention has put a spanner in the works, citing concerns about SK Telecom\u0026rsquo;s alleged ties to China. This has raised questions about the company\u0026rsquo;s involvement with Chinese entities and the potential risks of sharing sensitive AI technology with a country known for its aggressive cyber espionage activities.\nThe Controversy \u0026nbsp; The controversy surrounding Anthropic and SK Telecom is multifaceted, with several key issues at play:\nNational Security: The White House\u0026rsquo;s decision to revoke SK Telecom\u0026rsquo;s access to Claude Mythos is largely driven by concerns about national security. The US government is wary of sharing sensitive AI technology with companies linked to China, citing the risk of intellectual property theft and cyber espionage. Regulation of AI: The incident highlights the need for stricter regulation of AI technology, particularly when it comes to collaborations with foreign companies. The lack of clear guidelines and oversight has created a gray area, allowing companies to operate with relative impunity. Global Politics: The controversy is also a reflection of the complex global politics surrounding AI. The US and China are engaged in a bitter rivalry, with AI technology being a key battleground. The US is keen to maintain its lead in AI research and development, while China is aggressively pursuing its own AI ambitions. Key Players \u0026nbsp; The controversy involves several key players, including:\nAnthropic: The AI research company at the center of the controversy, Anthropic is known for its cutting-edge AI models, including Claude Mythos. SK Telecom: The Korean telecom giant, SK Telecom is a major player in the global market, with a significant presence in Korea and beyond. The White House: The US government, particularly the White House, has been instrumental in shaping the narrative around AI regulation and national security. China: The elephant in the room, China\u0026rsquo;s alleged ties to SK Telecom have sparked concerns about intellectual property theft and cyber espionage. Implications \u0026nbsp; The implications of the controversy are far-reaching, with potential consequences for:\nAI Research: The incident may lead to a slowdown in AI research and development, as companies become increasingly cautious about collaborating with foreign entities. Global Trade: The controversy may also impact global trade, particularly in the tech sector, as countries become more protective of their intellectual property and sensitive technologies. National Security: The incident highlights the need for stricter regulation of AI technology, particularly when it comes to national security. The US government may need to revisit its policies and guidelines for AI research and development. FAQ \u0026nbsp; Q: What is Claude Mythos? \u0026nbsp; A: Claude Mythos is an advanced AI model developed by Anthropic, capable of processing and generating human-like language.\nQ: Why did the White House revoke SK Telecom\u0026rsquo;s access to Claude Mythos? \u0026nbsp; A: The White House revoked SK Telecom\u0026rsquo;s access to Claude Mythos due to alleged ties to China, citing concerns about national security and intellectual property theft.\nQ: What are the implications of the controversy for AI research? \u0026nbsp; A: The controversy may lead to a slowdown in AI research and development, as companies become increasingly cautious about collaborating with foreign entities.\nQ: How will the controversy impact global trade? \u0026nbsp; A: The controversy may impact global trade, particularly in the tech sector, as countries become more protective of their intellectual property and sensitive technologies.\nQ: What are the potential consequences for national security? \u0026nbsp; A: The controversy highlights the need for stricter regulation of AI technology, particularly when it comes to national security. The US government may need to revisit its policies and guidelines for AI research and development.\nConclusion \u0026nbsp; The controversy surrounding Anthropic and SK Telecom is a complex issue, with far-reaching implications for AI research, global trade, and national security. As the world becomes increasingly dependent on AI technology, it is essential to establish clear guidelines and regulations for the development and deployment of AI models. The US government\u0026rsquo;s intervention in the Anthropic-SK Telecom partnership is a step in the right direction, but more needs to be done to ensure that AI technology is developed and used responsibly."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 15,
        href: "/blog/posts/the-sperm-maxxing-bros-are-actually-onto-something/",
        title: "The Sperm-Maxxing Bros Are Act...",
        description: "Wellness influencers have stumbled onto a huge issue when it comes male fertility, but not every solution they're pitching is good advice.",
        
        
        content: "The Sperm-Maxxing Bros Are Actually Onto Something \u0026nbsp; The Unlikely Connection Between Wellness Influencers and Male Fertility \u0026nbsp; In recent years, wellness influencers have been sharing their expertise on all things related to health and wellness. From fitness routines to dietary advice, these influencers have built massive followings and become go-to sources for people looking to improve their overall well-being. However, a recent trend has caught our attention, and it\u0026rsquo;s not just about getting fit or eating right. Wellness influencers have stumbled onto a huge issue when it comes to male fertility, and it\u0026rsquo;s time to take a closer look.\nWhat\u0026rsquo;s Driving the Conversation? \u0026nbsp; Male fertility has become a hot topic in the wellness community, with many influencers sharing their own experiences and tips for boosting sperm count and improving fertility. This sudden interest can be attributed to a combination of factors, including increasing awareness of infertility issues and the growing demand for holistic approaches to health.\nSeparating Fact from Fiction \u0026nbsp; While wellness influencers have certainly brought attention to an important issue, not every solution they\u0026rsquo;re pitching is good advice. Some of the claims being made are based on pseudoscience or anecdotal evidence, which can be misleading and even dangerous. Here are some common pitfalls to watch out for:\nUnsubstantiated claims: Be wary of influencers who make sweeping claims about the effectiveness of certain supplements or products without providing scientific evidence to back them up. Lack of expert input: Influencers who claim to be experts in male fertility without any real credentials or experience in the field should be approached with skepticism. Overemphasis on individual factors: While individual factors like diet and lifestyle can certainly impact fertility, they are only part of the equation. Other factors like genetics, environmental toxins, and medical conditions also play a significant role. What Actually Works? \u0026nbsp; So, what can men do to boost their fertility? Here are some evidence-based tips:\nMaintain a healthy weight: Being overweight or obese can negatively impact sperm count and quality. Exercise regularly: Regular physical activity can improve sperm count and reduce the risk of infertility. Eat a balanced diet: Focus on consuming a variety of whole foods, including fruits, vegetables, whole grains, and lean proteins. Avoid toxins: Exposure to environmental toxins like pesticides, heavy metals, and endocrine-disrupting chemicals can harm fertility. Manage stress: Chronic stress can negatively impact fertility, so find healthy ways to manage stress, such as through exercise, meditation, or therapy. Conclusion \u0026nbsp; The connection between wellness influencers and male fertility may seem unexpected at first, but it\u0026rsquo;s an important conversation to have. While some influencers may be promoting pseudoscientific advice, others are using their platforms to raise awareness and promote evidence-based solutions. By being informed and critically evaluating the advice we receive, we can take control of our fertility and make informed decisions about our health.\nFAQ \u0026nbsp; Q: What are some evidence-based ways to boost fertility? A: Maintaining a healthy weight, exercising regularly, eating a balanced diet, avoiding toxins, and managing stress are all evidence-based ways to boost fertility. Q: Can supplements really improve fertility? A: Some supplements like vitamin D, omega-3 fatty acids, and antioxidants may have a positive impact on fertility, but more research is needed to confirm their effectiveness. Q: How can I find credible information on male fertility? A: Look for information from reputable sources like the American Society for Reproductive Medicine (ASRM), the Centers for Disease Control and Prevention (CDC), or peer-reviewed journals."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 16,
        href: "/blog/posts/the-uk-will-scan-asylum-seekers-faces-for-age-checksdespite-knowing-the-tech-is-flawed/",
        title: "The UK Will Scan Asylum-Seeker...",
        description: "UK to use flawed age-verification tech on asylum seekers despite risks",
        
        
        content: "Introduction \u0026nbsp; The UK Home Office has been testing age-verification technology to determine the age of asylum seekers. However, internal tests have revealed that the technology is prone to life-altering errors. Despite these risks, the Home Office is moving forward with the plan to use this technology, raising concerns about the potential consequences for asylum seekers.\nWhat is Age-Verification Technology? \u0026nbsp; Age-verification technology uses artificial intelligence (AI) and machine learning algorithms to analyze facial features and estimate an individual\u0026rsquo;s age. This technology is often used in various applications, including:\nOnline age verification for accessing age-restricted content Identity verification for financial transactions Security screening at airports and border control However, the use of this technology for age verification of asylum seekers is a highly sensitive and complex issue. Asylum seekers often lack official identification documents, and their age may be disputed. In such cases, the accuracy of age-verification technology is crucial to ensure that individuals are treated fairly and humanely.\nThe Risks of Life-Altering Errors \u0026nbsp; The internal tests conducted by the Home Office have shown that the age-verification technology is prone to errors. These errors can have serious consequences for asylum seekers, including:\nIncorrect age assessment, leading to incorrect treatment and support Delayed or denied access to education, healthcare, and other essential services Increased risk of detention, deportation, or other adverse outcomes The risks of life-altering errors are particularly high for vulnerable individuals, such as unaccompanied minors, who may be incorrectly assessed as adults and subjected to adult detention or deportation.\nWhy is the Home Office Moving Forward Despite the Risks? \u0026nbsp; Despite the risks of life-altering errors, the Home Office is moving forward with the plan to use age-verification technology for asylum seekers. The reasons for this decision are not entirely clear, but possible factors include:\nPressure to reduce the backlog of asylum claims and speed up the processing of applications Concerns about the cost and resource intensity of manual age assessment processes Belief that the technology can be improved over time to reduce the risk of errors However, critics argue that the Home Office is prioritizing efficiency and cost savings over the welfare and safety of asylum seekers.\nConcerns and Criticisms \u0026nbsp; The decision to use age-verification technology for asylum seekers has been met with criticism from various stakeholders, including:\nHuman rights organizations, who argue that the technology is flawed and may lead to human rights violations Refugee advocacy groups, who express concerns about the potential consequences for asylum seekers Tech experts, who question the accuracy and reliability of the technology Some of the key concerns and criticisms include:\nLack of transparency and accountability in the development and deployment of the technology Insufficient testing and validation of the technology to ensure its accuracy and reliability Potential for bias and discrimination in the algorithmic decision-making process What Can Be Done to Address the Risks? \u0026nbsp; To address the risks associated with the use of age-verification technology for asylum seekers, the following steps can be taken:\nImprove the accuracy and reliability of the technology through further testing and validation Implement robust safeguards to prevent incorrect age assessment and ensure that individuals are treated fairly and humanely Provide transparency and accountability in the development and deployment of the technology Ensure that asylum seekers have access to effective appeal mechanisms in cases where they disagree with the age assessment Key Recommendations \u0026nbsp; Some key recommendations for the Home Office and other stakeholders include:\nConduct thorough and independent testing of the age-verification technology to ensure its accuracy and reliability Develop and implement robust safeguards to prevent incorrect age assessment and ensure that individuals are treated fairly and humanely Provide transparency and accountability in the development and deployment of the technology Ensure that asylum seekers have access to effective appeal mechanisms in cases where they disagree with the age assessment FAQ \u0026nbsp; Q: What is age-verification technology, and how does it work? \u0026nbsp; Age-verification technology uses artificial intelligence (AI) and machine learning algorithms to analyze facial features and estimate an individual\u0026rsquo;s age.\nQ: Why is the Home Office using age-verification technology for asylum seekers? \u0026nbsp; The Home Office is using age-verification technology to determine the age of asylum seekers, as they often lack official identification documents.\nQ: What are the risks associated with the use of age-verification technology for asylum seekers? \u0026nbsp; The risks include incorrect age assessment, delayed or denied access to education, healthcare, and other essential services, and increased risk of detention, deportation, or other adverse outcomes.\nQ: What can be done to address the risks associated with the use of age-verification technology for asylum seekers? \u0026nbsp; Steps can be taken to improve the accuracy and reliability of the technology, implement robust safeguards, provide transparency and accountability, and ensure that asylum seekers have access to effective appeal mechanisms.\nQ: What are the potential consequences for asylum seekers if the age-verification technology is flawed? \u0026nbsp; The potential consequences include incorrect age assessment, delayed or denied access to education, healthcare, and other essential services, and increased risk of detention, deportation, or other adverse outcomes.\nConclusion \u0026nbsp; The use of age-verification technology for asylum seekers is a complex and sensitive issue. While the technology may offer some benefits, such as increased efficiency and speed, the risks of life-altering errors are too great to ignore. The Home Office must take steps to address these risks, including improving the accuracy and reliability of the technology, implementing robust safeguards, and providing transparency and accountability. Ultimately, the welfare and safety of asylum seekers must be the top priority, and any technology used to determine their age must be subject to rigorous testing and validation to ensure that it is fair, accurate, and reliable."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 17,
        href: "/blog/posts/ulta-promo-codes-up-to-50-off-in-june-2026/",
        title: "Ulta Promo Codes: Up to 50% Of...",
        description: "Get ready to save big on beauty products with Ulta promo codes. Enjoy up to 50% off on beauty tech, makeup, and more in June 2026.",
        
        
        content: "Ulta Promo Codes: Up to 50% Off in June 2026 \u0026nbsp; Are you ready to upgrade your beauty routine without breaking the bank? Look no further than Ulta, the ultimate destination for beauty enthusiasts. With an extensive range of products from top brands, Ulta offers something for everyone. And the best part? You can save big with Ulta promo codes.\nWhy Shop at Ulta? \u0026nbsp; Before we dive into the promo codes, let\u0026rsquo;s talk about what makes Ulta stand out from the competition.\nWide selection: With hundreds of brands and thousands of products, Ulta has something for every skin type, hair type, and personal style. Quality products: Ulta only carries high-quality products from reputable brands, ensuring that you get the best results for your beauty routine. Expert advice: Whether you\u0026rsquo;re a seasoned beauty pro or a newbie, Ulta\u0026rsquo;s knowledgeable staff are always happy to help you find the perfect product for your needs. Convenience: With online shopping, in-store pickup, and free shipping on orders over $35, shopping at Ulta is as easy as can be. Ulta Promo Codes: How to Save Big \u0026nbsp; Now that we\u0026rsquo;ve covered the benefits of shopping at Ulta, let\u0026rsquo;s talk about how to save even more with Ulta promo codes.\nBeauty tech: Get up to 50% off on the latest beauty tech gadgets, including skincare devices, hair straighteners, and more. Makeup: Enjoy discounts on popular makeup brands, including foundation, eyeshadow, mascara, and more. Skincare: Save on high-quality skincare products, including moisturizers, serums, and face masks. Haircare: Get discounts on haircare products, including shampoo, conditioner, and styling products. How to Use Ulta Promo Codes \u0026nbsp; Using Ulta promo codes is easy. Here\u0026rsquo;s a step-by-step guide:\nBrowse the Ulta website: Head to the Ulta website and browse the latest products and deals. Find the promo code: Look for the promo code section on the Ulta website or search online for the latest codes. Copy the code: Copy the promo code and head to the Ulta checkout page. Paste the code: Paste the promo code into the checkout page and click \u0026ldquo;Apply.\u0026rdquo; Save big: Enjoy your discounted purchase and get ready to save big on beauty products! Ulta Promo Code FAQ \u0026nbsp; Still have questions about Ulta promo codes? Check out our FAQ section for answers to your most frequently asked questions.\nQ: Are Ulta promo codes valid online and in-store? A: Yes, many Ulta promo codes are valid both online and in-store. Q: Can I stack multiple promo codes? A: No, Ulta does not allow stacking of multiple promo codes. Q: When do Ulta promo codes expire? A: Promo codes typically expire after a set period of time, usually 1-3 months. Q: Can I use Ulta promo codes with other discounts? A: Yes, you can use Ulta promo codes with other discounts, but check the terms and conditions for any restrictions. Conclusion \u0026nbsp; Ulta promo codes are a great way to save big on beauty products. With up to 50% off on beauty tech, makeup, and more, you can upgrade your beauty routine without breaking the bank. Whether you\u0026rsquo;re a seasoned beauty pro or a newbie, Ulta has something for everyone. So why wait? Head to the Ulta website, browse the latest products and deals, and get ready to save big with Ulta promo codes!"
      })
      .add(
      
      
      
      
      
      {
        id: 18,
        href: "/blog/posts/uplift-promo-codes-570-off/",
        title: "Uplift Promo Codes: $570 Off",
        description: "Upgrade your home office with the best Uplift Desk discount codes during the Spring Setup Sale. Save on standing desks, ergonomic chairs, and accessories.",
        
        
        content: "Upgrade Your Home Office with Uplift Desk Promo Codes\nAs the world becomes increasingly digitized, having a productive and comfortable home office is more crucial than ever. To help you achieve this, Uplift Desk is offering exceptional promo codes during their Spring Setup Sale. In this article, we\u0026rsquo;ll delve into the benefits of using Uplift Desk, how to find the best discount codes, and what you can expect from their Spring Setup Sale.\nWhat Makes Uplift Desk Stand Out? \u0026nbsp; Uplift Desk has been a pioneer in the standing desk industry for years, providing high-quality products that cater to various needs and preferences. Here are some reasons why Uplift Desk stands out from the competition:\nErgonomic Design: Uplift Desks are designed with ergonomics in mind, ensuring that you maintain a comfortable posture and reduce the risk of injury. Customization Options: Uplift Desk offers a wide range of customization options, allowing you to tailor your desk to your specific needs. High-Quality Materials: Uplift Desks are crafted from high-quality materials that are durable and long-lasting. Excellent Customer Support: Uplift Desk is known for its exceptional customer support, with a team that\u0026rsquo;s always available to answer your questions and concerns. Best Uplift Desk Promo Codes for the Spring Setup Sale \u0026nbsp; During the Spring Setup Sale, Uplift Desk is offering exclusive promo codes that can help you save up to $570. Here are some of the best promo codes you can use:\nUP15: Get 15% off on all Uplift Desks and accessories UP30: Get 30% off on all ergonomic chairs and accessories UP50: Get 50% off on all standing desk accessories UP100: Get $100 off on all Uplift Desks and accessories How to Use Uplift Desk Promo Codes \u0026nbsp; Using Uplift Desk promo codes is easy. Here\u0026rsquo;s a step-by-step guide to help you get started:\nVisit the Uplift Desk website and browse through their collection of standing desks, ergonomic chairs, and accessories. Add the products you want to purchase to your cart. Click on the \u0026ldquo;Checkout\u0026rdquo; button and enter your promo code in the \u0026ldquo;Discount Code\u0026rdquo; field. Click on the \u0026ldquo;Apply\u0026rdquo; button to apply the discount. Complete your purchase and enjoy the benefits of your new Uplift Desk. Frequently Asked Questions \u0026nbsp; Q: What is the Spring Setup Sale?\nA: The Spring Setup Sale is a promotional event hosted by Uplift Desk, offering exclusive discount codes and promotions on their products.\nQ: How long does the Spring Setup Sale last?\nA: The duration of the Spring Setup Sale is not specified, but it\u0026rsquo;s recommended to check the Uplift Desk website for updates.\nQ: Can I use multiple promo codes at once?\nA: No, you can only use one promo code per purchase.\nQ: Do Uplift Desk promo codes expire?\nA: Yes, Uplift Desk promo codes have an expiration date and can only be used within a specified timeframe.\nQ: Can I use Uplift Desk promo codes on sale items?\nA: Yes, Uplift Desk promo codes can be used on sale items, but the discount cannot be combined with other promotions.\nConclusion \u0026nbsp; The Spring Setup Sale is an excellent opportunity to upgrade your home office with Uplift Desk promo codes. With exclusive discounts on standing desks, ergonomic chairs, and accessories, you can achieve a more productive and comfortable workspace. Don\u0026rsquo;t miss out on this chance to save up to $570 and elevate your home office game."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 19,
        href: "/blog/posts/vitamix-promo-codes-and-deals-25-off-free-shipping/",
        title: "Vitamix Promo Codes and Deals:...",
        description: "Get up to $25 off on your favorite Vitamix blenders and appliances with our exclusive promo codes and deals.",
        
        
        content: "Vitamix Promo Codes and Deals: Save Up to $25 Off \u0026nbsp; Are you a culinary enthusiast looking for ways to elevate your cooking game without breaking the bank? Look no further than Vitamix, the renowned brand behind high-performance blenders and kitchen appliances. With our curated selection of promo codes and deals, you can score discounts on a wide range of Vitamix products, including blenders, food processors, immersion blenders, and more.\nTop Vitamix Promo Codes and Deals \u0026nbsp; Here are some of the most popular Vitamix promo codes and deals that you won\u0026rsquo;t want to miss:\n$25 off on select blenders: Get a discount on top-of-the-line Vitamix blenders, perfect for smoothies, soups, and frozen treats. Free shipping on orders over $50: Enjoy hassle-free delivery on your Vitamix purchase when you spend $50 or more. Buy one, get one 50% off: Stock up on Vitamix accessories and save big on your purchase. Gift card offers: Treat your loved ones to the gift of Vitamix with a discounted gift card. Popular Vitamix Products to Consider \u0026nbsp; From blenders to food processors, Vitamix has a wide range of kitchen appliances to suit every cooking need. Here are some of the most popular Vitamix products to consider:\nVitamix 5200 Blender: A high-performance blender perfect for making smoothies, soups, and frozen treats. Vitamix 6300 Blender: A versatile blender with multiple speed settings and a powerful motor. Vitamix Food Processor: A powerful food processor for chopping, slicing, and pureeing ingredients. How to Use Vitamix Promo Codes and Deals \u0026nbsp; Using Vitamix promo codes and deals is easy! Here\u0026rsquo;s a step-by-step guide:\nChoose your product: Browse our selection of Vitamix promo codes and deals to find the perfect one for your needs. Click the \u0026ldquo;Get Code\u0026rdquo; button: Click the \u0026ldquo;Get Code\u0026rdquo; button to reveal the promo code or deal. Copy the code: Copy the promo code or deal and head to the Vitamix website. Add to cart: Add the product to your cart and proceed to checkout. Apply the code: Enter the promo code or deal at checkout to receive your discount. Frequently Asked Questions (FAQs) \u0026nbsp; Here are some frequently asked questions about Vitamix promo codes and deals:\nQ: How do I use a Vitamix promo code? A: To use a Vitamix promo code, simply copy the code and enter it at checkout during the purchasing process. Q: Can I stack Vitamix promo codes? A: Unfortunately, no. Vitamix promo codes cannot be stacked or combined with other offers. Q: Do Vitamix promo codes expire? A: Yes, Vitamix promo codes do expire. Be sure to check the expiration date before using your code. Conclusion \u0026nbsp; Elevate your cooking game without breaking the bank with Vitamix promo codes and deals. From blenders to food processors, we\u0026rsquo;ve got you covered with the latest discounts and offers. Don\u0026rsquo;t miss out on this opportunity to save up to $25 off on your favorite Vitamix products. Happy cooking!"
      })
      ;
  

  search.addEventListener('input', showResults, true);
}
  
function hideSuggestions(e) {
  var isClickInsideElement = suggestions.contains(e.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none')
    if (background !== null ) {
      background.style.setProperty('--image-opacity', '0.1')
    }
  }
}

/*
Source:
  - https://raw.githubusercontent.com/h-enk/doks/master/assets/js/index.js
*/
function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/
function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }
}
  
/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/
function showResults() {
  const maxResult = 5;
  var searchQuery = this.value;
  // filter the results for the currently tagged language
  const lang = document.documentElement.lang;
  var results = null;
  if (searchQuery) {
    results = index.search(searchQuery, { index: ['title', 'description', 'content'], limit: maxResult, enrich: true });
    if (background !== null) {
      background.style.setProperty('--image-opacity', '0')
    }
  } else {
    if (background !== null) {
      background.style.setProperty('--image-opacity', '0.1')
    }
  }

  // flatten results since index.search() returns results for each indexed field
  const flatResults = new Map(); // keyed by href to dedupe results
  if (results !== null) {
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }
  }

  suggestions.innerHTML = "";
  suggestions.classList.remove('d-none');
  
  // inform user that no results were found
  if (flatResults.size === 0 && searchQuery) {
    const msg = suggestions.dataset.noResults;
    const noResultsMessage = document.createElement('div')
    noResultsMessage.innerHTML = `${msg} "<strong>${searchQuery}</strong>"`
    noResultsMessage.classList.add("suggestion__no-results");
    suggestions.appendChild(noResultsMessage);
    return;
  }

  // construct a list of suggestions
  for (const [href, doc] of flatResults) {
    const entry = document.createElement('div');
    suggestions.appendChild(entry);

    const a = document.createElement('a');
    a.href = href;
    entry.appendChild(a);

    const title = document.createElement('span');
    title.classList.add('text-start');
    title.textContent = doc.title;
    title.classList.add("suggestion__title");
    a.appendChild(title);

    const description = document.createElement('span');
    description.textContent = doc.description;
    description.classList.add("suggestion__description");
    a.appendChild(description);

    suggestions.appendChild(entry);

    if (suggestions.childElementCount == maxResult) break;
  }
}
  
if (search !== null && suggestions !== null) {
  document.addEventListener('keydown', inputFocus);
  document.addEventListener('keydown', suggestionFocus);  
  document.addEventListener('click', hideSuggestions);
  initIndex();
}

const searchModal = document.getElementById('search-modal')
if (searchModal !== null) {
  searchModal.addEventListener('shown.bs.modal', function () {
    const searchInput = document.getElementById('search-input-modal')
    if (searchInput !== null) {
      searchInput.focus({ focusVisible: true })
    }
  })
}

;
document.querySelectorAll('.dynamic-svg').forEach((placeholder) => {
  placeholder.onload = function () {
    const container = placeholder.parentElement
    const doc = placeholder.contentDocument
    const attr = placeholder.getAttribute('data-class')
    const style = placeholder.getAttribute('data-style')

    if (container !== null && doc !== null) {
      const svg = doc.querySelector('svg')
      if (svg !== null) {
        svg.setAttribute('class', 'svg-inline--fa ' + (attr || ''))
        svg.setAttribute('fill', 'currentcolor')
        svg.setAttribute('aria-hidden', 'true')
        svg.setAttribute('role', 'img')
        if (style !== null && style !== '') {
          svg.setAttribute('style', style)
        }
        svg.removeAttribute('height')
        svg.removeAttribute('width')
        container.innerHTML = ''
        container.appendChild(svg)
      }
    }
  }
})

;
function updateDropdown (element, id, label) {
  const dropdown = document.getElementById(element)
  if (dropdown != null) {
    dropdown.querySelector('.dropdown-toggle').textContent = label
    dropdown.querySelectorAll('.panel-dropdown .dropdown-item').forEach(item => {
      item.classList.remove('active')
      let target = item.getAttribute('data-link')
      if (target != null) {
        target = target.replace(/^#+/, '')
        if (target === id) {
          item.classList.add('active')
        }
      }
    })
  }
}

document.querySelectorAll('.panel-dropdown').forEach(trigger => {
  trigger.addEventListener('hide.bs.dropdown', event => {
    if (event.clickEvent != null) {
      let target = event.clickEvent.srcElement.getAttribute('data-link')
      if (target != null) {
        trigger.querySelectorAll('.panel-dropdown .dropdown-item').forEach(item => {
          item.classList.remove('active')
        })
        target = target.replace(/^#+/, '')
        const btn = document.getElementById(target)
        if (btn != null) {
          event.clickEvent.srcElement.classList.add('active')
          trigger.querySelector('.dropdown-toggle').textContent = event.clickEvent.srcElement.textContent
          btn.click()
        }
      }
    }
  })
})

document.querySelectorAll('.nav-panel .nav-link').forEach(trigger => {
  trigger.addEventListener('click', event => {
    const companion = event.srcElement.parentElement.parentElement.getAttribute('data-companion')
    if (companion != null) {
      updateDropdown(companion, trigger.getAttribute('id'), trigger.textContent.trim())
    }
  })
})

;
const fixed = true
const navbar = document.querySelector('.navbar')
const togglers = document.querySelectorAll('.main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')
const colorsBG = ['body', 'secondary', 'tertiary']

let scrollPosition = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getStyle(el, styleProp) {
    let y
    
    if (window.getComputedStyle) {
      y = document.defaultView.getComputedStyle(el).getPropertyValue(styleProp)
    } else if (el.currentStyle) {
      y = el.currentStyle[styleProp]
    }

    return y
}

function updateNavbarColor () {
  const scrollTop = window.pageYOffset
  const scrollBottom = scrollTop + navbar.offsetHeight

  // find which section is currently under the navbar
  let currentSection = null
  const sections = document.querySelectorAll('article,section,footer')
  let currentIndex = -1

  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    const sectionTop = scrollTop + rect.top
    const sectionBottom = sectionTop + section.offsetHeight - 1

    // check if navbar overlaps with this section
    if (scrollTop <= sectionBottom && scrollBottom >= sectionTop) {
      let index = getStyle(section, 'z-index')
      if (index === 'auto') {
        index = 1
      }
      if (index > currentIndex) {
        currentSection = section
        currentIndex = index
      }
    }
  })

  // use main part as backup (defined in baseof.html template)
  if (!currentSection) {
    currentSection = document.querySelector('main')
  }

  if (currentSection) {
    adaptToSection(currentSection)
  }
}

function getBackgroundColor (section) {
  // get computed background color of the section
  let color = window.getComputedStyle(section).backgroundColor

  // use body background when section background is undefined or transparent
  if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
    color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  }

  return color
}

function adaptToSection (section) {
  // retrieve the section background color, using body color as fallback
  const color = getBackgroundColor(section)

  // determine if the background is light or dark
  const isLightBackground = isLightColor(section, color)

  // set appropriate mode class
  const nav = document.querySelector('.navbar')
  if (isLightBackground) {
    if (navbar.dataset.bsTheme !== 'light') {
      navbar.dataset.bsTheme = 'light'
    }
  } else {
    if (navbar.dataset.bsTheme !== 'dark') {
      navbar.dataset.bsTheme = 'dark'
    }
  }

  // update semi-transparent background color of navbar
  const rgb = parseRGB(color)
  if (rgb) {
    navbar.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},.4)`
  }
}

function isLightColor (section, color) {
  if (section.dataset.bsTheme === 'light') {
    return true
  }

  if (section.dataset.bsTheme === 'dark') {
    return false
  }

  // parse RGB color of the section backgroiund
  const rgb = parseRGB(color)
  if (!rgb) return true // Default to light if can't parse

  // calculate relative luminance
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b)

  // return true if light (luminance > 0.5)
  return luminance > 0.5
}

function parseRGB (color) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    }
  }
  return null
}

function calculateLuminance (r, g, b) {
  // convert RGB to relative luminance using sRGB formula
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function updateNavbar () {
  if (navbar.dataset.transparent) {
    updateNavbarColor()
  } else {
    let storedTheme
    if (typeof getLocalStorage === "function") {
      storedTheme = getLocalStorage('theme', null, 'functional')
    }

    if (window.scrollY > 75) {
      navbar.classList.add('nav-active')
      if (storedTheme) {
        navbar.setAttribute('data-bs-theme', storedTheme)
      }
    } else {
      navbar.classList.remove('nav-active')
      const defaultTheme = navbar.getAttribute('data-bs-overlay')

      const targetTheme = defaultTheme ? defaultTheme : storedTheme
      if (targetTheme) {
        navbar.setAttribute('data-bs-theme', defaultTheme)
      }
    }
  }
}

if ((navbar !== null) && (window.performance.getEntriesByType)) {
  if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
    fixed && updateNavbar()
  }
}

if (navbar !== null && togglers !== null) {
  // initialize and update the navbar on load, on resize, and on scroll
  document.addEventListener('DOMContentLoaded', () => { fixed && updateNavbar() })
  document.addEventListener('resize', () => fixed && updateNavbar())
  document.addEventListener('scroll', () => fixed && updateNavbar())

  // hook up collapse events
  document.querySelectorAll('.navbar-collapse').forEach((collapse) => {
    collapse.addEventListener('show.bs.collapse', function () {
      scrollPosition = window.pageYOffset
      document.body.style.top = `-${scrollPosition}px`
      document.body.classList.add('navbar-open')
    })
    collapse.addEventListener('hide.bs.collapse', function () {
      document.body.classList.remove('navbar-open')
      document.body.style.top = ''
      window.scrollTo({ top: scrollPosition, behavior: 'instant' })
    })
  })

  // observe state changes to the site's color mode
  const html = document.querySelector('html')
  const config = {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  }
  const Observer = new MutationObserver(() => {
    if (fixed) {
      // wait for the theme animation to finish
      sleep(600).then(() => { 
        updateNavbar() 
      })
    }
  })
  Observer.observe(html, config)

  // initialize background color
  if (!navbar.dataset.transparent) {
    const color = (navbar.getAttribute('data-navbar-color') || 'body')
    const bg = colorsBG.includes(color) ? `var(--bs-${color}-bg)` : `var(--bs-navbar-color-${color})`
    navbar.style.setProperty('--bs-navbar-expanded-color', bg)
  }

  // update the navbar background color when expanded
  for (let i = 0; i < togglers.length; ++i) {
    togglers[i].onclick = () => {
      navbar.classList.toggle('navbar-expanded')
    }
  }

  // invoke the navbar toggler for each mode switcher to collapse the main menu afterwards
  for (let i = 0; i < modeSelectors.length; ++i) {
    modeSelectors[i].onclick = () => {
      for (let j = 0; j < togglers.length; ++j) {
        const toggler = togglers[j]
        if (toggler.getAttribute('aria-expanded') === 'true') {
          toggler.click()
        }
      }
    }
  }
}

;
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// eslint-disable-next-line no-undef, no-unused-vars
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

;
// Adapted from: https://dev.to/j471n/how-to-share-anything-from-your-website-by-web-share-api-1h5g

// function for Web Share API
function webShareAPI (title, description, link) {
  navigator
    .share({
      title,
      text: description,
      url: link
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error))
}

const shareButtons = document.querySelectorAll('[data-sharing-url]')
shareButtons.forEach(btn => {
  if (navigator.share) {
    const title = btn.getAttribute('data-sharing-title')
    const description = btn.getAttribute('data-sharing-description')
    const url = btn.getAttribute('data-sharing-url')

    // show button if it supports webShareAPI
    btn.style.display = 'block'
    btn.addEventListener('click', () =>
      webShareAPI(title, description, url)
    )
  } else {
    // hide button if host does not support Web Share API
    btn.style.display = 'none'
  }
})
;
// Script to move all embedded toast messages into a container with id 'toast-container'. The container ensures multiple
// toast messages are stacked properly. The script targets all elements specified by a 'data-toast-target' and ensures
// the click event of the origin is linked as well.

const container = document.getElementById('toast-container')
if (container !== null) {
  // process all data-toast-target elements
  document.querySelectorAll('[data-toast-target]').forEach(trigger => {
    const target = document.getElementById(trigger.getAttribute('data-toast-target'))
    if (target !== null) {
      // move the element to the toast containr
      container.appendChild(target)

      // eslint-disable-next-line no-undef
      const toast = bootstrap.Toast.getOrCreateInstance(target)
      if (toast !== null) {
        // associate the click event of the origin with the toast element
        trigger.addEventListener('click', () => {
          toast.show()
        })
      }
    }
  })
}

;
const btnTOCShowMore = document.getElementById('btnTOCShowMore')
if (btnTOCShowMore !== null) {
  btnTOCShowMore.addEventListener('click', (e) => {
    btnTOCShowMore.style.display = 'none'
  })
}

const btnTOCShowLess = document.getElementById('btnTOCShowLess')
if ((btnTOCShowLess !== null) && (btnTOCShowMore !== null)) {
  btnTOCShowLess.addEventListener('click', (e) => {
    btnTOCShowMore.style.display = 'initial'
  })
}

;
// Bootstrap tooltip example: https://getbootstrap.com/docs/5.2/components/tooltips/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// eslint-disable-next-line no-unused-vars, no-undef
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

;
document.querySelectorAll('[data-video-padding]').forEach(element => {
  element.style.paddingBottom = element.getAttribute('data-video-padding')
})
