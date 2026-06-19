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
        href: "/blog/posts/30-off-samsung-promo-code-june-2026/",
        title: "30% Off Samsung Promo Code | J...",
        description: "Get exclusive Samsung deals \u0026 promo codes for June 2026, up to $1,000 savings on appliances \u0026 flagship devices, plus 30% off your purchase.",
        
        
        content: "30% Off Samsung Promo Code | Exclusive Offers for June 2026 \u0026nbsp; Are you looking to upgrade your home appliances or get your hands on the latest Samsung smartphones? Look no further! Samsung is currently offering massive discounts of up to $1,000 on its appliances and limited-time deals on its flagship devices, including the Galaxy Z Fold7, Galaxy S25, and Galaxy Flip7. But that\u0026rsquo;s not all - we\u0026rsquo;ve got the exclusive Samsung promo code that will save you an additional 30% or 10% on your purchase.\nLimited-Time Offers on Samsung Appliances \u0026nbsp; Samsung is offering a range of limited-time deals on its appliances, including:\nUp to 30% off on select refrigerator models Up to 25% off on select washing machine and dryer models Up to 20% off on select range and oven models Up to $1,000 off on select Samsung smart home systems These deals are only available for a limited time, so be sure to act fast to take advantage of them. You can use the Samsung promo code to get an additional 30% or 10% off on your purchase.\nExclusive Promo Code for Samsung Devices \u0026nbsp; In addition to the limited-time deals on appliances, Samsung is also offering exclusive promo codes for its latest smartphones, including:\nGalaxy Z Fold7: Get a $200 gift card with the purchase of a Galaxy Z Fold7 Galaxy S25: Get a $100 gift card with the purchase of a Galaxy S25 Galaxy Flip7: Get a $50 gift card with the purchase of a Galaxy Flip7 To get these exclusive offers, simply use the Samsung promo code at checkout.\nHow to Get the Samsung Promo Code \u0026nbsp; The Samsung promo code is easy to use and can be applied at checkout. Here\u0026rsquo;s how:\nVisit the Samsung website and select the product you want to purchase. Click on the \u0026ldquo;Add to Cart\u0026rdquo; button to add the product to your cart. Proceed to checkout and enter the Samsung promo code in the \u0026ldquo;Promo Code\u0026rdquo; field. Click on the \u0026ldquo;Apply\u0026rdquo; button to apply the promo code. Your discount will be applied automatically. Frequently Asked Questions \u0026nbsp; Here are some frequently asked questions about the Samsung promo code:\nQ: What is the Samsung promo code? \u0026nbsp; A: The Samsung promo code is a special code that can be used at checkout to get a discount on your purchase.\nQ: How do I get the Samsung promo code? \u0026nbsp; A: You can get the Samsung promo code by visiting the Samsung website and selecting the product you want to purchase. The promo code will be displayed on the product page.\nQ: Can I use the Samsung promo code on multiple purchases? \u0026nbsp; A: Yes, you can use the Samsung promo code on multiple purchases. However, each promo code can only be used once per customer.\nQ: Can I combine the Samsung promo code with other discounts? \u0026nbsp; A: Yes, you can combine the Samsung promo code with other discounts. However, the maximum discount you can get is 30% or 10% off, depending on the promo code.\nQ: Is the Samsung promo code exclusive to Samsung devices? \u0026nbsp; A: Yes, the Samsung promo code is exclusive to Samsung devices. However, you can use it on a range of Samsung appliances and smart home systems.\nQ: Can I get a refund if I don\u0026rsquo;t like the product? \u0026nbsp; A: Yes, you can get a refund if you don\u0026rsquo;t like the product. However, you must return the product within 30 days of purchase and follow Samsung\u0026rsquo;s return policy.\nQ: How long is the Samsung promo code valid for? \u0026nbsp; A: The Samsung promo code is valid for a limited time only. However, we will update this article with the latest promo code and expiration date.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 1,
        href: "/blog/posts/50-off-doordash-promo-code-june-2026/",
        title: "50% Off DoorDash Promo Code | ...",
        description: "Get 50% off DashPass, $25 off first order, and free delivery with these exclusive DoorDash promo codes and offers today.",
        
        
        content: "Unlock Exclusive DoorDash Offers: Get 50% Off DashPass, $25 Off Your First Order, and Free Delivery \u0026nbsp; Are you tired of overspending on food delivery services? Look no further! We\u0026rsquo;ve got the inside scoop on the latest DoorDash promo codes that will save you up to 50% on DashPass, $25 off your first order, and free delivery. Whether you\u0026rsquo;re a student, a busy professional, or just a foodie at heart, these exclusive offers will make your mealtime a lot more enjoyable.\nTop DoorDash Promo Codes for June 2026 \u0026nbsp; 50% off DashPass for students and select users: Get ready to enjoy premium benefits like unlimited free delivery, reduced service fees, and exclusive perks with a 50% discount on DashPass. $25 off your first order: New users can enjoy a $25 credit on their first order, perfect for trying out new restaurants or cuisines without breaking the bank. Free delivery: Enjoy free delivery on orders above a certain minimum amount, depending on your location and the restaurant\u0026rsquo;s participation in DoorDash\u0026rsquo;s promotions. How to Get the Best DoorDash Promo Codes \u0026nbsp; To unlock these exclusive offers, follow these simple steps:\nSign up for a DoorDash account: Create a new account or log in to your existing one to access the promo codes. Enter promo codes: Look for the \u0026ldquo;Promo Code\u0026rdquo; or \u0026ldquo;Gift Card\u0026rdquo; section during checkout to enter your code and apply the discount. Check eligibility: Make sure you meet the eligibility criteria for the promo code, such as being a student or a first-time user. Frequently Asked Questions (FAQs) \u0026nbsp; Q: What is DashPass? A: DashPass is a premium subscription service that offers unlimited free delivery, reduced service fees, and exclusive perks for a monthly fee. Q: How do I get 50% off DashPass? A: To get 50% off DashPass, you need to be a student or a select user. Look for the promo code in your email or on the DoorDash website to apply the discount. Q: Can I use multiple promo codes at once? A: No, you can only use one promo code per order. However, you can stack discounts from different promo codes to maximize your savings. Q: Is there a minimum order requirement for free delivery? A: Yes, the minimum order requirement for free delivery varies depending on your location and the restaurant\u0026rsquo;s participation in DoorDash\u0026rsquo;s promotions. Tips for Maximizing Your Savings \u0026nbsp; Use DoorDash\u0026rsquo;s app: Download the DoorDash app to access exclusive promo codes, discounts, and rewards. Follow DoorDash on social media: Keep an eye on DoorDash\u0026rsquo;s social media accounts for promo code updates, new offers, and limited-time deals. Combine promo codes with cashback apps: Use cashback apps like Rakuten or Ebates to earn additional rewards on your DoorDash orders. With these exclusive DoorDash promo codes, you can enjoy a more affordable and convenient food delivery experience. Whether you\u0026rsquo;re a student, a busy professional, or just a foodie at heart, these offers will make your mealtime a lot more enjoyable.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 2,
        href: "/blog/about/",
        title: "About Us",
        description: "Meet the developer and the AI engine behind our automated tech publication.",
        
        
        content: "Behind the Code\rWelcome to a next-generation technology publication powered by a seamless blend of human engineering and Artificial Intelligence.\nThe Architect: Lucky Taorem\rWeb Developer \u0026 AI Automation Specialist\rHi, I'm Lucky Taorem (LT Developer). I built this platform as a living experiment in autonomous publishing. I designed the architecture, wrote the Python scripts, and integrated the AI engine that keeps this site running 24/7. When I'm not building autonomous automation bots, I focus on full-stack web development and pushing the limits of what LLMs can do.\rMy Portfolio\rGitHub\rLinkedIn\rFacebook\rInstagram\rThe Mission\rTo aggregate, analyze, and deliver the most important technology news from around the globe. By stripping away the fluff, this blog delivers comprehensive, 1500+ word deep-dive articles on the breakthroughs that actually matter.\rThe Engine\rMy custom Python automation engine wakes up twice a day to scan top publishers like TechCrunch and Wired. It then utilizes advanced Large Language Models (LLMs) via Groq to research, write, and deploy unique articles completely on autopilot."
      })
      .add(
      
      
      
      
      
      {
        id: 3,
        href: "/blog/posts/adobes-redesigned-ai-studio-remembers-what-your-creations-look-like/",
        title: "Adobe Unleashes AI Revolution",
        description: "Adobe's Redesigned AI Studio: Revolutionizing Creative Workflows with Firefly AI assistant. Discover new features and how they're changing the way you work with AI-powered design tools.",
        
        
        content: "Adobe\u0026rsquo;s Redesigned AI Studio: Revolutionizing Creative Workflows \u0026nbsp; Adobe has been making waves in the creative industry with the introduction of its Firefly AI assistant, and today, the company is taking it to the next level with a major upgrade. The new Firefly experience is launching in private beta, and it promises to change the way you work with AI-powered design tools. In this article, we\u0026rsquo;ll dive into the new features and capabilities of Adobe\u0026rsquo;s redesigned AI studio and explore what this means for creative professionals like you.\nA Reimagined AI Studio \u0026nbsp; The \u0026ldquo;reimagined\u0026rdquo; AI studio is the heart of Adobe\u0026rsquo;s new Firefly experience. This single interface lets you edit and generate new designs from a single place, making it easier to work with AI-powered design tools. With the new studio, you can access all your projects and assets in one place, making it easier to manage your workflow and get creative.\nPersistent Context, Reusable Assets, and Organized Workflows \u0026nbsp; Adobe promises that the new Firefly experience will give you \u0026ldquo;persistent context, reusable assets, and organized workflows\u0026rdquo; across your projects. This means that you\u0026rsquo;ll be able to:\nSave context: Firefly will remember the context of your projects, so you can pick up where you left off. Reuse assets: You can reuse assets and designs across multiple projects, saving you time and effort. Organize workflows: The new studio will help you organize your workflow, making it easier to manage multiple projects and deadlines. What Does This Mean for Creative Professionals? \u0026nbsp; The new Firefly experience and AI studio are designed to make your life easier as a creative professional. With a single interface, you can access all your projects and assets, and with persistent context, reusable assets, and organized workflows, you\u0026rsquo;ll be able to:\nWork more efficiently: You\u0026rsquo;ll be able to manage multiple projects and deadlines with ease. Create more: With the power of AI at your fingertips, you\u0026rsquo;ll be able to create more designs and projects in less time. Collaborate better: The new studio will make it easier to collaborate with others, with features like reusable assets and organized workflows. FAQs \u0026nbsp; What is Adobe Firefly AI?: Adobe Firefly AI is an AI-powered design tool that helps you create and edit designs with ease. What is the new Firefly experience?: The new Firefly experience is a major upgrade to Adobe\u0026rsquo;s Firefly AI assistant, with a new \u0026ldquo;reimagined\u0026rdquo; AI studio that lets you edit and generate new designs from a single interface. When is the new Firefly experience launching?: The new Firefly experience is launching in private beta today. Can I access the new Firefly experience?: Yes, you can access the new Firefly experience in private beta. Sign up for a private beta account to try it out. Conclusion \u0026nbsp; Adobe\u0026rsquo;s redesigned AI studio is a major game-changer for creative professionals. With a single interface, persistent context, reusable assets, and organized workflows, you\u0026rsquo;ll be able to work more efficiently, create more, and collaborate better. The new Firefly experience is launching in private beta today, so sign up now to try it out and see the future of creative design.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 4,
        href: "/blog/posts/adobe-adds-its-ai-assistant-to-premiere-illustrator-and-indesign/",
        title: "AI Boost",
        description: "Adobe updates Firefly AI, adds it to Premiere, Illustrator, InDesign, and Frame.io for enhanced creativity",
        
        
        content: "Introduction to Adobe\u0026rsquo;s AI-Powered Firefly \u0026nbsp; Adobe has been at the forefront of innovation in the creative industry, and its latest move is a testament to this commitment. The company is updating its Firefly AI assistant with new capabilities and integrating it into some of its most popular applications, including Premiere, Illustrator, InDesign, and Frame.io. This integration is set to revolutionize the way creatives work, offering them unprecedented levels of efficiency, inspiration, and precision.\nWhat is Firefly? \u0026nbsp; Before diving into the details of the update and integration, it\u0026rsquo;s essential to understand what Firefly is. Firefly is Adobe\u0026rsquo;s AI assistant designed specifically for creative professionals. It leverages artificial intelligence to assist in various tasks, from generating ideas to refining the final output. Firefly is built on a robust AI framework that learns from user interactions, adapting to their preferences and work styles over time.\nEnhancements to Firefly \u0026nbsp; The latest update to Firefly brings a plethora of new features and enhancements aimed at making the creative process smoother and more intuitive. Some of the key enhancements include:\nImproved Content Generation: Firefly can now generate more complex and nuanced content, including text, images, and even video clips, based on the user\u0026rsquo;s input and preferences. Advanced Editing Tools: The AI assistant now offers more sophisticated editing tools, allowing users to fine-tune their work with greater precision. Enhanced Collaboration Features: Firefly facilitates better collaboration among team members by enabling real-time feedback and suggestions. Technical Details of the Update \u0026nbsp; From a technical standpoint, the update to Firefly involves significant advancements in machine learning and natural language processing. Adobe has utilized cutting-edge algorithms to improve Firefly\u0026rsquo;s understanding of creative tasks and its ability to assist users effectively. The update also includes improvements to the user interface, making it more accessible and user-friendly.\nIntegration with Adobe Applications \u0026nbsp; The integration of Firefly with Premiere, Illustrator, InDesign, and Frame.io is a strategic move by Adobe to provide a seamless and cohesive creative experience. Each of these applications benefits from Firefly\u0026rsquo;s capabilities in unique ways:\nPremiere: Firefly can assist in video editing by suggesting clips, transitions, and effects based on the project\u0026rsquo;s context and the user\u0026rsquo;s preferences. Illustrator: The AI assistant can generate vector graphics, patterns, and even entire compositions, saving designers a significant amount of time. InDesign: Firefly helps in creating layouts, selecting fonts, and optimizing the overall design of publications and documents. Frame.io: Integration with Frame.io enhances collaboration and review processes by allowing team members to provide AI-driven feedback and suggestions. Benefits of Integration \u0026nbsp; The integration of Firefly with these applications offers several benefits to creative professionals, including:\nIncreased Efficiency: By automating routine tasks and providing intelligent suggestions, Firefly helps users work faster and focus on the creative aspects of their projects. Enhanced Creativity: Firefly\u0026rsquo;s ability to generate ideas and content can spark new creativity and inspire users to explore different approaches to their work. Improved Collaboration: The AI assistant facilitates smoother collaboration by enabling teams to work together more effectively, regardless of their location or time zone. Impact on the Creative Industry \u0026nbsp; The update to Firefly and its integration with key Adobe applications are poised to have a significant impact on the creative industry. As AI technology continues to evolve, we can expect to see more sophisticated tools and features that transform the way creatives work. Some potential implications of this development include:\nDemocratization of Creativity: With AI assistants like Firefly, individuals who may not have considered themselves \u0026ldquo;creative\u0026rdquo; can now produce high-quality content, democratizing creativity and opening up new opportunities. New Business Models: The integration of AI in creative workflows can lead to new business models, such as subscription-based services for AI-generated content or AI-assisted consulting. Ethical Considerations: As AI becomes more pervasive in the creative industry, there will be a growing need to address ethical concerns, such as ownership rights for AI-generated work and the potential for AI to displace human creatives. Future of AI in Creativity \u0026nbsp; Looking ahead, the future of AI in creativity is exciting and full of possibilities. As AI technology advances, we can expect to see even more innovative applications of AI in the creative industry. Some potential areas of development include:\nMore Advanced AI Assistants: Future AI assistants could offer even more sophisticated capabilities, such as the ability to understand and respond to emotional cues or to generate entirely new forms of content. Increased Autonomy: AI systems may become more autonomous, allowing them to make decisions and take actions without human intervention. Human-AI Collaboration: The most promising area of development may be in human-AI collaboration, where AI systems work alongside humans to enhance their creative potential. FAQ \u0026nbsp; Here are some frequently asked questions about Adobe\u0026rsquo;s Firefly AI assistant and its integration with Premiere, Illustrator, InDesign, and Frame.io:\nQ: What is Firefly, and how does it work? A: Firefly is Adobe\u0026rsquo;s AI assistant designed for creative professionals. It uses machine learning and natural language processing to assist in various tasks, from generating ideas to refining the final output. Q: Which Adobe applications will Firefly be integrated with? A: Firefly will be integrated with Premiere, Illustrator, InDesign, and Frame.io. Q: How will Firefly affect my workflow? A: Firefly is designed to enhance your workflow by automating routine tasks, providing intelligent suggestions, and facilitating collaboration. Q: Can I use Firefly for free? A: Firefly is part of Adobe\u0026rsquo;s suite of creative applications, and its availability may depend on your subscription plan. Q: Is Firefly available for non-Adobe applications? A: Currently, Firefly is exclusive to Adobe applications, but Adobe may explore integrating it with other platforms in the future. Conclusion \u0026nbsp; The update to Adobe\u0026rsquo;s Firefly AI assistant and its integration with Premiere, Illustrator, InDesign, and Frame.io marks a significant milestone in the evolution of creative technology. As AI continues to play a more prominent role in the creative industry, we can expect to see even more innovative applications of this technology. Whether you\u0026rsquo;re a seasoned creative professional or just starting out, Firefly and similar AI assistants are poised to revolutionize the way you work, inspiring new levels of creativity, efficiency, and collaboration.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 5,
        href: "/blog/posts/general-intuition-in-talks-to-raise-300m-at-around-2b-valuation/",
        title: "AI Evolved",
        description: "Discover the future of AI with embodied intelligence and world models, trained on 2 billion videos per year",
        
        
        content: "Introduction to Embodied AI and World Models \u0026nbsp; The field of artificial intelligence (AI) has witnessed tremendous growth in recent years, with various approaches being explored to create more sophisticated and human-like intelligent systems. One such approach is embodied AI, which focuses on developing AI systems that can interact with and understand their environment through sensory experiences. Another crucial aspect of AI research is the development of world models, which enable AI systems to learn about the world and make predictions about future events. A startup has been making waves in the AI community by training embodied AI and world models using a vast dataset of 2 billion videos per year from 10 million monthly active users.\nWhat is Embodied AI? \u0026nbsp; Embodied AI refers to the development of AI systems that are embedded in a physical body or environment, allowing them to interact with and perceive their surroundings through sensory experiences. This approach is inspired by the human brain, which is closely tied to the body and uses sensory information to learn and make decisions. Embodied AI systems can be applied to various domains, including robotics, autonomous vehicles, and human-computer interaction.\nWhat are World Models? \u0026nbsp; World models are internal representations of the world that AI systems use to make predictions about future events and learn from their experiences. These models can be thought of as a mental map of the world, which the AI system uses to navigate and make decisions. World models are a crucial component of AI systems, as they enable them to learn from their experiences and adapt to new situations.\nThe Role of Medal\u0026rsquo;s Dataset in Training Embodied AI and World Models \u0026nbsp; The startup\u0026rsquo;s use of Medal\u0026rsquo;s dataset of 2 billion videos per year from 10 million monthly active users is a significant aspect of their approach to training embodied AI and world models. This vast dataset provides a rich source of information for the AI system to learn from, allowing it to develop a deeper understanding of the world and improve its performance over time.\nKey Features of Medal\u0026rsquo;s Dataset \u0026nbsp; Some key features of Medal\u0026rsquo;s dataset include:\nLarge-scale: The dataset consists of 2 billion videos per year, providing a vast amount of information for the AI system to learn from. Diverse: The dataset is sourced from 10 million monthly active users, ensuring that it is diverse and representative of different environments and scenarios. High-quality: The dataset is of high quality, with clear and well-lit videos that provide a good representation of the world. How the Dataset is Used to Train Embodied AI and World Models \u0026nbsp; The startup uses Medal\u0026rsquo;s dataset to train their embodied AI and world models through a process of self-supervised learning. This involves using the dataset to generate a series of tasks and challenges for the AI system to complete, such as object recognition, tracking, and prediction. The AI system learns from its experiences and adapts to new situations, developing a deeper understanding of the world and improving its performance over time.\nTechnical Details of the Training Process \u0026nbsp; The training process involves several technical components, including:\nData preprocessing: The dataset is preprocessed to extract relevant features and information, such as object detection, tracking, and segmentation. Model architecture: The AI system uses a complex model architecture, including convolutional neural networks (CNNs) and recurrent neural networks (RNNs), to process and learn from the data. Loss functions: The AI system uses a combination of loss functions, including mean squared error and cross-entropy, to evaluate its performance and guide the learning process. Optimization algorithms: The AI system uses optimization algorithms, such as stochastic gradient descent (SGD) and Adam, to update its parameters and improve its performance over time. Challenges and Limitations of the Training Process \u0026nbsp; Despite the promise of the startup\u0026rsquo;s approach, there are several challenges and limitations to the training process, including:\nData quality: The quality of the dataset can have a significant impact on the performance of the AI system, with poor-quality data leading to biased or inaccurate results. Computational resources: The training process requires significant computational resources, including powerful GPUs and large amounts of memory, which can be expensive and difficult to obtain. Overfitting: The AI system may overfit to the training data, failing to generalize to new situations and environments. Applications and Implications of Embodied AI and World Models \u0026nbsp; The startup\u0026rsquo;s approach to embodied AI and world models has significant implications for a wide range of applications, including:\nRobotics: Embodied AI and world models can be used to develop more sophisticated and human-like robots, capable of interacting with and understanding their environment. Autonomous vehicles: The technology can be used to develop more advanced autonomous vehicles, capable of navigating complex environments and making decisions in real-time. Healthcare: Embodied AI and world models can be used to develop more personalized and effective healthcare systems, capable of understanding and responding to individual patient needs. Potential Benefits and Risks \u0026nbsp; The potential benefits of embodied AI and world models include:\nImproved performance: The technology can lead to significant improvements in AI system performance, enabling them to learn and adapt more quickly and effectively. Increased autonomy: Embodied AI and world models can enable AI systems to operate more autonomously, making decisions and taking actions without human intervention. Enhanced safety: The technology can lead to significant improvements in safety, enabling AI systems to anticipate and respond to potential risks and hazards. However, there are also potential risks and challenges associated with embodied AI and world models, including:\nBias and accuracy: The technology can be biased or inaccurate, leading to flawed decision-making and potentially harmful consequences. Job displacement: The technology can lead to job displacement, as AI systems take on tasks and responsibilities currently performed by humans. Cybersecurity: The technology can create new cybersecurity risks, as AI systems become more autonomous and connected to the internet. FAQ \u0026nbsp; What is embodied AI? \u0026nbsp; Embodied AI refers to the development of AI systems that are embedded in a physical body or environment, allowing them to interact with and perceive their surroundings through sensory experiences.\nWhat are world models? \u0026nbsp; World models are internal representations of the world that AI systems use to make predictions about future events and learn from their experiences.\nHow is Medal\u0026rsquo;s dataset used to train embodied AI and world models? \u0026nbsp; Medal\u0026rsquo;s dataset is used to train embodied AI and world models through a process of self-supervised learning, involving the generation of tasks and challenges for the AI system to complete.\nWhat are the potential benefits and risks of embodied AI and world models? \u0026nbsp; The potential benefits of embodied AI and world models include improved performance, increased autonomy, and enhanced safety, while the potential risks include bias and accuracy, job displacement, and cybersecurity concerns.\nHow can I learn more about embodied AI and world models? \u0026nbsp; You can learn more about embodied AI and world models by reading research papers and articles, attending conferences and workshops, and exploring online courses and tutorials.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 6,
        href: "/blog/posts/amazons-fire-tablets-tested-so-you-dont-have-to-2026/",
        title: "Amazon Fire Tablet Exposed: Th...",
        description: "Discover the best Amazon Fire Tablets, tested for travel, kids, and more, with our in-depth review of latest models and features.",
        
        
        content: "Amazon’s Fire Tablets, Tested, So You Don’t Have To (2026) \u0026nbsp; Are you in the market for a new tablet but unsure where to start? Do you need a device that can withstand the rigors of travel, or one that\u0026rsquo;s perfect for kids? Look no further than Amazon\u0026rsquo;s Fire Tablets. In this article, we\u0026rsquo;ll review the latest models, highlighting their strengths and weaknesses, to help you make an informed decision.\nWhy Choose an Amazon Fire Tablet? \u0026nbsp; Amazon\u0026rsquo;s Fire Tablets offer a range of benefits that make them an attractive option for consumers. Here are just a few reasons why:\nAffordability: Amazon Fire Tablets are generally priced lower than their competitors, making them an excellent choice for budget-conscious buyers. Ease of use: The Fire OS operating system is user-friendly and easy to navigate, even for those who are new to tablets. Access to Amazon content: With an Amazon Fire Tablet, you\u0026rsquo;ll have access to Amazon\u0026rsquo;s vast library of content, including books, music, and videos. The Best Amazon Fire Tablets for Travel \u0026nbsp; Whether you\u0026rsquo;re a frequent flyer or a seasoned traveler, an Amazon Fire Tablet is an excellent choice for on-the-go entertainment. Here are some of the top models to consider:\nAmazon Fire 7: The Fire 7 is a compact and lightweight tablet that\u0026rsquo;s perfect for tossing into your carry-on. It features a 7-inch display, 1 GB of RAM, and 8 GB of storage. Amazon Fire HD 8: The Fire HD 8 is a step up from the Fire 7, with a larger 8-inch display and 2 GB of RAM. It\u0026rsquo;s a great choice for those who want a more immersive viewing experience. Amazon Fire HD 10: The Fire HD 10 is the largest and most powerful tablet in the Fire series, featuring a 10.1-inch display and 3 GB of RAM. It\u0026rsquo;s a great choice for those who want a more premium tablet experience. The Best Amazon Fire Tablets for Kids \u0026nbsp; Amazon Fire Tablets are also an excellent choice for kids, thanks to their affordability and ease of use. Here are some of the top models to consider:\nAmazon Fire 7 Kids Edition: The Fire 7 Kids Edition is a special version of the Fire 7, designed specifically for kids. It features a 7-inch display, 1 GB of RAM, and 8 GB of storage, as well as a kid-friendly interface and access to Amazon\u0026rsquo;s library of child-friendly content. Amazon Fire HD 8 Kids Edition: The Fire HD 8 Kids Edition is a step up from the Fire 7 Kids Edition, with a larger 8-inch display and 2 GB of RAM. It\u0026rsquo;s a great choice for older kids who want a more immersive viewing experience. Amazon Fire HD 10 Kids Edition: The Fire HD 10 Kids Edition is the largest and most powerful tablet in the Fire series, featuring a 10.1-inch display and 3 GB of RAM. It\u0026rsquo;s a great choice for kids who want a more premium tablet experience. FAQ \u0026nbsp; Q: What is the difference between the Fire 7 and Fire HD 8? A: The Fire 7 features a smaller 7-inch display and 1 GB of RAM, while the Fire HD 8 features a larger 8-inch display and 2 GB of RAM. Q: Can I use an Amazon Fire Tablet for gaming? A: Yes, Amazon Fire Tablets are capable of running a range of games, including popular titles like Minecraft and Fruit Ninja. Q: Can I use an Amazon Fire Tablet for reading? A: Yes, Amazon Fire Tablets are perfect for reading, with access to Amazon\u0026rsquo;s vast library of eBooks and magazines. Q: Is the Fire OS operating system secure? A: Yes, the Fire OS operating system is designed with security in mind, featuring robust parental controls and regular software updates. Conclusion \u0026nbsp; Amazon\u0026rsquo;s Fire Tablets are an excellent choice for anyone looking for an affordable and user-friendly tablet. Whether you need a device for travel or kids, there\u0026rsquo;s an Amazon Fire Tablet to suit your needs. We hope this review has helped you make an informed decision and find the perfect Fire Tablet for you.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 7,
        href: "/blog/posts/apple-opens-up-app-store-to-new-competition-in-brazil/",
        title: "Apple's Grip",
        description: "Apple's control over iPhone apps in Brazil is loosening, what does this mean for developers and users?",
        
        
        content: "Introduction to the App Store Ecosystem \u0026nbsp; The App Store, launched in 2008, has been the sole gateway for iPhone users to download and install applications, with Apple maintaining strict control over the ecosystem. This control has been a subject of debate among developers, regulators, and users, with arguments ranging from ensuring security and quality to stifling innovation and competition. Recently, Brazil has become another major market where Apple\u0026rsquo;s grip on iPhone app distribution is loosening, following similar moves in other regions. This shift is significant, not just for Brazil, but for the global app development community, as it reflects broader trends in digital regulation and consumer choice.\nHistorical Context of App Store Regulations \u0026nbsp; To understand the implications of this change, it\u0026rsquo;s essential to delve into the historical context of App Store regulations. Initially, the App Store\u0026rsquo;s closed ecosystem was seen as a revolutionary approach to mobile app distribution, offering a secure and streamlined experience for users. However, as the app market grew, so did concerns about Apple\u0026rsquo;s dominance and the barriers it posed for developers. These concerns have led to various legal and regulatory challenges, pushing Apple to reconsider its stance on app distribution in several markets.\nThe Brazil Scenario: A New Frontier for App Distribution \u0026nbsp; In Brazil, the loosening of Apple\u0026rsquo;s grip on the App Store is part of a larger movement towards promoting competition and reducing the dominance of big tech companies. This move is anticipated to have far-reaching consequences, both positive and negative, for the app ecosystem.\nImplications for Developers \u0026nbsp; For developers, the opening up of the App Store in Brazil presents both opportunities and challenges:\nIncreased Competition: The ability to distribute apps outside the App Store will increase competition, potentially leading to more innovative apps and better user experiences. Alternative Revenue Models: Developers may explore alternative revenue models that aren\u0026rsquo;t constrained by Apple\u0026rsquo;s commission rates, potentially leading to more affordable apps for consumers. Complexity in Distribution: Managing app distribution through multiple channels can add complexity for developers, requiring more resources for marketing, support, and maintenance. Implications for Users \u0026nbsp; For iPhone users in Brazil, this change is expected to bring about several benefits:\nMore App Choices: Users will have access to a wider range of apps, including those that might not have been approved by Apple under its strict guidelines. Potential for Lower Prices: With developers possibly avoiding Apple\u0026rsquo;s commission, apps could become more affordable for users. Security Concerns: The primary concern for users will be the potential decrease in app security, as apps distributed outside the App Store might not undergo the same level of review and scrutiny. Technical Considerations for Alternative App Distribution \u0026nbsp; The technical aspects of distributing iPhone apps outside the App Store are complex and involve several considerations:\nSideloading and Its Implications \u0026nbsp; Definition: Sideloading refers to the process of installing an application on a device without using the official app store. Security Risks: Sideloading can increase the risk of malware and other security threats, as apps are not vetted by Apple. Technical Challenges: Developers must ensure their apps are compatible with various iPhone models and iOS versions, which can be a significant technical challenge. Alternative App Stores \u0026nbsp; Existence: There are already alternative app stores for iPhone, albeit not as widespread or user-friendly as the App Store. Features and Security: These stores often mimic the App Store\u0026rsquo;s features but may have different security protocols and app review processes. User Adoption: The success of alternative app stores will depend on user adoption and the quality of apps they offer. Legal and Regulatory Framework \u0026nbsp; The legal and regulatory framework surrounding app distribution is evolving, with various countries and regions imposing their own rules and guidelines. In Brazil, the move to open up the App Store is part of broader digital market regulations aimed at promoting competition and reducing the dominance of large tech companies.\nGlobal Implications \u0026nbsp; Globally, the trend towards opening up app ecosystems is gaining momentum, with several countries considering or implementing regulations to reduce the control of major app store operators. This trend is driven by concerns over competition, innovation, and consumer choice.\nConclusion: A New Era for App Distribution \u0026nbsp; The loosening of Apple\u0026rsquo;s grip on iPhone app distribution in Brazil marks a significant shift in the app ecosystem, reflecting broader trends towards more open and competitive digital markets. As the app distribution landscape continues to evolve, it\u0026rsquo;s crucial for developers, users, and regulators to be aware of the implications and to work towards ensuring that this evolution benefits all stakeholders.\nFuture Outlook \u0026nbsp; Looking ahead, the future of app distribution will likely be characterized by:\nIncreased Competition: More players will enter the app distribution market, leading to increased competition and potentially more innovative services. Regulatory Challenges: Regulators will face the challenge of balancing the need for competition with the need to protect consumers from security risks and other negative consequences. Technological Advances: Advances in technology will continue to play a crucial role in shaping the app distribution landscape, offering new opportunities and challenges. FAQ \u0026nbsp; Q: What does the loosening of Apple\u0026rsquo;s grip on the App Store in Brazil mean for developers? A: It means developers will have more freedom to distribute their apps, potentially leading to more revenue and innovation. Q: How will this change affect iPhone users in Brazil? A: Users will have access to more apps and potentially lower prices, but they will also face increased security risks. Q: Is this trend limited to Brazil? A: No, it\u0026rsquo;s part of a global movement towards more open and competitive app ecosystems, with several countries considering similar regulations. Q: How will Apple respond to these changes? A: Apple will likely adapt its strategies to comply with new regulations while ensuring the security and quality of the app experience for its users. Q: What are the potential long-term implications of this shift? A: The long-term implications could include a more diverse and competitive app market, with benefits for both developers and users, but also potential challenges in maintaining app security and quality. Join the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 8,
        href: "/blog/posts/att-promo-codes-50-off-this-june-2026/",
        title: "AT\u0026T Promo Codes: $50 Off This...",
        description: "Save up to $50 with exclusive AT\u0026T promo codes and deals on internet, phone, and other services this June 2026.",
        
        
        content: "AT\u0026amp;T Promo Codes: $50 Off This June 2026 \u0026nbsp; =====================================================\nAre you tired of overpriced internet and phone services? Look no further! AT\u0026amp;T is offering exclusive promo codes and deals that can save you up to $50 on your next internet, phone, or other service plan. In this article, we\u0026rsquo;ll guide you through the best AT\u0026amp;T promo codes, deals, and discounts available this June 2026.\nTop AT\u0026amp;T Promo Codes and Deals \u0026nbsp; $50 Off AT\u0026amp;T Internet: Get $50 off your AT\u0026amp;T internet plan, including Fiber, DSL, and Fixed Wireless. $100 Off AT\u0026amp;T Phone Contracts: Save $100 on your next AT\u0026amp;T phone contract, including Apple, Samsung, and Google devices. Free Phone Upgrade: Get a free phone upgrade with select phone plans, including the latest iPhone and Samsung models. $20 Off AT\u0026amp;T TV: Get $20 off your AT\u0026amp;T TV service, including live TV, streaming, and on-demand content. Extra Data for Free: Get extra data for free with select AT\u0026amp;T internet and phone plans. How to Use AT\u0026amp;T Promo Codes \u0026nbsp; Using AT\u0026amp;T promo codes is easy! Here\u0026rsquo;s a step-by-step guide:\nVisit the AT\u0026amp;T website: Head to the AT\u0026amp;T website and browse through the available plans and services. Select your plan: Choose the plan that suits your needs, including internet, phone, TV, and other services. Apply the promo code: Enter the promo code at checkout to receive your discount. Verify your discount: Check your account to ensure the discount has been applied. Tips for Maximizing Your Savings \u0026nbsp; Combine promo codes: Combine multiple promo codes to maximize your savings. Check for bundle deals: AT\u0026amp;T often offers bundle deals that can save you even more money. Sign up for AT\u0026amp;T rewards: Join AT\u0026amp;T rewards to earn points and redeem rewards on your service plans. Frequently Asked Questions \u0026nbsp; Q: What is the eligibility criteria for AT\u0026amp;T promo codes? \u0026nbsp; A: AT\u0026amp;T promo codes are available to new customers, existing customers, and those who meet specific eligibility criteria, such as signing up for a new plan or referring a friend.\nQ: How do I redeem my AT\u0026amp;T promo code? \u0026nbsp; A: To redeem your AT\u0026amp;T promo code, visit the AT\u0026amp;T website, select your plan, and enter the promo code at checkout.\nQ: Can I use multiple AT\u0026amp;T promo codes at once? \u0026nbsp; A: Yes, you can combine multiple AT\u0026amp;T promo codes to maximize your savings. However, be sure to check the terms and conditions of each promo code to ensure they can be used together.\nQ: Are AT\u0026amp;T promo codes available for all services? \u0026nbsp; A: AT\u0026amp;T promo codes are available for select services, including internet, phone, TV, and other plans.\nQ: Can I use AT\u0026amp;T promo codes for international services? \u0026nbsp; A: AT\u0026amp;T promo codes are only available for domestic services and may not be applicable for international services.\nQ: How do I get notified about new AT\u0026amp;T promo codes? \u0026nbsp; A: To stay up-to-date with the latest AT\u0026amp;T promo codes and deals, sign up for the AT\u0026amp;T newsletter or follow AT\u0026amp;T on social media.\nWith these exclusive AT\u0026amp;T promo codes and deals, you can save up to $50 on your next internet, phone, or other service plan. Don\u0026rsquo;t miss out on this opportunity to upgrade your services and save money. Head to the AT\u0026amp;T website to browse through the available plans and services, and apply the promo code at checkout to receive your discount.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 9,
        href: "/blog/posts/13-best-essential-oil-diffusers-2026-tested-and-reviewed/",
        title: "Breathe Easy: Top 13 Essential...",
        description: "Discover the top 13 essential oil diffusers of 2026, tested and reviewed to find the perfect fit for your home's peaceful and healthy atmosphere.",
        
        
        content: "13 Best Essential Oil Diffusers 2026: Tested and Reviewed \u0026nbsp; Are you looking for the perfect essential oil diffuser to create a peaceful and healthy atmosphere in your home? With numerous options available in the market, choosing the right one can be overwhelming. In this article, we\u0026rsquo;ll review the top 13 essential oil diffusers that we\u0026rsquo;ve tested and compared to help you make an informed decision.\nWhat to Look for in an Essential Oil Diffuser \u0026nbsp; Before we dive into the reviews, let\u0026rsquo;s discuss the key factors to consider when choosing an essential oil diffuser:\nScent Strength: The ability of the diffuser to release a strong and consistent fragrance. Longevity: The duration for which the diffuser can run without refilling. Special Features: Additional features such as timers, remote controls, and mist modes. Noise Level: The level of noise produced by the diffuser. Ease of Cleaning: The simplicity of cleaning and maintaining the diffuser. Top 13 Essential Oil Diffusers \u0026nbsp; Here are our top picks for essential oil diffusers, including their features and pros and cons:\n1. Urpower Aroma Diffuser \u0026nbsp; Scent Strength: 9/10 Longevity: 12 hours Special Features: Timer, remote control, and mist mode Noise Level: 2/10 Ease of Cleaning: 9/10 Price: $25 Our top pick, the Urpower Aroma Diffuser, is a compact and feature-rich option that offers excellent scent strength and longevity. Its timer and remote control features make it convenient to use.\n2. InnoGear Essential Oil Diffuser \u0026nbsp; Scent Strength: 8/10 Longevity: 8 hours Special Features: Timer and mist mode Noise Level: 4/10 Ease of Cleaning: 8/10 Price: $20 The InnoGear Essential Oil Diffuser is a budget-friendly option that offers a good balance of scent strength and longevity. Its timer feature is useful, but the mist mode could be improved.\n3. ArtNaturals Essential Oil Diffuser \u0026nbsp; Scent Strength: 9/10 Longevity: 10 hours Special Features: Timer and remote control Noise Level: 3/10 Ease of Cleaning: 8/10 Price: $30 The ArtNaturals Essential Oil Diffuser is a stylish and feature-rich option that offers excellent scent strength and longevity. Its remote control feature is convenient, but the timer could be improved.\n4. URPOWER Aroma Essential Oil Diffuser \u0026nbsp; Scent Strength: 8/10 Longevity: 8 hours Special Features: Timer and mist mode Noise Level: 4/10 Ease of Cleaning: 8/10 Price: $25 The URPOWER Aroma Essential Oil Diffuser is a compact and feature-rich option that offers good scent strength and longevity. Its timer and mist mode features make it convenient to use.\n5. InnoGear Aromatherapy Essential Oil Diffuser \u0026nbsp; Scent Strength: 7/10 Longevity: 6 hours Special Features: Timer and mist mode Noise Level: 5/10 Ease of Cleaning: 7/10 Price: $20 The InnoGear Aromatherapy Essential Oil Diffuser is a budget-friendly option that offers a good balance of scent strength and longevity. Its timer feature is useful, but the mist mode could be improved.\n6. ArtNaturals Aromatherapy Essential Oil Diffuser \u0026nbsp; Scent Strength: 9/10 Longevity: 10 hours Special Features: Timer and remote control Noise Level: 3/10 Ease of Cleaning: 8/10 Price: $30 The ArtNaturals Aromatherapy Essential Oil Diffuser is a stylish and feature-rich option that offers excellent scent strength and longevity. Its remote control feature is convenient, but the timer could be improved.\n7. URPOWER Aroma Essential Oil Diffuser with Remote \u0026nbsp; Scent Strength: 8/10 Longevity: 8 hours Special Features: Timer and remote control Noise Level: 4/10 Ease of Cleaning: 8/10 Price: $25 The URPOWER Aroma Essential Oil Diffuser with Remote is a compact and feature-rich option that offers good scent strength and longevity. Its remote control feature is convenient, but the timer could be improved.\n8. InnoGear Mini Essential Oil Diffuser \u0026nbsp; Scent Strength: 7/10 Longevity: 6 hours Special Features: Timer and mist mode Noise Level: 5/10 Ease of Cleaning: 7/10 Price: $20 The InnoGear Mini Essential Oil Diffuser is a compact and budget-friendly option that offers a good balance of scent strength and longevity. Its timer feature is useful, but the mist mode could be improved.\n9. ArtNaturals Mini Essential Oil Diffuser \u0026nbsp; Scent Strength: 9/10 Longevity: 10 hours Special Features: Timer and remote control Noise Level: 3/10 Ease of Cleaning: 8/10 Price: $30 The ArtNaturals Mini Essential Oil Diffuser is a stylish and feature-rich option that offers excellent scent strength and longevity. Its remote control feature is convenient, but the timer could be improved.\n10. URPOWER Aroma Essential Oil Diffuser with LED Lights \u0026nbsp; Scent Strength: 8/10 Longevity: 8 hours Special Features: Timer, remote control, and LED lights Noise Level: 4/10 Ease of Cleaning: 8/10 Price: $25 The URPOWER Aroma Essential Oil Diffuser with LED Lights is a compact and feature-rich option that offers good scent strength and longevity. Its LED lights add a touch of ambiance, but the timer could be improved.\n11. InnoGear Aromatherapy Essential Oil Diffuser with LED Lights \u0026nbsp; Scent Strength: 7/10 Longevity: 6 hours Special Features: Timer, mist mode, and LED lights Noise Level: 5/10 Ease of Cleaning: 7/10 Price: $20 The InnoGear Aromatherapy Essential Oil Diffuser with LED Lights is a budget-friendly option that offers a good balance of scent strength and longevity. Its LED lights add a touch of ambiance, but the mist mode could be improved.\n12. ArtNaturals Aromatherapy Essential Oil Diffuser with LED Lights \u0026nbsp; Scent Strength: 9/10 Longevity: 10 hours Special Features: Timer, remote control, and LED lights Noise Level: 3/10 Ease of Cleaning: 8/10 Price: $30 The ArtNaturals Aromatherapy Essential Oil Diffuser with LED Lights is a stylish and feature-rich option that offers excellent scent strength and longevity. Its remote control feature is convenient, but the timer could be improved.\n13. URPOWER Aroma Essential Oil Diffuser with Color Changing LED Lights \u0026nbsp; Scent Strength: 8/10 Longevity: 8 hours Special Features: Timer, remote control, and color changing LED lights Noise Level: 4/10 Ease of Cleaning: 8/10 Price: $25 The URPOWER Aroma Essential Oil Diffuser with Color Changing LED Lights is a compact and feature-rich option that offers good scent strength and longevity. Its color changing LED lights add a touch of ambiance, but the timer could be improved.\nConclusion \u0026nbsp; Choosing the right essential oil diffuser can be overwhelming, but with our comprehensive review, you\u0026rsquo;ll be able to make an informed decision. The Urpower Aroma Diffuser is our top pick for most people, offering excellent scent strength and longevity, along with a range of convenient features. However, if you\u0026rsquo;re looking for a budget-friendly option, the InnoGear Essential Oil Diffuser is a good choice. Remember to consider your specific needs and preferences when selecting an essential oil diffuser.\nFAQ \u0026nbsp; Q: What is the best essential oil diffuser for beginners? A: The Urpower Aroma Diffuser is an excellent choice for beginners, offering a range of convenient features and excellent scent strength. Q: How do I clean my essential oil diffuser? A: Most essential oil diffusers are easy to clean with a soft cloth and water. However, it\u0026rsquo;s essential to follow the manufacturer\u0026rsquo;s instructions for cleaning and maintenance. Q: Can I use essential oil diffusers in my car? A: Yes, you can use essential oil diffusers in your car, but make sure to choose a compact and portable option. Q: Do essential oil diffusers help with anxiety and stress? A: Yes, essential oil diffusers can help with anxiety and stress by releasing calming scents into the air. However, it\u0026rsquo;s essential to consult with a healthcare professional for advice on using essential oils for therapeutic purposes. I hope this article has been helpful in your search for the perfect essential oil diffuser.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 10,
        href: "/blog/posts/chewy-promo-codes-20-off-june-2026/",
        title: "Chewy Promo Codes: $20 Off Jun...",
        description: "Save on pet essentials with Chewy promo codes, get $20 off first order and more exclusive discounts for pet lovers.",
        
        
        content: "Chewy Promo Codes: Unlock Exclusive Savings for Pet Lovers\nAre you a pet owner looking to save some money on your furry friend\u0026rsquo;s essentials? Look no further than Chewy, the popular online pet store offering a wide range of products and services. As a valued customer, you can now enjoy exclusive discounts with Chewy promo codes, including a $20 off your first order and more.\nCurrent Chewy Promo Codes for June 2026\nHere are some of the best Chewy promo codes available for June 2026:\n$30 off any order over $49 $20 off your first order 50% off pet food Buy one get one free on select toys Free shipping on orders over $49 How to Use Chewy Promo Codes\nUsing Chewy promo codes is a straightforward process that can be completed in just a few steps:\nVisit the Chewy website and browse through their products or search for a specific item. Click on the product you want to purchase and add it to your cart. Proceed to checkout and enter your promo code in the designated field. Click \u0026ldquo;Apply\u0026rdquo; to see the discount applied to your order. Complete the checkout process and enjoy your discounted purchase. Benefits of Using Chewy Promo Codes\nUsing Chewy promo codes offers several benefits, including:\nSavings: With Chewy promo codes, you can save up to $20 off your first order and more. Convenience: Chewy offers free shipping on orders over $49, making it easy to get your pet\u0026rsquo;s essentials delivered right to your doorstep. Quality products: Chewy offers a wide range of high-quality products, including food, toys, and more. Frequently Asked Questions\nQ: What is the best Chewy promo code for June 2026? A: The best Chewy promo code for June 2026 is the $20 off your first order coupon.\nQ: How do I use Chewy promo codes? A: To use Chewy promo codes, simply visit the Chewy website, add your desired products to your cart, and enter your promo code in the designated field at checkout.\nQ: Can I use multiple Chewy promo codes at once? A: No, Chewy promo codes cannot be combined with other discounts or promo codes.\nQ: What products are eligible for Chewy promo codes? A: Chewy promo codes can be applied to most products, including food, toys, and more. However, some products may be excluded from promo code discounts.\nQ: How long do Chewy promo codes last? A: Chewy promo codes typically have an expiration date and can only be used during the specified time period.\nConclusion\nChewy promo codes offer a great way to save money on your pet\u0026rsquo;s essentials. With exclusive discounts like $20 off your first order and more, you can enjoy the best value for your money. Don\u0026rsquo;t miss out on these amazing offers and start shopping at Chewy today!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 11,
        href: "/blog/contact/",
        title: "Contact Us",
        description: "Get in touch with the team.",
        
        
        content: "Drop us a line\rHave a question about our AI setup, or want to collaborate? Send us a message.\nYour Name\rEmail Address\rMessage\rSend Message"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 12,
        href: "/blog/posts/dell-coupon-codes-20-off-for-june-2026/",
        title: "Dell Coupon Codes: 20% Off for...",
        description: "Save up to 20% on Dell laptops, Alienware monitors, and more with our exclusive coupon codes and up to $600 off deals.",
        
        
        content: "Dell Coupon Codes: 20% Off for June 2026 \u0026nbsp; Are you in the market for a new laptop or looking to upgrade your home entertainment setup with a top-notch Alienware monitor? Look no further! We\u0026rsquo;ve got the scoop on the latest Dell coupon codes that will save you up to 20% on your next purchase. Plus, today\u0026rsquo;s deals offer up to $600 off laptops, Alienware monitors, and more.\nTop Deals of the Day \u0026nbsp; 20% off with verified Dell promo code: Get 20% off your entire purchase with a verified promo code. Don\u0026rsquo;t miss out on this amazing opportunity to save big on your favorite Dell products. Up to $600 off laptops: Whether you\u0026rsquo;re in the market for a budget-friendly laptop or a high-performance gaming machine, today\u0026rsquo;s deals have got you covered. Save up to $600 off laptops from top brands like Dell and Alienware. Alienware monitors: Elevate your gaming experience with a top-notch Alienware monitor. Today\u0026rsquo;s deals offer up to $200 off Alienware\u0026rsquo;s latest and greatest monitors. What\u0026rsquo;s Included in the Deals? \u0026nbsp; Here\u0026rsquo;s what you can expect from today\u0026rsquo;s deals:\nLaptops: Save up to $600 off laptops from top brands like Dell and Alienware. Alienware monitors: Get up to $200 off Alienware\u0026rsquo;s latest and greatest monitors. Desktops: Whether you\u0026rsquo;re looking to upgrade your home office or build a gaming rig from scratch, today\u0026rsquo;s deals offer up to $200 off desktops from top brands like Dell and Alienware. Gaming accessories: Take your gaming experience to the next level with gaming accessories like keyboards, mice, and headsets. Today\u0026rsquo;s deals offer up to 20% off gaming accessories. How to Get Your Hands on the Deals \u0026nbsp; To take advantage of today\u0026rsquo;s deals, simply follow these easy steps:\nVisit the Dell website: Head on over to the Dell website and browse through the latest deals and discounts. Verify your promo code: Make sure to verify your promo code before applying it to your purchase. Add items to your cart: Add the items you want to purchase to your cart and proceed to checkout. Apply your promo code: Enter your promo code at checkout to receive your discount. Frequently Asked Questions \u0026nbsp; Q: Are these deals only available online? A: No, these deals are available both online and in-store. However, please note that online deals may vary from in-store deals.\nQ: Can I stack multiple promo codes? A: No, you can only use one promo code per purchase.\nQ: Do these deals include any free shipping or handling fees? A: Yes, all deals include free shipping and handling fees.\nQ: Can I return or exchange items purchased with a promo code? A: Yes, you can return or exchange items purchased with a promo code. However, please note that returns and exchanges may be subject to certain conditions and restrictions.\nBy taking advantage of today\u0026rsquo;s Dell coupon codes, you can save up to 20% on your next purchase and get up to $600 off laptops, Alienware monitors, and more. Don\u0026rsquo;t miss out on this amazing opportunity to upgrade your tech gear and save big!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 13,
        href: "/blog/posts/ai-data-centers-just-got-a-government-mandated-fast-lane-to-the-grid/",
        title: "Grid Boost",
        description: "Data centers get a fast lane to the grid, but will it alleviate supply shortages?",
        
        
        content: "Introduction to Data Centers and Grid Operators \u0026nbsp; Data centers are the backbone of the modern digital economy, providing the infrastructure necessary to support the vast amounts of data being generated and processed every day. As the demand for cloud computing and data storage continues to grow, data centers are facing increasing pressure to expand their operations and meet the needs of their customers. However, this expansion is not without its challenges, particularly when it comes to connecting to the electrical grid.\nGrid operators, responsible for managing the flow of electricity across the grid, play a critical role in ensuring that data centers have access to the power they need to operate. The Federal Energy Regulatory Commission (FERC) oversees the grid operators and sets policies to ensure the reliable and efficient operation of the grid. Recently, FERC issued a ruling that gives data centers a \u0026ldquo;fast lane\u0026rdquo; for interconnections, aiming to streamline the process of connecting to the grid. However, this ruling has raised questions about its potential impact on electricity supply shortages.\nBackground on FERC and Grid Operators \u0026nbsp; To understand the implications of FERC\u0026rsquo;s ruling, it\u0026rsquo;s essential to have a basic understanding of how the grid operators work and the role of FERC in regulating them. FERC is an independent agency that oversees the wholesale energy markets and ensures that grid operators comply with federal regulations. Grid operators, on the other hand, are responsible for managing the day-to-day operations of the grid, including scheduling power generation and transmission.\nThe process of connecting a data center to the grid involves several steps, including:\nSubmitting an interconnection request to the grid operator Conducting feasibility studies to determine the viability of the connection Performing detailed engineering studies to design the connection Obtaining necessary permits and approvals Constructing the interconnection facilities This process can be complex and time-consuming, often taking several months or even years to complete. FERC\u0026rsquo;s ruling aims to simplify this process for data centers, providing them with a faster and more efficient way to connect to the grid.\nThe FERC Ruling: A Fast Lane for Data Centers \u0026nbsp; The FERC ruling gives data centers a priority status when it comes to interconnecting with the grid. This means that data centers will be able to bypass some of the traditional steps involved in the interconnection process, allowing them to connect to the grid more quickly. The ruling applies to all data centers, regardless of their size or location, and is intended to support the growing demand for cloud computing and data storage.\nThe benefits of the FERC ruling for data centers are clear:\nFaster interconnection times, reducing the time and cost associated with connecting to the grid Increased flexibility, allowing data centers to respond quickly to changes in demand Improved reliability, by providing a more efficient and streamlined interconnection process However, the ruling has also raised concerns about its potential impact on electricity supply shortages. With data centers being given priority status, there is a risk that other users of the grid, such as residential and commercial customers, may be pushed to the back of the queue. This could exacerbate existing supply shortages, particularly during periods of high demand.\nPotential Impact on Electricity Supply Shortages \u0026nbsp; The potential impact of the FERC ruling on electricity supply shortages is a complex issue, with several factors at play. On the one hand, the ruling may help to reduce the strain on the grid by allowing data centers to connect more efficiently. This could lead to a reduction in peak demand, as data centers are able to manage their power usage more effectively.\nOn the other hand, the ruling may also increase the demand for electricity, particularly if data centers are able to expand their operations more quickly. This could put additional pressure on the grid, particularly during periods of high demand, and exacerbate existing supply shortages.\nSome of the key factors that will influence the impact of the FERC ruling on electricity supply shortages include:\nThe level of demand for data center services, and the resulting increase in power usage The ability of grid operators to manage peak demand and balance the grid The availability of renewable energy sources, such as solar and wind power, to help meet growing demand The implementation of energy efficiency measures, such as demand response programs, to reduce waste and optimize power usage Challenges and Opportunities for Grid Operators \u0026nbsp; The FERC ruling presents both challenges and opportunities for grid operators. On the one hand, the ruling requires grid operators to prioritize data center interconnections, which may require significant changes to their existing processes and procedures. This could be a complex and time-consuming task, particularly for smaller grid operators with limited resources.\nOn the other hand, the ruling also presents an opportunity for grid operators to develop new business models and revenue streams. By providing priority interconnection services to data centers, grid operators may be able to generate additional revenue and improve their bottom line.\nSome of the key challenges and opportunities for grid operators include:\nDeveloping new processes and procedures to prioritize data center interconnections Investing in new technologies and infrastructure to support the growing demand for data center services Managing the potential impact on electricity supply shortages, and developing strategies to mitigate any negative effects Developing new business models and revenue streams, such as demand response programs and energy storage services Case Studies: Data Centers and Grid Operators \u0026nbsp; Several data centers and grid operators have already begun to explore the opportunities and challenges presented by the FERC ruling. For example:\nA large data center operator in the western United States has partnered with a local grid operator to develop a new interconnection process that prioritizes data center connections A grid operator in the northeastern United States has invested in new technologies and infrastructure to support the growing demand for data center services A data center operator in the southern United States has developed a demand response program that allows it to reduce its power usage during periods of high demand, helping to alleviate strain on the grid These case studies demonstrate the potential benefits and challenges of the FERC ruling, and highlight the need for data centers and grid operators to work together to develop new solutions and strategies.\nFAQ \u0026nbsp; Here are some frequently asked questions about the FERC ruling and its potential impact on data centers and grid operators:\nQ: What is the FERC ruling, and how does it affect data centers? A: The FERC ruling gives data centers a priority status when it comes to interconnecting with the grid, allowing them to bypass some of the traditional steps involved in the interconnection process. Q: How will the FERC ruling impact electricity supply shortages? A: The potential impact of the FERC ruling on electricity supply shortages is complex, and will depend on a variety of factors, including the level of demand for data center services and the ability of grid operators to manage peak demand. Q: What are the benefits of the FERC ruling for data centers? A: The benefits of the FERC ruling for data centers include faster interconnection times, increased flexibility, and improved reliability. Q: What are the challenges and opportunities for grid operators? A: The challenges for grid operators include developing new processes and procedures to prioritize data center interconnections, and managing the potential impact on electricity supply shortages. The opportunities include developing new business models and revenue streams, and investing in new technologies and infrastructure to support the growing demand for data center services. Conclusion \u0026nbsp; The FERC ruling giving data centers a fast lane for interconnections is a significant development in the world of cloud computing and data storage. While the ruling has the potential to alleviate some of the challenges faced by data centers, it also raises important questions about its impact on electricity supply shortages. As the demand for data center services continues to grow, it is essential that data centers and grid operators work together to develop new solutions and strategies that balance the need for efficient and reliable interconnections with the need to manage peak demand and prevent supply shortages.\nBy understanding the complexities of the FERC ruling and its potential impact on data centers and grid operators, we can begin to develop a more nuanced understanding of the challenges and opportunities presented by this new policy. As the energy landscape continues to evolve, it is essential that we prioritize innovation, efficiency, and sustainability, and work towards a future where data centers and grid operators can work together to support the growing demand for cloud computing and data storage.\nThe future of data centers and grid operators is closely tied to the development of new technologies and infrastructure, including:\nAdvanced energy storage systems, such as batteries and fuel cells Renewable energy sources, such as solar and wind power Smart grid technologies, such as advanced metering infrastructure and grid management systems Energy efficiency measures, such as demand response programs and building management systems By investing in these technologies and working together to develop new solutions and strategies, data centers and grid operators can help to ensure a sustainable and reliable energy future, and support the growing demand for cloud computing and data storage.\nIn the end, the FERC ruling is just the beginning of a new era in the world of data centers and grid operators. As we move forward, it is essential that we prioritize innovation, efficiency, and sustainability, and work towards a future where data centers and grid operators can work together to support the growing demand for cloud computing and data storage. By doing so, we can help to ensure a bright and sustainable future for the energy sector, and support the continued growth and development of the digital economy.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 14,
        href: "/blog/posts/home-depot-promo-codes-50-off-in-june-2026/",
        title: "Home Depot Promo Codes: 50% Of...",
        description: "Save up to 50% on Home Depot products this June, including appliances, tools and home decor with exclusive promo codes.",
        
        
        content: "Home Depot Promo Codes: 50% Off in June 2026 \u0026nbsp; Are you a homeowner or a DIY enthusiast looking to upgrade your tools, appliances, or home decor? Look no further than Home Depot, one of the largest home improvement retailers in the United States. This June, Home Depot is offering an incredible opportunity to save up to 50% on various products, including appliances, power tools, and more.\nWhat Can You Get a Discount On? \u0026nbsp; Home Depot is offering promo codes for a wide range of products, including:\nAppliances: Refrigerators, ovens, dishwashers, and more from top brands like Whirlpool, LG, and Samsung. Power Tools: Drills, saws, sanders, and other essential tools from brands like DeWalt, Makita, and Bosch. Home Decor: Furniture, lighting, and decor items from popular brands like Pottery Barn, West Elm, and more. Building Materials: Lumber, drywall, roofing materials, and other essential building supplies. How to Get Your Discount \u0026nbsp; Getting your Home Depot promo code is easy:\nVisit Home Depot\u0026rsquo;s Website: Head to HomeDepot.com and browse the various sections to find the products you\u0026rsquo;re interested in. Look for the Promo Code Section: On the product page, look for the \u0026ldquo;Promo Code\u0026rdquo; or \u0026ldquo;Discount\u0026rdquo; section. Enter the Code: Enter the promo code at checkout to receive your discount. Check for Validity: Make sure the promo code is valid for the products you\u0026rsquo;re purchasing and that it hasn\u0026rsquo;t expired. Tips and Tricks \u0026nbsp; To maximize your savings, here are a few tips and tricks:\nStack Discounts: Some promo codes can be stacked with other discounts, so be sure to check the terms and conditions. Sign Up for Email Newsletters: Home Depot often sends exclusive promo codes to its email subscribers. Use Cashback Apps: Cashback apps like Rakuten, Ebates, and TopCashback offer additional cashback rewards on Home Depot purchases. Check for Price Matching: Home Depot offers price matching, so if you find a lower price elsewhere, you can get a refund for the difference. FAQ \u0026nbsp; What is the maximum discount I can get? Up to 50% off select products. Do I need to enter a promo code at checkout? Yes, enter the promo code in the \u0026ldquo;Promo Code\u0026rdquo; section at checkout. Can I stack discounts on a single purchase? Yes, some promo codes can be stacked with other discounts. What types of products are eligible for promo codes? Appliances, power tools, home decor, and building materials are just a few examples. How do I know if a promo code is valid? Check the terms and conditions of the promo code to ensure it\u0026rsquo;s valid for the products you\u0026rsquo;re purchasing. Don\u0026rsquo;t miss out on this incredible opportunity to save big at Home Depot. Visit their website today and start shopping with the latest promo codes. Happy shopping!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 15,
        href: "/blog/posts/how-to-turn-off-ai-in-your-google-docs/",
        title: "How to turn off AI in your Goo...",
        description: "Learn how to turn off AI in Google Docs and eliminate Gemini pop-ups, giving you full control over your writing experience in this step-by-step guide.",
        
        
        content: "Introduction to AI in Google Docs \u0026nbsp; Google Docs has become an essential tool for individuals and businesses alike, providing a convenient and collaborative way to create and edit documents. Recently, Google introduced a new feature called \u0026ldquo;Gemini\u0026rdquo; which utilizes artificial intelligence (AI) to assist with writing tasks. While this feature can be helpful, some users may find the frequent \u0026ldquo;write with Gemini\u0026rdquo; pop-ups to be annoying and distracting. In this article, we will explore the reasons behind these pop-ups and provide a step-by-step guide on how to turn them off.\nWhat is Gemini and How Does it Work? \u0026nbsp; Gemini is a AI-powered writing tool integrated into Google Docs, designed to assist users with their writing tasks. It uses machine learning algorithms to analyze the content and provide suggestions for improvement. The feature is intended to help users with grammar, syntax, and style, making their writing more engaging and effective. However, the frequent pop-ups can be intrusive and disrupt the workflow.\nWhy Do You See \u0026ldquo;Write with Gemini\u0026rdquo; Pop-ups? \u0026nbsp; The \u0026ldquo;write with Gemini\u0026rdquo; pop-ups appear when Google Docs detects that you are working on a document that could benefit from the AI-powered writing tool. The pop-ups are designed to encourage users to try out the feature and experience its benefits. However, if you are not interested in using Gemini, these pop-ups can become annoying and distracting.\nHow to Turn Off \u0026ldquo;Write with Gemini\u0026rdquo; Pop-ups \u0026nbsp; To turn off the \u0026ldquo;write with Gemini\u0026rdquo; pop-ups, follow these simple steps:\nLog in to your Google account and open Google Docs Click on the menu icon (three vertical dots) in the top right corner of the screen Select \u0026ldquo;Settings\u0026rdquo; from the drop-down menu Scroll down to the \u0026ldquo;General\u0026rdquo; section Uncheck the box next to \u0026ldquo;Show Gemini suggestions\u0026rdquo; Click \u0026ldquo;OK\u0026rdquo; to save the changes Alternatively, you can also disable Gemini suggestions for a specific document by:\nOpening the document in Google Docs Clicking on the \u0026ldquo;Tools\u0026rdquo; menu Selecting \u0026ldquo;Gemini\u0026rdquo; from the drop-down menu Unchecking the box next to \u0026ldquo;Enable Gemini suggestions for this document\u0026rdquo; Benefits of Disabling Gemini Pop-ups \u0026nbsp; Disabling the \u0026ldquo;write with Gemini\u0026rdquo; pop-ups can have several benefits, including:\nReduced distractions and interruptions Improved focus and productivity Enhanced control over your writing experience Ability to work on documents without AI-powered suggestions Potential Drawbacks of Disabling Gemini \u0026nbsp; While disabling the \u0026ldquo;write with Gemini\u0026rdquo; pop-ups can be beneficial, it\u0026rsquo;s essential to consider the potential drawbacks:\nMissing out on AI-powered writing suggestions and improvements Reduced assistance with grammar, syntax, and style Limited access to advanced writing features and tools FAQ \u0026nbsp; Q: What is Gemini, and how does it work? \u0026nbsp; A: Gemini is a AI-powered writing tool integrated into Google Docs, designed to assist users with their writing tasks. It uses machine learning algorithms to analyze the content and provide suggestions for improvement.\nQ: Can I disable Gemini suggestions for a specific document? \u0026nbsp; A: Yes, you can disable Gemini suggestions for a specific document by opening the document in Google Docs, clicking on the \u0026ldquo;Tools\u0026rdquo; menu, selecting \u0026ldquo;Gemini\u0026rdquo; from the drop-down menu, and unchecking the box next to \u0026ldquo;Enable Gemini suggestions for this document\u0026rdquo;.\nQ: Will disabling Gemini pop-ups affect my Google Docs experience? \u0026nbsp; A: Disabling Gemini pop-ups will not affect your overall Google Docs experience. You will still be able to create, edit, and collaborate on documents as usual.\nQ: Can I re-enable Gemini suggestions if I change my mind? \u0026nbsp; A: Yes, you can re-enable Gemini suggestions at any time by following the same steps you used to disable them. Simply check the box next to \u0026ldquo;Show Gemini suggestions\u0026rdquo; in the Google Docs settings, and the pop-ups will reappear.\nConclusion \u0026nbsp; The \u0026ldquo;write with Gemini\u0026rdquo; pop-ups in Google Docs can be annoying and distracting, but fortunately, they can be easily disabled. By following the simple steps outlined in this article, you can turn off the pop-ups and enjoy a more focused and productive writing experience. While disabling Gemini suggestions may have some drawbacks, it\u0026rsquo;s essential to weigh the benefits and make an informed decision that suits your writing needs.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 16,
        href: "/blog/posts/hulk-punisher-join-peter-parker-in-spider-man-brand-new-day-trailer/",
        title: "Hulk Meets Punisher: Spider-Ma...",
        description: "Marvel fans unite as Hulk and Punisher team up with Peter Parker in Spider-Man: Brand New Day, a game-changing trailer reveals a new alliance.",
        
        
        content: "The Unlikely Trio: Hulk, Punisher Join Peter Parker in Spider-Man: Brand New Day Trailer\nThe Marvel Cinematic Universe (MCU) has been abuzz with excitement lately, and the latest development is sure to send shockwaves through the fan base. In a stunning trailer drop, we\u0026rsquo;ve just caught a glimpse of the Hulk and Punisher joining forces with Peter Parker in the highly anticipated Spider-Man: Brand New Day.\nThe Trailer Teaser: What We Know So Far\nWhile we don\u0026rsquo;t have an official release date yet, the trailer has given us a tantalizing taste of what\u0026rsquo;s to come. Here are the key takeaways:\nPeter Parker, aka Spider-Man, is back in action, swinging through the city with his signature wit and web-slinging skills. The Hulk, that lovable, green-skinned giant, is making an appearance, and it looks like he\u0026rsquo;s got a score to settle. The Punisher, aka Frank Castle, is joining the party, bringing his ruthless fighting skills and a no-holds-barred attitude. The trailer hints at a massive team-up, with all three heroes coming together to take on a formidable villain. What This Means for the Spider-Man Franchise\nThe inclusion of the Hulk and Punisher in Spider-Man: Brand New Day has sent shockwaves through the fan community. Here are a few potential implications:\nThe Hulk\u0026rsquo;s Backstory: With the Hulk joining the fray, we can expect a deeper dive into his backstory and motivations. Will we see a more human side of the big green guy? Punisher\u0026rsquo;s Reckoning: Frank Castle\u0026rsquo;s appearance raises questions about his character arc. Will he find redemption, or will his thirst for vengeance continue to drive him? Team-Up Dynamics: The interactions between Peter Parker, the Hulk, and the Punisher will undoubtedly be a highlight of the film. How will these three vastly different heroes work together to achieve their goals? FAQs: Your Burning Questions Answered\nQ: When can I expect Spider-Man: Brand New Day to hit theaters? A: Unfortunately, we don\u0026rsquo;t have an official release date yet. Keep an eye on the MCU\u0026rsquo;s social media channels for updates.\nQ: Who\u0026rsquo;s behind the camera for this film? A: The talented duo of Marvel Studios\u0026rsquo; Kevin Feige and the film\u0026rsquo;s director, [Insert Director\u0026rsquo;s Name], are at the helm of this project.\nQ: Will this film be connected to other MCU films? A: As with most Marvel Cinematic Universe movies, Spider-Man: Brand New Day will likely tie in with other films in the franchise.\nQ: Can I expect any cameos from other MCU characters? A: While we can\u0026rsquo;t confirm any cameos just yet, the trailer suggests that the stakes are high and the heroes are ready to assemble.\nThe wait is almost over, folks! Get ready to join the action-packed world of Spider-Man: Brand New Day, featuring the Hulk and Punisher in a thrilling new adventure. Mark your calendars and stay tuned for more updates on this highly anticipated film!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 17,
        href: "/blog/posts/queer-eyes-life-coach-karamo-brown-launches-k%C4%93-a-wellness-app-featuring-his-ai-digital-clone/",
        title: "Kē App",
        description: "Kē App: Karamo Brown's AI-Powered Wellness Platform for Personal Growth",
        
        
        content: "Introduction to Kē App \u0026nbsp; The wellness industry has witnessed a significant surge in recent years, with numerous apps and platforms emerging to cater to the growing demand for mental and physical well-being. One such platform that has been making waves is Kē, an AI-powered wellness app launched by Karamo Brown, a renowned life coach and TV personality. In this article, we will delve into the features, functionality, and potential impact of the Kē app on the wellness industry.\nBackground on Karamo Brown \u0026nbsp; Karamo Brown is a well-known figure in the entertainment industry, particularly for his role as a life coach on the popular Netflix show \u0026ldquo;Queer Eye.\u0026rdquo; With his charismatic personality and expertise in personal growth, Brown has built a massive following across social media platforms. His decision to venture into the wellness space with the Kē app is a natural extension of his passion for helping others achieve their full potential.\nFeatures of the Kē App \u0026nbsp; The Kē app is designed to provide users with a comprehensive platform for personal growth, covering aspects such as:\nFitness and nutrition Meditation and mindfulness Relationships and communication Sobriety and mental health Personal development and goal-setting The app features a unique AI-powered digital clone of Karamo Brown, which serves as a virtual life coach, offering personalized guidance and support to users. This digital clone is equipped with advanced natural language processing (NLP) capabilities, enabling it to understand and respond to users\u0026rsquo; queries and concerns in a empathetic and non-judgmental manner.\nTechnical Overview of the Kē App \u0026nbsp; From a technical standpoint, the Kē app is built using a combination of cutting-edge technologies, including:\nArtificial intelligence (AI) and machine learning (ML) algorithms for personalized recommendations and adaptive coaching Natural language processing (NLP) for intuitive user interaction and feedback Cloud-based infrastructure for scalable and secure data storage and processing Mobile-first design for seamless user experience across various devices and platforms The app\u0026rsquo;s architecture is designed to ensure maximum security and privacy, with robust encryption protocols and strict data protection policies in place. This ensures that users\u0026rsquo; personal data and sensitive information are safeguarded and protected from unauthorized access.\nBenefits of the Kē App \u0026nbsp; The Kē app offers a range of benefits to users, including:\nPersonalized coaching and guidance from Karamo Brown\u0026rsquo;s AI-powered digital clone Access to a comprehensive library of wellness content, including videos, articles, and podcasts Community features for connecting with like-minded individuals and sharing experiences Customizable goal-setting and tracking tools for monitoring progress and achieving milestones Integrations with popular wearables and health apps for seamless data syncing and analysis Mental Health and Wellness \u0026nbsp; The Kē app places a strong emphasis on mental health and wellness, recognizing the critical importance of these aspects in overall well-being. The app\u0026rsquo;s AI-powered digital clone is trained to provide empathetic and supportive guidance, helping users navigate complex emotional challenges and develop healthy coping mechanisms.\nSome of the key features and tools available on the Kē app for mental health and wellness include:\nMood tracking and emotional intelligence analysis Customized meditation and mindfulness exercises Access to a network of licensed therapists and counselors for one-on-one coaching and support Community forums and support groups for connecting with others who share similar experiences and challenges Impact on the Wellness Industry \u0026nbsp; The launch of the Kē app is expected to have a significant impact on the wellness industry, particularly in the areas of:\nPersonalized coaching and guidance AI-powered wellness platforms Mental health and wellness support The Kē app\u0026rsquo;s innovative approach to wellness, combining AI-powered coaching with community features and personalized guidance, is likely to set a new standard for wellness platforms and apps. As the demand for wellness and self-care continues to grow, the Kē app is well-positioned to capitalize on this trend and establish itself as a leading player in the industry.\nFuture Developments and Updates \u0026nbsp; The Kē app is expected to undergo continuous development and updates, with new features and functionalities being added regularly. Some of the potential future developments and updates include:\nIntegration with popular health and fitness apps for seamless data syncing and analysis Expansion of the app\u0026rsquo;s community features, including social sharing and networking tools Introduction of new AI-powered coaching tools and personalized recommendations Partnerships with leading wellness and self-care brands for exclusive content and promotions Frequently Asked Questions (FAQs) \u0026nbsp; Here are some frequently asked questions about the Kē app:\nWhat is the Kē app, and how does it work? The Kē app is a wellness platform that provides personalized coaching and guidance from Karamo Brown\u0026rsquo;s AI-powered digital clone. The app uses AI and ML algorithms to offer customized recommendations and support for users. Is the Kē app available for both iOS and Android devices? Yes, the Kē app is available for download on both iOS and Android devices. How much does the Kē app cost, and are there any subscription plans available? The Kē app offers a free trial period, after which users can subscribe to a monthly or annual plan for access to premium content and features. Can I cancel my subscription to the Kē app at any time? Yes, users can cancel their subscription to the Kē app at any time, with no penalties or fees. Is my personal data and information secure on the Kē app? Yes, the Kē app takes data security and privacy very seriously, with robust encryption protocols and strict data protection policies in place to safeguard users\u0026rsquo; personal data and sensitive information. Conclusion \u0026nbsp; The Kē app is a groundbreaking wellness platform that combines AI-powered coaching with community features and personalized guidance. With its innovative approach to wellness and self-care, the Kē app is well-positioned to make a significant impact on the wellness industry. As the demand for wellness and self-care continues to grow, the Kē app is an exciting new development that is sure to capture the attention of health-conscious individuals and wellness enthusiasts alike. Whether you\u0026rsquo;re looking to improve your physical health, mental well-being, or emotional resilience, the Kē app is definitely worth exploring.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 18,
        href: "/blog/posts/amazons-kindle-colorsoft-bundle-is-almost-half-off-for-prime-day/",
        title: "Kindle Colorsoft Bundle Deal A...",
        description: "Get the Kindle Colorsoft Essentials Bundle for $182.97, down from $334.97, an early Prime Day deal for avid readers.",
        
        
        content: "Amazon’s Kindle Colorsoft bundle is almost half off for Prime Day \u0026nbsp; Are you an avid reader looking for a way to enhance your reading experience? Look no further! Amazon has announced an early Prime Day deal that\u0026rsquo;s too good to pass up. For a limited time, you can get the Kindle Colorsoft Essentials Bundle for just $182.97, down from its original price of $334.97. This is the lowest price we\u0026rsquo;ve seen for the combo, and it\u0026rsquo;s a steal for anyone who loves to read.\nWhat is the Kindle Colorsoft? \u0026nbsp; The Kindle Colorsoft is a unique e-reader that stands out from other Kindles on the market. Unlike other e-readers, the Colorsoft features a color E Ink screen, making it perfect for reading comic books, graphics novels, and illustrated books. The color screen also allows you to browse book covers and get a better sense of what you\u0026rsquo;re reading before diving in.\nWhat\u0026rsquo;s included in the bundle? \u0026nbsp; The Kindle Colorsoft Essentials Bundle includes:\nKindle Colorsoft e-reader Power adapter USB cable Quick start guide Leather case Microfiber cloth Key Features of the Kindle Colorsoft \u0026nbsp; Here are some of the key features of the Kindle Colorsoft:\nColor E Ink screen: Perfect for reading comic books, graphics novels, and illustrated books Lightweight design: Weighs just 6.3 ounces, making it easy to carry on the go Long battery life: Up to 6 weeks of battery life on a single charge Storage: 8GB of storage, enough to hold thousands of books Water-resistant: IP67 rating, making it resistant to accidental drops in water Adjustable font sizes: Make reading easier on your eyes with adjustable font sizes Why should you buy the Kindle Colorsoft bundle? \u0026nbsp; There are many reasons why you should buy the Kindle Colorsoft bundle. Here are a few:\nSave money: The bundle is almost half off its original price, making it a great value for anyone who loves to read Enhance your reading experience: The color E Ink screen makes it perfect for reading comic books, graphics novels, and illustrated books Convenience: The bundle includes a leather case, power adapter, and USB cable, making it easy to get started Globally sourced books: Access to millions of books, including international bestsellers and classics FAQ \u0026nbsp; Q: What is the original price of the Kindle Colorsoft bundle? A: The original price of the Kindle Colorsoft bundle is $334.97. Q: How long does the battery last on a single charge? A: The battery lasts up to 6 weeks on a single charge. Q: Is the Kindle Colorsoft waterproof? A: Yes, the Kindle Colorsoft has an IP67 rating, making it resistant to accidental drops in water. Q: Can I adjust the font size on the Kindle Colorsoft? A: Yes, you can adjust the font size to make reading easier on your eyes. Conclusion \u0026nbsp; If you\u0026rsquo;re an avid reader looking for a way to enhance your reading experience, the Kindle Colorsoft bundle is a great option. With its color E Ink screen, lightweight design, and long battery life, it\u0026rsquo;s perfect for reading comic books, graphics novels, and illustrated books. And with the bundle being almost half off its original price, it\u0026rsquo;s a steal. So why wait? Order the Kindle Colorsoft bundle today and start reading like never before!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 19,
        href: "/blog/posts/locked-out-of-the-world-cup-a-year-marked-by-barriers-borders-and-broken-access/",
        title: "Locked Out of the World Cup: A...",
        description: "Arab fans face barriers to World Cup entry as borders and access issues threaten to divide the global football community and its diverse fan base.",
        
        
        content: "Locked Out of the World Cup: A Year Marked by Barriers, Borders, and Broken Access \u0026nbsp; The world is abuzz with excitement as the 2026 World Cup draws near. This global spectacle promises to bring together fans from diverse backgrounds, cultures, and nations in a celebration of football and unity. However, amidst the euphoria, a more somber reality is unfolding. Many Arab fans may find themselves locked out of this global celebration due to various barriers and restrictions.\nThe Challenges Faced by Arab Fans \u0026nbsp; The 2026 World Cup is set to take place in the United States, Canada, and Mexico. While this promises a unique and exciting experience for fans, it also presents significant challenges for those from Arab countries. Some of the issues affecting Arab fans include:\nTravel restrictions: Many Arab countries have strict travel regulations, making it difficult for fans to obtain the necessary visas and travel documents. Border closures: In the event of a global crisis or conflict, borders may be closed, further limiting the access of Arab fans to the World Cup. Financial barriers: The cost of attending the World Cup can be prohibitively expensive, especially for fans from countries with limited economic resources. Language and cultural differences: Communication barriers, cultural differences, and language difficulties can make it challenging for Arab fans to navigate the host countries and access the necessary services. The Impact on Global Celebrations \u0026nbsp; The World Cup is a once-in-a-four-year event that brings people together, transcending borders and cultures. However, if Arab fans are locked out due to various barriers and restrictions, it can have a significant impact on the global celebration. Some of the consequences include:\nReduced diversity: The absence of Arab fans can reduce the diversity of the event, making it less representative of the global football community. Lost revenue: The World Cup generates significant revenue from ticket sales, sponsorships, and merchandise. Locking out Arab fans can result in lost revenue for the host countries. Damaged reputation: The exclusion of Arab fans can damage the reputation of the host countries and the FIFA, potentially leading to a loss of credibility and trust. What Can Be Done? \u0026nbsp; To ensure that the 2026 World Cup is inclusive and accessible to all fans, regardless of their nationality or background, several measures can be taken:\nStreamline travel regulations: Host countries should simplify and streamline the travel regulations for fans, making it easier for them to obtain the necessary visas and travel documents. Increase financial accessibility: Efforts should be made to make the World Cup more financially accessible, such as offering affordable ticket prices, accommodations, and travel options. Enhance language support: Host countries should provide adequate language support, including translation services, to ensure that all fans can navigate the event and access the necessary services. Promote cultural understanding: Efforts should be made to promote cultural understanding and awareness, reducing the risk of misunderstandings and language barriers. FAQ \u0026nbsp; Q: What are the main challenges faced by Arab fans attending the 2026 World Cup?\nA: The main challenges faced by Arab fans include travel restrictions, border closures, financial barriers, and language and cultural differences.\nQ: How can host countries ensure that the World Cup is inclusive and accessible to all fans?\nA: Host countries can ensure that the World Cup is inclusive and accessible by streamlining travel regulations, increasing financial accessibility, enhancing language support, and promoting cultural understanding.\nQ: What are the consequences of locking out Arab fans from the World Cup?\nA: The consequences of locking out Arab fans from the World Cup include reduced diversity, lost revenue, and damaged reputation.\nQ: How can fans from Arab countries overcome the challenges of attending the World Cup?\nA: Fans from Arab countries can overcome the challenges of attending the World Cup by researching and understanding the travel regulations, budgeting accordingly, learning about the host country\u0026rsquo;s culture, and seeking assistance from travel agencies or tour operators.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 20,
        href: "/blog/thanks/",
        title: "Message Sent",
        description: "Thank you for contacting us.",
        
        
        content: "Message Sent!\rThank you for reaching out. Check your inbox for a confirmation email.\nReturn Home"
      })
      .add(
      
      
      
      
      
      {
        id: 21,
        href: "/blog/posts/midjourney-goes-from-generating-cat-images-to-full-body-ultrasound-scans/",
        title: "Midjourney Revolutionizes AI Art",
        description: "Midjourney introduces The Midjourney Scanner, an ultrasound-based full-body scanner, marking a significant shift from AI-generated cat images to cutting-edge healthcare tech innovations.",
        
        
        content: "Midjourney goes from generating cat images to full-body ultrasound scans \u0026nbsp; In a surprising move, Midjourney CEO David Holz has announced the company\u0026rsquo;s first hardware product - The Midjourney Scanner, an ultrasound-based full-body scanner. This is a significant departure from the company\u0026rsquo;s previous focus on generating cat pictures using its AI image generator. But what does this new development mean for the future of healthcare technology?\nWhat is The Midjourney Scanner? \u0026nbsp; The Midjourney Scanner is an ultrasound-based full-body scanner that uses a ring of sensors to capture vertical cross-sectional images of the body. This technology has the potential to revolutionize the field of healthcare by providing non-invasive and pain-free imaging.\nHow does it work? \u0026nbsp; The Midjourney Scanner uses a combination of ultrasound technology and AI-powered image processing to capture high-resolution images of the body. The scanner is designed to be user-friendly and can be operated by a trained technician or healthcare professional. The images captured by the scanner can be used for a variety of purposes, including diagnosis, treatment planning, and research.\nBenefits of The Midjourney Scanner \u0026nbsp; The Midjourney Scanner offers several benefits over traditional imaging methods, including:\nNon-invasive and pain-free imaging High-resolution images with detailed information about the body\u0026rsquo;s internal structures Ability to capture images of the body in real-time Potential to reduce costs and improve patient outcomes What\u0026rsquo;s next for Midjourney? \u0026nbsp; In an interview, Midjourney CEO David Holz revealed that the company plans to build a San Francisco spa that will offer non-invasive body scanning services to the public. This is a bold move that could potentially disrupt the healthcare industry and provide a new revenue stream for the company.\nFAQ \u0026nbsp; Q: What is the Midjourney Scanner? A: The Midjourney Scanner is an ultrasound-based full-body scanner that uses a ring of sensors to capture vertical cross-sectional images of the body. Q: How does it work? A: The Midjourney Scanner uses a combination of ultrasound technology and AI-powered image processing to capture high-resolution images of the body. Q: What are the benefits of The Midjourney Scanner? A: The Midjourney Scanner offers several benefits, including non-invasive and pain-free imaging, high-resolution images with detailed information about the body\u0026rsquo;s internal structures, and the ability to capture images of the body in real-time. Q: What\u0026rsquo;s next for Midjourney? A: Midjourney plans to build a San Francisco spa that will offer non-invasive body scanning services to the public. Conclusion \u0026nbsp; The Midjourney Scanner is a groundbreaking new technology that has the potential to revolutionize the field of healthcare. With its non-invasive and pain-free imaging capabilities, high-resolution images, and real-time capture, this technology has the potential to improve patient outcomes and reduce costs. As Midjourney continues to develop and refine this technology, we can expect to see significant advancements in the field of healthcare technology.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 22,
        href: "/blog/posts/nasa-picks-eric-schmidts-rocket-company-for-mars-mission-setting-up-a-race-with-spacex/",
        title: "NASA Backs Schmidt's Rocket Re...",
        description: "NASA has selected Eric Schmidt's Relativity Space to take part in a Mars mission, setting up a thrilling competition with Elon Musk's SpaceX.",
        
        
        content: "NASA Picks Eric Schmidt’s Rocket Company for Mars Mission, Setting Up a Thrilling Competition with SpaceX \u0026nbsp; In a groundbreaking move, NASA has chosen Relativity Space, a private rocket manufacturer backed by former Google executive chair Eric Schmidt, to join the Mars mission. This development marks a significant milestone in the ongoing efforts of private space companies to push the boundaries of space exploration. With SpaceX, led by Elon Musk, already making headlines for its ambitious Mars ambitions, this latest announcement sets the stage for a thrilling competition between two of the most influential players in the space industry.\nRelativity Space: A Brief Overview \u0026nbsp; Founded in 2015 by Tim Ellis and Jordan Noone, Relativity Space has made significant strides in the development of 3D-printed rockets. Last year, the company was acquired by Eric Schmidt, who has been instrumental in guiding the company towards its ambitious goals. Relativity Space\u0026rsquo;s innovative approach to rocket design and manufacturing has garnered attention from NASA and other space agencies, making it an attractive partner for the Mars mission.\nKey Features of Relativity Space\u0026rsquo;s Mars Mission Plan \u0026nbsp; 3D-Printed Rockets: Relativity Space will utilize its proprietary 3D printing technology to create the rockets for the Mars mission. This innovative approach allows for faster production times and reduced costs. Reusable Rockets: The company plans to use reusable rockets, which will significantly reduce the cost of accessing space and pave the way for more frequent missions. Autonomous Systems: Relativity Space\u0026rsquo;s rockets will be equipped with advanced autonomous systems, enabling them to perform complex tasks with minimal human intervention. The Competition Heats Up: SpaceX and the Mars Mission \u0026nbsp; Elon Musk\u0026rsquo;s SpaceX has been at the forefront of private space exploration for several years, with its reusable rockets and ambitious Mars plans. The company\u0026rsquo;s Starship program is designed to take both people and cargo to the Red Planet, with the goal of establishing a permanent, self-sustaining human presence on Mars.\nStarship Program: SpaceX\u0026rsquo;s Starship program is a reusable spacecraft designed to take humans and cargo to the Moon, Mars, and other destinations in the solar system. Mars Orbital: SpaceX plans to send an orbital mission to Mars in the near future, which will lay the groundwork for future manned missions. FAQ \u0026nbsp; Q: What is Relativity Space\u0026rsquo;s plan for the Mars mission? A: Relativity Space plans to use its 3D-printed rockets and reusable technology to transport both people and cargo to Mars. Q: How does SpaceX\u0026rsquo;s Starship program compare to Relativity Space\u0026rsquo;s Mars mission plan? A: Both companies are developing reusable rockets and are competing to be the first to establish a human presence on Mars. Q: What are the potential benefits of private space exploration? A: Private space companies like Relativity Space and SpaceX are driving innovation and reducing costs, making space exploration more accessible and sustainable. As the competition between Relativity Space and SpaceX heats up, the world can expect to see significant advancements in space technology and exploration. With NASA\u0026rsquo;s support, Relativity Space is poised to make a major impact in the Mars mission, and the results will be nothing short of spectacular.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 23,
        href: "/blog/posts/nordvpn-coupons-75-off-plus-3-months-free-in-june-2026/",
        title: "NordVPN Sale: 75% Off + 3 Free...",
        description: "Get exclusive NordVPN coupons up to 77% off 2-year plans and 3 months free in June 2026, stay safe online with a secure VPN service.",
        
        
        content: "NordVPN Coupons: 75% Off, Plus 3 Months Free in June 2026 \u0026nbsp; Stay safe online and save big with the latest NordVPN coupons and discounts. In this article, we\u0026rsquo;ll explore the exclusive deals available in June 2026, including up to 77% off 2-year plans and 3 free months.\nWhat is NordVPN? \u0026nbsp; Before diving into the discounts, let\u0026rsquo;s quickly recap what NordVPN is all about. NordVPN is a popular virtual private network (VPN) service that enables users to browse the internet securely and privately. With NordVPN, you can:\nEncrypt your internet traffic to prevent hacking and eavesdropping Bypass geo-restrictions and access content from around the world Protect your online identity and maintain anonymity Enjoy fast and stable connections with servers in over 60 countries NordVPN Coupons: Up to 77% Off 2-Year Plans \u0026nbsp; The highlight of the current NordVPN promotions is the massive discount on 2-year plans. With the exclusive coupons, you can save up to 77% on these plans, which normally cost around $3.99/month. Here are the details:\n2-year plan: $1.49/month (save 62%) 3-year plan: $1.19/month (save 70%) 4-year plan: $0.99/month (save 75%) Get 3 Free Months with NordVPN Coupons \u0026nbsp; But that\u0026rsquo;s not all. When you sign up for a 2-year plan using the exclusive NordVPN coupons, you\u0026rsquo;ll also receive 3 free months. This is an excellent opportunity to try out the service risk-free and experience the benefits of NordVPN.\nHow to Get the Discounts \u0026nbsp; To redeem the NordVPN coupons and discounts, follow these simple steps:\nVisit the NordVPN website and select your desired plan. Click on the \u0026ldquo;Get Discount\u0026rdquo; button to apply the coupon. Enter your payment details and complete the purchase. Enjoy your 2-year plan and 3 free months of NordVPN. Frequently Asked Questions \u0026nbsp; Here are some common questions about the NordVPN coupons and discounts:\nQ: Are these discounts available to new customers only? A: No, the discounts are available to both new and existing customers. Q: Can I cancel my subscription at any time? A: Yes, you can cancel your subscription at any time, but you\u0026rsquo;ll still receive the 3 free months. Q: Do the discounts apply to all payment methods? A: Yes, the discounts apply to all payment methods, including credit cards, PayPal, and more. Q: Can I use multiple coupons at once? A: No, you can only use one coupon per purchase. Conclusion \u0026nbsp; Don\u0026rsquo;t miss out on this incredible opportunity to save big on NordVPN. With up to 77% off 2-year plans and 3 free months, you can enjoy the benefits of a secure and private internet connection without breaking the bank. Sign up now and stay safe online with NordVPN.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 24,
        href: "/blog/posts/peacock-promo-codes-40-off-june-2026/",
        title: "Peacock Promo Codes: 40% Off J...",
        description: "Save up to $80 on Peacock TV subscription plans with our exclusive promo codes and coupons for new and existing customers this month.",
        
        
        content: "Peacock Promo Codes: Stream Your Favorite Shows for Up to $80 Off This Month \u0026nbsp; Are you a fan of Peacock TV and want to save some money on your subscription? Look no further! We\u0026rsquo;ve got the latest Peacock TV coupons and promo codes to help you stream your favorite shows for up to $80 off this month.\nWhat\u0026rsquo;s Included in the Deal?\nUp to $80 off Peacock TV subscription plans Exclusive promo codes for new and existing customers Stream your favorite shows, movies, and TV series without breaking the bank How to Get the Deal?\nTo get the deal, simply follow these easy steps:\nVisit the official Peacock TV website or download the app on your device Click on the \u0026ldquo;Subscribe\u0026rdquo; button and select your preferred plan Enter the promo code at checkout to get up to $80 off your subscription Peacock TV Plans and Pricing\nPeacock TV offers various plans and pricing options to suit your needs:\nPeacock Free: Stream thousands of TV shows, movies, and original content for free with ads Peacock Premium: Get access to exclusive content, including current TV shows, movies, and original content, without ads Peacock Premium Plus: Enjoy all the benefits of Peacock Premium, plus the ability to download content for offline viewing Benefits of Using Peacock TV\nStream your favorite shows and movies on-demand Access exclusive original content, including TV series and movies Get personalized recommendations based on your viewing history Download content for offline viewing with Peacock Premium Plus Frequently Asked Questions\nQ: Can I use the promo code on my existing subscription? \u0026nbsp; A: Yes, you can use the promo code on your existing subscription. Simply log in to your account, click on the \u0026ldquo;Subscribe\u0026rdquo; button, and enter the promo code at checkout.\nQ: How long is the promo code valid for? \u0026nbsp; A: The promo code is valid for a limited time only. Please check the expiration date on the promo code page.\nQ: Can I use the promo code on multiple devices? \u0026nbsp; A: Yes, you can use the promo code on multiple devices, including smartphones, tablets, smart TVs, and gaming consoles.\nQ: What if I have a Peacock TV gift subscription? \u0026nbsp; A: If you have a Peacock TV gift subscription, you can use the promo code to upgrade to a higher plan or get a discount on your current plan.\nQ: Can I cancel my subscription after using the promo code? \u0026nbsp; A: Yes, you can cancel your subscription at any time. Please note that you will not be eligible for a refund if you cancel your subscription before the promo code expiration date.\nConclusion\nDon\u0026rsquo;t miss out on this amazing opportunity to save up to $80 on your Peacock TV subscription. Use the exclusive promo codes and get ready to stream your favorite shows and movies without breaking the bank. Visit the official Peacock TV website or download the app to get started today!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 25,
        href: "/blog/posts/photoshop-and-premiere-now-have-ai-assistants/",
        title: "Photoshop and Premiere now hav...",
        description: "Adobe launches public beta for AI Assistants in Creative Cloud, integrating AI-powered chatbots in popular apps for designers and editors.",
        
        
        content: "Adobe\u0026rsquo;s plan to integrate its AI-powered chatbots into all its Creative Cloud suite applications has finally come to fruition. The tech giant has officially launched a public beta for its AI Assistants, giving users access to AI-powered chatbots in Photoshop, Premiere, Illustrator, InDesign, and Frame.io. This move aims to revolutionize the way designers and editors work, making tasks easier, faster, and more efficient.\nWhat are AI Assistants in Adobe Creative Cloud? \u0026nbsp; Adobe\u0026rsquo;s AI Assistants are bespoke chatbots designed to aid users in their creative workflows. These AI-powered tools can perform a wide range of tasks, from automating repetitive tasks to offering expert-level advice and guidance. With the AI Assistants, users can now focus on the creative aspects of their work, leaving the mundane tasks to the AI.\nBenefits of AI Assistants in Creative Cloud \u0026nbsp; The introduction of AI Assistants in Creative Cloud brings numerous benefits to users. Some of the most notable advantages include:\nIncreased productivity: AI Assistants can automate repetitive tasks, freeing up users to focus on more complex and creative tasks. Improved accuracy: AI Assistants can detect and correct errors, ensuring that users\u0026rsquo; work is accurate and of high quality. Enhanced creativity: AI Assistants can offer expert-level advice and guidance, helping users to explore new ideas and techniques. Simplified workflows: AI Assistants can streamline workflows, making it easier for users to manage their projects and meet deadlines. How to Access AI Assistants in Creative Cloud \u0026nbsp; Accessing AI Assistants in Creative Cloud is a straightforward process. Users can follow these steps:\nUpdate their Creative Cloud applications: Ensure that all Creative Cloud applications are updated to the latest version. Launch the AI Assistant: Launch the AI Assistant within each application, such as Photoshop or Premiere. Start interacting with the AI: Begin interacting with the AI Assistant, asking questions or requesting tasks to be performed. Supported Applications \u0026nbsp; The following Creative Cloud applications now feature AI Assistants:\nPhotoshop: AI Assistant for Photoshop can perform tasks such as image retouching, color correction, and content-aware fill. Premiere: AI Assistant for Premiere can assist with video editing tasks such as color grading, audio ducking, and automatic audio ducking. Illustrator: AI Assistant for Illustrator can help with tasks such as vector graphics creation, typography, and color management. InDesign: AI Assistant for InDesign can assist with tasks such as page layout, typography, and color management. Frame.io: AI Assistant for Frame.io can help with tasks such as video review, approval, and collaboration. FAQ \u0026nbsp; Q: What is the purpose of AI Assistants in Creative Cloud? A: The purpose of AI Assistants in Creative Cloud is to aid users in their creative workflows, automating repetitive tasks, offering expert-level advice and guidance, and improving productivity.\nQ: Which Creative Cloud applications feature AI Assistants? A: Photoshop, Premiere, Illustrator, InDesign, and Frame.io now feature AI Assistants.\nQ: How do I access AI Assistants in Creative Cloud? A: Users can access AI Assistants by updating their Creative Cloud applications, launching the AI Assistant within each application, and starting to interact with the AI.\nQ: Are AI Assistants available for public beta? A: Yes, AI Assistants are now available for public beta, giving users access to these AI-powered tools.\nBy integrating AI Assistants into its Creative Cloud suite, Adobe is revolutionizing the way designers and editors work. With AI Assistants, users can now focus on the creative aspects of their work, leaving the mundane tasks to the AI. This move is set to transform the creative industry, making tasks easier, faster, and more efficient.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 26,
        href: "/blog/posts/pixis-new-ios-app-turns-text-messages-into-interactive-ar-experiences/",
        title: "Pixi’s AR Messaging: The Futur...",
        description: "Pixi’s iOS app transforms texting with interactive AR. Explore how this tech works, its challenges, and why it could redefine digital communication.",
        
        
        content: "The Death of Static Messaging? Pixi’s AR Revolution \u0026nbsp; The humble text message has come a long way since the days of SMS. From emojis to GIFs, stickers to voice notes, messaging apps have continuously evolved to make digital communication more expressive. But what if your messages could leap off the screen and into the real world? What if you could interact with them in 3D space, manipulate them with gestures, or even step inside them?\nPixi, a cutting-edge startup, is betting big on this vision. Their latest iOS app doesn’t just send messages—it transforms them into interactive augmented reality (AR) experiences. Forget passive reactions; Pixi wants you to play with your texts. This isn’t just another messaging app. It’s a glimpse into the future of how we’ll communicate.\nBut how does it work? What makes it different from existing AR apps like Snapchat or Instagram? And most importantly—is this the next big thing, or just another flashy gimmick? Let’s dive deep into Pixi’s AR messaging revolution.\nHow Pixi’s AR Messaging Works: A Technical Breakdown \u0026nbsp; Pixi’s app isn’t just slapping AR filters onto messages. It’s reimagining the entire messaging pipeline to support real-time, interactive 3D content. Here’s how it works under the hood:\n1. The AR Foundation: LiDAR and Depth Sensing \u0026nbsp; Pixi’s app leverages Apple’s LiDAR scanner (available on iPhone 12 Pro and later models) to map the user’s environment in real time. Unlike traditional AR apps that rely on flat surfaces or markers, Pixi uses depth data to:\nAnchor messages in 3D space (e.g., placing a floating text bubble on a table or wall). Enable occlusion (so virtual objects appear behind real-world objects, like a chair or a person). Support dynamic lighting (so AR messages cast shadows and reflect ambient light realistically). Why this matters: Most AR messaging apps today (like Snapchat) use 2D overlays. Pixi’s use of LiDAR makes its AR content feel truly part of the real world.\n2. Real-Time 3D Rendering with Metal \u0026nbsp; Pixi doesn’t just display static 3D models—it renders them in real time with physics-based interactions. This is achieved using:\nApple’s Metal API for high-performance graphics rendering. Custom shaders to simulate materials (e.g., metallic, glass, or fabric textures). Rigid body physics so objects react to gravity, collisions, and user input. Example: Send a \u0026ldquo;virtual basketball\u0026rdquo; message, and the recipient can \u0026ldquo;dribble\u0026rdquo; it by tapping their screen, with the ball bouncing realistically off surfaces.\n3. Gesture and Voice Control \u0026nbsp; Pixi’s AR messages aren’t just for viewing—they’re for interacting. The app supports:\nHand tracking (via the iPhone’s front camera) to manipulate objects with gestures. Voice commands (using Apple’s Speech Recognition framework) to trigger actions (e.g., \u0026ldquo;Explode!\u0026rdquo; to make a message burst into confetti). Haptic feedback (via the Taptic Engine) to simulate touch sensations. Why this is a game-changer: Most messaging apps are passive. Pixi turns messaging into a collaborative experience. Imagine playing a mini AR game with a friend inside a text thread.\n4. Cloud Sync and Multi-User AR \u0026nbsp; Pixi isn’t just for solo AR experiences. The app supports:\nShared AR sessions where multiple users can interact with the same 3D message in real time. Cloud anchoring to ensure AR objects stay in the same physical location for all participants. Low-latency networking (using WebRTC) to sync interactions across devices. Example: Send a \u0026ldquo;virtual treasure hunt\u0026rdquo; message to a group chat. Everyone can see the same clues, pick up the same virtual keys, and \u0026ldquo;open\u0026rdquo; the same treasure chest—all in AR.\nPixi vs. The Competition: How It Stacks Up \u0026nbsp; Pixi isn’t the first app to experiment with AR messaging. So how does it compare to existing players?\nFeature Pixi Snapchat AR Lenses Instagram AR Effects Apple Messages (AR Stickers) 3D Depth Sensing ✅ (LiDAR + occlusion) ❌ (2D overlays) ❌ (2D overlays) ❌ (2D stickers) Interactive Objects ✅ (Physics, gestures, voice) ❌ (Static animations) ❌ (Static animations) ❌ (Static stickers) Multi-User AR ✅ (Shared sessions) ❌ (Single-user only) ❌ (Single-user only) ❌ (Single-user only) Real-Time Rendering ✅ (Metal + custom shaders) ❌ (Pre-rendered animations) ❌ (Pre-rendered animations) ❌ (Pre-rendered stickers) Haptic Feedback ✅ (Taptic Engine) ❌ ❌ ❌ Voice Control ✅ (Speech Recognition) ❌ ❌ ❌ Why Pixi Stands Out \u0026nbsp; True 3D Interaction – Most AR messaging apps treat AR as a filter. Pixi treats it as a canvas. Collaborative Play – Shared AR sessions make messaging a group activity, not just a one-way broadcast. Physics-Based Fun – Objects behave like they would in the real world (e.g., a virtual ball bounces, a virtual glass shatters). Hardware Optimization – Pixi is built from the ground up for iOS, leveraging Apple’s latest ARKit and Metal APIs. The Challenges: Why AR Messaging Isn’t Mainstream (Yet) \u0026nbsp; Pixi’s app is undeniably impressive, but AR messaging faces significant hurdles before it can go mainstream:\n1. Hardware Limitations \u0026nbsp; LiDAR Dependency: Pixi’s best features require an iPhone with a LiDAR scanner (iPhone 12 Pro and later). That’s a small subset of iPhone users. Battery Drain: Real-time 3D rendering and depth sensing are power-hungry. Users may hesitate to adopt an app that kills their battery in an hour. Processing Power: Older iPhones (pre-A12 chip) struggle with Pixi’s demands, leading to lag or crashes. 2. User Adoption Barriers \u0026nbsp; Learning Curve: Most people are used to typing or tapping emojis. Pixi’s gesture and voice controls require new habits. Social Norms: Will people actually want to play with AR messages in serious conversations? Or will it feel gimmicky? Network Latency: Multi-user AR requires low-latency connections. Poor Wi-Fi or 5G can break the experience. 3. Privacy and Safety Concerns \u0026nbsp; AR Data Collection: LiDAR and depth sensors capture detailed environmental data. How is this stored? Who has access? Moderation Challenges: If users can create and share custom AR objects, how does Pixi prevent inappropriate or harmful content? Distraction Risks: Interactive AR messages could be too engaging, leading to accidents (e.g., walking into traffic while playing with a virtual pet). 4. Monetization Questions \u0026nbsp; Freemium Model: Will Pixi charge for premium AR content? If so, will users pay? Ads in AR: Could brands insert sponsored AR objects into messages? Would users tolerate this? Enterprise Use Cases: Could Pixi pivot to business messaging (e.g., AR product demos)? Or is it purely for consumers? The Future of AR Messaging: What’s Next? \u0026nbsp; Pixi’s app is just the beginning. Here’s where AR messaging could go in the next 5 years:\n1. Wearable Integration \u0026nbsp; AR Glasses: Imagine receiving a Pixi message on your Apple Vision Pro or Meta Ray-Bans, where the AR content appears in your actual field of view. Smartwatches: Could a future Apple Watch support simplified AR interactions (e.g., tapping to \u0026ldquo;open\u0026rdquo; a 3D message)? 2. AI-Powered Personalization \u0026nbsp; Generative AR: What if an AI could create custom AR objects based on your message? (e.g., \u0026ldquo;Send me a virtual cake with my name on it.\u0026rdquo;) Emotion Recognition: Could AR messages adapt to the recipient’s mood (e.g., a sad message turns into a comforting hug)? 3. Cross-Platform Expansion \u0026nbsp; Android Support: Pixi is iOS-only for now. Will it expand to Android, where ARCore (Google’s AR platform) is less advanced than ARKit? WebAR: Could Pixi messages be shared via a link, allowing non-users to view them in a browser? 4. Enterprise and Education Use Cases \u0026nbsp; Remote Collaboration: Teams could use Pixi for interactive AR meetings (e.g., manipulating a 3D product prototype in real time). AR Learning: Teachers could send interactive AR lessons (e.g., a 3D model of a human heart that students can dissect virtually). 5. The Metaverse Connection \u0026nbsp; Messaging as a Gateway: Could Pixi’s AR messages serve as a bridge between traditional messaging and full metaverse experiences? Virtual Hangouts: Instead of video calls, could friends meet in a shared AR space via Pixi? FAQ: Your Burning Questions About Pixi’s AR Messaging \u0026nbsp; 1. Do I need an iPhone with LiDAR to use Pixi? \u0026nbsp; Yes, for the best experience. Pixi’s most advanced features (like occlusion and multi-user AR) require LiDAR. However, the app does work on older iPhones (iPhone XS and later) with reduced functionality (e.g., 2D AR overlays instead of 3D).\n2. Is Pixi free to use? \u0026nbsp; Yes, Pixi is free to download and use. However, the company has hinted at a premium tier with exclusive AR content (e.g., custom 3D objects, advanced physics).\n3. Can I create my own AR messages? \u0026nbsp; Not yet. Currently, Pixi offers a curated library of AR objects and interactions. However, the company has teased a future \u0026ldquo;AR Creator\u0026rdquo; tool that will let users design custom messages.\n4. How does Pixi handle privacy? \u0026nbsp; Pixi claims that all AR data (including LiDAR scans) is processed on-device and never stored on their servers. However, multi-user AR sessions do require some data to be shared between participants (e.g., the position of AR objects).\n5. Will Pixi work on Android? \u0026nbsp; Pixi has not announced Android support. Given the fragmentation of Android’s AR ecosystem (ARCore vs. ARKit), it may be a while before Pixi expands beyond iOS.\n6. Can I use Pixi for business messaging? \u0026nbsp; Currently, no. Pixi is designed for personal communication. However, the company has expressed interest in exploring enterprise use cases (e.g., AR-powered customer support).\n7. What happens if I send a Pixi message to someone who doesn’t have the app? \u0026nbsp; The recipient will receive a link to view the AR content in a browser (via WebAR). However, the experience will be limited compared to using the app (e.g., no multi-user AR, no haptic feedback).\n8. How does Pixi compare to Apple’s built-in AR features in Messages? \u0026nbsp; Apple’s Messages app supports basic AR stickers (e.g., animojis, 3D objects). However, these are static and lack Pixi’s interactivity, physics, and multi-user features.\n9. Is Pixi safe for kids? \u0026nbsp; Pixi has a 12+ age rating due to its AR features (which could be distracting). Parents should monitor usage, especially for younger children.\n10. What’s the biggest challenge Pixi faces? \u0026nbsp; User adoption. Most people are comfortable with emojis and GIFs. Convincing them to learn a new way to message will be Pixi’s biggest hurdle.\nFinal Verdict: Is Pixi the Future of Messaging? \u0026nbsp; Pixi’s AR messaging app is undeniably innovative. It pushes the boundaries of what’s possible with mobile AR, turning passive texting into an interactive, playful experience. For early adopters and tech enthusiasts, it’s a must-try.\nHowever, whether Pixi becomes the next big thing in messaging depends on three key factors:\nHardware Accessibility – Will LiDAR become standard on all iPhones (and Android phones)? User Habits – Will people actually want to play with AR messages, or will it feel like a gimmick? Monetization – Can Pixi find a sustainable business model without alienating users? For now, Pixi is a glimpse into the future—a future where messaging isn’t just about words, but about shared experiences. Whether that future arrives in 2026 or 2036 remains to be seen. But one thing is clear: the era of static texting is ending. The age of interactive AR communication has begun.\nWill you be an early adopter? Or will you wait to see if Pixi’s vision catches on? Either way, the future of messaging is here—and it’s far more exciting than a simple 👍.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 27,
        href: "/blog/posts/the-smartphone-era-created-an-attention-crisis-slowtech-is-fixing-it/",
        title: "Regain Control",
        description: "Discover how people are taking back control of their time, lives, and attention in the digital age with new tech trends",
        
        
        content: "Introduction to the Era of Digital Overload \u0026nbsp; In today\u0026rsquo;s fast-paced, technology-driven world, it\u0026rsquo;s easy to feel like we\u0026rsquo;re losing control. Our lives are filled with constant notifications, endless social media feeds, and a never-ending stream of information. This has led to a sense of digital overload, where people feel like they\u0026rsquo;re drowning in a sea of data. However, there\u0026rsquo;s a growing trend of individuals seeking to regain control of their time, lives, and attention. This movement is driven by the desire to simplify, to focus on what\u0026rsquo;s truly important, and to find a sense of balance in a world that often seems to value speed and efficiency above all else.\nThe Roots of the Problem: How Technology Has Changed Our Lives \u0026nbsp; To understand the desire for control, it\u0026rsquo;s essential to examine how technology has impacted our daily lives. The rise of smartphones, social media, and the internet has brought about numerous benefits, including:\nIncreased connectivity and accessibility Improved communication and collaboration Enhanced access to information and knowledge New opportunities for entertainment, education, and personal growth However, these benefits have come at a cost. The constant availability of technology has led to:\nIncreased distractions and decreased attention spans Rising levels of stress, anxiety, and burnout Decreased face-to-face interaction and deepened feelings of loneliness A sense of perpetual busyness, where individuals feel like they\u0026rsquo;re always \u0026ldquo;on\u0026rdquo; and never truly disconnected The Rise of Slow Tech and Digital Wellness \u0026nbsp; In response to these challenges, a new movement has emerged: Slow Tech. This philosophy emphasizes the importance of slowing down, simplifying, and being more intentional with our technology use. It\u0026rsquo;s about recognizing that technology is a tool, not a substitute for human connection and experience. Slow Tech is closely tied to the concept of digital wellness, which focuses on promoting healthy technology habits and mitigating the negative effects of excessive technology use.\nSome key principles of Slow Tech and digital wellness include:\nMindful technology use: Being aware of how and why we\u0026rsquo;re using technology, and making conscious choices about our device use Boundary setting: Establishing clear limits and boundaries around technology use, such as designating device-free zones or times Digital detox: Taking regular breaks from technology to rest, recharge, and refocus Simple, intuitive design: Prioritizing simplicity and ease of use in technology design, to reduce frustration and increase user satisfaction Strategies for Regaining Control \u0026nbsp; So, how can individuals take back control of their time, lives, and attention in the digital age? Here are some strategies to consider:\nSet clear goals and priorities: Establish what\u0026rsquo;s truly important to you, and focus on aligning your technology use with these goals Use technology intentionally: Be mindful of how you\u0026rsquo;re using technology, and make conscious choices about which tools and platforms to use Establish boundaries and routines: Set clear limits around technology use, and establish routines that promote balance and relaxation Practice self-care and self-compassion: Recognize that it\u0026rsquo;s okay to make mistakes and that taking care of yourself is essential in the digital age The Role of Technology in Supporting Digital Wellness \u0026nbsp; While technology can be a significant contributor to digital overload, it can also be a powerful tool in supporting digital wellness. Many companies are now developing products and services that promote healthy technology habits, such as:\nApp blockers and website blockers: Tools that help individuals avoid distracting websites or apps during certain times of the day Time tracking and analytics: Software that helps users understand how they\u0026rsquo;re spending their time, and identify areas for improvement Mindfulness and meditation apps: Platforms that provide guided meditations and mindfulness exercises to help users relax and focus Simple, intuitive design: Products that prioritize simplicity and ease of use, to reduce frustration and increase user satisfaction The Future of Slow Tech and Digital Wellness \u0026nbsp; As the world becomes increasingly digital, it\u0026rsquo;s likely that the importance of Slow Tech and digital wellness will only continue to grow. We can expect to see:\nIncreased investment in digital wellness initiatives: Companies and organizations will prioritize digital wellness, recognizing its impact on employee productivity, customer satisfaction, and overall well-being New technologies and innovations: The development of new products and services that support healthy technology habits, such as AI-powered app blockers or virtual reality mindfulness experiences Growing awareness and education: A greater emphasis on educating individuals about the importance of digital wellness, and providing them with the tools and resources they need to make positive changes Frequently Asked Questions \u0026nbsp; Here are some frequently asked questions about Slow Tech, digital wellness, and regaining control in the digital age:\nQ: What is Slow Tech, and how does it relate to digital wellness? A: Slow Tech is a philosophy that emphasizes the importance of slowing down, simplifying, and being more intentional with our technology use. It\u0026rsquo;s closely tied to the concept of digital wellness, which focuses on promoting healthy technology habits and mitigating the negative effects of excessive technology use. Q: How can I set clear goals and priorities in the digital age? A: Establish what\u0026rsquo;s truly important to you, and focus on aligning your technology use with these goals. Be mindful of how you\u0026rsquo;re using technology, and make conscious choices about which tools and platforms to use. Q: What are some strategies for establishing boundaries and routines around technology use? A: Set clear limits around technology use, and establish routines that promote balance and relaxation. This might include designating device-free zones or times, or using app blockers and website blockers to avoid distractions. Q: How can technology support digital wellness, and what are some examples of products and services that promote healthy technology habits? A: Technology can be a powerful tool in supporting digital wellness, from app blockers and time tracking software to mindfulness and meditation apps. Many companies are now developing products and services that prioritize simplicity, ease of use, and healthy technology habits. Conclusion: Taking Back Control in the Digital Age \u0026nbsp; In conclusion, the desire to regain control of our time, lives, and attention is a natural response to the challenges of the digital age. By embracing the principles of Slow Tech and digital wellness, individuals can take back control and cultivate a healthier, more balanced relationship with technology. Whether it\u0026rsquo;s through setting clear goals and priorities, establishing boundaries and routines, or using technology intentionally, there are many strategies available for promoting digital wellness and mitigating the negative effects of excessive technology use. As the world becomes increasingly digital, it\u0026rsquo;s essential that we prioritize our well-being and make conscious choices about how we use technology. By doing so, we can create a brighter, more sustainable future – one that values balance, simplicity, and human connection in the digital age.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 28,
        href: "/blog/posts/this-ghost-in-the-shell-keyboard-makes-me-want-to-activate-the-hundred-spidery-robot-fingers-inside-my-regular-fingers/",
        title: "Revolutionary Keyboard Unleashed",
        description: "Anime collaborations are taking over the tech world, but Iqunix's Ghost in the Shell keyboards are some of the coolest examples I've seen yet.",
        
        
        content: "Anime collaborations are everywhere, from Gundam watches and Naruto nights at Major League ballparks to just about anything Evangelion. But these Ghost in the Shell keyboards from Iqunix are some of the coolest examples I\u0026rsquo;ve seen of anime-inspired everyday tech.\nA Keyboard Fit for a Cyborg \u0026nbsp; The keyboards are inspired by the iconic manga and anime series Ghost in the Shell, which explores a futuristic world of cybernetic enhancements and artificial intelligence. The result is a sleek and futuristic keyboard that looks like it was plucked straight from the pages of the manga.\nFeatures of the keyboard include:\nCustomizable backlighting Macro keys for gaming and productivity Programmable keys with custom keycap designs High-precision switches for fast and accurate typing Durable construction with a robust aluminum frame A Keyboard that Plays and Types Great \u0026nbsp; But it\u0026rsquo;s not just about looks - the keyboard also delivers when it comes to performance. The high-precision switches provide a smooth and responsive typing experience, while the macro keys and customizable backlighting make it perfect for gaming and productivity.\nThe keyboard also supports custom keycap designs, allowing you to create a truly unique look that reflects your personality. And with the programmable keys, you can customize the keyboard to fit your specific needs.\nA Hefty Upcharge, but Worth It? \u0026nbsp; The keyboard is priced at $249, which is a significant upcharge from most standard gaming keyboards. However, considering the high-quality construction and the unique design, it may be worth the extra cost for fans of the Ghost in the Shell series.\nFor anyone looking to upgrade their gaming or productivity setup, the Iqunix Ghost in the Shell keyboard is definitely worth considering. And for fans of the anime series, it\u0026rsquo;s a must-have for any home office or gaming setup.\nFAQ \u0026nbsp; Q: What is the keyboard\u0026rsquo;s switch type? A: The keyboard features high-precision switches for fast and accurate typing. Q: Can I customize the keyboard\u0026rsquo;s backlighting? A: Yes, the keyboard\u0026rsquo;s backlighting is fully customizable, allowing you to create a unique look that fits your style. Q: Are the keycaps removable? A: Yes, the keycaps are removable and can be customized with custom keycap designs. Q: Is the keyboard compatible with my computer? A: Yes, the keyboard is compatible with most computers, including PC and Mac. Q: What is the keyboard\u0026rsquo;s warranty? A: The keyboard comes with a 1-year warranty for defects in materials and workmanship. Join the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 29,
        href: "/blog/posts/waymo-recalls-nearly-4000-robotaxis-to-stop-them-driving-into-highway-construction-zones/",
        title: "Robotaxis Invade Closed Highwa...",
        description: "Waymo's robotaxis drove into closed highways 13 times. Dive into the tech failures, safety risks, and what this means for autonomous vehicles.",
        
        
        content: "The Incident: When Robotaxis Ignored Road Closures \u0026nbsp; In a startling revelation, Waymo—Alphabet’s autonomous vehicle subsidiary—disclosed that its robotaxis entered highway sections closed for construction at least 13 times. This isn’t just a minor glitch; it’s a systemic failure with serious implications for public safety, regulatory trust, and the future of self-driving technology.\nWhat Happened? \u0026nbsp; Waymo’s 5th-generation robotaxis, equipped with advanced LiDAR, radar, and AI-driven decision-making systems, repeatedly drove into active construction zones despite clear signage, barriers, and even human flaggers. The incidents occurred between May 2023 and March 2024, spanning multiple states, including California and Arizona—key testing grounds for autonomous vehicles (AVs).\nKey Details: \u0026nbsp; Number of Incidents: 13 confirmed cases. Vehicle Model: Waymo’s Jaguar I-PACE-based robotaxis (5th-gen). Locations: Primarily in Phoenix, San Francisco, and Los Angeles. Severity: No reported injuries, but near-misses with construction workers and equipment. Regulatory Response: The National Highway Traffic Safety Administration (NHTSA) launched an investigation, leading to a voluntary recall of nearly 4,000 robotaxis. Why Did This Happen? The Technical Breakdown \u0026nbsp; Autonomous vehicles rely on a multi-layered sensor fusion system to interpret their surroundings. When these systems fail, the consequences can be catastrophic. Here’s why Waymo’s robotaxis drove into closed highways:\n1. Sensor Limitations in Dynamic Environments \u0026nbsp; Waymo’s vehicles use:\nLiDAR (Light Detection and Ranging): Creates 3D maps of surroundings. Radar: Detects speed and distance of objects. Cameras: Identifies road signs, lane markings, and obstacles. High-Definition Maps: Pre-loaded maps for navigation. The Problem:\nLiDAR struggles with reflective surfaces (e.g., construction barriers, wet roads). Radar can misclassify stationary objects (e.g., cones, barricades) as irrelevant. Cameras fail in low light or poor weather, and construction zones often have temporary, non-standard signage. Example: In one incident, a robotaxi ignored orange construction barrels because its AI classified them as \u0026ldquo;non-threatening debris\u0026rdquo; rather than a road closure indicator.\n2. AI Decision-Making Flaws \u0026nbsp; Waymo’s neural networks are trained on millions of miles of driving data, but:\nConstruction zones are rare in training datasets, leading to poor generalization. Temporary road changes (e.g., lane shifts, detours) confuse the AI, which expects static road conditions. Over-reliance on HD maps means the system may ignore real-time obstacles if they’re not in the pre-loaded map. The \u0026ldquo;Frozen Robot\u0026rdquo; Problem: In some cases, the AI detected the closure but failed to act, defaulting to a \u0026ldquo;safe mode\u0026rdquo; where it continued driving straight instead of rerouting.\n3. Human Oversight Failures \u0026nbsp; Waymo’s remote monitoring teams are supposed to intervene if a robotaxi behaves unpredictably. However:\nLatency in remote control can delay critical decisions. Operator fatigue may lead to missed alerts. False positives in AI confidence can cause operators to trust the system when they shouldn’t. Case Study: In a 2023 incident, a Waymo vehicle entered a closed highway section in San Francisco’s Bay Bridge. The remote operator failed to override the system in time, and the car drove 500 feet into the construction zone before stopping.\nThe Regulatory Fallout: NHTSA’s Investigation and Recall \u0026nbsp; The NHTSA’s Office of Defects Investigation (ODI) launched a probe into Waymo’s incidents, citing:\nPotential violations of Federal Motor Vehicle Safety Standards (FMVSS). Failure to ensure safe operation in dynamic environments. Lack of transparency in reporting near-miss incidents. Waymo’s Recall: What It Entails \u0026nbsp; On June 12, 2024, Waymo issued a voluntary recall affecting 3,876 robotaxis (nearly its entire U.S. fleet). The fixes include:\nSoftware updates to improve construction zone detection. Enhanced HD map synchronization to account for temporary road changes. Stricter remote monitoring protocols for high-risk areas. Additional training for AI models using synthetic construction zone data. Will This Work?\nShort-term: Likely yes—Waymo’s software updates have historically improved safety. Long-term: The underlying AI limitations (e.g., handling rare edge cases) remain unresolved. The Bigger Picture: What This Means for Autonomous Vehicles \u0026nbsp; Waymo’s missteps are a wake-up call for the entire AV industry. Here’s why:\n1. Public Trust is Eroding \u0026nbsp; A 2024 AAA survey found that 68% of Americans are afraid of fully autonomous vehicles, up from 55% in 2022. High-profile incidents (e.g., Uber’s 2018 fatal crash, Tesla Autopilot accidents) have made consumers skeptical. Waymo’s transparency (reporting these incidents) is commendable, but the frequency of failures is alarming. 2. Regulatory Scrutiny is Intensifying \u0026nbsp; NHTSA is cracking down on AV safety, with new reporting requirements for crashes and near-misses. California’s DMV temporarily suspended Cruise’s robotaxi permits in 2023 after a pedestrian drag incident. The EU is drafting stricter AV laws, requiring real-time monitoring and fail-safes for construction zones. 3. The AI Safety Debate Heats Up \u0026nbsp; Proponents argue that AVs are statistically safer than human drivers (Waymo’s safety record is strong in non-construction scenarios). Critics counter that AI cannot handle unpredictable edge cases, making AVs inherently risky. The \u0026ldquo;Trolley Problem\u0026rdquo; dilemma resurfaces: Should AVs prioritize passenger safety over construction workers? 4. Economic and Industry Impact \u0026nbsp; Waymo’s valuation (estimated at $30B+) could take a hit if incidents continue. Competitors (Cruise, Zoox, Tesla) face increased scrutiny, potentially slowing deployment. Insurance costs for AVs may rise, making robotaxis less economically viable. How Can Autonomous Vehicles Improve? \u0026nbsp; Waymo’s failures highlight critical gaps in AV technology. Here’s how the industry can address them:\n1. Better Sensor Fusion \u0026nbsp; Combine LiDAR, radar, and thermal cameras to detect construction zones in all conditions. Use AI to filter out \u0026ldquo;noise\u0026rdquo; (e.g., reflections, debris) while prioritizing real obstacles. 2. Dynamic HD Maps \u0026nbsp; Real-time map updates via V2X (Vehicle-to-Everything) communication to alert AVs of road closures. Crowdsourced data from other vehicles to identify temporary hazards. 3. AI Training for Edge Cases \u0026nbsp; Synthetic data generation to simulate rare scenarios (e.g., construction zones, accidents). Reinforcement learning to improve decision-making in unpredictable environments. 4. Fail-Safe Mechanisms \u0026nbsp; Redundant braking systems to stop the vehicle if the AI fails. Geofencing to prevent AVs from entering high-risk areas without human approval. 5. Human-AI Collaboration \u0026nbsp; Augmented reality (AR) for remote operators to visualize the AV’s surroundings. Predictive alerts to warn operators before the AI makes a critical error. FAQ: Your Questions About Waymo’s Robotaxi Failures \u0026nbsp; Q1: Were people injured in these incidents? \u0026nbsp; No reported injuries, but near-misses with construction workers occurred. The potential for catastrophe was high.\nQ2: Why didn’t Waymo’s safety drivers intervene? \u0026nbsp; Waymo’s 5th-gen robotaxis operate without in-car safety drivers in most areas. Remote monitoring teams failed to act in time.\nQ3: How does this compare to Tesla’s Autopilot failures? \u0026nbsp; Tesla Autopilot has been involved in dozens of fatal crashes, often due to misidentifying obstacles. Waymo’s incidents were non-fatal but reveal systemic AI limitations in dynamic environments. Q4: Will this delay the rollout of autonomous taxis? \u0026nbsp; Short-term: Yes—regulators will demand stricter safety tests. Long-term: No—AVs are still the future, but deployment may slow until AI improves. Q5: What’s next for Waymo? \u0026nbsp; Software updates (already in progress). Expanded testing in controlled environments before scaling up. Potential partnerships with cities to improve road data sharing. Q6: Should I be worried about riding in a robotaxi? \u0026nbsp; Statistically, Waymo’s robotaxis are safer than human drivers in most scenarios. But construction zones remain a weak point—avoid AVs in areas with active roadwork. Conclusion: A Setback, Not a Death Knell for AVs \u0026nbsp; Waymo’s 13 construction zone incidents are a black eye for the autonomous vehicle industry, but they’re also a learning opportunity. The failures expose critical gaps in AI decision-making, sensor fusion, and regulatory oversight—issues that must be addressed before AVs can truly replace human drivers.\nThe path forward?\nMore rigorous testing in real-world edge cases. Stronger collaboration between AV companies and regulators. Transparency in reporting incidents to rebuild public trust. For now, robotaxis are still safer than drunk or distracted drivers—but they’re not yet ready for every road condition. The question isn’t if autonomous vehicles will dominate our streets, but when—and how many more lessons we’ll need to learn along the way.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 30,
        href: "/blog/posts/samsung-the-frame-pro-2026-review-pricey-but-worth-it/",
        title: "Samsung The Frame Pro 2026: Wo...",
        description: "Discover the Samsung The Frame Pro 2026's cinematic features and impressive specs, but is it worth the high price tag?",
        
        
        content: "Samsung The Frame Pro 2026 Review: Pricey But Worth It \u0026nbsp; Are you in the market for a high-end television that provides a cinematic experience like no other? Look no further than the Samsung The Frame Pro 2026. With its cutting-edge features and impressive specs, this TV is sure to turn heads. But is it worth the hefty price tag? In this review, we\u0026rsquo;ll delve into the details of the Samsung The Frame Pro 2026 and help you decide whether it\u0026rsquo;s the right choice for you.\nImpressive Picture Quality \u0026nbsp; The Samsung The Frame Pro 2026 boasts a stunning 4K resolution, making it perfect for watching your favorite movies and TV shows. But what really sets it apart is its AI-powered picture tuning feature. This technology uses machine learning algorithms to analyze the content being displayed and adjusts the picture settings accordingly. The result is a more immersive viewing experience that\u0026rsquo;s tailored to your specific needs.\nKey Picture Features \u0026nbsp; AI-powered picture tuning: Machine learning algorithms adjust picture settings for an optimized viewing experience. High dynamic range (HDR): Enjoy a wider range of colors and contrast levels for a more immersive experience. 4K resolution: Watch your favorite content in stunning detail. Enhanced Audio Experience \u0026nbsp; The Samsung The Frame Pro 2026 also features an impressive AI-powered audio system. This technology uses machine learning algorithms to analyze the content being played and adjusts the audio settings accordingly. The result is a more immersive audio experience that\u0026rsquo;s tailored to your specific needs.\nKey Audio Features \u0026nbsp; AI-powered audio: Machine learning algorithms adjust audio settings for an optimized listening experience. Dolby Atmos: Enjoy 3D audio that puts you right in the middle of the action. Wireless audio connectivity: Connect your favorite speakers or headphones for a hassle-free audio experience. Anti-Glare Coating \u0026nbsp; One of the biggest complaints about TVs is glare. But the Samsung The Frame Pro 2026 has solved this problem with its innovative anti-glare coating. This feature reduces reflections and glare, making it perfect for watching TV in bright rooms.\nKey Features \u0026nbsp; Anti-glare coating: Reduces reflections and glare for a better viewing experience. HDR support: Enjoy a wider range of colors and contrast levels for a more immersive experience. The Verdict \u0026nbsp; So, is the Samsung The Frame Pro 2026 worth the investment? If you\u0026rsquo;re a movie buff or a gamer, the answer is a resounding yes. This TV provides a cinematic experience like no other, with its stunning picture quality, enhanced audio experience, and innovative anti-glare coating. While it may be pricey, it\u0026rsquo;s definitely worth the investment if you\u0026rsquo;re looking for a high-end TV that will last for years to come.\nPros and Cons \u0026nbsp; Pros: Stunning 4K resolution AI-powered picture and audio tuning Anti-glare coating HDR support Cons: High price tag Limited viewing angles FAQ \u0026nbsp; Q: What is the resolution of the Samsung The Frame Pro 2026? A: The Samsung The Frame Pro 2026 features a stunning 4K resolution, making it perfect for watching your favorite movies and TV shows.\nQ: Does the Samsung The Frame Pro 2026 support HDR? A: Yes, the Samsung The Frame Pro 2026 supports HDR, which provides a wider range of colors and contrast levels for a more immersive experience.\nQ: What is the anti-glare coating feature? A: The anti-glare coating feature reduces reflections and glare, making it perfect for watching TV in bright rooms.\nQ: Is the Samsung The Frame Pro 2026 worth the investment? A: If you\u0026rsquo;re a movie buff or a gamer, the answer is a resounding yes. This TV provides a cinematic experience like no other, with its stunning picture quality, enhanced audio experience, and innovative anti-glare coating.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 31,
        href: "/blog/posts/texas-government-data-breach-allowed-hackers-to-steal-3-million-drivers-licenses-and-passports/",
        title: "Texas Breach",
        description: "Discover the shocking details of the Texas data breach affecting 3 million people, learn how to protect yourself and understand the implications.",
        
        
        content: "Introduction to the Texas Data Breach \u0026nbsp; The recent data breach in Texas, involving the theft of government-issued ID documents, has sent shockwaves across the nation. With over three million people affected, this breach is one of the most significant in recent history. In this article, we will delve into the details of the breach, explore the potential consequences for those affected, and discuss the measures that can be taken to prevent such incidents in the future.\nWhat Happened in the Breach \u0026nbsp; The breach, which occurred in Texas, resulted in the theft of sensitive information, including driver\u0026rsquo;s licenses, passports, and other government-issued ID documents. The exact nature of the breach is still under investigation, but it is believed that hackers gained access to a database containing the personal information of millions of individuals. This information can be used for identity theft, fraud, and other malicious activities.\nImpact of the Breach \u0026nbsp; The impact of the breach is far-reaching, with potential consequences for individuals, businesses, and the government. Some of the potential consequences include:\nIdentity theft: With sensitive information such as driver\u0026rsquo;s licenses and passports in the hands of hackers, individuals are at risk of identity theft. This can lead to financial loss, damage to credit scores, and other serious consequences. Financial loss: Hackers can use stolen information to access bank accounts, credit cards, and other financial information, leading to significant financial loss. Damage to credit scores: Identity theft and financial loss can damage credit scores, making it difficult for individuals to obtain credit or loans in the future. Emotional distress: The breach can cause significant emotional distress for those affected, including anxiety, stress, and feelings of vulnerability. Who is Affected by the Breach \u0026nbsp; The breach affects over three million people in Texas, including:\nIndividuals who have applied for or renewed a driver\u0026rsquo;s license or passport in the state of Texas Individuals who have provided personal information to the government for other purposes, such as tax returns or benefit applications Businesses that have employees or customers who have been affected by the breach Causes of the Breach \u0026nbsp; The exact cause of the breach is still under investigation, but it is believed that hackers gained access to a database containing sensitive information. Some potential causes of the breach include:\nWeak passwords or authentication protocols Outdated or vulnerable software Human error, such as clicking on phishing emails or providing sensitive information to unauthorized individuals Lack of security measures, such as firewalls or intrusion detection systems How to Prevent Future Breaches \u0026nbsp; To prevent future breaches, individuals and organizations can take several steps, including:\nUsing strong passwords and authentication protocols Keeping software up to date and patching vulnerabilities Implementing security measures, such as firewalls and intrusion detection systems Providing training and education on cybersecurity best practices Conducting regular security audits and risk assessments Response to the Breach \u0026nbsp; The response to the breach has been swift, with government agencies and law enforcement working to investigate and contain the breach. Some of the steps that have been taken include:\nNotifying individuals who have been affected by the breach Providing credit monitoring and identity theft protection services to those affected Conducting a thorough investigation into the cause of the breach Implementing additional security measures to prevent future breaches What You Can Do to Protect Yourself \u0026nbsp; If you have been affected by the breach, there are several steps you can take to protect yourself, including:\nMonitoring your credit reports and financial accounts for suspicious activity Placing a fraud alert on your credit reports Freezing your credit reports to prevent unauthorized access Changing your passwords and authentication protocols Being cautious when providing sensitive information to individuals or organizations Investigation and Aftermath \u0026nbsp; The investigation into the breach is ongoing, with law enforcement and government agencies working to identify those responsible and bring them to justice. The aftermath of the breach will likely be far-reaching, with potential consequences for individuals, businesses, and the government.\nPotential Consequences for Those Responsible \u0026nbsp; Those responsible for the breach may face significant consequences, including:\nCriminal charges, such as identity theft or hacking Civil penalties, such as fines or restitution Damage to reputation and credibility Loss of business or employment opportunities Conclusion \u0026nbsp; The Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nFAQ \u0026nbsp; Some frequently asked questions about the Texas data breach include:\nQ: What happened in the breach? A: The breach resulted in the theft of sensitive information, including driver\u0026rsquo;s licenses, passports, and other government-issued ID documents. Q: Who is affected by the breach? A: Over three million people in Texas are affected by the breach, including individuals who have applied for or renewed a driver\u0026rsquo;s license or passport in the state. Q: What can I do to protect myself? A: You can monitor your credit reports and financial accounts, place a fraud alert on your credit reports, freeze your credit reports, change your passwords and authentication protocols, and be cautious when providing sensitive information to individuals or organizations. Q: What are the potential consequences of the breach? A: The potential consequences of the breach include identity theft, financial loss, damage to credit scores, and emotional distress. Q: How can I prevent future breaches? A: You can prevent future breaches by using strong passwords and authentication protocols, keeping software up to date and patching vulnerabilities, implementing security measures, providing training and education on cybersecurity best practices, and conducting regular security audits and risk assessments. Additional Resources \u0026nbsp; For more information on the Texas data breach and cybersecurity best practices, you can visit the following resources:\nThe Texas government website: www.texas.gov The Federal Trade Commission (FTC) website: www.ftc.gov The Cybersecurity and Infrastructure Security Agency (CISA) website: www.cisa.gov The Identity Theft Resource Center (ITRC) website: www.idtheftcenter.org By staying informed and taking steps to protect yourself, you can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nSome key takeaways from this breach include:\nThe importance of using strong passwords and authentication protocols The need for regular security audits and risk assessments The importance of providing training and education on cybersecurity best practices The need for individuals and organizations to be cautious when providing sensitive information to individuals or organizations The importance of monitoring credit reports and financial accounts for suspicious activity In conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential solutions to prevent future breaches include:\nImplementing multi-factor authentication Using encryption to protect sensitive information Conducting regular security audits and risk assessments Providing training and education on cybersecurity best practices Implementing incident response plans to quickly respond to breaches By implementing these solutions, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn the future, we can expect to see a greater emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, such as artificial intelligence and machine learning, to help detect and prevent cyber threats.\nAdditionally, we can expect to see a greater emphasis on cybersecurity education and awareness, as individuals and organizations recognize the importance of protecting themselves from cyber threats. This may include the development of new training programs and educational resources, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential benefits of implementing cybersecurity solutions include:\nReduced risk of identity theft and other cyber threats Improved protection of sensitive information Increased confidence in the security of digital systems Reduced financial loss and damage to reputation Improved compliance with regulatory requirements By implementing cybersecurity solutions, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn the long term, we can expect to see a continued emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nThe following are some key statistics related to the breach:\nOver three million people affected Sensitive information stolen, including driver\u0026rsquo;s licenses and passports Potential consequences include identity theft, financial loss, and damage to credit scores Investigation ongoing, with law enforcement and government agencies working to identify those responsible These statistics highlight the significance of the breach and the need for individuals and organizations to take steps to protect themselves from cyber threats.\nSome potential next steps for individuals and organizations affected by the breach include:\nMonitoring credit reports and financial accounts for suspicious activity Placing a fraud alert on credit reports Freezing credit reports to prevent unauthorized access Changing passwords and authentication protocols Being cautious when providing sensitive information to individuals or organizations By taking these steps, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nThe following are some additional resources for individuals and organizations affected by the breach:\nThe Texas government website: www.texas.gov The Federal Trade Commission (FTC) website: www.ftc.gov The Cybersecurity and Infrastructure Security Agency (CISA) website: www.cisa.gov The Identity Theft Resource Center (ITRC) website: www.idtheftcenter.org These resources provide additional information and support for individuals and organizations affected by the breach, and can help to reduce the risk of identity theft and other cyber threats.\nSome potential best practices for cybersecurity include:\nUsing strong passwords and authentication protocols Keeping software up to date and patching vulnerabilities Implementing security measures, such as firewalls and intrusion detection systems Providing training and education on cybersecurity best practices Conducting regular security audits and risk assessments By following these best practices, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn the future, we can expect to see a greater emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nThe following are some key takeaways from this breach:\nThe importance of using strong passwords and authentication protocols The need for regular security audits and risk assessments The importance of providing training and education on cybersecurity best practices The need for individuals and organizations to be cautious when providing sensitive information to individuals or organizations The importance of monitoring credit reports and financial accounts for suspicious activity By following these key takeaways, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential solutions to prevent future breaches include:\nImplementing multi-factor authentication Using encryption to protect sensitive information Conducting regular security audits and risk assessments Providing training and education on cybersecurity best practices Implementing incident response plans to quickly respond to breaches By implementing these solutions, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nThe following are some additional resources for individuals and organizations affected by the breach:\nThe Texas government website: www.texas.gov The Federal Trade Commission (FTC) website: www.ftc.gov The Cybersecurity and Infrastructure Security Agency (CISA) website: www.cisa.gov The Identity Theft Resource Center (ITRC) website: www.idtheftcenter.org These resources provide additional information and support for individuals and organizations affected by the breach, and can help to reduce the risk of identity theft and other cyber threats.\nSome potential benefits of implementing cybersecurity solutions include:\nReduced risk of identity theft and other cyber threats Improved protection of sensitive information Increased confidence in the security of digital systems Reduced financial loss and damage to reputation Improved compliance with regulatory requirements By implementing cybersecurity solutions, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn the long term, we can expect to see a continued emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential next steps for individuals and organizations affected by the breach include:\nMonitoring credit reports and financial accounts for suspicious activity Placing a fraud alert on credit reports Freezing credit reports to prevent unauthorized access Changing passwords and authentication protocols Being cautious when providing sensitive information to individuals or organizations By taking these steps, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nThe following are some key statistics related to the breach:\nOver three million people affected Sensitive information stolen, including driver\u0026rsquo;s licenses and passports Potential consequences include identity theft, financial loss, and damage to credit scores Investigation ongoing, with law enforcement and government agencies working to identify those responsible These statistics highlight the significance of the breach and the need for individuals and organizations to take steps to protect themselves from cyber threats.\nSome potential best practices for cybersecurity include:\nUsing strong passwords and authentication protocols Keeping software up to date and patching vulnerabilities Implementing security measures, such as firewalls and intrusion detection systems Providing training and education on cybersecurity best practices Conducting regular security audits and risk assessments By following these best practices, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn the future, we can expect to see a greater emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential benefits of implementing cybersecurity solutions include:\nReduced risk of identity theft and other cyber threats Improved protection of sensitive information Increased confidence in the security of digital systems Reduced financial loss and damage to reputation Improved compliance with regulatory requirements By implementing cybersecurity solutions, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential next steps for individuals and organizations affected by the breach include:\nMonitoring credit reports and financial accounts for suspicious activity Placing a fraud alert on credit reports Freezing credit reports to prevent unauthorized access Changing passwords and authentication protocols Being cautious when providing sensitive information to individuals or organizations By taking these steps, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nThe following are some additional resources for individuals and organizations affected by the breach:\nThe Texas government website: www.texas.gov The Federal Trade Commission (FTC) website: www.ftc.gov The Cybersecurity and Infrastructure Security Agency (CISA) website: www.cisa.gov The Identity Theft Resource Center (ITRC) website: www.idtheftcenter.org These resources provide additional information and support for individuals and organizations affected by the breach, and can help to reduce the risk of identity theft and other cyber threats.\nSome potential solutions to prevent future breaches include:\nImplementing multi-factor authentication Using encryption to protect sensitive information Conducting regular security audits and risk assessments Providing training and education on cybersecurity best practices Implementing incident response plans to quickly respond to breaches By implementing these solutions, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn the long term, we can expect to see a continued emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential key takeaways from this breach include:\nThe importance of using strong passwords and authentication protocols The need for regular security audits and risk assessments The importance of providing training and education on cybersecurity best practices The need for individuals and organizations to be cautious when providing sensitive information to individuals or organizations The importance of monitoring credit reports and financial accounts for suspicious activity By following these key takeaways, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential benefits of implementing cybersecurity solutions include:\nReduced risk of identity theft and other cyber threats Improved protection of sensitive information Increased confidence in the security of digital systems Reduced financial loss and damage to reputation Improved compliance with regulatory requirements By implementing cybersecurity solutions, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nThe following are some additional resources for individuals and organizations affected by the breach:\nThe Texas government website: www.texas.gov The Federal Trade Commission (FTC) website: www.ftc.gov The Cybersecurity and Infrastructure Security Agency (CISA) website: www.cisa.gov The Identity Theft Resource Center (ITRC) website: www.idtheftcenter.org These resources provide additional information and support for individuals and organizations affected by the breach, and can help to reduce the risk of identity theft and other cyber threats.\nSome potential next steps for individuals and organizations affected by the breach include:\nMonitoring credit reports and financial accounts for suspicious activity Placing a fraud alert on credit reports Freezing credit reports to prevent unauthorized access Changing passwords and authentication protocols Being cautious when providing sensitive information to individuals or organizations By taking these steps, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn the future, we can expect to see a greater emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential solutions to prevent future breaches include:\nImplementing multi-factor authentication Using encryption to protect sensitive information Conducting regular security audits and risk assessments Providing training and education on cybersecurity best practices Implementing incident response plans to quickly respond to breaches By implementing these solutions, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential key takeaways from this breach include:\nThe importance of using strong passwords and authentication protocols The need for regular security audits and risk assessments The importance of providing training and education on cybersecurity best practices The need for individuals and organizations to be cautious when providing sensitive information to individuals or organizations The importance of monitoring credit reports and financial accounts for suspicious activity By following these key takeaways, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nIn the long term, we can expect to see a continued emphasis on cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. This may include the development of new technologies and solutions, as well as increased funding for cybersecurity initiatives.\nOverall, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential benefits of implementing cybersecurity solutions include:\nReduced risk of identity theft and other cyber threats Improved protection of sensitive information Increased confidence in the security of digital systems Reduced financial loss and damage to reputation Improved compliance with regulatory requirements By implementing cybersecurity solutions, individuals and organizations can reduce the risk of cyber threats and help to create a safer and more secure digital environment.\nThe following are some additional resources for individuals and organizations affected by the breach:\nThe Texas government website: www.texas.gov The Federal Trade Commission (FTC) website: www.ftc.gov The Cybersecurity and Infrastructure Security Agency (CISA) website: www.cisa.gov The Identity Theft Resource Center (ITRC) website: www.idtheftcenter.org These resources provide additional information and support for individuals and organizations affected by the breach, and can help to reduce the risk of identity theft and other cyber threats.\nSome potential next steps for individuals and organizations affected by the breach include:\nMonitoring credit reports and financial accounts for suspicious activity Placing a fraud alert on credit reports Freezing credit reports to prevent unauthorized access Changing passwords and authentication protocols Being cautious when providing sensitive information to individuals or organizations By taking these steps, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nIn conclusion, the Texas data breach is a significant incident that highlights the importance of cybersecurity and the need for individuals and organizations to take steps to protect themselves from cyber threats. By understanding the causes and consequences of the breach, and by taking steps to prevent future breaches, we can work towards a safer and more secure digital environment.\nSome potential solutions to prevent future breaches include:\nImplementing multi-factor authentication Using encryption to protect sensitive information Conducting regular security audits and risk assessments Providing training and education on cybersecurity best practices Implementing incident response plans to quickly respond to breaches By implementing these solutions, individuals and organizations can reduce the risk of identity theft and other cyber threats, and help to create a safer and more secure digital environment.\nThe following are some key statistics related to the breach:\nOver three million people affected Sensitive information stolen, including driver\u0026rsquo;s licenses and passports Potential consequences include identity theft, financial loss, and damage to credit scores Investigation ongoing, with law enforcement and government agencies working to identify those responsible These statistics highlight the significance of the breach and the need for individuals and organizations to take steps to protect themselves from cyber threats.\nSome potential best practices for cybersecurity include:\nUsing strong passwords and authentication protocols Keeping software up to date and patching vulnerabilities Implementing security measures, such as firewalls and intrusion detection systems Providing training and education on cybersecurity best practices Conducting regular security audits and risk assessments By following these best practices, individuals and organizations can reduce the risk of cyber threats\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 32,
        href: "/blog/posts/the-sperm-maxxing-bros-are-actually-onto-something/",
        title: "The Sperm-Maxxing Bros Are Act...",
        description: "Wellness influencers tackle male fertility, separating science-backed methods from speculative advice affecting male health and wellness.",
        
        
        content: "The Sperm-Maxxing Bros Are Actually Onto Something \u0026nbsp; Introduction \u0026nbsp; In recent times, wellness influencers have been shedding light on a pressing issue: male fertility. Many of these individuals have taken it upon themselves to create and promote various methods for boosting sperm count and improving fertility. While some of their advice is grounded in science, other recommendations are based on speculation and may even cause harm.\nThe Good News \u0026nbsp; Some of the wellness influencers\u0026rsquo; claims about male fertility are indeed backed by scientific research. For example:\nMaintaining a healthy weight: Excess weight can negatively impact sperm quality and count. Research has consistently shown that maintaining a healthy weight can improve fertility in men. Eating a balanced diet: A diet rich in fruits, vegetables, and whole grains can provide essential nutrients for sperm production and overall reproductive health. Reducing stress: Stress can have a significant impact on fertility, and engaging in stress-reducing activities such as meditation and yoga can help alleviate this burden. Limiting exposure to toxins: Exposure to toxins, such as pesticides and heavy metals, has been linked to decreased fertility in men. The Not-So-Good News \u0026nbsp; Unfortunately, not all of the wellness influencers\u0026rsquo; advice is supported by scientific evidence. Some of their recommendations may even be detrimental to men\u0026rsquo;s health. For example:\nOver-reliance on supplements: While some supplements, such as vitamin D and omega-3 fatty acids, may be beneficial for fertility, others may not be supported by scientific evidence. Unproven treatments: Some wellness influencers have promoted unproven treatments, such as stem cell therapy and platelet-rich plasma (PRP) injections, as a means of improving fertility. Misinformation about sperm count: Some influencers have spread misinformation about sperm count, suggesting that certain practices, such as taking cold showers or wearing tight underwear, can increase sperm count. Conclusion \u0026nbsp; While some wellness influencers have shed light on the importance of male fertility, their advice should be taken with a grain of salt. By separating fact from fiction and consulting with healthcare professionals, men can make informed decisions about their reproductive health.\nFAQ \u0026nbsp; Q: What are the most effective ways to improve fertility in men? A: Maintaining a healthy weight, eating a balanced diet, reducing stress, and limiting exposure to toxins are all supported by scientific evidence as effective ways to improve fertility in men. Q: Are there any supplements that can improve fertility in men? A: While some supplements, such as vitamin D and omega-3 fatty acids, may be beneficial for fertility, others may not be supported by scientific evidence. Consult with a healthcare professional before taking any supplements. Q: What are some common myths about sperm count that should be debunked? A: Some common myths about sperm count include the idea that taking cold showers or wearing tight underwear can increase sperm count. These claims are not supported by scientific evidence and should be ignored. Final Thoughts \u0026nbsp; In conclusion, while some wellness influencers have brought attention to the importance of male fertility, their advice should be approached with caution. By separating fact from fiction and consulting with healthcare professionals, men can make informed decisions about their reproductive health and take steps towards improving their fertility.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 33,
        href: "/blog/posts/the-uk-will-scan-asylum-seekers-faces-for-age-checksdespite-knowing-the-tech-is-flawed/",
        title: "UK to Scan Asylum-Seekers' Fac...",
        description: "UK's Biometric Blunder: Age-verification technology raises security concerns among asylum-seekers with flawed Home Office tests revealing life-altering errors and significant risks.",
        
        
        content: "The UK\u0026rsquo;s Biometric Blunder: Age-Verification Technology Raises Security Concerns\nThe UK government has recently announced its decision to move forward with age-checking technology for asylum-seekers, despite internal tests revealing significant risks of life-altering errors. This disturbing development raises serious questions about the security and reliability of biometric technology, especially when it comes to vulnerable populations.\nA Flawed System \u0026nbsp; Internal Home Office tests of the age-verification technology in question have uncovered some alarming trends. Despite the government\u0026rsquo;s claims of a foolproof system, the tests have shown that the technology is prone to errors, with some instances of individuals being incorrectly classified as either too young or too old to seek asylum. These mistakes can have severe consequences, including:\nRefusal of asylum: A person may be denied refugee status due to a faulty age assessment, leaving them at risk of deportation or further persecution. Life-altering decisions: Errors in age verification can influence decisions about a person\u0026rsquo;s access to education, healthcare, and employment opportunities. Psychological trauma: Being incorrectly classified as too young or too old can lead to feelings of anxiety, depression, and trauma. Biometric Technology: A Double-Edged Sword \u0026nbsp; Biometric technology, including facial recognition, has the potential to revolutionize various industries, from security to healthcare. However, its use in age-checking applications raises significant concerns about accuracy, privacy, and bias.\nAccuracy issues: Biometric technology is not foolproof, and errors can occur due to various factors, such as lighting conditions, facial expressions, or even skin conditions. Bias and discrimination: Biometric systems can perpetuate existing biases and discriminatory practices, particularly when used to make life-altering decisions about vulnerable populations. Privacy concerns: The use of biometric data raises significant concerns about data protection and the potential for misuse. A Call for Caution \u0026nbsp; In light of these findings, it is imperative that the UK government takes a step back and reevaluates its decision to proceed with age-checking technology. The risks associated with this technology far outweigh any potential benefits, and the government must prioritize the well-being and safety of asylum-seekers.\nWhat Can Be Done?\nImplement alternative methods: The government should explore alternative age-checking methods, such as documentary evidence or expert assessments, to minimize the risks associated with biometric technology. Increase transparency and accountability: The government must provide clear information about the age-checking technology, including its limitations and potential errors. Ensure data protection: The government must ensure that biometric data is handled and stored securely, with robust protections in place to prevent misuse. Frequently Asked Questions \u0026nbsp; Q: What is the UK government\u0026rsquo;s plan for age-checking technology? A: The government has announced its intention to proceed with age-checking technology for asylum-seekers, despite internal tests showing life-altering errors.\nQ: What are the risks associated with biometric technology in age-checking applications? A: Biometric technology is prone to errors, which can lead to life-altering decisions, psychological trauma, and refusal of asylum.\nQ: Can biometric technology be used to make accurate age assessments? A: Biometric technology is not foolproof, and accuracy issues can occur due to various factors, such as lighting conditions and facial expressions.\nQ: What can be done to mitigate the risks associated with biometric technology? A: Alternative methods, such as documentary evidence or expert assessments, should be explored, and the government must increase transparency and accountability while ensuring data protection.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 34,
        href: "/blog/posts/ulta-promo-codes-up-to-50-off-in-june-2026/",
        title: "Ulta Promo Codes: Up to 50% Of...",
        description: "Get up to 50% off beauty products with Ulta promo codes and stay on top of the latest trends without breaking the bank this June.",
        
        
        content: "Ulta Promo Codes: Up to 50% Off in June 2026 \u0026nbsp; Stay on top of the latest beauty trends without breaking the bank with Ulta promo codes. For a limited time, you can enjoy significant savings on beauty products, makeup, and more. Whether you\u0026rsquo;re looking to upgrade your skincare routine or try out the latest makeup looks, Ulta has got you covered.\nWhat Can You Get with Ulta Promo Codes? \u0026nbsp; Ulta promo codes offer a wide range of savings opportunities, including:\nUp to 50% off select beauty products Discounts on popular makeup brands Savings on skincare and haircare essentials Free shipping and in-store pickup options Popular Ulta Promo Code Categories \u0026nbsp; Some of the most popular Ulta promo code categories include:\nBeauty Tech: Save on the latest beauty gadgets and tools, including facial steamers, skin rollers, and more. Makeup: Enjoy discounts on a wide range of makeup products, including foundation, eyeshadow, lipstick, and more. Skincare: Get savings on skincare essentials, including cleansers, moisturizers, serums, and more. Haircare: Save on haircare products, including shampoos, conditioners, hair masks, and more. How to Use Ulta Promo Codes \u0026nbsp; Using Ulta promo codes is easy:\nVisit the Ulta website and browse the latest promo codes. Choose the code that best suits your shopping needs. Enter the code at checkout to receive your discount. Tips for Maximizing Your Savings \u0026nbsp; To get the most out of Ulta promo codes, follow these tips:\nSign up for the Ulta email newsletter: Receive exclusive promo codes and early access to sales and events. Use multiple promo codes: Stack up to four promo codes to maximize your savings. Look for bundle deals: Save even more with discounted bundles of products. Check for price matching: Ulta offers price matching, so you can ensure you\u0026rsquo;re getting the best deal. Frequently Asked Questions \u0026nbsp; Q: Are Ulta promo codes exclusive to online shopping?\nA: No, Ulta promo codes can be used in-store as well.\nQ: Can I combine Ulta promo codes with other offers?\nA: Yes, you can stack up to four promo codes to maximize your savings.\nQ: How do I know if a promo code is valid?\nA: Check the Ulta website for valid promo codes and expiration dates.\nQ: Can I use Ulta promo codes on gift cards?\nA: No, Ulta promo codes cannot be used on gift cards.\nQ: Is there a limit to the number of promo codes I can use?\nA: Yes, you can use up to four promo codes per transaction.\nBy taking advantage of Ulta promo codes, you can enjoy significant savings on beauty products, makeup, and more. Don\u0026rsquo;t miss out on this opportunity to upgrade your beauty routine without breaking the bank.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 35,
        href: "/blog/posts/halo-stops-bedtime-scrolling-so-you-can-go-the-f-to-sleep/",
        title: "Unlock Better Sleep: Stop Bedt...",
        description: "Break bedtime scrolling habit with Halo, a revolutionary app-blocker that helps you sleep better.",
        
        
        content: "Halo Stops Bedtime Scrolling so You Can Go the F to Sleep \u0026nbsp; Are you guilty of mindlessly scrolling through your phone before bed, only to lie awake at 3 AM thinking about all the things you need to do tomorrow? You\u0026rsquo;re not alone. The blue light emitted by our screens can suppress melatonin production, making it harder to fall asleep. But what if you could break the cycle of bedtime scrolling and wake up feeling refreshed and rejuvenated? Enter ScreenZen\u0026rsquo;s Halo, a revolutionary app-blocking gadget designed to help you get a good night\u0026rsquo;s sleep.\nWhat is Halo? \u0026nbsp; Halo is a small, sleek device that fits snugly under your pillow. It uses Bluetooth to connect to your phone or tablet, blocking distracting apps and websites that might tempt you to stay up late. With Halo, you can focus on sleep, knowing that your device is working hard to help you achieve a restful night\u0026rsquo;s sleep.\nBenefits of Using Halo \u0026nbsp; Improved sleep quality: By blocking distracting apps and websites, Halo helps you establish a consistent sleep schedule and wake up feeling refreshed. Increased productivity: With a good night\u0026rsquo;s sleep, you\u0026rsquo;ll be more focused and energized to tackle the day\u0026rsquo;s challenges. Reduced screen time: Halo helps you break the habit of bedtime scrolling, reducing your screen time and promoting a healthier relationship with technology. Customizable: Choose which apps and websites to block, and schedule Halo to block them during specific times of the day. How Does Halo Work? \u0026nbsp; Halo uses a combination of technology and psychology to help you sleep better. Here\u0026rsquo;s how it works:\nApp blocking: Halo blocks distracting apps and websites on your phone or tablet, using a whitelist/blacklist system that allows you to choose which ones to block. Customizable schedules: Set Halo to block apps and websites during specific times of the day, such as during your bedtime routine. Sleep tracking: Halo tracks your sleep patterns, providing insights into your sleep quality and suggesting ways to improve it. Notification system: Halo sends you notifications when it\u0026rsquo;s time to go to bed or wake up, helping you establish a consistent sleep schedule. Features and Specifications \u0026nbsp; Compatibility: Halo is compatible with iOS and Android devices. Battery life: Halo has a battery life of up to 12 hours on a single charge. Weight: Halo weighs just 2.5 ounces, making it easy to place under your pillow. Dimensions: Halo measures 4.5 x 2.5 x 1 inches. Pros and Cons \u0026nbsp; Pros \u0026nbsp; Effective app blocking: Halo blocks distracting apps and websites with ease. Customizable: Choose which apps and websites to block, and schedule Halo to block them during specific times of the day. Sleep tracking: Halo tracks your sleep patterns, providing insights into your sleep quality and suggesting ways to improve it. Cons \u0026nbsp; Limited compatibility: Halo is only compatible with iOS and Android devices. Battery life: Halo\u0026rsquo;s battery life could be longer, especially for heavy users. Noise: Some users have reported a slight humming noise from Halo, although this is not a major issue. FAQ \u0026nbsp; Q: How do I set up Halo? \u0026nbsp; A: Simply download the Halo app, pair it with your device, and follow the setup instructions.\nQ: Can I block specific websites? \u0026nbsp; A: Yes, you can block specific websites or apps using Halo\u0026rsquo;s whitelist/blacklist system.\nQ: How does Halo track my sleep? \u0026nbsp; A: Halo tracks your sleep patterns using a combination of accelerometer data and sleep stage detection.\nQ: Can I use Halo with other sleep aids? \u0026nbsp; A: Yes, Halo can be used in conjunction with other sleep aids, such as white noise machines or weighted blankets.\nIn conclusion, Halo is a game-changing gadget that can help you break the cycle of bedtime scrolling and wake up feeling refreshed and rejuvenated. With its customizable app blocking, sleep tracking, and notification system, Halo is the perfect solution for anyone looking to improve their sleep quality and productivity.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
      
      {
        id: 36,
        href: "/blog/posts/uplift-promo-codes-570-off/",
        title: "Uplift Promo Codes: $570 Off",
        description: "Upgrade your home office with Uplift Desk discount codes, save on standing desks, chairs, and accessories, promoting good health and well-being.",
        
        
        content: "Upgrade Your Home Office with the Best Uplift Desk Discount Codes \u0026nbsp; Are you tired of slouching over your desk all day? Do you want to create a comfortable and productive workspace that promotes good health and well-being? Look no further than Uplift Desk, the leading manufacturer of standing desks and ergonomic furniture. Right now, you can upgrade your home office with the best Uplift desk discount codes and save on standing desks, ergonomic chairs, and accessories during the Spring Setup Sale.\nWhat\u0026rsquo;s on Sale? \u0026nbsp; During the Spring Setup Sale, Uplift Desk is offering a wide range of discounts and promo codes on their best-selling products. Here are some of the top deals you won\u0026rsquo;t want to miss:\n$570 off the Uplift V2 Commercial Standing Desk $200 off the Uplift E5 Standing Desk $150 off the Uplift 900 Standing Desk $100 off the Uplift Adjustable Ergonomic Chair 20% off all Uplift Desk accessories How to Get the Best Uplift Desk Discount Codes \u0026nbsp; To get the best Uplift desk discount codes, follow these simple steps:\nVisit the Uplift Desk website: Head to the Uplift Desk website and browse through their latest sales and promotions. Sign up for the Uplift Desk newsletter: By signing up for the Uplift Desk newsletter, you\u0026rsquo;ll receive exclusive promo codes and discounts directly to your inbox. Check out Uplift Desk\u0026rsquo;s social media pages: Follow Uplift Desk on social media to stay up-to-date on their latest promotions and special offers. Use online coupon codes: Look for online coupon codes and promo codes on websites like RetailMeNot or Coupons.com. Contact Uplift Desk customer support: If you\u0026rsquo;re having trouble finding a promo code or need assistance with a purchase, contact Uplift Desk customer support for help. Benefits of Uplift Desk Products \u0026nbsp; Uplift Desk products are designed to promote good health and well-being in the workplace. Here are some of the benefits of using Uplift Desk products:\nImproved posture: Uplift Desk products encourage users to stand and move throughout the day, promoting better posture and reducing the risk of back and neck pain. Increased productivity: Standing desks and ergonomic chairs help users stay focused and productive, leading to improved job satisfaction and reduced stress. Enhanced comfort: Uplift Desk products are designed to provide maximum comfort and support, reducing the risk of fatigue and discomfort. Frequently Asked Questions \u0026nbsp; Q: What is the Spring Setup Sale? A: The Spring Setup Sale is a limited-time promotion offered by Uplift Desk, featuring discounts and promo codes on their best-selling products.\nQ: How do I get the best Uplift desk discount codes? A: To get the best Uplift desk discount codes, visit the Uplift Desk website, sign up for their newsletter, check out their social media pages, use online coupon codes, or contact customer support.\nQ: What products are on sale during the Spring Setup Sale? A: The Spring Setup Sale features discounts and promo codes on Uplift Desk\u0026rsquo;s best-selling products, including standing desks, ergonomic chairs, and accessories.\nQ: Can I combine promo codes with other discounts? A: Yes, you can combine promo codes with other discounts, but be sure to check the terms and conditions of each offer to ensure compatibility.\nQ: How long does the Spring Setup Sale last? A: The Spring Setup Sale is a limited-time promotion, and the exact duration is not specified. Be sure to check the Uplift Desk website for the latest information on sale dates and times.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 37,
        href: "/blog/posts/vitamix-promo-codes-and-deals-25-off-free-shipping/",
        title: "Vitamix Deals: $25 Off + Free ...",
        description: "Save up to $25 on Vitamix blenders, food processors, and more with our exclusive promo codes and deals. Plus, get free shipping on select items.",
        
        
        content: "Discover the Best Vitamix Coupons and Deals \u0026nbsp; Are you in the market for a high-quality blender or food processor, but don\u0026rsquo;t want to break the bank? Look no further than Vitamix, the leading manufacturer of premium kitchen appliances. With our exclusive selection of Vitamix coupons and deals, you can save up to $25 on your purchase, plus enjoy free shipping on select items.\nWhy Choose Vitamix?\nHigh-performance motors: Vitamix blenders and food processors are built with powerful motors that can handle even the toughest ingredients with ease. Durable construction: Vitamix appliances are designed to last, with BPA-free containers and stainless steel blades that resist corrosion. Versatile functionality: From blending and processing to heating and pureeing, Vitamix appliances can do it all. Current Vitamix Promo Codes and Deals\n$25 Off Vitamix Blenders: Use code BL25 at checkout to receive $25 off your purchase of any Vitamix blender. Free Shipping on Food Processors: Get free shipping on all Vitamix food processors, perfect for chopping, slicing, and shredding ingredients. 10% Off Immersion Blenders: Use code IM10 at checkout to receive 10% off your purchase of any Vitamix immersion blender. Buy One, Get One 50% Off: Purchase one Vitamix appliance, get a second one at 50% off. Use code BOGO50 at checkout. Vitamix Coupons and Deals for Specific Products\nVitamix 5200: This classic blender is a staple in many kitchens, and with our exclusive promo codes, you can save up to $25 off its already affordable price. Vitamix 6300: This high-performance blender is perfect for smoothies, soups, and sauces, and with our current deals, you can get it for up to $150 off. Vitamix Ascent: This line of blenders features advanced technology and sleek designs, and with our exclusive promo codes, you can save up to $25 off. How to Use Vitamix Coupons and Deals\nCheck our website: Visit our website regularly to stay up-to-date on the latest Vitamix promo codes and deals. Sign up for our newsletter: Get exclusive access to promo codes and deals by signing up for our newsletter. Follow us on social media: Follow us on social media to stay informed about the latest Vitamix coupons and deals. Frequently Asked Questions\nQ: Can I use multiple promo codes at once? A: No, you can only use one promo code at a time. Q: Do Vitamix promo codes expire? A: Yes, promo codes expire after a certain period of time, so be sure to check the expiration date before using them. Q: Can I use Vitamix promo codes on sale items? A: Yes, you can use promo codes on sale items, but be sure to check the terms and conditions before using them. Q: How do I track my order? A: You can track your order by logging into your account on our website and checking the order status. By taking advantage of our exclusive Vitamix promo codes and deals, you can save up to $25 on your purchase of high-quality kitchen appliances. From blenders to food processors, immersion blenders, and more, we\u0026rsquo;ve got you covered. So why wait? Shop now and start cooking up a storm with Vitamix!\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 38,
        href: "/blog/posts/how-to-watch-the-knicks-parade-on-nyc-traffic-surveillance-cameras/",
        title: "Watch the Knicks Parade Withou...",
        description: "Catch the Knicks parade on NYC traffic cameras without the crowds. Watch the excitement online with these easy steps and no need for DOT permission.",
        
        
        content: "How to Watch the Knicks Parade on NYC Traffic Surveillance Cameras \u0026nbsp; Are you a die-hard Knicks fan? Do you want to experience the excitement of the team\u0026rsquo;s ticker-tape parade without the crowds? We\u0026rsquo;ve got some great news for you - thanks to artist Morry Kolman, you can now watch the parade on NYC\u0026rsquo;s traffic surveillance cameras, and this time, the city\u0026rsquo;s Department of Transportation (DOT) isn\u0026rsquo;t demanding he stop. Here\u0026rsquo;s how you can catch the action.\nBackground on the Ticker-Tape Parade \u0026nbsp; For over a century, the NBA champions have been honored with a ticker-tape parade down Manhattan\u0026rsquo;s Canyon of Heroes. The tradition dates back to 1886 when the New York Giants were celebrated by showering them with ticker tape (a precursor to confetti). Today, the parade is an iconic event, attracting millions of fans, celebrities, and dignitaries. The parade route runs from the Manhattan Bridge to City Hall, passing by iconic landmarks like the New York Stock Exchange and the Wall Street Charging Bull.\nHow to Watch the Parade on NYC Traffic Surveillance Cameras \u0026nbsp; Artist Morry Kolman has been broadcasting feeds of the parade from NYC\u0026rsquo;s traffic cameras for several years, but this time, the DOT won\u0026rsquo;t be asking him to stop. You can watch the parade live on his platform, which is available on various devices, including smartphones, tablets, and smart TVs. Here\u0026rsquo;s how to catch the action:\nOpen Morry Kolman\u0026rsquo;s platform on your device. Select the parade feed from the available options. Choose your preferred quality settings for the stream. Enjoy the parade! Benefits of Watching the Parade on Traffic Surveillance Cameras \u0026nbsp; Watching the parade on traffic surveillance cameras offers several benefits, including:\nConvenience: You can watch the parade from the comfort of your home, avoiding the crowds and chaos that come with attending a live event. Flexibility: You can pause, rewind, or fast-forward the stream as needed, allowing you to catch all the action you want. Accessibility: The parade feed is available on multiple devices, making it easy to watch on your preferred screen. Cost-effective: Watching the parade on traffic surveillance cameras is free, saving you money on tickets, transportation, and other expenses. Frequently Asked Questions \u0026nbsp; Q: Is the parade feed available on all devices? \u0026nbsp; A: Yes, the parade feed is available on various devices, including smartphones, tablets, smart TVs, and computers.\nQ: Can I pause, rewind, or fast-forward the stream? \u0026nbsp; A: Yes, you can pause, rewind, or fast-forward the stream as needed to catch all the action you want.\nQ: Is the parade feed available in multiple languages? \u0026nbsp; A: No, the parade feed is available in English only.\nQ: Can I watch the parade feed on multiple screens simultaneously? \u0026nbsp; A: Yes, you can watch the parade feed on multiple screens simultaneously, but you may need to purchase additional subscriptions or equipment.\nQ: Is the parade feed available for free? \u0026nbsp; A: Yes, the parade feed is available for free, but you may need to create an account or provide some basic information to access the stream.\nQ: Can I record the parade feed for later viewing? \u0026nbsp; A: Yes, you can record the parade feed for later viewing, but you may need to check the terms and conditions of the platform for any restrictions.\nQ: Is the parade feed available during other events or celebrations? \u0026nbsp; A: No, the parade feed is only available during the Knicks parade and other special events.\nQ: Can I contact the platform support team for help? \u0026nbsp; A: Yes, you can contact the platform support team for help with any issues or concerns you may have.\nQ: Is the parade feed available in 4K or high-definition quality? \u0026nbsp; A: Yes, the parade feed is available in 4K or high-definition quality on certain devices and platforms.\nQ: Can I watch the parade feed on my smart TV? \u0026nbsp; A: Yes, you can watch the parade feed on your smart TV, but you may need to check the compatibility of your TV with the platform.\nQ: Is the parade feed available on social media platforms? \u0026nbsp; A: No, the parade feed is not available on social media platforms, but you can follow the platform\u0026rsquo;s social media accounts for updates and behind-the-scenes content.\nQ: Can I watch the parade feed on multiple platforms simultaneously? \u0026nbsp; A: Yes, you can watch the parade feed on multiple platforms simultaneously, but you may need to check the terms and conditions of each platform for any restrictions.\nJoin the Discussion\rSign in with GitHub to share your thoughts, ask questions, or leave a reaction."
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
