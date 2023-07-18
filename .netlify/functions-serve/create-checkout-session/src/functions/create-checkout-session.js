var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/is-promise/index.js
var require_is_promise = __commonJS({
  "node_modules/is-promise/index.js"(exports, module2) {
    module2.exports = isPromise;
    module2.exports.default = isPromise;
    function isPromise(obj) {
      return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
      );
    }
  },
});

// node_modules/@netlify/functions/dist/lib/consts.js
var require_consts = __commonJS({
  "node_modules/@netlify/functions/dist/lib/consts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METADATA_VERSION =
      exports.HTTP_STATUS_OK =
      exports.HTTP_STATUS_METHOD_NOT_ALLOWED =
      exports.BUILDER_FUNCTIONS_FLAG =
        void 0;
    var BUILDER_FUNCTIONS_FLAG = true;
    exports.BUILDER_FUNCTIONS_FLAG = BUILDER_FUNCTIONS_FLAG;
    var HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
    exports.HTTP_STATUS_METHOD_NOT_ALLOWED = HTTP_STATUS_METHOD_NOT_ALLOWED;
    var HTTP_STATUS_OK = 200;
    exports.HTTP_STATUS_OK = HTTP_STATUS_OK;
    var METADATA_VERSION = 1;
    exports.METADATA_VERSION = METADATA_VERSION;
  },
});

// node_modules/@netlify/functions/dist/lib/builder.js
var require_builder = __commonJS({
  "node_modules/@netlify/functions/dist/lib/builder.js"(exports) {
    "use strict";
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.builder = void 0;
    var is_promise_1 = __importDefault(require_is_promise());
    var consts_js_1 = require_consts();
    var augmentResponse = (response) => {
      if (!response) {
        return response;
      }
      const metadata = {
        version: consts_js_1.METADATA_VERSION,
        builder_function: consts_js_1.BUILDER_FUNCTIONS_FLAG,
        ttl: response.ttl || 0,
      };
      return __spreadProps(__spreadValues({}, response), {
        metadata,
      });
    };
    var wrapHandler = (handler2) => (event, context, callback) => {
      if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
        return Promise.resolve({
          body: "Method Not Allowed",
          statusCode: consts_js_1.HTTP_STATUS_METHOD_NOT_ALLOWED,
        });
      }
      const modifiedEvent = __spreadProps(__spreadValues({}, event), {
        multiValueQueryStringParameters: {},
        queryStringParameters: {},
      });
      const wrappedCallback = (error, response) =>
        callback ? callback(error, augmentResponse(response)) : null;
      const execution = handler2(modifiedEvent, context, wrappedCallback);
      if ((0, is_promise_1.default)(execution)) {
        return execution.then(augmentResponse);
      }
      return execution;
    };
    exports.builder = wrapHandler;
  },
});

// node_modules/@netlify/functions/dist/lib/schedule.js
var require_schedule = __commonJS({
  "node_modules/@netlify/functions/dist/lib/schedule.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.schedule = void 0;
    var schedule = (cron, handler2) => handler2;
    exports.schedule = schedule;
  },
});

// node_modules/@netlify/functions/dist/lib/stream.js
var require_stream = __commonJS({
  "node_modules/@netlify/functions/dist/lib/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stream = void 0;
    var node_stream_1 = require("stream");
    var node_util_1 = require("util");
    var pipeline = (0, node_util_1.promisify)(node_stream_1.pipeline);
    var stream = (handler2) =>
      awslambda.streamifyResponse(async (event, responseStream, context) => {
        const _a = await handler2(event, context),
          { body } = _a,
          httpResponseMetadata = __objRest(_a, ["body"]);
        const responseBody = awslambda.HttpResponseStream.from(
          responseStream,
          httpResponseMetadata,
        );
        if (typeof body === "undefined") {
          responseBody.end();
        } else if (typeof body === "string") {
          responseBody.write(body);
          responseBody.end();
        } else {
          await pipeline(body, responseBody);
        }
      });
    exports.stream = stream;
  },
});

// node_modules/@netlify/functions/dist/function/index.js
var require_function = __commonJS({
  "node_modules/@netlify/functions/dist/function/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  },
});

// node_modules/@netlify/functions/dist/main.js
var require_main = __commonJS({
  "node_modules/@netlify/functions/dist/main.js"(exports) {
    "use strict";
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __exportStar =
      (exports && exports.__exportStar) ||
      function (m, exports2) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports2, p)
          )
            __createBinding(exports2, m, p);
      };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stream = exports.schedule = exports.builder = void 0;
    var builder_js_1 = require_builder();
    Object.defineProperty(exports, "builder", {
      enumerable: true,
      get: function () {
        return builder_js_1.builder;
      },
    });
    var schedule_js_1 = require_schedule();
    Object.defineProperty(exports, "schedule", {
      enumerable: true,
      get: function () {
        return schedule_js_1.schedule;
      },
    });
    var stream_js_1 = require_stream();
    Object.defineProperty(exports, "stream", {
      enumerable: true,
      get: function () {
        return stream_js_1.stream;
      },
    });
    __exportStar(require_function(), exports);
  },
});

// node_modules/@sentry/utils/cjs/is.js
var require_is = __commonJS({
  "node_modules/@sentry/utils/cjs/is.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var objectToString = Object.prototype.toString;
    function isError(wat) {
      switch (objectToString.call(wat)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
          return true;
        default:
          return isInstanceOf(wat, Error);
      }
    }
    function isBuiltin(wat, className) {
      return objectToString.call(wat) === `[object ${className}]`;
    }
    function isErrorEvent(wat) {
      return isBuiltin(wat, "ErrorEvent");
    }
    function isDOMError(wat) {
      return isBuiltin(wat, "DOMError");
    }
    function isDOMException(wat) {
      return isBuiltin(wat, "DOMException");
    }
    function isString(wat) {
      return isBuiltin(wat, "String");
    }
    function isPrimitive(wat) {
      return (
        wat === null || (typeof wat !== "object" && typeof wat !== "function")
      );
    }
    function isPlainObject(wat) {
      return isBuiltin(wat, "Object");
    }
    function isEvent(wat) {
      return typeof Event !== "undefined" && isInstanceOf(wat, Event);
    }
    function isElement(wat) {
      return typeof Element !== "undefined" && isInstanceOf(wat, Element);
    }
    function isRegExp(wat) {
      return isBuiltin(wat, "RegExp");
    }
    function isThenable(wat) {
      return Boolean(wat && wat.then && typeof wat.then === "function");
    }
    function isSyntheticEvent(wat) {
      return (
        isPlainObject(wat) &&
        "nativeEvent" in wat &&
        "preventDefault" in wat &&
        "stopPropagation" in wat
      );
    }
    function isNaN2(wat) {
      return typeof wat === "number" && wat !== wat;
    }
    function isInstanceOf(wat, base) {
      try {
        return wat instanceof base;
      } catch (_e) {
        return false;
      }
    }
    exports.isDOMError = isDOMError;
    exports.isDOMException = isDOMException;
    exports.isElement = isElement;
    exports.isError = isError;
    exports.isErrorEvent = isErrorEvent;
    exports.isEvent = isEvent;
    exports.isInstanceOf = isInstanceOf;
    exports.isNaN = isNaN2;
    exports.isPlainObject = isPlainObject;
    exports.isPrimitive = isPrimitive;
    exports.isRegExp = isRegExp;
    exports.isString = isString;
    exports.isSyntheticEvent = isSyntheticEvent;
    exports.isThenable = isThenable;
  },
});

// node_modules/@sentry/utils/cjs/aggregate-errors.js
var require_aggregate_errors = __commonJS({
  "node_modules/@sentry/utils/cjs/aggregate-errors.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    function applyAggregateErrorsToEvent(
      exceptionFromErrorImplementation,
      parser,
      key,
      limit,
      event,
      hint,
    ) {
      if (
        !event.exception ||
        !event.exception.values ||
        !hint ||
        !is.isInstanceOf(hint.originalException, Error)
      ) {
        return;
      }
      const originalException =
        event.exception.values.length > 0
          ? event.exception.values[event.exception.values.length - 1]
          : void 0;
      if (originalException) {
        event.exception.values = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          hint.originalException,
          key,
          event.exception.values,
          originalException,
          0,
        );
      }
    }
    function aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      error,
      key,
      prevExceptions,
      exception,
      exceptionId,
    ) {
      if (prevExceptions.length >= limit + 1) {
        return prevExceptions;
      }
      let newExceptions = [...prevExceptions];
      if (is.isInstanceOf(error[key], Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(
          parser,
          error[key],
        );
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(
          newException,
          key,
          newExceptionId,
          exceptionId,
        );
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          error[key],
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId,
        );
      }
      if (Array.isArray(error.errors)) {
        error.errors.forEach((childError, i) => {
          if (is.isInstanceOf(childError, Error)) {
            applyExceptionGroupFieldsForParentException(exception, exceptionId);
            const newException = exceptionFromErrorImplementation(
              parser,
              childError,
            );
            const newExceptionId = newExceptions.length;
            applyExceptionGroupFieldsForChildException(
              newException,
              `errors[${i}]`,
              newExceptionId,
              exceptionId,
            );
            newExceptions = aggregateExceptionsFromError(
              exceptionFromErrorImplementation,
              parser,
              limit,
              childError,
              key,
              [newException, ...newExceptions],
              newException,
              newExceptionId,
            );
          }
        });
      }
      return newExceptions;
    }
    function applyExceptionGroupFieldsForParentException(
      exception,
      exceptionId,
    ) {
      exception.mechanism = exception.mechanism || {
        type: "generic",
        handled: true,
      };
      exception.mechanism = __spreadProps(
        __spreadValues({}, exception.mechanism),
        {
          is_exception_group: true,
          exception_id: exceptionId,
        },
      );
    }
    function applyExceptionGroupFieldsForChildException(
      exception,
      source,
      exceptionId,
      parentId,
    ) {
      exception.mechanism = exception.mechanism || {
        type: "generic",
        handled: true,
      };
      exception.mechanism = __spreadProps(
        __spreadValues({}, exception.mechanism),
        {
          type: "chained",
          source,
          exception_id: exceptionId,
          parent_id: parentId,
        },
      );
    }
    exports.applyAggregateErrorsToEvent = applyAggregateErrorsToEvent;
  },
});

// node_modules/@sentry/utils/cjs/worldwide.js
var require_worldwide = __commonJS({
  "node_modules/@sentry/utils/cjs/worldwide.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function isGlobalObj(obj) {
      return obj && obj.Math == Math ? obj : void 0;
    }
    var GLOBAL_OBJ =
      (typeof globalThis == "object" && isGlobalObj(globalThis)) ||
      (typeof window == "object" && isGlobalObj(window)) ||
      (typeof self == "object" && isGlobalObj(self)) ||
      (typeof global == "object" && isGlobalObj(global)) ||
      (function () {
        return this;
      })() ||
      {};
    function getGlobalObject() {
      return GLOBAL_OBJ;
    }
    function getGlobalSingleton(name, creator, obj) {
      const gbl = obj || GLOBAL_OBJ;
      const __SENTRY__ = (gbl.__SENTRY__ = gbl.__SENTRY__ || {});
      const singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
      return singleton;
    }
    exports.GLOBAL_OBJ = GLOBAL_OBJ;
    exports.getGlobalObject = getGlobalObject;
    exports.getGlobalSingleton = getGlobalSingleton;
  },
});

// node_modules/@sentry/utils/cjs/browser.js
var require_browser = __commonJS({
  "node_modules/@sentry/utils/cjs/browser.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    var DEFAULT_MAX_STRING_LENGTH = 80;
    function htmlTreeAsString(elem, options = {}) {
      try {
        let currentElem = elem;
        const MAX_TRAVERSE_HEIGHT = 5;
        const out = [];
        let height = 0;
        let len = 0;
        const separator = " > ";
        const sepLength = separator.length;
        let nextStr;
        const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
        const maxStringLength =
          (!Array.isArray(options) && options.maxStringLength) ||
          DEFAULT_MAX_STRING_LENGTH;
        while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
          nextStr = _htmlElementAsString(currentElem, keyAttrs);
          if (
            nextStr === "html" ||
            (height > 1 &&
              len + out.length * sepLength + nextStr.length >= maxStringLength)
          ) {
            break;
          }
          out.push(nextStr);
          len += nextStr.length;
          currentElem = currentElem.parentNode;
        }
        return out.reverse().join(separator);
      } catch (_oO) {
        return "<unknown>";
      }
    }
    function _htmlElementAsString(el, keyAttrs) {
      const elem = el;
      const out = [];
      let className;
      let classes;
      let key;
      let attr;
      let i;
      if (!elem || !elem.tagName) {
        return "";
      }
      out.push(elem.tagName.toLowerCase());
      const keyAttrPairs =
        keyAttrs && keyAttrs.length
          ? keyAttrs
              .filter((keyAttr) => elem.getAttribute(keyAttr))
              .map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)])
          : null;
      if (keyAttrPairs && keyAttrPairs.length) {
        keyAttrPairs.forEach((keyAttrPair) => {
          out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
        });
      } else {
        if (elem.id) {
          out.push(`#${elem.id}`);
        }
        className = elem.className;
        if (className && is.isString(className)) {
          classes = className.split(/\s+/);
          for (i = 0; i < classes.length; i++) {
            out.push(`.${classes[i]}`);
          }
        }
      }
      const allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
      for (i = 0; i < allowedAttrs.length; i++) {
        key = allowedAttrs[i];
        attr = elem.getAttribute(key);
        if (attr) {
          out.push(`[${key}="${attr}"]`);
        }
      }
      return out.join("");
    }
    function getLocationHref() {
      try {
        return WINDOW.document.location.href;
      } catch (oO) {
        return "";
      }
    }
    function getDomElement(selector) {
      if (WINDOW.document && WINDOW.document.querySelector) {
        return WINDOW.document.querySelector(selector);
      }
      return null;
    }
    exports.getDomElement = getDomElement;
    exports.getLocationHref = getLocationHref;
    exports.htmlTreeAsString = htmlTreeAsString;
  },
});

// node_modules/@sentry/utils/cjs/logger.js
var require_logger = __commonJS({
  "node_modules/@sentry/utils/cjs/logger.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var worldwide = require_worldwide();
    var PREFIX = "Sentry Logger ";
    var CONSOLE_LEVELS = [
      "debug",
      "info",
      "warn",
      "error",
      "log",
      "assert",
      "trace",
    ];
    function consoleSandbox(callback) {
      if (!("console" in worldwide.GLOBAL_OBJ)) {
        return callback();
      }
      const originalConsole = worldwide.GLOBAL_OBJ.console;
      const wrappedLevels = {};
      CONSOLE_LEVELS.forEach((level) => {
        const originalWrappedFunc =
          originalConsole[level] && originalConsole[level].__sentry_original__;
        if (level in originalConsole && originalWrappedFunc) {
          wrappedLevels[level] = originalConsole[level];
          originalConsole[level] = originalWrappedFunc;
        }
      });
      try {
        return callback();
      } finally {
        Object.keys(wrappedLevels).forEach((level) => {
          originalConsole[level] = wrappedLevels[level];
        });
      }
    }
    function makeLogger() {
      let enabled = false;
      const logger = {
        enable: () => {
          enabled = true;
        },
        disable: () => {
          enabled = false;
        },
      };
      if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
        CONSOLE_LEVELS.forEach((name) => {
          logger[name] = (...args) => {
            if (enabled) {
              consoleSandbox(() => {
                worldwide.GLOBAL_OBJ.console[name](
                  `${PREFIX}[${name}]:`,
                  ...args,
                );
              });
            }
          };
        });
      } else {
        CONSOLE_LEVELS.forEach((name) => {
          logger[name] = () => void 0;
        });
      }
      return logger;
    }
    exports.logger = void 0;
    if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
      exports.logger = worldwide.getGlobalSingleton("logger", makeLogger);
    } else {
      exports.logger = makeLogger();
    }
    exports.CONSOLE_LEVELS = CONSOLE_LEVELS;
    exports.consoleSandbox = consoleSandbox;
  },
});

// node_modules/@sentry/utils/cjs/dsn.js
var require_dsn = __commonJS({
  "node_modules/@sentry/utils/cjs/dsn.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var logger = require_logger();
    var DSN_REGEX =
      /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    function isValidProtocol(protocol) {
      return protocol === "http" || protocol === "https";
    }
    function dsnToString(dsn, withPassword = false) {
      const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
      return `${protocol}://${publicKey}${
        withPassword && pass ? `:${pass}` : ""
      }@${host}${port ? `:${port}` : ""}/${
        path ? `${path}/` : path
      }${projectId}`;
    }
    function dsnFromString(str) {
      const match = DSN_REGEX.exec(str);
      if (!match) {
        console.error(`Invalid Sentry Dsn: ${str}`);
        return void 0;
      }
      const [protocol, publicKey, pass = "", host, port = "", lastPath] =
        match.slice(1);
      let path = "";
      let projectId = lastPath;
      const split = projectId.split("/");
      if (split.length > 1) {
        path = split.slice(0, -1).join("/");
        projectId = split.pop();
      }
      if (projectId) {
        const projectMatch = projectId.match(/^\d+/);
        if (projectMatch) {
          projectId = projectMatch[0];
        }
      }
      return dsnFromComponents({
        host,
        pass,
        path,
        projectId,
        port,
        protocol,
        publicKey,
      });
    }
    function dsnFromComponents(components) {
      return {
        protocol: components.protocol,
        publicKey: components.publicKey || "",
        pass: components.pass || "",
        host: components.host,
        port: components.port || "",
        path: components.path || "",
        projectId: components.projectId,
      };
    }
    function validateDsn(dsn) {
      if (!(typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__)) {
        return true;
      }
      const { port, projectId, protocol } = dsn;
      const requiredComponents = ["protocol", "publicKey", "host", "projectId"];
      const hasMissingRequiredComponent = requiredComponents.find(
        (component) => {
          if (!dsn[component]) {
            logger.logger.error(`Invalid Sentry Dsn: ${component} missing`);
            return true;
          }
          return false;
        },
      );
      if (hasMissingRequiredComponent) {
        return false;
      }
      if (!projectId.match(/^\d+$/)) {
        logger.logger.error(
          `Invalid Sentry Dsn: Invalid projectId ${projectId}`,
        );
        return false;
      }
      if (!isValidProtocol(protocol)) {
        logger.logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
        return false;
      }
      if (port && isNaN(parseInt(port, 10))) {
        logger.logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
        return false;
      }
      return true;
    }
    function makeDsn(from) {
      const components =
        typeof from === "string"
          ? dsnFromString(from)
          : dsnFromComponents(from);
      if (!components || !validateDsn(components)) {
        return void 0;
      }
      return components;
    }
    exports.dsnFromString = dsnFromString;
    exports.dsnToString = dsnToString;
    exports.makeDsn = makeDsn;
  },
});

// node_modules/@sentry/utils/cjs/error.js
var require_error = __commonJS({
  "node_modules/@sentry/utils/cjs/error.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var SentryError = class extends Error {
      constructor(message, logLevel = "warn") {
        super(message);
        this.message = message;
        this.name = new.target.prototype.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        this.logLevel = logLevel;
      }
    };
    exports.SentryError = SentryError;
  },
});

// node_modules/@sentry/utils/cjs/string.js
var require_string = __commonJS({
  "node_modules/@sentry/utils/cjs/string.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    function truncate(str, max = 0) {
      if (typeof str !== "string" || max === 0) {
        return str;
      }
      return str.length <= max ? str : `${str.slice(0, max)}...`;
    }
    function snipLine(line, colno) {
      let newLine = line;
      const lineLength = newLine.length;
      if (lineLength <= 150) {
        return newLine;
      }
      if (colno > lineLength) {
        colno = lineLength;
      }
      let start = Math.max(colno - 60, 0);
      if (start < 5) {
        start = 0;
      }
      let end = Math.min(start + 140, lineLength);
      if (end > lineLength - 5) {
        end = lineLength;
      }
      if (end === lineLength) {
        start = Math.max(end - 140, 0);
      }
      newLine = newLine.slice(start, end);
      if (start > 0) {
        newLine = `'{snip} ${newLine}`;
      }
      if (end < lineLength) {
        newLine += " {snip}";
      }
      return newLine;
    }
    function safeJoin(input, delimiter) {
      if (!Array.isArray(input)) {
        return "";
      }
      const output = [];
      for (let i = 0; i < input.length; i++) {
        const value = input[i];
        try {
          output.push(String(value));
        } catch (e) {
          output.push("[value cannot be serialized]");
        }
      }
      return output.join(delimiter);
    }
    function isMatchingPattern(
      value,
      pattern,
      requireExactStringMatch = false,
    ) {
      if (!is.isString(value)) {
        return false;
      }
      if (is.isRegExp(pattern)) {
        return pattern.test(value);
      }
      if (is.isString(pattern)) {
        return requireExactStringMatch
          ? value === pattern
          : value.includes(pattern);
      }
      return false;
    }
    function stringMatchesSomePattern(
      testString,
      patterns = [],
      requireExactStringMatch = false,
    ) {
      return patterns.some((pattern) =>
        isMatchingPattern(testString, pattern, requireExactStringMatch),
      );
    }
    exports.isMatchingPattern = isMatchingPattern;
    exports.safeJoin = safeJoin;
    exports.snipLine = snipLine;
    exports.stringMatchesSomePattern = stringMatchesSomePattern;
    exports.truncate = truncate;
  },
});

// node_modules/@sentry/utils/cjs/object.js
var require_object = __commonJS({
  "node_modules/@sentry/utils/cjs/object.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var browser = require_browser();
    var is = require_is();
    var string = require_string();
    function fill(source, name, replacementFactory) {
      if (!(name in source)) {
        return;
      }
      const original = source[name];
      const wrapped = replacementFactory(original);
      if (typeof wrapped === "function") {
        try {
          markFunctionWrapped(wrapped, original);
        } catch (_Oo) {}
      }
      source[name] = wrapped;
    }
    function addNonEnumerableProperty(obj, name, value) {
      Object.defineProperty(obj, name, {
        value,
        writable: true,
        configurable: true,
      });
    }
    function markFunctionWrapped(wrapped, original) {
      const proto = original.prototype || {};
      wrapped.prototype = original.prototype = proto;
      addNonEnumerableProperty(wrapped, "__sentry_original__", original);
    }
    function getOriginalFunction(func) {
      return func.__sentry_original__;
    }
    function urlEncode(object) {
      return Object.keys(object)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`,
        )
        .join("&");
    }
    function convertToPlainObject(value) {
      if (is.isError(value)) {
        return __spreadValues(
          {
            message: value.message,
            name: value.name,
            stack: value.stack,
          },
          getOwnProperties(value),
        );
      } else if (is.isEvent(value)) {
        const newObj = __spreadValues(
          {
            type: value.type,
            target: serializeEventTarget(value.target),
            currentTarget: serializeEventTarget(value.currentTarget),
          },
          getOwnProperties(value),
        );
        if (
          typeof CustomEvent !== "undefined" &&
          is.isInstanceOf(value, CustomEvent)
        ) {
          newObj.detail = value.detail;
        }
        return newObj;
      } else {
        return value;
      }
    }
    function serializeEventTarget(target) {
      try {
        return is.isElement(target)
          ? browser.htmlTreeAsString(target)
          : Object.prototype.toString.call(target);
      } catch (_oO) {
        return "<unknown>";
      }
    }
    function getOwnProperties(obj) {
      if (typeof obj === "object" && obj !== null) {
        const extractedProps = {};
        for (const property in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, property)) {
            extractedProps[property] = obj[property];
          }
        }
        return extractedProps;
      } else {
        return {};
      }
    }
    function extractExceptionKeysForMessage(exception, maxLength = 40) {
      const keys = Object.keys(convertToPlainObject(exception));
      keys.sort();
      if (!keys.length) {
        return "[object has no keys]";
      }
      if (keys[0].length >= maxLength) {
        return string.truncate(keys[0], maxLength);
      }
      for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        const serialized = keys.slice(0, includedKeys).join(", ");
        if (serialized.length > maxLength) {
          continue;
        }
        if (includedKeys === keys.length) {
          return serialized;
        }
        return string.truncate(serialized, maxLength);
      }
      return "";
    }
    function dropUndefinedKeys(inputValue) {
      const memoizationMap = /* @__PURE__ */ new Map();
      return _dropUndefinedKeys(inputValue, memoizationMap);
    }
    function _dropUndefinedKeys(inputValue, memoizationMap) {
      if (is.isPlainObject(inputValue)) {
        const memoVal = memoizationMap.get(inputValue);
        if (memoVal !== void 0) {
          return memoVal;
        }
        const returnValue = {};
        memoizationMap.set(inputValue, returnValue);
        for (const key of Object.keys(inputValue)) {
          if (typeof inputValue[key] !== "undefined") {
            returnValue[key] = _dropUndefinedKeys(
              inputValue[key],
              memoizationMap,
            );
          }
        }
        return returnValue;
      }
      if (Array.isArray(inputValue)) {
        const memoVal = memoizationMap.get(inputValue);
        if (memoVal !== void 0) {
          return memoVal;
        }
        const returnValue = [];
        memoizationMap.set(inputValue, returnValue);
        inputValue.forEach((item) => {
          returnValue.push(_dropUndefinedKeys(item, memoizationMap));
        });
        return returnValue;
      }
      return inputValue;
    }
    function objectify(wat) {
      let objectified;
      switch (true) {
        case wat === void 0 || wat === null:
          objectified = new String(wat);
          break;
        case typeof wat === "symbol" || typeof wat === "bigint":
          objectified = Object(wat);
          break;
        case is.isPrimitive(wat):
          objectified = new wat.constructor(wat);
          break;
        default:
          objectified = wat;
          break;
      }
      return objectified;
    }
    exports.addNonEnumerableProperty = addNonEnumerableProperty;
    exports.convertToPlainObject = convertToPlainObject;
    exports.dropUndefinedKeys = dropUndefinedKeys;
    exports.extractExceptionKeysForMessage = extractExceptionKeysForMessage;
    exports.fill = fill;
    exports.getOriginalFunction = getOriginalFunction;
    exports.markFunctionWrapped = markFunctionWrapped;
    exports.objectify = objectify;
    exports.urlEncode = urlEncode;
  },
});

// node_modules/@sentry/utils/cjs/node-stack-trace.js
var require_node_stack_trace = __commonJS({
  "node_modules/@sentry/utils/cjs/node-stack-trace.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function node(getModule) {
      const FILENAME_MATCH = /^\s*[-]{4,}$/;
      const FULL_MATCH =
        /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
      return (line) => {
        const lineMatch = line.match(FULL_MATCH);
        if (lineMatch) {
          let object;
          let method;
          let functionName;
          let typeName;
          let methodName;
          if (lineMatch[1]) {
            functionName = lineMatch[1];
            let methodStart = functionName.lastIndexOf(".");
            if (functionName[methodStart - 1] === ".") {
              methodStart--;
            }
            if (methodStart > 0) {
              object = functionName.slice(0, methodStart);
              method = functionName.slice(methodStart + 1);
              const objectEnd = object.indexOf(".Module");
              if (objectEnd > 0) {
                functionName = functionName.slice(objectEnd + 1);
                object = object.slice(0, objectEnd);
              }
            }
            typeName = void 0;
          }
          if (method) {
            typeName = object;
            methodName = method;
          }
          if (method === "<anonymous>") {
            methodName = void 0;
            functionName = void 0;
          }
          if (functionName === void 0) {
            methodName = methodName || "<anonymous>";
            functionName = typeName ? `${typeName}.${methodName}` : methodName;
          }
          let filename =
            lineMatch[2] && lineMatch[2].startsWith("file://")
              ? lineMatch[2].slice(7)
              : lineMatch[2];
          const isNative = lineMatch[5] === "native";
          if (!filename && lineMatch[5] && !isNative) {
            filename = lineMatch[5];
          }
          const isInternal =
            isNative ||
            (filename &&
              !filename.startsWith("/") &&
              !filename.includes(":\\") &&
              !filename.startsWith(".") &&
              !filename.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//));
          const in_app =
            !isInternal &&
            filename !== void 0 &&
            !filename.includes("node_modules/");
          return {
            filename,
            module: getModule ? getModule(filename) : void 0,
            function: functionName,
            lineno: parseInt(lineMatch[3], 10) || void 0,
            colno: parseInt(lineMatch[4], 10) || void 0,
            in_app,
          };
        }
        if (line.match(FILENAME_MATCH)) {
          return {
            filename: line,
          };
        }
        return void 0;
      };
    }
    exports.node = node;
  },
});

// node_modules/@sentry/utils/cjs/stacktrace.js
var require_stacktrace = __commonJS({
  "node_modules/@sentry/utils/cjs/stacktrace.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var nodeStackTrace = require_node_stack_trace();
    var STACKTRACE_FRAME_LIMIT = 50;
    var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
    function createStackParser(...parsers) {
      const sortedParsers = parsers
        .sort((a, b) => a[0] - b[0])
        .map((p) => p[1]);
      return (stack, skipFirst = 0) => {
        const frames = [];
        const lines = stack.split("\n");
        for (let i = skipFirst; i < lines.length; i++) {
          const line = lines[i];
          if (line.length > 1024) {
            continue;
          }
          const cleanedLine = WEBPACK_ERROR_REGEXP.test(line)
            ? line.replace(WEBPACK_ERROR_REGEXP, "$1")
            : line;
          if (cleanedLine.match(/\S*Error: /)) {
            continue;
          }
          for (const parser of sortedParsers) {
            const frame = parser(cleanedLine);
            if (frame) {
              frames.push(frame);
              break;
            }
          }
          if (frames.length >= STACKTRACE_FRAME_LIMIT) {
            break;
          }
        }
        return stripSentryFramesAndReverse(frames);
      };
    }
    function stackParserFromStackParserOptions(stackParser) {
      if (Array.isArray(stackParser)) {
        return createStackParser(...stackParser);
      }
      return stackParser;
    }
    function stripSentryFramesAndReverse(stack) {
      if (!stack.length) {
        return [];
      }
      const localStack = stack.slice(0, STACKTRACE_FRAME_LIMIT);
      const lastFrameFunction = localStack[localStack.length - 1].function;
      if (lastFrameFunction && /sentryWrapped/.test(lastFrameFunction)) {
        localStack.pop();
      }
      localStack.reverse();
      const firstFrameFunction = localStack[localStack.length - 1].function;
      if (
        firstFrameFunction &&
        /captureMessage|captureException/.test(firstFrameFunction)
      ) {
        localStack.pop();
      }
      return localStack.map((frame) =>
        __spreadProps(__spreadValues({}, frame), {
          filename:
            frame.filename || localStack[localStack.length - 1].filename,
          function: frame.function || "?",
        }),
      );
    }
    var defaultFunctionName = "<anonymous>";
    function getFunctionName(fn) {
      try {
        if (!fn || typeof fn !== "function") {
          return defaultFunctionName;
        }
        return fn.name || defaultFunctionName;
      } catch (e) {
        return defaultFunctionName;
      }
    }
    function nodeStackLineParser(getModule) {
      return [90, nodeStackTrace.node(getModule)];
    }
    exports.createStackParser = createStackParser;
    exports.getFunctionName = getFunctionName;
    exports.nodeStackLineParser = nodeStackLineParser;
    exports.stackParserFromStackParserOptions =
      stackParserFromStackParserOptions;
    exports.stripSentryFramesAndReverse = stripSentryFramesAndReverse;
  },
});

// node_modules/@sentry/utils/cjs/supports.js
var require_supports = __commonJS({
  "node_modules/@sentry/utils/cjs/supports.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var logger = require_logger();
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    function supportsErrorEvent() {
      try {
        new ErrorEvent("");
        return true;
      } catch (e) {
        return false;
      }
    }
    function supportsDOMError() {
      try {
        new DOMError("");
        return true;
      } catch (e) {
        return false;
      }
    }
    function supportsDOMException() {
      try {
        new DOMException("");
        return true;
      } catch (e) {
        return false;
      }
    }
    function supportsFetch() {
      if (!("fetch" in WINDOW)) {
        return false;
      }
      try {
        new Headers();
        new Request("http://www.example.com");
        new Response();
        return true;
      } catch (e) {
        return false;
      }
    }
    function isNativeFetch(func) {
      return (
        func &&
        /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString())
      );
    }
    function supportsNativeFetch() {
      if (!supportsFetch()) {
        return false;
      }
      if (isNativeFetch(WINDOW.fetch)) {
        return true;
      }
      let result = false;
      const doc = WINDOW.document;
      if (doc && typeof doc.createElement === "function") {
        try {
          const sandbox = doc.createElement("iframe");
          sandbox.hidden = true;
          doc.head.appendChild(sandbox);
          if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
            result = isNativeFetch(sandbox.contentWindow.fetch);
          }
          doc.head.removeChild(sandbox);
        } catch (err) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            logger.logger.warn(
              "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
              err,
            );
        }
      }
      return result;
    }
    function supportsReportingObserver() {
      return "ReportingObserver" in WINDOW;
    }
    function supportsReferrerPolicy() {
      if (!supportsFetch()) {
        return false;
      }
      try {
        new Request("_", {
          referrerPolicy: "origin",
        });
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isNativeFetch = isNativeFetch;
    exports.supportsDOMError = supportsDOMError;
    exports.supportsDOMException = supportsDOMException;
    exports.supportsErrorEvent = supportsErrorEvent;
    exports.supportsFetch = supportsFetch;
    exports.supportsNativeFetch = supportsNativeFetch;
    exports.supportsReferrerPolicy = supportsReferrerPolicy;
    exports.supportsReportingObserver = supportsReportingObserver;
  },
});

// node_modules/@sentry/utils/cjs/vendor/supportsHistory.js
var require_supportsHistory = __commonJS({
  "node_modules/@sentry/utils/cjs/vendor/supportsHistory.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    function supportsHistory() {
      const chrome = WINDOW.chrome;
      const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
      const hasHistoryApi =
        "history" in WINDOW &&
        !!WINDOW.history.pushState &&
        !!WINDOW.history.replaceState;
      return !isChromePackagedApp && hasHistoryApi;
    }
    exports.supportsHistory = supportsHistory;
  },
});

// node_modules/@sentry/utils/cjs/instrument.js
var require_instrument = __commonJS({
  "node_modules/@sentry/utils/cjs/instrument.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var logger = require_logger();
    var object = require_object();
    var stacktrace = require_stacktrace();
    var supports = require_supports();
    var worldwide = require_worldwide();
    var supportsHistory = require_supportsHistory();
    var WINDOW = worldwide.getGlobalObject();
    var SENTRY_XHR_DATA_KEY = "__sentry_xhr_v2__";
    var handlers = {};
    var instrumented = {};
    function instrument(type) {
      if (instrumented[type]) {
        return;
      }
      instrumented[type] = true;
      switch (type) {
        case "console":
          instrumentConsole();
          break;
        case "dom":
          instrumentDOM();
          break;
        case "xhr":
          instrumentXHR();
          break;
        case "fetch":
          instrumentFetch();
          break;
        case "history":
          instrumentHistory();
          break;
        case "error":
          instrumentError();
          break;
        case "unhandledrejection":
          instrumentUnhandledRejection();
          break;
        default:
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            logger.logger.warn("unknown instrumentation type:", type);
          return;
      }
    }
    function addInstrumentationHandler(type, callback) {
      handlers[type] = handlers[type] || [];
      handlers[type].push(callback);
      instrument(type);
    }
    function triggerHandlers(type, data) {
      if (!type || !handlers[type]) {
        return;
      }
      for (const handler2 of handlers[type] || []) {
        try {
          handler2(data);
        } catch (e) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            logger.logger.error(
              `Error while triggering instrumentation handler.
Type: ${type}
Name: ${stacktrace.getFunctionName(handler2)}
Error:`,
              e,
            );
        }
      }
    }
    function instrumentConsole() {
      if (!("console" in WINDOW)) {
        return;
      }
      logger.CONSOLE_LEVELS.forEach(function (level) {
        if (!(level in WINDOW.console)) {
          return;
        }
        object.fill(WINDOW.console, level, function (originalConsoleMethod) {
          return function (...args) {
            triggerHandlers("console", { args, level });
            if (originalConsoleMethod) {
              originalConsoleMethod.apply(WINDOW.console, args);
            }
          };
        });
      });
    }
    function instrumentFetch() {
      if (!supports.supportsNativeFetch()) {
        return;
      }
      object.fill(WINDOW, "fetch", function (originalFetch) {
        return function (...args) {
          const { method, url } = parseFetchArgs(args);
          const handlerData = {
            args,
            fetchData: {
              method,
              url,
            },
            startTimestamp: Date.now(),
          };
          triggerHandlers("fetch", __spreadValues({}, handlerData));
          return originalFetch.apply(WINDOW, args).then(
            (response) => {
              triggerHandlers(
                "fetch",
                __spreadProps(__spreadValues({}, handlerData), {
                  endTimestamp: Date.now(),
                  response,
                }),
              );
              return response;
            },
            (error) => {
              triggerHandlers(
                "fetch",
                __spreadProps(__spreadValues({}, handlerData), {
                  endTimestamp: Date.now(),
                  error,
                }),
              );
              throw error;
            },
          );
        };
      });
    }
    function hasProp(obj, prop) {
      return !!obj && typeof obj === "object" && !!obj[prop];
    }
    function getUrlFromResource(resource) {
      if (typeof resource === "string") {
        return resource;
      }
      if (!resource) {
        return "";
      }
      if (hasProp(resource, "url")) {
        return resource.url;
      }
      if (resource.toString) {
        return resource.toString();
      }
      return "";
    }
    function parseFetchArgs(fetchArgs) {
      if (fetchArgs.length === 0) {
        return { method: "GET", url: "" };
      }
      if (fetchArgs.length === 2) {
        const [url, options] = fetchArgs;
        return {
          url: getUrlFromResource(url),
          method: hasProp(options, "method")
            ? String(options.method).toUpperCase()
            : "GET",
        };
      }
      const arg = fetchArgs[0];
      return {
        url: getUrlFromResource(arg),
        method: hasProp(arg, "method")
          ? String(arg.method).toUpperCase()
          : "GET",
      };
    }
    function instrumentXHR() {
      if (!("XMLHttpRequest" in WINDOW)) {
        return;
      }
      const xhrproto = XMLHttpRequest.prototype;
      object.fill(xhrproto, "open", function (originalOpen) {
        return function (...args) {
          const url = args[1];
          const xhrInfo = (this[SENTRY_XHR_DATA_KEY] = {
            method: is.isString(args[0]) ? args[0].toUpperCase() : args[0],
            url: args[1],
            request_headers: {},
          });
          if (
            is.isString(url) &&
            xhrInfo.method === "POST" &&
            url.match(/sentry_key/)
          ) {
            this.__sentry_own_request__ = true;
          }
          const onreadystatechangeHandler = () => {
            const xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
            if (!xhrInfo2) {
              return;
            }
            if (this.readyState === 4) {
              try {
                xhrInfo2.status_code = this.status;
              } catch (e) {}
              triggerHandlers("xhr", {
                args,
                endTimestamp: Date.now(),
                startTimestamp: Date.now(),
                xhr: this,
              });
            }
          };
          if (
            "onreadystatechange" in this &&
            typeof this.onreadystatechange === "function"
          ) {
            object.fill(this, "onreadystatechange", function (original) {
              return function (...readyStateArgs) {
                onreadystatechangeHandler();
                return original.apply(this, readyStateArgs);
              };
            });
          } else {
            this.addEventListener(
              "readystatechange",
              onreadystatechangeHandler,
            );
          }
          object.fill(this, "setRequestHeader", function (original) {
            return function (...setRequestHeaderArgs) {
              const [header, value] = setRequestHeaderArgs;
              const xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
              if (xhrInfo2) {
                xhrInfo2.request_headers[header.toLowerCase()] = value;
              }
              return original.apply(this, setRequestHeaderArgs);
            };
          });
          return originalOpen.apply(this, args);
        };
      });
      object.fill(xhrproto, "send", function (originalSend) {
        return function (...args) {
          const sentryXhrData = this[SENTRY_XHR_DATA_KEY];
          if (sentryXhrData && args[0] !== void 0) {
            sentryXhrData.body = args[0];
          }
          triggerHandlers("xhr", {
            args,
            startTimestamp: Date.now(),
            xhr: this,
          });
          return originalSend.apply(this, args);
        };
      });
    }
    var lastHref;
    function instrumentHistory() {
      if (!supportsHistory.supportsHistory()) {
        return;
      }
      const oldOnPopState = WINDOW.onpopstate;
      WINDOW.onpopstate = function (...args) {
        const to = WINDOW.location.href;
        const from = lastHref;
        lastHref = to;
        triggerHandlers("history", {
          from,
          to,
        });
        if (oldOnPopState) {
          try {
            return oldOnPopState.apply(this, args);
          } catch (_oO) {}
        }
      };
      function historyReplacementFunction(originalHistoryFunction) {
        return function (...args) {
          const url = args.length > 2 ? args[2] : void 0;
          if (url) {
            const from = lastHref;
            const to = String(url);
            lastHref = to;
            triggerHandlers("history", {
              from,
              to,
            });
          }
          return originalHistoryFunction.apply(this, args);
        };
      }
      object.fill(WINDOW.history, "pushState", historyReplacementFunction);
      object.fill(WINDOW.history, "replaceState", historyReplacementFunction);
    }
    var debounceDuration = 1e3;
    var debounceTimerID;
    var lastCapturedEvent;
    function shouldShortcircuitPreviousDebounce(previous, current) {
      if (!previous) {
        return true;
      }
      if (previous.type !== current.type) {
        return true;
      }
      try {
        if (previous.target !== current.target) {
          return true;
        }
      } catch (e) {}
      return false;
    }
    function shouldSkipDOMEvent(event) {
      if (event.type !== "keypress") {
        return false;
      }
      try {
        const target = event.target;
        if (!target || !target.tagName) {
          return true;
        }
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return false;
        }
      } catch (e) {}
      return true;
    }
    function makeDOMEventHandler(handler2, globalListener = false) {
      return (event) => {
        if (!event || lastCapturedEvent === event) {
          return;
        }
        if (shouldSkipDOMEvent(event)) {
          return;
        }
        const name = event.type === "keypress" ? "input" : event.type;
        if (debounceTimerID === void 0) {
          handler2({
            event,
            name,
            global: globalListener,
          });
          lastCapturedEvent = event;
        } else if (
          shouldShortcircuitPreviousDebounce(lastCapturedEvent, event)
        ) {
          handler2({
            event,
            name,
            global: globalListener,
          });
          lastCapturedEvent = event;
        }
        clearTimeout(debounceTimerID);
        debounceTimerID = WINDOW.setTimeout(() => {
          debounceTimerID = void 0;
        }, debounceDuration);
      };
    }
    function instrumentDOM() {
      if (!("document" in WINDOW)) {
        return;
      }
      const triggerDOMHandler = triggerHandlers.bind(null, "dom");
      const globalDOMEventHandler = makeDOMEventHandler(
        triggerDOMHandler,
        true,
      );
      WINDOW.document.addEventListener("click", globalDOMEventHandler, false);
      WINDOW.document.addEventListener(
        "keypress",
        globalDOMEventHandler,
        false,
      );
      ["EventTarget", "Node"].forEach((target) => {
        const proto = WINDOW[target] && WINDOW[target].prototype;
        if (
          !proto ||
          !proto.hasOwnProperty ||
          !proto.hasOwnProperty("addEventListener")
        ) {
          return;
        }
        object.fill(
          proto,
          "addEventListener",
          function (originalAddEventListener) {
            return function (type, listener, options) {
              if (type === "click" || type == "keypress") {
                try {
                  const el = this;
                  const handlers2 = (el.__sentry_instrumentation_handlers__ =
                    el.__sentry_instrumentation_handlers__ || {});
                  const handlerForType = (handlers2[type] = handlers2[type] || {
                    refCount: 0,
                  });
                  if (!handlerForType.handler) {
                    const handler2 = makeDOMEventHandler(triggerDOMHandler);
                    handlerForType.handler = handler2;
                    originalAddEventListener.call(
                      this,
                      type,
                      handler2,
                      options,
                    );
                  }
                  handlerForType.refCount++;
                } catch (e) {}
              }
              return originalAddEventListener.call(
                this,
                type,
                listener,
                options,
              );
            };
          },
        );
        object.fill(
          proto,
          "removeEventListener",
          function (originalRemoveEventListener) {
            return function (type, listener, options) {
              if (type === "click" || type == "keypress") {
                try {
                  const el = this;
                  const handlers2 =
                    el.__sentry_instrumentation_handlers__ || {};
                  const handlerForType = handlers2[type];
                  if (handlerForType) {
                    handlerForType.refCount--;
                    if (handlerForType.refCount <= 0) {
                      originalRemoveEventListener.call(
                        this,
                        type,
                        handlerForType.handler,
                        options,
                      );
                      handlerForType.handler = void 0;
                      delete handlers2[type];
                    }
                    if (Object.keys(handlers2).length === 0) {
                      delete el.__sentry_instrumentation_handlers__;
                    }
                  }
                } catch (e) {}
              }
              return originalRemoveEventListener.call(
                this,
                type,
                listener,
                options,
              );
            };
          },
        );
      });
    }
    var _oldOnErrorHandler = null;
    function instrumentError() {
      _oldOnErrorHandler = WINDOW.onerror;
      WINDOW.onerror = function (msg, url, line, column, error) {
        triggerHandlers("error", {
          column,
          error,
          line,
          msg,
          url,
        });
        if (_oldOnErrorHandler && !_oldOnErrorHandler.__SENTRY_LOADER__) {
          return _oldOnErrorHandler.apply(this, arguments);
        }
        return false;
      };
      WINDOW.onerror.__SENTRY_INSTRUMENTED__ = true;
    }
    var _oldOnUnhandledRejectionHandler = null;
    function instrumentUnhandledRejection() {
      _oldOnUnhandledRejectionHandler = WINDOW.onunhandledrejection;
      WINDOW.onunhandledrejection = function (e) {
        triggerHandlers("unhandledrejection", e);
        if (
          _oldOnUnhandledRejectionHandler &&
          !_oldOnUnhandledRejectionHandler.__SENTRY_LOADER__
        ) {
          return _oldOnUnhandledRejectionHandler.apply(this, arguments);
        }
        return true;
      };
      WINDOW.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
    }
    exports.SENTRY_XHR_DATA_KEY = SENTRY_XHR_DATA_KEY;
    exports.addInstrumentationHandler = addInstrumentationHandler;
    exports.parseFetchArgs = parseFetchArgs;
  },
});

// node_modules/@sentry/utils/cjs/memo.js
var require_memo = __commonJS({
  "node_modules/@sentry/utils/cjs/memo.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoBuilder() {
      const hasWeakSet = typeof WeakSet === "function";
      const inner = hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
      function memoize(obj) {
        if (hasWeakSet) {
          if (inner.has(obj)) {
            return true;
          }
          inner.add(obj);
          return false;
        }
        for (let i = 0; i < inner.length; i++) {
          const value = inner[i];
          if (value === obj) {
            return true;
          }
        }
        inner.push(obj);
        return false;
      }
      function unmemoize(obj) {
        if (hasWeakSet) {
          inner.delete(obj);
        } else {
          for (let i = 0; i < inner.length; i++) {
            if (inner[i] === obj) {
              inner.splice(i, 1);
              break;
            }
          }
        }
      }
      return [memoize, unmemoize];
    }
    exports.memoBuilder = memoBuilder;
  },
});

// node_modules/@sentry/utils/cjs/misc.js
var require_misc = __commonJS({
  "node_modules/@sentry/utils/cjs/misc.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var object = require_object();
    var string = require_string();
    var worldwide = require_worldwide();
    function uuid4() {
      const gbl = worldwide.GLOBAL_OBJ;
      const crypto4 = gbl.crypto || gbl.msCrypto;
      if (crypto4 && crypto4.randomUUID) {
        return crypto4.randomUUID().replace(/-/g, "");
      }
      const getRandomByte =
        crypto4 && crypto4.getRandomValues
          ? () => crypto4.getRandomValues(new Uint8Array(1))[0]
          : () => Math.random() * 16;
      return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
        (c ^ ((getRandomByte() & 15) >> (c / 4))).toString(16),
      );
    }
    function getFirstException(event) {
      return event.exception && event.exception.values
        ? event.exception.values[0]
        : void 0;
    }
    function getEventDescription(event) {
      const { message, event_id: eventId } = event;
      if (message) {
        return message;
      }
      const firstException = getFirstException(event);
      if (firstException) {
        if (firstException.type && firstException.value) {
          return `${firstException.type}: ${firstException.value}`;
        }
        return (
          firstException.type || firstException.value || eventId || "<unknown>"
        );
      }
      return eventId || "<unknown>";
    }
    function addExceptionTypeValue(event, value, type) {
      const exception = (event.exception = event.exception || {});
      const values = (exception.values = exception.values || []);
      const firstException = (values[0] = values[0] || {});
      if (!firstException.value) {
        firstException.value = value || "";
      }
      if (!firstException.type) {
        firstException.type = type || "Error";
      }
    }
    function addExceptionMechanism(event, newMechanism) {
      const firstException = getFirstException(event);
      if (!firstException) {
        return;
      }
      const defaultMechanism = { type: "generic", handled: true };
      const currentMechanism = firstException.mechanism;
      firstException.mechanism = __spreadValues(
        __spreadValues(__spreadValues({}, defaultMechanism), currentMechanism),
        newMechanism,
      );
      if (newMechanism && "data" in newMechanism) {
        const mergedData = __spreadValues(
          __spreadValues({}, currentMechanism && currentMechanism.data),
          newMechanism.data,
        );
        firstException.mechanism.data = mergedData;
      }
    }
    var SEMVER_REGEXP =
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    function parseSemver(input) {
      const match = input.match(SEMVER_REGEXP) || [];
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      const patch = parseInt(match[3], 10);
      return {
        buildmetadata: match[5],
        major: isNaN(major) ? void 0 : major,
        minor: isNaN(minor) ? void 0 : minor,
        patch: isNaN(patch) ? void 0 : patch,
        prerelease: match[4],
      };
    }
    function addContextToFrame(lines, frame, linesOfContext = 5) {
      if (frame.lineno === void 0) {
        return;
      }
      const maxLines = lines.length;
      const sourceLine = Math.max(Math.min(maxLines, frame.lineno - 1), 0);
      frame.pre_context = lines
        .slice(Math.max(0, sourceLine - linesOfContext), sourceLine)
        .map((line) => string.snipLine(line, 0));
      frame.context_line = string.snipLine(
        lines[Math.min(maxLines - 1, sourceLine)],
        frame.colno || 0,
      );
      frame.post_context = lines
        .slice(
          Math.min(sourceLine + 1, maxLines),
          sourceLine + 1 + linesOfContext,
        )
        .map((line) => string.snipLine(line, 0));
    }
    function checkOrSetAlreadyCaught(exception) {
      if (exception && exception.__sentry_captured__) {
        return true;
      }
      try {
        object.addNonEnumerableProperty(exception, "__sentry_captured__", true);
      } catch (err) {}
      return false;
    }
    function arrayify(maybeArray) {
      return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
    }
    exports.addContextToFrame = addContextToFrame;
    exports.addExceptionMechanism = addExceptionMechanism;
    exports.addExceptionTypeValue = addExceptionTypeValue;
    exports.arrayify = arrayify;
    exports.checkOrSetAlreadyCaught = checkOrSetAlreadyCaught;
    exports.getEventDescription = getEventDescription;
    exports.parseSemver = parseSemver;
    exports.uuid4 = uuid4;
  },
});

// node_modules/@sentry/utils/cjs/env.js
var require_env = __commonJS({
  "node_modules/@sentry/utils/cjs/env.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function isBrowserBundle() {
      return (
        typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" &&
        !!__SENTRY_BROWSER_BUNDLE__
      );
    }
    function getSDKSource() {
      return "npm";
    }
    exports.getSDKSource = getSDKSource;
    exports.isBrowserBundle = isBrowserBundle;
  },
});

// node_modules/@sentry/utils/cjs/node.js
var require_node = __commonJS({
  "node_modules/@sentry/utils/cjs/node.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var env = require_env();
    function isNodeEnv() {
      return (
        !env.isBrowserBundle() &&
        Object.prototype.toString.call(
          typeof process !== "undefined" ? process : 0,
        ) === "[object process]"
      );
    }
    function dynamicRequire(mod, request) {
      return mod.require(request);
    }
    function loadModule(moduleName) {
      let mod;
      try {
        mod = dynamicRequire(module2, moduleName);
      } catch (e) {}
      try {
        const { cwd } = dynamicRequire(module2, "process");
        mod = dynamicRequire(module2, `${cwd()}/node_modules/${moduleName}`);
      } catch (e) {}
      return mod;
    }
    exports.dynamicRequire = dynamicRequire;
    exports.isNodeEnv = isNodeEnv;
    exports.loadModule = loadModule;
  },
});

// node_modules/@sentry/utils/cjs/normalize.js
var require_normalize = __commonJS({
  "node_modules/@sentry/utils/cjs/normalize.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var memo = require_memo();
    var object = require_object();
    var stacktrace = require_stacktrace();
    function normalize(input, depth = 100, maxProperties = Infinity) {
      try {
        return visit("", input, depth, maxProperties);
      } catch (err) {
        return { ERROR: `**non-serializable** (${err})` };
      }
    }
    function normalizeToSize(object2, depth = 3, maxSize = 100 * 1024) {
      const normalized = normalize(object2, depth);
      if (jsonSize(normalized) > maxSize) {
        return normalizeToSize(object2, depth - 1, maxSize);
      }
      return normalized;
    }
    function visit(
      key,
      value,
      depth = Infinity,
      maxProperties = Infinity,
      memo$1 = memo.memoBuilder(),
    ) {
      const [memoize, unmemoize] = memo$1;
      if (
        value == null ||
        (["number", "boolean", "string"].includes(typeof value) &&
          !is.isNaN(value))
      ) {
        return value;
      }
      const stringified = stringifyValue(key, value);
      if (!stringified.startsWith("[object ")) {
        return stringified;
      }
      if (value["__sentry_skip_normalization__"]) {
        return value;
      }
      const remainingDepth =
        typeof value["__sentry_override_normalization_depth__"] === "number"
          ? value["__sentry_override_normalization_depth__"]
          : depth;
      if (remainingDepth === 0) {
        return stringified.replace("object ", "");
      }
      if (memoize(value)) {
        return "[Circular ~]";
      }
      const valueWithToJSON = value;
      if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
        try {
          const jsonValue = valueWithToJSON.toJSON();
          return visit(
            "",
            jsonValue,
            remainingDepth - 1,
            maxProperties,
            memo$1,
          );
        } catch (err) {}
      }
      const normalized = Array.isArray(value) ? [] : {};
      let numAdded = 0;
      const visitable = object.convertToPlainObject(value);
      for (const visitKey in visitable) {
        if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
          continue;
        }
        if (numAdded >= maxProperties) {
          normalized[visitKey] = "[MaxProperties ~]";
          break;
        }
        const visitValue = visitable[visitKey];
        normalized[visitKey] = visit(
          visitKey,
          visitValue,
          remainingDepth - 1,
          maxProperties,
          memo$1,
        );
        numAdded++;
      }
      unmemoize(value);
      return normalized;
    }
    function stringifyValue(key, value) {
      try {
        if (
          key === "domain" &&
          value &&
          typeof value === "object" &&
          value._events
        ) {
          return "[Domain]";
        }
        if (key === "domainEmitter") {
          return "[DomainEmitter]";
        }
        if (typeof global !== "undefined" && value === global) {
          return "[Global]";
        }
        if (typeof window !== "undefined" && value === window) {
          return "[Window]";
        }
        if (typeof document !== "undefined" && value === document) {
          return "[Document]";
        }
        if (is.isSyntheticEvent(value)) {
          return "[SyntheticEvent]";
        }
        if (typeof value === "number" && value !== value) {
          return "[NaN]";
        }
        if (typeof value === "function") {
          return `[Function: ${stacktrace.getFunctionName(value)}]`;
        }
        if (typeof value === "symbol") {
          return `[${String(value)}]`;
        }
        if (typeof value === "bigint") {
          return `[BigInt: ${String(value)}]`;
        }
        const objName = getConstructorName(value);
        if (/^HTML(\w*)Element$/.test(objName)) {
          return `[HTMLElement: ${objName}]`;
        }
        return `[object ${objName}]`;
      } catch (err) {
        return `**non-serializable** (${err})`;
      }
    }
    function getConstructorName(value) {
      const prototype = Object.getPrototypeOf(value);
      return prototype ? prototype.constructor.name : "null prototype";
    }
    function utf8Length(value) {
      return ~-encodeURI(value).split(/%..|./).length;
    }
    function jsonSize(value) {
      return utf8Length(JSON.stringify(value));
    }
    exports.normalize = normalize;
    exports.normalizeToSize = normalizeToSize;
    exports.walk = visit;
  },
});

// node_modules/@sentry/utils/cjs/path.js
var require_path = __commonJS({
  "node_modules/@sentry/utils/cjs/path.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function normalizeArray(parts, allowAboveRoot) {
      let up = 0;
      for (let i = parts.length - 1; i >= 0; i--) {
        const last = parts[i];
        if (last === ".") {
          parts.splice(i, 1);
        } else if (last === "..") {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up--; up) {
          parts.unshift("..");
        }
      }
      return parts;
    }
    var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
    function splitPath(filename) {
      const parts = splitPathRe.exec(filename);
      return parts ? parts.slice(1) : [];
    }
    function resolve(...args) {
      let resolvedPath = "";
      let resolvedAbsolute = false;
      for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        const path = i >= 0 ? args[i] : "/";
        if (!path) {
          continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charAt(0) === "/";
      }
      resolvedPath = normalizeArray(
        resolvedPath.split("/").filter((p) => !!p),
        !resolvedAbsolute,
      ).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    }
    function trim(arr) {
      let start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") {
          break;
        }
      }
      let end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") {
          break;
        }
      }
      if (start > end) {
        return [];
      }
      return arr.slice(start, end - start + 1);
    }
    function relative(from, to) {
      from = resolve(from).slice(1);
      to = resolve(to).slice(1);
      const fromParts = trim(from.split("/"));
      const toParts = trim(to.split("/"));
      const length = Math.min(fromParts.length, toParts.length);
      let samePartsLength = length;
      for (let i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      let outputParts = [];
      for (let i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    }
    function normalizePath(path) {
      const isPathAbsolute = isAbsolute(path);
      const trailingSlash = path.slice(-1) === "/";
      let normalizedPath = normalizeArray(
        path.split("/").filter((p) => !!p),
        !isPathAbsolute,
      ).join("/");
      if (!normalizedPath && !isPathAbsolute) {
        normalizedPath = ".";
      }
      if (normalizedPath && trailingSlash) {
        normalizedPath += "/";
      }
      return (isPathAbsolute ? "/" : "") + normalizedPath;
    }
    function isAbsolute(path) {
      return path.charAt(0) === "/";
    }
    function join(...args) {
      return normalizePath(args.join("/"));
    }
    function dirname(path) {
      const result = splitPath(path);
      const root = result[0];
      let dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.slice(0, dir.length - 1);
      }
      return root + dir;
    }
    function basename(path, ext) {
      let f = splitPath(path)[2];
      if (ext && f.slice(ext.length * -1) === ext) {
        f = f.slice(0, f.length - ext.length);
      }
      return f;
    }
    exports.basename = basename;
    exports.dirname = dirname;
    exports.isAbsolute = isAbsolute;
    exports.join = join;
    exports.normalizePath = normalizePath;
    exports.relative = relative;
    exports.resolve = resolve;
  },
});

// node_modules/@sentry/utils/cjs/syncpromise.js
var require_syncpromise = __commonJS({
  "node_modules/@sentry/utils/cjs/syncpromise.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var States;
    (function (States2) {
      const PENDING = 0;
      States2[(States2["PENDING"] = PENDING)] = "PENDING";
      const RESOLVED = 1;
      States2[(States2["RESOLVED"] = RESOLVED)] = "RESOLVED";
      const REJECTED = 2;
      States2[(States2["REJECTED"] = REJECTED)] = "REJECTED";
    })(States || (States = {}));
    function resolvedSyncPromise(value) {
      return new SyncPromise((resolve) => {
        resolve(value);
      });
    }
    function rejectedSyncPromise(reason) {
      return new SyncPromise((_, reject) => {
        reject(reason);
      });
    }
    var SyncPromise = class {
      __init() {
        this._state = States.PENDING;
      }
      __init2() {
        this._handlers = [];
      }
      constructor(executor) {
        SyncPromise.prototype.__init.call(this);
        SyncPromise.prototype.__init2.call(this);
        SyncPromise.prototype.__init3.call(this);
        SyncPromise.prototype.__init4.call(this);
        SyncPromise.prototype.__init5.call(this);
        SyncPromise.prototype.__init6.call(this);
        try {
          executor(this._resolve, this._reject);
        } catch (e) {
          this._reject(e);
        }
      }
      then(onfulfilled, onrejected) {
        return new SyncPromise((resolve, reject) => {
          this._handlers.push([
            false,
            (result) => {
              if (!onfulfilled) {
                resolve(result);
              } else {
                try {
                  resolve(onfulfilled(result));
                } catch (e) {
                  reject(e);
                }
              }
            },
            (reason) => {
              if (!onrejected) {
                reject(reason);
              } else {
                try {
                  resolve(onrejected(reason));
                } catch (e) {
                  reject(e);
                }
              }
            },
          ]);
          this._executeHandlers();
        });
      }
      catch(onrejected) {
        return this.then((val) => val, onrejected);
      }
      finally(onfinally) {
        return new SyncPromise((resolve, reject) => {
          let val;
          let isRejected;
          return this.then(
            (value) => {
              isRejected = false;
              val = value;
              if (onfinally) {
                onfinally();
              }
            },
            (reason) => {
              isRejected = true;
              val = reason;
              if (onfinally) {
                onfinally();
              }
            },
          ).then(() => {
            if (isRejected) {
              reject(val);
              return;
            }
            resolve(val);
          });
        });
      }
      __init3() {
        this._resolve = (value) => {
          this._setResult(States.RESOLVED, value);
        };
      }
      __init4() {
        this._reject = (reason) => {
          this._setResult(States.REJECTED, reason);
        };
      }
      __init5() {
        this._setResult = (state, value) => {
          if (this._state !== States.PENDING) {
            return;
          }
          if (is.isThenable(value)) {
            void value.then(this._resolve, this._reject);
            return;
          }
          this._state = state;
          this._value = value;
          this._executeHandlers();
        };
      }
      __init6() {
        this._executeHandlers = () => {
          if (this._state === States.PENDING) {
            return;
          }
          const cachedHandlers = this._handlers.slice();
          this._handlers = [];
          cachedHandlers.forEach((handler2) => {
            if (handler2[0]) {
              return;
            }
            if (this._state === States.RESOLVED) {
              handler2[1](this._value);
            }
            if (this._state === States.REJECTED) {
              handler2[2](this._value);
            }
            handler2[0] = true;
          });
        };
      }
    };
    exports.SyncPromise = SyncPromise;
    exports.rejectedSyncPromise = rejectedSyncPromise;
    exports.resolvedSyncPromise = resolvedSyncPromise;
  },
});

// node_modules/@sentry/utils/cjs/promisebuffer.js
var require_promisebuffer = __commonJS({
  "node_modules/@sentry/utils/cjs/promisebuffer.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var error = require_error();
    var syncpromise = require_syncpromise();
    function makePromiseBuffer(limit) {
      const buffer = [];
      function isReady() {
        return limit === void 0 || buffer.length < limit;
      }
      function remove(task) {
        return buffer.splice(buffer.indexOf(task), 1)[0];
      }
      function add(taskProducer) {
        if (!isReady()) {
          return syncpromise.rejectedSyncPromise(
            new error.SentryError(
              "Not adding Promise because buffer limit was reached.",
            ),
          );
        }
        const task = taskProducer();
        if (buffer.indexOf(task) === -1) {
          buffer.push(task);
        }
        void task
          .then(() => remove(task))
          .then(null, () => remove(task).then(null, () => {}));
        return task;
      }
      function drain(timeout) {
        return new syncpromise.SyncPromise((resolve, reject) => {
          let counter = buffer.length;
          if (!counter) {
            return resolve(true);
          }
          const capturedSetTimeout = setTimeout(() => {
            if (timeout && timeout > 0) {
              resolve(false);
            }
          }, timeout);
          buffer.forEach((item) => {
            void syncpromise.resolvedSyncPromise(item).then(() => {
              if (!--counter) {
                clearTimeout(capturedSetTimeout);
                resolve(true);
              }
            }, reject);
          });
        });
      }
      return {
        $: buffer,
        add,
        drain,
      };
    }
    exports.makePromiseBuffer = makePromiseBuffer;
  },
});

// node_modules/@sentry/utils/cjs/url.js
var require_url = __commonJS({
  "node_modules/@sentry/utils/cjs/url.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function parseUrl(url) {
      if (!url) {
        return {};
      }
      const match = url.match(
        /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
      );
      if (!match) {
        return {};
      }
      const query = match[6] || "";
      const fragment = match[8] || "";
      return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        search: query,
        hash: fragment,
        relative: match[5] + query + fragment,
      };
    }
    function stripUrlQueryAndFragment(urlPath) {
      return urlPath.split(/[\?#]/, 1)[0];
    }
    function getNumberOfUrlSegments(url) {
      return url.split(/\\?\//).filter((s) => s.length > 0 && s !== ",").length;
    }
    function getSanitizedUrlString(url) {
      const { protocol, host, path } = url;
      const filteredHost =
        (host &&
          host
            .replace(/^.*@/, "[filtered]:[filtered]@")
            .replace(":80", "")
            .replace(":443", "")) ||
        "";
      return `${protocol ? `${protocol}://` : ""}${filteredHost}${path}`;
    }
    exports.getNumberOfUrlSegments = getNumberOfUrlSegments;
    exports.getSanitizedUrlString = getSanitizedUrlString;
    exports.parseUrl = parseUrl;
    exports.stripUrlQueryAndFragment = stripUrlQueryAndFragment;
  },
});

// node_modules/@sentry/utils/cjs/requestdata.js
var require_requestdata = __commonJS({
  "node_modules/@sentry/utils/cjs/requestdata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var normalize = require_normalize();
    var url = require_url();
    var DEFAULT_INCLUDES = {
      ip: false,
      request: true,
      transaction: true,
      user: true,
    };
    var DEFAULT_REQUEST_INCLUDES = [
      "cookies",
      "data",
      "headers",
      "method",
      "query_string",
      "url",
    ];
    var DEFAULT_USER_INCLUDES = ["id", "username", "email"];
    function addRequestDataToTransaction(transaction, req, deps) {
      if (!transaction) return;
      if (
        !transaction.metadata.source ||
        transaction.metadata.source === "url"
      ) {
        transaction.setName(
          ...extractPathForTransaction(req, { path: true, method: true }),
        );
      }
      transaction.setData("url", req.originalUrl || req.url);
      if (req.baseUrl) {
        transaction.setData("baseUrl", req.baseUrl);
      }
      transaction.setData("query", extractQueryParams(req, deps));
    }
    function extractPathForTransaction(req, options = {}) {
      const method = req.method && req.method.toUpperCase();
      let path = "";
      let source = "url";
      if (options.customRoute || req.route) {
        path =
          options.customRoute ||
          `${req.baseUrl || ""}${req.route && req.route.path}`;
        source = "route";
      } else if (req.originalUrl || req.url) {
        path = url.stripUrlQueryAndFragment(req.originalUrl || req.url || "");
      }
      let name = "";
      if (options.method && method) {
        name += method;
      }
      if (options.method && options.path) {
        name += " ";
      }
      if (options.path && path) {
        name += path;
      }
      return [name, source];
    }
    function extractTransaction(req, type) {
      switch (type) {
        case "path": {
          return extractPathForTransaction(req, { path: true })[0];
        }
        case "handler": {
          return (
            (req.route &&
              req.route.stack &&
              req.route.stack[0] &&
              req.route.stack[0].name) ||
            "<anonymous>"
          );
        }
        case "methodPath":
        default: {
          return extractPathForTransaction(req, {
            path: true,
            method: true,
          })[0];
        }
      }
    }
    function extractUserData(user, keys) {
      const extractedUser = {};
      const attributes = Array.isArray(keys) ? keys : DEFAULT_USER_INCLUDES;
      attributes.forEach((key) => {
        if (user && key in user) {
          extractedUser[key] = user[key];
        }
      });
      return extractedUser;
    }
    function extractRequestData(req, options) {
      const { include = DEFAULT_REQUEST_INCLUDES, deps } = options || {};
      const requestData = {};
      const headers2 = req.headers || {};
      const method = req.method;
      const host = req.hostname || req.host || headers2.host || "<no host>";
      const protocol =
        req.protocol === "https" || (req.socket && req.socket.encrypted)
          ? "https"
          : "http";
      const originalUrl = req.originalUrl || req.url || "";
      const absoluteUrl = `${protocol}://${host}${originalUrl}`;
      include.forEach((key) => {
        switch (key) {
          case "headers": {
            requestData.headers = headers2;
            break;
          }
          case "method": {
            requestData.method = method;
            break;
          }
          case "url": {
            requestData.url = absoluteUrl;
            break;
          }
          case "cookies": {
            requestData.cookies =
              req.cookies ||
              (headers2.cookie &&
                deps &&
                deps.cookie &&
                deps.cookie.parse(headers2.cookie)) ||
              {};
            break;
          }
          case "query_string": {
            requestData.query_string = extractQueryParams(req, deps);
            break;
          }
          case "data": {
            if (method === "GET" || method === "HEAD") {
              break;
            }
            if (req.body !== void 0) {
              requestData.data = is.isString(req.body)
                ? req.body
                : JSON.stringify(normalize.normalize(req.body));
            }
            break;
          }
          default: {
            if ({}.hasOwnProperty.call(req, key)) {
              requestData[key] = req[key];
            }
          }
        }
      });
      return requestData;
    }
    function addRequestDataToEvent(event, req, options) {
      const include = __spreadValues(
        __spreadValues({}, DEFAULT_INCLUDES),
        options && options.include,
      );
      if (include.request) {
        const extractedRequestData = Array.isArray(include.request)
          ? extractRequestData(req, {
              include: include.request,
              deps: options && options.deps,
            })
          : extractRequestData(req, { deps: options && options.deps });
        event.request = __spreadValues(
          __spreadValues({}, event.request),
          extractedRequestData,
        );
      }
      if (include.user) {
        const extractedUser =
          req.user && is.isPlainObject(req.user)
            ? extractUserData(req.user, include.user)
            : {};
        if (Object.keys(extractedUser).length) {
          event.user = __spreadValues(
            __spreadValues({}, event.user),
            extractedUser,
          );
        }
      }
      if (include.ip) {
        const ip = req.ip || (req.socket && req.socket.remoteAddress);
        if (ip) {
          event.user = __spreadProps(__spreadValues({}, event.user), {
            ip_address: ip,
          });
        }
      }
      if (include.transaction && !event.transaction) {
        event.transaction = extractTransaction(req, include.transaction);
      }
      return event;
    }
    function extractQueryParams(req, deps) {
      let originalUrl = req.originalUrl || req.url || "";
      if (!originalUrl) {
        return;
      }
      if (originalUrl.startsWith("/")) {
        originalUrl = `http://dogs.are.great${originalUrl}`;
      }
      return (
        req.query ||
        (typeof URL !== void 0 &&
          new URL(originalUrl).search.replace("?", "")) ||
        (deps && deps.url && deps.url.parse(originalUrl).query) ||
        void 0
      );
    }
    exports.addRequestDataToEvent = addRequestDataToEvent;
    exports.addRequestDataToTransaction = addRequestDataToTransaction;
    exports.extractPathForTransaction = extractPathForTransaction;
    exports.extractRequestData = extractRequestData;
  },
});

// node_modules/@sentry/utils/cjs/severity.js
var require_severity = __commonJS({
  "node_modules/@sentry/utils/cjs/severity.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var validSeverityLevels = [
      "fatal",
      "error",
      "warning",
      "log",
      "info",
      "debug",
    ];
    function severityFromString(level) {
      return severityLevelFromString(level);
    }
    function severityLevelFromString(level) {
      return level === "warn"
        ? "warning"
        : validSeverityLevels.includes(level)
        ? level
        : "log";
    }
    exports.severityFromString = severityFromString;
    exports.severityLevelFromString = severityLevelFromString;
    exports.validSeverityLevels = validSeverityLevels;
  },
});

// node_modules/@sentry/utils/cjs/time.js
var require_time = __commonJS({
  "node_modules/@sentry/utils/cjs/time.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require_node();
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    var dateTimestampSource = {
      nowSeconds: () => Date.now() / 1e3,
    };
    function getBrowserPerformance() {
      const { performance: performance2 } = WINDOW;
      if (!performance2 || !performance2.now) {
        return void 0;
      }
      const timeOrigin = Date.now() - performance2.now();
      return {
        now: () => performance2.now(),
        timeOrigin,
      };
    }
    function getNodePerformance() {
      try {
        const perfHooks = node.dynamicRequire(module2, "perf_hooks");
        return perfHooks.performance;
      } catch (_) {
        return void 0;
      }
    }
    var platformPerformance = node.isNodeEnv()
      ? getNodePerformance()
      : getBrowserPerformance();
    var timestampSource =
      platformPerformance === void 0
        ? dateTimestampSource
        : {
            nowSeconds: () =>
              (platformPerformance.timeOrigin + platformPerformance.now()) /
              1e3,
          };
    var dateTimestampInSeconds =
      dateTimestampSource.nowSeconds.bind(dateTimestampSource);
    var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
    var timestampWithMs = timestampInSeconds;
    var usingPerformanceAPI = platformPerformance !== void 0;
    exports._browserPerformanceTimeOriginMode = void 0;
    var browserPerformanceTimeOrigin = (() => {
      const { performance: performance2 } = WINDOW;
      if (!performance2 || !performance2.now) {
        exports._browserPerformanceTimeOriginMode = "none";
        return void 0;
      }
      const threshold = 3600 * 1e3;
      const performanceNow = performance2.now();
      const dateNow = Date.now();
      const timeOriginDelta = performance2.timeOrigin
        ? Math.abs(performance2.timeOrigin + performanceNow - dateNow)
        : threshold;
      const timeOriginIsReliable = timeOriginDelta < threshold;
      const navigationStart =
        performance2.timing && performance2.timing.navigationStart;
      const hasNavigationStart = typeof navigationStart === "number";
      const navigationStartDelta = hasNavigationStart
        ? Math.abs(navigationStart + performanceNow - dateNow)
        : threshold;
      const navigationStartIsReliable = navigationStartDelta < threshold;
      if (timeOriginIsReliable || navigationStartIsReliable) {
        if (timeOriginDelta <= navigationStartDelta) {
          exports._browserPerformanceTimeOriginMode = "timeOrigin";
          return performance2.timeOrigin;
        } else {
          exports._browserPerformanceTimeOriginMode = "navigationStart";
          return navigationStart;
        }
      }
      exports._browserPerformanceTimeOriginMode = "dateNow";
      return dateNow;
    })();
    exports.browserPerformanceTimeOrigin = browserPerformanceTimeOrigin;
    exports.dateTimestampInSeconds = dateTimestampInSeconds;
    exports.timestampInSeconds = timestampInSeconds;
    exports.timestampWithMs = timestampWithMs;
    exports.usingPerformanceAPI = usingPerformanceAPI;
  },
});

// node_modules/@sentry/utils/cjs/baggage.js
var require_baggage = __commonJS({
  "node_modules/@sentry/utils/cjs/baggage.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var logger = require_logger();
    var BAGGAGE_HEADER_NAME = "baggage";
    var SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
    var SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
    var MAX_BAGGAGE_STRING_LENGTH = 8192;
    function baggageHeaderToDynamicSamplingContext(baggageHeader) {
      if (!is.isString(baggageHeader) && !Array.isArray(baggageHeader)) {
        return void 0;
      }
      let baggageObject = {};
      if (Array.isArray(baggageHeader)) {
        baggageObject = baggageHeader.reduce((acc, curr) => {
          const currBaggageObject = baggageHeaderToObject(curr);
          return __spreadValues(__spreadValues({}, acc), currBaggageObject);
        }, {});
      } else {
        if (!baggageHeader) {
          return void 0;
        }
        baggageObject = baggageHeaderToObject(baggageHeader);
      }
      const dynamicSamplingContext = Object.entries(baggageObject).reduce(
        (acc, [key, value]) => {
          if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
            const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
            acc[nonPrefixedKey] = value;
          }
          return acc;
        },
        {},
      );
      if (Object.keys(dynamicSamplingContext).length > 0) {
        return dynamicSamplingContext;
      } else {
        return void 0;
      }
    }
    function dynamicSamplingContextToSentryBaggageHeader(
      dynamicSamplingContext,
    ) {
      if (!dynamicSamplingContext) {
        return void 0;
      }
      const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
        (acc, [dscKey, dscValue]) => {
          if (dscValue) {
            acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
          }
          return acc;
        },
        {},
      );
      return objectToBaggageHeader(sentryPrefixedDSC);
    }
    function baggageHeaderToObject(baggageHeader) {
      return baggageHeader
        .split(",")
        .map((baggageEntry) =>
          baggageEntry
            .split("=")
            .map((keyOrValue) => decodeURIComponent(keyOrValue.trim())),
        )
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    }
    function objectToBaggageHeader(object) {
      if (Object.keys(object).length === 0) {
        return void 0;
      }
      return Object.entries(object).reduce(
        (baggageHeader, [objectKey, objectValue], currentIndex) => {
          const baggageEntry = `${encodeURIComponent(
            objectKey,
          )}=${encodeURIComponent(objectValue)}`;
          const newBaggageHeader =
            currentIndex === 0
              ? baggageEntry
              : `${baggageHeader},${baggageEntry}`;
          if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              logger.logger.warn(
                `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`,
              );
            return baggageHeader;
          } else {
            return newBaggageHeader;
          }
        },
        "",
      );
    }
    exports.BAGGAGE_HEADER_NAME = BAGGAGE_HEADER_NAME;
    exports.MAX_BAGGAGE_STRING_LENGTH = MAX_BAGGAGE_STRING_LENGTH;
    exports.SENTRY_BAGGAGE_KEY_PREFIX = SENTRY_BAGGAGE_KEY_PREFIX;
    exports.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
    exports.baggageHeaderToDynamicSamplingContext =
      baggageHeaderToDynamicSamplingContext;
    exports.dynamicSamplingContextToSentryBaggageHeader =
      dynamicSamplingContextToSentryBaggageHeader;
  },
});

// node_modules/@sentry/utils/cjs/tracing.js
var require_tracing = __commonJS({
  "node_modules/@sentry/utils/cjs/tracing.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var baggage = require_baggage();
    var misc = require_misc();
    var TRACEPARENT_REGEXP = new RegExp(
      "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$",
    );
    function extractTraceparentData(traceparent) {
      if (!traceparent) {
        return void 0;
      }
      const matches = traceparent.match(TRACEPARENT_REGEXP);
      if (!matches) {
        return void 0;
      }
      let parentSampled;
      if (matches[3] === "1") {
        parentSampled = true;
      } else if (matches[3] === "0") {
        parentSampled = false;
      }
      return {
        traceId: matches[1],
        parentSampled,
        parentSpanId: matches[2],
      };
    }
    function tracingContextFromHeaders(sentryTrace, baggage$1) {
      const traceparentData = extractTraceparentData(sentryTrace);
      const dynamicSamplingContext =
        baggage.baggageHeaderToDynamicSamplingContext(baggage$1);
      const { traceId, parentSpanId, parentSampled } = traceparentData || {};
      const propagationContext = {
        traceId: traceId || misc.uuid4(),
        spanId: misc.uuid4().substring(16),
        sampled: parentSampled === void 0 ? false : parentSampled,
      };
      if (parentSpanId) {
        propagationContext.parentSpanId = parentSpanId;
      }
      if (dynamicSamplingContext) {
        propagationContext.dsc = dynamicSamplingContext;
      }
      return {
        traceparentData,
        dynamicSamplingContext,
        propagationContext,
      };
    }
    function generateSentryTraceHeader(
      traceId = misc.uuid4(),
      spanId = misc.uuid4().substring(16),
      sampled,
    ) {
      let sampledString = "";
      if (sampled !== void 0) {
        sampledString = sampled ? "-1" : "-0";
      }
      return `${traceId}-${spanId}${sampledString}`;
    }
    exports.TRACEPARENT_REGEXP = TRACEPARENT_REGEXP;
    exports.extractTraceparentData = extractTraceparentData;
    exports.generateSentryTraceHeader = generateSentryTraceHeader;
    exports.tracingContextFromHeaders = tracingContextFromHeaders;
  },
});

// node_modules/@sentry/utils/cjs/envelope.js
var require_envelope = __commonJS({
  "node_modules/@sentry/utils/cjs/envelope.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var dsn = require_dsn();
    var normalize = require_normalize();
    var object = require_object();
    function createEnvelope(headers2, items = []) {
      return [headers2, items];
    }
    function addItemToEnvelope(envelope, newItem) {
      const [headers2, items] = envelope;
      return [headers2, [...items, newItem]];
    }
    function forEachEnvelopeItem(envelope, callback) {
      const envelopeItems = envelope[1];
      for (const envelopeItem of envelopeItems) {
        const envelopeItemType = envelopeItem[0].type;
        const result = callback(envelopeItem, envelopeItemType);
        if (result) {
          return true;
        }
      }
      return false;
    }
    function envelopeContainsItemType(envelope, types) {
      return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
    }
    function encodeUTF8(input, textEncoder) {
      const utf8 = textEncoder || new TextEncoder();
      return utf8.encode(input);
    }
    function serializeEnvelope(envelope, textEncoder) {
      const [envHeaders, items] = envelope;
      let parts = JSON.stringify(envHeaders);
      function append(next) {
        if (typeof parts === "string") {
          parts =
            typeof next === "string"
              ? parts + next
              : [encodeUTF8(parts, textEncoder), next];
        } else {
          parts.push(
            typeof next === "string" ? encodeUTF8(next, textEncoder) : next,
          );
        }
      }
      for (const item of items) {
        const [itemHeaders, payload] = item;
        append(`
${JSON.stringify(itemHeaders)}
`);
        if (typeof payload === "string" || payload instanceof Uint8Array) {
          append(payload);
        } else {
          let stringifiedPayload;
          try {
            stringifiedPayload = JSON.stringify(payload);
          } catch (e) {
            stringifiedPayload = JSON.stringify(normalize.normalize(payload));
          }
          append(stringifiedPayload);
        }
      }
      return typeof parts === "string" ? parts : concatBuffers(parts);
    }
    function concatBuffers(buffers) {
      const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const buffer of buffers) {
        merged.set(buffer, offset);
        offset += buffer.length;
      }
      return merged;
    }
    function parseEnvelope(env, textEncoder, textDecoder) {
      let buffer = typeof env === "string" ? textEncoder.encode(env) : env;
      function readBinary(length) {
        const bin = buffer.subarray(0, length);
        buffer = buffer.subarray(length + 1);
        return bin;
      }
      function readJson() {
        let i = buffer.indexOf(10);
        if (i < 0) {
          i = buffer.length;
        }
        return JSON.parse(textDecoder.decode(readBinary(i)));
      }
      const envelopeHeader = readJson();
      const items = [];
      while (buffer.length) {
        const itemHeader = readJson();
        const binaryLength =
          typeof itemHeader.length === "number" ? itemHeader.length : void 0;
        items.push([
          itemHeader,
          binaryLength ? readBinary(binaryLength) : readJson(),
        ]);
      }
      return [envelopeHeader, items];
    }
    function createAttachmentEnvelopeItem(attachment, textEncoder) {
      const buffer =
        typeof attachment.data === "string"
          ? encodeUTF8(attachment.data, textEncoder)
          : attachment.data;
      return [
        object.dropUndefinedKeys({
          type: "attachment",
          length: buffer.length,
          filename: attachment.filename,
          content_type: attachment.contentType,
          attachment_type: attachment.attachmentType,
        }),
        buffer,
      ];
    }
    var ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
      session: "session",
      sessions: "session",
      attachment: "attachment",
      transaction: "transaction",
      event: "error",
      client_report: "internal",
      user_report: "default",
      profile: "profile",
      replay_event: "replay",
      replay_recording: "replay",
      check_in: "monitor",
    };
    function envelopeItemTypeToDataCategory(type) {
      return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
    }
    function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
      if (!metadataOrEvent || !metadataOrEvent.sdk) {
        return;
      }
      const { name, version } = metadataOrEvent.sdk;
      return { name, version };
    }
    function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn$1) {
      const dynamicSamplingContext =
        event.sdkProcessingMetadata &&
        event.sdkProcessingMetadata.dynamicSamplingContext;
      return __spreadValues(
        __spreadValues(
          __spreadValues(
            {
              event_id: event.event_id,
              sent_at: new Date().toISOString(),
            },
            sdkInfo && { sdk: sdkInfo },
          ),
          !!tunnel && { dsn: dsn.dsnToString(dsn$1) },
        ),
        dynamicSamplingContext && {
          trace: object.dropUndefinedKeys(
            __spreadValues({}, dynamicSamplingContext),
          ),
        },
      );
    }
    exports.addItemToEnvelope = addItemToEnvelope;
    exports.createAttachmentEnvelopeItem = createAttachmentEnvelopeItem;
    exports.createEnvelope = createEnvelope;
    exports.createEventEnvelopeHeaders = createEventEnvelopeHeaders;
    exports.envelopeContainsItemType = envelopeContainsItemType;
    exports.envelopeItemTypeToDataCategory = envelopeItemTypeToDataCategory;
    exports.forEachEnvelopeItem = forEachEnvelopeItem;
    exports.getSdkMetadataForEnvelopeHeader = getSdkMetadataForEnvelopeHeader;
    exports.parseEnvelope = parseEnvelope;
    exports.serializeEnvelope = serializeEnvelope;
  },
});

// node_modules/@sentry/utils/cjs/clientreport.js
var require_clientreport = __commonJS({
  "node_modules/@sentry/utils/cjs/clientreport.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var envelope = require_envelope();
    var time = require_time();
    function createClientReportEnvelope(discarded_events, dsn, timestamp) {
      const clientReportItem = [
        { type: "client_report" },
        {
          timestamp: timestamp || time.dateTimestampInSeconds(),
          discarded_events,
        },
      ];
      return envelope.createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
    }
    exports.createClientReportEnvelope = createClientReportEnvelope;
  },
});

// node_modules/@sentry/utils/cjs/ratelimit.js
var require_ratelimit = __commonJS({
  "node_modules/@sentry/utils/cjs/ratelimit.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_RETRY_AFTER = 60 * 1e3;
    function parseRetryAfterHeader(header, now = Date.now()) {
      const headerDelay = parseInt(`${header}`, 10);
      if (!isNaN(headerDelay)) {
        return headerDelay * 1e3;
      }
      const headerDate = Date.parse(`${header}`);
      if (!isNaN(headerDate)) {
        return headerDate - now;
      }
      return DEFAULT_RETRY_AFTER;
    }
    function disabledUntil(limits, category) {
      return limits[category] || limits.all || 0;
    }
    function isRateLimited(limits, category, now = Date.now()) {
      return disabledUntil(limits, category) > now;
    }
    function updateRateLimits(
      limits,
      { statusCode: statusCode2, headers: headers2 },
      now = Date.now(),
    ) {
      const updatedRateLimits = __spreadValues({}, limits);
      const rateLimitHeader = headers2 && headers2["x-sentry-rate-limits"];
      const retryAfterHeader = headers2 && headers2["retry-after"];
      if (rateLimitHeader) {
        for (const limit of rateLimitHeader.trim().split(",")) {
          const [retryAfter, categories] = limit.split(":", 2);
          const headerDelay = parseInt(retryAfter, 10);
          const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
          if (!categories) {
            updatedRateLimits.all = now + delay;
          } else {
            for (const category of categories.split(";")) {
              updatedRateLimits[category] = now + delay;
            }
          }
        }
      } else if (retryAfterHeader) {
        updatedRateLimits.all =
          now + parseRetryAfterHeader(retryAfterHeader, now);
      } else if (statusCode2 === 429) {
        updatedRateLimits.all = now + 60 * 1e3;
      }
      return updatedRateLimits;
    }
    exports.DEFAULT_RETRY_AFTER = DEFAULT_RETRY_AFTER;
    exports.disabledUntil = disabledUntil;
    exports.isRateLimited = isRateLimited;
    exports.parseRetryAfterHeader = parseRetryAfterHeader;
    exports.updateRateLimits = updateRateLimits;
  },
});

// node_modules/@sentry/utils/cjs/userIntegrations.js
var require_userIntegrations = __commonJS({
  "node_modules/@sentry/utils/cjs/userIntegrations.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function setNestedKey(obj, keyPath, value) {
      const match = keyPath.match(/([a-z_]+)\.(.*)/i);
      if (match === null) {
        obj[keyPath] = value;
      } else {
        const innerObj = obj[match[1]];
        setNestedKey(innerObj, match[2], value);
      }
    }
    function addOrUpdateIntegration(
      defaultIntegrationInstance,
      userIntegrations,
      forcedOptions = {},
    ) {
      return Array.isArray(userIntegrations)
        ? addOrUpdateIntegrationInArray(
            defaultIntegrationInstance,
            userIntegrations,
            forcedOptions,
          )
        : addOrUpdateIntegrationInFunction(
            defaultIntegrationInstance,
            userIntegrations,
            forcedOptions,
          );
    }
    function addOrUpdateIntegrationInArray(
      defaultIntegrationInstance,
      userIntegrations,
      forcedOptions,
    ) {
      const userInstance = userIntegrations.find(
        (integration) => integration.name === defaultIntegrationInstance.name,
      );
      if (userInstance) {
        for (const [keyPath, value] of Object.entries(forcedOptions)) {
          setNestedKey(userInstance, keyPath, value);
        }
        return userIntegrations;
      }
      return [...userIntegrations, defaultIntegrationInstance];
    }
    function addOrUpdateIntegrationInFunction(
      defaultIntegrationInstance,
      userIntegrationsFunc,
      forcedOptions,
    ) {
      const wrapper = (defaultIntegrations) => {
        const userFinalIntegrations = userIntegrationsFunc(defaultIntegrations);
        if (defaultIntegrationInstance.allowExclusionByUser) {
          const userFinalInstance = userFinalIntegrations.find(
            (integration) =>
              integration.name === defaultIntegrationInstance.name,
          );
          if (!userFinalInstance) {
            return userFinalIntegrations;
          }
        }
        return addOrUpdateIntegrationInArray(
          defaultIntegrationInstance,
          userFinalIntegrations,
          forcedOptions,
        );
      };
      return wrapper;
    }
    exports.addOrUpdateIntegration = addOrUpdateIntegration;
  },
});

// node_modules/@sentry/utils/cjs/cache.js
var require_cache = __commonJS({
  "node_modules/@sentry/utils/cjs/cache.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function makeFifoCache(size) {
      let evictionOrder = [];
      let cache = {};
      return {
        add(key, value) {
          while (evictionOrder.length >= size) {
            const evictCandidate = evictionOrder.shift();
            if (evictCandidate !== void 0) {
              delete cache[evictCandidate];
            }
          }
          if (cache[key]) {
            this.delete(key);
          }
          evictionOrder.push(key);
          cache[key] = value;
        },
        clear() {
          cache = {};
          evictionOrder = [];
        },
        get(key) {
          return cache[key];
        },
        size() {
          return evictionOrder.length;
        },
        delete(key) {
          if (!cache[key]) {
            return false;
          }
          delete cache[key];
          for (let i = 0; i < evictionOrder.length; i++) {
            if (evictionOrder[i] === key) {
              evictionOrder.splice(i, 1);
              break;
            }
          }
          return true;
        },
      };
    }
    exports.makeFifoCache = makeFifoCache;
  },
});

// node_modules/@sentry/utils/cjs/vendor/escapeStringForRegex.js
var require_escapeStringForRegex = __commonJS({
  "node_modules/@sentry/utils/cjs/vendor/escapeStringForRegex.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function escapeStringForRegex(regexString) {
      return regexString
        .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
        .replace(/-/g, "\\x2d");
    }
    exports.escapeStringForRegex = escapeStringForRegex;
  },
});

// node_modules/@sentry/utils/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@sentry/utils/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var aggregateErrors = require_aggregate_errors();
    var browser = require_browser();
    var dsn = require_dsn();
    var error = require_error();
    var worldwide = require_worldwide();
    var instrument = require_instrument();
    var is = require_is();
    var logger = require_logger();
    var memo = require_memo();
    var misc = require_misc();
    var node = require_node();
    var normalize = require_normalize();
    var object = require_object();
    var path = require_path();
    var promisebuffer = require_promisebuffer();
    var requestdata = require_requestdata();
    var severity = require_severity();
    var stacktrace = require_stacktrace();
    var string = require_string();
    var supports = require_supports();
    var syncpromise = require_syncpromise();
    var time = require_time();
    var tracing = require_tracing();
    var env = require_env();
    var envelope = require_envelope();
    var clientreport = require_clientreport();
    var ratelimit = require_ratelimit();
    var baggage = require_baggage();
    var url = require_url();
    var userIntegrations = require_userIntegrations();
    var cache = require_cache();
    var escapeStringForRegex = require_escapeStringForRegex();
    var supportsHistory = require_supportsHistory();
    exports.applyAggregateErrorsToEvent =
      aggregateErrors.applyAggregateErrorsToEvent;
    exports.getDomElement = browser.getDomElement;
    exports.getLocationHref = browser.getLocationHref;
    exports.htmlTreeAsString = browser.htmlTreeAsString;
    exports.dsnFromString = dsn.dsnFromString;
    exports.dsnToString = dsn.dsnToString;
    exports.makeDsn = dsn.makeDsn;
    exports.SentryError = error.SentryError;
    exports.GLOBAL_OBJ = worldwide.GLOBAL_OBJ;
    exports.getGlobalObject = worldwide.getGlobalObject;
    exports.getGlobalSingleton = worldwide.getGlobalSingleton;
    exports.SENTRY_XHR_DATA_KEY = instrument.SENTRY_XHR_DATA_KEY;
    exports.addInstrumentationHandler = instrument.addInstrumentationHandler;
    exports.parseFetchArgs = instrument.parseFetchArgs;
    exports.isDOMError = is.isDOMError;
    exports.isDOMException = is.isDOMException;
    exports.isElement = is.isElement;
    exports.isError = is.isError;
    exports.isErrorEvent = is.isErrorEvent;
    exports.isEvent = is.isEvent;
    exports.isInstanceOf = is.isInstanceOf;
    exports.isNaN = is.isNaN;
    exports.isPlainObject = is.isPlainObject;
    exports.isPrimitive = is.isPrimitive;
    exports.isRegExp = is.isRegExp;
    exports.isString = is.isString;
    exports.isSyntheticEvent = is.isSyntheticEvent;
    exports.isThenable = is.isThenable;
    exports.CONSOLE_LEVELS = logger.CONSOLE_LEVELS;
    exports.consoleSandbox = logger.consoleSandbox;
    Object.defineProperty(exports, "logger", {
      enumerable: true,
      get: () => logger.logger,
    });
    exports.memoBuilder = memo.memoBuilder;
    exports.addContextToFrame = misc.addContextToFrame;
    exports.addExceptionMechanism = misc.addExceptionMechanism;
    exports.addExceptionTypeValue = misc.addExceptionTypeValue;
    exports.arrayify = misc.arrayify;
    exports.checkOrSetAlreadyCaught = misc.checkOrSetAlreadyCaught;
    exports.getEventDescription = misc.getEventDescription;
    exports.parseSemver = misc.parseSemver;
    exports.uuid4 = misc.uuid4;
    exports.dynamicRequire = node.dynamicRequire;
    exports.isNodeEnv = node.isNodeEnv;
    exports.loadModule = node.loadModule;
    exports.normalize = normalize.normalize;
    exports.normalizeToSize = normalize.normalizeToSize;
    exports.walk = normalize.walk;
    exports.addNonEnumerableProperty = object.addNonEnumerableProperty;
    exports.convertToPlainObject = object.convertToPlainObject;
    exports.dropUndefinedKeys = object.dropUndefinedKeys;
    exports.extractExceptionKeysForMessage =
      object.extractExceptionKeysForMessage;
    exports.fill = object.fill;
    exports.getOriginalFunction = object.getOriginalFunction;
    exports.markFunctionWrapped = object.markFunctionWrapped;
    exports.objectify = object.objectify;
    exports.urlEncode = object.urlEncode;
    exports.basename = path.basename;
    exports.dirname = path.dirname;
    exports.isAbsolute = path.isAbsolute;
    exports.join = path.join;
    exports.normalizePath = path.normalizePath;
    exports.relative = path.relative;
    exports.resolve = path.resolve;
    exports.makePromiseBuffer = promisebuffer.makePromiseBuffer;
    exports.addRequestDataToEvent = requestdata.addRequestDataToEvent;
    exports.addRequestDataToTransaction =
      requestdata.addRequestDataToTransaction;
    exports.extractPathForTransaction = requestdata.extractPathForTransaction;
    exports.extractRequestData = requestdata.extractRequestData;
    exports.severityFromString = severity.severityFromString;
    exports.severityLevelFromString = severity.severityLevelFromString;
    exports.validSeverityLevels = severity.validSeverityLevels;
    exports.createStackParser = stacktrace.createStackParser;
    exports.getFunctionName = stacktrace.getFunctionName;
    exports.nodeStackLineParser = stacktrace.nodeStackLineParser;
    exports.stackParserFromStackParserOptions =
      stacktrace.stackParserFromStackParserOptions;
    exports.stripSentryFramesAndReverse =
      stacktrace.stripSentryFramesAndReverse;
    exports.isMatchingPattern = string.isMatchingPattern;
    exports.safeJoin = string.safeJoin;
    exports.snipLine = string.snipLine;
    exports.stringMatchesSomePattern = string.stringMatchesSomePattern;
    exports.truncate = string.truncate;
    exports.isNativeFetch = supports.isNativeFetch;
    exports.supportsDOMError = supports.supportsDOMError;
    exports.supportsDOMException = supports.supportsDOMException;
    exports.supportsErrorEvent = supports.supportsErrorEvent;
    exports.supportsFetch = supports.supportsFetch;
    exports.supportsNativeFetch = supports.supportsNativeFetch;
    exports.supportsReferrerPolicy = supports.supportsReferrerPolicy;
    exports.supportsReportingObserver = supports.supportsReportingObserver;
    exports.SyncPromise = syncpromise.SyncPromise;
    exports.rejectedSyncPromise = syncpromise.rejectedSyncPromise;
    exports.resolvedSyncPromise = syncpromise.resolvedSyncPromise;
    Object.defineProperty(exports, "_browserPerformanceTimeOriginMode", {
      enumerable: true,
      get: () => time._browserPerformanceTimeOriginMode,
    });
    exports.browserPerformanceTimeOrigin = time.browserPerformanceTimeOrigin;
    exports.dateTimestampInSeconds = time.dateTimestampInSeconds;
    exports.timestampInSeconds = time.timestampInSeconds;
    exports.timestampWithMs = time.timestampWithMs;
    exports.usingPerformanceAPI = time.usingPerformanceAPI;
    exports.TRACEPARENT_REGEXP = tracing.TRACEPARENT_REGEXP;
    exports.extractTraceparentData = tracing.extractTraceparentData;
    exports.generateSentryTraceHeader = tracing.generateSentryTraceHeader;
    exports.tracingContextFromHeaders = tracing.tracingContextFromHeaders;
    exports.getSDKSource = env.getSDKSource;
    exports.isBrowserBundle = env.isBrowserBundle;
    exports.addItemToEnvelope = envelope.addItemToEnvelope;
    exports.createAttachmentEnvelopeItem =
      envelope.createAttachmentEnvelopeItem;
    exports.createEnvelope = envelope.createEnvelope;
    exports.createEventEnvelopeHeaders = envelope.createEventEnvelopeHeaders;
    exports.envelopeContainsItemType = envelope.envelopeContainsItemType;
    exports.envelopeItemTypeToDataCategory =
      envelope.envelopeItemTypeToDataCategory;
    exports.forEachEnvelopeItem = envelope.forEachEnvelopeItem;
    exports.getSdkMetadataForEnvelopeHeader =
      envelope.getSdkMetadataForEnvelopeHeader;
    exports.parseEnvelope = envelope.parseEnvelope;
    exports.serializeEnvelope = envelope.serializeEnvelope;
    exports.createClientReportEnvelope =
      clientreport.createClientReportEnvelope;
    exports.DEFAULT_RETRY_AFTER = ratelimit.DEFAULT_RETRY_AFTER;
    exports.disabledUntil = ratelimit.disabledUntil;
    exports.isRateLimited = ratelimit.isRateLimited;
    exports.parseRetryAfterHeader = ratelimit.parseRetryAfterHeader;
    exports.updateRateLimits = ratelimit.updateRateLimits;
    exports.BAGGAGE_HEADER_NAME = baggage.BAGGAGE_HEADER_NAME;
    exports.MAX_BAGGAGE_STRING_LENGTH = baggage.MAX_BAGGAGE_STRING_LENGTH;
    exports.SENTRY_BAGGAGE_KEY_PREFIX = baggage.SENTRY_BAGGAGE_KEY_PREFIX;
    exports.SENTRY_BAGGAGE_KEY_PREFIX_REGEX =
      baggage.SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
    exports.baggageHeaderToDynamicSamplingContext =
      baggage.baggageHeaderToDynamicSamplingContext;
    exports.dynamicSamplingContextToSentryBaggageHeader =
      baggage.dynamicSamplingContextToSentryBaggageHeader;
    exports.getNumberOfUrlSegments = url.getNumberOfUrlSegments;
    exports.getSanitizedUrlString = url.getSanitizedUrlString;
    exports.parseUrl = url.parseUrl;
    exports.stripUrlQueryAndFragment = url.stripUrlQueryAndFragment;
    exports.addOrUpdateIntegration = userIntegrations.addOrUpdateIntegration;
    exports.makeFifoCache = cache.makeFifoCache;
    exports.escapeStringForRegex = escapeStringForRegex.escapeStringForRegex;
    exports.supportsHistory = supportsHistory.supportsHistory;
  },
});

// node_modules/@sentry/core/cjs/constants.js
var require_constants = __commonJS({
  "node_modules/@sentry/core/cjs/constants.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_ENVIRONMENT = "production";
    exports.DEFAULT_ENVIRONMENT = DEFAULT_ENVIRONMENT;
  },
});

// node_modules/@sentry/core/cjs/session.js
var require_session = __commonJS({
  "node_modules/@sentry/core/cjs/session.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    function makeSession(context) {
      const startingTime = utils.timestampInSeconds();
      const session = {
        sid: utils.uuid4(),
        init: true,
        timestamp: startingTime,
        started: startingTime,
        duration: 0,
        status: "ok",
        errors: 0,
        ignoreDuration: false,
        toJSON: () => sessionToJSON(session),
      };
      if (context) {
        updateSession(session, context);
      }
      return session;
    }
    function updateSession(session, context = {}) {
      if (context.user) {
        if (!session.ipAddress && context.user.ip_address) {
          session.ipAddress = context.user.ip_address;
        }
        if (!session.did && !context.did) {
          session.did =
            context.user.id || context.user.email || context.user.username;
        }
      }
      session.timestamp = context.timestamp || utils.timestampInSeconds();
      if (context.ignoreDuration) {
        session.ignoreDuration = context.ignoreDuration;
      }
      if (context.sid) {
        session.sid = context.sid.length === 32 ? context.sid : utils.uuid4();
      }
      if (context.init !== void 0) {
        session.init = context.init;
      }
      if (!session.did && context.did) {
        session.did = `${context.did}`;
      }
      if (typeof context.started === "number") {
        session.started = context.started;
      }
      if (session.ignoreDuration) {
        session.duration = void 0;
      } else if (typeof context.duration === "number") {
        session.duration = context.duration;
      } else {
        const duration = session.timestamp - session.started;
        session.duration = duration >= 0 ? duration : 0;
      }
      if (context.release) {
        session.release = context.release;
      }
      if (context.environment) {
        session.environment = context.environment;
      }
      if (!session.ipAddress && context.ipAddress) {
        session.ipAddress = context.ipAddress;
      }
      if (!session.userAgent && context.userAgent) {
        session.userAgent = context.userAgent;
      }
      if (typeof context.errors === "number") {
        session.errors = context.errors;
      }
      if (context.status) {
        session.status = context.status;
      }
    }
    function closeSession(session, status) {
      let context = {};
      if (status) {
        context = { status };
      } else if (session.status === "ok") {
        context = { status: "exited" };
      }
      updateSession(session, context);
    }
    function sessionToJSON(session) {
      return utils.dropUndefinedKeys({
        sid: `${session.sid}`,
        init: session.init,
        started: new Date(session.started * 1e3).toISOString(),
        timestamp: new Date(session.timestamp * 1e3).toISOString(),
        status: session.status,
        errors: session.errors,
        did:
          typeof session.did === "number" || typeof session.did === "string"
            ? `${session.did}`
            : void 0,
        duration: session.duration,
        attrs: {
          release: session.release,
          environment: session.environment,
          ip_address: session.ipAddress,
          user_agent: session.userAgent,
        },
      });
    }
    exports.closeSession = closeSession;
    exports.makeSession = makeSession;
    exports.updateSession = updateSession;
  },
});

// node_modules/@sentry/core/cjs/scope.js
var require_scope = __commonJS({
  "node_modules/@sentry/core/cjs/scope.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var session = require_session();
    var DEFAULT_MAX_BREADCRUMBS = 100;
    var Scope = class {
      constructor() {
        this._notifyingListeners = false;
        this._scopeListeners = [];
        this._eventProcessors = [];
        this._breadcrumbs = [];
        this._attachments = [];
        this._user = {};
        this._tags = {};
        this._extra = {};
        this._contexts = {};
        this._sdkProcessingMetadata = {};
        this._propagationContext = generatePropagationContext();
      }
      static clone(scope) {
        const newScope = new Scope();
        if (scope) {
          newScope._breadcrumbs = [...scope._breadcrumbs];
          newScope._tags = __spreadValues({}, scope._tags);
          newScope._extra = __spreadValues({}, scope._extra);
          newScope._contexts = __spreadValues({}, scope._contexts);
          newScope._user = scope._user;
          newScope._level = scope._level;
          newScope._span = scope._span;
          newScope._session = scope._session;
          newScope._transactionName = scope._transactionName;
          newScope._fingerprint = scope._fingerprint;
          newScope._eventProcessors = [...scope._eventProcessors];
          newScope._requestSession = scope._requestSession;
          newScope._attachments = [...scope._attachments];
          newScope._sdkProcessingMetadata = __spreadValues(
            {},
            scope._sdkProcessingMetadata,
          );
          newScope._propagationContext = __spreadValues(
            {},
            scope._propagationContext,
          );
        }
        return newScope;
      }
      addScopeListener(callback) {
        this._scopeListeners.push(callback);
      }
      addEventProcessor(callback) {
        this._eventProcessors.push(callback);
        return this;
      }
      setUser(user) {
        this._user = user || {};
        if (this._session) {
          session.updateSession(this._session, { user });
        }
        this._notifyScopeListeners();
        return this;
      }
      getUser() {
        return this._user;
      }
      getRequestSession() {
        return this._requestSession;
      }
      setRequestSession(requestSession) {
        this._requestSession = requestSession;
        return this;
      }
      setTags(tags) {
        this._tags = __spreadValues(__spreadValues({}, this._tags), tags);
        this._notifyScopeListeners();
        return this;
      }
      setTag(key, value) {
        this._tags = __spreadProps(__spreadValues({}, this._tags), {
          [key]: value,
        });
        this._notifyScopeListeners();
        return this;
      }
      setExtras(extras) {
        this._extra = __spreadValues(__spreadValues({}, this._extra), extras);
        this._notifyScopeListeners();
        return this;
      }
      setExtra(key, extra) {
        this._extra = __spreadProps(__spreadValues({}, this._extra), {
          [key]: extra,
        });
        this._notifyScopeListeners();
        return this;
      }
      setFingerprint(fingerprint) {
        this._fingerprint = fingerprint;
        this._notifyScopeListeners();
        return this;
      }
      setLevel(level) {
        this._level = level;
        this._notifyScopeListeners();
        return this;
      }
      setTransactionName(name) {
        this._transactionName = name;
        this._notifyScopeListeners();
        return this;
      }
      setContext(key, context) {
        if (context === null) {
          delete this._contexts[key];
        } else {
          this._contexts[key] = context;
        }
        this._notifyScopeListeners();
        return this;
      }
      setSpan(span) {
        this._span = span;
        this._notifyScopeListeners();
        return this;
      }
      getSpan() {
        return this._span;
      }
      getTransaction() {
        const span = this.getSpan();
        return span && span.transaction;
      }
      setSession(session2) {
        if (!session2) {
          delete this._session;
        } else {
          this._session = session2;
        }
        this._notifyScopeListeners();
        return this;
      }
      getSession() {
        return this._session;
      }
      update(captureContext) {
        if (!captureContext) {
          return this;
        }
        if (typeof captureContext === "function") {
          const updatedScope = captureContext(this);
          return updatedScope instanceof Scope ? updatedScope : this;
        }
        if (captureContext instanceof Scope) {
          this._tags = __spreadValues(
            __spreadValues({}, this._tags),
            captureContext._tags,
          );
          this._extra = __spreadValues(
            __spreadValues({}, this._extra),
            captureContext._extra,
          );
          this._contexts = __spreadValues(
            __spreadValues({}, this._contexts),
            captureContext._contexts,
          );
          if (
            captureContext._user &&
            Object.keys(captureContext._user).length
          ) {
            this._user = captureContext._user;
          }
          if (captureContext._level) {
            this._level = captureContext._level;
          }
          if (captureContext._fingerprint) {
            this._fingerprint = captureContext._fingerprint;
          }
          if (captureContext._requestSession) {
            this._requestSession = captureContext._requestSession;
          }
          if (captureContext._propagationContext) {
            this._propagationContext = captureContext._propagationContext;
          }
        } else if (utils.isPlainObject(captureContext)) {
          captureContext = captureContext;
          this._tags = __spreadValues(
            __spreadValues({}, this._tags),
            captureContext.tags,
          );
          this._extra = __spreadValues(
            __spreadValues({}, this._extra),
            captureContext.extra,
          );
          this._contexts = __spreadValues(
            __spreadValues({}, this._contexts),
            captureContext.contexts,
          );
          if (captureContext.user) {
            this._user = captureContext.user;
          }
          if (captureContext.level) {
            this._level = captureContext.level;
          }
          if (captureContext.fingerprint) {
            this._fingerprint = captureContext.fingerprint;
          }
          if (captureContext.requestSession) {
            this._requestSession = captureContext.requestSession;
          }
          if (captureContext.propagationContext) {
            this._propagationContext = captureContext.propagationContext;
          }
        }
        return this;
      }
      clear() {
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = void 0;
        this._transactionName = void 0;
        this._fingerprint = void 0;
        this._requestSession = void 0;
        this._span = void 0;
        this._session = void 0;
        this._notifyScopeListeners();
        this._attachments = [];
        this._propagationContext = generatePropagationContext();
        return this;
      }
      addBreadcrumb(breadcrumb, maxBreadcrumbs) {
        const maxCrumbs =
          typeof maxBreadcrumbs === "number"
            ? maxBreadcrumbs
            : DEFAULT_MAX_BREADCRUMBS;
        if (maxCrumbs <= 0) {
          return this;
        }
        const mergedBreadcrumb = __spreadValues(
          {
            timestamp: utils.dateTimestampInSeconds(),
          },
          breadcrumb,
        );
        this._breadcrumbs = [...this._breadcrumbs, mergedBreadcrumb].slice(
          -maxCrumbs,
        );
        this._notifyScopeListeners();
        return this;
      }
      getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1];
      }
      clearBreadcrumbs() {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
      }
      addAttachment(attachment) {
        this._attachments.push(attachment);
        return this;
      }
      getAttachments() {
        return this._attachments;
      }
      clearAttachments() {
        this._attachments = [];
        return this;
      }
      applyToEvent(event, hint = {}) {
        if (this._extra && Object.keys(this._extra).length) {
          event.extra = __spreadValues(
            __spreadValues({}, this._extra),
            event.extra,
          );
        }
        if (this._tags && Object.keys(this._tags).length) {
          event.tags = __spreadValues(
            __spreadValues({}, this._tags),
            event.tags,
          );
        }
        if (this._user && Object.keys(this._user).length) {
          event.user = __spreadValues(
            __spreadValues({}, this._user),
            event.user,
          );
        }
        if (this._contexts && Object.keys(this._contexts).length) {
          event.contexts = __spreadValues(
            __spreadValues({}, this._contexts),
            event.contexts,
          );
        }
        if (this._level) {
          event.level = this._level;
        }
        if (this._transactionName) {
          event.transaction = this._transactionName;
        }
        if (this._span) {
          event.contexts = __spreadValues(
            { trace: this._span.getTraceContext() },
            event.contexts,
          );
          const transaction = this._span.transaction;
          if (transaction) {
            event.sdkProcessingMetadata = __spreadValues(
              {
                dynamicSamplingContext: transaction.getDynamicSamplingContext(),
              },
              event.sdkProcessingMetadata,
            );
            const transactionName = transaction.name;
            if (transactionName) {
              event.tags = __spreadValues(
                { transaction: transactionName },
                event.tags,
              );
            }
          }
        }
        this._applyFingerprint(event);
        event.breadcrumbs = [
          ...(event.breadcrumbs || []),
          ...this._breadcrumbs,
        ];
        event.breadcrumbs =
          event.breadcrumbs.length > 0 ? event.breadcrumbs : void 0;
        event.sdkProcessingMetadata = __spreadProps(
          __spreadValues(
            __spreadValues({}, event.sdkProcessingMetadata),
            this._sdkProcessingMetadata,
          ),
          {
            propagationContext: this._propagationContext,
          },
        );
        return this._notifyEventProcessors(
          [...getGlobalEventProcessors(), ...this._eventProcessors],
          event,
          hint,
        );
      }
      setSDKProcessingMetadata(newData) {
        this._sdkProcessingMetadata = __spreadValues(
          __spreadValues({}, this._sdkProcessingMetadata),
          newData,
        );
        return this;
      }
      setPropagationContext(context) {
        this._propagationContext = context;
        return this;
      }
      getPropagationContext() {
        return this._propagationContext;
      }
      _notifyEventProcessors(processors, event, hint, index = 0) {
        return new utils.SyncPromise((resolve, reject) => {
          const processor = processors[index];
          if (event === null || typeof processor !== "function") {
            resolve(event);
          } else {
            const result = processor(__spreadValues({}, event), hint);
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              processor.id &&
              result === null &&
              utils.logger.log(
                `Event processor "${processor.id}" dropped event`,
              );
            if (utils.isThenable(result)) {
              void result
                .then((final) =>
                  this._notifyEventProcessors(
                    processors,
                    final,
                    hint,
                    index + 1,
                  ).then(resolve),
                )
                .then(null, reject);
            } else {
              void this._notifyEventProcessors(
                processors,
                result,
                hint,
                index + 1,
              )
                .then(resolve)
                .then(null, reject);
            }
          }
        });
      }
      _notifyScopeListeners() {
        if (!this._notifyingListeners) {
          this._notifyingListeners = true;
          this._scopeListeners.forEach((callback) => {
            callback(this);
          });
          this._notifyingListeners = false;
        }
      }
      _applyFingerprint(event) {
        event.fingerprint = event.fingerprint
          ? utils.arrayify(event.fingerprint)
          : [];
        if (this._fingerprint) {
          event.fingerprint = event.fingerprint.concat(this._fingerprint);
        }
        if (event.fingerprint && !event.fingerprint.length) {
          delete event.fingerprint;
        }
      }
    };
    function getGlobalEventProcessors() {
      return utils.getGlobalSingleton("globalEventProcessors", () => []);
    }
    function addGlobalEventProcessor(callback) {
      getGlobalEventProcessors().push(callback);
    }
    function generatePropagationContext() {
      return {
        traceId: utils.uuid4(),
        spanId: utils.uuid4().substring(16),
        sampled: false,
      };
    }
    exports.Scope = Scope;
    exports.addGlobalEventProcessor = addGlobalEventProcessor;
  },
});

// node_modules/@sentry/core/cjs/hub.js
var require_hub = __commonJS({
  "node_modules/@sentry/core/cjs/hub.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var constants = require_constants();
    var scope = require_scope();
    var session = require_session();
    var API_VERSION = 4;
    var DEFAULT_BREADCRUMBS = 100;
    var Hub = class {
      constructor(client, scope$1 = new scope.Scope(), _version = API_VERSION) {
        this._version = _version;
        this._stack = [{ scope: scope$1 }];
        if (client) {
          this.bindClient(client);
        }
      }
      isOlderThan(version) {
        return this._version < version;
      }
      bindClient(client) {
        const top = this.getStackTop();
        top.client = client;
        if (client && client.setupIntegrations) {
          client.setupIntegrations();
        }
      }
      pushScope() {
        const scope$1 = scope.Scope.clone(this.getScope());
        this.getStack().push({
          client: this.getClient(),
          scope: scope$1,
        });
        return scope$1;
      }
      popScope() {
        if (this.getStack().length <= 1) return false;
        return !!this.getStack().pop();
      }
      withScope(callback) {
        const scope2 = this.pushScope();
        try {
          callback(scope2);
        } finally {
          this.popScope();
        }
      }
      getClient() {
        return this.getStackTop().client;
      }
      getScope() {
        return this.getStackTop().scope;
      }
      getStack() {
        return this._stack;
      }
      getStackTop() {
        return this._stack[this._stack.length - 1];
      }
      captureException(exception, hint) {
        const eventId = (this._lastEventId =
          hint && hint.event_id ? hint.event_id : utils.uuid4());
        const syntheticException = new Error("Sentry syntheticException");
        this._withClient((client, scope2) => {
          client.captureException(
            exception,
            __spreadProps(
              __spreadValues(
                {
                  originalException: exception,
                  syntheticException,
                },
                hint,
              ),
              {
                event_id: eventId,
              },
            ),
            scope2,
          );
        });
        return eventId;
      }
      captureMessage(message, level, hint) {
        const eventId = (this._lastEventId =
          hint && hint.event_id ? hint.event_id : utils.uuid4());
        const syntheticException = new Error(message);
        this._withClient((client, scope2) => {
          client.captureMessage(
            message,
            level,
            __spreadProps(
              __spreadValues(
                {
                  originalException: message,
                  syntheticException,
                },
                hint,
              ),
              {
                event_id: eventId,
              },
            ),
            scope2,
          );
        });
        return eventId;
      }
      captureEvent(event, hint) {
        const eventId = hint && hint.event_id ? hint.event_id : utils.uuid4();
        if (!event.type) {
          this._lastEventId = eventId;
        }
        this._withClient((client, scope2) => {
          client.captureEvent(
            event,
            __spreadProps(__spreadValues({}, hint), { event_id: eventId }),
            scope2,
          );
        });
        return eventId;
      }
      lastEventId() {
        return this._lastEventId;
      }
      addBreadcrumb(breadcrumb, hint) {
        const { scope: scope2, client } = this.getStackTop();
        if (!client) return;
        const {
          beforeBreadcrumb = null,
          maxBreadcrumbs = DEFAULT_BREADCRUMBS,
        } = (client.getOptions && client.getOptions()) || {};
        if (maxBreadcrumbs <= 0) return;
        const timestamp = utils.dateTimestampInSeconds();
        const mergedBreadcrumb = __spreadValues({ timestamp }, breadcrumb);
        const finalBreadcrumb = beforeBreadcrumb
          ? utils.consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint))
          : mergedBreadcrumb;
        if (finalBreadcrumb === null) return;
        if (client.emit) {
          client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
        }
        scope2.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
      }
      setUser(user) {
        this.getScope().setUser(user);
      }
      setTags(tags) {
        this.getScope().setTags(tags);
      }
      setExtras(extras) {
        this.getScope().setExtras(extras);
      }
      setTag(key, value) {
        this.getScope().setTag(key, value);
      }
      setExtra(key, extra) {
        this.getScope().setExtra(key, extra);
      }
      setContext(name, context) {
        this.getScope().setContext(name, context);
      }
      configureScope(callback) {
        const { scope: scope2, client } = this.getStackTop();
        if (client) {
          callback(scope2);
        }
      }
      run(callback) {
        const oldHub = makeMain(this);
        try {
          callback(this);
        } finally {
          makeMain(oldHub);
        }
      }
      getIntegration(integration) {
        const client = this.getClient();
        if (!client) return null;
        try {
          return client.getIntegration(integration);
        } catch (_oO) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              `Cannot retrieve integration ${integration.id} from the current Hub`,
            );
          return null;
        }
      }
      startTransaction(context, customSamplingContext) {
        const result = this._callExtensionMethod(
          "startTransaction",
          context,
          customSamplingContext,
        );
        if (
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          !result
        ) {
          console.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`);
        }
        return result;
      }
      traceHeaders() {
        return this._callExtensionMethod("traceHeaders");
      }
      captureSession(endSession = false) {
        if (endSession) {
          return this.endSession();
        }
        this._sendSessionUpdate();
      }
      endSession() {
        const layer = this.getStackTop();
        const scope2 = layer.scope;
        const session$1 = scope2.getSession();
        if (session$1) {
          session.closeSession(session$1);
        }
        this._sendSessionUpdate();
        scope2.setSession();
      }
      startSession(context) {
        const { scope: scope2, client } = this.getStackTop();
        const { release, environment = constants.DEFAULT_ENVIRONMENT } =
          (client && client.getOptions()) || {};
        const { userAgent } = utils.GLOBAL_OBJ.navigator || {};
        const session$1 = session.makeSession(
          __spreadValues(
            __spreadValues(
              {
                release,
                environment,
                user: scope2.getUser(),
              },
              userAgent && { userAgent },
            ),
            context,
          ),
        );
        const currentSession = scope2.getSession && scope2.getSession();
        if (currentSession && currentSession.status === "ok") {
          session.updateSession(currentSession, { status: "exited" });
        }
        this.endSession();
        scope2.setSession(session$1);
        return session$1;
      }
      shouldSendDefaultPii() {
        const client = this.getClient();
        const options = client && client.getOptions();
        return Boolean(options && options.sendDefaultPii);
      }
      _sendSessionUpdate() {
        const { scope: scope2, client } = this.getStackTop();
        const session2 = scope2.getSession();
        if (session2 && client && client.captureSession) {
          client.captureSession(session2);
        }
      }
      _withClient(callback) {
        const { scope: scope2, client } = this.getStackTop();
        if (client) {
          callback(client, scope2);
        }
      }
      _callExtensionMethod(method, ...args) {
        const carrier = getMainCarrier();
        const sentry = carrier.__SENTRY__;
        if (
          sentry &&
          sentry.extensions &&
          typeof sentry.extensions[method] === "function"
        ) {
          return sentry.extensions[method].apply(this, args);
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            `Extension method ${method} couldn't be found, doing nothing.`,
          );
      }
    };
    function getMainCarrier() {
      utils.GLOBAL_OBJ.__SENTRY__ = utils.GLOBAL_OBJ.__SENTRY__ || {
        extensions: {},
        hub: void 0,
      };
      return utils.GLOBAL_OBJ;
    }
    function makeMain(hub) {
      const registry = getMainCarrier();
      const oldHub = getHubFromCarrier(registry);
      setHubOnCarrier(registry, hub);
      return oldHub;
    }
    function getCurrentHub() {
      const registry = getMainCarrier();
      if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
        const hub = registry.__SENTRY__.acs.getCurrentHub();
        if (hub) {
          return hub;
        }
      }
      return getGlobalHub(registry);
    }
    function getGlobalHub(registry = getMainCarrier()) {
      if (
        !hasHubOnCarrier(registry) ||
        getHubFromCarrier(registry).isOlderThan(API_VERSION)
      ) {
        setHubOnCarrier(registry, new Hub());
      }
      return getHubFromCarrier(registry);
    }
    function ensureHubOnCarrier(carrier, parent = getGlobalHub()) {
      if (
        !hasHubOnCarrier(carrier) ||
        getHubFromCarrier(carrier).isOlderThan(API_VERSION)
      ) {
        const globalHubTopStack = parent.getStackTop();
        setHubOnCarrier(
          carrier,
          new Hub(
            globalHubTopStack.client,
            scope.Scope.clone(globalHubTopStack.scope),
          ),
        );
      }
    }
    function setAsyncContextStrategy(strategy) {
      const registry = getMainCarrier();
      registry.__SENTRY__ = registry.__SENTRY__ || {};
      registry.__SENTRY__.acs = strategy;
    }
    function runWithAsyncContext(callback, options = {}) {
      const registry = getMainCarrier();
      if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
        return registry.__SENTRY__.acs.runWithAsyncContext(callback, options);
      }
      return callback();
    }
    function hasHubOnCarrier(carrier) {
      return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
    }
    function getHubFromCarrier(carrier) {
      return utils.getGlobalSingleton("hub", () => new Hub(), carrier);
    }
    function setHubOnCarrier(carrier, hub) {
      if (!carrier) return false;
      const __SENTRY__ = (carrier.__SENTRY__ = carrier.__SENTRY__ || {});
      __SENTRY__.hub = hub;
      return true;
    }
    exports.API_VERSION = API_VERSION;
    exports.Hub = Hub;
    exports.ensureHubOnCarrier = ensureHubOnCarrier;
    exports.getCurrentHub = getCurrentHub;
    exports.getHubFromCarrier = getHubFromCarrier;
    exports.getMainCarrier = getMainCarrier;
    exports.makeMain = makeMain;
    exports.runWithAsyncContext = runWithAsyncContext;
    exports.setAsyncContextStrategy = setAsyncContextStrategy;
    exports.setHubOnCarrier = setHubOnCarrier;
  },
});

// node_modules/@sentry/core/cjs/utils/hasTracingEnabled.js
var require_hasTracingEnabled = __commonJS({
  "node_modules/@sentry/core/cjs/utils/hasTracingEnabled.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var hub = require_hub();
    function hasTracingEnabled(maybeOptions) {
      if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
        return false;
      }
      const client = hub.getCurrentHub().getClient();
      const options = maybeOptions || (client && client.getOptions());
      return (
        !!options &&
        (options.enableTracing ||
          "tracesSampleRate" in options ||
          "tracesSampler" in options)
      );
    }
    exports.hasTracingEnabled = hasTracingEnabled;
  },
});

// node_modules/@sentry/core/cjs/tracing/utils.js
var require_utils = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/utils.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var hub = require_hub();
    var utils = require_cjs();
    function getActiveTransaction(maybeHub) {
      const hub$1 = maybeHub || hub.getCurrentHub();
      const scope = hub$1.getScope();
      return scope.getTransaction();
    }
    exports.TRACEPARENT_REGEXP = utils.TRACEPARENT_REGEXP;
    exports.extractTraceparentData = utils.extractTraceparentData;
    exports.stripUrlQueryAndFragment = utils.stripUrlQueryAndFragment;
    exports.getActiveTransaction = getActiveTransaction;
  },
});

// node_modules/@sentry/core/cjs/tracing/errors.js
var require_errors = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/errors.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var utils$1 = require_utils();
    var errorsInstrumented = false;
    function registerErrorInstrumentation() {
      if (errorsInstrumented) {
        return;
      }
      errorsInstrumented = true;
      utils.addInstrumentationHandler("error", errorCallback);
      utils.addInstrumentationHandler("unhandledrejection", errorCallback);
    }
    function errorCallback() {
      const activeTransaction = utils$1.getActiveTransaction();
      if (activeTransaction) {
        const status = "internal_error";
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            `[Tracing] Transaction: ${status} -> Global error occured`,
          );
        activeTransaction.setStatus(status);
      }
    }
    errorCallback.tag = "sentry_tracingErrorCallback";
    exports.registerErrorInstrumentation = registerErrorInstrumentation;
  },
});

// node_modules/@sentry/core/cjs/tracing/span.js
var require_span = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/span.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var SpanRecorder = class {
      __init() {
        this.spans = [];
      }
      constructor(maxlen = 1e3) {
        SpanRecorder.prototype.__init.call(this);
        this._maxlen = maxlen;
      }
      add(span) {
        if (this.spans.length > this._maxlen) {
          span.spanRecorder = void 0;
        } else {
          this.spans.push(span);
        }
      }
    };
    var Span = class {
      __init2() {
        this.traceId = utils.uuid4();
      }
      __init3() {
        this.spanId = utils.uuid4().substring(16);
      }
      __init4() {
        this.startTimestamp = utils.timestampInSeconds();
      }
      __init5() {
        this.tags = {};
      }
      __init6() {
        this.data = {};
      }
      __init7() {
        this.instrumenter = "sentry";
      }
      constructor(spanContext) {
        Span.prototype.__init2.call(this);
        Span.prototype.__init3.call(this);
        Span.prototype.__init4.call(this);
        Span.prototype.__init5.call(this);
        Span.prototype.__init6.call(this);
        Span.prototype.__init7.call(this);
        if (!spanContext) {
          return this;
        }
        if (spanContext.traceId) {
          this.traceId = spanContext.traceId;
        }
        if (spanContext.spanId) {
          this.spanId = spanContext.spanId;
        }
        if (spanContext.parentSpanId) {
          this.parentSpanId = spanContext.parentSpanId;
        }
        if ("sampled" in spanContext) {
          this.sampled = spanContext.sampled;
        }
        if (spanContext.op) {
          this.op = spanContext.op;
        }
        if (spanContext.description) {
          this.description = spanContext.description;
        }
        if (spanContext.data) {
          this.data = spanContext.data;
        }
        if (spanContext.tags) {
          this.tags = spanContext.tags;
        }
        if (spanContext.status) {
          this.status = spanContext.status;
        }
        if (spanContext.startTimestamp) {
          this.startTimestamp = spanContext.startTimestamp;
        }
        if (spanContext.endTimestamp) {
          this.endTimestamp = spanContext.endTimestamp;
        }
        if (spanContext.instrumenter) {
          this.instrumenter = spanContext.instrumenter;
        }
      }
      startChild(spanContext) {
        const childSpan = new Span(
          __spreadProps(__spreadValues({}, spanContext), {
            parentSpanId: this.spanId,
            sampled: this.sampled,
            traceId: this.traceId,
          }),
        );
        childSpan.spanRecorder = this.spanRecorder;
        if (childSpan.spanRecorder) {
          childSpan.spanRecorder.add(childSpan);
        }
        childSpan.transaction = this.transaction;
        if (
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          childSpan.transaction
        ) {
          const opStr = (spanContext && spanContext.op) || "< unknown op >";
          const nameStr = childSpan.transaction.name || "< unknown name >";
          const idStr = childSpan.transaction.spanId;
          const logMessage = `[Tracing] Starting '${opStr}' span on transaction '${nameStr}' (${idStr}).`;
          childSpan.transaction.metadata.spanMetadata[childSpan.spanId] = {
            logMessage,
          };
          utils.logger.log(logMessage);
        }
        return childSpan;
      }
      setTag(key, value) {
        this.tags = __spreadProps(__spreadValues({}, this.tags), {
          [key]: value,
        });
        return this;
      }
      setData(key, value) {
        this.data = __spreadProps(__spreadValues({}, this.data), {
          [key]: value,
        });
        return this;
      }
      setStatus(value) {
        this.status = value;
        return this;
      }
      setHttpStatus(httpStatus) {
        this.setTag("http.status_code", String(httpStatus));
        this.setData("http.response.status_code", httpStatus);
        const spanStatus = spanStatusfromHttpCode(httpStatus);
        if (spanStatus !== "unknown_error") {
          this.setStatus(spanStatus);
        }
        return this;
      }
      isSuccess() {
        return this.status === "ok";
      }
      finish(endTimestamp) {
        if (
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          this.transaction &&
          this.transaction.spanId !== this.spanId
        ) {
          const { logMessage } =
            this.transaction.metadata.spanMetadata[this.spanId];
          if (logMessage) {
            utils.logger.log(logMessage.replace("Starting", "Finishing"));
          }
        }
        this.endTimestamp =
          typeof endTimestamp === "number"
            ? endTimestamp
            : utils.timestampInSeconds();
      }
      toTraceparent() {
        return utils.generateSentryTraceHeader(
          this.traceId,
          this.spanId,
          this.sampled,
        );
      }
      toContext() {
        return utils.dropUndefinedKeys({
          data: this.data,
          description: this.description,
          endTimestamp: this.endTimestamp,
          op: this.op,
          parentSpanId: this.parentSpanId,
          sampled: this.sampled,
          spanId: this.spanId,
          startTimestamp: this.startTimestamp,
          status: this.status,
          tags: this.tags,
          traceId: this.traceId,
        });
      }
      updateWithContext(spanContext) {
        this.data = spanContext.data || {};
        this.description = spanContext.description;
        this.endTimestamp = spanContext.endTimestamp;
        this.op = spanContext.op;
        this.parentSpanId = spanContext.parentSpanId;
        this.sampled = spanContext.sampled;
        this.spanId = spanContext.spanId || this.spanId;
        this.startTimestamp = spanContext.startTimestamp || this.startTimestamp;
        this.status = spanContext.status;
        this.tags = spanContext.tags || {};
        this.traceId = spanContext.traceId || this.traceId;
        return this;
      }
      getTraceContext() {
        return utils.dropUndefinedKeys({
          data: Object.keys(this.data).length > 0 ? this.data : void 0,
          description: this.description,
          op: this.op,
          parent_span_id: this.parentSpanId,
          span_id: this.spanId,
          status: this.status,
          tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
          trace_id: this.traceId,
        });
      }
      toJSON() {
        return utils.dropUndefinedKeys({
          data: Object.keys(this.data).length > 0 ? this.data : void 0,
          description: this.description,
          op: this.op,
          parent_span_id: this.parentSpanId,
          span_id: this.spanId,
          start_timestamp: this.startTimestamp,
          status: this.status,
          tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
          timestamp: this.endTimestamp,
          trace_id: this.traceId,
        });
      }
    };
    function spanStatusfromHttpCode(httpStatus) {
      if (httpStatus < 400 && httpStatus >= 100) {
        return "ok";
      }
      if (httpStatus >= 400 && httpStatus < 500) {
        switch (httpStatus) {
          case 401:
            return "unauthenticated";
          case 403:
            return "permission_denied";
          case 404:
            return "not_found";
          case 409:
            return "already_exists";
          case 413:
            return "failed_precondition";
          case 429:
            return "resource_exhausted";
          default:
            return "invalid_argument";
        }
      }
      if (httpStatus >= 500 && httpStatus < 600) {
        switch (httpStatus) {
          case 501:
            return "unimplemented";
          case 503:
            return "unavailable";
          case 504:
            return "deadline_exceeded";
          default:
            return "internal_error";
        }
      }
      return "unknown_error";
    }
    exports.Span = Span;
    exports.SpanRecorder = SpanRecorder;
    exports.spanStatusfromHttpCode = spanStatusfromHttpCode;
  },
});

// node_modules/@sentry/core/cjs/tracing/dynamicSamplingContext.js
var require_dynamicSamplingContext = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/dynamicSamplingContext.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var constants = require_constants();
    function getDynamicSamplingContextFromClient(trace_id, client, scope) {
      const options = client.getOptions();
      const { publicKey: public_key } = client.getDsn() || {};
      const { segment: user_segment } = (scope && scope.getUser()) || {};
      const dsc = utils.dropUndefinedKeys({
        environment: options.environment || constants.DEFAULT_ENVIRONMENT,
        release: options.release,
        user_segment,
        public_key,
        trace_id,
      });
      client.emit && client.emit("createDsc", dsc);
      return dsc;
    }
    exports.getDynamicSamplingContextFromClient =
      getDynamicSamplingContextFromClient;
  },
});

// node_modules/@sentry/core/cjs/tracing/transaction.js
var require_transaction = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/transaction.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    var span = require_span();
    var Transaction = class extends span.Span {
      __init() {
        this._measurements = {};
      }
      __init2() {
        this._contexts = {};
      }
      __init3() {
        this._frozenDynamicSamplingContext = void 0;
      }
      constructor(transactionContext, hub$1) {
        super(transactionContext);
        Transaction.prototype.__init.call(this);
        Transaction.prototype.__init2.call(this);
        Transaction.prototype.__init3.call(this);
        this._hub = hub$1 || hub.getCurrentHub();
        this._name = transactionContext.name || "";
        this.metadata = __spreadProps(
          __spreadValues(
            {
              source: "custom",
            },
            transactionContext.metadata,
          ),
          {
            spanMetadata: {},
          },
        );
        this._trimEnd = transactionContext.trimEnd;
        this.transaction = this;
        const incomingDynamicSamplingContext =
          this.metadata.dynamicSamplingContext;
        if (incomingDynamicSamplingContext) {
          this._frozenDynamicSamplingContext = __spreadValues(
            {},
            incomingDynamicSamplingContext,
          );
        }
      }
      get name() {
        return this._name;
      }
      set name(newName) {
        this.setName(newName);
      }
      setName(name, source = "custom") {
        this._name = name;
        this.metadata.source = source;
      }
      initSpanRecorder(maxlen = 1e3) {
        if (!this.spanRecorder) {
          this.spanRecorder = new span.SpanRecorder(maxlen);
        }
        this.spanRecorder.add(this);
      }
      setContext(key, context) {
        if (context === null) {
          delete this._contexts[key];
        } else {
          this._contexts[key] = context;
        }
      }
      setMeasurement(name, value, unit = "") {
        this._measurements[name] = { value, unit };
      }
      setMetadata(newMetadata) {
        this.metadata = __spreadValues(
          __spreadValues({}, this.metadata),
          newMetadata,
        );
      }
      finish(endTimestamp) {
        if (this.endTimestamp !== void 0) {
          return void 0;
        }
        if (!this.name) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              "Transaction has no name, falling back to `<unlabeled transaction>`.",
            );
          this.name = "<unlabeled transaction>";
        }
        super.finish(endTimestamp);
        const client = this._hub.getClient();
        if (client && client.emit) {
          client.emit("finishTransaction", this);
        }
        if (this.sampled !== true) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "[Tracing] Discarding transaction because its trace was not chosen to be sampled.",
            );
          if (client) {
            client.recordDroppedEvent("sample_rate", "transaction");
          }
          return void 0;
        }
        const finishedSpans = this.spanRecorder
          ? this.spanRecorder.spans.filter((s) => s !== this && s.endTimestamp)
          : [];
        if (this._trimEnd && finishedSpans.length > 0) {
          this.endTimestamp = finishedSpans.reduce((prev, current) => {
            if (prev.endTimestamp && current.endTimestamp) {
              return prev.endTimestamp > current.endTimestamp ? prev : current;
            }
            return prev;
          }).endTimestamp;
        }
        const metadata = this.metadata;
        const transaction = __spreadValues(
          {
            contexts: __spreadProps(__spreadValues({}, this._contexts), {
              trace: this.getTraceContext(),
            }),
            spans: finishedSpans,
            start_timestamp: this.startTimestamp,
            tags: this.tags,
            timestamp: this.endTimestamp,
            transaction: this.name,
            type: "transaction",
            sdkProcessingMetadata: __spreadProps(__spreadValues({}, metadata), {
              dynamicSamplingContext: this.getDynamicSamplingContext(),
            }),
          },
          metadata.source && {
            transaction_info: {
              source: metadata.source,
            },
          },
        );
        const hasMeasurements = Object.keys(this._measurements).length > 0;
        if (hasMeasurements) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "[Measurements] Adding measurements to transaction",
              JSON.stringify(this._measurements, void 0, 2),
            );
          transaction.measurements = this._measurements;
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            `[Tracing] Finishing ${this.op} transaction: ${this.name}.`,
          );
        return this._hub.captureEvent(transaction);
      }
      toContext() {
        const spanContext = super.toContext();
        return utils.dropUndefinedKeys(
          __spreadProps(__spreadValues({}, spanContext), {
            name: this.name,
            trimEnd: this._trimEnd,
          }),
        );
      }
      updateWithContext(transactionContext) {
        super.updateWithContext(transactionContext);
        this.name = transactionContext.name || "";
        this._trimEnd = transactionContext.trimEnd;
        return this;
      }
      getDynamicSamplingContext() {
        if (this._frozenDynamicSamplingContext) {
          return this._frozenDynamicSamplingContext;
        }
        const hub$1 = this._hub || hub.getCurrentHub();
        const client = hub$1.getClient();
        if (!client) return {};
        const scope = hub$1.getScope();
        const dsc = dynamicSamplingContext.getDynamicSamplingContextFromClient(
          this.traceId,
          client,
          scope,
        );
        const maybeSampleRate = this.metadata.sampleRate;
        if (maybeSampleRate !== void 0) {
          dsc.sample_rate = `${maybeSampleRate}`;
        }
        const source = this.metadata.source;
        if (source && source !== "url") {
          dsc.transaction = this.name;
        }
        if (this.sampled !== void 0) {
          dsc.sampled = String(this.sampled);
        }
        return dsc;
      }
      setHub(hub2) {
        this._hub = hub2;
      }
    };
    exports.Transaction = Transaction;
  },
});

// node_modules/@sentry/core/cjs/tracing/idletransaction.js
var require_idletransaction = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/idletransaction.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var span = require_span();
    var transaction = require_transaction();
    var TRACING_DEFAULTS = {
      idleTimeout: 1e3,
      finalTimeout: 3e4,
      heartbeatInterval: 5e3,
    };
    var FINISH_REASON_TAG = "finishReason";
    var IDLE_TRANSACTION_FINISH_REASONS = [
      "heartbeatFailed",
      "idleTimeout",
      "documentHidden",
      "finalTimeout",
      "externalFinish",
      "cancelled",
    ];
    var IdleTransactionSpanRecorder = class extends span.SpanRecorder {
      constructor(_pushActivity, _popActivity, transactionSpanId, maxlen) {
        super(maxlen);
        this._pushActivity = _pushActivity;
        this._popActivity = _popActivity;
        this.transactionSpanId = transactionSpanId;
      }
      add(span2) {
        if (span2.spanId !== this.transactionSpanId) {
          span2.finish = (endTimestamp) => {
            span2.endTimestamp =
              typeof endTimestamp === "number"
                ? endTimestamp
                : utils.timestampInSeconds();
            this._popActivity(span2.spanId);
          };
          if (span2.endTimestamp === void 0) {
            this._pushActivity(span2.spanId);
          }
        }
        super.add(span2);
      }
    };
    var IdleTransaction = class extends transaction.Transaction {
      __init() {
        this.activities = {};
      }
      __init2() {
        this._heartbeatCounter = 0;
      }
      __init3() {
        this._finished = false;
      }
      __init4() {
        this._idleTimeoutCanceledPermanently = false;
      }
      __init5() {
        this._beforeFinishCallbacks = [];
      }
      __init6() {
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[4];
      }
      constructor(
        transactionContext,
        _idleHub,
        _idleTimeout = TRACING_DEFAULTS.idleTimeout,
        _finalTimeout = TRACING_DEFAULTS.finalTimeout,
        _heartbeatInterval = TRACING_DEFAULTS.heartbeatInterval,
        _onScope = false,
      ) {
        super(transactionContext, _idleHub);
        this._idleHub = _idleHub;
        this._idleTimeout = _idleTimeout;
        this._finalTimeout = _finalTimeout;
        this._heartbeatInterval = _heartbeatInterval;
        this._onScope = _onScope;
        IdleTransaction.prototype.__init.call(this);
        IdleTransaction.prototype.__init2.call(this);
        IdleTransaction.prototype.__init3.call(this);
        IdleTransaction.prototype.__init4.call(this);
        IdleTransaction.prototype.__init5.call(this);
        IdleTransaction.prototype.__init6.call(this);
        if (_onScope) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              `Setting idle transaction on scope. Span ID: ${this.spanId}`,
            );
          _idleHub.configureScope((scope) => scope.setSpan(this));
        }
        this._restartIdleTimeout();
        setTimeout(() => {
          if (!this._finished) {
            this.setStatus("deadline_exceeded");
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[3];
            this.finish();
          }
        }, this._finalTimeout);
      }
      finish(endTimestamp = utils.timestampInSeconds()) {
        this._finished = true;
        this.activities = {};
        if (this.op === "ui.action.click") {
          this.setTag(FINISH_REASON_TAG, this._finishReason);
        }
        if (this.spanRecorder) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "[Tracing] finishing IdleTransaction",
              new Date(endTimestamp * 1e3).toISOString(),
              this.op,
            );
          for (const callback of this._beforeFinishCallbacks) {
            callback(this, endTimestamp);
          }
          this.spanRecorder.spans = this.spanRecorder.spans.filter((span2) => {
            if (span2.spanId === this.spanId) {
              return true;
            }
            if (!span2.endTimestamp) {
              span2.endTimestamp = endTimestamp;
              span2.setStatus("cancelled");
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                utils.logger.log(
                  "[Tracing] cancelling span since transaction ended early",
                  JSON.stringify(span2, void 0, 2),
                );
            }
            const keepSpan = span2.startTimestamp < endTimestamp;
            if (!keepSpan) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                utils.logger.log(
                  "[Tracing] discarding Span since it happened after Transaction was finished",
                  JSON.stringify(span2, void 0, 2),
                );
            }
            return keepSpan;
          });
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log("[Tracing] flushing IdleTransaction");
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log("[Tracing] No active IdleTransaction");
        }
        if (this._onScope) {
          const scope = this._idleHub.getScope();
          if (scope.getTransaction() === this) {
            scope.setSpan(void 0);
          }
        }
        return super.finish(endTimestamp);
      }
      registerBeforeFinishCallback(callback) {
        this._beforeFinishCallbacks.push(callback);
      }
      initSpanRecorder(maxlen) {
        if (!this.spanRecorder) {
          const pushActivity = (id) => {
            if (this._finished) {
              return;
            }
            this._pushActivity(id);
          };
          const popActivity = (id) => {
            if (this._finished) {
              return;
            }
            this._popActivity(id);
          };
          this.spanRecorder = new IdleTransactionSpanRecorder(
            pushActivity,
            popActivity,
            this.spanId,
            maxlen,
          );
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log("Starting heartbeat");
          this._pingHeartbeat();
        }
        this.spanRecorder.add(this);
      }
      cancelIdleTimeout(
        endTimestamp,
        { restartOnChildSpanChange } = {
          restartOnChildSpanChange: true,
        },
      ) {
        this._idleTimeoutCanceledPermanently =
          restartOnChildSpanChange === false;
        if (this._idleTimeoutID) {
          clearTimeout(this._idleTimeoutID);
          this._idleTimeoutID = void 0;
          if (
            Object.keys(this.activities).length === 0 &&
            this._idleTimeoutCanceledPermanently
          ) {
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
            this.finish(endTimestamp);
          }
        }
      }
      setFinishReason(reason) {
        this._finishReason = reason;
      }
      _restartIdleTimeout(endTimestamp) {
        this.cancelIdleTimeout();
        this._idleTimeoutID = setTimeout(() => {
          if (!this._finished && Object.keys(this.activities).length === 0) {
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[1];
            this.finish(endTimestamp);
          }
        }, this._idleTimeout);
      }
      _pushActivity(spanId) {
        this.cancelIdleTimeout(void 0, {
          restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently,
        });
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(`[Tracing] pushActivity: ${spanId}`);
        this.activities[spanId] = true;
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            "[Tracing] new activities count",
            Object.keys(this.activities).length,
          );
      }
      _popActivity(spanId) {
        if (this.activities[spanId]) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(`[Tracing] popActivity ${spanId}`);
          delete this.activities[spanId];
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "[Tracing] new activities count",
              Object.keys(this.activities).length,
            );
        }
        if (Object.keys(this.activities).length === 0) {
          const endTimestamp = utils.timestampInSeconds();
          if (this._idleTimeoutCanceledPermanently) {
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
            this.finish(endTimestamp);
          } else {
            this._restartIdleTimeout(endTimestamp + this._idleTimeout / 1e3);
          }
        }
      }
      _beat() {
        if (this._finished) {
          return;
        }
        const heartbeatString = Object.keys(this.activities).join("");
        if (heartbeatString === this._prevHeartbeatString) {
          this._heartbeatCounter++;
        } else {
          this._heartbeatCounter = 1;
        }
        this._prevHeartbeatString = heartbeatString;
        if (this._heartbeatCounter >= 3) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "[Tracing] Transaction finished because of no change for 3 heart beats",
            );
          this.setStatus("deadline_exceeded");
          this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[0];
          this.finish();
        } else {
          this._pingHeartbeat();
        }
      }
      _pingHeartbeat() {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            `pinging Heartbeat -> current counter: ${this._heartbeatCounter}`,
          );
        setTimeout(() => {
          this._beat();
        }, this._heartbeatInterval);
      }
    };
    exports.IdleTransaction = IdleTransaction;
    exports.IdleTransactionSpanRecorder = IdleTransactionSpanRecorder;
    exports.TRACING_DEFAULTS = TRACING_DEFAULTS;
  },
});

// node_modules/@sentry/core/cjs/tracing/hubextensions.js
var require_hubextensions = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/hubextensions.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var hasTracingEnabled = require_hasTracingEnabled();
    var errors = require_errors();
    var idletransaction = require_idletransaction();
    var transaction = require_transaction();
    function traceHeaders() {
      const scope = this.getScope();
      const span = scope.getSpan();
      return span
        ? {
            "sentry-trace": span.toTraceparent(),
          }
        : {};
    }
    function sample(transaction2, options, samplingContext) {
      if (!hasTracingEnabled.hasTracingEnabled(options)) {
        transaction2.sampled = false;
        return transaction2;
      }
      if (transaction2.sampled !== void 0) {
        transaction2.setMetadata({
          sampleRate: Number(transaction2.sampled),
        });
        return transaction2;
      }
      let sampleRate;
      if (typeof options.tracesSampler === "function") {
        sampleRate = options.tracesSampler(samplingContext);
        transaction2.setMetadata({
          sampleRate: Number(sampleRate),
        });
      } else if (samplingContext.parentSampled !== void 0) {
        sampleRate = samplingContext.parentSampled;
      } else if (typeof options.tracesSampleRate !== "undefined") {
        sampleRate = options.tracesSampleRate;
        transaction2.setMetadata({
          sampleRate: Number(sampleRate),
        });
      } else {
        sampleRate = 1;
        transaction2.setMetadata({
          sampleRate,
        });
      }
      if (!isValidSampleRate(sampleRate)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            "[Tracing] Discarding transaction because of invalid sample rate.",
          );
        transaction2.sampled = false;
        return transaction2;
      }
      if (!sampleRate) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            `[Tracing] Discarding transaction because ${
              typeof options.tracesSampler === "function"
                ? "tracesSampler returned 0 or false"
                : "a negative sampling decision was inherited or tracesSampleRate is set to 0"
            }`,
          );
        transaction2.sampled = false;
        return transaction2;
      }
      transaction2.sampled = Math.random() < sampleRate;
      if (!transaction2.sampled) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
              sampleRate,
            )})`,
          );
        return transaction2;
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
        utils.logger.log(
          `[Tracing] starting ${transaction2.op} transaction - ${transaction2.name}`,
        );
      return transaction2;
    }
    function isValidSampleRate(rate) {
      if (
        utils.isNaN(rate) ||
        !(typeof rate === "number" || typeof rate === "boolean")
      ) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
              rate,
            )} of type ${JSON.stringify(typeof rate)}.`,
          );
        return false;
      }
      if (rate < 0 || rate > 1) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            `[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${rate}.`,
          );
        return false;
      }
      return true;
    }
    function _startTransaction(transactionContext, customSamplingContext) {
      const client = this.getClient();
      const options = (client && client.getOptions()) || {};
      const configInstrumenter = options.instrumenter || "sentry";
      const transactionInstrumenter =
        transactionContext.instrumenter || "sentry";
      if (configInstrumenter !== transactionInstrumenter) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger
            .error(`A transaction was started with instrumenter=\`${transactionInstrumenter}\`, but the SDK is configured with the \`${configInstrumenter}\` instrumenter.
The transaction will not be sampled. Please use the ${configInstrumenter} instrumentation to start transactions.`);
        transactionContext.sampled = false;
      }
      let transaction$1 = new transaction.Transaction(transactionContext, this);
      transaction$1 = sample(
        transaction$1,
        options,
        __spreadValues(
          {
            parentSampled: transactionContext.parentSampled,
            transactionContext,
          },
          customSamplingContext,
        ),
      );
      if (transaction$1.sampled) {
        transaction$1.initSpanRecorder(
          options._experiments && options._experiments.maxSpans,
        );
      }
      if (client && client.emit) {
        client.emit("startTransaction", transaction$1);
      }
      return transaction$1;
    }
    function startIdleTransaction(
      hub2,
      transactionContext,
      idleTimeout,
      finalTimeout,
      onScope,
      customSamplingContext,
      heartbeatInterval,
    ) {
      const client = hub2.getClient();
      const options = (client && client.getOptions()) || {};
      let transaction2 = new idletransaction.IdleTransaction(
        transactionContext,
        hub2,
        idleTimeout,
        finalTimeout,
        heartbeatInterval,
        onScope,
      );
      transaction2 = sample(
        transaction2,
        options,
        __spreadValues(
          {
            parentSampled: transactionContext.parentSampled,
            transactionContext,
          },
          customSamplingContext,
        ),
      );
      if (transaction2.sampled) {
        transaction2.initSpanRecorder(
          options._experiments && options._experiments.maxSpans,
        );
      }
      if (client && client.emit) {
        client.emit("startTransaction", transaction2);
      }
      return transaction2;
    }
    function addTracingExtensions() {
      const carrier = hub.getMainCarrier();
      if (!carrier.__SENTRY__) {
        return;
      }
      carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
      if (!carrier.__SENTRY__.extensions.startTransaction) {
        carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
      }
      if (!carrier.__SENTRY__.extensions.traceHeaders) {
        carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
      }
      errors.registerErrorInstrumentation();
    }
    exports.addTracingExtensions = addTracingExtensions;
    exports.startIdleTransaction = startIdleTransaction;
  },
});

// node_modules/@sentry/core/cjs/tracing/spanstatus.js
var require_spanstatus = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/spanstatus.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanStatus = void 0;
    (function (SpanStatus) {
      const Ok = "ok";
      SpanStatus["Ok"] = Ok;
      const DeadlineExceeded = "deadline_exceeded";
      SpanStatus["DeadlineExceeded"] = DeadlineExceeded;
      const Unauthenticated = "unauthenticated";
      SpanStatus["Unauthenticated"] = Unauthenticated;
      const PermissionDenied = "permission_denied";
      SpanStatus["PermissionDenied"] = PermissionDenied;
      const NotFound = "not_found";
      SpanStatus["NotFound"] = NotFound;
      const ResourceExhausted = "resource_exhausted";
      SpanStatus["ResourceExhausted"] = ResourceExhausted;
      const InvalidArgument = "invalid_argument";
      SpanStatus["InvalidArgument"] = InvalidArgument;
      const Unimplemented = "unimplemented";
      SpanStatus["Unimplemented"] = Unimplemented;
      const Unavailable = "unavailable";
      SpanStatus["Unavailable"] = Unavailable;
      const InternalError = "internal_error";
      SpanStatus["InternalError"] = InternalError;
      const UnknownError = "unknown_error";
      SpanStatus["UnknownError"] = UnknownError;
      const Cancelled = "cancelled";
      SpanStatus["Cancelled"] = Cancelled;
      const AlreadyExists = "already_exists";
      SpanStatus["AlreadyExists"] = AlreadyExists;
      const FailedPrecondition = "failed_precondition";
      SpanStatus["FailedPrecondition"] = FailedPrecondition;
      const Aborted = "aborted";
      SpanStatus["Aborted"] = Aborted;
      const OutOfRange = "out_of_range";
      SpanStatus["OutOfRange"] = OutOfRange;
      const DataLoss = "data_loss";
      SpanStatus["DataLoss"] = DataLoss;
    })(exports.SpanStatus || (exports.SpanStatus = {}));
  },
});

// node_modules/@sentry/core/cjs/tracing/trace.js
var require_trace = __commonJS({
  "node_modules/@sentry/core/cjs/tracing/trace.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var hasTracingEnabled = require_hasTracingEnabled();
    function trace(context, callback, onError = () => {}) {
      const ctx = __spreadValues({}, context);
      if (ctx.name !== void 0 && ctx.description === void 0) {
        ctx.description = ctx.name;
      }
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      const parentSpan = scope.getSpan();
      function getActiveSpan() {
        if (!hasTracingEnabled.hasTracingEnabled()) {
          return void 0;
        }
        return parentSpan
          ? parentSpan.startChild(ctx)
          : hub$1.startTransaction(ctx);
      }
      const activeSpan = getActiveSpan();
      scope.setSpan(activeSpan);
      function finishAndSetSpan() {
        activeSpan && activeSpan.finish();
        hub$1.getScope().setSpan(parentSpan);
      }
      let maybePromiseResult;
      try {
        maybePromiseResult = callback(activeSpan);
      } catch (e) {
        activeSpan && activeSpan.setStatus("internal_error");
        onError(e);
        finishAndSetSpan();
        throw e;
      }
      if (utils.isThenable(maybePromiseResult)) {
        Promise.resolve(maybePromiseResult).then(
          () => {
            finishAndSetSpan();
          },
          (e) => {
            activeSpan && activeSpan.setStatus("internal_error");
            onError(e);
            finishAndSetSpan();
          },
        );
      } else {
        finishAndSetSpan();
      }
      return maybePromiseResult;
    }
    exports.trace = trace;
  },
});

// node_modules/@sentry/core/cjs/exports.js
var require_exports = __commonJS({
  "node_modules/@sentry/core/cjs/exports.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    function captureException(exception, captureContext) {
      return hub
        .getCurrentHub()
        .captureException(exception, { captureContext });
    }
    function captureMessage(message, captureContext) {
      const level =
        typeof captureContext === "string" ? captureContext : void 0;
      const context =
        typeof captureContext !== "string" ? { captureContext } : void 0;
      return hub.getCurrentHub().captureMessage(message, level, context);
    }
    function captureEvent(event, hint) {
      return hub.getCurrentHub().captureEvent(event, hint);
    }
    function configureScope(callback) {
      hub.getCurrentHub().configureScope(callback);
    }
    function addBreadcrumb(breadcrumb) {
      hub.getCurrentHub().addBreadcrumb(breadcrumb);
    }
    function setContext(name, context) {
      hub.getCurrentHub().setContext(name, context);
    }
    function setExtras(extras) {
      hub.getCurrentHub().setExtras(extras);
    }
    function setExtra(key, extra) {
      hub.getCurrentHub().setExtra(key, extra);
    }
    function setTags(tags) {
      hub.getCurrentHub().setTags(tags);
    }
    function setTag(key, value) {
      hub.getCurrentHub().setTag(key, value);
    }
    function setUser(user) {
      hub.getCurrentHub().setUser(user);
    }
    function withScope(callback) {
      hub.getCurrentHub().withScope(callback);
    }
    function startTransaction(context, customSamplingContext) {
      return hub
        .getCurrentHub()
        .startTransaction(__spreadValues({}, context), customSamplingContext);
    }
    function captureCheckIn(checkIn, upsertMonitorConfig) {
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      const client = hub$1.getClient();
      if (!client) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn("Cannot capture check-in. No client defined.");
      } else if (!client.captureCheckIn) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            "Cannot capture check-in. Client does not support sending check-ins.",
          );
      } else {
        return client.captureCheckIn(checkIn, upsertMonitorConfig, scope);
      }
      return utils.uuid4();
    }
    exports.addBreadcrumb = addBreadcrumb;
    exports.captureCheckIn = captureCheckIn;
    exports.captureEvent = captureEvent;
    exports.captureException = captureException;
    exports.captureMessage = captureMessage;
    exports.configureScope = configureScope;
    exports.setContext = setContext;
    exports.setExtra = setExtra;
    exports.setExtras = setExtras;
    exports.setTag = setTag;
    exports.setTags = setTags;
    exports.setUser = setUser;
    exports.startTransaction = startTransaction;
    exports.withScope = withScope;
  },
});

// node_modules/@sentry/core/cjs/sessionflusher.js
var require_sessionflusher = __commonJS({
  "node_modules/@sentry/core/cjs/sessionflusher.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var SessionFlusher = class {
      __init() {
        this.flushTimeout = 60;
      }
      __init2() {
        this._pendingAggregates = {};
      }
      __init3() {
        this._isEnabled = true;
      }
      constructor(client, attrs) {
        SessionFlusher.prototype.__init.call(this);
        SessionFlusher.prototype.__init2.call(this);
        SessionFlusher.prototype.__init3.call(this);
        this._client = client;
        this._intervalId = setInterval(
          () => this.flush(),
          this.flushTimeout * 1e3,
        );
        this._sessionAttrs = attrs;
      }
      flush() {
        const sessionAggregates = this.getSessionAggregates();
        if (sessionAggregates.aggregates.length === 0) {
          return;
        }
        this._pendingAggregates = {};
        this._client.sendSession(sessionAggregates);
      }
      getSessionAggregates() {
        const aggregates = Object.keys(this._pendingAggregates).map((key) => {
          return this._pendingAggregates[parseInt(key)];
        });
        const sessionAggregates = {
          attrs: this._sessionAttrs,
          aggregates,
        };
        return utils.dropUndefinedKeys(sessionAggregates);
      }
      close() {
        clearInterval(this._intervalId);
        this._isEnabled = false;
        this.flush();
      }
      incrementSessionStatusCount() {
        if (!this._isEnabled) {
          return;
        }
        const scope = hub.getCurrentHub().getScope();
        const requestSession = scope.getRequestSession();
        if (requestSession && requestSession.status) {
          this._incrementSessionStatusCount(requestSession.status, new Date());
          scope.setRequestSession(void 0);
        }
      }
      _incrementSessionStatusCount(status, date) {
        const sessionStartedTrunc = new Date(date).setSeconds(0, 0);
        this._pendingAggregates[sessionStartedTrunc] =
          this._pendingAggregates[sessionStartedTrunc] || {};
        const aggregationCounts = this._pendingAggregates[sessionStartedTrunc];
        if (!aggregationCounts.started) {
          aggregationCounts.started = new Date(
            sessionStartedTrunc,
          ).toISOString();
        }
        switch (status) {
          case "errored":
            aggregationCounts.errored = (aggregationCounts.errored || 0) + 1;
            return aggregationCounts.errored;
          case "ok":
            aggregationCounts.exited = (aggregationCounts.exited || 0) + 1;
            return aggregationCounts.exited;
          default:
            aggregationCounts.crashed = (aggregationCounts.crashed || 0) + 1;
            return aggregationCounts.crashed;
        }
      }
    };
    exports.SessionFlusher = SessionFlusher;
  },
});

// node_modules/@sentry/core/cjs/api.js
var require_api = __commonJS({
  "node_modules/@sentry/core/cjs/api.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var SENTRY_API_VERSION = "7";
    function getBaseApiEndpoint(dsn) {
      const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
      const port = dsn.port ? `:${dsn.port}` : "";
      return `${protocol}//${dsn.host}${port}${
        dsn.path ? `/${dsn.path}` : ""
      }/api/`;
    }
    function _getIngestEndpoint(dsn) {
      return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
    }
    function _encodedAuth(dsn, sdkInfo) {
      return utils.urlEncode(
        __spreadValues(
          {
            sentry_key: dsn.publicKey,
            sentry_version: SENTRY_API_VERSION,
          },
          sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` },
        ),
      );
    }
    function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnelOrOptions = {}) {
      const tunnel =
        typeof tunnelOrOptions === "string"
          ? tunnelOrOptions
          : tunnelOrOptions.tunnel;
      const sdkInfo =
        typeof tunnelOrOptions === "string" || !tunnelOrOptions._metadata
          ? void 0
          : tunnelOrOptions._metadata.sdk;
      return tunnel
        ? tunnel
        : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
    }
    function getReportDialogEndpoint(dsnLike, dialogOptions) {
      const dsn = utils.makeDsn(dsnLike);
      if (!dsn) {
        return "";
      }
      const endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`;
      let encodedOptions = `dsn=${utils.dsnToString(dsn)}`;
      for (const key in dialogOptions) {
        if (key === "dsn") {
          continue;
        }
        if (key === "user") {
          const user = dialogOptions.user;
          if (!user) {
            continue;
          }
          if (user.name) {
            encodedOptions += `&name=${encodeURIComponent(user.name)}`;
          }
          if (user.email) {
            encodedOptions += `&email=${encodeURIComponent(user.email)}`;
          }
        } else {
          encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(
            dialogOptions[key],
          )}`;
        }
      }
      return `${endpoint}?${encodedOptions}`;
    }
    exports.getEnvelopeEndpointWithUrlEncodedAuth =
      getEnvelopeEndpointWithUrlEncodedAuth;
    exports.getReportDialogEndpoint = getReportDialogEndpoint;
  },
});

// node_modules/@sentry/core/cjs/envelope.js
var require_envelope2 = __commonJS({
  "node_modules/@sentry/core/cjs/envelope.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    function enhanceEventWithSdkInfo(event, sdkInfo) {
      if (!sdkInfo) {
        return event;
      }
      event.sdk = event.sdk || {};
      event.sdk.name = event.sdk.name || sdkInfo.name;
      event.sdk.version = event.sdk.version || sdkInfo.version;
      event.sdk.integrations = [
        ...(event.sdk.integrations || []),
        ...(sdkInfo.integrations || []),
      ];
      event.sdk.packages = [
        ...(event.sdk.packages || []),
        ...(sdkInfo.packages || []),
      ];
      return event;
    }
    function createSessionEnvelope(session, dsn, metadata, tunnel) {
      const sdkInfo = utils.getSdkMetadataForEnvelopeHeader(metadata);
      const envelopeHeaders = __spreadValues(
        __spreadValues(
          {
            sent_at: new Date().toISOString(),
          },
          sdkInfo && { sdk: sdkInfo },
        ),
        !!tunnel && { dsn: utils.dsnToString(dsn) },
      );
      const envelopeItem =
        "aggregates" in session
          ? [{ type: "sessions" }, session]
          : [{ type: "session" }, session.toJSON()];
      return utils.createEnvelope(envelopeHeaders, [envelopeItem]);
    }
    function createEventEnvelope(event, dsn, metadata, tunnel) {
      const sdkInfo = utils.getSdkMetadataForEnvelopeHeader(metadata);
      const eventType =
        event.type && event.type !== "replay_event" ? event.type : "event";
      enhanceEventWithSdkInfo(event, metadata && metadata.sdk);
      const envelopeHeaders = utils.createEventEnvelopeHeaders(
        event,
        sdkInfo,
        tunnel,
        dsn,
      );
      delete event.sdkProcessingMetadata;
      const eventItem = [{ type: eventType }, event];
      return utils.createEnvelope(envelopeHeaders, [eventItem]);
    }
    exports.createEventEnvelope = createEventEnvelope;
    exports.createSessionEnvelope = createSessionEnvelope;
  },
});

// node_modules/@sentry/core/cjs/integration.js
var require_integration = __commonJS({
  "node_modules/@sentry/core/cjs/integration.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var scope = require_scope();
    var installedIntegrations = [];
    function filterDuplicates(integrations) {
      const integrationsByName = {};
      integrations.forEach((currentInstance) => {
        const { name } = currentInstance;
        const existingInstance = integrationsByName[name];
        if (
          existingInstance &&
          !existingInstance.isDefaultInstance &&
          currentInstance.isDefaultInstance
        ) {
          return;
        }
        integrationsByName[name] = currentInstance;
      });
      return Object.keys(integrationsByName).map((k) => integrationsByName[k]);
    }
    function getIntegrationsToSetup(options) {
      const defaultIntegrations = options.defaultIntegrations || [];
      const userIntegrations = options.integrations;
      defaultIntegrations.forEach((integration) => {
        integration.isDefaultInstance = true;
      });
      let integrations;
      if (Array.isArray(userIntegrations)) {
        integrations = [...defaultIntegrations, ...userIntegrations];
      } else if (typeof userIntegrations === "function") {
        integrations = utils.arrayify(userIntegrations(defaultIntegrations));
      } else {
        integrations = defaultIntegrations;
      }
      const finalIntegrations = filterDuplicates(integrations);
      const debugIndex = findIndex(
        finalIntegrations,
        (integration) => integration.name === "Debug",
      );
      if (debugIndex !== -1) {
        const [debugInstance] = finalIntegrations.splice(debugIndex, 1);
        finalIntegrations.push(debugInstance);
      }
      return finalIntegrations;
    }
    function setupIntegrations(integrations) {
      const integrationIndex = {};
      integrations.forEach((integration) => {
        if (integration) {
          setupIntegration(integration, integrationIndex);
        }
      });
      return integrationIndex;
    }
    function setupIntegration(integration, integrationIndex) {
      integrationIndex[integration.name] = integration;
      if (installedIntegrations.indexOf(integration.name) === -1) {
        integration.setupOnce(scope.addGlobalEventProcessor, hub.getCurrentHub);
        installedIntegrations.push(integration.name);
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(`Integration installed: ${integration.name}`);
      }
    }
    function findIndex(arr, callback) {
      for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i]) === true) {
          return i;
        }
      }
      return -1;
    }
    exports.getIntegrationsToSetup = getIntegrationsToSetup;
    exports.installedIntegrations = installedIntegrations;
    exports.setupIntegration = setupIntegration;
    exports.setupIntegrations = setupIntegrations;
  },
});

// node_modules/@sentry/core/cjs/utils/prepareEvent.js
var require_prepareEvent = __commonJS({
  "node_modules/@sentry/core/cjs/utils/prepareEvent.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var constants = require_constants();
    var scope = require_scope();
    function prepareEvent(options, event, hint, scope$1) {
      const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
      const prepared = __spreadProps(__spreadValues({}, event), {
        event_id: event.event_id || hint.event_id || utils.uuid4(),
        timestamp: event.timestamp || utils.dateTimestampInSeconds(),
      });
      const integrations =
        hint.integrations || options.integrations.map((i) => i.name);
      applyClientOptions(prepared, options);
      applyIntegrationsMetadata(prepared, integrations);
      if (event.type === void 0) {
        applyDebugIds(prepared, options.stackParser);
      }
      let finalScope = scope$1;
      if (hint.captureContext) {
        finalScope = scope.Scope.clone(finalScope).update(hint.captureContext);
      }
      let result = utils.resolvedSyncPromise(prepared);
      if (finalScope) {
        if (finalScope.getAttachments) {
          const attachments = [
            ...(hint.attachments || []),
            ...finalScope.getAttachments(),
          ];
          if (attachments.length) {
            hint.attachments = attachments;
          }
        }
        result = finalScope.applyToEvent(prepared, hint);
      }
      return result.then((evt) => {
        if (evt) {
          applyDebugMeta(evt);
        }
        if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
          return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
        }
        return evt;
      });
    }
    function applyClientOptions(event, options) {
      const { environment, release, dist, maxValueLength = 250 } = options;
      if (!("environment" in event)) {
        event.environment =
          "environment" in options
            ? environment
            : constants.DEFAULT_ENVIRONMENT;
      }
      if (event.release === void 0 && release !== void 0) {
        event.release = release;
      }
      if (event.dist === void 0 && dist !== void 0) {
        event.dist = dist;
      }
      if (event.message) {
        event.message = utils.truncate(event.message, maxValueLength);
      }
      const exception =
        event.exception && event.exception.values && event.exception.values[0];
      if (exception && exception.value) {
        exception.value = utils.truncate(exception.value, maxValueLength);
      }
      const request = event.request;
      if (request && request.url) {
        request.url = utils.truncate(request.url, maxValueLength);
      }
    }
    var debugIdStackParserCache = /* @__PURE__ */ new WeakMap();
    function applyDebugIds(event, stackParser) {
      const debugIdMap = utils.GLOBAL_OBJ._sentryDebugIds;
      if (!debugIdMap) {
        return;
      }
      let debugIdStackFramesCache;
      const cachedDebugIdStackFrameCache =
        debugIdStackParserCache.get(stackParser);
      if (cachedDebugIdStackFrameCache) {
        debugIdStackFramesCache = cachedDebugIdStackFrameCache;
      } else {
        debugIdStackFramesCache = /* @__PURE__ */ new Map();
        debugIdStackParserCache.set(stackParser, debugIdStackFramesCache);
      }
      const filenameDebugIdMap = Object.keys(debugIdMap).reduce(
        (acc, debugIdStackTrace) => {
          let parsedStack;
          const cachedParsedStack =
            debugIdStackFramesCache.get(debugIdStackTrace);
          if (cachedParsedStack) {
            parsedStack = cachedParsedStack;
          } else {
            parsedStack = stackParser(debugIdStackTrace);
            debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
          }
          for (let i = parsedStack.length - 1; i >= 0; i--) {
            const stackFrame = parsedStack[i];
            if (stackFrame.filename) {
              acc[stackFrame.filename] = debugIdMap[debugIdStackTrace];
              break;
            }
          }
          return acc;
        },
        {},
      );
      try {
        event.exception.values.forEach((exception) => {
          exception.stacktrace.frames.forEach((frame) => {
            if (frame.filename) {
              frame.debug_id = filenameDebugIdMap[frame.filename];
            }
          });
        });
      } catch (e) {}
    }
    function applyDebugMeta(event) {
      const filenameDebugIdMap = {};
      try {
        event.exception.values.forEach((exception) => {
          exception.stacktrace.frames.forEach((frame) => {
            if (frame.debug_id) {
              if (frame.abs_path) {
                filenameDebugIdMap[frame.abs_path] = frame.debug_id;
              } else if (frame.filename) {
                filenameDebugIdMap[frame.filename] = frame.debug_id;
              }
              delete frame.debug_id;
            }
          });
        });
      } catch (e) {}
      if (Object.keys(filenameDebugIdMap).length === 0) {
        return;
      }
      event.debug_meta = event.debug_meta || {};
      event.debug_meta.images = event.debug_meta.images || [];
      const images = event.debug_meta.images;
      Object.keys(filenameDebugIdMap).forEach((filename) => {
        images.push({
          type: "sourcemap",
          code_file: filename,
          debug_id: filenameDebugIdMap[filename],
        });
      });
    }
    function applyIntegrationsMetadata(event, integrationNames) {
      if (integrationNames.length > 0) {
        event.sdk = event.sdk || {};
        event.sdk.integrations = [
          ...(event.sdk.integrations || []),
          ...integrationNames,
        ];
      }
    }
    function normalizeEvent(event, depth, maxBreadth) {
      if (!event) {
        return null;
      }
      const normalized = __spreadValues(
        __spreadValues(
          __spreadValues(
            __spreadValues(
              __spreadValues({}, event),
              event.breadcrumbs && {
                breadcrumbs: event.breadcrumbs.map((b) =>
                  __spreadValues(
                    __spreadValues({}, b),
                    b.data && {
                      data: utils.normalize(b.data, depth, maxBreadth),
                    },
                  ),
                ),
              },
            ),
            event.user && {
              user: utils.normalize(event.user, depth, maxBreadth),
            },
          ),
          event.contexts && {
            contexts: utils.normalize(event.contexts, depth, maxBreadth),
          },
        ),
        event.extra && {
          extra: utils.normalize(event.extra, depth, maxBreadth),
        },
      );
      if (event.contexts && event.contexts.trace && normalized.contexts) {
        normalized.contexts.trace = event.contexts.trace;
        if (event.contexts.trace.data) {
          normalized.contexts.trace.data = utils.normalize(
            event.contexts.trace.data,
            depth,
            maxBreadth,
          );
        }
      }
      if (event.spans) {
        normalized.spans = event.spans.map((span) => {
          if (span.data) {
            span.data = utils.normalize(span.data, depth, maxBreadth);
          }
          return span;
        });
      }
      return normalized;
    }
    exports.applyDebugIds = applyDebugIds;
    exports.applyDebugMeta = applyDebugMeta;
    exports.prepareEvent = prepareEvent;
  },
});

// node_modules/@sentry/core/cjs/baseclient.js
var require_baseclient = __commonJS({
  "node_modules/@sentry/core/cjs/baseclient.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var api = require_api();
    var envelope = require_envelope2();
    var integration = require_integration();
    var session = require_session();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    var prepareEvent = require_prepareEvent();
    var ALREADY_SEEN_ERROR =
      "Not capturing exception because it's already been captured.";
    var BaseClient = class {
      __init() {
        this._integrations = {};
      }
      __init2() {
        this._integrationsInitialized = false;
      }
      __init3() {
        this._numProcessing = 0;
      }
      __init4() {
        this._outcomes = {};
      }
      __init5() {
        this._hooks = {};
      }
      constructor(options) {
        BaseClient.prototype.__init.call(this);
        BaseClient.prototype.__init2.call(this);
        BaseClient.prototype.__init3.call(this);
        BaseClient.prototype.__init4.call(this);
        BaseClient.prototype.__init5.call(this);
        this._options = options;
        if (options.dsn) {
          this._dsn = utils.makeDsn(options.dsn);
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn("No DSN provided, client will not do anything.");
        }
        if (this._dsn) {
          const url = api.getEnvelopeEndpointWithUrlEncodedAuth(
            this._dsn,
            options,
          );
          this._transport = options.transport(
            __spreadProps(
              __spreadValues(
                {
                  recordDroppedEvent: this.recordDroppedEvent.bind(this),
                },
                options.transportOptions,
              ),
              {
                url,
              },
            ),
          );
        }
      }
      captureException(exception, hint, scope) {
        if (utils.checkOrSetAlreadyCaught(exception)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(ALREADY_SEEN_ERROR);
          return;
        }
        let eventId = hint && hint.event_id;
        this._process(
          this.eventFromException(exception, hint)
            .then((event) => this._captureEvent(event, hint, scope))
            .then((result) => {
              eventId = result;
            }),
        );
        return eventId;
      }
      captureMessage(message, level, hint, scope) {
        let eventId = hint && hint.event_id;
        const promisedEvent = utils.isPrimitive(message)
          ? this.eventFromMessage(String(message), level, hint)
          : this.eventFromException(message, hint);
        this._process(
          promisedEvent
            .then((event) => this._captureEvent(event, hint, scope))
            .then((result) => {
              eventId = result;
            }),
        );
        return eventId;
      }
      captureEvent(event, hint, scope) {
        if (
          hint &&
          hint.originalException &&
          utils.checkOrSetAlreadyCaught(hint.originalException)
        ) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(ALREADY_SEEN_ERROR);
          return;
        }
        let eventId = hint && hint.event_id;
        this._process(
          this._captureEvent(event, hint, scope).then((result) => {
            eventId = result;
          }),
        );
        return eventId;
      }
      captureSession(session$1) {
        if (!this._isEnabled()) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn("SDK not enabled, will not capture session.");
          return;
        }
        if (!(typeof session$1.release === "string")) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              "Discarded session because of missing or non-string release",
            );
        } else {
          this.sendSession(session$1);
          session.updateSession(session$1, { init: false });
        }
      }
      getDsn() {
        return this._dsn;
      }
      getOptions() {
        return this._options;
      }
      getSdkMetadata() {
        return this._options._metadata;
      }
      getTransport() {
        return this._transport;
      }
      flush(timeout) {
        const transport = this._transport;
        if (transport) {
          return this._isClientDoneProcessing(timeout).then(
            (clientFinished) => {
              return transport
                .flush(timeout)
                .then((transportFlushed) => clientFinished && transportFlushed);
            },
          );
        } else {
          return utils.resolvedSyncPromise(true);
        }
      }
      close(timeout) {
        return this.flush(timeout).then((result) => {
          this.getOptions().enabled = false;
          return result;
        });
      }
      setupIntegrations() {
        if (this._isEnabled() && !this._integrationsInitialized) {
          this._integrations = integration.setupIntegrations(
            this._options.integrations,
          );
          this._integrationsInitialized = true;
        }
      }
      getIntegrationById(integrationId) {
        return this._integrations[integrationId];
      }
      getIntegration(integration2) {
        try {
          return this._integrations[integration2.id] || null;
        } catch (_oO) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              `Cannot retrieve integration ${integration2.id} from the current Client`,
            );
          return null;
        }
      }
      addIntegration(integration$1) {
        integration.setupIntegration(integration$1, this._integrations);
      }
      sendEvent(event, hint = {}) {
        if (this._dsn) {
          let env = envelope.createEventEnvelope(
            event,
            this._dsn,
            this._options._metadata,
            this._options.tunnel,
          );
          for (const attachment of hint.attachments || []) {
            env = utils.addItemToEnvelope(
              env,
              utils.createAttachmentEnvelopeItem(
                attachment,
                this._options.transportOptions &&
                  this._options.transportOptions.textEncoder,
              ),
            );
          }
          const promise = this._sendEnvelope(env);
          if (promise) {
            promise.then(
              (sendResponse) =>
                this.emit("afterSendEvent", event, sendResponse),
              null,
            );
          }
        }
      }
      sendSession(session2) {
        if (this._dsn) {
          const env = envelope.createSessionEnvelope(
            session2,
            this._dsn,
            this._options._metadata,
            this._options.tunnel,
          );
          void this._sendEnvelope(env);
        }
      }
      recordDroppedEvent(reason, category, _event) {
        if (this._options.sendClientReports) {
          const key = `${reason}:${category}`;
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(`Adding outcome: "${key}"`);
          this._outcomes[key] = this._outcomes[key] + 1 || 1;
        }
      }
      on(hook, callback) {
        if (!this._hooks[hook]) {
          this._hooks[hook] = [];
        }
        this._hooks[hook].push(callback);
      }
      emit(hook, ...rest) {
        if (this._hooks[hook]) {
          this._hooks[hook].forEach((callback) => callback(...rest));
        }
      }
      _updateSessionFromEvent(session$1, event) {
        let crashed = false;
        let errored = false;
        const exceptions = event.exception && event.exception.values;
        if (exceptions) {
          errored = true;
          for (const ex of exceptions) {
            const mechanism = ex.mechanism;
            if (mechanism && mechanism.handled === false) {
              crashed = true;
              break;
            }
          }
        }
        const sessionNonTerminal = session$1.status === "ok";
        const shouldUpdateAndSend =
          (sessionNonTerminal && session$1.errors === 0) ||
          (sessionNonTerminal && crashed);
        if (shouldUpdateAndSend) {
          session.updateSession(
            session$1,
            __spreadProps(
              __spreadValues({}, crashed && { status: "crashed" }),
              {
                errors: session$1.errors || Number(errored || crashed),
              },
            ),
          );
          this.captureSession(session$1);
        }
      }
      _isClientDoneProcessing(timeout) {
        return new utils.SyncPromise((resolve) => {
          let ticked = 0;
          const tick = 1;
          const interval = setInterval(() => {
            if (this._numProcessing == 0) {
              clearInterval(interval);
              resolve(true);
            } else {
              ticked += tick;
              if (timeout && ticked >= timeout) {
                clearInterval(interval);
                resolve(false);
              }
            }
          }, tick);
        });
      }
      _isEnabled() {
        return this.getOptions().enabled !== false && this._dsn !== void 0;
      }
      _prepareEvent(event, hint, scope) {
        const options = this.getOptions();
        const integrations = Object.keys(this._integrations);
        if (!hint.integrations && integrations.length > 0) {
          hint.integrations = integrations;
        }
        return prepareEvent
          .prepareEvent(options, event, hint, scope)
          .then((evt) => {
            if (evt === null) {
              return evt;
            }
            const { propagationContext } = evt.sdkProcessingMetadata || {};
            const trace = evt.contexts && evt.contexts.trace;
            if (!trace && propagationContext) {
              const {
                traceId: trace_id,
                spanId,
                parentSpanId,
                dsc,
              } = propagationContext;
              evt.contexts = __spreadValues(
                {
                  trace: {
                    trace_id,
                    span_id: spanId,
                    parent_span_id: parentSpanId,
                  },
                },
                evt.contexts,
              );
              const dynamicSamplingContext$1 = dsc
                ? dsc
                : dynamicSamplingContext.getDynamicSamplingContextFromClient(
                    trace_id,
                    this,
                    scope,
                  );
              evt.sdkProcessingMetadata = __spreadValues(
                {
                  dynamicSamplingContext: dynamicSamplingContext$1,
                },
                evt.sdkProcessingMetadata,
              );
            }
            return evt;
          });
      }
      _captureEvent(event, hint = {}, scope) {
        return this._processEvent(event, hint, scope).then(
          (finalEvent) => {
            return finalEvent.event_id;
          },
          (reason) => {
            if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
              const sentryError = reason;
              if (sentryError.logLevel === "log") {
                utils.logger.log(sentryError.message);
              } else {
                utils.logger.warn(sentryError);
              }
            }
            return void 0;
          },
        );
      }
      _processEvent(event, hint, scope) {
        const options = this.getOptions();
        const { sampleRate } = options;
        if (!this._isEnabled()) {
          return utils.rejectedSyncPromise(
            new utils.SentryError(
              "SDK not enabled, will not capture event.",
              "log",
            ),
          );
        }
        const isTransaction = isTransactionEvent(event);
        const isError = isErrorEvent(event);
        const eventType = event.type || "error";
        const beforeSendLabel = `before send for type \`${eventType}\``;
        if (
          isError &&
          typeof sampleRate === "number" &&
          Math.random() > sampleRate
        ) {
          this.recordDroppedEvent("sample_rate", "error", event);
          return utils.rejectedSyncPromise(
            new utils.SentryError(
              `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
              "log",
            ),
          );
        }
        const dataCategory =
          eventType === "replay_event" ? "replay" : eventType;
        return this._prepareEvent(event, hint, scope)
          .then((prepared) => {
            if (prepared === null) {
              this.recordDroppedEvent("event_processor", dataCategory, event);
              throw new utils.SentryError(
                "An event processor returned `null`, will not send event.",
                "log",
              );
            }
            const isInternalException =
              hint.data && hint.data.__sentry__ === true;
            if (isInternalException) {
              return prepared;
            }
            const result = processBeforeSend(options, prepared, hint);
            return _validateBeforeSendResult(result, beforeSendLabel);
          })
          .then((processedEvent) => {
            if (processedEvent === null) {
              this.recordDroppedEvent("before_send", dataCategory, event);
              throw new utils.SentryError(
                `${beforeSendLabel} returned \`null\`, will not send event.`,
                "log",
              );
            }
            const session2 = scope && scope.getSession();
            if (!isTransaction && session2) {
              this._updateSessionFromEvent(session2, processedEvent);
            }
            const transactionInfo = processedEvent.transaction_info;
            if (
              isTransaction &&
              transactionInfo &&
              processedEvent.transaction !== event.transaction
            ) {
              const source = "custom";
              processedEvent.transaction_info = __spreadProps(
                __spreadValues({}, transactionInfo),
                {
                  source,
                },
              );
            }
            this.sendEvent(processedEvent, hint);
            return processedEvent;
          })
          .then(null, (reason) => {
            if (reason instanceof utils.SentryError) {
              throw reason;
            }
            this.captureException(reason, {
              data: {
                __sentry__: true,
              },
              originalException: reason,
            });
            throw new utils.SentryError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`);
          });
      }
      _process(promise) {
        this._numProcessing++;
        void promise.then(
          (value) => {
            this._numProcessing--;
            return value;
          },
          (reason) => {
            this._numProcessing--;
            return reason;
          },
        );
      }
      _sendEnvelope(envelope2) {
        if (this._transport && this._dsn) {
          this.emit("beforeEnvelope", envelope2);
          return this._transport.send(envelope2).then(null, (reason) => {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.error("Error while sending event:", reason);
          });
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error("Transport disabled");
        }
      }
      _clearOutcomes() {
        const outcomes = this._outcomes;
        this._outcomes = {};
        return Object.keys(outcomes).map((key) => {
          const [reason, category] = key.split(":");
          return {
            reason,
            category,
            quantity: outcomes[key],
          };
        });
      }
    };
    function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
      const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
      if (utils.isThenable(beforeSendResult)) {
        return beforeSendResult.then(
          (event) => {
            if (!utils.isPlainObject(event) && event !== null) {
              throw new utils.SentryError(invalidValueError);
            }
            return event;
          },
          (e) => {
            throw new utils.SentryError(
              `${beforeSendLabel} rejected with ${e}`,
            );
          },
        );
      } else if (
        !utils.isPlainObject(beforeSendResult) &&
        beforeSendResult !== null
      ) {
        throw new utils.SentryError(invalidValueError);
      }
      return beforeSendResult;
    }
    function processBeforeSend(options, event, hint) {
      const { beforeSend, beforeSendTransaction } = options;
      if (isErrorEvent(event) && beforeSend) {
        return beforeSend(event, hint);
      }
      if (isTransactionEvent(event) && beforeSendTransaction) {
        return beforeSendTransaction(event, hint);
      }
      return event;
    }
    function isErrorEvent(event) {
      return event.type === void 0;
    }
    function isTransactionEvent(event) {
      return event.type === "transaction";
    }
    exports.BaseClient = BaseClient;
  },
});

// node_modules/@sentry/core/cjs/sdk.js
var require_sdk = __commonJS({
  "node_modules/@sentry/core/cjs/sdk.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    function initAndBind(clientClass, options) {
      if (options.debug === true) {
        if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
          utils.logger.enable();
        } else {
          console.warn(
            "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.",
          );
        }
      }
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      scope.update(options.initialScope);
      const client = new clientClass(options);
      hub$1.bindClient(client);
    }
    exports.initAndBind = initAndBind;
  },
});

// node_modules/@sentry/core/cjs/transports/base.js
var require_base = __commonJS({
  "node_modules/@sentry/core/cjs/transports/base.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var DEFAULT_TRANSPORT_BUFFER_SIZE = 30;
    function createTransport(
      options,
      makeRequest,
      buffer = utils.makePromiseBuffer(
        options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE,
      ),
    ) {
      let rateLimits = {};
      const flush = (timeout) => buffer.drain(timeout);
      function send(envelope) {
        const filteredEnvelopeItems = [];
        utils.forEachEnvelopeItem(envelope, (item, type) => {
          const envelopeItemDataCategory =
            utils.envelopeItemTypeToDataCategory(type);
          if (utils.isRateLimited(rateLimits, envelopeItemDataCategory)) {
            const event = getEventForEnvelopeItem(item, type);
            options.recordDroppedEvent(
              "ratelimit_backoff",
              envelopeItemDataCategory,
              event,
            );
          } else {
            filteredEnvelopeItems.push(item);
          }
        });
        if (filteredEnvelopeItems.length === 0) {
          return utils.resolvedSyncPromise();
        }
        const filteredEnvelope = utils.createEnvelope(
          envelope[0],
          filteredEnvelopeItems,
        );
        const recordEnvelopeLoss = (reason) => {
          utils.forEachEnvelopeItem(filteredEnvelope, (item, type) => {
            const event = getEventForEnvelopeItem(item, type);
            options.recordDroppedEvent(
              reason,
              utils.envelopeItemTypeToDataCategory(type),
              event,
            );
          });
        };
        const requestTask = () =>
          makeRequest({
            body: utils.serializeEnvelope(
              filteredEnvelope,
              options.textEncoder,
            ),
          }).then(
            (response) => {
              if (
                response.statusCode !== void 0 &&
                (response.statusCode < 200 || response.statusCode >= 300)
              ) {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                  utils.logger.warn(
                    `Sentry responded with status code ${response.statusCode} to sent event.`,
                  );
              }
              rateLimits = utils.updateRateLimits(rateLimits, response);
              return response;
            },
            (error) => {
              recordEnvelopeLoss("network_error");
              throw error;
            },
          );
        return buffer.add(requestTask).then(
          (result) => result,
          (error) => {
            if (error instanceof utils.SentryError) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                utils.logger.error(
                  "Skipped sending event because buffer is full.",
                );
              recordEnvelopeLoss("queue_overflow");
              return utils.resolvedSyncPromise();
            } else {
              throw error;
            }
          },
        );
      }
      send.__sentry__baseTransport__ = true;
      return {
        send,
        flush,
      };
    }
    function getEventForEnvelopeItem(item, type) {
      if (type !== "event" && type !== "transaction") {
        return void 0;
      }
      return Array.isArray(item) ? item[1] : void 0;
    }
    exports.DEFAULT_TRANSPORT_BUFFER_SIZE = DEFAULT_TRANSPORT_BUFFER_SIZE;
    exports.createTransport = createTransport;
  },
});

// node_modules/@sentry/core/cjs/transports/offline.js
var require_offline = __commonJS({
  "node_modules/@sentry/core/cjs/transports/offline.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var MIN_DELAY = 100;
    var START_DELAY = 5e3;
    var MAX_DELAY = 36e5;
    function log(msg, error) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
        utils.logger.info(`[Offline]: ${msg}`, error);
    }
    function makeOfflineTransport(createTransport) {
      return (options) => {
        const transport = createTransport(options);
        const store = options.createStore
          ? options.createStore(options)
          : void 0;
        let retryDelay = START_DELAY;
        let flushTimer;
        function shouldQueue(env, error, retryDelay2) {
          if (
            utils.envelopeContainsItemType(env, [
              "replay_event",
              "replay_recording",
              "client_report",
            ])
          ) {
            return false;
          }
          if (options.shouldStore) {
            return options.shouldStore(env, error, retryDelay2);
          }
          return true;
        }
        function flushIn(delay) {
          if (!store) {
            return;
          }
          if (flushTimer) {
            clearTimeout(flushTimer);
          }
          flushTimer = setTimeout(async () => {
            flushTimer = void 0;
            const found = await store.pop();
            if (found) {
              log("Attempting to send previously queued event");
              void send(found).catch((e) => {
                log("Failed to retry sending", e);
              });
            }
          }, delay);
          if (typeof flushTimer !== "number" && flushTimer.unref) {
            flushTimer.unref();
          }
        }
        function flushWithBackOff() {
          if (flushTimer) {
            return;
          }
          flushIn(retryDelay);
          retryDelay = Math.min(retryDelay * 2, MAX_DELAY);
        }
        async function send(envelope) {
          try {
            const result = await transport.send(envelope);
            let delay = MIN_DELAY;
            if (result) {
              if (result.headers && result.headers["retry-after"]) {
                delay = utils.parseRetryAfterHeader(
                  result.headers["retry-after"],
                );
              } else if ((result.statusCode || 0) >= 400) {
                return result;
              }
            }
            flushIn(delay);
            retryDelay = START_DELAY;
            return result;
          } catch (e) {
            if (store && (await shouldQueue(envelope, e, retryDelay))) {
              await store.insert(envelope);
              flushWithBackOff();
              log("Error sending. Event queued", e);
              return {};
            } else {
              throw e;
            }
          }
        }
        if (options.flushAtStartup) {
          flushWithBackOff();
        }
        return {
          send,
          flush: (t) => transport.flush(t),
        };
      };
    }
    exports.MIN_DELAY = MIN_DELAY;
    exports.START_DELAY = START_DELAY;
    exports.makeOfflineTransport = makeOfflineTransport;
  },
});

// node_modules/@sentry/core/cjs/transports/multiplexed.js
var require_multiplexed = __commonJS({
  "node_modules/@sentry/core/cjs/transports/multiplexed.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var api = require_api();
    function eventFromEnvelope(env, types) {
      let event;
      utils.forEachEnvelopeItem(env, (item, type) => {
        if (types.includes(type)) {
          event = Array.isArray(item) ? item[1] : void 0;
        }
        return !!event;
      });
      return event;
    }
    function makeMultiplexedTransport(createTransport, matcher) {
      return (options) => {
        const fallbackTransport = createTransport(options);
        const otherTransports = {};
        function getTransport(dsn) {
          if (!otherTransports[dsn]) {
            const validatedDsn = utils.dsnFromString(dsn);
            if (!validatedDsn) {
              return void 0;
            }
            const url = api.getEnvelopeEndpointWithUrlEncodedAuth(validatedDsn);
            otherTransports[dsn] = createTransport(
              __spreadProps(__spreadValues({}, options), { url }),
            );
          }
          return otherTransports[dsn];
        }
        async function send(envelope) {
          function getEvent(types) {
            const eventTypes = types && types.length ? types : ["event"];
            return eventFromEnvelope(envelope, eventTypes);
          }
          const transports = matcher({ envelope, getEvent })
            .map((dsn) => getTransport(dsn))
            .filter((t) => !!t);
          if (transports.length === 0) {
            transports.push(fallbackTransport);
          }
          const results = await Promise.all(
            transports.map((transport) => transport.send(envelope)),
          );
          return results[0];
        }
        async function flush(timeout) {
          const allTransports = [
            ...Object.keys(otherTransports).map((dsn) => otherTransports[dsn]),
            fallbackTransport,
          ];
          const results = await Promise.all(
            allTransports.map((transport) => transport.flush(timeout)),
          );
          return results.every((r) => r);
        }
        return {
          send,
          flush,
        };
      };
    }
    exports.makeMultiplexedTransport = makeMultiplexedTransport;
  },
});

// node_modules/@sentry/core/cjs/version.js
var require_version = __commonJS({
  "node_modules/@sentry/core/cjs/version.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var SDK_VERSION = "7.58.1";
    exports.SDK_VERSION = SDK_VERSION;
  },
});

// node_modules/@sentry/core/cjs/integrations/functiontostring.js
var require_functiontostring = __commonJS({
  "node_modules/@sentry/core/cjs/integrations/functiontostring.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var originalFunctionToString;
    var FunctionToString = class {
      constructor() {
        FunctionToString.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "FunctionToString";
      }
      __init() {
        this.name = FunctionToString.id;
      }
      setupOnce() {
        originalFunctionToString = Function.prototype.toString;
        try {
          Function.prototype.toString = function (...args) {
            const context = utils.getOriginalFunction(this) || this;
            return originalFunctionToString.apply(context, args);
          };
        } catch (e) {}
      }
    };
    FunctionToString.__initStatic();
    exports.FunctionToString = FunctionToString;
  },
});

// node_modules/@sentry/core/cjs/integrations/inboundfilters.js
var require_inboundfilters = __commonJS({
  "node_modules/@sentry/core/cjs/integrations/inboundfilters.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var DEFAULT_IGNORE_ERRORS = [
      /^Script error\.?$/,
      /^Javascript error: Script error\.? on line 0$/,
    ];
    var DEFAULT_IGNORE_TRANSACTIONS = [
      /^.*healthcheck.*$/,
      /^.*healthy.*$/,
      /^.*live.*$/,
      /^.*ready.*$/,
      /^.*heartbeat.*$/,
      /^.*\/health$/,
      /^.*\/healthz$/,
    ];
    var InboundFilters = class {
      static __initStatic() {
        this.id = "InboundFilters";
      }
      __init() {
        this.name = InboundFilters.id;
      }
      constructor(_options = {}) {
        this._options = _options;
        InboundFilters.prototype.__init.call(this);
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        const eventProcess = (event) => {
          const hub = getCurrentHub();
          if (hub) {
            const self2 = hub.getIntegration(InboundFilters);
            if (self2) {
              const client = hub.getClient();
              const clientOptions = client ? client.getOptions() : {};
              const options = _mergeOptions(self2._options, clientOptions);
              return _shouldDropEvent(event, options) ? null : event;
            }
          }
          return event;
        };
        eventProcess.id = this.name;
        addGlobalEventProcessor(eventProcess);
      }
    };
    InboundFilters.__initStatic();
    function _mergeOptions(internalOptions = {}, clientOptions = {}) {
      return {
        allowUrls: [
          ...(internalOptions.allowUrls || []),
          ...(clientOptions.allowUrls || []),
        ],
        denyUrls: [
          ...(internalOptions.denyUrls || []),
          ...(clientOptions.denyUrls || []),
        ],
        ignoreErrors: [
          ...(internalOptions.ignoreErrors || []),
          ...(clientOptions.ignoreErrors || []),
          ...(internalOptions.disableErrorDefaults
            ? []
            : DEFAULT_IGNORE_ERRORS),
        ],
        ignoreTransactions: [
          ...(internalOptions.ignoreTransactions || []),
          ...(clientOptions.ignoreTransactions || []),
          ...(internalOptions.disableTransactionDefaults
            ? []
            : DEFAULT_IGNORE_TRANSACTIONS),
        ],
        ignoreInternal:
          internalOptions.ignoreInternal !== void 0
            ? internalOptions.ignoreInternal
            : true,
      };
    }
    function _shouldDropEvent(event, options) {
      if (options.ignoreInternal && _isSentryError(event)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${utils.getEventDescription(event)}`);
        return true;
      }
      if (_isIgnoredError(event, options.ignoreErrors)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger
            .warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${utils.getEventDescription(event)}`);
        return true;
      }
      if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger
            .warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${utils.getEventDescription(event)}`);
        return true;
      }
      if (_isDeniedUrl(event, options.denyUrls)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger
            .warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${utils.getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`);
        return true;
      }
      if (!_isAllowedUrl(event, options.allowUrls)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger
            .warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${utils.getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`);
        return true;
      }
      return false;
    }
    function _isIgnoredError(event, ignoreErrors) {
      if (event.type || !ignoreErrors || !ignoreErrors.length) {
        return false;
      }
      return _getPossibleEventMessages(event).some((message) =>
        utils.stringMatchesSomePattern(message, ignoreErrors),
      );
    }
    function _isIgnoredTransaction(event, ignoreTransactions) {
      if (
        event.type !== "transaction" ||
        !ignoreTransactions ||
        !ignoreTransactions.length
      ) {
        return false;
      }
      const name = event.transaction;
      return name
        ? utils.stringMatchesSomePattern(name, ignoreTransactions)
        : false;
    }
    function _isDeniedUrl(event, denyUrls) {
      if (!denyUrls || !denyUrls.length) {
        return false;
      }
      const url = _getEventFilterUrl(event);
      return !url ? false : utils.stringMatchesSomePattern(url, denyUrls);
    }
    function _isAllowedUrl(event, allowUrls) {
      if (!allowUrls || !allowUrls.length) {
        return true;
      }
      const url = _getEventFilterUrl(event);
      return !url ? true : utils.stringMatchesSomePattern(url, allowUrls);
    }
    function _getPossibleEventMessages(event) {
      if (event.message) {
        return [event.message];
      }
      if (event.exception) {
        const { values } = event.exception;
        try {
          const { type = "", value = "" } =
            (values && values[values.length - 1]) || {};
          return [`${value}`, `${type}: ${value}`];
        } catch (oO) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              `Cannot extract message for event ${utils.getEventDescription(
                event,
              )}`,
            );
          return [];
        }
      }
      return [];
    }
    function _isSentryError(event) {
      try {
        return event.exception.values[0].type === "SentryError";
      } catch (e) {}
      return false;
    }
    function _getLastValidUrl(frames = []) {
      for (let i = frames.length - 1; i >= 0; i--) {
        const frame = frames[i];
        if (
          frame &&
          frame.filename !== "<anonymous>" &&
          frame.filename !== "[native code]"
        ) {
          return frame.filename || null;
        }
      }
      return null;
    }
    function _getEventFilterUrl(event) {
      try {
        let frames;
        try {
          frames = event.exception.values[0].stacktrace.frames;
        } catch (e) {}
        return frames ? _getLastValidUrl(frames) : null;
      } catch (oO) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.error(
            `Cannot extract url for event ${utils.getEventDescription(event)}`,
          );
        return null;
      }
    }
    exports.InboundFilters = InboundFilters;
    exports._mergeOptions = _mergeOptions;
    exports._shouldDropEvent = _shouldDropEvent;
  },
});

// node_modules/@sentry/core/cjs/integrations/index.js
var require_integrations = __commonJS({
  "node_modules/@sentry/core/cjs/integrations/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var functiontostring = require_functiontostring();
    var inboundfilters = require_inboundfilters();
    exports.FunctionToString = functiontostring.FunctionToString;
    exports.InboundFilters = inboundfilters.InboundFilters;
  },
});

// node_modules/@sentry/core/cjs/checkin.js
var require_checkin = __commonJS({
  "node_modules/@sentry/core/cjs/checkin.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    function createCheckInEnvelope(
      checkIn,
      dynamicSamplingContext,
      metadata,
      tunnel,
      dsn,
    ) {
      const headers2 = {
        sent_at: new Date().toISOString(),
      };
      if (metadata && metadata.sdk) {
        headers2.sdk = {
          name: metadata.sdk.name,
          version: metadata.sdk.version,
        };
      }
      if (!!tunnel && !!dsn) {
        headers2.dsn = utils.dsnToString(dsn);
      }
      if (dynamicSamplingContext) {
        headers2.trace = utils.dropUndefinedKeys(dynamicSamplingContext);
      }
      const item = createCheckInEnvelopeItem(checkIn);
      return utils.createEnvelope(headers2, [item]);
    }
    function createCheckInEnvelopeItem(checkIn) {
      const checkInHeaders = {
        type: "check_in",
      };
      return [checkInHeaders, checkIn];
    }
    exports.createCheckInEnvelope = createCheckInEnvelope;
  },
});

// node_modules/@sentry/core/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@sentry/core/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var hubextensions = require_hubextensions();
    var idletransaction = require_idletransaction();
    var span = require_span();
    var transaction = require_transaction();
    var utils$1 = require_utils();
    var spanstatus = require_spanstatus();
    var trace = require_trace();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    var exports$1 = require_exports();
    var hub = require_hub();
    var session = require_session();
    var sessionflusher = require_sessionflusher();
    var scope = require_scope();
    var api = require_api();
    var baseclient = require_baseclient();
    var sdk = require_sdk();
    var base = require_base();
    var offline = require_offline();
    var multiplexed = require_multiplexed();
    var version = require_version();
    var integration = require_integration();
    var index = require_integrations();
    var prepareEvent = require_prepareEvent();
    var checkin = require_checkin();
    var hasTracingEnabled = require_hasTracingEnabled();
    var constants = require_constants();
    var functiontostring = require_functiontostring();
    var inboundfilters = require_inboundfilters();
    var utils = require_cjs();
    exports.addTracingExtensions = hubextensions.addTracingExtensions;
    exports.startIdleTransaction = hubextensions.startIdleTransaction;
    exports.IdleTransaction = idletransaction.IdleTransaction;
    exports.TRACING_DEFAULTS = idletransaction.TRACING_DEFAULTS;
    exports.Span = span.Span;
    exports.spanStatusfromHttpCode = span.spanStatusfromHttpCode;
    exports.Transaction = transaction.Transaction;
    exports.getActiveTransaction = utils$1.getActiveTransaction;
    Object.defineProperty(exports, "SpanStatus", {
      enumerable: true,
      get: () => spanstatus.SpanStatus,
    });
    exports.trace = trace.trace;
    exports.getDynamicSamplingContextFromClient =
      dynamicSamplingContext.getDynamicSamplingContextFromClient;
    exports.addBreadcrumb = exports$1.addBreadcrumb;
    exports.captureCheckIn = exports$1.captureCheckIn;
    exports.captureEvent = exports$1.captureEvent;
    exports.captureException = exports$1.captureException;
    exports.captureMessage = exports$1.captureMessage;
    exports.configureScope = exports$1.configureScope;
    exports.setContext = exports$1.setContext;
    exports.setExtra = exports$1.setExtra;
    exports.setExtras = exports$1.setExtras;
    exports.setTag = exports$1.setTag;
    exports.setTags = exports$1.setTags;
    exports.setUser = exports$1.setUser;
    exports.startTransaction = exports$1.startTransaction;
    exports.withScope = exports$1.withScope;
    exports.Hub = hub.Hub;
    exports.ensureHubOnCarrier = hub.ensureHubOnCarrier;
    exports.getCurrentHub = hub.getCurrentHub;
    exports.getHubFromCarrier = hub.getHubFromCarrier;
    exports.getMainCarrier = hub.getMainCarrier;
    exports.makeMain = hub.makeMain;
    exports.runWithAsyncContext = hub.runWithAsyncContext;
    exports.setAsyncContextStrategy = hub.setAsyncContextStrategy;
    exports.setHubOnCarrier = hub.setHubOnCarrier;
    exports.closeSession = session.closeSession;
    exports.makeSession = session.makeSession;
    exports.updateSession = session.updateSession;
    exports.SessionFlusher = sessionflusher.SessionFlusher;
    exports.Scope = scope.Scope;
    exports.addGlobalEventProcessor = scope.addGlobalEventProcessor;
    exports.getEnvelopeEndpointWithUrlEncodedAuth =
      api.getEnvelopeEndpointWithUrlEncodedAuth;
    exports.getReportDialogEndpoint = api.getReportDialogEndpoint;
    exports.BaseClient = baseclient.BaseClient;
    exports.initAndBind = sdk.initAndBind;
    exports.createTransport = base.createTransport;
    exports.makeOfflineTransport = offline.makeOfflineTransport;
    exports.makeMultiplexedTransport = multiplexed.makeMultiplexedTransport;
    exports.SDK_VERSION = version.SDK_VERSION;
    exports.getIntegrationsToSetup = integration.getIntegrationsToSetup;
    exports.Integrations = index;
    exports.prepareEvent = prepareEvent.prepareEvent;
    exports.createCheckInEnvelope = checkin.createCheckInEnvelope;
    exports.hasTracingEnabled = hasTracingEnabled.hasTracingEnabled;
    exports.DEFAULT_ENVIRONMENT = constants.DEFAULT_ENVIRONMENT;
    exports.FunctionToString = functiontostring.FunctionToString;
    exports.InboundFilters = inboundfilters.InboundFilters;
    exports.extractTraceparentData = utils.extractTraceparentData;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_nullishCoalesce.js
var require_nullishCoalesce = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_nullishCoalesce.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _nullishCoalesce(lhs, rhsFn) {
      return lhs != null ? lhs : rhsFn();
    }
    exports._nullishCoalesce = _nullishCoalesce;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_asyncNullishCoalesce.js
var require_asyncNullishCoalesce = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_asyncNullishCoalesce.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _nullishCoalesce = require_nullishCoalesce();
    async function _asyncNullishCoalesce(lhs, rhsFn) {
      return _nullishCoalesce._nullishCoalesce(lhs, rhsFn);
    }
    exports._asyncNullishCoalesce = _asyncNullishCoalesce;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChain.js
var require_asyncOptionalChain = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChain.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    async function _asyncOptionalChain(ops) {
      let lastAccessLHS = void 0;
      let value = ops[0];
      let i = 1;
      while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if (
          (op === "optionalAccess" || op === "optionalCall") &&
          value == null
        ) {
          return;
        }
        if (op === "access" || op === "optionalAccess") {
          lastAccessLHS = value;
          value = await fn(value);
        } else if (op === "call" || op === "optionalCall") {
          value = await fn((...args) => value.call(lastAccessLHS, ...args));
          lastAccessLHS = void 0;
        }
      }
      return value;
    }
    exports._asyncOptionalChain = _asyncOptionalChain;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChainDelete.js
var require_asyncOptionalChainDelete = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChainDelete.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _asyncOptionalChain = require_asyncOptionalChain();
    async function _asyncOptionalChainDelete(ops) {
      const result = await _asyncOptionalChain._asyncOptionalChain(ops);
      return result == null ? true : result;
    }
    exports._asyncOptionalChainDelete = _asyncOptionalChainDelete;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_createNamedExportFrom.js
var require_createNamedExportFrom = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_createNamedExportFrom.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _createNamedExportFrom(obj, localName, importedName) {
      exports[localName] = obj[importedName];
    }
    exports._createNamedExportFrom = _createNamedExportFrom;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_createStarExport.js
var require_createStarExport = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_createStarExport.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _createStarExport(obj) {
      Object.keys(obj)
        .filter(
          (key) =>
            key !== "default" && key !== "__esModule" && !(key in exports),
        )
        .forEach((key) => (exports[key] = obj[key]));
    }
    exports._createStarExport = _createStarExport;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_interopDefault.js
var require_interopDefault = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_interopDefault.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault$1(requireResult) {
      return requireResult.__esModule ? requireResult.default : requireResult;
    }
    exports._interopDefault = _interopDefault$1;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_interopNamespace.js
var require_interopNamespace = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_interopNamespace.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopNamespace$1(requireResult) {
      return requireResult.__esModule
        ? requireResult
        : __spreadProps(__spreadValues({}, requireResult), {
            default: requireResult,
          });
    }
    exports._interopNamespace = _interopNamespace$1;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_interopNamespaceDefaultOnly.js
var require_interopNamespaceDefaultOnly = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_interopNamespaceDefaultOnly.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopNamespaceDefaultOnly$1(requireResult) {
      return {
        __proto__: null,
        default: requireResult,
      };
    }
    exports._interopNamespaceDefaultOnly = _interopNamespaceDefaultOnly$1;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_interopRequireDefault.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopRequireDefault(requireResult) {
      return requireResult.__esModule
        ? requireResult
        : { default: requireResult };
    }
    exports._interopRequireDefault = _interopRequireDefault;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_interopRequireWildcard.js
var require_interopRequireWildcard = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_interopRequireWildcard.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopRequireWildcard(requireResult) {
      return requireResult.__esModule
        ? requireResult
        : __spreadProps(__spreadValues({}, requireResult), {
            default: requireResult,
          });
    }
    exports._interopRequireWildcard = _interopRequireWildcard;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChain.js
var require_optionalChain = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChain.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _optionalChain(ops) {
      let lastAccessLHS = void 0;
      let value = ops[0];
      let i = 1;
      while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if (
          (op === "optionalAccess" || op === "optionalCall") &&
          value == null
        ) {
          return;
        }
        if (op === "access" || op === "optionalAccess") {
          lastAccessLHS = value;
          value = fn(value);
        } else if (op === "call" || op === "optionalCall") {
          value = fn((...args) => value.call(lastAccessLHS, ...args));
          lastAccessLHS = void 0;
        }
      }
      return value;
    }
    exports._optionalChain = _optionalChain;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChainDelete.js
var require_optionalChainDelete = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChainDelete.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _optionalChain = require_optionalChain();
    function _optionalChainDelete(ops) {
      const result = _optionalChain._optionalChain(ops);
      return result == null ? true : result;
    }
    exports._optionalChainDelete = _optionalChainDelete;
  },
});

// node_modules/@sentry/utils/cjs/buildPolyfills/index.js
var require_buildPolyfills = __commonJS({
  "node_modules/@sentry/utils/cjs/buildPolyfills/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _asyncNullishCoalesce = require_asyncNullishCoalesce();
    var _asyncOptionalChain = require_asyncOptionalChain();
    var _asyncOptionalChainDelete = require_asyncOptionalChainDelete();
    var _createNamedExportFrom = require_createNamedExportFrom();
    var _createStarExport = require_createStarExport();
    var _interopDefault$1 = require_interopDefault();
    var _interopNamespace$1 = require_interopNamespace();
    var _interopNamespaceDefaultOnly$1 = require_interopNamespaceDefaultOnly();
    var _interopRequireDefault = require_interopRequireDefault();
    var _interopRequireWildcard = require_interopRequireWildcard();
    var _nullishCoalesce = require_nullishCoalesce();
    var _optionalChain = require_optionalChain();
    var _optionalChainDelete = require_optionalChainDelete();
    exports._asyncNullishCoalesce = _asyncNullishCoalesce._asyncNullishCoalesce;
    exports._asyncOptionalChain = _asyncOptionalChain._asyncOptionalChain;
    exports._asyncOptionalChainDelete =
      _asyncOptionalChainDelete._asyncOptionalChainDelete;
    exports._createNamedExportFrom =
      _createNamedExportFrom._createNamedExportFrom;
    exports._createStarExport = _createStarExport._createStarExport;
    exports._interopDefault = _interopDefault$1._interopDefault;
    exports._interopNamespace = _interopNamespace$1._interopNamespace;
    exports._interopNamespaceDefaultOnly =
      _interopNamespaceDefaultOnly$1._interopNamespaceDefaultOnly;
    exports._interopRequireDefault =
      _interopRequireDefault._interopRequireDefault;
    exports._interopRequireWildcard =
      _interopRequireWildcard._interopRequireWildcard;
    exports._nullishCoalesce = _nullishCoalesce._nullishCoalesce;
    exports._optionalChain = _optionalChain._optionalChain;
    exports._optionalChainDelete = _optionalChainDelete._optionalChainDelete;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/utils/node-utils.js
var require_node_utils = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/utils/node-utils.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    function shouldDisableAutoInstrumentation(getCurrentHub) {
      const clientOptions = _optionalChain([
        getCurrentHub,
        "call",
        (_) => _(),
        "access",
        (_2) => _2.getClient,
        "call",
        (_3) => _3(),
        "optionalAccess",
        (_4) => _4.getOptions,
        "call",
        (_5) => _5(),
      ]);
      const instrumenter =
        _optionalChain([
          clientOptions,
          "optionalAccess",
          (_6) => _6.instrumenter,
        ]) || "sentry";
      return instrumenter !== "sentry";
    }
    exports.shouldDisableAutoInstrumentation = shouldDisableAutoInstrumentation;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/express.js
var require_express = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/express.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Express = class {
      static __initStatic() {
        this.id = "Express";
      }
      __init() {
        this.name = Express.id;
      }
      constructor(options = {}) {
        Express.prototype.__init.call(this);
        this._router = options.router || options.app;
        this._methods = (
          Array.isArray(options.methods) ? options.methods : []
        ).concat("use");
      }
      setupOnce(_, getCurrentHub) {
        if (!this._router) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              "ExpressIntegration is missing an Express instance",
            );
          return;
        }
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "Express Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        instrumentMiddlewares(this._router, this._methods);
        instrumentRouter(this._router);
      }
    };
    Express.__initStatic();
    function wrap(fn, method) {
      const arity = fn.length;
      switch (arity) {
        case 2: {
          return function (req, res) {
            const transaction = res.__sentry_transaction;
            if (transaction) {
              const span = transaction.startChild({
                description: fn.name,
                op: `middleware.express.${method}`,
              });
              res.once("finish", () => {
                span.finish();
              });
            }
            return fn.call(this, req, res);
          };
        }
        case 3: {
          return function (req, res, next) {
            const transaction = res.__sentry_transaction;
            const span = _optionalChain([
              transaction,
              "optionalAccess",
              (_2) => _2.startChild,
              "call",
              (_3) =>
                _3({
                  description: fn.name,
                  op: `middleware.express.${method}`,
                }),
            ]);
            fn.call(this, req, res, function (...args) {
              _optionalChain([
                span,
                "optionalAccess",
                (_4) => _4.finish,
                "call",
                (_5) => _5(),
              ]);
              next.call(this, ...args);
            });
          };
        }
        case 4: {
          return function (err, req, res, next) {
            const transaction = res.__sentry_transaction;
            const span = _optionalChain([
              transaction,
              "optionalAccess",
              (_6) => _6.startChild,
              "call",
              (_7) =>
                _7({
                  description: fn.name,
                  op: `middleware.express.${method}`,
                }),
            ]);
            fn.call(this, err, req, res, function (...args) {
              _optionalChain([
                span,
                "optionalAccess",
                (_8) => _8.finish,
                "call",
                (_9) => _9(),
              ]);
              next.call(this, ...args);
            });
          };
        }
        default: {
          throw new Error(
            `Express middleware takes 2-4 arguments. Got: ${arity}`,
          );
        }
      }
    }
    function wrapMiddlewareArgs(args, method) {
      return args.map((arg) => {
        if (typeof arg === "function") {
          return wrap(arg, method);
        }
        if (Array.isArray(arg)) {
          return arg.map((a) => {
            if (typeof a === "function") {
              return wrap(a, method);
            }
            return a;
          });
        }
        return arg;
      });
    }
    function patchMiddleware(router, method) {
      const originalCallback = router[method];
      router[method] = function (...args) {
        return originalCallback.call(this, ...wrapMiddlewareArgs(args, method));
      };
      return router;
    }
    function instrumentMiddlewares(router, methods = []) {
      methods.forEach((method) => patchMiddleware(router, method));
    }
    function instrumentRouter(appOrRouter) {
      const isApp = "settings" in appOrRouter;
      if (isApp && appOrRouter._router === void 0 && appOrRouter.lazyrouter) {
        appOrRouter.lazyrouter();
      }
      const router = isApp ? appOrRouter._router : appOrRouter;
      if (!router) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.debug(
            "Cannot instrument router for URL Parameterization (did not find a valid router).",
          );
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.debug(
            "Routing instrumentation is currently only supported in Express 4.",
          );
        return;
      }
      const routerProto = Object.getPrototypeOf(router);
      const originalProcessParams = routerProto.process_params;
      routerProto.process_params = function process_params(
        layer,
        called,
        req,
        res,
        done,
      ) {
        if (!req._reconstructedRoute) {
          req._reconstructedRoute = "";
        }
        const { layerRoutePath, isRegex, isArray, numExtraSegments } =
          getLayerRoutePathInfo(layer);
        if (layerRoutePath || isRegex || isArray) {
          req._hasParameters = true;
        }
        const partialRoute = layerRoutePath || layer.path || "";
        const finalPartialRoute = partialRoute
          .split("/")
          .filter(
            (segment) =>
              segment.length > 0 &&
              (isRegex || isArray || !segment.includes("*")),
          )
          .join("/");
        if (finalPartialRoute && finalPartialRoute.length > 0) {
          req._reconstructedRoute += `/${finalPartialRoute}${
            isRegex ? "/" : ""
          }`;
        }
        const urlLength =
          utils.getNumberOfUrlSegments(req.originalUrl || "") +
          numExtraSegments;
        const routeLength = utils.getNumberOfUrlSegments(
          req._reconstructedRoute,
        );
        if (urlLength === routeLength) {
          if (!req._hasParameters) {
            if (req._reconstructedRoute !== req.originalUrl) {
              req._reconstructedRoute = req.originalUrl
                ? utils.stripUrlQueryAndFragment(req.originalUrl)
                : req.originalUrl;
            }
          }
          const transaction = res.__sentry_transaction;
          if (transaction && transaction.metadata.source !== "custom") {
            const finalRoute = req._reconstructedRoute || "/";
            transaction.setName(
              ...utils.extractPathForTransaction(req, {
                path: true,
                method: true,
                customRoute: finalRoute,
              }),
            );
          }
        }
        return originalProcessParams.call(this, layer, called, req, res, done);
      };
    }
    function getLayerRoutePathInfo(layer) {
      const lrp = _optionalChain([
        layer,
        "access",
        (_10) => _10.route,
        "optionalAccess",
        (_11) => _11.path,
      ]);
      const isRegex = utils.isRegExp(lrp);
      const isArray = Array.isArray(lrp);
      if (!lrp) {
        return { isRegex, isArray, numExtraSegments: 0 };
      }
      const numExtraSegments = isArray
        ? Math.max(
            getNumberOfArrayUrlSegments(lrp) -
              utils.getNumberOfUrlSegments(layer.path || ""),
            0,
          )
        : 0;
      const layerRoutePath = getLayerRoutePathString(isArray, lrp);
      return { layerRoutePath, isRegex, isArray, numExtraSegments };
    }
    function getNumberOfArrayUrlSegments(routesArray) {
      return routesArray.reduce((accNumSegments, currentRoute) => {
        return (
          accNumSegments + utils.getNumberOfUrlSegments(currentRoute.toString())
        );
      }, 0);
    }
    function getLayerRoutePathString(isArray, lrp) {
      if (isArray) {
        return lrp.map((r) => r.toString()).join(",");
      }
      return lrp && lrp.toString();
    }
    exports.Express = Express;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/postgres.js
var require_postgres = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/postgres.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Postgres = class {
      static __initStatic() {
        this.id = "Postgres";
      }
      __init() {
        this.name = Postgres.id;
      }
      constructor(options = {}) {
        Postgres.prototype.__init.call(this);
        this._usePgNative = !!options.usePgNative;
      }
      loadDependency() {
        return (this._module = this._module || utils.loadModule("pg"));
      }
      setupOnce(_, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "Postgres Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              "Postgres Integration was unable to require `pg` package.",
            );
          return;
        }
        if (
          this._usePgNative &&
          !_optionalChain([
            pkg,
            "access",
            (_2) => _2.native,
            "optionalAccess",
            (_3) => _3.Client,
          ])
        ) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              "Postgres Integration was unable to access 'pg-native' bindings.",
            );
          return;
        }
        const { Client } = this._usePgNative ? pkg.native : pkg;
        utils.fill(Client.prototype, "query", function (orig) {
          return function (config, values, callback) {
            const scope = getCurrentHub().getScope();
            const parentSpan = _optionalChain([
              scope,
              "optionalAccess",
              (_4) => _4.getSpan,
              "call",
              (_5) => _5(),
            ]);
            const span = _optionalChain([
              parentSpan,
              "optionalAccess",
              (_6) => _6.startChild,
              "call",
              (_7) =>
                _7({
                  description:
                    typeof config === "string" ? config : config.text,
                  op: "db",
                  data: {
                    "db.system": "postgresql",
                  },
                }),
            ]);
            if (typeof callback === "function") {
              return orig.call(this, config, values, function (err, result) {
                _optionalChain([
                  span,
                  "optionalAccess",
                  (_8) => _8.finish,
                  "call",
                  (_9) => _9(),
                ]);
                callback(err, result);
              });
            }
            if (typeof values === "function") {
              return orig.call(this, config, function (err, result) {
                _optionalChain([
                  span,
                  "optionalAccess",
                  (_10) => _10.finish,
                  "call",
                  (_11) => _11(),
                ]);
                values(err, result);
              });
            }
            const rv =
              typeof values !== "undefined"
                ? orig.call(this, config, values)
                : orig.call(this, config);
            if (utils.isThenable(rv)) {
              return rv.then((res) => {
                _optionalChain([
                  span,
                  "optionalAccess",
                  (_12) => _12.finish,
                  "call",
                  (_13) => _13(),
                ]);
                return res;
              });
            }
            _optionalChain([
              span,
              "optionalAccess",
              (_14) => _14.finish,
              "call",
              (_15) => _15(),
            ]);
            return rv;
          };
        });
      }
    };
    Postgres.__initStatic();
    exports.Postgres = Postgres;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/mysql.js
var require_mysql = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/mysql.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Mysql = class {
      constructor() {
        Mysql.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "Mysql";
      }
      __init() {
        this.name = Mysql.id;
      }
      loadDependency() {
        return (this._module =
          this._module || utils.loadModule("mysql/lib/Connection.js"));
      }
      setupOnce(_, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "Mysql Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              "Mysql Integration was unable to require `mysql` package.",
            );
          return;
        }
        utils.fill(pkg, "createQuery", function (orig) {
          return function (options, values, callback) {
            const scope = getCurrentHub().getScope();
            const parentSpan = _optionalChain([
              scope,
              "optionalAccess",
              (_2) => _2.getSpan,
              "call",
              (_3) => _3(),
            ]);
            const span = _optionalChain([
              parentSpan,
              "optionalAccess",
              (_4) => _4.startChild,
              "call",
              (_5) =>
                _5({
                  description:
                    typeof options === "string" ? options : options.sql,
                  op: "db",
                  data: {
                    "db.system": "mysql",
                  },
                }),
            ]);
            if (typeof callback === "function") {
              return orig.call(
                this,
                options,
                values,
                function (err, result, fields) {
                  _optionalChain([
                    span,
                    "optionalAccess",
                    (_6) => _6.finish,
                    "call",
                    (_7) => _7(),
                  ]);
                  callback(err, result, fields);
                },
              );
            }
            if (typeof values === "function") {
              return orig.call(this, options, function (err, result, fields) {
                _optionalChain([
                  span,
                  "optionalAccess",
                  (_8) => _8.finish,
                  "call",
                  (_9) => _9(),
                ]);
                values(err, result, fields);
              });
            }
            return orig.call(this, options, values, callback);
          };
        });
      }
    };
    Mysql.__initStatic();
    exports.Mysql = Mysql;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/mongo.js
var require_mongo = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/mongo.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var OPERATIONS = [
      "aggregate",
      "bulkWrite",
      "countDocuments",
      "createIndex",
      "createIndexes",
      "deleteMany",
      "deleteOne",
      "distinct",
      "drop",
      "dropIndex",
      "dropIndexes",
      "estimatedDocumentCount",
      "find",
      "findOne",
      "findOneAndDelete",
      "findOneAndReplace",
      "findOneAndUpdate",
      "indexes",
      "indexExists",
      "indexInformation",
      "initializeOrderedBulkOp",
      "insertMany",
      "insertOne",
      "isCapped",
      "mapReduce",
      "options",
      "parallelCollectionScan",
      "rename",
      "replaceOne",
      "stats",
      "updateMany",
      "updateOne",
    ];
    var OPERATION_SIGNATURES = {
      bulkWrite: ["operations"],
      countDocuments: ["query"],
      createIndex: ["fieldOrSpec"],
      createIndexes: ["indexSpecs"],
      deleteMany: ["filter"],
      deleteOne: ["filter"],
      distinct: ["key", "query"],
      dropIndex: ["indexName"],
      find: ["query"],
      findOne: ["query"],
      findOneAndDelete: ["filter"],
      findOneAndReplace: ["filter", "replacement"],
      findOneAndUpdate: ["filter", "update"],
      indexExists: ["indexes"],
      insertMany: ["docs"],
      insertOne: ["doc"],
      mapReduce: ["map", "reduce"],
      rename: ["newName"],
      replaceOne: ["filter", "doc"],
      updateMany: ["filter", "update"],
      updateOne: ["filter", "update"],
    };
    function isCursor(maybeCursor) {
      return (
        maybeCursor &&
        typeof maybeCursor === "object" &&
        maybeCursor.once &&
        typeof maybeCursor.once === "function"
      );
    }
    var Mongo = class {
      static __initStatic() {
        this.id = "Mongo";
      }
      __init() {
        this.name = Mongo.id;
      }
      constructor(options = {}) {
        Mongo.prototype.__init.call(this);
        this._operations = Array.isArray(options.operations)
          ? options.operations
          : OPERATIONS;
        this._describeOperations =
          "describeOperations" in options ? options.describeOperations : true;
        this._useMongoose = !!options.useMongoose;
      }
      loadDependency() {
        const moduleName = this._useMongoose ? "mongoose" : "mongodb";
        return (this._module = this._module || utils.loadModule(moduleName));
      }
      setupOnce(_, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "Mongo Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          const moduleName = this._useMongoose ? "mongoose" : "mongodb";
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              `Mongo Integration was unable to require \`${moduleName}\` package.`,
            );
          return;
        }
        this._instrumentOperations(
          pkg.Collection,
          this._operations,
          getCurrentHub,
        );
      }
      _instrumentOperations(collection, operations, getCurrentHub) {
        operations.forEach((operation) =>
          this._patchOperation(collection, operation, getCurrentHub),
        );
      }
      _patchOperation(collection, operation, getCurrentHub) {
        if (!(operation in collection.prototype)) return;
        const getSpanContext =
          this._getSpanContextFromOperationArguments.bind(this);
        utils.fill(collection.prototype, operation, function (orig) {
          return function (...args) {
            const lastArg = args[args.length - 1];
            const scope = getCurrentHub().getScope();
            const parentSpan = _optionalChain([
              scope,
              "optionalAccess",
              (_2) => _2.getSpan,
              "call",
              (_3) => _3(),
            ]);
            if (
              typeof lastArg !== "function" ||
              (operation === "mapReduce" && args.length === 2)
            ) {
              const span2 = _optionalChain([
                parentSpan,
                "optionalAccess",
                (_4) => _4.startChild,
                "call",
                (_5) => _5(getSpanContext(this, operation, args)),
              ]);
              const maybePromiseOrCursor = orig.call(this, ...args);
              if (utils.isThenable(maybePromiseOrCursor)) {
                return maybePromiseOrCursor.then((res) => {
                  _optionalChain([
                    span2,
                    "optionalAccess",
                    (_6) => _6.finish,
                    "call",
                    (_7) => _7(),
                  ]);
                  return res;
                });
              } else if (isCursor(maybePromiseOrCursor)) {
                const cursor = maybePromiseOrCursor;
                try {
                  cursor.once("close", () => {
                    _optionalChain([
                      span2,
                      "optionalAccess",
                      (_8) => _8.finish,
                      "call",
                      (_9) => _9(),
                    ]);
                  });
                } catch (e) {
                  _optionalChain([
                    span2,
                    "optionalAccess",
                    (_10) => _10.finish,
                    "call",
                    (_11) => _11(),
                  ]);
                }
                return cursor;
              } else {
                _optionalChain([
                  span2,
                  "optionalAccess",
                  (_12) => _12.finish,
                  "call",
                  (_13) => _13(),
                ]);
                return maybePromiseOrCursor;
              }
            }
            const span = _optionalChain([
              parentSpan,
              "optionalAccess",
              (_14) => _14.startChild,
              "call",
              (_15) => _15(getSpanContext(this, operation, args.slice(0, -1))),
            ]);
            return orig.call(
              this,
              ...args.slice(0, -1),
              function (err, result) {
                _optionalChain([
                  span,
                  "optionalAccess",
                  (_16) => _16.finish,
                  "call",
                  (_17) => _17(),
                ]);
                lastArg(err, result);
              },
            );
          };
        });
      }
      _getSpanContextFromOperationArguments(collection, operation, args) {
        const data = {
          collectionName: collection.collectionName,
          dbName: collection.dbName,
          namespace: collection.namespace,
          "db.system": "mongodb",
        };
        const spanContext = {
          op: "db",
          description: operation,
          data,
        };
        const signature = OPERATION_SIGNATURES[operation];
        const shouldDescribe = Array.isArray(this._describeOperations)
          ? this._describeOperations.includes(operation)
          : this._describeOperations;
        if (!signature || !shouldDescribe) {
          return spanContext;
        }
        try {
          if (operation === "mapReduce") {
            const [map, reduce] = args;
            data[signature[0]] =
              typeof map === "string" ? map : map.name || "<anonymous>";
            data[signature[1]] =
              typeof reduce === "string"
                ? reduce
                : reduce.name || "<anonymous>";
          } else {
            for (let i = 0; i < signature.length; i++) {
              data[signature[i]] = JSON.stringify(args[i]);
            }
          }
        } catch (_oO) {}
        return spanContext;
      }
    };
    Mongo.__initStatic();
    exports.Mongo = Mongo;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/prisma.js
var require_prisma = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/prisma.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    function isValidPrismaClient(possibleClient) {
      return !!possibleClient && !!possibleClient["$use"];
    }
    var Prisma = class {
      static __initStatic() {
        this.id = "Prisma";
      }
      __init() {
        this.name = Prisma.id;
      }
      constructor(options = {}) {
        Prisma.prototype.__init.call(this);
        if (
          isValidPrismaClient(options.client) &&
          !options.client._sentryInstrumented
        ) {
          utils.addNonEnumerableProperty(
            options.client,
            "_sentryInstrumented",
            true,
          );
          options.client.$use((params, next) => {
            if (
              nodeUtils.shouldDisableAutoInstrumentation(core.getCurrentHub)
            ) {
              return next(params);
            }
            const action = params.action;
            const model = params.model;
            return core.trace(
              {
                name: model ? `${model} ${action}` : action,
                op: "db.sql.prisma",
                data: { "db.system": "prisma" },
              },
              () => next(params),
            );
          });
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              `Unsupported Prisma client provided to PrismaIntegration. Provided client: ${JSON.stringify(
                options.client,
              )}`,
            );
        }
      }
      setupOnce() {}
    };
    Prisma.__initStatic();
    exports.Prisma = Prisma;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/graphql.js
var require_graphql = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/graphql.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var GraphQL = class {
      constructor() {
        GraphQL.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "GraphQL";
      }
      __init() {
        this.name = GraphQL.id;
      }
      loadDependency() {
        return (this._module =
          this._module || utils.loadModule("graphql/execution/execute.js"));
      }
      setupOnce(_, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "GraphQL Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(
              "GraphQL Integration was unable to require graphql/execution package.",
            );
          return;
        }
        utils.fill(pkg, "execute", function (orig) {
          return function (...args) {
            const scope = getCurrentHub().getScope();
            const parentSpan = _optionalChain([
              scope,
              "optionalAccess",
              (_2) => _2.getSpan,
              "call",
              (_3) => _3(),
            ]);
            const span = _optionalChain([
              parentSpan,
              "optionalAccess",
              (_4) => _4.startChild,
              "call",
              (_5) =>
                _5({
                  description: "execute",
                  op: "graphql.execute",
                }),
            ]);
            _optionalChain([
              scope,
              "optionalAccess",
              (_6) => _6.setSpan,
              "call",
              (_7) => _7(span),
            ]);
            const rv = orig.call(this, ...args);
            if (utils.isThenable(rv)) {
              return rv.then((res) => {
                _optionalChain([
                  span,
                  "optionalAccess",
                  (_8) => _8.finish,
                  "call",
                  (_9) => _9(),
                ]);
                _optionalChain([
                  scope,
                  "optionalAccess",
                  (_10) => _10.setSpan,
                  "call",
                  (_11) => _11(parentSpan),
                ]);
                return res;
              });
            }
            _optionalChain([
              span,
              "optionalAccess",
              (_12) => _12.finish,
              "call",
              (_13) => _13(),
            ]);
            _optionalChain([
              scope,
              "optionalAccess",
              (_14) => _14.setSpan,
              "call",
              (_15) => _15(parentSpan),
            ]);
            return rv;
          };
        });
      }
    };
    GraphQL.__initStatic();
    exports.GraphQL = GraphQL;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/apollo.js
var require_apollo = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/apollo.js"(
    exports,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Apollo = class {
      static __initStatic() {
        this.id = "Apollo";
      }
      __init() {
        this.name = Apollo.id;
      }
      constructor(
        options = {
          useNestjs: false,
        },
      ) {
        Apollo.prototype.__init.call(this);
        this._useNest = !!options.useNestjs;
      }
      loadDependency() {
        if (this._useNest) {
          this._module = this._module || utils.loadModule("@nestjs/graphql");
        } else {
          this._module = this._module || utils.loadModule("apollo-server-core");
        }
        return this._module;
      }
      setupOnce(_, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "Apollo Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        if (this._useNest) {
          const pkg = this.loadDependency();
          if (!pkg) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.error(
                "Apollo-NestJS Integration was unable to require @nestjs/graphql package.",
              );
            return;
          }
          utils.fill(
            pkg.GraphQLFactory.prototype,
            "mergeWithSchema",
            function (orig) {
              return function (...args) {
                utils.fill(
                  this.resolversExplorerService,
                  "explore",
                  function (orig2) {
                    return function () {
                      const resolvers = utils.arrayify(orig2.call(this));
                      const instrumentedResolvers = instrumentResolvers(
                        resolvers,
                        getCurrentHub,
                      );
                      return instrumentedResolvers;
                    };
                  },
                );
                return orig.call(this, ...args);
              };
            },
          );
        } else {
          const pkg = this.loadDependency();
          if (!pkg) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.error(
                "Apollo Integration was unable to require apollo-server-core package.",
              );
            return;
          }
          utils.fill(
            pkg.ApolloServerBase.prototype,
            "constructSchema",
            function (orig) {
              return function () {
                if (!this.config.resolvers) {
                  if (
                    typeof __SENTRY_DEBUG__ === "undefined" ||
                    __SENTRY_DEBUG__
                  ) {
                    if (this.config.schema) {
                      utils.logger.warn(
                        "Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead.",
                      );
                      utils.logger.warn();
                    } else if (this.config.modules) {
                      utils.logger.warn(
                        "Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property.",
                      );
                    }
                    utils.logger.error(
                      "Skipping tracing as no resolvers found on the `ApolloServer` instance.",
                    );
                  }
                  return orig.call(this);
                }
                const resolvers = utils.arrayify(this.config.resolvers);
                this.config.resolvers = instrumentResolvers(
                  resolvers,
                  getCurrentHub,
                );
                return orig.call(this);
              };
            },
          );
        }
      }
    };
    Apollo.__initStatic();
    function instrumentResolvers(resolvers, getCurrentHub) {
      return resolvers.map((model) => {
        Object.keys(model).forEach((resolverGroupName) => {
          Object.keys(model[resolverGroupName]).forEach((resolverName) => {
            if (typeof model[resolverGroupName][resolverName] !== "function") {
              return;
            }
            wrapResolver(model, resolverGroupName, resolverName, getCurrentHub);
          });
        });
        return model;
      });
    }
    function wrapResolver(
      model,
      resolverGroupName,
      resolverName,
      getCurrentHub,
    ) {
      utils.fill(model[resolverGroupName], resolverName, function (orig) {
        return function (...args) {
          const scope = getCurrentHub().getScope();
          const parentSpan = _optionalChain([
            scope,
            "optionalAccess",
            (_2) => _2.getSpan,
            "call",
            (_3) => _3(),
          ]);
          const span = _optionalChain([
            parentSpan,
            "optionalAccess",
            (_4) => _4.startChild,
            "call",
            (_5) =>
              _5({
                description: `${resolverGroupName}.${resolverName}`,
                op: "graphql.resolve",
              }),
          ]);
          const rv = orig.call(this, ...args);
          if (utils.isThenable(rv)) {
            return rv.then((res) => {
              _optionalChain([
                span,
                "optionalAccess",
                (_6) => _6.finish,
                "call",
                (_7) => _7(),
              ]);
              return res;
            });
          }
          _optionalChain([
            span,
            "optionalAccess",
            (_8) => _8.finish,
            "call",
            (_9) => _9(),
          ]);
          return rv;
        };
      });
    }
    exports.Apollo = Apollo;
  },
});

// node_modules/@sentry-internal/tracing/cjs/node/integrations/lazy.js
var require_lazy = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/node/integrations/lazy.js"(
    exports,
    module2,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var lazyLoadedNodePerformanceMonitoringIntegrations = [
      () => {
        const integration = utils.dynamicRequire(module2, "./apollo");
        return new integration.Apollo();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./apollo");
        return new integration.Apollo({ useNestjs: true });
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./graphql");
        return new integration.GraphQL();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./mongo");
        return new integration.Mongo();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./mongo");
        return new integration.Mongo({ mongoose: true });
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./mysql");
        return new integration.Mysql();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./postgres");
        return new integration.Postgres();
      },
    ];
    exports.lazyLoadedNodePerformanceMonitoringIntegrations =
      lazyLoadedNodePerformanceMonitoringIntegrations;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/types.js
var require_types = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/types.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var WINDOW = utils.GLOBAL_OBJ;
    exports.WINDOW = WINDOW;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/backgroundtab.js
var require_backgroundtab = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/backgroundtab.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var types = require_types();
    function registerBackgroundTabDetection() {
      if (types.WINDOW && types.WINDOW.document) {
        types.WINDOW.document.addEventListener("visibilitychange", () => {
          const activeTransaction = core.getActiveTransaction();
          if (types.WINDOW.document.hidden && activeTransaction) {
            const statusType = "cancelled";
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.log(
                `[Tracing] Transaction: ${statusType} -> since tab moved to the background, op: ${activeTransaction.op}`,
              );
            if (!activeTransaction.status) {
              activeTransaction.setStatus(statusType);
            }
            activeTransaction.setTag("visibilitychange", "document.hidden");
            activeTransaction.finish();
          }
        });
      } else {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            "[Tracing] Could not set up background tab detection due to lack of global document",
          );
      }
    }
    exports.registerBackgroundTabDetection = registerBackgroundTabDetection;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/bindReporter.js
var require_bindReporter = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/bindReporter.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = (callback, metric, reportAllChanges) => {
      let prevValue;
      let delta;
      return (forceReport) => {
        if (metric.value >= 0) {
          if (forceReport || reportAllChanges) {
            delta = metric.value - (prevValue || 0);
            if (delta || prevValue === void 0) {
              prevValue = metric.value;
              metric.delta = delta;
              callback(metric);
            }
          }
        }
      };
    };
    exports.bindReporter = bindReporter;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/generateUniqueID.js
var require_generateUniqueID = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/generateUniqueID.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateUniqueID = () => {
      return `v3-${Date.now()}-${
        Math.floor(Math.random() * (9e12 - 1)) + 1e12
      }`;
    };
    exports.generateUniqueID = generateUniqueID;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getNavigationEntry.js
var require_getNavigationEntry = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getNavigationEntry.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var getNavigationEntryFromPerformanceTiming = () => {
      const timing = types.WINDOW.performance.timing;
      const type = types.WINDOW.performance.navigation.type;
      const navigationEntry = {
        entryType: "navigation",
        startTime: 0,
        type: type == 2 ? "back_forward" : type === 1 ? "reload" : "navigate",
      };
      for (const key in timing) {
        if (key !== "navigationStart" && key !== "toJSON") {
          navigationEntry[key] = Math.max(
            timing[key] - timing.navigationStart,
            0,
          );
        }
      }
      return navigationEntry;
    };
    var getNavigationEntry = () => {
      if (types.WINDOW.__WEB_VITALS_POLYFILL__) {
        return (
          types.WINDOW.performance &&
          ((performance.getEntriesByType &&
            performance.getEntriesByType("navigation")[0]) ||
            getNavigationEntryFromPerformanceTiming())
        );
      } else {
        return (
          types.WINDOW.performance &&
          performance.getEntriesByType &&
          performance.getEntriesByType("navigation")[0]
        );
      }
    };
    exports.getNavigationEntry = getNavigationEntry;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getActivationStart.js
var require_getActivationStart = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getActivationStart.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var getNavigationEntry = require_getNavigationEntry();
    var getActivationStart = () => {
      const navEntry = getNavigationEntry.getNavigationEntry();
      return (navEntry && navEntry.activationStart) || 0;
    };
    exports.getActivationStart = getActivationStart;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/initMetric.js
var require_initMetric = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/initMetric.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var generateUniqueID = require_generateUniqueID();
    var getActivationStart = require_getActivationStart();
    var getNavigationEntry = require_getNavigationEntry();
    var initMetric = (name, value) => {
      const navEntry = getNavigationEntry.getNavigationEntry();
      let navigationType = "navigate";
      if (navEntry) {
        if (
          types.WINDOW.document.prerendering ||
          getActivationStart.getActivationStart() > 0
        ) {
          navigationType = "prerender";
        } else {
          navigationType = navEntry.type.replace(/_/g, "-");
        }
      }
      return {
        name,
        value: typeof value === "undefined" ? -1 : value,
        rating: "good",
        delta: 0,
        entries: [],
        id: generateUniqueID.generateUniqueID(),
        navigationType,
      };
    };
    exports.initMetric = initMetric;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/observe.js
var require_observe = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/observe.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var observe = (type, callback, opts) => {
      try {
        if (PerformanceObserver.supportedEntryTypes.includes(type)) {
          const po = new PerformanceObserver((list) => {
            callback(list.getEntries());
          });
          po.observe(
            Object.assign(
              {
                type,
                buffered: true,
              },
              opts || {},
            ),
          );
          return po;
        }
      } catch (e) {}
      return;
    };
    exports.observe = observe;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/onHidden.js
var require_onHidden = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/onHidden.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var onHidden = (cb, once) => {
      const onHiddenOrPageHide = (event) => {
        if (
          event.type === "pagehide" ||
          types.WINDOW.document.visibilityState === "hidden"
        ) {
          cb(event);
          if (once) {
            removeEventListener("visibilitychange", onHiddenOrPageHide, true);
            removeEventListener("pagehide", onHiddenOrPageHide, true);
          }
        }
      };
      addEventListener("visibilitychange", onHiddenOrPageHide, true);
      addEventListener("pagehide", onHiddenOrPageHide, true);
    };
    exports.onHidden = onHidden;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getCLS.js
var require_getCLS = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getCLS.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = require_bindReporter();
    var initMetric = require_initMetric();
    var observe = require_observe();
    var onHidden = require_onHidden();
    var onCLS = (onReport) => {
      const metric = initMetric.initMetric("CLS", 0);
      let report;
      let sessionValue = 0;
      let sessionEntries = [];
      const handleEntries = (entries) => {
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            if (
              sessionValue &&
              sessionEntries.length !== 0 &&
              entry.startTime - lastSessionEntry.startTime < 1e3 &&
              entry.startTime - firstSessionEntry.startTime < 5e3
            ) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }
            if (sessionValue > metric.value) {
              metric.value = sessionValue;
              metric.entries = sessionEntries;
              if (report) {
                report();
              }
            }
          }
        });
      };
      const po = observe.observe("layout-shift", handleEntries);
      if (po) {
        report = bindReporter.bindReporter(onReport, metric);
        const stopListening = () => {
          handleEntries(po.takeRecords());
          report(true);
        };
        onHidden.onHidden(stopListening);
        return stopListening;
      }
      return;
    };
    exports.onCLS = onCLS;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getVisibilityWatcher.js
var require_getVisibilityWatcher = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getVisibilityWatcher.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var onHidden = require_onHidden();
    var firstHiddenTime = -1;
    var initHiddenTime = () => {
      return types.WINDOW.document.visibilityState === "hidden" &&
        !types.WINDOW.document.prerendering
        ? 0
        : Infinity;
    };
    var trackChanges = () => {
      onHidden.onHidden(({ timeStamp }) => {
        firstHiddenTime = timeStamp;
      }, true);
    };
    var getVisibilityWatcher = () => {
      if (firstHiddenTime < 0) {
        firstHiddenTime = initHiddenTime();
        trackChanges();
      }
      return {
        get firstHiddenTime() {
          return firstHiddenTime;
        },
      };
    };
    exports.getVisibilityWatcher = getVisibilityWatcher;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getFID.js
var require_getFID = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getFID.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = require_bindReporter();
    var getVisibilityWatcher = require_getVisibilityWatcher();
    var initMetric = require_initMetric();
    var observe = require_observe();
    var onHidden = require_onHidden();
    var onFID = (onReport) => {
      const visibilityWatcher = getVisibilityWatcher.getVisibilityWatcher();
      const metric = initMetric.initMetric("FID");
      let report;
      const handleEntry = (entry) => {
        if (entry.startTime < visibilityWatcher.firstHiddenTime) {
          metric.value = entry.processingStart - entry.startTime;
          metric.entries.push(entry);
          report(true);
        }
      };
      const handleEntries = (entries) => {
        entries.forEach(handleEntry);
      };
      const po = observe.observe("first-input", handleEntries);
      report = bindReporter.bindReporter(onReport, metric);
      if (po) {
        onHidden.onHidden(() => {
          handleEntries(po.takeRecords());
          po.disconnect();
        }, true);
      }
    };
    exports.onFID = onFID;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getLCP.js
var require_getLCP = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getLCP.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = require_bindReporter();
    var getActivationStart = require_getActivationStart();
    var getVisibilityWatcher = require_getVisibilityWatcher();
    var initMetric = require_initMetric();
    var observe = require_observe();
    var onHidden = require_onHidden();
    var reportedMetricIDs = {};
    var onLCP = (onReport) => {
      const visibilityWatcher = getVisibilityWatcher.getVisibilityWatcher();
      const metric = initMetric.initMetric("LCP");
      let report;
      const handleEntries = (entries) => {
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const value = Math.max(
            lastEntry.startTime - getActivationStart.getActivationStart(),
            0,
          );
          if (value < visibilityWatcher.firstHiddenTime) {
            metric.value = value;
            metric.entries = [lastEntry];
            report();
          }
        }
      };
      const po = observe.observe("largest-contentful-paint", handleEntries);
      if (po) {
        report = bindReporter.bindReporter(onReport, metric);
        const stopListening = () => {
          if (!reportedMetricIDs[metric.id]) {
            handleEntries(po.takeRecords());
            po.disconnect();
            reportedMetricIDs[metric.id] = true;
            report(true);
          }
        };
        ["keydown", "click"].forEach((type) => {
          addEventListener(type, stopListening, { once: true, capture: true });
        });
        onHidden.onHidden(stopListening, true);
        return stopListening;
      }
      return;
    };
    exports.onLCP = onLCP;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/metrics/utils.js
var require_utils2 = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/metrics/utils.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function isMeasurementValue(value) {
      return typeof value === "number" && isFinite(value);
    }
    function _startChild(transaction, _a) {
      var _b = _a,
        { startTimestamp } = _b,
        ctx = __objRest(_b, ["startTimestamp"]);
      if (startTimestamp && transaction.startTimestamp > startTimestamp) {
        transaction.startTimestamp = startTimestamp;
      }
      return transaction.startChild(
        __spreadValues(
          {
            startTimestamp,
          },
          ctx,
        ),
      );
    }
    exports._startChild = _startChild;
    exports.isMeasurementValue = isMeasurementValue;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/metrics/index.js
var require_metrics = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/metrics/index.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var types = require_types();
    var getCLS = require_getCLS();
    var getFID = require_getFID();
    var getLCP = require_getLCP();
    var getVisibilityWatcher = require_getVisibilityWatcher();
    var observe = require_observe();
    var utils$1 = require_utils2();
    function msToSec(time) {
      return time / 1e3;
    }
    function getBrowserPerformanceAPI() {
      return (
        types.WINDOW &&
        types.WINDOW.addEventListener &&
        types.WINDOW.performance
      );
    }
    var _performanceCursor = 0;
    var _measurements = {};
    var _lcpEntry;
    var _clsEntry;
    function startTrackingWebVitals() {
      const performance2 = getBrowserPerformanceAPI();
      if (performance2 && utils.browserPerformanceTimeOrigin) {
        if (performance2.mark) {
          types.WINDOW.performance.mark("sentry-tracing-init");
        }
        _trackFID();
        const clsCallback = _trackCLS();
        const lcpCallback = _trackLCP();
        return () => {
          if (clsCallback) {
            clsCallback();
          }
          if (lcpCallback) {
            lcpCallback();
          }
        };
      }
      return () => void 0;
    }
    function startTrackingLongTasks() {
      const entryHandler = (entries) => {
        for (const entry of entries) {
          const transaction = core.getActiveTransaction();
          if (!transaction) {
            return;
          }
          const startTime = msToSec(
            utils.browserPerformanceTimeOrigin + entry.startTime,
          );
          const duration = msToSec(entry.duration);
          transaction.startChild({
            description: "Main UI thread blocked",
            op: "ui.long-task",
            startTimestamp: startTime,
            endTimestamp: startTime + duration,
          });
        }
      };
      observe.observe("longtask", entryHandler);
    }
    function startTrackingInteractions() {
      const entryHandler = (entries) => {
        for (const entry of entries) {
          const transaction = core.getActiveTransaction();
          if (!transaction) {
            return;
          }
          if (entry.name === "click") {
            const startTime = msToSec(
              utils.browserPerformanceTimeOrigin + entry.startTime,
            );
            const duration = msToSec(entry.duration);
            transaction.startChild({
              description: utils.htmlTreeAsString(entry.target),
              op: `ui.interaction.${entry.name}`,
              startTimestamp: startTime,
              endTimestamp: startTime + duration,
            });
          }
        }
      };
      observe.observe("event", entryHandler, { durationThreshold: 0 });
    }
    function _trackCLS() {
      return getCLS.onCLS((metric) => {
        const entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log("[Measurements] Adding CLS");
        _measurements["cls"] = { value: metric.value, unit: "" };
        _clsEntry = entry;
      });
    }
    function _trackLCP() {
      return getLCP.onLCP((metric) => {
        const entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log("[Measurements] Adding LCP");
        _measurements["lcp"] = { value: metric.value, unit: "millisecond" };
        _lcpEntry = entry;
      });
    }
    function _trackFID() {
      getFID.onFID((metric) => {
        const entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        const timeOrigin = msToSec(utils.browserPerformanceTimeOrigin);
        const startTime = msToSec(entry.startTime);
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log("[Measurements] Adding FID");
        _measurements["fid"] = { value: metric.value, unit: "millisecond" };
        _measurements["mark.fid"] = {
          value: timeOrigin + startTime,
          unit: "second",
        };
      });
    }
    function addPerformanceEntries(transaction) {
      const performance2 = getBrowserPerformanceAPI();
      if (
        !performance2 ||
        !types.WINDOW.performance.getEntries ||
        !utils.browserPerformanceTimeOrigin
      ) {
        return;
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
        utils.logger.log(
          "[Tracing] Adding & adjusting spans using Performance API",
        );
      const timeOrigin = msToSec(utils.browserPerformanceTimeOrigin);
      const performanceEntries = performance2.getEntries();
      let responseStartTimestamp;
      let requestStartTimestamp;
      performanceEntries.slice(_performanceCursor).forEach((entry) => {
        const startTime = msToSec(entry.startTime);
        const duration = msToSec(entry.duration);
        if (
          transaction.op === "navigation" &&
          timeOrigin + startTime < transaction.startTimestamp
        ) {
          return;
        }
        switch (entry.entryType) {
          case "navigation": {
            _addNavigationSpans(transaction, entry, timeOrigin);
            responseStartTimestamp = timeOrigin + msToSec(entry.responseStart);
            requestStartTimestamp = timeOrigin + msToSec(entry.requestStart);
            break;
          }
          case "mark":
          case "paint":
          case "measure": {
            _addMeasureSpans(
              transaction,
              entry,
              startTime,
              duration,
              timeOrigin,
            );
            const firstHidden = getVisibilityWatcher.getVisibilityWatcher();
            const shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
            if (entry.name === "first-paint" && shouldRecord) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                utils.logger.log("[Measurements] Adding FP");
              _measurements["fp"] = {
                value: entry.startTime,
                unit: "millisecond",
              };
            }
            if (entry.name === "first-contentful-paint" && shouldRecord) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                utils.logger.log("[Measurements] Adding FCP");
              _measurements["fcp"] = {
                value: entry.startTime,
                unit: "millisecond",
              };
            }
            break;
          }
          case "resource": {
            const resourceName = entry.name.replace(
              types.WINDOW.location.origin,
              "",
            );
            _addResourceSpans(
              transaction,
              entry,
              resourceName,
              startTime,
              duration,
              timeOrigin,
            );
            break;
          }
        }
      });
      _performanceCursor = Math.max(performanceEntries.length - 1, 0);
      _trackNavigator(transaction);
      if (transaction.op === "pageload") {
        if (typeof responseStartTimestamp === "number") {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log("[Measurements] Adding TTFB");
          _measurements["ttfb"] = {
            value: (responseStartTimestamp - transaction.startTimestamp) * 1e3,
            unit: "millisecond",
          };
          if (
            typeof requestStartTimestamp === "number" &&
            requestStartTimestamp <= responseStartTimestamp
          ) {
            _measurements["ttfb.requestTime"] = {
              value: (responseStartTimestamp - requestStartTimestamp) * 1e3,
              unit: "millisecond",
            };
          }
        }
        ["fcp", "fp", "lcp"].forEach((name) => {
          if (
            !_measurements[name] ||
            timeOrigin >= transaction.startTimestamp
          ) {
            return;
          }
          const oldValue = _measurements[name].value;
          const measurementTimestamp = timeOrigin + msToSec(oldValue);
          const normalizedValue = Math.abs(
            (measurementTimestamp - transaction.startTimestamp) * 1e3,
          );
          const delta = normalizedValue - oldValue;
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              `[Measurements] Normalized ${name} from ${oldValue} to ${normalizedValue} (${delta})`,
            );
          _measurements[name].value = normalizedValue;
        });
        const fidMark = _measurements["mark.fid"];
        if (fidMark && _measurements["fid"]) {
          utils$1._startChild(transaction, {
            description: "first input delay",
            endTimestamp: fidMark.value + msToSec(_measurements["fid"].value),
            op: "ui.action",
            startTimestamp: fidMark.value,
          });
          delete _measurements["mark.fid"];
        }
        if (!("fcp" in _measurements)) {
          delete _measurements.cls;
        }
        Object.keys(_measurements).forEach((measurementName) => {
          transaction.setMeasurement(
            measurementName,
            _measurements[measurementName].value,
            _measurements[measurementName].unit,
          );
        });
        _tagMetricInfo(transaction);
      }
      _lcpEntry = void 0;
      _clsEntry = void 0;
      _measurements = {};
    }
    function _addMeasureSpans(
      transaction,
      entry,
      startTime,
      duration,
      timeOrigin,
    ) {
      const measureStartTimestamp = timeOrigin + startTime;
      const measureEndTimestamp = measureStartTimestamp + duration;
      utils$1._startChild(transaction, {
        description: entry.name,
        endTimestamp: measureEndTimestamp,
        op: entry.entryType,
        startTimestamp: measureStartTimestamp,
      });
      return measureStartTimestamp;
    }
    function _addNavigationSpans(transaction, entry, timeOrigin) {
      [
        "unloadEvent",
        "redirect",
        "domContentLoadedEvent",
        "loadEvent",
        "connect",
      ].forEach((event) => {
        _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin);
      });
      _addPerformanceNavigationTiming(
        transaction,
        entry,
        "secureConnection",
        timeOrigin,
        "TLS/SSL",
        "connectEnd",
      );
      _addPerformanceNavigationTiming(
        transaction,
        entry,
        "fetch",
        timeOrigin,
        "cache",
        "domainLookupStart",
      );
      _addPerformanceNavigationTiming(
        transaction,
        entry,
        "domainLookup",
        timeOrigin,
        "DNS",
      );
      _addRequest(transaction, entry, timeOrigin);
    }
    function _addPerformanceNavigationTiming(
      transaction,
      entry,
      event,
      timeOrigin,
      description,
      eventEnd,
    ) {
      const end = eventEnd ? entry[eventEnd] : entry[`${event}End`];
      const start = entry[`${event}Start`];
      if (!start || !end) {
        return;
      }
      utils$1._startChild(transaction, {
        op: "browser",
        description: description || event,
        startTimestamp: timeOrigin + msToSec(start),
        endTimestamp: timeOrigin + msToSec(end),
      });
    }
    function _addRequest(transaction, entry, timeOrigin) {
      utils$1._startChild(transaction, {
        op: "browser",
        description: "request",
        startTimestamp: timeOrigin + msToSec(entry.requestStart),
        endTimestamp: timeOrigin + msToSec(entry.responseEnd),
      });
      utils$1._startChild(transaction, {
        op: "browser",
        description: "response",
        startTimestamp: timeOrigin + msToSec(entry.responseStart),
        endTimestamp: timeOrigin + msToSec(entry.responseEnd),
      });
    }
    function _addResourceSpans(
      transaction,
      entry,
      resourceName,
      startTime,
      duration,
      timeOrigin,
    ) {
      if (
        entry.initiatorType === "xmlhttprequest" ||
        entry.initiatorType === "fetch"
      ) {
        return;
      }
      const data = {};
      if ("transferSize" in entry) {
        data["http.response_transfer_size"] = entry.transferSize;
      }
      if ("encodedBodySize" in entry) {
        data["http.response_content_length"] = entry.encodedBodySize;
      }
      if ("decodedBodySize" in entry) {
        data["http.decoded_response_content_length"] = entry.decodedBodySize;
      }
      if ("renderBlockingStatus" in entry) {
        data["resource.render_blocking_status"] = entry.renderBlockingStatus;
      }
      const startTimestamp = timeOrigin + startTime;
      const endTimestamp = startTimestamp + duration;
      utils$1._startChild(transaction, {
        description: resourceName,
        endTimestamp,
        op: entry.initiatorType
          ? `resource.${entry.initiatorType}`
          : "resource.other",
        startTimestamp,
        data,
      });
    }
    function _trackNavigator(transaction) {
      const navigator2 = types.WINDOW.navigator;
      if (!navigator2) {
        return;
      }
      const connection = navigator2.connection;
      if (connection) {
        if (connection.effectiveType) {
          transaction.setTag(
            "effectiveConnectionType",
            connection.effectiveType,
          );
        }
        if (connection.type) {
          transaction.setTag("connectionType", connection.type);
        }
        if (utils$1.isMeasurementValue(connection.rtt)) {
          _measurements["connection.rtt"] = {
            value: connection.rtt,
            unit: "millisecond",
          };
        }
      }
      if (utils$1.isMeasurementValue(navigator2.deviceMemory)) {
        transaction.setTag("deviceMemory", `${navigator2.deviceMemory} GB`);
      }
      if (utils$1.isMeasurementValue(navigator2.hardwareConcurrency)) {
        transaction.setTag(
          "hardwareConcurrency",
          String(navigator2.hardwareConcurrency),
        );
      }
    }
    function _tagMetricInfo(transaction) {
      if (_lcpEntry) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log("[Measurements] Adding LCP Data");
        if (_lcpEntry.element) {
          transaction.setTag(
            "lcp.element",
            utils.htmlTreeAsString(_lcpEntry.element),
          );
        }
        if (_lcpEntry.id) {
          transaction.setTag("lcp.id", _lcpEntry.id);
        }
        if (_lcpEntry.url) {
          transaction.setTag("lcp.url", _lcpEntry.url.trim().slice(0, 200));
        }
        transaction.setTag("lcp.size", _lcpEntry.size);
      }
      if (_clsEntry && _clsEntry.sources) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log("[Measurements] Adding CLS Data");
        _clsEntry.sources.forEach((source, index) =>
          transaction.setTag(
            `cls.source.${index + 1}`,
            utils.htmlTreeAsString(source.node),
          ),
        );
      }
    }
    exports._addMeasureSpans = _addMeasureSpans;
    exports._addResourceSpans = _addResourceSpans;
    exports.addPerformanceEntries = addPerformanceEntries;
    exports.startTrackingInteractions = startTrackingInteractions;
    exports.startTrackingLongTasks = startTrackingLongTasks;
    exports.startTrackingWebVitals = startTrackingWebVitals;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/request.js
var require_request = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/request.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var DEFAULT_TRACE_PROPAGATION_TARGETS = ["localhost", /^\/(?!\/)/];
    var defaultRequestInstrumentationOptions = {
      traceFetch: true,
      traceXHR: true,
      tracingOrigins: DEFAULT_TRACE_PROPAGATION_TARGETS,
      tracePropagationTargets: DEFAULT_TRACE_PROPAGATION_TARGETS,
      _experiments: {},
    };
    function instrumentOutgoingRequests(_options) {
      const {
        traceFetch,
        traceXHR,
        tracePropagationTargets,
        tracingOrigins,
        shouldCreateSpanForRequest,
        _experiments,
      } = __spreadValues(
        {
          traceFetch: defaultRequestInstrumentationOptions.traceFetch,
          traceXHR: defaultRequestInstrumentationOptions.traceXHR,
        },
        _options,
      );
      const shouldCreateSpan =
        typeof shouldCreateSpanForRequest === "function"
          ? shouldCreateSpanForRequest
          : (_) => true;
      const shouldAttachHeadersWithTargets = (url) =>
        shouldAttachHeaders(url, tracePropagationTargets || tracingOrigins);
      const spans = {};
      if (traceFetch) {
        utils.addInstrumentationHandler("fetch", (handlerData) => {
          const createdSpan = fetchCallback(
            handlerData,
            shouldCreateSpan,
            shouldAttachHeadersWithTargets,
            spans,
          );
          if (
            _optionalChain([
              _experiments,
              "optionalAccess",
              (_2) => _2.enableHTTPTimings,
            ]) &&
            createdSpan
          ) {
            addHTTPTimings(createdSpan);
          }
        });
      }
      if (traceXHR) {
        utils.addInstrumentationHandler("xhr", (handlerData) => {
          const createdSpan = xhrCallback(
            handlerData,
            shouldCreateSpan,
            shouldAttachHeadersWithTargets,
            spans,
          );
          if (
            _optionalChain([
              _experiments,
              "optionalAccess",
              (_3) => _3.enableHTTPTimings,
            ]) &&
            createdSpan
          ) {
            addHTTPTimings(createdSpan);
          }
        });
      }
    }
    function addHTTPTimings(span) {
      const url = span.data.url;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (
            (entry.initiatorType === "fetch" ||
              entry.initiatorType === "xmlhttprequest") &&
            entry.name.endsWith(url)
          ) {
            const spanData = resourceTimingEntryToSpanData(entry);
            spanData.forEach((data) => span.setData(...data));
            observer.disconnect();
          }
        });
      });
      observer.observe({
        entryTypes: ["resource"],
      });
    }
    function resourceTimingEntryToSpanData(resourceTiming) {
      const version = resourceTiming.nextHopProtocol.split("/")[1] || "none";
      const timingSpanData = [];
      if (version) {
        timingSpanData.push(["network.protocol.version", version]);
      }
      if (!utils.browserPerformanceTimeOrigin) {
        return timingSpanData;
      }
      return [
        ...timingSpanData,
        [
          "http.request.connect_start",
          (utils.browserPerformanceTimeOrigin + resourceTiming.connectStart) /
            1e3,
        ],
        [
          "http.request.request_start",
          (utils.browserPerformanceTimeOrigin + resourceTiming.requestStart) /
            1e3,
        ],
        [
          "http.request.response_start",
          (utils.browserPerformanceTimeOrigin + resourceTiming.responseStart) /
            1e3,
        ],
      ];
    }
    function shouldAttachHeaders(url, tracePropagationTargets) {
      return utils.stringMatchesSomePattern(
        url,
        tracePropagationTargets || DEFAULT_TRACE_PROPAGATION_TARGETS,
      );
    }
    function fetchCallback(
      handlerData,
      shouldCreateSpan,
      shouldAttachHeaders2,
      spans,
    ) {
      if (!core.hasTracingEnabled() || !handlerData.fetchData) {
        return void 0;
      }
      const shouldCreateSpanResult = shouldCreateSpan(
        handlerData.fetchData.url,
      );
      if (handlerData.endTimestamp && shouldCreateSpanResult) {
        const spanId = handlerData.fetchData.__span;
        if (!spanId) return;
        const span2 = spans[spanId];
        if (span2) {
          if (handlerData.response) {
            span2.setHttpStatus(handlerData.response.status);
            const contentLength =
              handlerData.response &&
              handlerData.response.headers &&
              handlerData.response.headers.get("content-length");
            const contentLengthNum = parseInt(contentLength);
            if (contentLengthNum > 0) {
              span2.setData("http.response_content_length", contentLengthNum);
            }
          } else if (handlerData.error) {
            span2.setStatus("internal_error");
          }
          span2.finish();
          delete spans[spanId];
        }
        return void 0;
      }
      const hub = core.getCurrentHub();
      const scope = hub.getScope();
      const client = hub.getClient();
      const parentSpan = scope.getSpan();
      const { method, url } = handlerData.fetchData;
      const span =
        shouldCreateSpanResult && parentSpan
          ? parentSpan.startChild({
              data: {
                url,
                type: "fetch",
                "http.method": method,
              },
              description: `${method} ${url}`,
              op: "http.client",
            })
          : void 0;
      if (span) {
        handlerData.fetchData.__span = span.spanId;
        spans[span.spanId] = span;
      }
      if (shouldAttachHeaders2(handlerData.fetchData.url) && client) {
        const request = handlerData.args[0];
        handlerData.args[1] = handlerData.args[1] || {};
        const options = handlerData.args[1];
        options.headers = addTracingHeadersToFetchRequest(
          request,
          client,
          scope,
          options,
        );
      }
      return span;
    }
    function addTracingHeadersToFetchRequest(request, client, scope, options) {
      const span = scope.getSpan();
      const transaction = span && span.transaction;
      const { traceId, sampled, dsc } = scope.getPropagationContext();
      const sentryTraceHeader = span
        ? span.toTraceparent()
        : utils.generateSentryTraceHeader(traceId, void 0, sampled);
      const dynamicSamplingContext = transaction
        ? transaction.getDynamicSamplingContext()
        : dsc
        ? dsc
        : core.getDynamicSamplingContextFromClient(traceId, client, scope);
      const sentryBaggageHeader =
        utils.dynamicSamplingContextToSentryBaggageHeader(
          dynamicSamplingContext,
        );
      const headers2 =
        typeof Request !== "undefined" && utils.isInstanceOf(request, Request)
          ? request.headers
          : options.headers;
      if (!headers2) {
        return {
          "sentry-trace": sentryTraceHeader,
          baggage: sentryBaggageHeader,
        };
      } else if (
        typeof Headers !== "undefined" &&
        utils.isInstanceOf(headers2, Headers)
      ) {
        const newHeaders = new Headers(headers2);
        newHeaders.append("sentry-trace", sentryTraceHeader);
        if (sentryBaggageHeader) {
          newHeaders.append(utils.BAGGAGE_HEADER_NAME, sentryBaggageHeader);
        }
        return newHeaders;
      } else if (Array.isArray(headers2)) {
        const newHeaders = [...headers2, ["sentry-trace", sentryTraceHeader]];
        if (sentryBaggageHeader) {
          newHeaders.push([utils.BAGGAGE_HEADER_NAME, sentryBaggageHeader]);
        }
        return newHeaders;
      } else {
        const existingBaggageHeader =
          "baggage" in headers2 ? headers2.baggage : void 0;
        const newBaggageHeaders = [];
        if (Array.isArray(existingBaggageHeader)) {
          newBaggageHeaders.push(...existingBaggageHeader);
        } else if (existingBaggageHeader) {
          newBaggageHeaders.push(existingBaggageHeader);
        }
        if (sentryBaggageHeader) {
          newBaggageHeaders.push(sentryBaggageHeader);
        }
        return __spreadProps(__spreadValues({}, headers2), {
          "sentry-trace": sentryTraceHeader,
          baggage:
            newBaggageHeaders.length > 0 ? newBaggageHeaders.join(",") : void 0,
        });
      }
    }
    function xhrCallback(
      handlerData,
      shouldCreateSpan,
      shouldAttachHeaders2,
      spans,
    ) {
      const xhr = handlerData.xhr;
      const sentryXhrData = xhr && xhr[utils.SENTRY_XHR_DATA_KEY];
      if (
        !core.hasTracingEnabled() ||
        (xhr && xhr.__sentry_own_request__) ||
        !xhr ||
        !sentryXhrData
      ) {
        return void 0;
      }
      const shouldCreateSpanResult = shouldCreateSpan(sentryXhrData.url);
      if (handlerData.endTimestamp && shouldCreateSpanResult) {
        const spanId = xhr.__sentry_xhr_span_id__;
        if (!spanId) return;
        const span2 = spans[spanId];
        if (span2) {
          span2.setHttpStatus(sentryXhrData.status_code);
          span2.finish();
          delete spans[spanId];
        }
        return void 0;
      }
      const hub = core.getCurrentHub();
      const scope = hub.getScope();
      const parentSpan = scope.getSpan();
      const span =
        shouldCreateSpanResult && parentSpan
          ? parentSpan.startChild({
              data: __spreadProps(__spreadValues({}, sentryXhrData.data), {
                type: "xhr",
                "http.method": sentryXhrData.method,
                url: sentryXhrData.url,
              }),
              description: `${sentryXhrData.method} ${sentryXhrData.url}`,
              op: "http.client",
            })
          : void 0;
      if (span) {
        xhr.__sentry_xhr_span_id__ = span.spanId;
        spans[xhr.__sentry_xhr_span_id__] = span;
      }
      if (xhr.setRequestHeader && shouldAttachHeaders2(sentryXhrData.url)) {
        if (span) {
          const transaction = span && span.transaction;
          const dynamicSamplingContext =
            transaction && transaction.getDynamicSamplingContext();
          const sentryBaggageHeader =
            utils.dynamicSamplingContextToSentryBaggageHeader(
              dynamicSamplingContext,
            );
          setHeaderOnXhr(xhr, span.toTraceparent(), sentryBaggageHeader);
        } else {
          const client = hub.getClient();
          const { traceId, sampled, dsc } = scope.getPropagationContext();
          const sentryTraceHeader = utils.generateSentryTraceHeader(
            traceId,
            void 0,
            sampled,
          );
          const dynamicSamplingContext =
            dsc ||
            (client
              ? core.getDynamicSamplingContextFromClient(traceId, client, scope)
              : void 0);
          const sentryBaggageHeader =
            utils.dynamicSamplingContextToSentryBaggageHeader(
              dynamicSamplingContext,
            );
          setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader);
        }
      }
      return span;
    }
    function setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader) {
      try {
        xhr.setRequestHeader("sentry-trace", sentryTraceHeader);
        if (sentryBaggageHeader) {
          xhr.setRequestHeader(utils.BAGGAGE_HEADER_NAME, sentryBaggageHeader);
        }
      } catch (_) {}
    }
    exports.DEFAULT_TRACE_PROPAGATION_TARGETS =
      DEFAULT_TRACE_PROPAGATION_TARGETS;
    exports.addTracingHeadersToFetchRequest = addTracingHeadersToFetchRequest;
    exports.defaultRequestInstrumentationOptions =
      defaultRequestInstrumentationOptions;
    exports.fetchCallback = fetchCallback;
    exports.instrumentOutgoingRequests = instrumentOutgoingRequests;
    exports.shouldAttachHeaders = shouldAttachHeaders;
    exports.xhrCallback = xhrCallback;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/router.js
var require_router = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/router.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var types = require_types();
    function instrumentRoutingWithDefaults(
      customStartTransaction,
      startTransactionOnPageLoad = true,
      startTransactionOnLocationChange = true,
    ) {
      if (!types.WINDOW || !types.WINDOW.location) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            "Could not initialize routing instrumentation due to invalid location",
          );
        return;
      }
      let startingUrl = types.WINDOW.location.href;
      let activeTransaction;
      if (startTransactionOnPageLoad) {
        activeTransaction = customStartTransaction({
          name: types.WINDOW.location.pathname,
          startTimestamp: utils.browserPerformanceTimeOrigin
            ? utils.browserPerformanceTimeOrigin / 1e3
            : void 0,
          op: "pageload",
          metadata: { source: "url" },
        });
      }
      if (startTransactionOnLocationChange) {
        utils.addInstrumentationHandler("history", ({ to, from }) => {
          if (
            from === void 0 &&
            startingUrl &&
            startingUrl.indexOf(to) !== -1
          ) {
            startingUrl = void 0;
            return;
          }
          if (from !== to) {
            startingUrl = void 0;
            if (activeTransaction) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                utils.logger.log(
                  `[Tracing] Finishing current transaction with op: ${activeTransaction.op}`,
                );
              activeTransaction.finish();
            }
            activeTransaction = customStartTransaction({
              name: types.WINDOW.location.pathname,
              op: "navigation",
              metadata: { source: "url" },
            });
          }
        });
      }
    }
    exports.instrumentRoutingWithDefaults = instrumentRoutingWithDefaults;
  },
});

// node_modules/@sentry-internal/tracing/cjs/browser/browsertracing.js
var require_browsertracing = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/browser/browsertracing.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var backgroundtab = require_backgroundtab();
    var index = require_metrics();
    var request = require_request();
    var router = require_router();
    var types = require_types();
    var BROWSER_TRACING_INTEGRATION_ID = "BrowserTracing";
    var DEFAULT_BROWSER_TRACING_OPTIONS = __spreadValues(
      __spreadProps(__spreadValues({}, core.TRACING_DEFAULTS), {
        markBackgroundTransactions: true,
        routingInstrumentation: router.instrumentRoutingWithDefaults,
        startTransactionOnLocationChange: true,
        startTransactionOnPageLoad: true,
        enableLongTask: true,
      }),
      request.defaultRequestInstrumentationOptions,
    );
    var BrowserTracing = class {
      __init() {
        this.name = BROWSER_TRACING_INTEGRATION_ID;
      }
      __init2() {
        this._hasSetTracePropagationTargets = false;
      }
      constructor(_options) {
        BrowserTracing.prototype.__init.call(this);
        BrowserTracing.prototype.__init2.call(this);
        core.addTracingExtensions();
        if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
          this._hasSetTracePropagationTargets = !!(
            _options &&
            (_options.tracePropagationTargets || _options.tracingOrigins)
          );
        }
        this.options = __spreadValues(
          __spreadValues({}, DEFAULT_BROWSER_TRACING_OPTIONS),
          _options,
        );
        if (this.options._experiments.enableLongTask !== void 0) {
          this.options.enableLongTask =
            this.options._experiments.enableLongTask;
        }
        if (
          _options &&
          !_options.tracePropagationTargets &&
          _options.tracingOrigins
        ) {
          this.options.tracePropagationTargets = _options.tracingOrigins;
        }
        this._collectWebVitals = index.startTrackingWebVitals();
        if (this.options.enableLongTask) {
          index.startTrackingLongTasks();
        }
        if (this.options._experiments.enableInteractions) {
          index.startTrackingInteractions();
        }
      }
      setupOnce(_, getCurrentHub) {
        this._getCurrentHub = getCurrentHub;
        const hub = getCurrentHub();
        const client = hub.getClient();
        const clientOptions = client && client.getOptions();
        const {
          routingInstrumentation: instrumentRouting,
          startTransactionOnLocationChange,
          startTransactionOnPageLoad,
          markBackgroundTransactions,
          traceFetch,
          traceXHR,
          shouldCreateSpanForRequest,
          _experiments,
        } = this.options;
        const clientOptionsTracePropagationTargets =
          clientOptions && clientOptions.tracePropagationTargets;
        const tracePropagationTargets =
          clientOptionsTracePropagationTargets ||
          this.options.tracePropagationTargets;
        if (
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          this._hasSetTracePropagationTargets &&
          clientOptionsTracePropagationTargets
        ) {
          utils.logger.warn(
            "[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used.",
          );
        }
        instrumentRouting(
          (context) => {
            const transaction = this._createRouteTransaction(context);
            this.options._experiments.onStartRouteTransaction &&
              this.options._experiments.onStartRouteTransaction(
                transaction,
                context,
                getCurrentHub,
              );
            return transaction;
          },
          startTransactionOnPageLoad,
          startTransactionOnLocationChange,
        );
        if (markBackgroundTransactions) {
          backgroundtab.registerBackgroundTabDetection();
        }
        if (_experiments.enableInteractions) {
          this._registerInteractionListener();
        }
        request.instrumentOutgoingRequests({
          traceFetch,
          traceXHR,
          tracePropagationTargets,
          shouldCreateSpanForRequest,
          _experiments: {
            enableHTTPTimings: _experiments.enableHTTPTimings,
          },
        });
      }
      _createRouteTransaction(context) {
        if (!this._getCurrentHub) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              `[Tracing] Did not create ${context.op} transaction because _getCurrentHub is invalid.`,
            );
          return void 0;
        }
        const hub = this._getCurrentHub();
        const { beforeNavigate, idleTimeout, finalTimeout, heartbeatInterval } =
          this.options;
        const isPageloadTransaction = context.op === "pageload";
        const sentryTrace = isPageloadTransaction
          ? getMetaContent("sentry-trace")
          : "";
        const baggage = isPageloadTransaction ? getMetaContent("baggage") : "";
        const { traceparentData, dynamicSamplingContext, propagationContext } =
          utils.tracingContextFromHeaders(sentryTrace, baggage);
        const expandedContext = __spreadProps(
          __spreadValues(__spreadValues({}, context), traceparentData),
          {
            metadata: __spreadProps(__spreadValues({}, context.metadata), {
              dynamicSamplingContext:
                traceparentData && !dynamicSamplingContext
                  ? {}
                  : dynamicSamplingContext,
            }),
            trimEnd: true,
          },
        );
        const modifiedContext =
          typeof beforeNavigate === "function"
            ? beforeNavigate(expandedContext)
            : expandedContext;
        const finalContext =
          modifiedContext === void 0
            ? __spreadProps(__spreadValues({}, expandedContext), {
                sampled: false,
              })
            : modifiedContext;
        finalContext.metadata =
          finalContext.name !== expandedContext.name
            ? __spreadProps(__spreadValues({}, finalContext.metadata), {
                source: "custom",
              })
            : finalContext.metadata;
        this._latestRouteName = finalContext.name;
        this._latestRouteSource =
          finalContext.metadata && finalContext.metadata.source;
        if (finalContext.sampled === false) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              `[Tracing] Will not send ${finalContext.op} transaction because of beforeNavigate.`,
            );
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.log(
            `[Tracing] Starting ${finalContext.op} transaction on scope`,
          );
        const { location } = types.WINDOW;
        const idleTransaction = core.startIdleTransaction(
          hub,
          finalContext,
          idleTimeout,
          finalTimeout,
          true,
          { location },
          heartbeatInterval,
        );
        const scope = hub.getScope();
        if (isPageloadTransaction && traceparentData) {
          scope.setPropagationContext(propagationContext);
        } else {
          scope.setPropagationContext({
            traceId: idleTransaction.traceId,
            spanId: idleTransaction.spanId,
            parentSpanId: idleTransaction.parentSpanId,
            sampled: !!idleTransaction.sampled,
          });
        }
        idleTransaction.registerBeforeFinishCallback((transaction) => {
          this._collectWebVitals();
          index.addPerformanceEntries(transaction);
        });
        return idleTransaction;
      }
      _registerInteractionListener() {
        let inflightInteractionTransaction;
        const registerInteractionTransaction = () => {
          const { idleTimeout, finalTimeout, heartbeatInterval } = this.options;
          const op = "ui.action.click";
          const currentTransaction = core.getActiveTransaction();
          if (
            currentTransaction &&
            currentTransaction.op &&
            ["navigation", "pageload"].includes(currentTransaction.op)
          ) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.warn(
                `[Tracing] Did not create ${op} transaction because a pageload or navigation transaction is in progress.`,
              );
            return void 0;
          }
          if (inflightInteractionTransaction) {
            inflightInteractionTransaction.setFinishReason(
              "interactionInterrupted",
            );
            inflightInteractionTransaction.finish();
            inflightInteractionTransaction = void 0;
          }
          if (!this._getCurrentHub) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.warn(
                `[Tracing] Did not create ${op} transaction because _getCurrentHub is invalid.`,
              );
            return void 0;
          }
          if (!this._latestRouteName) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.warn(
                `[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`,
              );
            return void 0;
          }
          const hub = this._getCurrentHub();
          const { location } = types.WINDOW;
          const context = {
            name: this._latestRouteName,
            op,
            trimEnd: true,
            metadata: {
              source: this._latestRouteSource || "url",
            },
          };
          inflightInteractionTransaction = core.startIdleTransaction(
            hub,
            context,
            idleTimeout,
            finalTimeout,
            true,
            { location },
            heartbeatInterval,
          );
        };
        ["click"].forEach((type) => {
          addEventListener(type, registerInteractionTransaction, {
            once: false,
            capture: true,
          });
        });
      }
    };
    function getMetaContent(metaName) {
      const metaTag = utils.getDomElement(`meta[name=${metaName}]`);
      return metaTag ? metaTag.getAttribute("content") : void 0;
    }
    exports.BROWSER_TRACING_INTEGRATION_ID = BROWSER_TRACING_INTEGRATION_ID;
    exports.BrowserTracing = BrowserTracing;
    exports.getMetaContent = getMetaContent;
  },
});

// node_modules/@sentry-internal/tracing/cjs/extensions.js
var require_extensions = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/extensions.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    function _autoloadDatabaseIntegrations() {
      const carrier = core.getMainCarrier();
      if (!carrier.__SENTRY__) {
        return;
      }
      const packageToIntegrationMapping = {
        mongodb() {
          const integration = utils.dynamicRequire(
            module2,
            "./node/integrations/mongo",
          );
          return new integration.Mongo();
        },
        mongoose() {
          const integration = utils.dynamicRequire(
            module2,
            "./node/integrations/mongo",
          );
          return new integration.Mongo();
        },
        mysql() {
          const integration = utils.dynamicRequire(
            module2,
            "./node/integrations/mysql",
          );
          return new integration.Mysql();
        },
        pg() {
          const integration = utils.dynamicRequire(
            module2,
            "./node/integrations/postgres",
          );
          return new integration.Postgres();
        },
      };
      const mappedPackages = Object.keys(packageToIntegrationMapping)
        .filter((moduleName) => !!utils.loadModule(moduleName))
        .map((pkg) => {
          try {
            return packageToIntegrationMapping[pkg]();
          } catch (e) {
            return void 0;
          }
        })
        .filter((p) => p);
      if (mappedPackages.length > 0) {
        carrier.__SENTRY__.integrations = [
          ...(carrier.__SENTRY__.integrations || []),
          ...mappedPackages,
        ];
      }
    }
    function addExtensionMethods() {
      core.addTracingExtensions();
      if (utils.isNodeEnv()) {
        _autoloadDatabaseIntegrations();
      }
    }
    exports.addExtensionMethods = addExtensionMethods;
  },
});

// node_modules/@sentry-internal/tracing/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@sentry-internal/tracing/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var express = require_express();
    var postgres = require_postgres();
    var mysql = require_mysql();
    var mongo = require_mongo();
    var prisma = require_prisma();
    var graphql = require_graphql();
    var apollo = require_apollo();
    var lazy = require_lazy();
    var browsertracing = require_browsertracing();
    var request = require_request();
    var extensions = require_extensions();
    exports.IdleTransaction = core.IdleTransaction;
    exports.Span = core.Span;
    exports.SpanStatus = core.SpanStatus;
    exports.Transaction = core.Transaction;
    exports.extractTraceparentData = core.extractTraceparentData;
    exports.getActiveTransaction = core.getActiveTransaction;
    exports.hasTracingEnabled = core.hasTracingEnabled;
    exports.spanStatusfromHttpCode = core.spanStatusfromHttpCode;
    exports.startIdleTransaction = core.startIdleTransaction;
    exports.TRACEPARENT_REGEXP = utils.TRACEPARENT_REGEXP;
    exports.stripUrlQueryAndFragment = utils.stripUrlQueryAndFragment;
    exports.Express = express.Express;
    exports.Postgres = postgres.Postgres;
    exports.Mysql = mysql.Mysql;
    exports.Mongo = mongo.Mongo;
    exports.Prisma = prisma.Prisma;
    exports.GraphQL = graphql.GraphQL;
    exports.Apollo = apollo.Apollo;
    exports.lazyLoadedNodePerformanceMonitoringIntegrations =
      lazy.lazyLoadedNodePerformanceMonitoringIntegrations;
    exports.BROWSER_TRACING_INTEGRATION_ID =
      browsertracing.BROWSER_TRACING_INTEGRATION_ID;
    exports.BrowserTracing = browsertracing.BrowserTracing;
    exports.addTracingHeadersToFetchRequest =
      request.addTracingHeadersToFetchRequest;
    exports.defaultRequestInstrumentationOptions =
      request.defaultRequestInstrumentationOptions;
    exports.instrumentOutgoingRequests = request.instrumentOutgoingRequests;
    exports.addExtensionMethods = extensions.addExtensionMethods;
  },
});

// node_modules/@sentry/node/cjs/tracing/index.js
var require_tracing2 = __commonJS({
  "node_modules/@sentry/node/cjs/tracing/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tracing = require_cjs3();
    var utils = require_cjs();
    function autoDiscoverNodePerformanceMonitoringIntegrations() {
      const loadedIntegrations =
        tracing.lazyLoadedNodePerformanceMonitoringIntegrations
          .map((tryLoad) => {
            try {
              return tryLoad();
            } catch (_) {
              return void 0;
            }
          })
          .filter((integration) => !!integration);
      if (loadedIntegrations.length === 0) {
        utils.logger.warn(
          "Performance monitoring integrations could not be automatically loaded.",
        );
      }
      return loadedIntegrations.filter(
        (integration) => !!integration.loadDependency(),
      );
    }
    exports.autoDiscoverNodePerformanceMonitoringIntegrations =
      autoDiscoverNodePerformanceMonitoringIntegrations;
  },
});

// node_modules/@sentry/node/cjs/eventbuilder.js
var require_eventbuilder = __commonJS({
  "node_modules/@sentry/node/cjs/eventbuilder.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    function parseStackFrames(stackParser, error) {
      return stackParser(error.stack || "", 1);
    }
    function exceptionFromError(stackParser, error) {
      const exception = {
        type: error.name || error.constructor.name,
        value: error.message,
      };
      const frames = parseStackFrames(stackParser, error);
      if (frames.length) {
        exception.stacktrace = { frames };
      }
      return exception;
    }
    function eventFromUnknownInput(stackParser, exception, hint) {
      let ex = exception;
      const providedMechanism = hint && hint.data && hint.data.mechanism;
      const mechanism = providedMechanism || {
        handled: true,
        type: "generic",
      };
      if (!utils.isError(exception)) {
        if (utils.isPlainObject(exception)) {
          const message = `Non-Error exception captured with keys: ${utils.extractExceptionKeysForMessage(
            exception,
          )}`;
          const hub = core.getCurrentHub();
          const client = hub.getClient();
          const normalizeDepth = client && client.getOptions().normalizeDepth;
          hub.configureScope((scope) => {
            scope.setExtra(
              "__serialized__",
              utils.normalizeToSize(exception, normalizeDepth),
            );
          });
          ex = (hint && hint.syntheticException) || new Error(message);
          ex.message = message;
        } else {
          ex = (hint && hint.syntheticException) || new Error(exception);
          ex.message = exception;
        }
        mechanism.synthetic = true;
      }
      const event = {
        exception: {
          values: [exceptionFromError(stackParser, ex)],
        },
      };
      utils.addExceptionTypeValue(event, void 0, void 0);
      utils.addExceptionMechanism(event, mechanism);
      return __spreadProps(__spreadValues({}, event), {
        event_id: hint && hint.event_id,
      });
    }
    function eventFromMessage(
      stackParser,
      message,
      level = "info",
      hint,
      attachStacktrace,
    ) {
      const event = {
        event_id: hint && hint.event_id,
        level,
        message,
      };
      if (attachStacktrace && hint && hint.syntheticException) {
        const frames = parseStackFrames(stackParser, hint.syntheticException);
        if (frames.length) {
          event.exception = {
            values: [
              {
                value: message,
                stacktrace: { frames },
              },
            ],
          };
        }
      }
      return event;
    }
    exports.eventFromMessage = eventFromMessage;
    exports.eventFromUnknownInput = eventFromUnknownInput;
    exports.exceptionFromError = exceptionFromError;
    exports.parseStackFrames = parseStackFrames;
  },
});

// node_modules/@sentry/node/cjs/client.js
var require_client = __commonJS({
  "node_modules/@sentry/node/cjs/client.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var os = require("os");
    var util = require("util");
    var eventbuilder = require_eventbuilder();
    var NodeClient = class extends core.BaseClient {
      constructor(options) {
        options._metadata = options._metadata || {};
        options._metadata.sdk = options._metadata.sdk || {
          name: "sentry.javascript.node",
          packages: [
            {
              name: "npm:@sentry/node",
              version: core.SDK_VERSION,
            },
          ],
          version: core.SDK_VERSION,
        };
        options.transportOptions = __spreadValues(
          {
            textEncoder: new util.TextEncoder(),
          },
          options.transportOptions,
        );
        core.addTracingExtensions();
        super(options);
      }
      captureException(exception, hint, scope) {
        if (
          this._options.autoSessionTracking &&
          this._sessionFlusher &&
          scope
        ) {
          const requestSession = scope.getRequestSession();
          if (requestSession && requestSession.status === "ok") {
            requestSession.status = "errored";
          }
        }
        return super.captureException(exception, hint, scope);
      }
      captureEvent(event, hint, scope) {
        if (
          this._options.autoSessionTracking &&
          this._sessionFlusher &&
          scope
        ) {
          const eventType = event.type || "exception";
          const isException =
            eventType === "exception" &&
            event.exception &&
            event.exception.values &&
            event.exception.values.length > 0;
          if (isException) {
            const requestSession = scope.getRequestSession();
            if (requestSession && requestSession.status === "ok") {
              requestSession.status = "errored";
            }
          }
        }
        return super.captureEvent(event, hint, scope);
      }
      close(timeout) {
        _optionalChain([
          this,
          "access",
          (_) => _._sessionFlusher,
          "optionalAccess",
          (_2) => _2.close,
          "call",
          (_3) => _3(),
        ]);
        return super.close(timeout);
      }
      initSessionFlusher() {
        const { release, environment } = this._options;
        if (!release) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              "Cannot initialise an instance of SessionFlusher if no release is provided!",
            );
        } else {
          this._sessionFlusher = new core.SessionFlusher(this, {
            release,
            environment,
          });
        }
      }
      eventFromException(exception, hint) {
        return utils.resolvedSyncPromise(
          eventbuilder.eventFromUnknownInput(
            this._options.stackParser,
            exception,
            hint,
          ),
        );
      }
      eventFromMessage(message, level = "info", hint) {
        return utils.resolvedSyncPromise(
          eventbuilder.eventFromMessage(
            this._options.stackParser,
            message,
            level,
            hint,
            this._options.attachStacktrace,
          ),
        );
      }
      captureCheckIn(checkIn, monitorConfig, scope) {
        const id =
          checkIn.status !== "in_progress" && checkIn.checkInId
            ? checkIn.checkInId
            : utils.uuid4();
        if (!this._isEnabled()) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn("SDK not enabled, will not capture checkin.");
          return id;
        }
        const options = this.getOptions();
        const { release, environment, tunnel } = options;
        const serializedCheckIn = {
          check_in_id: id,
          monitor_slug: checkIn.monitorSlug,
          status: checkIn.status,
          release,
          environment,
        };
        if (checkIn.status !== "in_progress") {
          serializedCheckIn.duration = checkIn.duration;
        }
        if (monitorConfig) {
          serializedCheckIn.monitor_config = {
            schedule: monitorConfig.schedule,
            checkin_margin: monitorConfig.checkinMargin,
            max_runtime: monitorConfig.maxRuntime,
            timezone: monitorConfig.timezone,
          };
        }
        const [dynamicSamplingContext, traceContext] =
          this._getTraceInfoFromScope(scope);
        if (traceContext) {
          serializedCheckIn.contexts = {
            trace: traceContext,
          };
        }
        const envelope = core.createCheckInEnvelope(
          serializedCheckIn,
          dynamicSamplingContext,
          this.getSdkMetadata(),
          tunnel,
          this.getDsn(),
        );
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.info(
            "Sending checkin:",
            checkIn.monitorSlug,
            checkIn.status,
          );
        void this._sendEnvelope(envelope);
        return id;
      }
      _prepareEvent(event, hint, scope) {
        event.platform = event.platform || "node";
        event.contexts = __spreadProps(__spreadValues({}, event.contexts), {
          runtime: _optionalChain([
            event,
            "access",
            (_4) => _4.contexts,
            "optionalAccess",
            (_5) => _5.runtime,
          ]) || {
            name: "node",
            version: global.process.version,
          },
        });
        event.server_name =
          event.server_name ||
          this.getOptions().serverName ||
          global.process.env.SENTRY_NAME ||
          os.hostname();
        return super._prepareEvent(event, hint, scope);
      }
      _captureRequestSession() {
        if (!this._sessionFlusher) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.warn(
              "Discarded request mode session because autoSessionTracking option was disabled",
            );
        } else {
          this._sessionFlusher.incrementSessionStatusCount();
        }
      }
      _getTraceInfoFromScope(scope) {
        if (!scope) {
          return [void 0, void 0];
        }
        const span = scope.getSpan();
        if (span) {
          return [
            _optionalChain([
              span,
              "optionalAccess",
              (_6) => _6.transaction,
              "optionalAccess",
              (_7) => _7.getDynamicSamplingContext,
              "call",
              (_8) => _8(),
            ]),
            _optionalChain([
              span,
              "optionalAccess",
              (_9) => _9.getTraceContext,
              "call",
              (_10) => _10(),
            ]),
          ];
        }
        const { traceId, spanId, parentSpanId, dsc } =
          scope.getPropagationContext();
        const traceContext = {
          trace_id: traceId,
          span_id: spanId,
          parent_span_id: parentSpanId,
        };
        if (dsc) {
          return [dsc, traceContext];
        }
        return [
          core.getDynamicSamplingContextFromClient(traceId, this, scope),
          traceContext,
        ];
      }
    };
    exports.NodeClient = NodeClient;
  },
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function (val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" +
          JSON.stringify(val),
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str,
        );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  },
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          },
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(
          this.namespace +
            (typeof delimiter === "undefined" ? ":" : delimiter) +
            namespace,
        );
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(
          /[\s,]+/,
        );
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips
            .map(toNamespace)
            .map((namespace) => "-" + namespace),
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp
          .toString()
          .substring(2, regexp.toString().length - 2)
          .replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn(
          "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
        );
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  },
});

// node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
          );
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ];
    function useColors() {
      if (
        typeof window !== "undefined" &&
        window.process &&
        (window.process.type === "renderer" || window.process.__nwjs)
      ) {
        return true;
      }
      if (
        typeof navigator !== "undefined" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ) {
        return false;
      }
      return (
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window !== "undefined" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }
    function formatArgs(args) {
      args[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        args[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {});
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {}
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {}
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {}
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  },
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  },
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (
      hasFlag("color") ||
      hasFlag("colors") ||
      hasFlag("color=true") ||
      hasFlag("color=always")
    ) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor =
        env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3,
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (
        hasFlag("color=16m") ||
        hasFlag("color=full") ||
        hasFlag("color=truecolor")
      ) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (
          Number(process.versions.node.split(".")[0]) >= 8 &&
          Number(osRelease[0]) >= 10 &&
          Number(osRelease[2]) >= 10586
        ) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (
          ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(
            (sign) => sign in env,
          ) ||
          env.CI_NAME === "codeship"
        ) {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION)
          ? 1
          : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt(
          (env.TERM_PROGRAM_VERSION || "").split(".")[0],
          10,
        );
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (
        /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          env.TERM,
        )
      ) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr),
    };
  },
});

// node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init2;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {},
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62,
          63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113,
          128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167,
          168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199,
          200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
        ];
      }
    } catch (error) {}
    exports.inspectOpts = Object.keys(process.env)
      .filter((key) => {
        return /^debug_/i.test(key);
      })
      .reduce((obj, key) => {
        const prop = key
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (_, k) => {
            return k.toUpperCase();
          });
        let val = process.env[key];
        if (/^(yes|on|true|enabled)$/i.test(val)) {
          val = true;
        } else if (/^(no|off|false|disabled)$/i.test(val)) {
          val = false;
        } else if (val === "null") {
          val = null;
        } else {
          val = Number(val);
        }
        obj[prop] = val;
        return obj;
      }, {});
    function useColors() {
      return "colors" in exports.inspectOpts
        ? Boolean(exports.inspectOpts.colors)
        : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(
          colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m",
        );
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init2(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util
        .inspect(v, this.inspectOpts)
        .split("\n")
        .map((str) => str.trim())
        .join(" ");
    };
    formatters.O = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  },
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (
      typeof process === "undefined" ||
      process.type === "renderer" ||
      process.browser === true ||
      process.__nwjs
    ) {
      module2.exports = require_browser2();
    } else {
      module2.exports = require_node2();
    }
  },
});

// node_modules/agent-base/dist/src/promisify.js
var require_promisify = __commonJS({
  "node_modules/agent-base/dist/src/promisify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function promisify(fn) {
      return function (req, opts) {
        return new Promise((resolve, reject) => {
          fn.call(this, req, opts, (err, rtn) => {
            if (err) {
              reject(err);
            } else {
              resolve(rtn);
            }
          });
        });
      };
    }
    exports.default = promisify;
  },
});

// node_modules/agent-base/dist/src/index.js
var require_src2 = __commonJS({
  "node_modules/agent-base/dist/src/index.js"(exports, module2) {
    "use strict";
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    var events_1 = require("events");
    var debug_1 = __importDefault(require_src());
    var promisify_1 = __importDefault(require_promisify());
    var debug = debug_1.default("agent-base");
    function isAgent(v) {
      return Boolean(v) && typeof v.addRequest === "function";
    }
    function isSecureEndpoint() {
      const { stack } = new Error();
      if (typeof stack !== "string") return false;
      return stack
        .split("\n")
        .some(
          (l) =>
            l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1,
        );
    }
    function createAgent(callback, opts) {
      return new createAgent.Agent(callback, opts);
    }
    (function (createAgent2) {
      class Agent3 extends events_1.EventEmitter {
        constructor(callback, _opts) {
          super();
          let opts = _opts;
          if (typeof callback === "function") {
            this.callback = callback;
          } else if (callback) {
            opts = callback;
          }
          this.timeout = null;
          if (opts && typeof opts.timeout === "number") {
            this.timeout = opts.timeout;
          }
          this.maxFreeSockets = 1;
          this.maxSockets = 1;
          this.maxTotalSockets = Infinity;
          this.sockets = {};
          this.freeSockets = {};
          this.requests = {};
          this.options = {};
        }
        get defaultPort() {
          if (typeof this.explicitDefaultPort === "number") {
            return this.explicitDefaultPort;
          }
          return isSecureEndpoint() ? 443 : 80;
        }
        set defaultPort(v) {
          this.explicitDefaultPort = v;
        }
        get protocol() {
          if (typeof this.explicitProtocol === "string") {
            return this.explicitProtocol;
          }
          return isSecureEndpoint() ? "https:" : "http:";
        }
        set protocol(v) {
          this.explicitProtocol = v;
        }
        callback(req, opts, fn) {
          throw new Error(
            '"agent-base" has no default implementation, you must subclass and override `callback()`',
          );
        }
        addRequest(req, _opts) {
          const opts = Object.assign({}, _opts);
          if (typeof opts.secureEndpoint !== "boolean") {
            opts.secureEndpoint = isSecureEndpoint();
          }
          if (opts.host == null) {
            opts.host = "localhost";
          }
          if (opts.port == null) {
            opts.port = opts.secureEndpoint ? 443 : 80;
          }
          if (opts.protocol == null) {
            opts.protocol = opts.secureEndpoint ? "https:" : "http:";
          }
          if (opts.host && opts.path) {
            delete opts.path;
          }
          delete opts.agent;
          delete opts.hostname;
          delete opts._defaultAgent;
          delete opts.defaultPort;
          delete opts.createConnection;
          req._last = true;
          req.shouldKeepAlive = false;
          let timedOut = false;
          let timeoutId = null;
          const timeoutMs = opts.timeout || this.timeout;
          const onerror = (err) => {
            if (req._hadError) return;
            req.emit("error", err);
            req._hadError = true;
          };
          const ontimeout = () => {
            timeoutId = null;
            timedOut = true;
            const err = new Error(
              `A "socket" was not created for HTTP request before ${timeoutMs}ms`,
            );
            err.code = "ETIMEOUT";
            onerror(err);
          };
          const callbackError = (err) => {
            if (timedOut) return;
            if (timeoutId !== null) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            onerror(err);
          };
          const onsocket = (socket) => {
            if (timedOut) return;
            if (timeoutId != null) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            if (isAgent(socket)) {
              debug(
                "Callback returned another Agent instance %o",
                socket.constructor.name,
              );
              socket.addRequest(req, opts);
              return;
            }
            if (socket) {
              socket.once("free", () => {
                this.freeSocket(socket, opts);
              });
              req.onSocket(socket);
              return;
            }
            const err = new Error(
              `no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``,
            );
            onerror(err);
          };
          if (typeof this.callback !== "function") {
            onerror(new Error("`callback` is not defined"));
            return;
          }
          if (!this.promisifiedCallback) {
            if (this.callback.length >= 3) {
              debug("Converting legacy callback function to promise");
              this.promisifiedCallback = promisify_1.default(this.callback);
            } else {
              this.promisifiedCallback = this.callback;
            }
          }
          if (typeof timeoutMs === "number" && timeoutMs > 0) {
            timeoutId = setTimeout(ontimeout, timeoutMs);
          }
          if ("port" in opts && typeof opts.port !== "number") {
            opts.port = Number(opts.port);
          }
          try {
            debug(
              "Resolving socket for %o request: %o",
              opts.protocol,
              `${req.method} ${req.path}`,
            );
            Promise.resolve(this.promisifiedCallback(req, opts)).then(
              onsocket,
              callbackError,
            );
          } catch (err) {
            Promise.reject(err).catch(callbackError);
          }
        }
        freeSocket(socket, opts) {
          debug("Freeing socket %o %o", socket.constructor.name, opts);
          socket.destroy();
        }
        destroy() {
          debug("Destroying agent %o", this.constructor.name);
        }
      }
      createAgent2.Agent = Agent3;
      createAgent2.prototype = createAgent2.Agent.prototype;
    })(createAgent || (createAgent = {}));
    module2.exports = createAgent;
  },
});

// node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = __importDefault(require_src());
    var debug = debug_1.default("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read() {
          const b = socket.read();
          if (b) ondata(b);
          else socket.once("readable", read);
        }
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("close", onclose);
          socket.removeListener("readable", read);
        }
        function onclose(err) {
          debug("onclose had error %o", err);
        }
        function onend() {
          debug("onend");
        }
        function onerror(err) {
          cleanup();
          debug("onerror %o", err);
          reject(err);
        }
        function ondata(b) {
          buffers.push(b);
          buffersLength += b.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug("have not received end of HTTP headers yet...");
            read();
            return;
          }
          const firstLine = buffered.toString(
            "ascii",
            0,
            buffered.indexOf("\r\n"),
          );
          const statusCode2 = +firstLine.split(" ")[1];
          debug("got proxy server response: %o", firstLine);
          resolve({
            statusCode: statusCode2,
            buffered,
          });
        }
        socket.on("error", onerror);
        socket.on("close", onclose);
        socket.on("end", onend);
        read();
      });
    }
    exports.default = parseProxyResponse;
  },
});

// node_modules/https-proxy-agent/dist/agent.js
var require_agent = __commonJS({
  "node_modules/https-proxy-agent/dist/agent.js"(exports) {
    "use strict";
    var __awaiter =
      (exports && exports.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __importDefault(require("net"));
    var tls_1 = __importDefault(require("tls"));
    var url_1 = __importDefault(require("url"));
    var assert_1 = __importDefault(require("assert"));
    var debug_1 = __importDefault(require_src());
    var agent_base_1 = require_src2();
    var parse_proxy_response_1 = __importDefault(
      require_parse_proxy_response(),
    );
    var debug = debug_1.default("https-proxy-agent:agent");
    var HttpsProxyAgent = class extends agent_base_1.Agent {
      constructor(_opts) {
        let opts;
        if (typeof _opts === "string") {
          opts = url_1.default.parse(_opts);
        } else {
          opts = _opts;
        }
        if (!opts) {
          throw new Error(
            "an HTTP(S) proxy server `host` and `port` must be specified!",
          );
        }
        debug("creating new HttpsProxyAgent instance: %o", opts);
        super(opts);
        const proxy = Object.assign({}, opts);
        this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
        proxy.host = proxy.hostname || proxy.host;
        if (typeof proxy.port === "string") {
          proxy.port = parseInt(proxy.port, 10);
        }
        if (!proxy.port && proxy.host) {
          proxy.port = this.secureProxy ? 443 : 80;
        }
        if (this.secureProxy && !("ALPNProtocols" in proxy)) {
          proxy.ALPNProtocols = ["http 1.1"];
        }
        if (proxy.host && proxy.path) {
          delete proxy.path;
          delete proxy.pathname;
        }
        this.proxy = proxy;
      }
      callback(req, opts) {
        return __awaiter(this, void 0, void 0, function* () {
          const { proxy, secureProxy } = this;
          let socket;
          if (secureProxy) {
            debug("Creating `tls.Socket`: %o", proxy);
            socket = tls_1.default.connect(proxy);
          } else {
            debug("Creating `net.Socket`: %o", proxy);
            socket = net_1.default.connect(proxy);
          }
          const headers2 = Object.assign({}, proxy.headers);
          const hostname = `${opts.host}:${opts.port}`;
          let payload = `CONNECT ${hostname} HTTP/1.1\r
`;
          if (proxy.auth) {
            headers2["Proxy-Authorization"] = `Basic ${Buffer.from(
              proxy.auth,
            ).toString("base64")}`;
          }
          let { host, port, secureEndpoint } = opts;
          if (!isDefaultPort(port, secureEndpoint)) {
            host += `:${port}`;
          }
          headers2.Host = host;
          headers2.Connection = "close";
          for (const name of Object.keys(headers2)) {
            payload += `${name}: ${headers2[name]}\r
`;
          }
          const proxyResponsePromise = parse_proxy_response_1.default(socket);
          socket.write(`${payload}\r
`);
          const { statusCode: statusCode2, buffered } =
            yield proxyResponsePromise;
          if (statusCode2 === 200) {
            req.once("socket", resume);
            if (opts.secureEndpoint) {
              const servername = opts.servername || opts.host;
              if (!servername) {
                throw new Error('Could not determine "servername"');
              }
              debug("Upgrading socket connection to TLS");
              return tls_1.default.connect(
                Object.assign(
                  Object.assign(
                    {},
                    omit(opts, "host", "hostname", "path", "port"),
                  ),
                  {
                    socket,
                    servername,
                  },
                ),
              );
            }
            return socket;
          }
          socket.destroy();
          const fakeSocket = new net_1.default.Socket();
          fakeSocket.readable = true;
          req.once("socket", (s) => {
            debug("replaying proxy buffer for failed request");
            assert_1.default(s.listenerCount("data") > 0);
            s.push(buffered);
            s.push(null);
          });
          return fakeSocket;
        });
      }
    };
    exports.default = HttpsProxyAgent;
    function resume(socket) {
      socket.resume();
    }
    function isDefaultPort(port, secure) {
      return Boolean((!secure && port === 80) || (secure && port === 443));
    }
    function isHTTPS(protocol) {
      return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
    }
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  },
});

// node_modules/https-proxy-agent/dist/index.js
var require_dist = __commonJS({
  "node_modules/https-proxy-agent/dist/index.js"(exports, module2) {
    "use strict";
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    var agent_1 = __importDefault(require_agent());
    function createHttpsProxyAgent(opts) {
      return new agent_1.default(opts);
    }
    (function (createHttpsProxyAgent2) {
      createHttpsProxyAgent2.HttpsProxyAgent = agent_1.default;
      createHttpsProxyAgent2.prototype = agent_1.default.prototype;
    })(createHttpsProxyAgent || (createHttpsProxyAgent = {}));
    module2.exports = createHttpsProxyAgent;
  },
});

// node_modules/@sentry/node/cjs/transports/http.js
var require_http = __commonJS({
  "node_modules/@sentry/node/cjs/transports/http.js"(exports) {
    var { _nullishCoalesce } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var http2 = require("http");
    var https2 = require("https");
    var httpsProxyAgent = require_dist();
    var stream = require("stream");
    var url = require("url");
    var zlib = require("zlib");
    var GZIP_THRESHOLD = 1024 * 32;
    function streamFromBody(body) {
      return new stream.Readable({
        read() {
          this.push(body);
          this.push(null);
        },
      });
    }
    function makeNodeTransport(options) {
      let urlSegments;
      try {
        urlSegments = new url.URL(options.url);
      } catch (e) {
        console.warn(
          "[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used.",
        );
        return core.createTransport(options, () => Promise.resolve({}));
      }
      const isHttps = urlSegments.protocol === "https:";
      const proxy = applyNoProxyOption(
        urlSegments,
        options.proxy ||
          (isHttps ? process.env.https_proxy : void 0) ||
          process.env.http_proxy,
      );
      const nativeHttpModule = isHttps ? https2 : http2;
      const keepAlive =
        options.keepAlive === void 0 ? false : options.keepAlive;
      const agent = proxy
        ? new httpsProxyAgent.HttpsProxyAgent(proxy)
        : new nativeHttpModule.Agent({
            keepAlive,
            maxSockets: 30,
            timeout: 2e3,
          });
      const requestExecutor = createRequestExecutor(
        options,
        _nullishCoalesce(options.httpModule, () => nativeHttpModule),
        agent,
      );
      return core.createTransport(options, requestExecutor);
    }
    function applyNoProxyOption(transportUrlSegments, proxy) {
      const { no_proxy } = process.env;
      const urlIsExemptFromProxy =
        no_proxy &&
        no_proxy
          .split(",")
          .some(
            (exemption) =>
              transportUrlSegments.host.endsWith(exemption) ||
              transportUrlSegments.hostname.endsWith(exemption),
          );
      if (urlIsExemptFromProxy) {
        return void 0;
      } else {
        return proxy;
      }
    }
    function createRequestExecutor(options, httpModule, agent) {
      const { hostname, pathname, port, protocol, search } = new url.URL(
        options.url,
      );
      return function makeRequest(request) {
        return new Promise((resolve, reject) => {
          let body = streamFromBody(request.body);
          const headers2 = __spreadValues({}, options.headers);
          if (request.body.length > GZIP_THRESHOLD) {
            headers2["content-encoding"] = "gzip";
            body = body.pipe(zlib.createGzip());
          }
          const req = httpModule.request(
            {
              method: "POST",
              agent,
              headers: headers2,
              hostname,
              path: `${pathname}${search}`,
              port,
              protocol,
              ca: options.caCerts,
            },
            (res) => {
              res.on("data", () => {});
              res.on("end", () => {});
              res.setEncoding("utf8");
              const retryAfterHeader = _nullishCoalesce(
                res.headers["retry-after"],
                () => null,
              );
              const rateLimitsHeader = _nullishCoalesce(
                res.headers["x-sentry-rate-limits"],
                () => null,
              );
              resolve({
                statusCode: res.statusCode,
                headers: {
                  "retry-after": retryAfterHeader,
                  "x-sentry-rate-limits": Array.isArray(rateLimitsHeader)
                    ? rateLimitsHeader[0]
                    : rateLimitsHeader,
                },
              });
            },
          );
          req.on("error", reject);
          body.pipe(req);
        });
      };
    }
    exports.makeNodeTransport = makeNodeTransport;
  },
});

// node_modules/@sentry/node/cjs/nodeVersion.js
var require_nodeVersion = __commonJS({
  "node_modules/@sentry/node/cjs/nodeVersion.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var NODE_VERSION = utils.parseSemver(process.versions.node);
    exports.NODE_VERSION = NODE_VERSION;
  },
});

// node_modules/@sentry/node/cjs/async/domain.js
var require_domain = __commonJS({
  "node_modules/@sentry/node/cjs/async/domain.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var domain2 = require("domain");
    function getActiveDomain() {
      return domain2.active;
    }
    function getCurrentHub() {
      const activeDomain = getActiveDomain();
      if (!activeDomain) {
        return void 0;
      }
      core.ensureHubOnCarrier(activeDomain);
      return core.getHubFromCarrier(activeDomain);
    }
    function createNewHub(parent) {
      const carrier = {};
      core.ensureHubOnCarrier(carrier, parent);
      return core.getHubFromCarrier(carrier);
    }
    function runWithAsyncContext(callback, options) {
      const activeDomain = getActiveDomain();
      if (
        activeDomain &&
        _optionalChain([options, "optionalAccess", (_) => _.reuseExisting])
      ) {
        return callback();
      }
      const local = domain2.create();
      const parentHub = activeDomain
        ? core.getHubFromCarrier(activeDomain)
        : void 0;
      const newHub = createNewHub(parentHub);
      core.setHubOnCarrier(local, newHub);
      return local.bind(() => {
        return callback();
      })();
    }
    function setDomainAsyncContextStrategy() {
      core.setAsyncContextStrategy({ getCurrentHub, runWithAsyncContext });
    }
    exports.setDomainAsyncContextStrategy = setDomainAsyncContextStrategy;
  },
});

// node_modules/@sentry/node/cjs/async/hooks.js
var require_hooks = __commonJS({
  "node_modules/@sentry/node/cjs/async/hooks.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var async_hooks = require("async_hooks");
    function setHooksAsyncContextStrategy() {
      const asyncStorage = new async_hooks.AsyncLocalStorage();
      function getCurrentHub() {
        return asyncStorage.getStore();
      }
      function createNewHub(parent) {
        const carrier = {};
        core.ensureHubOnCarrier(carrier, parent);
        return core.getHubFromCarrier(carrier);
      }
      function runWithAsyncContext(callback, options) {
        const existingHub = getCurrentHub();
        if (
          existingHub &&
          _optionalChain([options, "optionalAccess", (_) => _.reuseExisting])
        ) {
          return callback();
        }
        const newHub = createNewHub(existingHub);
        return asyncStorage.run(newHub, () => {
          return callback();
        });
      }
      core.setAsyncContextStrategy({ getCurrentHub, runWithAsyncContext });
    }
    exports.setHooksAsyncContextStrategy = setHooksAsyncContextStrategy;
  },
});

// node_modules/@sentry/node/cjs/async/index.js
var require_async = __commonJS({
  "node_modules/@sentry/node/cjs/async/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var nodeVersion = require_nodeVersion();
    var domain2 = require_domain();
    var hooks = require_hooks();
    function setNodeAsyncContextStrategy() {
      if (
        nodeVersion.NODE_VERSION.major &&
        nodeVersion.NODE_VERSION.major >= 14
      ) {
        hooks.setHooksAsyncContextStrategy();
      } else {
        domain2.setDomainAsyncContextStrategy();
      }
    }
    exports.setNodeAsyncContextStrategy = setNodeAsyncContextStrategy;
  },
});

// node_modules/@sentry/node/cjs/integrations/console.js
var require_console = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/console.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var util = require("util");
    var Console = class {
      constructor() {
        Console.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "Console";
      }
      __init() {
        this.name = Console.id;
      }
      setupOnce() {
        for (const level of ["debug", "info", "warn", "error", "log"]) {
          utils.fill(console, level, createConsoleWrapper(level));
        }
      }
    };
    Console.__initStatic();
    function createConsoleWrapper(level) {
      return function consoleWrapper(originalConsoleMethod) {
        const sentryLevel = utils.severityLevelFromString(level);
        return function () {
          if (core.getCurrentHub().getIntegration(Console)) {
            core.getCurrentHub().addBreadcrumb(
              {
                category: "console",
                level: sentryLevel,
                message: util.format.apply(void 0, arguments),
              },
              {
                input: [...arguments],
                level,
              },
            );
          }
          originalConsoleMethod.apply(this, arguments);
        };
      };
    }
    exports.Console = Console;
  },
});

// node_modules/lru_map/lru.js
var require_lru = __commonJS({
  "node_modules/lru_map/lru.js"(exports) {
    (function (g, f) {
      const e =
        typeof exports == "object" ? exports : typeof g == "object" ? g : {};
      f(e);
      if (typeof define == "function" && define.amd) {
        define("lru", e);
      }
    })(exports, function (exports2) {
      const NEWER = Symbol("newer");
      const OLDER = Symbol("older");
      function LRUMap(limit, entries) {
        if (typeof limit !== "number") {
          entries = limit;
          limit = 0;
        }
        this.size = 0;
        this.limit = limit;
        this.oldest = this.newest = void 0;
        this._keymap = /* @__PURE__ */ new Map();
        if (entries) {
          this.assign(entries);
          if (limit < 1) {
            this.limit = this.size;
          }
        }
      }
      exports2.LRUMap = LRUMap;
      function Entry(key, value) {
        this.key = key;
        this.value = value;
        this[NEWER] = void 0;
        this[OLDER] = void 0;
      }
      LRUMap.prototype._markEntryAsUsed = function (entry) {
        if (entry === this.newest) {
          return;
        }
        if (entry[NEWER]) {
          if (entry === this.oldest) {
            this.oldest = entry[NEWER];
          }
          entry[NEWER][OLDER] = entry[OLDER];
        }
        if (entry[OLDER]) {
          entry[OLDER][NEWER] = entry[NEWER];
        }
        entry[NEWER] = void 0;
        entry[OLDER] = this.newest;
        if (this.newest) {
          this.newest[NEWER] = entry;
        }
        this.newest = entry;
      };
      LRUMap.prototype.assign = function (entries) {
        let entry,
          limit = this.limit || Number.MAX_VALUE;
        this._keymap.clear();
        let it = entries[Symbol.iterator]();
        for (let itv = it.next(); !itv.done; itv = it.next()) {
          let e = new Entry(itv.value[0], itv.value[1]);
          this._keymap.set(e.key, e);
          if (!entry) {
            this.oldest = e;
          } else {
            entry[NEWER] = e;
            e[OLDER] = entry;
          }
          entry = e;
          if (limit-- == 0) {
            throw new Error("overflow");
          }
        }
        this.newest = entry;
        this.size = this._keymap.size;
      };
      LRUMap.prototype.get = function (key) {
        var entry = this._keymap.get(key);
        if (!entry) return;
        this._markEntryAsUsed(entry);
        return entry.value;
      };
      LRUMap.prototype.set = function (key, value) {
        var entry = this._keymap.get(key);
        if (entry) {
          entry.value = value;
          this._markEntryAsUsed(entry);
          return this;
        }
        this._keymap.set(key, (entry = new Entry(key, value)));
        if (this.newest) {
          this.newest[NEWER] = entry;
          entry[OLDER] = this.newest;
        } else {
          this.oldest = entry;
        }
        this.newest = entry;
        ++this.size;
        if (this.size > this.limit) {
          this.shift();
        }
        return this;
      };
      LRUMap.prototype.shift = function () {
        var entry = this.oldest;
        if (entry) {
          if (this.oldest[NEWER]) {
            this.oldest = this.oldest[NEWER];
            this.oldest[OLDER] = void 0;
          } else {
            this.oldest = void 0;
            this.newest = void 0;
          }
          entry[NEWER] = entry[OLDER] = void 0;
          this._keymap.delete(entry.key);
          --this.size;
          return [entry.key, entry.value];
        }
      };
      LRUMap.prototype.find = function (key) {
        let e = this._keymap.get(key);
        return e ? e.value : void 0;
      };
      LRUMap.prototype.has = function (key) {
        return this._keymap.has(key);
      };
      LRUMap.prototype["delete"] = function (key) {
        var entry = this._keymap.get(key);
        if (!entry) return;
        this._keymap.delete(entry.key);
        if (entry[NEWER] && entry[OLDER]) {
          entry[OLDER][NEWER] = entry[NEWER];
          entry[NEWER][OLDER] = entry[OLDER];
        } else if (entry[NEWER]) {
          entry[NEWER][OLDER] = void 0;
          this.oldest = entry[NEWER];
        } else if (entry[OLDER]) {
          entry[OLDER][NEWER] = void 0;
          this.newest = entry[OLDER];
        } else {
          this.oldest = this.newest = void 0;
        }
        this.size--;
        return entry.value;
      };
      LRUMap.prototype.clear = function () {
        this.oldest = this.newest = void 0;
        this.size = 0;
        this._keymap.clear();
      };
      function EntryIterator(oldestEntry) {
        this.entry = oldestEntry;
      }
      EntryIterator.prototype[Symbol.iterator] = function () {
        return this;
      };
      EntryIterator.prototype.next = function () {
        let ent = this.entry;
        if (ent) {
          this.entry = ent[NEWER];
          return { done: false, value: [ent.key, ent.value] };
        } else {
          return { done: true, value: void 0 };
        }
      };
      function KeyIterator(oldestEntry) {
        this.entry = oldestEntry;
      }
      KeyIterator.prototype[Symbol.iterator] = function () {
        return this;
      };
      KeyIterator.prototype.next = function () {
        let ent = this.entry;
        if (ent) {
          this.entry = ent[NEWER];
          return { done: false, value: ent.key };
        } else {
          return { done: true, value: void 0 };
        }
      };
      function ValueIterator(oldestEntry) {
        this.entry = oldestEntry;
      }
      ValueIterator.prototype[Symbol.iterator] = function () {
        return this;
      };
      ValueIterator.prototype.next = function () {
        let ent = this.entry;
        if (ent) {
          this.entry = ent[NEWER];
          return { done: false, value: ent.value };
        } else {
          return { done: true, value: void 0 };
        }
      };
      LRUMap.prototype.keys = function () {
        return new KeyIterator(this.oldest);
      };
      LRUMap.prototype.values = function () {
        return new ValueIterator(this.oldest);
      };
      LRUMap.prototype.entries = function () {
        return this;
      };
      LRUMap.prototype[Symbol.iterator] = function () {
        return new EntryIterator(this.oldest);
      };
      LRUMap.prototype.forEach = function (fun, thisObj) {
        if (typeof thisObj !== "object") {
          thisObj = this;
        }
        let entry = this.oldest;
        while (entry) {
          fun.call(thisObj, entry.value, entry.key, this);
          entry = entry[NEWER];
        }
      };
      LRUMap.prototype.toJSON = function () {
        var s = new Array(this.size),
          i = 0,
          entry = this.oldest;
        while (entry) {
          s[i++] = { key: entry.key, value: entry.value };
          entry = entry[NEWER];
        }
        return s;
      };
      LRUMap.prototype.toString = function () {
        var s = "",
          entry = this.oldest;
        while (entry) {
          s += String(entry.key) + ":" + entry.value;
          entry = entry[NEWER];
          if (entry) {
            s += " < ";
          }
        }
        return s;
      };
    });
  },
});

// node_modules/@sentry/node/cjs/integrations/utils/http.js
var require_http2 = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/utils/http.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var url = require("url");
    var nodeVersion = require_nodeVersion();
    function isSentryRequest(url2) {
      const dsn = _optionalChain([
        core.getCurrentHub,
        "call",
        (_) => _(),
        "access",
        (_2) => _2.getClient,
        "call",
        (_3) => _3(),
        "optionalAccess",
        (_4) => _4.getDsn,
        "call",
        (_5) => _5(),
      ]);
      return dsn ? url2.includes(dsn.host) : false;
    }
    function extractRawUrl(requestOptions) {
      const protocol = requestOptions.protocol || "";
      const hostname = requestOptions.hostname || requestOptions.host || "";
      const port =
        !requestOptions.port ||
        requestOptions.port === 80 ||
        requestOptions.port === 443
          ? ""
          : `:${requestOptions.port}`;
      const path = requestOptions.path ? requestOptions.path : "/";
      return `${protocol}//${hostname}${port}${path}`;
    }
    function extractUrl(requestOptions) {
      const protocol = requestOptions.protocol || "";
      const hostname = requestOptions.hostname || requestOptions.host || "";
      const port =
        !requestOptions.port ||
        requestOptions.port === 80 ||
        requestOptions.port === 443
          ? ""
          : `:${requestOptions.port}`;
      const path = requestOptions.pathname || "/";
      const authority = requestOptions.auth
        ? redactAuthority(requestOptions.auth)
        : "";
      return `${protocol}//${authority}${hostname}${port}${path}`;
    }
    function redactAuthority(auth) {
      const [user, password] = auth.split(":");
      return `${user ? "[Filtered]" : ""}:${password ? "[Filtered]" : ""}@`;
    }
    function cleanSpanDescription(description, requestOptions, request) {
      if (!description) {
        return description;
      }
      let [method, requestUrl] = description.split(" ");
      if (requestOptions.host && !requestOptions.protocol) {
        requestOptions.protocol = _optionalChain([
          request,
          "optionalAccess",
          (_6) => _6.agent,
          "optionalAccess",
          (_7) => _7.protocol,
        ]);
        requestUrl = extractUrl(requestOptions);
      }
      if (
        _optionalChain([
          requestUrl,
          "optionalAccess",
          (_8) => _8.startsWith,
          "call",
          (_9) => _9("///"),
        ])
      ) {
        requestUrl = requestUrl.slice(2);
      }
      return `${method} ${requestUrl}`;
    }
    function urlToOptions(url2) {
      const options = {
        protocol: url2.protocol,
        hostname:
          typeof url2.hostname === "string" && url2.hostname.startsWith("[")
            ? url2.hostname.slice(1, -1)
            : url2.hostname,
        hash: url2.hash,
        search: url2.search,
        pathname: url2.pathname,
        path: `${url2.pathname || ""}${url2.search || ""}`,
        href: url2.href,
      };
      if (url2.port !== "") {
        options.port = Number(url2.port);
      }
      if (url2.username || url2.password) {
        options.auth = `${url2.username}:${url2.password}`;
      }
      return options;
    }
    function normalizeRequestArgs(httpModule, requestArgs) {
      let callback, requestOptions;
      if (typeof requestArgs[requestArgs.length - 1] === "function") {
        callback = requestArgs.pop();
      }
      if (typeof requestArgs[0] === "string") {
        requestOptions = urlToOptions(new url.URL(requestArgs[0]));
      } else if (requestArgs[0] instanceof url.URL) {
        requestOptions = urlToOptions(requestArgs[0]);
      } else {
        requestOptions = requestArgs[0];
      }
      if (requestArgs.length === 2) {
        requestOptions = __spreadValues(
          __spreadValues({}, requestOptions),
          requestArgs[1],
        );
      }
      if (requestOptions.protocol === void 0) {
        if (
          nodeVersion.NODE_VERSION.major &&
          nodeVersion.NODE_VERSION.major > 8
        ) {
          requestOptions.protocol =
            _optionalChain([
              _optionalChain([
                httpModule,
                "optionalAccess",
                (_10) => _10.globalAgent,
              ]),
              "optionalAccess",
              (_11) => _11.protocol,
            ]) ||
            _optionalChain([
              requestOptions.agent,
              "optionalAccess",
              (_12) => _12.protocol,
            ]) ||
            _optionalChain([
              requestOptions._defaultAgent,
              "optionalAccess",
              (_13) => _13.protocol,
            ]);
        } else {
          requestOptions.protocol =
            _optionalChain([
              requestOptions.agent,
              "optionalAccess",
              (_14) => _14.protocol,
            ]) ||
            _optionalChain([
              requestOptions._defaultAgent,
              "optionalAccess",
              (_15) => _15.protocol,
            ]) ||
            _optionalChain([
              _optionalChain([
                httpModule,
                "optionalAccess",
                (_16) => _16.globalAgent,
              ]),
              "optionalAccess",
              (_17) => _17.protocol,
            ]);
        }
      }
      if (callback) {
        return [requestOptions, callback];
      } else {
        return [requestOptions];
      }
    }
    exports.cleanSpanDescription = cleanSpanDescription;
    exports.extractRawUrl = extractRawUrl;
    exports.extractUrl = extractUrl;
    exports.isSentryRequest = isSentryRequest;
    exports.normalizeRequestArgs = normalizeRequestArgs;
    exports.urlToOptions = urlToOptions;
  },
});

// node_modules/@sentry/node/cjs/integrations/http.js
var require_http3 = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/http.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var lru_map = require_lru();
    var nodeVersion = require_nodeVersion();
    var http2 = require_http2();
    var Http = class {
      static __initStatic() {
        this.id = "Http";
      }
      __init() {
        this.name = Http.id;
      }
      constructor(options = {}) {
        Http.prototype.__init.call(this);
        this._breadcrumbs =
          typeof options.breadcrumbs === "undefined"
            ? true
            : options.breadcrumbs;
        this._tracing = !options.tracing
          ? void 0
          : options.tracing === true
          ? {}
          : options.tracing;
      }
      setupOnce(_addGlobalEventProcessor, setupOnceGetCurrentHub) {
        if (!this._breadcrumbs && !this._tracing) {
          return;
        }
        const clientOptions = _optionalChain([
          setupOnceGetCurrentHub,
          "call",
          (_) => _(),
          "access",
          (_2) => _2.getClient,
          "call",
          (_3) => _3(),
          "optionalAccess",
          (_4) => _4.getOptions,
          "call",
          (_5) => _5(),
        ]);
        if (clientOptions && clientOptions.instrumenter !== "sentry") {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.log(
              "HTTP Integration is skipped because of instrumenter configuration.",
            );
          return;
        }
        const shouldCreateSpanForRequest =
          _optionalChain([
            this,
            "access",
            (_6) => _6._tracing,
            "optionalAccess",
            (_7) => _7.shouldCreateSpanForRequest,
          ]) ||
          _optionalChain([
            clientOptions,
            "optionalAccess",
            (_8) => _8.shouldCreateSpanForRequest,
          ]);
        const tracePropagationTargets =
          _optionalChain([
            clientOptions,
            "optionalAccess",
            (_9) => _9.tracePropagationTargets,
          ]) ||
          _optionalChain([
            this,
            "access",
            (_10) => _10._tracing,
            "optionalAccess",
            (_11) => _11.tracePropagationTargets,
          ]);
        const httpModule = require("http");
        const wrappedHttpHandlerMaker = _createWrappedRequestMethodFactory(
          httpModule,
          this._breadcrumbs,
          shouldCreateSpanForRequest,
          tracePropagationTargets,
        );
        utils.fill(httpModule, "get", wrappedHttpHandlerMaker);
        utils.fill(httpModule, "request", wrappedHttpHandlerMaker);
        if (
          nodeVersion.NODE_VERSION.major &&
          nodeVersion.NODE_VERSION.major > 8
        ) {
          const httpsModule = require("https");
          const wrappedHttpsHandlerMaker = _createWrappedRequestMethodFactory(
            httpsModule,
            this._breadcrumbs,
            shouldCreateSpanForRequest,
            tracePropagationTargets,
          );
          utils.fill(httpsModule, "get", wrappedHttpsHandlerMaker);
          utils.fill(httpsModule, "request", wrappedHttpsHandlerMaker);
        }
      }
    };
    Http.__initStatic();
    function _createWrappedRequestMethodFactory(
      httpModule,
      breadcrumbsEnabled,
      shouldCreateSpanForRequest,
      tracePropagationTargets,
    ) {
      const createSpanUrlMap = new lru_map.LRUMap(100);
      const headersUrlMap = new lru_map.LRUMap(100);
      const shouldCreateSpan = (url) => {
        if (shouldCreateSpanForRequest === void 0) {
          return true;
        }
        const cachedDecision = createSpanUrlMap.get(url);
        if (cachedDecision !== void 0) {
          return cachedDecision;
        }
        const decision = shouldCreateSpanForRequest(url);
        createSpanUrlMap.set(url, decision);
        return decision;
      };
      const shouldAttachTraceData = (url) => {
        if (tracePropagationTargets === void 0) {
          return true;
        }
        const cachedDecision = headersUrlMap.get(url);
        if (cachedDecision !== void 0) {
          return cachedDecision;
        }
        const decision = utils.stringMatchesSomePattern(
          url,
          tracePropagationTargets,
        );
        headersUrlMap.set(url, decision);
        return decision;
      };
      function addRequestBreadcrumb(event, requestSpanData, req, res) {
        if (!core.getCurrentHub().getIntegration(Http)) {
          return;
        }
        core.getCurrentHub().addBreadcrumb(
          {
            category: "http",
            data: __spreadValues(
              {
                status_code: res && res.statusCode,
              },
              requestSpanData,
            ),
            type: "http",
          },
          {
            event,
            request: req,
            response: res,
          },
        );
      }
      return function wrappedRequestMethodFactory(originalRequestMethod) {
        return function wrappedMethod(...args) {
          const requestArgs = http2.normalizeRequestArgs(httpModule, args);
          const requestOptions = requestArgs[0];
          const rawRequestUrl = http2.extractRawUrl(requestOptions);
          const requestUrl = http2.extractUrl(requestOptions);
          if (http2.isSentryRequest(requestUrl)) {
            return originalRequestMethod.apply(httpModule, requestArgs);
          }
          const hub = core.getCurrentHub();
          const scope = hub.getScope();
          const parentSpan = scope.getSpan();
          const data = getRequestSpanData(requestUrl, requestOptions);
          const requestSpan = shouldCreateSpan(rawRequestUrl)
            ? _optionalChain([
                parentSpan,
                "optionalAccess",
                (_12) => _12.startChild,
                "call",
                (_13) =>
                  _13({
                    op: "http.client",
                    description: `${data["http.method"]} ${data.url}`,
                    data,
                  }),
              ])
            : void 0;
          if (shouldAttachTraceData(rawRequestUrl)) {
            if (requestSpan) {
              const sentryTraceHeader = requestSpan.toTraceparent();
              const dynamicSamplingContext = _optionalChain([
                requestSpan,
                "optionalAccess",
                (_14) => _14.transaction,
                "optionalAccess",
                (_15) => _15.getDynamicSamplingContext,
                "call",
                (_16) => _16(),
              ]);
              addHeadersToRequestOptions(
                requestOptions,
                requestUrl,
                sentryTraceHeader,
                dynamicSamplingContext,
              );
            } else {
              const client = hub.getClient();
              const { traceId, sampled, dsc } = scope.getPropagationContext();
              const sentryTraceHeader = utils.generateSentryTraceHeader(
                traceId,
                void 0,
                sampled,
              );
              const dynamicSamplingContext =
                dsc ||
                (client
                  ? core.getDynamicSamplingContextFromClient(
                      traceId,
                      client,
                      scope,
                    )
                  : void 0);
              addHeadersToRequestOptions(
                requestOptions,
                requestUrl,
                sentryTraceHeader,
                dynamicSamplingContext,
              );
            }
          } else {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.log(
                `[Tracing] Not adding sentry-trace header to outgoing request (${requestUrl}) due to mismatching tracePropagationTargets option.`,
              );
          }
          return originalRequestMethod
            .apply(httpModule, requestArgs)
            .once("response", function (res) {
              const req = this;
              if (breadcrumbsEnabled) {
                addRequestBreadcrumb("response", data, req, res);
              }
              if (requestSpan) {
                if (res.statusCode) {
                  requestSpan.setHttpStatus(res.statusCode);
                }
                requestSpan.description = http2.cleanSpanDescription(
                  requestSpan.description,
                  requestOptions,
                  req,
                );
                requestSpan.finish();
              }
            })
            .once("error", function () {
              const req = this;
              if (breadcrumbsEnabled) {
                addRequestBreadcrumb("error", data, req);
              }
              if (requestSpan) {
                requestSpan.setHttpStatus(500);
                requestSpan.description = http2.cleanSpanDescription(
                  requestSpan.description,
                  requestOptions,
                  req,
                );
                requestSpan.finish();
              }
            });
        };
      };
    }
    function addHeadersToRequestOptions(
      requestOptions,
      requestUrl,
      sentryTraceHeader,
      dynamicSamplingContext,
    ) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
        utils.logger.log(
          `[Tracing] Adding sentry-trace header ${sentryTraceHeader} to outgoing request to "${requestUrl}": `,
        );
      const sentryBaggage = utils.dynamicSamplingContextToSentryBaggageHeader(
        dynamicSamplingContext,
      );
      const sentryBaggageHeader = normalizeBaggageHeader(
        requestOptions,
        sentryBaggage,
      );
      requestOptions.headers = __spreadValues(
        __spreadProps(__spreadValues({}, requestOptions.headers), {
          "sentry-trace": sentryTraceHeader,
        }),
        sentryBaggageHeader && { baggage: sentryBaggageHeader },
      );
    }
    function getRequestSpanData(requestUrl, requestOptions) {
      const method = requestOptions.method || "GET";
      const data = {
        url: requestUrl,
        "http.method": method,
      };
      if (requestOptions.hash) {
        data["http.fragment"] = requestOptions.hash.substring(1);
      }
      if (requestOptions.search) {
        data["http.query"] = requestOptions.search.substring(1);
      }
      return data;
    }
    function normalizeBaggageHeader(requestOptions, sentryBaggageHeader) {
      if (!requestOptions.headers || !requestOptions.headers.baggage) {
        return sentryBaggageHeader;
      } else if (!sentryBaggageHeader) {
        return requestOptions.headers.baggage;
      } else if (Array.isArray(requestOptions.headers.baggage)) {
        return [...requestOptions.headers.baggage, sentryBaggageHeader];
      }
      return [requestOptions.headers.baggage, sentryBaggageHeader];
    }
    exports.Http = Http;
  },
});

// node_modules/@sentry/node/cjs/integrations/utils/errorhandling.js
var require_errorhandling = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/utils/errorhandling.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var DEFAULT_SHUTDOWN_TIMEOUT = 2e3;
    function logAndExitProcess(error) {
      console.error(error && error.stack ? error.stack : error);
      const client = core.getCurrentHub().getClient();
      if (client === void 0) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
          utils.logger.warn(
            "No NodeClient was defined, we are exiting the process now.",
          );
        global.process.exit(1);
      }
      const options = client.getOptions();
      const timeout =
        (options &&
          options.shutdownTimeout &&
          options.shutdownTimeout > 0 &&
          options.shutdownTimeout) ||
        DEFAULT_SHUTDOWN_TIMEOUT;
      client.close(timeout).then(
        (result) => {
          if (!result) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
              utils.logger.warn(
                "We reached the timeout for emptying the request buffer, still exiting now!",
              );
          }
          global.process.exit(1);
        },
        (error2) => {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
            utils.logger.error(error2);
        },
      );
    }
    exports.logAndExitProcess = logAndExitProcess;
  },
});

// node_modules/@sentry/node/cjs/integrations/onuncaughtexception.js
var require_onuncaughtexception = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/onuncaughtexception.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var errorhandling = require_errorhandling();
    var OnUncaughtException = class {
      static __initStatic() {
        this.id = "OnUncaughtException";
      }
      __init() {
        this.name = OnUncaughtException.id;
      }
      __init2() {
        this.handler = this._makeErrorHandler();
      }
      constructor(options = {}) {
        OnUncaughtException.prototype.__init.call(this);
        OnUncaughtException.prototype.__init2.call(this);
        this._options = __spreadValues(
          {
            exitEvenIfOtherHandlersAreRegistered: true,
          },
          options,
        );
      }
      setupOnce() {
        global.process.on("uncaughtException", this.handler);
      }
      _makeErrorHandler() {
        const timeout = 2e3;
        let caughtFirstError = false;
        let caughtSecondError = false;
        let calledFatalError = false;
        let firstError;
        return (error) => {
          let onFatalError = errorhandling.logAndExitProcess;
          const client = core.getCurrentHub().getClient();
          if (this._options.onFatalError) {
            onFatalError = this._options.onFatalError;
          } else if (client && client.getOptions().onFatalError) {
            onFatalError = client.getOptions().onFatalError;
          }
          const userProvidedListenersCount = global.process
            .listeners("uncaughtException")
            .reduce((acc, listener) => {
              if (
                listener.name === "domainUncaughtExceptionClear" ||
                (listener.tag &&
                  listener.tag === "sentry_tracingErrorCallback") ||
                listener === this.handler
              ) {
                return acc;
              } else {
                return acc + 1;
              }
            }, 0);
          const processWouldExit = userProvidedListenersCount === 0;
          const shouldApplyFatalHandlingLogic =
            this._options.exitEvenIfOtherHandlersAreRegistered ||
            processWouldExit;
          if (!caughtFirstError) {
            const hub = core.getCurrentHub();
            firstError = error;
            caughtFirstError = true;
            if (hub.getIntegration(OnUncaughtException)) {
              hub.withScope((scope) => {
                scope.setLevel("fatal");
                hub.captureException(error, {
                  originalException: error,
                  data: {
                    mechanism: { handled: false, type: "onuncaughtexception" },
                  },
                });
                if (!calledFatalError && shouldApplyFatalHandlingLogic) {
                  calledFatalError = true;
                  onFatalError(error);
                }
              });
            } else {
              if (!calledFatalError && shouldApplyFatalHandlingLogic) {
                calledFatalError = true;
                onFatalError(error);
              }
            }
          } else {
            if (shouldApplyFatalHandlingLogic) {
              if (calledFatalError) {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                  utils.logger.warn(
                    "uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown",
                  );
                errorhandling.logAndExitProcess(error);
              } else if (!caughtSecondError) {
                caughtSecondError = true;
                setTimeout(() => {
                  if (!calledFatalError) {
                    calledFatalError = true;
                    onFatalError(firstError, error);
                  }
                }, timeout);
              }
            }
          }
        };
      }
    };
    OnUncaughtException.__initStatic();
    exports.OnUncaughtException = OnUncaughtException;
  },
});

// node_modules/@sentry/node/cjs/integrations/onunhandledrejection.js
var require_onunhandledrejection = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/onunhandledrejection.js"(
    exports,
  ) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var errorhandling = require_errorhandling();
    var OnUnhandledRejection = class {
      static __initStatic() {
        this.id = "OnUnhandledRejection";
      }
      __init() {
        this.name = OnUnhandledRejection.id;
      }
      constructor(_options = { mode: "warn" }) {
        this._options = _options;
        OnUnhandledRejection.prototype.__init.call(this);
      }
      setupOnce() {
        global.process.on(
          "unhandledRejection",
          this.sendUnhandledPromise.bind(this),
        );
      }
      sendUnhandledPromise(reason, promise) {
        const hub = core.getCurrentHub();
        if (hub.getIntegration(OnUnhandledRejection)) {
          hub.withScope((scope) => {
            scope.setExtra("unhandledPromiseRejection", true);
            hub.captureException(reason, {
              originalException: promise,
              data: {
                mechanism: { handled: false, type: "onunhandledrejection" },
              },
            });
          });
        }
        this._handleRejection(reason);
      }
      _handleRejection(reason) {
        const rejectionWarning =
          "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
        if (this._options.mode === "warn") {
          utils.consoleSandbox(() => {
            console.warn(rejectionWarning);
            console.error(reason && reason.stack ? reason.stack : reason);
          });
        } else if (this._options.mode === "strict") {
          utils.consoleSandbox(() => {
            console.warn(rejectionWarning);
          });
          errorhandling.logAndExitProcess(reason);
        }
      }
    };
    OnUnhandledRejection.__initStatic();
    exports.OnUnhandledRejection = OnUnhandledRejection;
  },
});

// node_modules/@sentry/node/cjs/integrations/contextlines.js
var require_contextlines = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/contextlines.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var fs = require("fs");
    var lru_map = require_lru();
    var FILE_CONTENT_CACHE = new lru_map.LRUMap(100);
    var DEFAULT_LINES_OF_CONTEXT = 7;
    function readTextFileAsync(path) {
      return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }
    var ContextLines = class {
      static __initStatic() {
        this.id = "ContextLines";
      }
      __init() {
        this.name = ContextLines.id;
      }
      constructor(_options = {}) {
        this._options = _options;
        ContextLines.prototype.__init.call(this);
      }
      get _contextLines() {
        return this._options.frameContextLines !== void 0
          ? this._options.frameContextLines
          : DEFAULT_LINES_OF_CONTEXT;
      }
      setupOnce(addGlobalEventProcessor) {
        addGlobalEventProcessor((event) => this.addSourceContext(event));
      }
      async addSourceContext(event) {
        const enqueuedReadSourceFileTasks = {};
        const readSourceFileTasks = [];
        if (
          this._contextLines > 0 &&
          _optionalChain([
            event,
            "access",
            (_2) => _2.exception,
            "optionalAccess",
            (_3) => _3.values,
          ])
        ) {
          for (const exception of event.exception.values) {
            if (
              !_optionalChain([
                exception,
                "access",
                (_4) => _4.stacktrace,
                "optionalAccess",
                (_5) => _5.frames,
              ])
            ) {
              continue;
            }
            for (let i = exception.stacktrace.frames.length - 1; i >= 0; i--) {
              const frame = exception.stacktrace.frames[i];
              if (
                frame.filename &&
                !enqueuedReadSourceFileTasks[frame.filename] &&
                !FILE_CONTENT_CACHE.get(frame.filename)
              ) {
                readSourceFileTasks.push(_readSourceFile(frame.filename));
                enqueuedReadSourceFileTasks[frame.filename] = 1;
              }
            }
          }
        }
        if (readSourceFileTasks.length > 0) {
          await Promise.all(readSourceFileTasks);
        }
        if (
          this._contextLines > 0 &&
          _optionalChain([
            event,
            "access",
            (_6) => _6.exception,
            "optionalAccess",
            (_7) => _7.values,
          ])
        ) {
          for (const exception of event.exception.values) {
            if (exception.stacktrace && exception.stacktrace.frames) {
              await this.addSourceContextToFrames(exception.stacktrace.frames);
            }
          }
        }
        return event;
      }
      addSourceContextToFrames(frames) {
        for (const frame of frames) {
          if (frame.filename && frame.context_line === void 0) {
            const sourceFileLines = FILE_CONTENT_CACHE.get(frame.filename);
            if (sourceFileLines) {
              try {
                utils.addContextToFrame(
                  sourceFileLines,
                  frame,
                  this._contextLines,
                );
              } catch (e) {}
            }
          }
        }
      }
    };
    ContextLines.__initStatic();
    async function _readSourceFile(filename) {
      const cachedFile = FILE_CONTENT_CACHE.get(filename);
      if (cachedFile === null) {
        return null;
      }
      if (cachedFile !== void 0) {
        return cachedFile;
      }
      let content = null;
      try {
        const rawFileContents = await readTextFileAsync(filename);
        content = rawFileContents.split("\n");
      } catch (_) {}
      FILE_CONTENT_CACHE.set(filename, content);
      return content;
    }
    exports.ContextLines = ContextLines;
  },
});

// node_modules/@sentry/node/cjs/integrations/linkederrors.js
var require_linkederrors = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/linkederrors.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var eventbuilder = require_eventbuilder();
    var contextlines = require_contextlines();
    var DEFAULT_KEY = "cause";
    var DEFAULT_LIMIT = 5;
    var LinkedErrors = class {
      static __initStatic() {
        this.id = "LinkedErrors";
      }
      __init() {
        this.name = LinkedErrors.id;
      }
      constructor(options = {}) {
        LinkedErrors.prototype.__init.call(this);
        this._key = options.key || DEFAULT_KEY;
        this._limit = options.limit || DEFAULT_LIMIT;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor(async (event, hint) => {
          const hub = getCurrentHub();
          const client = hub.getClient();
          const self2 = hub.getIntegration(LinkedErrors);
          if (!client || !self2) {
            return event;
          }
          utils.applyAggregateErrorsToEvent(
            eventbuilder.exceptionFromError,
            client.getOptions().stackParser,
            self2._key,
            self2._limit,
            event,
            hint,
          );
          const contextLines = getCurrentHub().getIntegration(
            contextlines.ContextLines,
          );
          if (contextLines) {
            await contextLines.addSourceContext(event);
          }
          return event;
        });
      }
    };
    LinkedErrors.__initStatic();
    exports.LinkedErrors = LinkedErrors;
  },
});

// node_modules/@sentry/node/cjs/integrations/modules.js
var require_modules = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/modules.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var path = require("path");
    var moduleCache;
    function getPaths() {
      try {
        return require.cache ? Object.keys(require.cache) : [];
      } catch (e) {
        return [];
      }
    }
    function collectModules() {
      const mainPaths = (require.main && require.main.paths) || [];
      const paths = getPaths();
      const infos = {};
      const seen = {};
      paths.forEach((path$1) => {
        let dir = path$1;
        const updir = () => {
          const orig = dir;
          dir = path.dirname(orig);
          if (!dir || orig === dir || seen[orig]) {
            return void 0;
          }
          if (mainPaths.indexOf(dir) < 0) {
            return updir();
          }
          const pkgfile = path.join(orig, "package.json");
          seen[orig] = true;
          if (!fs.existsSync(pkgfile)) {
            return updir();
          }
          try {
            const info = JSON.parse(fs.readFileSync(pkgfile, "utf8"));
            infos[info.name] = info.version;
          } catch (_oO) {}
        };
        updir();
      });
      return infos;
    }
    var Modules = class {
      constructor() {
        Modules.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "Modules";
      }
      __init() {
        this.name = Modules.id;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          if (!getCurrentHub().getIntegration(Modules)) {
            return event;
          }
          return __spreadProps(__spreadValues({}, event), {
            modules: __spreadValues(
              __spreadValues({}, event.modules),
              this._getModules(),
            ),
          });
        });
      }
      _getModules() {
        if (!moduleCache) {
          moduleCache = collectModules();
        }
        return moduleCache;
      }
    };
    Modules.__initStatic();
    exports.Modules = Modules;
  },
});

// node_modules/@sentry/node/cjs/integrations/context.js
var require_context = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/context.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var child_process = require("child_process");
    var fs = require("fs");
    var os = require("os");
    var path = require("path");
    var util = require("util");
    var readFileAsync = util.promisify(fs.readFile);
    var readDirAsync = util.promisify(fs.readdir);
    var Context = class {
      static __initStatic() {
        this.id = "Context";
      }
      __init() {
        this.name = Context.id;
      }
      constructor(
        _options = { app: true, os: true, device: true, culture: true },
      ) {
        this._options = _options;
        Context.prototype.__init.call(this);
      }
      setupOnce(addGlobalEventProcessor) {
        addGlobalEventProcessor((event) => this.addContext(event));
      }
      async addContext(event) {
        if (this._cachedContext === void 0) {
          this._cachedContext = this._getContexts();
        }
        const updatedContext = this._updateContext(await this._cachedContext);
        event.contexts = __spreadProps(__spreadValues({}, event.contexts), {
          app: __spreadValues(
            __spreadValues({}, updatedContext.app),
            _optionalChain([
              event,
              "access",
              (_) => _.contexts,
              "optionalAccess",
              (_2) => _2.app,
            ]),
          ),
          os: __spreadValues(
            __spreadValues({}, updatedContext.os),
            _optionalChain([
              event,
              "access",
              (_3) => _3.contexts,
              "optionalAccess",
              (_4) => _4.os,
            ]),
          ),
          device: __spreadValues(
            __spreadValues({}, updatedContext.device),
            _optionalChain([
              event,
              "access",
              (_5) => _5.contexts,
              "optionalAccess",
              (_6) => _6.device,
            ]),
          ),
          culture: __spreadValues(
            __spreadValues({}, updatedContext.culture),
            _optionalChain([
              event,
              "access",
              (_7) => _7.contexts,
              "optionalAccess",
              (_8) => _8.culture,
            ]),
          ),
        });
        return event;
      }
      _updateContext(contexts) {
        if (
          _optionalChain([
            contexts,
            "optionalAccess",
            (_9) => _9.app,
            "optionalAccess",
            (_10) => _10.app_memory,
          ])
        ) {
          contexts.app.app_memory = process.memoryUsage().rss;
        }
        if (
          _optionalChain([
            contexts,
            "optionalAccess",
            (_11) => _11.device,
            "optionalAccess",
            (_12) => _12.free_memory,
          ])
        ) {
          contexts.device.free_memory = os.freemem();
        }
        return contexts;
      }
      async _getContexts() {
        const contexts = {};
        if (this._options.os) {
          contexts.os = await getOsContext();
        }
        if (this._options.app) {
          contexts.app = getAppContext();
        }
        if (this._options.device) {
          contexts.device = getDeviceContext(this._options.device);
        }
        if (this._options.culture) {
          const culture = getCultureContext();
          if (culture) {
            contexts.culture = culture;
          }
        }
        return contexts;
      }
    };
    Context.__initStatic();
    async function getOsContext() {
      const platformId = os.platform();
      switch (platformId) {
        case "darwin":
          return getDarwinInfo();
        case "linux":
          return getLinuxInfo();
        default:
          return {
            name: PLATFORM_NAMES[platformId] || platformId,
            version: os.release(),
          };
      }
    }
    function getCultureContext() {
      try {
        if (typeof process.versions.icu !== "string") {
          return;
        }
        const january = new Date(9e8);
        const spanish = new Intl.DateTimeFormat("es", { month: "long" });
        if (spanish.format(january) === "enero") {
          const options = Intl.DateTimeFormat().resolvedOptions();
          return {
            locale: options.locale,
            timezone: options.timeZone,
          };
        }
      } catch (err) {}
      return;
    }
    function getAppContext() {
      const app_memory = process.memoryUsage().rss;
      const app_start_time = new Date(
        Date.now() - process.uptime() * 1e3,
      ).toISOString();
      return { app_start_time, app_memory };
    }
    function getDeviceContext(deviceOpt) {
      const device = {};
      let uptime;
      try {
        uptime = os.uptime && os.uptime();
      } catch (e) {}
      if (typeof uptime === "number") {
        device.boot_time = new Date(Date.now() - uptime * 1e3).toISOString();
      }
      device.arch = os.arch();
      if (deviceOpt === true || deviceOpt.memory) {
        device.memory_size = os.totalmem();
        device.free_memory = os.freemem();
      }
      if (deviceOpt === true || deviceOpt.cpu) {
        const cpuInfo = os.cpus();
        if (cpuInfo && cpuInfo.length) {
          const firstCpu = cpuInfo[0];
          device.processor_count = cpuInfo.length;
          device.cpu_description = firstCpu.model;
          device.processor_frequency = firstCpu.speed;
        }
      }
      return device;
    }
    var PLATFORM_NAMES = {
      aix: "IBM AIX",
      freebsd: "FreeBSD",
      openbsd: "OpenBSD",
      sunos: "SunOS",
      win32: "Windows",
    };
    var LINUX_DISTROS = [
      { name: "fedora-release", distros: ["Fedora"] },
      { name: "redhat-release", distros: ["Red Hat Linux", "Centos"] },
      { name: "redhat_version", distros: ["Red Hat Linux"] },
      { name: "SuSE-release", distros: ["SUSE Linux"] },
      { name: "lsb-release", distros: ["Ubuntu Linux", "Arch Linux"] },
      { name: "debian_version", distros: ["Debian"] },
      { name: "debian_release", distros: ["Debian"] },
      { name: "arch-release", distros: ["Arch Linux"] },
      { name: "gentoo-release", distros: ["Gentoo Linux"] },
      { name: "novell-release", distros: ["SUSE Linux"] },
      { name: "alpine-release", distros: ["Alpine Linux"] },
    ];
    var LINUX_VERSIONS = {
      alpine: (content) => content,
      arch: (content) => matchFirst(/distrib_release=(.*)/, content),
      centos: (content) => matchFirst(/release ([^ ]+)/, content),
      debian: (content) => content,
      fedora: (content) => matchFirst(/release (..)/, content),
      mint: (content) => matchFirst(/distrib_release=(.*)/, content),
      red: (content) => matchFirst(/release ([^ ]+)/, content),
      suse: (content) => matchFirst(/VERSION = (.*)\n/, content),
      ubuntu: (content) => matchFirst(/distrib_release=(.*)/, content),
    };
    function matchFirst(regex, text) {
      const match = regex.exec(text);
      return match ? match[1] : void 0;
    }
    async function getDarwinInfo() {
      const darwinInfo = {
        kernel_version: os.release(),
        name: "Mac OS X",
        version: `10.${Number(os.release().split(".")[0]) - 4}`,
      };
      try {
        const output = await new Promise((resolve, reject) => {
          child_process.execFile("/usr/bin/sw_vers", (error, stdout) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(stdout);
          });
        });
        darwinInfo.name = matchFirst(/^ProductName:\s+(.*)$/m, output);
        darwinInfo.version = matchFirst(/^ProductVersion:\s+(.*)$/m, output);
        darwinInfo.build = matchFirst(/^BuildVersion:\s+(.*)$/m, output);
      } catch (e) {}
      return darwinInfo;
    }
    function getLinuxDistroId(name) {
      return name.split(" ")[0].toLowerCase();
    }
    async function getLinuxInfo() {
      const linuxInfo = {
        kernel_version: os.release(),
        name: "Linux",
      };
      try {
        const etcFiles = await readDirAsync("/etc");
        const distroFile = LINUX_DISTROS.find((file) =>
          etcFiles.includes(file.name),
        );
        if (!distroFile) {
          return linuxInfo;
        }
        const distroPath = path.join("/etc", distroFile.name);
        const contents = (
          await readFileAsync(distroPath, { encoding: "utf-8" })
        ).toLowerCase();
        const { distros } = distroFile;
        linuxInfo.name =
          distros.find((d) => contents.indexOf(getLinuxDistroId(d)) >= 0) ||
          distros[0];
        const id = getLinuxDistroId(linuxInfo.name);
        linuxInfo.version = LINUX_VERSIONS[id](contents);
      } catch (e) {}
      return linuxInfo;
    }
    exports.Context = Context;
    exports.getDeviceContext = getDeviceContext;
    exports.readDirAsync = readDirAsync;
    exports.readFileAsync = readFileAsync;
  },
});

// node_modules/@sentry/node/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/@sentry/node/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(";");
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var index = pair.indexOf("=");
        if (index < 0) {
          continue;
        }
        var key = pair.substring(0, index).trim();
        if (obj[key] == void 0) {
          var val = pair.substring(index + 1, pair.length).trim();
          if (val[0] === '"') {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite =
          typeof opt.sameSite === "string"
            ? opt.sameSite.toLowerCase()
            : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  },
});

// node_modules/@sentry/node/cjs/requestdata.js
var require_requestdata2 = __commonJS({
  "node_modules/@sentry/node/cjs/requestdata.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var cookie = require_cookie();
    var url = require("url");
    var DEFAULT_INCLUDES = {
      ip: false,
      request: true,
      transaction: true,
      user: true,
    };
    var DEFAULT_REQUEST_INCLUDES = [
      "cookies",
      "data",
      "headers",
      "method",
      "query_string",
      "url",
    ];
    var DEFAULT_USER_INCLUDES = ["id", "username", "email"];
    function extractPathForTransaction(req, options = {}) {
      const method = req.method && req.method.toUpperCase();
      let path = "";
      let source = "url";
      if (options.customRoute || req.route) {
        path =
          options.customRoute ||
          `${req.baseUrl || ""}${req.route && req.route.path}`;
        source = "route";
      } else if (req.originalUrl || req.url) {
        path = utils.stripUrlQueryAndFragment(req.originalUrl || req.url || "");
      }
      let name = "";
      if (options.method && method) {
        name += method;
      }
      if (options.method && options.path) {
        name += " ";
      }
      if (options.path && path) {
        name += path;
      }
      return [name, source];
    }
    function extractTransaction(req, type) {
      switch (type) {
        case "path": {
          return extractPathForTransaction(req, { path: true })[0];
        }
        case "handler": {
          return (
            (req.route &&
              req.route.stack &&
              req.route.stack[0] &&
              req.route.stack[0].name) ||
            "<anonymous>"
          );
        }
        case "methodPath":
        default: {
          return extractPathForTransaction(req, {
            path: true,
            method: true,
          })[0];
        }
      }
    }
    function extractUserData(user, keys) {
      const extractedUser = {};
      const attributes = Array.isArray(keys) ? keys : DEFAULT_USER_INCLUDES;
      attributes.forEach((key) => {
        if (user && key in user) {
          extractedUser[key] = user[key];
        }
      });
      return extractedUser;
    }
    function extractRequestData(req, options) {
      const { include = DEFAULT_REQUEST_INCLUDES } = options || {};
      const requestData = {};
      const headers2 = req.headers || {};
      const method = req.method;
      const host = req.hostname || req.host || headers2.host || "<no host>";
      const protocol =
        req.protocol === "https" || (req.socket && req.socket.encrypted)
          ? "https"
          : "http";
      const originalUrl = req.originalUrl || req.url || "";
      const absoluteUrl = originalUrl.startsWith(protocol)
        ? originalUrl
        : `${protocol}://${host}${originalUrl}`;
      include.forEach((key) => {
        switch (key) {
          case "headers": {
            requestData.headers = headers2;
            if (!include.includes("cookies")) {
              delete requestData.headers.cookie;
            }
            break;
          }
          case "method": {
            requestData.method = method;
            break;
          }
          case "url": {
            requestData.url = absoluteUrl;
            break;
          }
          case "cookies": {
            requestData.cookies =
              req.cookies ||
              (headers2.cookie && cookie.parse(headers2.cookie)) ||
              {};
            break;
          }
          case "query_string": {
            requestData.query_string = extractQueryParams(req);
            break;
          }
          case "data": {
            if (method === "GET" || method === "HEAD") {
              break;
            }
            if (req.body !== void 0) {
              requestData.data = utils.isString(req.body)
                ? req.body
                : JSON.stringify(utils.normalize(req.body));
            }
            break;
          }
          default: {
            if ({}.hasOwnProperty.call(req, key)) {
              requestData[key] = req[key];
            }
          }
        }
      });
      return requestData;
    }
    function addRequestDataToEvent(event, req, options) {
      const include = __spreadValues(
        __spreadValues({}, DEFAULT_INCLUDES),
        _optionalChain([options, "optionalAccess", (_) => _.include]),
      );
      if (include.request) {
        const extractedRequestData = Array.isArray(include.request)
          ? extractRequestData(req, { include: include.request })
          : extractRequestData(req);
        event.request = __spreadValues(
          __spreadValues({}, event.request),
          extractedRequestData,
        );
      }
      if (include.user) {
        const extractedUser =
          req.user && utils.isPlainObject(req.user)
            ? extractUserData(req.user, include.user)
            : {};
        if (Object.keys(extractedUser).length) {
          event.user = __spreadValues(
            __spreadValues({}, event.user),
            extractedUser,
          );
        }
      }
      if (include.ip) {
        const ip = req.ip || (req.socket && req.socket.remoteAddress);
        if (ip) {
          event.user = __spreadProps(__spreadValues({}, event.user), {
            ip_address: ip,
          });
        }
      }
      if (include.transaction && !event.transaction) {
        event.transaction = extractTransaction(req, include.transaction);
      }
      return event;
    }
    function extractQueryParams(req) {
      let originalUrl = req.originalUrl || req.url || "";
      if (!originalUrl) {
        return;
      }
      if (originalUrl.startsWith("/")) {
        originalUrl = `http://dogs.are.great${originalUrl}`;
      }
      return (
        req.query ||
        (typeof URL !== void 0 &&
          new URL(originalUrl).search.replace("?", "")) ||
        url.parse(originalUrl).query ||
        void 0
      );
    }
    exports.DEFAULT_USER_INCLUDES = DEFAULT_USER_INCLUDES;
    exports.addRequestDataToEvent = addRequestDataToEvent;
    exports.extractPathForTransaction = extractPathForTransaction;
    exports.extractRequestData = extractRequestData;
  },
});

// node_modules/@sentry/node/cjs/integrations/requestdata.js
var require_requestdata3 = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/requestdata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var requestdata = require_requestdata2();
    var DEFAULT_OPTIONS = {
      include: {
        cookies: true,
        data: true,
        headers: true,
        ip: false,
        query_string: true,
        url: true,
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
      transactionNamingScheme: "methodPath",
    };
    var RequestData = class {
      static __initStatic() {
        this.id = "RequestData";
      }
      __init() {
        this.name = RequestData.id;
      }
      constructor(options = {}) {
        RequestData.prototype.__init.call(this);
        this._addRequestData = requestdata.addRequestDataToEvent;
        this._options = __spreadProps(
          __spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options),
          {
            include: __spreadProps(
              __spreadValues(
                __spreadValues(
                  {
                    method: true,
                  },
                  DEFAULT_OPTIONS.include,
                ),
                options.include,
              ),
              {
                user:
                  options.include && typeof options.include.user === "boolean"
                    ? options.include.user
                    : __spreadValues(
                        __spreadValues({}, DEFAULT_OPTIONS.include.user),
                        (options.include || {}).user,
                      ),
              },
            ),
          },
        );
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        const { transactionNamingScheme } = this._options;
        addGlobalEventProcessor((event) => {
          const hub = getCurrentHub();
          const self2 = hub.getIntegration(RequestData);
          const { sdkProcessingMetadata = {} } = event;
          const req = sdkProcessingMetadata.request;
          if (!self2 || !req) {
            return event;
          }
          const addRequestDataOptions =
            sdkProcessingMetadata.requestDataOptionsFromExpressHandler ||
            sdkProcessingMetadata.requestDataOptionsFromGCPWrapper ||
            convertReqDataIntegrationOptsToAddReqDataOpts(this._options);
          const processedEvent = this._addRequestData(
            event,
            req,
            addRequestDataOptions,
          );
          if (
            event.type === "transaction" ||
            transactionNamingScheme === "handler"
          ) {
            return processedEvent;
          }
          const reqWithTransaction = req;
          const transaction = reqWithTransaction._sentryTransaction;
          if (transaction) {
            const shouldIncludeMethodInTransactionName =
              getSDKName(hub) === "sentry.javascript.nextjs"
                ? transaction.name.startsWith("/api")
                : transactionNamingScheme !== "path";
            const [transactionValue] = utils.extractPathForTransaction(req, {
              path: true,
              method: shouldIncludeMethodInTransactionName,
              customRoute: transaction.name,
            });
            processedEvent.transaction = transactionValue;
          }
          return processedEvent;
        });
      }
    };
    RequestData.__initStatic();
    function convertReqDataIntegrationOptsToAddReqDataOpts(integrationOptions) {
      const { transactionNamingScheme, include: _a } = integrationOptions,
        _b = _a,
        { ip, user } = _b,
        requestOptions = __objRest(_b, ["ip", "user"]);
      const requestIncludeKeys = [];
      for (const [key, value] of Object.entries(requestOptions)) {
        if (value) {
          requestIncludeKeys.push(key);
        }
      }
      let addReqDataUserOpt;
      if (user === void 0) {
        addReqDataUserOpt = true;
      } else if (typeof user === "boolean") {
        addReqDataUserOpt = user;
      } else {
        const userIncludeKeys = [];
        for (const [key, value] of Object.entries(user)) {
          if (value) {
            userIncludeKeys.push(key);
          }
        }
        addReqDataUserOpt = userIncludeKeys;
      }
      return {
        include: {
          ip,
          user: addReqDataUserOpt,
          request:
            requestIncludeKeys.length !== 0 ? requestIncludeKeys : void 0,
          transaction: transactionNamingScheme,
        },
      };
    }
    function getSDKName(hub) {
      try {
        return hub.getClient().getOptions()._metadata.sdk.name;
      } catch (err) {
        return void 0;
      }
    }
    exports.RequestData = RequestData;
  },
});

// node_modules/@sentry/node/cjs/integrations/localvariables.js
var require_localvariables = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/localvariables.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var lru_map = require_lru();
    var nodeVersion = require_nodeVersion();
    function createCallbackList(complete) {
      let callbacks = [];
      let completedCalled = false;
      function checkedComplete(result) {
        callbacks = [];
        if (completedCalled) {
          return;
        }
        completedCalled = true;
        complete(result);
      }
      callbacks.push(checkedComplete);
      function add(fn) {
        callbacks.push(fn);
      }
      function next(result) {
        const popped = callbacks.pop() || checkedComplete;
        try {
          popped(result);
        } catch (_) {
          checkedComplete(result);
        }
      }
      return { add, next };
    }
    var AsyncSession = class {
      constructor() {
        const { Session } = require("inspector");
        this._session = new Session();
      }
      configureAndConnect(onPause, captureAll) {
        this._session.connect();
        this._session.on("Debugger.paused", (event) => {
          onPause(event, () => {
            this._session.post("Debugger.resume");
          });
        });
        this._session.post("Debugger.enable");
        this._session.post("Debugger.setPauseOnExceptions", {
          state: captureAll ? "all" : "uncaught",
        });
      }
      getLocalVariables(objectId, complete) {
        this._getProperties(objectId, (props) => {
          const { add, next } = createCallbackList(complete);
          for (const prop of props) {
            if (
              _optionalChain([
                prop,
                "optionalAccess",
                (_2) => _2.value,
                "optionalAccess",
                (_3) => _3.objectId,
              ]) &&
              _optionalChain([
                prop,
                "optionalAccess",
                (_4) => _4.value,
                "access",
                (_5) => _5.className,
              ]) === "Array"
            ) {
              const id = prop.value.objectId;
              add((vars) => this._unrollArray(id, prop.name, vars, next));
            } else if (
              _optionalChain([
                prop,
                "optionalAccess",
                (_6) => _6.value,
                "optionalAccess",
                (_7) => _7.objectId,
              ]) &&
              _optionalChain([
                prop,
                "optionalAccess",
                (_8) => _8.value,
                "optionalAccess",
                (_9) => _9.className,
              ]) === "Object"
            ) {
              const id = prop.value.objectId;
              add((vars) => this._unrollObject(id, prop.name, vars, next));
            } else if (
              _optionalChain([
                prop,
                "optionalAccess",
                (_10) => _10.value,
                "optionalAccess",
                (_11) => _11.value,
              ]) ||
              _optionalChain([
                prop,
                "optionalAccess",
                (_12) => _12.value,
                "optionalAccess",
                (_13) => _13.description,
              ])
            ) {
              add((vars) => this._unrollOther(prop, vars, next));
            }
          }
          next({});
        });
      }
      _getProperties(objectId, next) {
        this._session.post(
          "Runtime.getProperties",
          {
            objectId,
            ownProperties: true,
          },
          (err, params) => {
            if (err) {
              next([]);
            } else {
              next(params.result);
            }
          },
        );
      }
      _unrollArray(objectId, name, vars, next) {
        this._getProperties(objectId, (props) => {
          vars[name] = props
            .filter((v) => v.name !== "length" && !isNaN(parseInt(v.name, 10)))
            .sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10))
            .map((v) =>
              _optionalChain([
                v,
                "optionalAccess",
                (_14) => _14.value,
                "optionalAccess",
                (_15) => _15.value,
              ]),
            );
          next(vars);
        });
      }
      _unrollObject(objectId, name, vars, next) {
        this._getProperties(objectId, (props) => {
          vars[name] = props
            .map((v) => [
              v.name,
              _optionalChain([
                v,
                "optionalAccess",
                (_16) => _16.value,
                "optionalAccess",
                (_17) => _17.value,
              ]),
            ])
            .reduce((obj, [key, val]) => {
              obj[key] = val;
              return obj;
            }, {});
          next(vars);
        });
      }
      _unrollOther(prop, vars, next) {
        if (
          _optionalChain([
            prop,
            "optionalAccess",
            (_18) => _18.value,
            "optionalAccess",
            (_19) => _19.value,
          ])
        ) {
          vars[prop.name] = prop.value.value;
        } else if (
          _optionalChain([
            prop,
            "optionalAccess",
            (_20) => _20.value,
            "optionalAccess",
            (_21) => _21.description,
          ]) &&
          _optionalChain([
            prop,
            "optionalAccess",
            (_22) => _22.value,
            "optionalAccess",
            (_23) => _23.type,
          ]) !== "function"
        ) {
          vars[prop.name] = `<${prop.value.description}>`;
        }
        next(vars);
      }
    };
    function tryNewAsyncSession() {
      try {
        return new AsyncSession();
      } catch (e) {
        return void 0;
      }
    }
    function isAnonymous(name) {
      return name !== void 0 && ["", "?", "<anonymous>"].includes(name);
    }
    function functionNamesMatch(a, b) {
      return a === b || (isAnonymous(a) && isAnonymous(b));
    }
    function hashFrames(frames) {
      if (frames === void 0) {
        return;
      }
      return frames
        .slice(-10)
        .reduce(
          (acc, frame) =>
            `${acc},${frame.function},${frame.lineno},${frame.colno}`,
          "",
        );
    }
    function hashFromStack(stackParser, stack) {
      if (stack === void 0) {
        return void 0;
      }
      return hashFrames(stackParser(stack, 1));
    }
    var LocalVariables = class {
      static __initStatic() {
        this.id = "LocalVariables";
      }
      __init() {
        this.name = LocalVariables.id;
      }
      __init2() {
        this._cachedFrames = new lru_map.LRUMap(20);
      }
      constructor(_options = {}, _session = tryNewAsyncSession()) {
        this._options = _options;
        this._session = _session;
        LocalVariables.prototype.__init.call(this);
        LocalVariables.prototype.__init2.call(this);
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        this._setup(
          addGlobalEventProcessor,
          _optionalChain([
            getCurrentHub,
            "call",
            (_24) => _24(),
            "access",
            (_25) => _25.getClient,
            "call",
            (_26) => _26(),
            "optionalAccess",
            (_27) => _27.getOptions,
            "call",
            (_28) => _28(),
          ]),
        );
      }
      _setup(addGlobalEventProcessor, clientOptions) {
        if (
          this._session &&
          _optionalChain([
            clientOptions,
            "optionalAccess",
            (_29) => _29.includeLocalVariables,
          ])
        ) {
          const unsupportedNodeVersion =
            (nodeVersion.NODE_VERSION.major || 0) < 18;
          if (unsupportedNodeVersion) {
            utils.logger.log(
              "The `LocalVariables` integration is only supported on Node >= v18.",
            );
            return;
          }
          this._session.configureAndConnect(
            (ev, complete) =>
              this._handlePaused(clientOptions.stackParser, ev, complete),
            !!this._options.captureAllExceptions,
          );
          addGlobalEventProcessor(async (event) =>
            this._addLocalVariables(event),
          );
        }
      }
      _handlePaused(
        stackParser,
        { params: { reason, data, callFrames } },
        complete,
      ) {
        if (reason !== "exception" && reason !== "promiseRejection") {
          complete();
          return;
        }
        const exceptionHash = hashFromStack(
          stackParser,
          _optionalChain([data, "optionalAccess", (_30) => _30.description]),
        );
        if (exceptionHash == void 0) {
          complete();
          return;
        }
        const { add, next } = createCallbackList((frames) => {
          this._cachedFrames.set(exceptionHash, frames);
          complete();
        });
        for (let i = 0; i < Math.min(callFrames.length, 5); i++) {
          const { scopeChain, functionName, this: obj } = callFrames[i];
          const localScope = scopeChain.find((scope) => scope.type === "local");
          const fn =
            obj.className === "global" || !obj.className
              ? functionName
              : `${obj.className}.${functionName}`;
          if (
            _optionalChain([
              localScope,
              "optionalAccess",
              (_31) => _31.object,
              "access",
              (_32) => _32.objectId,
            ]) === void 0
          ) {
            add((frames) => {
              frames[i] = { function: fn };
              next(frames);
            });
          } else {
            const id = localScope.object.objectId;
            add((frames) =>
              _optionalChain([
                this,
                "access",
                (_33) => _33._session,
                "optionalAccess",
                (_34) => _34.getLocalVariables,
                "call",
                (_35) =>
                  _35(id, (vars) => {
                    frames[i] = { function: fn, vars };
                    next(frames);
                  }),
              ]),
            );
          }
        }
        next([]);
      }
      _addLocalVariables(event) {
        for (const exception of _optionalChain([
          event,
          "optionalAccess",
          (_36) => _36.exception,
          "optionalAccess",
          (_37) => _37.values,
        ]) || []) {
          this._addLocalVariablesToException(exception);
        }
        return event;
      }
      _addLocalVariablesToException(exception) {
        const hash = hashFrames(
          _optionalChain([
            exception,
            "optionalAccess",
            (_38) => _38.stacktrace,
            "optionalAccess",
            (_39) => _39.frames,
          ]),
        );
        if (hash === void 0) {
          return;
        }
        const cachedFrames = this._cachedFrames.delete(hash);
        if (cachedFrames === void 0) {
          return;
        }
        const frameCount =
          _optionalChain([
            exception,
            "access",
            (_40) => _40.stacktrace,
            "optionalAccess",
            (_41) => _41.frames,
            "optionalAccess",
            (_42) => _42.length,
          ]) || 0;
        for (let i = 0; i < frameCount; i++) {
          const frameIndex = frameCount - i - 1;
          if (
            !_optionalChain([
              exception,
              "optionalAccess",
              (_43) => _43.stacktrace,
              "optionalAccess",
              (_44) => _44.frames,
              "optionalAccess",
              (_45) => _45[frameIndex],
            ]) ||
            !cachedFrames[i]
          ) {
            break;
          }
          if (
            cachedFrames[i].vars === void 0 ||
            exception.stacktrace.frames[frameIndex].in_app === false ||
            !functionNamesMatch(
              exception.stacktrace.frames[frameIndex].function,
              cachedFrames[i].function,
            )
          ) {
            continue;
          }
          exception.stacktrace.frames[frameIndex].vars = cachedFrames[i].vars;
        }
      }
    };
    LocalVariables.__initStatic();
    exports.LocalVariables = LocalVariables;
    exports.createCallbackList = createCallbackList;
  },
});

// node_modules/@sentry/node/cjs/integrations/undici/index.js
var require_undici = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/undici/index.js"(
    exports,
    module2,
  ) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var lru_map = require_lru();
    var nodeVersion = require_nodeVersion();
    var http2 = require_http2();
    exports.ChannelName = void 0;
    (function (ChannelName) {
      const RequestCreate = "undici:request:create";
      ChannelName["RequestCreate"] = RequestCreate;
      const RequestEnd = "undici:request:headers";
      ChannelName["RequestEnd"] = RequestEnd;
      const RequestError = "undici:request:error";
      ChannelName["RequestError"] = RequestError;
    })(exports.ChannelName || (exports.ChannelName = {}));
    var Undici = class {
      static __initStatic() {
        this.id = "Undici";
      }
      __init() {
        this.name = Undici.id;
      }
      __init2() {
        this._createSpanUrlMap = new lru_map.LRUMap(100);
      }
      __init3() {
        this._headersUrlMap = new lru_map.LRUMap(100);
      }
      constructor(_options = {}) {
        Undici.prototype.__init.call(this);
        Undici.prototype.__init2.call(this);
        Undici.prototype.__init3.call(this);
        Undici.prototype.__init4.call(this);
        Undici.prototype.__init5.call(this);
        Undici.prototype.__init6.call(this);
        this._options = {
          breadcrumbs:
            _options.breadcrumbs === void 0 ? true : _options.breadcrumbs,
          shouldCreateSpanForRequest: _options.shouldCreateSpanForRequest,
        };
      }
      setupOnce(_addGlobalEventProcessor) {
        if (
          nodeVersion.NODE_VERSION.major &&
          nodeVersion.NODE_VERSION.major < 16
        ) {
          return;
        }
        let ds;
        try {
          ds = utils.dynamicRequire(module2, "diagnostics_channel");
        } catch (e) {}
        if (!ds || !ds.subscribe) {
          return;
        }
        ds.subscribe(exports.ChannelName.RequestCreate, this._onRequestCreate);
        ds.subscribe(exports.ChannelName.RequestEnd, this._onRequestEnd);
        ds.subscribe(exports.ChannelName.RequestError, this._onRequestError);
      }
      _shouldCreateSpan(url) {
        if (this._options.shouldCreateSpanForRequest === void 0) {
          return true;
        }
        const cachedDecision = this._createSpanUrlMap.get(url);
        if (cachedDecision !== void 0) {
          return cachedDecision;
        }
        const decision = this._options.shouldCreateSpanForRequest(url);
        this._createSpanUrlMap.set(url, decision);
        return decision;
      }
      __init4() {
        this._onRequestCreate = (message) => {
          const hub = core.getCurrentHub();
          if (!hub.getIntegration(Undici)) {
            return;
          }
          const { request } = message;
          const stringUrl = request.origin
            ? request.origin.toString() + request.path
            : request.path;
          if (
            http2.isSentryRequest(stringUrl) ||
            request.__sentry_span__ !== void 0
          ) {
            return;
          }
          const client = hub.getClient();
          if (!client) {
            return;
          }
          const clientOptions = client.getOptions();
          const scope = hub.getScope();
          const parentSpan = scope.getSpan();
          const span = this._shouldCreateSpan(stringUrl)
            ? createRequestSpan(parentSpan, request, stringUrl)
            : void 0;
          if (span) {
            request.__sentry_span__ = span;
          }
          const shouldAttachTraceData = (url) => {
            if (clientOptions.tracePropagationTargets === void 0) {
              return true;
            }
            const cachedDecision = this._headersUrlMap.get(url);
            if (cachedDecision !== void 0) {
              return cachedDecision;
            }
            const decision = utils.stringMatchesSomePattern(
              url,
              clientOptions.tracePropagationTargets,
            );
            this._headersUrlMap.set(url, decision);
            return decision;
          };
          if (shouldAttachTraceData(stringUrl)) {
            if (span) {
              const dynamicSamplingContext = _optionalChain([
                span,
                "optionalAccess",
                (_4) => _4.transaction,
                "optionalAccess",
                (_5) => _5.getDynamicSamplingContext,
                "call",
                (_6) => _6(),
              ]);
              const sentryBaggageHeader =
                utils.dynamicSamplingContextToSentryBaggageHeader(
                  dynamicSamplingContext,
                );
              setHeadersOnRequest(
                request,
                span.toTraceparent(),
                sentryBaggageHeader,
              );
            } else {
              const { traceId, sampled, dsc } = scope.getPropagationContext();
              const sentryTrace = utils.generateSentryTraceHeader(
                traceId,
                void 0,
                sampled,
              );
              const dynamicSamplingContext =
                dsc ||
                core.getDynamicSamplingContextFromClient(
                  traceId,
                  client,
                  scope,
                );
              const sentryBaggageHeader =
                utils.dynamicSamplingContextToSentryBaggageHeader(
                  dynamicSamplingContext,
                );
              setHeadersOnRequest(request, sentryTrace, sentryBaggageHeader);
            }
          }
        };
      }
      __init5() {
        this._onRequestEnd = (message) => {
          const hub = core.getCurrentHub();
          if (!hub.getIntegration(Undici)) {
            return;
          }
          const { request, response } = message;
          const stringUrl = request.origin
            ? request.origin.toString() + request.path
            : request.path;
          if (http2.isSentryRequest(stringUrl)) {
            return;
          }
          const span = request.__sentry_span__;
          if (span) {
            span.setHttpStatus(response.statusCode);
            span.finish();
          }
          if (this._options.breadcrumbs) {
            hub.addBreadcrumb(
              {
                category: "http",
                data: {
                  method: request.method,
                  status_code: response.statusCode,
                  url: stringUrl,
                },
                type: "http",
              },
              {
                event: "response",
                request,
                response,
              },
            );
          }
        };
      }
      __init6() {
        this._onRequestError = (message) => {
          const hub = core.getCurrentHub();
          if (!hub.getIntegration(Undici)) {
            return;
          }
          const { request } = message;
          const stringUrl = request.origin
            ? request.origin.toString() + request.path
            : request.path;
          if (http2.isSentryRequest(stringUrl)) {
            return;
          }
          const span = request.__sentry_span__;
          if (span) {
            span.setStatus("internal_error");
            span.finish();
          }
          if (this._options.breadcrumbs) {
            hub.addBreadcrumb(
              {
                category: "http",
                data: {
                  method: request.method,
                  url: stringUrl,
                },
                level: "error",
                type: "http",
              },
              {
                event: "error",
                request,
              },
            );
          }
        };
      }
    };
    Undici.__initStatic();
    function setHeadersOnRequest(request, sentryTrace, sentryBaggageHeader) {
      if (request.__sentry_has_headers__) {
        return;
      }
      request.addHeader("sentry-trace", sentryTrace);
      if (sentryBaggageHeader) {
        request.addHeader("baggage", sentryBaggageHeader);
      }
      request.__sentry_has_headers__ = true;
    }
    function createRequestSpan(activeSpan, request, stringUrl) {
      const url = utils.parseUrl(stringUrl);
      const method = request.method || "GET";
      const data = {
        "http.method": method,
      };
      if (url.search) {
        data["http.query"] = url.search;
      }
      if (url.hash) {
        data["http.fragment"] = url.hash;
      }
      return _optionalChain([
        activeSpan,
        "optionalAccess",
        (_7) => _7.startChild,
        "call",
        (_8) =>
          _8({
            op: "http.client",
            description: `${method} ${utils.getSanitizedUrlString(url)}`,
            data,
          }),
      ]);
    }
    exports.Undici = Undici;
  },
});

// node_modules/@sentry/node/cjs/module.js
var require_module = __commonJS({
  "node_modules/@sentry/node/cjs/module.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = require("path");
    var isWindowsPlatform = path.sep === "\\";
    function normalizeWindowsPath(path2) {
      return path2.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
    }
    function getModuleFromFilename(
      filename,
      normalizeWindowsPathSeparator = isWindowsPlatform,
    ) {
      if (!filename) {
        return;
      }
      const normalizedFilename = normalizeWindowsPathSeparator
        ? normalizeWindowsPath(filename)
        : filename;
      let {
        root,
        dir,
        base: basename,
        ext,
      } = path.posix.parse(normalizedFilename);
      const base =
        (require && require.main && require.main.filename && dir) ||
        global.process.cwd();
      const normalizedBase = `${base}/`;
      let file = basename;
      if (ext === ".js") {
        file = file.slice(0, file.length - ".js".length);
      }
      if (!root && !dir) {
        dir = ".";
      }
      let n = dir.lastIndexOf("/node_modules/");
      if (n > -1) {
        return `${dir.slice(n + 14).replace(/\//g, ".")}:${file}`;
      }
      n = `${dir}/`.lastIndexOf(normalizedBase, 0);
      if (n === 0) {
        let moduleName = dir.slice(normalizedBase.length).replace(/\//g, ".");
        if (moduleName) {
          moduleName += ":";
        }
        moduleName += file;
        return moduleName;
      }
      return file;
    }
    exports.getModuleFromFilename = getModuleFromFilename;
  },
});

// node_modules/@sentry/node/cjs/sdk.js
var require_sdk2 = __commonJS({
  "node_modules/@sentry/node/cjs/sdk.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var index$1 = require_async();
    var client = require_client();
    var console2 = require_console();
    var http2 = require_http3();
    var onuncaughtexception = require_onuncaughtexception();
    var onunhandledrejection = require_onunhandledrejection();
    var linkederrors = require_linkederrors();
    var modules = require_modules();
    var contextlines = require_contextlines();
    var context = require_context();
    var requestdata = require_requestdata3();
    var localvariables = require_localvariables();
    var index = require_undici();
    var module$1 = require_module();
    var http$1 = require_http();
    var defaultIntegrations = [
      new core.Integrations.InboundFilters(),
      new core.Integrations.FunctionToString(),
      new console2.Console(),
      new http2.Http(),
      new index.Undici(),
      new onuncaughtexception.OnUncaughtException(),
      new onunhandledrejection.OnUnhandledRejection(),
      new contextlines.ContextLines(),
      new localvariables.LocalVariables(),
      new context.Context(),
      new modules.Modules(),
      new requestdata.RequestData(),
      new linkederrors.LinkedErrors(),
    ];
    function init2(options = {}) {
      const carrier = core.getMainCarrier();
      index$1.setNodeAsyncContextStrategy();
      const autoloadedIntegrations =
        _optionalChain([
          carrier,
          "access",
          (_) => _.__SENTRY__,
          "optionalAccess",
          (_2) => _2.integrations,
        ]) || [];
      options.defaultIntegrations =
        options.defaultIntegrations === false
          ? []
          : [
              ...(Array.isArray(options.defaultIntegrations)
                ? options.defaultIntegrations
                : defaultIntegrations),
              ...autoloadedIntegrations,
            ];
      if (options.dsn === void 0 && process.env.SENTRY_DSN) {
        options.dsn = process.env.SENTRY_DSN;
      }
      const sentryTracesSampleRate = process.env.SENTRY_TRACES_SAMPLE_RATE;
      if (options.tracesSampleRate === void 0 && sentryTracesSampleRate) {
        const tracesSampleRate = parseFloat(sentryTracesSampleRate);
        if (isFinite(tracesSampleRate)) {
          options.tracesSampleRate = tracesSampleRate;
        }
      }
      if (options.release === void 0) {
        const detectedRelease = getSentryRelease();
        if (detectedRelease !== void 0) {
          options.release = detectedRelease;
        } else {
          options.autoSessionTracking = false;
        }
      }
      if (options.environment === void 0 && process.env.SENTRY_ENVIRONMENT) {
        options.environment = process.env.SENTRY_ENVIRONMENT;
      }
      if (options.autoSessionTracking === void 0 && options.dsn !== void 0) {
        options.autoSessionTracking = true;
      }
      if (options.instrumenter === void 0) {
        options.instrumenter = "sentry";
      }
      const clientOptions = __spreadProps(__spreadValues({}, options), {
        stackParser: utils.stackParserFromStackParserOptions(
          options.stackParser || defaultStackParser,
        ),
        integrations: core.getIntegrationsToSetup(options),
        transport: options.transport || http$1.makeNodeTransport,
      });
      core.initAndBind(client.NodeClient, clientOptions);
      if (options.autoSessionTracking) {
        startSessionTracking();
      }
      updateScopeFromEnvVariables();
    }
    function lastEventId() {
      return core.getCurrentHub().lastEventId();
    }
    async function flush(timeout) {
      const client2 = core.getCurrentHub().getClient();
      if (client2) {
        return client2.flush(timeout);
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
        utils.logger.warn("Cannot flush events. No client defined.");
      return Promise.resolve(false);
    }
    async function close(timeout) {
      const client2 = core.getCurrentHub().getClient();
      if (client2) {
        return client2.close(timeout);
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
        utils.logger.warn(
          "Cannot flush events and disable SDK. No client defined.",
        );
      return Promise.resolve(false);
    }
    function isAutoSessionTrackingEnabled(client2) {
      if (client2 === void 0) {
        return false;
      }
      const clientOptions = client2 && client2.getOptions();
      if (clientOptions && clientOptions.autoSessionTracking !== void 0) {
        return clientOptions.autoSessionTracking;
      }
      return false;
    }
    function getSentryRelease(fallback) {
      if (process.env.SENTRY_RELEASE) {
        return process.env.SENTRY_RELEASE;
      }
      if (
        utils.GLOBAL_OBJ.SENTRY_RELEASE &&
        utils.GLOBAL_OBJ.SENTRY_RELEASE.id
      ) {
        return utils.GLOBAL_OBJ.SENTRY_RELEASE.id;
      }
      return (
        process.env.GITHUB_SHA ||
        process.env.COMMIT_REF ||
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.VERCEL_GITHUB_COMMIT_SHA ||
        process.env.VERCEL_GITLAB_COMMIT_SHA ||
        process.env.VERCEL_BITBUCKET_COMMIT_SHA ||
        process.env.ZEIT_GITHUB_COMMIT_SHA ||
        process.env.ZEIT_GITLAB_COMMIT_SHA ||
        process.env.ZEIT_BITBUCKET_COMMIT_SHA ||
        fallback
      );
    }
    var defaultStackParser = utils.createStackParser(
      utils.nodeStackLineParser(module$1.getModuleFromFilename),
    );
    function startSessionTracking() {
      const hub = core.getCurrentHub();
      hub.startSession();
      process.on("beforeExit", () => {
        const session = hub.getScope().getSession();
        const terminalStates = ["exited", "crashed"];
        if (session && !terminalStates.includes(session.status))
          hub.endSession();
      });
    }
    function updateScopeFromEnvVariables() {
      const sentryUseEnvironment = (
        process.env.SENTRY_USE_ENVIRONMENT || ""
      ).toLowerCase();
      if (!["false", "n", "no", "off", "0"].includes(sentryUseEnvironment)) {
        const sentryTraceEnv = process.env.SENTRY_TRACE;
        const baggageEnv = process.env.SENTRY_BAGGAGE;
        const { propagationContext } = utils.tracingContextFromHeaders(
          sentryTraceEnv,
          baggageEnv,
        );
        core
          .getCurrentHub()
          .getScope()
          .setPropagationContext(propagationContext);
      }
    }
    exports.close = close;
    exports.defaultIntegrations = defaultIntegrations;
    exports.defaultStackParser = defaultStackParser;
    exports.flush = flush;
    exports.getSentryRelease = getSentryRelease;
    exports.init = init2;
    exports.isAutoSessionTrackingEnabled = isAutoSessionTrackingEnabled;
    exports.lastEventId = lastEventId;
  },
});

// node_modules/@sentry/node/cjs/utils.js
var require_utils3 = __commonJS({
  "node_modules/@sentry/node/cjs/utils.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var path = require("path");
    function deepReadDirSync(targetDir) {
      const targetDirAbsPath = path.resolve(targetDir);
      if (!fs.existsSync(targetDirAbsPath)) {
        throw new Error(
          `Cannot read contents of ${targetDirAbsPath}. Directory does not exist.`,
        );
      }
      if (!fs.statSync(targetDirAbsPath).isDirectory()) {
        throw new Error(
          `Cannot read contents of ${targetDirAbsPath}, because it is not a directory.`,
        );
      }
      const deepReadCurrentDir = (currentDirAbsPath) => {
        return fs
          .readdirSync(currentDirAbsPath)
          .reduce((absPaths, itemName) => {
            const itemAbsPath = path.join(currentDirAbsPath, itemName);
            if (fs.statSync(itemAbsPath).isDirectory()) {
              return absPaths.concat(deepReadCurrentDir(itemAbsPath));
            }
            absPaths.push(itemAbsPath);
            return absPaths;
          }, []);
      };
      return deepReadCurrentDir(targetDirAbsPath).map((absPath) =>
        path.relative(targetDirAbsPath, absPath),
      );
    }
    exports.deepReadDirSync = deepReadDirSync;
  },
});

// node_modules/@sentry/node/cjs/requestDataDeprecated.js
var require_requestDataDeprecated = __commonJS({
  "node_modules/@sentry/node/cjs/requestDataDeprecated.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var requestdata = require_requestdata2();
    function extractRequestData(req, keys) {
      return requestdata.extractRequestData(req, { include: keys });
    }
    function parseRequest(event, req, options = {}) {
      return requestdata.addRequestDataToEvent(event, req, {
        include: options,
      });
    }
    exports.extractRequestData = extractRequestData;
    exports.parseRequest = parseRequest;
  },
});

// node_modules/@sentry/node/cjs/handlers.js
var require_handlers = __commonJS({
  "node_modules/@sentry/node/cjs/handlers.js"(exports) {
    var { _optionalChain } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var utils = require_cjs();
    var requestdata = require_requestdata2();
    var sdk = require_sdk2();
    var requestDataDeprecated = require_requestDataDeprecated();
    function tracingHandler() {
      return function sentryTracingMiddleware(req, res, next) {
        const hub = core.getCurrentHub();
        const options = _optionalChain([
          hub,
          "access",
          (_) => _.getClient,
          "call",
          (_2) => _2(),
          "optionalAccess",
          (_3) => _3.getOptions,
          "call",
          (_4) => _4(),
        ]);
        if (
          !options ||
          options.instrumenter !== "sentry" ||
          _optionalChain([
            req,
            "access",
            (_5) => _5.method,
            "optionalAccess",
            (_6) => _6.toUpperCase,
            "call",
            (_7) => _7(),
          ]) === "OPTIONS" ||
          _optionalChain([
            req,
            "access",
            (_8) => _8.method,
            "optionalAccess",
            (_9) => _9.toUpperCase,
            "call",
            (_10) => _10(),
          ]) === "HEAD"
        ) {
          return next();
        }
        const sentryTrace =
          req.headers && utils.isString(req.headers["sentry-trace"])
            ? req.headers["sentry-trace"]
            : void 0;
        const baggage = _optionalChain([
          req,
          "access",
          (_11) => _11.headers,
          "optionalAccess",
          (_12) => _12.baggage,
        ]);
        const { traceparentData, dynamicSamplingContext, propagationContext } =
          utils.tracingContextFromHeaders(sentryTrace, baggage);
        hub.getScope().setPropagationContext(propagationContext);
        if (!core.hasTracingEnabled(options)) {
          return next();
        }
        const [name, source] = utils.extractPathForTransaction(req, {
          path: true,
          method: true,
        });
        const transaction = core.startTransaction(
          __spreadProps(
            __spreadValues(
              {
                name,
                op: "http.server",
              },
              traceparentData,
            ),
            {
              metadata: {
                dynamicSamplingContext:
                  traceparentData && !dynamicSamplingContext
                    ? {}
                    : dynamicSamplingContext,
                request: req,
                source,
              },
            },
          ),
          { request: requestdata.extractRequestData(req) },
        );
        hub.configureScope((scope) => {
          scope.setSpan(transaction);
        });
        res.__sentry_transaction = transaction;
        res.once("finish", () => {
          setImmediate(() => {
            utils.addRequestDataToTransaction(transaction, req);
            transaction.setHttpStatus(res.statusCode);
            transaction.finish();
          });
        });
        next();
      };
    }
    function convertReqHandlerOptsToAddReqDataOpts(reqHandlerOptions = {}) {
      let addRequestDataOptions;
      if ("include" in reqHandlerOptions) {
        addRequestDataOptions = { include: reqHandlerOptions.include };
      } else {
        const { ip, request, transaction, user } = reqHandlerOptions;
        if (ip || request || transaction || user) {
          addRequestDataOptions = {
            include: utils.dropUndefinedKeys({
              ip,
              request,
              transaction,
              user,
            }),
          };
        }
      }
      return addRequestDataOptions;
    }
    function requestHandler(options) {
      const requestDataOptions = convertReqHandlerOptsToAddReqDataOpts(options);
      const currentHub = core.getCurrentHub();
      const client = currentHub.getClient();
      if (client && sdk.isAutoSessionTrackingEnabled(client)) {
        client.initSessionFlusher();
        const scope = currentHub.getScope();
        if (scope.getSession()) {
          scope.setSession();
        }
      }
      return function sentryRequestMiddleware(req, res, next) {
        if (options && options.flushTimeout && options.flushTimeout > 0) {
          const _end = res.end;
          res.end = function (chunk, encoding, cb) {
            void sdk
              .flush(options.flushTimeout)
              .then(() => {
                _end.call(this, chunk, encoding, cb);
              })
              .then(null, (e) => {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) &&
                  utils.logger.error(e);
                _end.call(this, chunk, encoding, cb);
              });
          };
        }
        core.runWithAsyncContext(() => {
          const currentHub2 = core.getCurrentHub();
          currentHub2.configureScope((scope) => {
            scope.setSDKProcessingMetadata({
              request: req,
              requestDataOptionsFromExpressHandler: requestDataOptions,
            });
            const client2 = currentHub2.getClient();
            if (sdk.isAutoSessionTrackingEnabled(client2)) {
              const scope2 = currentHub2.getScope();
              if (scope2) {
                scope2.setRequestSession({ status: "ok" });
              }
            }
          });
          res.once("finish", () => {
            const client2 = currentHub2.getClient();
            if (sdk.isAutoSessionTrackingEnabled(client2)) {
              setImmediate(() => {
                if (client2 && client2._captureRequestSession) {
                  client2._captureRequestSession();
                }
              });
            }
          });
          next();
        });
      };
    }
    function getStatusCodeFromResponse(error) {
      const statusCode2 =
        error.status ||
        error.statusCode ||
        error.status_code ||
        (error.output && error.output.statusCode);
      return statusCode2 ? parseInt(statusCode2, 10) : 500;
    }
    function defaultShouldHandleError(error) {
      const status = getStatusCodeFromResponse(error);
      return status >= 500;
    }
    function errorHandler(options) {
      return function sentryErrorMiddleware(error, _req, res, next) {
        const shouldHandleError =
          (options && options.shouldHandleError) || defaultShouldHandleError;
        if (shouldHandleError(error)) {
          core.withScope((_scope) => {
            _scope.setSDKProcessingMetadata({ request: _req });
            const transaction = res.__sentry_transaction;
            if (transaction && _scope.getSpan() === void 0) {
              _scope.setSpan(transaction);
            }
            const client = core.getCurrentHub().getClient();
            if (client && sdk.isAutoSessionTrackingEnabled(client)) {
              const isSessionAggregatesMode = client._sessionFlusher !== void 0;
              if (isSessionAggregatesMode) {
                const requestSession = _scope.getRequestSession();
                if (requestSession && requestSession.status !== void 0) {
                  requestSession.status = "crashed";
                }
              }
            }
            _scope.addEventProcessor((event) => {
              utils.addExceptionMechanism(event, {
                type: "middleware",
                handled: false,
              });
              return event;
            });
            const eventId = core.captureException(error);
            res.sentry = eventId;
            next(error);
          });
          return;
        }
        next(error);
      };
    }
    function trpcMiddleware(options = {}) {
      return function ({ path, type, next, rawInput }) {
        const hub = core.getCurrentHub();
        const clientOptions = _optionalChain([
          hub,
          "access",
          (_13) => _13.getClient,
          "call",
          (_14) => _14(),
          "optionalAccess",
          (_15) => _15.getOptions,
          "call",
          (_16) => _16(),
        ]);
        const sentryTransaction = hub.getScope().getTransaction();
        if (sentryTransaction) {
          sentryTransaction.setName(`trpc/${path}`, "route");
          sentryTransaction.op = "rpc.server";
          const trpcContext = {
            procedure_type: type,
          };
          if (
            options.attachRpcInput !== void 0
              ? options.attachRpcInput
              : _optionalChain([
                  clientOptions,
                  "optionalAccess",
                  (_17) => _17.sendDefaultPii,
                ])
          ) {
            trpcContext.input = utils.normalize(rawInput);
          }
          sentryTransaction.setContext("trpc", trpcContext);
        }
        return next();
      };
    }
    exports.extractRequestData = requestDataDeprecated.extractRequestData;
    exports.parseRequest = requestDataDeprecated.parseRequest;
    exports.errorHandler = errorHandler;
    exports.requestHandler = requestHandler;
    exports.tracingHandler = tracingHandler;
    exports.trpcMiddleware = trpcMiddleware;
  },
});

// node_modules/@sentry/node/cjs/integrations/index.js
var require_integrations2 = __commonJS({
  "node_modules/@sentry/node/cjs/integrations/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var console2 = require_console();
    var http2 = require_http3();
    var onuncaughtexception = require_onuncaughtexception();
    var onunhandledrejection = require_onunhandledrejection();
    var linkederrors = require_linkederrors();
    var modules = require_modules();
    var contextlines = require_contextlines();
    var context = require_context();
    var requestdata = require_requestdata3();
    var localvariables = require_localvariables();
    var index = require_undici();
    exports.Console = console2.Console;
    exports.Http = http2.Http;
    exports.OnUncaughtException = onuncaughtexception.OnUncaughtException;
    exports.OnUnhandledRejection = onunhandledrejection.OnUnhandledRejection;
    exports.LinkedErrors = linkederrors.LinkedErrors;
    exports.Modules = modules.Modules;
    exports.ContextLines = contextlines.ContextLines;
    exports.Context = context.Context;
    exports.RequestData = requestdata.RequestData;
    exports.LocalVariables = localvariables.LocalVariables;
    exports.Undici = index.Undici;
  },
});

// node_modules/@sentry/node/cjs/tracing/integrations.js
var require_integrations3 = __commonJS({
  "node_modules/@sentry/node/cjs/tracing/integrations.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tracing = require_cjs3();
    exports.Apollo = tracing.Apollo;
    exports.Express = tracing.Express;
    exports.GraphQL = tracing.GraphQL;
    exports.Mongo = tracing.Mongo;
    exports.Mysql = tracing.Mysql;
    exports.Postgres = tracing.Postgres;
    exports.Prisma = tracing.Prisma;
  },
});

// node_modules/@sentry/node/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@sentry/node/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_cjs2();
    var index = require_tracing2();
    var client = require_client();
    var http2 = require_http();
    var sdk = require_sdk2();
    var requestdata = require_requestdata2();
    var utils = require_utils3();
    var module$1 = require_module();
    var handlers = require_handlers();
    var index$1 = require_integrations2();
    var integrations = require_integrations3();
    var INTEGRATIONS = __spreadValues(
      __spreadValues(__spreadValues({}, core.Integrations), index$1),
      integrations,
    );
    exports.Hub = core.Hub;
    exports.SDK_VERSION = core.SDK_VERSION;
    exports.Scope = core.Scope;
    exports.addBreadcrumb = core.addBreadcrumb;
    exports.addGlobalEventProcessor = core.addGlobalEventProcessor;
    exports.captureCheckIn = core.captureCheckIn;
    exports.captureEvent = core.captureEvent;
    exports.captureException = core.captureException;
    exports.captureMessage = core.captureMessage;
    exports.configureScope = core.configureScope;
    exports.createTransport = core.createTransport;
    exports.extractTraceparentData = core.extractTraceparentData;
    exports.getActiveTransaction = core.getActiveTransaction;
    exports.getCurrentHub = core.getCurrentHub;
    exports.getHubFromCarrier = core.getHubFromCarrier;
    exports.makeMain = core.makeMain;
    exports.runWithAsyncContext = core.runWithAsyncContext;
    exports.setContext = core.setContext;
    exports.setExtra = core.setExtra;
    exports.setExtras = core.setExtras;
    exports.setTag = core.setTag;
    exports.setTags = core.setTags;
    exports.setUser = core.setUser;
    exports.spanStatusfromHttpCode = core.spanStatusfromHttpCode;
    exports.startTransaction = core.startTransaction;
    exports.trace = core.trace;
    exports.withScope = core.withScope;
    exports.autoDiscoverNodePerformanceMonitoringIntegrations =
      index.autoDiscoverNodePerformanceMonitoringIntegrations;
    exports.NodeClient = client.NodeClient;
    exports.makeNodeTransport = http2.makeNodeTransport;
    exports.close = sdk.close;
    exports.defaultIntegrations = sdk.defaultIntegrations;
    exports.defaultStackParser = sdk.defaultStackParser;
    exports.flush = sdk.flush;
    exports.getSentryRelease = sdk.getSentryRelease;
    exports.init = sdk.init;
    exports.lastEventId = sdk.lastEventId;
    exports.DEFAULT_USER_INCLUDES = requestdata.DEFAULT_USER_INCLUDES;
    exports.addRequestDataToEvent = requestdata.addRequestDataToEvent;
    exports.extractRequestData = requestdata.extractRequestData;
    exports.deepReadDirSync = utils.deepReadDirSync;
    exports.getModuleFromFilename = module$1.getModuleFromFilename;
    exports.Handlers = handlers;
    exports.Integrations = INTEGRATIONS;
  },
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (
        typeof Symbol !== "function" ||
        typeof Object.getOwnPropertySymbols !== "function"
      ) {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (
        typeof Object.getOwnPropertyNames === "function" &&
        Object.getOwnPropertyNames(obj).length !== 0
      ) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  },
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  },
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports, module2) {
    "use strict";
    var test = {
      foo: {},
    };
    var $Object = Object;
    module2.exports = function hasProto() {
      return (
        { __proto__: test }.foo === test.foo &&
        !({ __proto__: null } instanceof $Object)
      );
    };
  },
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function () {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function(
        "binder",
        "return function (" +
          boundArgs.join(",") +
          "){ return binder.apply(this,arguments); }",
      )(binder);
      if (target.prototype) {
        var Empty = function Empty2() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  },
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  },
});

// node_modules/has/src/index.js
var require_src3 = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  },
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module2) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function (expressionSyntax) {
      try {
        return $Function(
          '"use strict"; return (' + expressionSyntax + ").constructor;",
        )();
      } catch (e) {}
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function () {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD
      ? (function () {
          try {
            arguments.callee;
            return throwTypeError;
          } catch (calleeThrows) {
            try {
              return $gOPD(arguments, "callee").get;
            } catch (gOPDthrows) {
              return throwTypeError;
            }
          }
        })()
      : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto =
      Object.getPrototypeOf ||
      (hasProto
        ? function (x) {
            return x.__proto__;
          }
        : null);
    var needsEval = {};
    var TypedArray =
      typeof Uint8Array === "undefined" || !getProto
        ? undefined2
        : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%":
        typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%":
        typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%":
        hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%":
        typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%":
        typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%":
        typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%":
        typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%":
        typeof FinalizationRegistry === "undefined"
          ? undefined2
          : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%":
        typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%":
        typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%":
        hasSymbols && getProto
          ? getProto(getProto([][Symbol.iterator]()))
          : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%":
        typeof Map === "undefined" || !hasSymbols || !getProto
          ? undefined2
          : getProto(/* @__PURE__ */ new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%":
        typeof Set === "undefined" || !hasSymbols || !getProto
          ? undefined2
          : getProto(/* @__PURE__ */ new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%":
        typeof SharedArrayBuffer === "undefined"
          ? undefined2
          : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%":
        hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%":
        typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%":
        typeof Uint8ClampedArray === "undefined"
          ? undefined2
          : Uint8ClampedArray,
      "%Uint16Array%":
        typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%":
        typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": [
        "AsyncGeneratorFunction",
        "prototype",
        "prototype",
      ],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    };
    var bind = require_function_bind();
    var hasOwn = require_src3();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError(
          "invalid intrinsic syntax, expected closing `%`",
        );
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError(
          "invalid intrinsic syntax, expected opening `%`",
        );
      }
      var result = [];
      $replace(string, rePropName, function (match, number, quote, subString) {
        result[result.length] = quote
          ? $replace(subString, reEscapeChar, "$1")
          : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError(
            "intrinsic " +
              name +
              " exists, but is not available. Please file an issue!",
          );
        }
        return {
          alias,
          name: intrinsicName,
          value,
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError(
          "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
        );
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic(
        "%" + intrinsicBaseName + "%",
        allowMissing,
      );
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if (
          (first === '"' ||
            first === "'" ||
            first === "`" ||
            last === '"' ||
            last === "'" ||
            last === "`") &&
          first !== last
        ) {
          throw new $SyntaxError(
            "property names with quotes must have matching quotes",
          );
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError(
                "base intrinsic for " +
                  name +
                  " exists, but the property is not available.",
              );
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  },
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply =
      GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(func, "length", {
            value:
              1 + $max(0, originalFunction.length - (arguments.length - 1)),
          });
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  },
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (
        typeof intrinsic === "function" &&
        $indexOf(name, ".prototype.") > -1
      ) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  },
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports, module2) {
    module2.exports = require("util").inspect;
  },
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor =
      Object.getOwnPropertyDescriptor && hasMap
        ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
        : null;
    var mapSize =
      hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function"
        ? mapSizeDescriptor.get
        : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor =
      Object.getOwnPropertyDescriptor && hasSet
        ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
        : null;
    var setSize =
      hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function"
        ? setSizeDescriptor.get
        : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf =
      typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? Symbol.prototype.toString
        : null;
    var hasShammedSymbols =
      typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag =
      typeof Symbol === "function" &&
      Symbol.toStringTag &&
      (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol")
        ? Symbol.toStringTag
        : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO =
      (typeof Reflect === "function"
        ? Reflect.getPrototypeOf
        : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (O) {
            return O.__proto__;
          }
        : null);
    function addNumericSeparator(num, str) {
      if (
        num === Infinity ||
        num === -Infinity ||
        num !== num ||
        (num && num > -1e3 && num < 1e3) ||
        $test.call(/e/, str)
      ) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return (
            $replace.call(intStr, sepRegex, "$&_") +
            "." +
            $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "")
          );
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (
        has(opts, "quoteStyle") &&
        opts.quoteStyle !== "single" &&
        opts.quoteStyle !== "double"
      ) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (
        has(opts, "maxStringLength") &&
        (typeof opts.maxStringLength === "number"
          ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
          : opts.maxStringLength !== null)
      ) {
        throw new TypeError(
          'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
        );
      }
      var customInspect = has(opts, "customInspect")
        ? opts.customInspect
        : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError(
          "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`",
        );
      }
      if (
        has(opts, "indent") &&
        opts.indent !== null &&
        opts.indent !== "	" &&
        !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
      ) {
        throw new TypeError(
          'option "indent" must be "\\t", an integer > 0, or `null`',
        );
      }
      if (
        has(opts, "numericSeparator") &&
        typeof opts.numericSeparator !== "boolean"
      ) {
        throw new TypeError(
          'option "numericSeparator", if provided, must be `true` or `false`',
        );
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator
          ? addNumericSeparator(obj, bigIntStr)
          : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth,
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return (
          "[Function" +
          (name ? ": " + name : " (anonymous)") +
          "]" +
          (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "")
        );
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols
          ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1")
          : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols
          ? markBoxed(symString)
          : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s +=
            " " +
            attrs[i].name +
            "=" +
            wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (
          !("cause" in Error.prototype) &&
          "cause" in obj &&
          !isEnumerable.call(obj, "cause")
        ) {
          return (
            "{ [" +
            String(obj) +
            "] " +
            $join.call(
              $concat.call("[cause]: " + inspect(obj.cause), parts),
              ", ",
            ) +
            " }"
          );
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (
          inspectSymbol &&
          typeof obj[inspectSymbol] === "function" &&
          utilInspect
        ) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (
          customInspect !== "symbol" &&
          typeof obj.inspect === "function"
        ) {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function (value, key) {
            mapParts.push(
              inspect(key, obj, true) + " => " + inspect(value, obj),
            );
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO
          ? gPO(obj) === Object.prototype
          : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag =
          !isPlainObject &&
          toStringTag &&
          Object(obj) === obj &&
          toStringTag in obj
            ? $slice.call(toStr(obj), 8, -1)
            : protoTag
            ? "Object"
            : "";
        var constructorTag =
          isPlainObject || typeof obj.constructor !== "function"
            ? ""
            : obj.constructor.name
            ? obj.constructor.name + " "
            : "";
        var tag =
          constructorTag +
          (stringTag || protoTag
            ? "[" +
              $join.call(
                $concat.call([], stringTag || [], protoTag || []),
                ": ",
              ) +
              "] "
            : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar =
        (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function isArray(obj) {
      return (
        toStr(obj) === "[object Array]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isDate(obj) {
      return (
        toStr(obj) === "[object Date]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isRegExp(obj) {
      return (
        toStr(obj) === "[object RegExp]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isError(obj) {
      return (
        toStr(obj) === "[object Error]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isString(obj) {
      return (
        toStr(obj) === "[object String]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isNumber(obj) {
      return (
        toStr(obj) === "[object Number]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isBoolean(obj) {
      return (
        toStr(obj) === "[object Boolean]" &&
        (!toStringTag || !(typeof obj === "object" && toStringTag in obj))
      );
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {}
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {}
      return false;
    }
    var hasOwn =
      Object.prototype.hasOwnProperty ||
      function (key) {
        return key in this;
      };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {}
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {}
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {}
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {}
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {}
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return (
        typeof x.nodeName === "string" && typeof x.getAttribute === "function"
      );
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer =
          "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return (
          inspectString($slice.call(str, 0, opts.maxStringLength), opts) +
          trailer
        );
      }
      var s = $replace.call(
        $replace.call(str, /(['\\])/g, "\\$1"),
        /[\x00-\x1f]/g,
        lowbyte,
      );
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r",
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent
        ? indentedJoin(entries, indent)
        : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent),
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push(
              "[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj),
            );
          }
        }
      }
      return xs;
    }
  },
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function (list, key) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function (objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function (objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          key,
          next: objects.next,
          value,
        };
      }
    };
    var listHas = function (objects, key) {
      return !!listGetNode(objects, key);
    };
    module2.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function (key) {
          if (!channel.has(key)) {
            throw new $TypeError(
              "Side channel does not contain " + inspect(key),
            );
          }
        },
        get: function (key) {
          if (
            $WeakMap &&
            key &&
            (typeof key === "object" || typeof key === "function")
          ) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function (key) {
          if (
            $WeakMap &&
            key &&
            (typeof key === "object" || typeof key === "function")
          ) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function (key, value) {
          if (
            $WeakMap &&
            key &&
            (typeof key === "object" || typeof key === "function")
          ) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key, value);
          }
        },
      };
      return channel;
    };
  },
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986",
    };
    module2.exports = {
      default: Format.RFC3986,
      formatters: {
        RFC1738: function (value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function (value) {
          return String(value);
        },
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986,
    };
  },
});

// node_modules/qs/lib/utils.js
var require_utils4 = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    })();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj =
        options && options.plainObjects
          ? /* @__PURE__ */ Object.create(null)
          : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (
            (options && (options.plainObjects || options.allowPrototypes)) ||
            !has.call(Object.prototype, source)
          ) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (
              targetItem &&
              typeof targetItem === "object" &&
              item &&
              typeof item === "object"
            ) {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (
          c === 45 ||
          c === 46 ||
          c === 95 ||
          c === 126 ||
          (c >= 48 && c <= 57) ||
          (c >= 65 && c <= 90) ||
          (c >= 97 && c <= 122) ||
          (format === formats.RFC1738 && (c === 40 || c === 41))
        ) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | (c >> 6)] + hexTable[128 | (c & 63)]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out =
            out +
            (hexTable[224 | (c >> 12)] +
              hexTable[128 | ((c >> 6) & 63)] +
              hexTable[128 | (c & 63)]);
          continue;
        }
        i += 1;
        c = 65536 + (((c & 1023) << 10) | (string.charCodeAt(i) & 1023));
        out +=
          hexTable[240 | (c >> 18)] +
          hexTable[128 | ((c >> 12) & 63)] +
          hexTable[128 | ((c >> 6) & 63)] +
          hexTable[128 | (c & 63)];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (
            typeof val === "object" &&
            val !== null &&
            refs.indexOf(val) === -1
          ) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(
        obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj)
      );
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge,
    };
  },
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils4();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      },
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false,
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return (
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean" ||
        typeof v === "symbol" ||
        typeof v === "bigint"
      );
    };
    var sentinel = {};
    var stringify2 = function stringify3(
      object,
      prefix,
      generateArrayPrefix,
      commaRoundTrip,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      sideChannel,
    ) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly
            ? encoder(prefix, defaults.encoder, charset, "key", format)
            : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly
            ? prefix
            : encoder(prefix, defaults.encoder, charset, "key", format);
          return [
            formatter(keyValue) +
              "=" +
              formatter(
                encoder(obj, defaults.encoder, charset, "value", format),
              ),
          ];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix =
        commaRoundTrip && isArray(obj) && obj.length === 1
          ? prefix + "[]"
          : prefix;
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value =
          typeof key === "object" && typeof key.value !== "undefined"
            ? key.value
            : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj)
          ? typeof generateArrayPrefix === "function"
            ? generateArrayPrefix(adjustedPrefix, key)
            : adjustedPrefix
          : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(
          values,
          stringify3(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            strictNullHandling,
            skipNulls,
            generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj)
              ? null
              : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel,
          ),
        );
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (
        opts.encoder !== null &&
        typeof opts.encoder !== "undefined" &&
        typeof opts.encoder !== "function"
      ) {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (
        typeof opts.charset !== "undefined" &&
        opts.charset !== "utf-8" &&
        opts.charset !== "iso-8859-1"
      ) {
        throw new TypeError(
          "The charset option must be either utf-8, iso-8859-1, or undefined",
        );
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix:
          typeof opts.addQueryPrefix === "boolean"
            ? opts.addQueryPrefix
            : defaults.addQueryPrefix,
        allowDots:
          typeof opts.allowDots === "undefined"
            ? defaults.allowDots
            : !!opts.allowDots,
        charset,
        charsetSentinel:
          typeof opts.charsetSentinel === "boolean"
            ? opts.charsetSentinel
            : defaults.charsetSentinel,
        delimiter:
          typeof opts.delimiter === "undefined"
            ? defaults.delimiter
            : opts.delimiter,
        encode:
          typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder:
          typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly:
          typeof opts.encodeValuesOnly === "boolean"
            ? opts.encodeValuesOnly
            : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate:
          typeof opts.serializeDate === "function"
            ? opts.serializeDate
            : defaults.serializeDate,
        skipNulls:
          typeof opts.skipNulls === "boolean"
            ? opts.skipNulls
            : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling:
          typeof opts.strictNullHandling === "boolean"
            ? opts.strictNullHandling
            : defaults.strictNullHandling,
      };
    };
    module2.exports = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (
        opts &&
        "commaRoundTrip" in opts &&
        typeof opts.commaRoundTrip !== "boolean"
      ) {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip =
        generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(
          keys,
          stringify2(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel,
          ),
        );
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  },
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module2) {
    "use strict";
    var utils = require_utils4();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false,
    };
    var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function (val, options) {
      if (
        val &&
        typeof val === "string" &&
        options.comma &&
        val.indexOf(",") > -1
      ) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit =
        options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos =
          bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(
            part.slice(0, pos),
            defaults.decoder,
            charset,
            "key",
          );
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function (encodedVal) {
              return options.decoder(
                encodedVal,
                defaults.decoder,
                charset,
                "value",
              );
            },
          );
        }
        if (
          val &&
          options.interpretNumericEntities &&
          charset === "iso-8859-1"
        ) {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function (chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot =
            root.charAt(0) === "[" && root.charAt(root.length - 1) === "]"
              ? root.slice(1, -1)
              : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            options.parseArrays &&
            index <= options.arrayLimit
          ) {
            obj = [];
            obj[index] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(
      givenKey,
      val,
      options,
      valuesParsed,
    ) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots
        ? givenKey.replace(/\.([^.[]+)/g, "[$1]")
        : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (
        options.depth > 0 &&
        (segment = child.exec(key)) !== null &&
        i < options.depth
      ) {
        i += 1;
        if (
          !options.plainObjects &&
          has.call(Object.prototype, segment[1].slice(1, -1))
        ) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (
        opts.decoder !== null &&
        opts.decoder !== void 0 &&
        typeof opts.decoder !== "function"
      ) {
        throw new TypeError("Decoder has to be a function.");
      }
      if (
        typeof opts.charset !== "undefined" &&
        opts.charset !== "utf-8" &&
        opts.charset !== "iso-8859-1"
      ) {
        throw new TypeError(
          "The charset option must be either utf-8, iso-8859-1, or undefined",
        );
      }
      var charset =
        typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots:
          typeof opts.allowDots === "undefined"
            ? defaults.allowDots
            : !!opts.allowDots,
        allowPrototypes:
          typeof opts.allowPrototypes === "boolean"
            ? opts.allowPrototypes
            : defaults.allowPrototypes,
        allowSparse:
          typeof opts.allowSparse === "boolean"
            ? opts.allowSparse
            : defaults.allowSparse,
        arrayLimit:
          typeof opts.arrayLimit === "number"
            ? opts.arrayLimit
            : defaults.arrayLimit,
        charset,
        charsetSentinel:
          typeof opts.charsetSentinel === "boolean"
            ? opts.charsetSentinel
            : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder:
          typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter:
          typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter)
            ? opts.delimiter
            : defaults.delimiter,
        depth:
          typeof opts.depth === "number" || opts.depth === false
            ? +opts.depth
            : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities:
          typeof opts.interpretNumericEntities === "boolean"
            ? opts.interpretNumericEntities
            : defaults.interpretNumericEntities,
        parameterLimit:
          typeof opts.parameterLimit === "number"
            ? opts.parameterLimit
            : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects:
          typeof opts.plainObjects === "boolean"
            ? opts.plainObjects
            : defaults.plainObjects,
        strictNullHandling:
          typeof opts.strictNullHandling === "boolean"
            ? opts.strictNullHandling
            : defaults.strictNullHandling,
      };
    };
    module2.exports = function (str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(
          key,
          tempObj[key],
          options,
          typeof str === "string",
        );
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  },
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module2) {
    "use strict";
    var stringify2 = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify: stringify2,
    };
  },
});

// functions/create-checkout-session.ts
var create_checkout_session_exports = {};
__export(create_checkout_session_exports, {
  handler: () => handler,
});
module.exports = __toCommonJS(create_checkout_session_exports);
var import_functions = __toESM(require_main(), 1);
var Sentry = __toESM(require_cjs4(), 1);

// node_modules/stripe/esm/platform/NodePlatformFunctions.js
var crypto3 = __toESM(require("crypto"), 1);
var import_events = require("events");

// node_modules/stripe/esm/crypto/NodeCryptoProvider.js
var crypto2 = __toESM(require("crypto"), 1);

// node_modules/stripe/esm/crypto/CryptoProvider.js
var CryptoProvider = class {
  computeHMACSignature(payload, secret) {
    throw new Error("computeHMACSignature not implemented.");
  }
  computeHMACSignatureAsync(payload, secret) {
    throw new Error("computeHMACSignatureAsync not implemented.");
  }
};
var CryptoProviderOnlySupportsAsyncError = class extends Error {};

// node_modules/stripe/esm/crypto/NodeCryptoProvider.js
var NodeCryptoProvider = class extends CryptoProvider {
  computeHMACSignature(payload, secret) {
    return crypto2
      .createHmac("sha256", secret)
      .update(payload, "utf8")
      .digest("hex");
  }
  async computeHMACSignatureAsync(payload, secret) {
    const signature = await this.computeHMACSignature(payload, secret);
    return signature;
  }
};

// node_modules/stripe/esm/net/NodeHttpClient.js
var http = __toESM(require("http"), 1);
var https = __toESM(require("https"), 1);

// node_modules/stripe/esm/net/HttpClient.js
var HttpClient = class {
  getClientName() {
    throw new Error("getClientName not implemented.");
  }
  makeRequest(
    host,
    port,
    path,
    method,
    headers2,
    requestData,
    protocol,
    timeout,
  ) {
    throw new Error("makeRequest not implemented.");
  }
  static makeTimeoutError() {
    const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
    timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
    return timeoutErr;
  }
};
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"];
HttpClient.TIMEOUT_ERROR_CODE = "ETIMEDOUT";
var HttpClientResponse = class {
  constructor(statusCode2, headers2) {
    this._statusCode = statusCode2;
    this._headers = headers2;
  }
  getStatusCode() {
    return this._statusCode;
  }
  getHeaders() {
    return this._headers;
  }
  getRawResponse() {
    throw new Error("getRawResponse not implemented.");
  }
  toStream(streamCompleteCallback) {
    throw new Error("toStream not implemented.");
  }
  toJSON() {
    throw new Error("toJSON not implemented.");
  }
};

// node_modules/stripe/esm/net/NodeHttpClient.js
var defaultHttpAgent = new http.Agent({ keepAlive: true });
var defaultHttpsAgent = new https.Agent({ keepAlive: true });
var NodeHttpClient = class extends HttpClient {
  constructor(agent) {
    super();
    this._agent = agent;
  }
  getClientName() {
    return "node";
  }
  makeRequest(
    host,
    port,
    path,
    method,
    headers2,
    requestData,
    protocol,
    timeout,
  ) {
    const isInsecureConnection = protocol === "http";
    let agent = this._agent;
    if (!agent) {
      agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
    }
    const requestPromise = new Promise((resolve, reject) => {
      const req = (isInsecureConnection ? http : https).request({
        host,
        port,
        path,
        method,
        agent,
        headers: headers2,
        ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5",
      });
      req.setTimeout(timeout, () => {
        req.destroy(HttpClient.makeTimeoutError());
      });
      req.on("response", (res) => {
        resolve(new NodeHttpClientResponse(res));
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.once("socket", (socket) => {
        if (socket.connecting) {
          socket.once(
            isInsecureConnection ? "connect" : "secureConnect",
            () => {
              req.write(requestData);
              req.end();
            },
          );
        } else {
          req.write(requestData);
          req.end();
        }
      });
    });
    return requestPromise;
  }
};
var NodeHttpClientResponse = class extends HttpClientResponse {
  constructor(res) {
    super(res.statusCode, res.headers || {});
    this._res = res;
  }
  getRawResponse() {
    return this._res;
  }
  toStream(streamCompleteCallback) {
    this._res.once("end", () => streamCompleteCallback());
    return this._res;
  }
  toJSON() {
    return new Promise((resolve, reject) => {
      let response = "";
      this._res.setEncoding("utf8");
      this._res.on("data", (chunk) => {
        response += chunk;
      });
      this._res.once("end", () => {
        try {
          resolve(JSON.parse(response));
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

// node_modules/stripe/esm/net/FetchHttpClient.js
var FetchHttpClient = class extends HttpClient {
  constructor(fetchFn) {
    super();
    this._fetchFn = fetchFn;
  }
  getClientName() {
    return "fetch";
  }
  makeRequest(
    host,
    port,
    path,
    method,
    headers2,
    requestData,
    protocol,
    timeout,
  ) {
    const isInsecureConnection = protocol === "http";
    const url = new URL(
      path,
      `${isInsecureConnection ? "http" : "https"}://${host}`,
    );
    url.port = port;
    const methodHasPayload =
      method == "POST" || method == "PUT" || method == "PATCH";
    const body = requestData || (methodHasPayload ? "" : void 0);
    const fetchFn = this._fetchFn || fetch;
    const fetchPromise = fetchFn(url.toString(), {
      method,
      headers: headers2,
      body,
    });
    let pendingTimeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      pendingTimeoutId = setTimeout(() => {
        pendingTimeoutId = null;
        reject(HttpClient.makeTimeoutError());
      }, timeout);
    });
    return Promise.race([fetchPromise, timeoutPromise])
      .then((res) => {
        return new FetchHttpClientResponse(res);
      })
      .finally(() => {
        if (pendingTimeoutId) {
          clearTimeout(pendingTimeoutId);
        }
      });
  }
};
var FetchHttpClientResponse = class extends HttpClientResponse {
  constructor(res) {
    super(
      res.status,
      FetchHttpClientResponse._transformHeadersToObject(res.headers),
    );
    this._res = res;
  }
  getRawResponse() {
    return this._res;
  }
  toStream(streamCompleteCallback) {
    streamCompleteCallback();
    return this._res.body;
  }
  toJSON() {
    return this._res.json();
  }
  static _transformHeadersToObject(headers2) {
    const headersObj = {};
    for (const entry of headers2) {
      if (!Array.isArray(entry) || entry.length != 2) {
        throw new Error(
          "Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.",
        );
      }
      headersObj[entry[0]] = entry[1];
    }
    return headersObj;
  }
};

// node_modules/stripe/esm/crypto/SubtleCryptoProvider.js
var SubtleCryptoProvider = class extends CryptoProvider {
  constructor(subtleCrypto) {
    super();
    this.subtleCrypto = subtleCrypto || crypto.subtle;
  }
  computeHMACSignature(payload, secret) {
    throw new CryptoProviderOnlySupportsAsyncError(
      "SubtleCryptoProvider cannot be used in a synchronous context.",
    );
  }
  async computeHMACSignatureAsync(payload, secret) {
    const encoder = new TextEncoder();
    const key = await this.subtleCrypto.importKey(
      "raw",
      encoder.encode(secret),
      {
        name: "HMAC",
        hash: { name: "SHA-256" },
      },
      false,
      ["sign"],
    );
    const signatureBuffer = await this.subtleCrypto.sign(
      "hmac",
      key,
      encoder.encode(payload),
    );
    const signatureBytes = new Uint8Array(signatureBuffer);
    const signatureHexCodes = new Array(signatureBytes.length);
    for (let i = 0; i < signatureBytes.length; i++) {
      signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
    }
    return signatureHexCodes.join("");
  }
};
var byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) {
  byteHexMapping[i] = i.toString(16).padStart(2, "0");
}

// node_modules/stripe/esm/platform/PlatformFunctions.js
var PlatformFunctions = class {
  constructor() {
    this._fetchFn = null;
    this._agent = null;
  }
  getUname() {
    throw new Error("getUname not implemented.");
  }
  uuid4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 3) | 8;
      return v.toString(16);
    });
  }
  secureCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    const len = a.length;
    let result = 0;
    for (let i = 0; i < len; ++i) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }
  createEmitter() {
    throw new Error("createEmitter not implemented.");
  }
  tryBufferData(data) {
    throw new Error("tryBufferData not implemented.");
  }
  createNodeHttpClient(agent) {
    throw new Error("createNodeHttpClient not implemented.");
  }
  createFetchHttpClient(fetchFn) {
    return new FetchHttpClient(fetchFn);
  }
  createDefaultHttpClient() {
    throw new Error("createDefaultHttpClient not implemented.");
  }
  createNodeCryptoProvider() {
    throw new Error("createNodeCryptoProvider not implemented.");
  }
  createSubtleCryptoProvider(subtleCrypto) {
    return new SubtleCryptoProvider(subtleCrypto);
  }
  createDefaultCryptoProvider() {
    throw new Error("createDefaultCryptoProvider not implemented.");
  }
};

// node_modules/stripe/esm/Error.js
var Error_exports = {};
__export(Error_exports, {
  StripeAPIError: () => StripeAPIError,
  StripeAuthenticationError: () => StripeAuthenticationError,
  StripeCardError: () => StripeCardError,
  StripeConnectionError: () => StripeConnectionError,
  StripeError: () => StripeError,
  StripeIdempotencyError: () => StripeIdempotencyError,
  StripeInvalidGrantError: () => StripeInvalidGrantError,
  StripeInvalidRequestError: () => StripeInvalidRequestError,
  StripePermissionError: () => StripePermissionError,
  StripeRateLimitError: () => StripeRateLimitError,
  StripeSignatureVerificationError: () => StripeSignatureVerificationError,
  StripeUnknownError: () => StripeUnknownError,
  generate: () => generate,
});
var generate = (rawStripeError) => {
  switch (rawStripeError.type) {
    case "card_error":
      return new StripeCardError(rawStripeError);
    case "invalid_request_error":
      return new StripeInvalidRequestError(rawStripeError);
    case "api_error":
      return new StripeAPIError(rawStripeError);
    case "authentication_error":
      return new StripeAuthenticationError(rawStripeError);
    case "rate_limit_error":
      return new StripeRateLimitError(rawStripeError);
    case "idempotency_error":
      return new StripeIdempotencyError(rawStripeError);
    case "invalid_grant":
      return new StripeInvalidGrantError(rawStripeError);
    default:
      return new StripeUnknownError(rawStripeError);
  }
};
var StripeError = class extends Error {
  constructor(raw = {}) {
    super(raw.message);
    this.type = this.constructor.name;
    this.raw = raw;
    this.rawType = raw.type;
    this.code = raw.code;
    this.doc_url = raw.doc_url;
    this.param = raw.param;
    this.detail = raw.detail;
    this.headers = raw.headers;
    this.requestId = raw.requestId;
    this.statusCode = raw.statusCode;
    this.message = raw.message;
    this.charge = raw.charge;
    this.decline_code = raw.decline_code;
    this.payment_intent = raw.payment_intent;
    this.payment_method = raw.payment_method;
    this.payment_method_type = raw.payment_method_type;
    this.setup_intent = raw.setup_intent;
    this.source = raw.source;
  }
};
StripeError.generate = generate;
var StripeCardError = class extends StripeError {};
var StripeInvalidRequestError = class extends StripeError {};
var StripeAPIError = class extends StripeError {};
var StripeAuthenticationError = class extends StripeError {};
var StripePermissionError = class extends StripeError {};
var StripeRateLimitError = class extends StripeError {};
var StripeConnectionError = class extends StripeError {};
var StripeSignatureVerificationError = class extends StripeError {
  constructor(header, payload, raw = {}) {
    super(raw);
    this.header = header;
    this.payload = payload;
  }
};
var StripeIdempotencyError = class extends StripeError {};
var StripeInvalidGrantError = class extends StripeError {};
var StripeUnknownError = class extends StripeError {};

// node_modules/stripe/esm/utils.js
var qs = __toESM(require_lib(), 1);
var OPTIONS_KEYS = [
  "apiKey",
  "idempotencyKey",
  "stripeAccount",
  "apiVersion",
  "maxNetworkRetries",
  "timeout",
  "host",
];
function isOptionsHash(o) {
  return (
    o &&
    typeof o === "object" &&
    OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop))
  );
}
function stringifyRequestData(data) {
  return qs
    .stringify(data, {
      serializeDate: (d) => Math.floor(d.getTime() / 1e3).toString(),
    })
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]");
}
var makeURLInterpolator = (() => {
  const rc = {
    "\n": "\\n",
    '"': '\\"',
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  };
  return (str) => {
    const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
    return (outputs) => {
      return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) =>
        encodeURIComponent(outputs[$1] || ""),
      );
    };
  };
})();
function extractUrlParams(path) {
  const params = path.match(/\{\w+\}/g);
  if (!params) {
    return [];
  }
  return params.map((param) => param.replace(/[{}]/g, ""));
}
function getDataFromArgs(args) {
  if (!Array.isArray(args) || !args[0] || typeof args[0] !== "object") {
    return {};
  }
  if (!isOptionsHash(args[0])) {
    return args.shift();
  }
  const argKeys = Object.keys(args[0]);
  const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
  if (
    optionKeysInArgs.length > 0 &&
    optionKeysInArgs.length !== argKeys.length
  ) {
    emitWarning(
      `Options found in arguments (${optionKeysInArgs.join(
        ", ",
      )}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`,
    );
  }
  return {};
}
function getOptionsFromArgs(args) {
  const opts = {
    auth: null,
    host: null,
    headers: {},
    settings: {},
  };
  if (args.length > 0) {
    const arg = args[args.length - 1];
    if (typeof arg === "string") {
      opts.auth = args.pop();
    } else if (isOptionsHash(arg)) {
      const params = Object.assign({}, args.pop());
      const extraKeys = Object.keys(params).filter(
        (key) => !OPTIONS_KEYS.includes(key),
      );
      if (extraKeys.length) {
        emitWarning(
          `Invalid options found (${extraKeys.join(", ")}); ignoring.`,
        );
      }
      if (params.apiKey) {
        opts.auth = params.apiKey;
      }
      if (params.idempotencyKey) {
        opts.headers["Idempotency-Key"] = params.idempotencyKey;
      }
      if (params.stripeAccount) {
        opts.headers["Stripe-Account"] = params.stripeAccount;
      }
      if (params.apiVersion) {
        opts.headers["Stripe-Version"] = params.apiVersion;
      }
      if (Number.isInteger(params.maxNetworkRetries)) {
        opts.settings.maxNetworkRetries = params.maxNetworkRetries;
      }
      if (Number.isInteger(params.timeout)) {
        opts.settings.timeout = params.timeout;
      }
      if (params.host) {
        opts.host = params.host;
      }
    }
  }
  return opts;
}
function protoExtend(sub) {
  const Super = this;
  const Constructor = Object.prototype.hasOwnProperty.call(sub, "constructor")
    ? sub.constructor
    : function (...args) {
        Super.apply(this, args);
      };
  Object.assign(Constructor, Super);
  Constructor.prototype = Object.create(Super.prototype);
  Object.assign(Constructor.prototype, sub);
  return Constructor;
}
function removeNullish(obj) {
  if (typeof obj !== "object") {
    throw new Error("Argument must be an object");
  }
  return Object.keys(obj).reduce((result, key) => {
    if (obj[key] != null) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}
function normalizeHeaders(obj) {
  if (!(obj && typeof obj === "object")) {
    return obj;
  }
  return Object.keys(obj).reduce((result, header) => {
    result[normalizeHeader(header)] = obj[header];
    return result;
  }, {});
}
function normalizeHeader(header) {
  return header
    .split("-")
    .map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
    .join("-");
}
function callbackifyPromiseWithTimeout(promise, callback) {
  if (callback) {
    return promise.then(
      (res) => {
        setTimeout(() => {
          callback(null, res);
        }, 0);
      },
      (err) => {
        setTimeout(() => {
          callback(err, null);
        }, 0);
      },
    );
  }
  return promise;
}
function pascalToCamelCase(name) {
  if (name === "OAuth") {
    return "oauth";
  } else {
    return name[0].toLowerCase() + name.substring(1);
  }
}
function emitWarning(warning) {
  if (typeof process.emitWarning !== "function") {
    return console.warn(`Stripe: ${warning}`);
  }
  return process.emitWarning(warning, "Stripe");
}
function isObject(obj) {
  const type = typeof obj;
  return (type === "function" || type === "object") && !!obj;
}
function flattenAndStringify(data) {
  const result = {};
  const step = (obj, prevKey) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = prevKey ? `${prevKey}[${key}]` : key;
      if (isObject(value)) {
        if (
          !(value instanceof Uint8Array) &&
          !Object.prototype.hasOwnProperty.call(value, "data")
        ) {
          return step(value, newKey);
        } else {
          result[newKey] = value;
        }
      } else {
        result[newKey] = String(value);
      }
    });
  };
  step(data, null);
  return result;
}
function validateInteger(name, n, defaultVal) {
  if (!Number.isInteger(n)) {
    if (defaultVal !== void 0) {
      return defaultVal;
    } else {
      throw new Error(`${name} must be an integer`);
    }
  }
  return n;
}
function determineProcessUserAgentProperties() {
  return typeof process === "undefined"
    ? {}
    : {
        lang_version: process.version,
        platform: process.platform,
      };
}
function concat(arrays) {
  const totalLength = arrays.reduce((len, array) => len + array.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  arrays.forEach((array) => {
    merged.set(array, offset);
    offset += array.length;
  });
  return merged;
}

// node_modules/stripe/esm/platform/NodePlatformFunctions.js
var import_child_process = require("child_process");
var StreamProcessingError = class extends StripeError {};
var NodePlatformFunctions = class extends PlatformFunctions {
  constructor() {
    super();
    this._exec = import_child_process.exec;
    this._UNAME_CACHE = null;
  }
  uuid4() {
    if (crypto3.randomUUID) {
      return crypto3.randomUUID();
    }
    return super.uuid4();
  }
  getUname() {
    if (!this._UNAME_CACHE) {
      this._UNAME_CACHE = new Promise((resolve, reject) => {
        try {
          this._exec("uname -a", (err, uname) => {
            if (err) {
              return resolve(null);
            }
            resolve(uname);
          });
        } catch (e) {
          resolve(null);
        }
      });
    }
    return this._UNAME_CACHE;
  }
  secureCompare(a, b) {
    if (!a || !b) {
      throw new Error("secureCompare must receive two arguments");
    }
    if (a.length !== b.length) {
      return false;
    }
    if (crypto3.timingSafeEqual) {
      const textEncoder = new TextEncoder();
      const aEncoded = textEncoder.encode(a);
      const bEncoded = textEncoder.encode(b);
      return crypto3.timingSafeEqual(aEncoded, bEncoded);
    }
    return super.secureCompare(a, b);
  }
  createEmitter() {
    return new import_events.EventEmitter();
  }
  tryBufferData(data) {
    if (!(data.file.data instanceof import_events.EventEmitter)) {
      return Promise.resolve(data);
    }
    const bufferArray = [];
    return new Promise((resolve, reject) => {
      data.file.data
        .on("data", (line) => {
          bufferArray.push(line);
        })
        .once("end", () => {
          const bufferData = Object.assign({}, data);
          bufferData.file.data = concat(bufferArray);
          resolve(bufferData);
        })
        .on("error", (err) => {
          reject(
            new StreamProcessingError({
              message:
                "An error occurred while attempting to process the file for upload.",
              detail: err,
            }),
          );
        });
    });
  }
  createNodeHttpClient(agent) {
    return new NodeHttpClient(agent);
  }
  createDefaultHttpClient() {
    return new NodeHttpClient();
  }
  createNodeCryptoProvider() {
    return new NodeCryptoProvider();
  }
  createDefaultCryptoProvider() {
    return this.createNodeCryptoProvider();
  }
};

// node_modules/stripe/esm/apiVersion.js
var ApiVersion = "2022-11-15";

// node_modules/stripe/esm/resources.js
var resources_exports = {};
__export(resources_exports, {
  Account: () => Accounts2,
  AccountLinks: () => AccountLinks,
  Accounts: () => Accounts2,
  ApplePayDomains: () => ApplePayDomains,
  ApplicationFees: () => ApplicationFees,
  Apps: () => Apps,
  Balance: () => Balance,
  BalanceTransactions: () => BalanceTransactions,
  BillingPortal: () => BillingPortal,
  Charges: () => Charges,
  Checkout: () => Checkout,
  CountrySpecs: () => CountrySpecs,
  Coupons: () => Coupons,
  CreditNotes: () => CreditNotes,
  Customers: () => Customers2,
  Disputes: () => Disputes2,
  EphemeralKeys: () => EphemeralKeys,
  Events: () => Events,
  ExchangeRates: () => ExchangeRates,
  FileLinks: () => FileLinks,
  Files: () => Files,
  FinancialConnections: () => FinancialConnections,
  Identity: () => Identity,
  InvoiceItems: () => InvoiceItems,
  Invoices: () => Invoices,
  Issuing: () => Issuing,
  Mandates: () => Mandates,
  OAuth: () => OAuth,
  PaymentIntents: () => PaymentIntents,
  PaymentLinks: () => PaymentLinks,
  PaymentMethods: () => PaymentMethods,
  Payouts: () => Payouts,
  Plans: () => Plans,
  Prices: () => Prices,
  Products: () => Products,
  PromotionCodes: () => PromotionCodes,
  Quotes: () => Quotes,
  Radar: () => Radar,
  Refunds: () => Refunds2,
  Reporting: () => Reporting,
  Reviews: () => Reviews,
  SetupAttempts: () => SetupAttempts,
  SetupIntents: () => SetupIntents,
  ShippingRates: () => ShippingRates,
  Sigma: () => Sigma,
  Sources: () => Sources,
  SubscriptionItems: () => SubscriptionItems,
  SubscriptionSchedules: () => SubscriptionSchedules,
  Subscriptions: () => Subscriptions,
  Tax: () => Tax,
  TaxCodes: () => TaxCodes,
  TaxRates: () => TaxRates,
  Terminal: () => Terminal,
  TestHelpers: () => TestHelpers,
  Tokens: () => Tokens,
  Topups: () => Topups,
  Transfers: () => Transfers,
  Treasury: () => Treasury,
  WebhookEndpoints: () => WebhookEndpoints,
});

// node_modules/stripe/esm/ResourceNamespace.js
function ResourceNamespace(stripe2, resources) {
  for (const name in resources) {
    const camelCaseName = name[0].toLowerCase() + name.substring(1);
    const resource = new resources[name](stripe2);
    this[camelCaseName] = resource;
  }
}
function resourceNamespace(namespace, resources) {
  return function (stripe2) {
    return new ResourceNamespace(stripe2, resources);
  };
}

// node_modules/stripe/esm/autoPagination.js
var StripeIterator = class {
  constructor(firstPagePromise, requestArgs, spec, stripeResource) {
    this.index = 0;
    this.pagePromise = firstPagePromise;
    this.promiseCache = { currentPromise: null };
    this.requestArgs = requestArgs;
    this.spec = spec;
    this.stripeResource = stripeResource;
  }
  async iterate(pageResult) {
    if (
      !(
        pageResult &&
        pageResult.data &&
        typeof pageResult.data.length === "number"
      )
    ) {
      throw Error(
        "Unexpected: Stripe API response does not have a well-formed `data` array.",
      );
    }
    const reverseIteration = isReverseIteration(this.requestArgs);
    if (this.index < pageResult.data.length) {
      const idx = reverseIteration
        ? pageResult.data.length - 1 - this.index
        : this.index;
      const value = pageResult.data[idx];
      this.index += 1;
      return { value, done: false };
    } else if (pageResult.has_more) {
      this.index = 0;
      this.pagePromise = this.getNextPage(pageResult);
      const nextPageResult = await this.pagePromise;
      return this.iterate(nextPageResult);
    }
    return { done: true, value: void 0 };
  }
  getNextPage(_pageResult) {
    throw new Error("Unimplemented");
  }
  async _next() {
    return this.iterate(await this.pagePromise);
  }
  next() {
    if (this.promiseCache.currentPromise) {
      return this.promiseCache.currentPromise;
    }
    const nextPromise = (async () => {
      const ret = await this._next();
      this.promiseCache.currentPromise = null;
      return ret;
    })();
    this.promiseCache.currentPromise = nextPromise;
    return nextPromise;
  }
};
var ListIterator = class extends StripeIterator {
  getNextPage(pageResult) {
    const reverseIteration = isReverseIteration(this.requestArgs);
    const lastId = getLastId(pageResult, reverseIteration);
    return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
      [reverseIteration ? "ending_before" : "starting_after"]: lastId,
    });
  }
};
var SearchIterator = class extends StripeIterator {
  getNextPage(pageResult) {
    if (!pageResult.next_page) {
      throw Error(
        "Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.",
      );
    }
    return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
      page: pageResult.next_page,
    });
  }
};
var makeAutoPaginationMethods = (
  stripeResource,
  requestArgs,
  spec,
  firstPagePromise,
) => {
  if (spec.methodType === "search") {
    return makeAutoPaginationMethodsFromIterator(
      new SearchIterator(firstPagePromise, requestArgs, spec, stripeResource),
    );
  }
  if (spec.methodType === "list") {
    return makeAutoPaginationMethodsFromIterator(
      new ListIterator(firstPagePromise, requestArgs, spec, stripeResource),
    );
  }
  return null;
};
var makeAutoPaginationMethodsFromIterator = (iterator) => {
  const autoPagingEach = makeAutoPagingEach((...args) =>
    iterator.next(...args),
  );
  const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
  const autoPaginationMethods = {
    autoPagingEach,
    autoPagingToArray,
    next: () => iterator.next(),
    return: () => {
      return {};
    },
    [getAsyncIteratorSymbol()]: () => {
      return autoPaginationMethods;
    },
  };
  return autoPaginationMethods;
};
function getAsyncIteratorSymbol() {
  if (typeof Symbol !== "undefined" && Symbol.asyncIterator) {
    return Symbol.asyncIterator;
  }
  return "@@asyncIterator";
}
function getDoneCallback(args) {
  if (args.length < 2) {
    return null;
  }
  const onDone = args[1];
  if (typeof onDone !== "function") {
    throw Error(
      `The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`,
    );
  }
  return onDone;
}
function getItemCallback(args) {
  if (args.length === 0) {
    return void 0;
  }
  const onItem = args[0];
  if (typeof onItem !== "function") {
    throw Error(
      `The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`,
    );
  }
  if (onItem.length === 2) {
    return onItem;
  }
  if (onItem.length > 2) {
    throw Error(
      `The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`,
    );
  }
  return function _onItem(item, next) {
    const shouldContinue = onItem(item);
    next(shouldContinue);
  };
}
function getLastId(listResult, reverseIteration) {
  const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
  const lastItem = listResult.data[lastIdx];
  const lastId = lastItem && lastItem.id;
  if (!lastId) {
    throw Error(
      "Unexpected: No `id` found on the last item while auto-paging a list.",
    );
  }
  return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
  return function autoPagingEach() {
    const args = [].slice.call(arguments);
    const onItem = getItemCallback(args);
    const onDone = getDoneCallback(args);
    if (args.length > 2) {
      throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
    }
    const autoPagePromise = wrapAsyncIteratorWithCallback(
      asyncIteratorNext,
      onItem,
    );
    return callbackifyPromiseWithTimeout(autoPagePromise, onDone);
  };
}
function makeAutoPagingToArray(autoPagingEach) {
  return function autoPagingToArray(opts, onDone) {
    const limit = opts && opts.limit;
    if (!limit) {
      throw Error(
        "You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.",
      );
    }
    if (limit > 1e4) {
      throw Error(
        "You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.",
      );
    }
    const promise = new Promise((resolve, reject) => {
      const items = [];
      autoPagingEach((item) => {
        items.push(item);
        if (items.length >= limit) {
          return false;
        }
      })
        .then(() => {
          resolve(items);
        })
        .catch(reject);
    });
    return callbackifyPromiseWithTimeout(promise, onDone);
  };
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
  return new Promise((resolve, reject) => {
    function handleIteration(iterResult) {
      if (iterResult.done) {
        resolve();
        return;
      }
      const item = iterResult.value;
      return new Promise((next) => {
        onItem(item, next);
      }).then((shouldContinue) => {
        if (shouldContinue === false) {
          return handleIteration({ done: true, value: void 0 });
        } else {
          return asyncIteratorNext().then(handleIteration);
        }
      });
    }
    asyncIteratorNext().then(handleIteration).catch(reject);
  });
}
function isReverseIteration(requestArgs) {
  const args = [].slice.call(requestArgs);
  const dataFromArgs = getDataFromArgs(args);
  return !!dataFromArgs.ending_before;
}

// node_modules/stripe/esm/StripeMethod.js
function stripeMethod(spec) {
  if (spec.path !== void 0 && spec.fullPath !== void 0) {
    throw new Error(
      `Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`,
    );
  }
  return function (...args) {
    const callback = typeof args[args.length - 1] == "function" && args.pop();
    spec.urlParams = extractUrlParams(
      spec.fullPath || this.createResourcePathWithSymbols(spec.path || ""),
    );
    const requestPromise = callbackifyPromiseWithTimeout(
      this._makeRequest(args, spec, {}),
      callback,
    );
    Object.assign(
      requestPromise,
      makeAutoPaginationMethods(this, args, spec, requestPromise),
    );
    return requestPromise;
  };
}

// node_modules/stripe/esm/StripeResource.js
StripeResource.extend = protoExtend;
StripeResource.method = stripeMethod;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
function StripeResource(stripe2, deprecatedUrlData) {
  this._stripe = stripe2;
  if (deprecatedUrlData) {
    throw new Error(
      "Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.",
    );
  }
  this.basePath = makeURLInterpolator(
    this.basePath || stripe2.getApiField("basePath"),
  );
  this.resourcePath = this.path;
  this.path = makeURLInterpolator(this.path);
  this.initialize(...arguments);
}
StripeResource.prototype = {
  _stripe: null,
  path: "",
  resourcePath: "",
  basePath: null,
  initialize() {},
  requestDataProcessor: null,
  validateRequest: null,
  createFullPath(commandPath, urlData) {
    const urlParts = [this.basePath(urlData), this.path(urlData)];
    if (typeof commandPath === "function") {
      const computedCommandPath = commandPath(urlData);
      if (computedCommandPath) {
        urlParts.push(computedCommandPath);
      }
    } else {
      urlParts.push(commandPath);
    }
    return this._joinUrlParts(urlParts);
  },
  createResourcePathWithSymbols(pathWithSymbols) {
    if (pathWithSymbols) {
      return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
    } else {
      return `/${this.resourcePath}`;
    }
  },
  _joinUrlParts(parts) {
    return parts.join("/").replace(/\/{2,}/g, "/");
  },
  _getRequestOpts(requestArgs, spec, overrideData) {
    const requestMethod = (spec.method || "GET").toUpperCase();
    const urlParams = spec.urlParams || [];
    const encode = spec.encode || ((data2) => data2);
    const isUsingFullPath = !!spec.fullPath;
    const commandPath = makeURLInterpolator(
      isUsingFullPath ? spec.fullPath : spec.path || "",
    );
    const path = isUsingFullPath
      ? spec.fullPath
      : this.createResourcePathWithSymbols(spec.path);
    const args = [].slice.call(requestArgs);
    const urlData = urlParams.reduce((urlData2, param) => {
      const arg = args.shift();
      if (typeof arg !== "string") {
        throw new Error(
          `Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`,
        );
      }
      urlData2[param] = arg;
      return urlData2;
    }, {});
    const dataFromArgs = getDataFromArgs(args);
    const data = encode(Object.assign({}, dataFromArgs, overrideData));
    const options = getOptionsFromArgs(args);
    const host = options.host || spec.host;
    const streaming = !!spec.streaming;
    if (args.filter((x) => x != null).length) {
      throw new Error(
        `Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`,
      );
    }
    const requestPath = isUsingFullPath
      ? commandPath(urlData)
      : this.createFullPath(commandPath, urlData);
    const headers2 = Object.assign(options.headers, spec.headers);
    if (spec.validator) {
      spec.validator(data, { headers: headers2 });
    }
    const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
    const bodyData = dataInQuery ? {} : data;
    const queryData = dataInQuery ? data : {};
    return {
      requestMethod,
      requestPath,
      bodyData,
      queryData,
      auth: options.auth,
      headers: headers2,
      host: host !== null && host !== void 0 ? host : null,
      streaming,
      settings: options.settings,
    };
  },
  _makeRequest(requestArgs, spec, overrideData) {
    return new Promise((resolve, reject) => {
      var _a;
      let opts;
      try {
        opts = this._getRequestOpts(requestArgs, spec, overrideData);
      } catch (err) {
        reject(err);
        return;
      }
      function requestCallback(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(
            spec.transformResponseData
              ? spec.transformResponseData(response)
              : response,
          );
        }
      }
      const emptyQuery = Object.keys(opts.queryData).length === 0;
      const path = [
        opts.requestPath,
        emptyQuery ? "" : "?",
        stringifyRequestData(opts.queryData),
      ].join("");
      const { headers: headers2, settings } = opts;
      this._stripe._requestSender._request(
        opts.requestMethod,
        opts.host,
        path,
        opts.bodyData,
        opts.auth,
        { headers: headers2, settings, streaming: opts.streaming },
        requestCallback,
        (_a = this.requestDataProcessor) === null || _a === void 0
          ? void 0
          : _a.bind(this),
      );
    });
  },
};

// node_modules/stripe/esm/resources/FinancialConnections/Accounts.js
var stripeMethod2 = StripeResource.method;
var Accounts = StripeResource.extend({
  retrieve: stripeMethod2({
    method: "GET",
    fullPath: "/v1/financial_connections/accounts/{account}",
  }),
  list: stripeMethod2({
    method: "GET",
    fullPath: "/v1/financial_connections/accounts",
    methodType: "list",
  }),
  disconnect: stripeMethod2({
    method: "POST",
    fullPath: "/v1/financial_connections/accounts/{account}/disconnect",
  }),
  listOwners: stripeMethod2({
    method: "GET",
    fullPath: "/v1/financial_connections/accounts/{account}/owners",
    methodType: "list",
  }),
  refresh: stripeMethod2({
    method: "POST",
    fullPath: "/v1/financial_connections/accounts/{account}/refresh",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Authorizations.js
var stripeMethod3 = StripeResource.method;
var Authorizations = StripeResource.extend({
  retrieve: stripeMethod3({
    method: "GET",
    fullPath: "/v1/issuing/authorizations/{authorization}",
  }),
  update: stripeMethod3({
    method: "POST",
    fullPath: "/v1/issuing/authorizations/{authorization}",
  }),
  list: stripeMethod3({
    method: "GET",
    fullPath: "/v1/issuing/authorizations",
    methodType: "list",
  }),
  approve: stripeMethod3({
    method: "POST",
    fullPath: "/v1/issuing/authorizations/{authorization}/approve",
  }),
  decline: stripeMethod3({
    method: "POST",
    fullPath: "/v1/issuing/authorizations/{authorization}/decline",
  }),
});

// node_modules/stripe/esm/resources/Tax/Calculations.js
var stripeMethod4 = StripeResource.method;
var Calculations = StripeResource.extend({
  create: stripeMethod4({ method: "POST", fullPath: "/v1/tax/calculations" }),
  listLineItems: stripeMethod4({
    method: "GET",
    fullPath: "/v1/tax/calculations/{calculation}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Cardholders.js
var stripeMethod5 = StripeResource.method;
var Cardholders = StripeResource.extend({
  create: stripeMethod5({
    method: "POST",
    fullPath: "/v1/issuing/cardholders",
  }),
  retrieve: stripeMethod5({
    method: "GET",
    fullPath: "/v1/issuing/cardholders/{cardholder}",
  }),
  update: stripeMethod5({
    method: "POST",
    fullPath: "/v1/issuing/cardholders/{cardholder}",
  }),
  list: stripeMethod5({
    method: "GET",
    fullPath: "/v1/issuing/cardholders",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js
var stripeMethod6 = StripeResource.method;
var Cards = StripeResource.extend({
  deliverCard: stripeMethod6({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/deliver",
  }),
  failCard: stripeMethod6({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/fail",
  }),
  returnCard: stripeMethod6({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/return",
  }),
  shipCard: stripeMethod6({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/ship",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Cards.js
var stripeMethod7 = StripeResource.method;
var Cards2 = StripeResource.extend({
  create: stripeMethod7({ method: "POST", fullPath: "/v1/issuing/cards" }),
  retrieve: stripeMethod7({
    method: "GET",
    fullPath: "/v1/issuing/cards/{card}",
  }),
  update: stripeMethod7({
    method: "POST",
    fullPath: "/v1/issuing/cards/{card}",
  }),
  list: stripeMethod7({
    method: "GET",
    fullPath: "/v1/issuing/cards",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/BillingPortal/Configurations.js
var stripeMethod8 = StripeResource.method;
var Configurations = StripeResource.extend({
  create: stripeMethod8({
    method: "POST",
    fullPath: "/v1/billing_portal/configurations",
  }),
  retrieve: stripeMethod8({
    method: "GET",
    fullPath: "/v1/billing_portal/configurations/{configuration}",
  }),
  update: stripeMethod8({
    method: "POST",
    fullPath: "/v1/billing_portal/configurations/{configuration}",
  }),
  list: stripeMethod8({
    method: "GET",
    fullPath: "/v1/billing_portal/configurations",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Terminal/Configurations.js
var stripeMethod9 = StripeResource.method;
var Configurations2 = StripeResource.extend({
  create: stripeMethod9({
    method: "POST",
    fullPath: "/v1/terminal/configurations",
  }),
  retrieve: stripeMethod9({
    method: "GET",
    fullPath: "/v1/terminal/configurations/{configuration}",
  }),
  update: stripeMethod9({
    method: "POST",
    fullPath: "/v1/terminal/configurations/{configuration}",
  }),
  list: stripeMethod9({
    method: "GET",
    fullPath: "/v1/terminal/configurations",
    methodType: "list",
  }),
  del: stripeMethod9({
    method: "DELETE",
    fullPath: "/v1/terminal/configurations/{configuration}",
  }),
});

// node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js
var stripeMethod10 = StripeResource.method;
var ConnectionTokens = StripeResource.extend({
  create: stripeMethod10({
    method: "POST",
    fullPath: "/v1/terminal/connection_tokens",
  }),
});

// node_modules/stripe/esm/resources/Treasury/CreditReversals.js
var stripeMethod11 = StripeResource.method;
var CreditReversals = StripeResource.extend({
  create: stripeMethod11({
    method: "POST",
    fullPath: "/v1/treasury/credit_reversals",
  }),
  retrieve: stripeMethod11({
    method: "GET",
    fullPath: "/v1/treasury/credit_reversals/{credit_reversal}",
  }),
  list: stripeMethod11({
    method: "GET",
    fullPath: "/v1/treasury/credit_reversals",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Customers.js
var stripeMethod12 = StripeResource.method;
var Customers = StripeResource.extend({
  fundCashBalance: stripeMethod12({
    method: "POST",
    fullPath: "/v1/test_helpers/customers/{customer}/fund_cash_balance",
  }),
});

// node_modules/stripe/esm/resources/Treasury/DebitReversals.js
var stripeMethod13 = StripeResource.method;
var DebitReversals = StripeResource.extend({
  create: stripeMethod13({
    method: "POST",
    fullPath: "/v1/treasury/debit_reversals",
  }),
  retrieve: stripeMethod13({
    method: "GET",
    fullPath: "/v1/treasury/debit_reversals/{debit_reversal}",
  }),
  list: stripeMethod13({
    method: "GET",
    fullPath: "/v1/treasury/debit_reversals",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Disputes.js
var stripeMethod14 = StripeResource.method;
var Disputes = StripeResource.extend({
  create: stripeMethod14({ method: "POST", fullPath: "/v1/issuing/disputes" }),
  retrieve: stripeMethod14({
    method: "GET",
    fullPath: "/v1/issuing/disputes/{dispute}",
  }),
  update: stripeMethod14({
    method: "POST",
    fullPath: "/v1/issuing/disputes/{dispute}",
  }),
  list: stripeMethod14({
    method: "GET",
    fullPath: "/v1/issuing/disputes",
    methodType: "list",
  }),
  submit: stripeMethod14({
    method: "POST",
    fullPath: "/v1/issuing/disputes/{dispute}/submit",
  }),
});

// node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js
var stripeMethod15 = StripeResource.method;
var EarlyFraudWarnings = StripeResource.extend({
  retrieve: stripeMethod15({
    method: "GET",
    fullPath: "/v1/radar/early_fraud_warnings/{early_fraud_warning}",
  }),
  list: stripeMethod15({
    method: "GET",
    fullPath: "/v1/radar/early_fraud_warnings",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js
var stripeMethod16 = StripeResource.method;
var FinancialAccounts = StripeResource.extend({
  create: stripeMethod16({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts",
  }),
  retrieve: stripeMethod16({
    method: "GET",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}",
  }),
  update: stripeMethod16({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}",
  }),
  list: stripeMethod16({
    method: "GET",
    fullPath: "/v1/treasury/financial_accounts",
    methodType: "list",
  }),
  retrieveFeatures: stripeMethod16({
    method: "GET",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}/features",
  }),
  updateFeatures: stripeMethod16({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}/features",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js
var stripeMethod17 = StripeResource.method;
var InboundTransfers = StripeResource.extend({
  fail: stripeMethod17({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail",
  }),
  returnInboundTransfer: stripeMethod17({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/return",
  }),
  succeed: stripeMethod17({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed",
  }),
});

// node_modules/stripe/esm/resources/Treasury/InboundTransfers.js
var stripeMethod18 = StripeResource.method;
var InboundTransfers2 = StripeResource.extend({
  create: stripeMethod18({
    method: "POST",
    fullPath: "/v1/treasury/inbound_transfers",
  }),
  retrieve: stripeMethod18({
    method: "GET",
    fullPath: "/v1/treasury/inbound_transfers/{id}",
  }),
  list: stripeMethod18({
    method: "GET",
    fullPath: "/v1/treasury/inbound_transfers",
    methodType: "list",
  }),
  cancel: stripeMethod18({
    method: "POST",
    fullPath: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel",
  }),
});

// node_modules/stripe/esm/resources/Terminal/Locations.js
var stripeMethod19 = StripeResource.method;
var Locations = StripeResource.extend({
  create: stripeMethod19({
    method: "POST",
    fullPath: "/v1/terminal/locations",
  }),
  retrieve: stripeMethod19({
    method: "GET",
    fullPath: "/v1/terminal/locations/{location}",
  }),
  update: stripeMethod19({
    method: "POST",
    fullPath: "/v1/terminal/locations/{location}",
  }),
  list: stripeMethod19({
    method: "GET",
    fullPath: "/v1/terminal/locations",
    methodType: "list",
  }),
  del: stripeMethod19({
    method: "DELETE",
    fullPath: "/v1/terminal/locations/{location}",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js
var stripeMethod20 = StripeResource.method;
var OutboundPayments = StripeResource.extend({
  fail: stripeMethod20({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/fail",
  }),
  post: stripeMethod20({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/post",
  }),
  returnOutboundPayment: stripeMethod20({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/return",
  }),
});

// node_modules/stripe/esm/resources/Treasury/OutboundPayments.js
var stripeMethod21 = StripeResource.method;
var OutboundPayments2 = StripeResource.extend({
  create: stripeMethod21({
    method: "POST",
    fullPath: "/v1/treasury/outbound_payments",
  }),
  retrieve: stripeMethod21({
    method: "GET",
    fullPath: "/v1/treasury/outbound_payments/{id}",
  }),
  list: stripeMethod21({
    method: "GET",
    fullPath: "/v1/treasury/outbound_payments",
    methodType: "list",
  }),
  cancel: stripeMethod21({
    method: "POST",
    fullPath: "/v1/treasury/outbound_payments/{id}/cancel",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js
var stripeMethod22 = StripeResource.method;
var OutboundTransfers = StripeResource.extend({
  fail: stripeMethod22({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail",
  }),
  post: stripeMethod22({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post",
  }),
  returnOutboundTransfer: stripeMethod22({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return",
  }),
});

// node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js
var stripeMethod23 = StripeResource.method;
var OutboundTransfers2 = StripeResource.extend({
  create: stripeMethod23({
    method: "POST",
    fullPath: "/v1/treasury/outbound_transfers",
  }),
  retrieve: stripeMethod23({
    method: "GET",
    fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}",
  }),
  list: stripeMethod23({
    method: "GET",
    fullPath: "/v1/treasury/outbound_transfers",
    methodType: "list",
  }),
  cancel: stripeMethod23({
    method: "POST",
    fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js
var stripeMethod24 = StripeResource.method;
var Readers = StripeResource.extend({
  presentPaymentMethod: stripeMethod24({
    method: "POST",
    fullPath:
      "/v1/test_helpers/terminal/readers/{reader}/present_payment_method",
  }),
});

// node_modules/stripe/esm/resources/Terminal/Readers.js
var stripeMethod25 = StripeResource.method;
var Readers2 = StripeResource.extend({
  create: stripeMethod25({ method: "POST", fullPath: "/v1/terminal/readers" }),
  retrieve: stripeMethod25({
    method: "GET",
    fullPath: "/v1/terminal/readers/{reader}",
  }),
  update: stripeMethod25({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}",
  }),
  list: stripeMethod25({
    method: "GET",
    fullPath: "/v1/terminal/readers",
    methodType: "list",
  }),
  del: stripeMethod25({
    method: "DELETE",
    fullPath: "/v1/terminal/readers/{reader}",
  }),
  cancelAction: stripeMethod25({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/cancel_action",
  }),
  processPaymentIntent: stripeMethod25({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/process_payment_intent",
  }),
  processSetupIntent: stripeMethod25({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/process_setup_intent",
  }),
  refundPayment: stripeMethod25({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/refund_payment",
  }),
  setReaderDisplay: stripeMethod25({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/set_reader_display",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js
var stripeMethod26 = StripeResource.method;
var ReceivedCredits = StripeResource.extend({
  create: stripeMethod26({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/received_credits",
  }),
});

// node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js
var stripeMethod27 = StripeResource.method;
var ReceivedCredits2 = StripeResource.extend({
  retrieve: stripeMethod27({
    method: "GET",
    fullPath: "/v1/treasury/received_credits/{id}",
  }),
  list: stripeMethod27({
    method: "GET",
    fullPath: "/v1/treasury/received_credits",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js
var stripeMethod28 = StripeResource.method;
var ReceivedDebits = StripeResource.extend({
  create: stripeMethod28({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/received_debits",
  }),
});

// node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js
var stripeMethod29 = StripeResource.method;
var ReceivedDebits2 = StripeResource.extend({
  retrieve: stripeMethod29({
    method: "GET",
    fullPath: "/v1/treasury/received_debits/{id}",
  }),
  list: stripeMethod29({
    method: "GET",
    fullPath: "/v1/treasury/received_debits",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Refunds.js
var stripeMethod30 = StripeResource.method;
var Refunds = StripeResource.extend({
  expire: stripeMethod30({
    method: "POST",
    fullPath: "/v1/test_helpers/refunds/{refund}/expire",
  }),
});

// node_modules/stripe/esm/resources/Reporting/ReportRuns.js
var stripeMethod31 = StripeResource.method;
var ReportRuns = StripeResource.extend({
  create: stripeMethod31({
    method: "POST",
    fullPath: "/v1/reporting/report_runs",
  }),
  retrieve: stripeMethod31({
    method: "GET",
    fullPath: "/v1/reporting/report_runs/{report_run}",
  }),
  list: stripeMethod31({
    method: "GET",
    fullPath: "/v1/reporting/report_runs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Reporting/ReportTypes.js
var stripeMethod32 = StripeResource.method;
var ReportTypes = StripeResource.extend({
  retrieve: stripeMethod32({
    method: "GET",
    fullPath: "/v1/reporting/report_types/{report_type}",
  }),
  list: stripeMethod32({
    method: "GET",
    fullPath: "/v1/reporting/report_types",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js
var stripeMethod33 = StripeResource.method;
var ScheduledQueryRuns = StripeResource.extend({
  retrieve: stripeMethod33({
    method: "GET",
    fullPath: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}",
  }),
  list: stripeMethod33({
    method: "GET",
    fullPath: "/v1/sigma/scheduled_query_runs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Apps/Secrets.js
var stripeMethod34 = StripeResource.method;
var Secrets = StripeResource.extend({
  create: stripeMethod34({ method: "POST", fullPath: "/v1/apps/secrets" }),
  list: stripeMethod34({
    method: "GET",
    fullPath: "/v1/apps/secrets",
    methodType: "list",
  }),
  deleteWhere: stripeMethod34({
    method: "POST",
    fullPath: "/v1/apps/secrets/delete",
  }),
  find: stripeMethod34({ method: "GET", fullPath: "/v1/apps/secrets/find" }),
});

// node_modules/stripe/esm/resources/BillingPortal/Sessions.js
var stripeMethod35 = StripeResource.method;
var Sessions = StripeResource.extend({
  create: stripeMethod35({
    method: "POST",
    fullPath: "/v1/billing_portal/sessions",
  }),
});

// node_modules/stripe/esm/resources/Checkout/Sessions.js
var stripeMethod36 = StripeResource.method;
var Sessions2 = StripeResource.extend({
  create: stripeMethod36({ method: "POST", fullPath: "/v1/checkout/sessions" }),
  retrieve: stripeMethod36({
    method: "GET",
    fullPath: "/v1/checkout/sessions/{session}",
  }),
  list: stripeMethod36({
    method: "GET",
    fullPath: "/v1/checkout/sessions",
    methodType: "list",
  }),
  expire: stripeMethod36({
    method: "POST",
    fullPath: "/v1/checkout/sessions/{session}/expire",
  }),
  listLineItems: stripeMethod36({
    method: "GET",
    fullPath: "/v1/checkout/sessions/{session}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/FinancialConnections/Sessions.js
var stripeMethod37 = StripeResource.method;
var Sessions3 = StripeResource.extend({
  create: stripeMethod37({
    method: "POST",
    fullPath: "/v1/financial_connections/sessions",
  }),
  retrieve: stripeMethod37({
    method: "GET",
    fullPath: "/v1/financial_connections/sessions/{session}",
  }),
});

// node_modules/stripe/esm/resources/Tax/Settings.js
var stripeMethod38 = StripeResource.method;
var Settings = StripeResource.extend({
  retrieve: stripeMethod38({ method: "GET", fullPath: "/v1/tax/settings" }),
  update: stripeMethod38({ method: "POST", fullPath: "/v1/tax/settings" }),
});

// node_modules/stripe/esm/resources/TestHelpers/TestClocks.js
var stripeMethod39 = StripeResource.method;
var TestClocks = StripeResource.extend({
  create: stripeMethod39({
    method: "POST",
    fullPath: "/v1/test_helpers/test_clocks",
  }),
  retrieve: stripeMethod39({
    method: "GET",
    fullPath: "/v1/test_helpers/test_clocks/{test_clock}",
  }),
  list: stripeMethod39({
    method: "GET",
    fullPath: "/v1/test_helpers/test_clocks",
    methodType: "list",
  }),
  del: stripeMethod39({
    method: "DELETE",
    fullPath: "/v1/test_helpers/test_clocks/{test_clock}",
  }),
  advance: stripeMethod39({
    method: "POST",
    fullPath: "/v1/test_helpers/test_clocks/{test_clock}/advance",
  }),
});

// node_modules/stripe/esm/resources/Treasury/TransactionEntries.js
var stripeMethod40 = StripeResource.method;
var TransactionEntries = StripeResource.extend({
  retrieve: stripeMethod40({
    method: "GET",
    fullPath: "/v1/treasury/transaction_entries/{id}",
  }),
  list: stripeMethod40({
    method: "GET",
    fullPath: "/v1/treasury/transaction_entries",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Transactions.js
var stripeMethod41 = StripeResource.method;
var Transactions = StripeResource.extend({
  retrieve: stripeMethod41({
    method: "GET",
    fullPath: "/v1/issuing/transactions/{transaction}",
  }),
  update: stripeMethod41({
    method: "POST",
    fullPath: "/v1/issuing/transactions/{transaction}",
  }),
  list: stripeMethod41({
    method: "GET",
    fullPath: "/v1/issuing/transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Tax/Transactions.js
var stripeMethod42 = StripeResource.method;
var Transactions2 = StripeResource.extend({
  retrieve: stripeMethod42({
    method: "GET",
    fullPath: "/v1/tax/transactions/{transaction}",
  }),
  createFromCalculation: stripeMethod42({
    method: "POST",
    fullPath: "/v1/tax/transactions/create_from_calculation",
  }),
  createReversal: stripeMethod42({
    method: "POST",
    fullPath: "/v1/tax/transactions/create_reversal",
  }),
  listLineItems: stripeMethod42({
    method: "GET",
    fullPath: "/v1/tax/transactions/{transaction}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Treasury/Transactions.js
var stripeMethod43 = StripeResource.method;
var Transactions3 = StripeResource.extend({
  retrieve: stripeMethod43({
    method: "GET",
    fullPath: "/v1/treasury/transactions/{id}",
  }),
  list: stripeMethod43({
    method: "GET",
    fullPath: "/v1/treasury/transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Radar/ValueListItems.js
var stripeMethod44 = StripeResource.method;
var ValueListItems = StripeResource.extend({
  create: stripeMethod44({
    method: "POST",
    fullPath: "/v1/radar/value_list_items",
  }),
  retrieve: stripeMethod44({
    method: "GET",
    fullPath: "/v1/radar/value_list_items/{item}",
  }),
  list: stripeMethod44({
    method: "GET",
    fullPath: "/v1/radar/value_list_items",
    methodType: "list",
  }),
  del: stripeMethod44({
    method: "DELETE",
    fullPath: "/v1/radar/value_list_items/{item}",
  }),
});

// node_modules/stripe/esm/resources/Radar/ValueLists.js
var stripeMethod45 = StripeResource.method;
var ValueLists = StripeResource.extend({
  create: stripeMethod45({ method: "POST", fullPath: "/v1/radar/value_lists" }),
  retrieve: stripeMethod45({
    method: "GET",
    fullPath: "/v1/radar/value_lists/{value_list}",
  }),
  update: stripeMethod45({
    method: "POST",
    fullPath: "/v1/radar/value_lists/{value_list}",
  }),
  list: stripeMethod45({
    method: "GET",
    fullPath: "/v1/radar/value_lists",
    methodType: "list",
  }),
  del: stripeMethod45({
    method: "DELETE",
    fullPath: "/v1/radar/value_lists/{value_list}",
  }),
});

// node_modules/stripe/esm/resources/Identity/VerificationReports.js
var stripeMethod46 = StripeResource.method;
var VerificationReports = StripeResource.extend({
  retrieve: stripeMethod46({
    method: "GET",
    fullPath: "/v1/identity/verification_reports/{report}",
  }),
  list: stripeMethod46({
    method: "GET",
    fullPath: "/v1/identity/verification_reports",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Identity/VerificationSessions.js
var stripeMethod47 = StripeResource.method;
var VerificationSessions = StripeResource.extend({
  create: stripeMethod47({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions",
  }),
  retrieve: stripeMethod47({
    method: "GET",
    fullPath: "/v1/identity/verification_sessions/{session}",
  }),
  update: stripeMethod47({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions/{session}",
  }),
  list: stripeMethod47({
    method: "GET",
    fullPath: "/v1/identity/verification_sessions",
    methodType: "list",
  }),
  cancel: stripeMethod47({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions/{session}/cancel",
  }),
  redact: stripeMethod47({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions/{session}/redact",
  }),
});

// node_modules/stripe/esm/resources/Accounts.js
var stripeMethod48 = StripeResource.method;
var Accounts2 = StripeResource.extend({
  create: stripeMethod48({ method: "POST", fullPath: "/v1/accounts" }),
  retrieve(id, ...args) {
    if (typeof id === "string") {
      return stripeMethod48({
        method: "GET",
        fullPath: "/v1/accounts/{id}",
      }).apply(this, [id, ...args]);
    } else {
      if (id === null || id === void 0) {
        [].shift.apply([id, ...args]);
      }
      return stripeMethod48({
        method: "GET",
        fullPath: "/v1/account",
      }).apply(this, [id, ...args]);
    }
  },
  update: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}",
  }),
  list: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts",
    methodType: "list",
  }),
  del: stripeMethod48({ method: "DELETE", fullPath: "/v1/accounts/{account}" }),
  createExternalAccount: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/external_accounts",
  }),
  createLoginLink: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/login_links",
  }),
  createPerson: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/persons",
  }),
  deleteExternalAccount: stripeMethod48({
    method: "DELETE",
    fullPath: "/v1/accounts/{account}/external_accounts/{id}",
  }),
  deletePerson: stripeMethod48({
    method: "DELETE",
    fullPath: "/v1/accounts/{account}/persons/{person}",
  }),
  listCapabilities: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts/{account}/capabilities",
    methodType: "list",
  }),
  listExternalAccounts: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts/{account}/external_accounts",
    methodType: "list",
  }),
  listPersons: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts/{account}/persons",
    methodType: "list",
  }),
  reject: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/reject",
  }),
  retrieveCapability: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts/{account}/capabilities/{capability}",
  }),
  retrieveExternalAccount: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts/{account}/external_accounts/{id}",
  }),
  retrievePerson: stripeMethod48({
    method: "GET",
    fullPath: "/v1/accounts/{account}/persons/{person}",
  }),
  updateCapability: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/capabilities/{capability}",
  }),
  updateExternalAccount: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/external_accounts/{id}",
  }),
  updatePerson: stripeMethod48({
    method: "POST",
    fullPath: "/v1/accounts/{account}/persons/{person}",
  }),
});

// node_modules/stripe/esm/resources/AccountLinks.js
var stripeMethod49 = StripeResource.method;
var AccountLinks = StripeResource.extend({
  create: stripeMethod49({ method: "POST", fullPath: "/v1/account_links" }),
});

// node_modules/stripe/esm/resources/ApplePayDomains.js
var stripeMethod50 = StripeResource.method;
var ApplePayDomains = StripeResource.extend({
  create: stripeMethod50({ method: "POST", fullPath: "/v1/apple_pay/domains" }),
  retrieve: stripeMethod50({
    method: "GET",
    fullPath: "/v1/apple_pay/domains/{domain}",
  }),
  list: stripeMethod50({
    method: "GET",
    fullPath: "/v1/apple_pay/domains",
    methodType: "list",
  }),
  del: stripeMethod50({
    method: "DELETE",
    fullPath: "/v1/apple_pay/domains/{domain}",
  }),
});

// node_modules/stripe/esm/resources/ApplicationFees.js
var stripeMethod51 = StripeResource.method;
var ApplicationFees = StripeResource.extend({
  retrieve: stripeMethod51({
    method: "GET",
    fullPath: "/v1/application_fees/{id}",
  }),
  list: stripeMethod51({
    method: "GET",
    fullPath: "/v1/application_fees",
    methodType: "list",
  }),
  createRefund: stripeMethod51({
    method: "POST",
    fullPath: "/v1/application_fees/{id}/refunds",
  }),
  listRefunds: stripeMethod51({
    method: "GET",
    fullPath: "/v1/application_fees/{id}/refunds",
    methodType: "list",
  }),
  retrieveRefund: stripeMethod51({
    method: "GET",
    fullPath: "/v1/application_fees/{fee}/refunds/{id}",
  }),
  updateRefund: stripeMethod51({
    method: "POST",
    fullPath: "/v1/application_fees/{fee}/refunds/{id}",
  }),
});

// node_modules/stripe/esm/resources/Balance.js
var stripeMethod52 = StripeResource.method;
var Balance = StripeResource.extend({
  retrieve: stripeMethod52({ method: "GET", fullPath: "/v1/balance" }),
});

// node_modules/stripe/esm/resources/BalanceTransactions.js
var stripeMethod53 = StripeResource.method;
var BalanceTransactions = StripeResource.extend({
  retrieve: stripeMethod53({
    method: "GET",
    fullPath: "/v1/balance_transactions/{id}",
  }),
  list: stripeMethod53({
    method: "GET",
    fullPath: "/v1/balance_transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Charges.js
var stripeMethod54 = StripeResource.method;
var Charges = StripeResource.extend({
  create: stripeMethod54({ method: "POST", fullPath: "/v1/charges" }),
  retrieve: stripeMethod54({ method: "GET", fullPath: "/v1/charges/{charge}" }),
  update: stripeMethod54({ method: "POST", fullPath: "/v1/charges/{charge}" }),
  list: stripeMethod54({
    method: "GET",
    fullPath: "/v1/charges",
    methodType: "list",
  }),
  capture: stripeMethod54({
    method: "POST",
    fullPath: "/v1/charges/{charge}/capture",
  }),
  search: stripeMethod54({
    method: "GET",
    fullPath: "/v1/charges/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/CountrySpecs.js
var stripeMethod55 = StripeResource.method;
var CountrySpecs = StripeResource.extend({
  retrieve: stripeMethod55({
    method: "GET",
    fullPath: "/v1/country_specs/{country}",
  }),
  list: stripeMethod55({
    method: "GET",
    fullPath: "/v1/country_specs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Coupons.js
var stripeMethod56 = StripeResource.method;
var Coupons = StripeResource.extend({
  create: stripeMethod56({ method: "POST", fullPath: "/v1/coupons" }),
  retrieve: stripeMethod56({ method: "GET", fullPath: "/v1/coupons/{coupon}" }),
  update: stripeMethod56({ method: "POST", fullPath: "/v1/coupons/{coupon}" }),
  list: stripeMethod56({
    method: "GET",
    fullPath: "/v1/coupons",
    methodType: "list",
  }),
  del: stripeMethod56({ method: "DELETE", fullPath: "/v1/coupons/{coupon}" }),
});

// node_modules/stripe/esm/resources/CreditNotes.js
var stripeMethod57 = StripeResource.method;
var CreditNotes = StripeResource.extend({
  create: stripeMethod57({ method: "POST", fullPath: "/v1/credit_notes" }),
  retrieve: stripeMethod57({
    method: "GET",
    fullPath: "/v1/credit_notes/{id}",
  }),
  update: stripeMethod57({ method: "POST", fullPath: "/v1/credit_notes/{id}" }),
  list: stripeMethod57({
    method: "GET",
    fullPath: "/v1/credit_notes",
    methodType: "list",
  }),
  listLineItems: stripeMethod57({
    method: "GET",
    fullPath: "/v1/credit_notes/{credit_note}/lines",
    methodType: "list",
  }),
  listPreviewLineItems: stripeMethod57({
    method: "GET",
    fullPath: "/v1/credit_notes/preview/lines",
    methodType: "list",
  }),
  preview: stripeMethod57({
    method: "GET",
    fullPath: "/v1/credit_notes/preview",
  }),
  voidCreditNote: stripeMethod57({
    method: "POST",
    fullPath: "/v1/credit_notes/{id}/void",
  }),
});

// node_modules/stripe/esm/resources/Customers.js
var stripeMethod58 = StripeResource.method;
var Customers2 = StripeResource.extend({
  create: stripeMethod58({ method: "POST", fullPath: "/v1/customers" }),
  retrieve: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}",
  }),
  update: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}",
  }),
  list: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers",
    methodType: "list",
  }),
  del: stripeMethod58({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}",
  }),
  createFundingInstructions: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/funding_instructions",
  }),
  createBalanceTransaction: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/balance_transactions",
  }),
  createSource: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/sources",
  }),
  createTaxId: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/tax_ids",
  }),
  deleteDiscount: stripeMethod58({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}/discount",
  }),
  deleteSource: stripeMethod58({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}/sources/{id}",
  }),
  deleteTaxId: stripeMethod58({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}/tax_ids/{id}",
  }),
  listPaymentMethods: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/payment_methods",
    methodType: "list",
  }),
  listBalanceTransactions: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/balance_transactions",
    methodType: "list",
  }),
  listCashBalanceTransactions: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/cash_balance_transactions",
    methodType: "list",
  }),
  listSources: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/sources",
    methodType: "list",
  }),
  listTaxIds: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/tax_ids",
    methodType: "list",
  }),
  retrievePaymentMethod: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/payment_methods/{payment_method}",
  }),
  retrieveBalanceTransaction: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}",
  }),
  retrieveCashBalance: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/cash_balance",
  }),
  retrieveCashBalanceTransaction: stripeMethod58({
    method: "GET",
    fullPath:
      "/v1/customers/{customer}/cash_balance_transactions/{transaction}",
  }),
  retrieveSource: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/sources/{id}",
  }),
  retrieveTaxId: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/{customer}/tax_ids/{id}",
  }),
  search: stripeMethod58({
    method: "GET",
    fullPath: "/v1/customers/search",
    methodType: "search",
  }),
  updateBalanceTransaction: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}",
  }),
  updateCashBalance: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/cash_balance",
  }),
  updateSource: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/sources/{id}",
  }),
  verifySource: stripeMethod58({
    method: "POST",
    fullPath: "/v1/customers/{customer}/sources/{id}/verify",
  }),
});

// node_modules/stripe/esm/resources/Disputes.js
var stripeMethod59 = StripeResource.method;
var Disputes2 = StripeResource.extend({
  retrieve: stripeMethod59({
    method: "GET",
    fullPath: "/v1/disputes/{dispute}",
  }),
  update: stripeMethod59({
    method: "POST",
    fullPath: "/v1/disputes/{dispute}",
  }),
  list: stripeMethod59({
    method: "GET",
    fullPath: "/v1/disputes",
    methodType: "list",
  }),
  close: stripeMethod59({
    method: "POST",
    fullPath: "/v1/disputes/{dispute}/close",
  }),
});

// node_modules/stripe/esm/resources/EphemeralKeys.js
var stripeMethod60 = StripeResource.method;
var EphemeralKeys = StripeResource.extend({
  create: stripeMethod60({
    method: "POST",
    fullPath: "/v1/ephemeral_keys",
    validator: (data, options) => {
      if (!options.headers || !options.headers["Stripe-Version"]) {
        throw new Error(
          "Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node",
        );
      }
    },
  }),
  del: stripeMethod60({
    method: "DELETE",
    fullPath: "/v1/ephemeral_keys/{key}",
  }),
});

// node_modules/stripe/esm/resources/Events.js
var stripeMethod61 = StripeResource.method;
var Events = StripeResource.extend({
  retrieve: stripeMethod61({ method: "GET", fullPath: "/v1/events/{id}" }),
  list: stripeMethod61({
    method: "GET",
    fullPath: "/v1/events",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/ExchangeRates.js
var stripeMethod62 = StripeResource.method;
var ExchangeRates = StripeResource.extend({
  retrieve: stripeMethod62({
    method: "GET",
    fullPath: "/v1/exchange_rates/{rate_id}",
  }),
  list: stripeMethod62({
    method: "GET",
    fullPath: "/v1/exchange_rates",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/FileLinks.js
var stripeMethod63 = StripeResource.method;
var FileLinks = StripeResource.extend({
  create: stripeMethod63({ method: "POST", fullPath: "/v1/file_links" }),
  retrieve: stripeMethod63({
    method: "GET",
    fullPath: "/v1/file_links/{link}",
  }),
  update: stripeMethod63({ method: "POST", fullPath: "/v1/file_links/{link}" }),
  list: stripeMethod63({
    method: "GET",
    fullPath: "/v1/file_links",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/multipart.js
var multipartDataGenerator = (method, data, headers2) => {
  const segno = (
    Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)
  ).toString();
  headers2["Content-Type"] = `multipart/form-data; boundary=${segno}`;
  const textEncoder = new TextEncoder();
  let buffer = new Uint8Array(0);
  const endBuffer = textEncoder.encode("\r\n");
  function push(l) {
    const prevBuffer = buffer;
    const newBuffer =
      l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
    buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
    buffer.set(prevBuffer);
    buffer.set(newBuffer, prevBuffer.length);
    buffer.set(endBuffer, buffer.length - 2);
  }
  function q(s) {
    return `"${s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
  }
  const flattenedData = flattenAndStringify(data);
  for (const k in flattenedData) {
    const v = flattenedData[k];
    push(`--${segno}`);
    if (Object.prototype.hasOwnProperty.call(v, "data")) {
      const typedEntry = v;
      push(
        `Content-Disposition: form-data; name=${q(k)}; filename=${q(
          typedEntry.name || "blob",
        )}`,
      );
      push(`Content-Type: ${typedEntry.type || "application/octet-stream"}`);
      push("");
      push(typedEntry.data);
    } else {
      push(`Content-Disposition: form-data; name=${q(k)}`);
      push("");
      push(v);
    }
  }
  push(`--${segno}--`);
  return buffer;
};
function multipartRequestDataProcessor(method, data, headers2, callback) {
  data = data || {};
  if (method !== "POST") {
    return callback(null, stringifyRequestData(data));
  }
  this._stripe._platformFunctions
    .tryBufferData(data)
    .then((bufferedData) => {
      const buffer = multipartDataGenerator(method, bufferedData, headers2);
      return callback(null, buffer);
    })
    .catch((err) => callback(err, null));
}

// node_modules/stripe/esm/resources/Files.js
var stripeMethod64 = StripeResource.method;
var Files = StripeResource.extend({
  create: stripeMethod64({
    method: "POST",
    fullPath: "/v1/files",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    host: "files.stripe.com",
  }),
  retrieve: stripeMethod64({ method: "GET", fullPath: "/v1/files/{file}" }),
  list: stripeMethod64({
    method: "GET",
    fullPath: "/v1/files",
    methodType: "list",
  }),
  requestDataProcessor: multipartRequestDataProcessor,
});

// node_modules/stripe/esm/resources/InvoiceItems.js
var stripeMethod65 = StripeResource.method;
var InvoiceItems = StripeResource.extend({
  create: stripeMethod65({ method: "POST", fullPath: "/v1/invoiceitems" }),
  retrieve: stripeMethod65({
    method: "GET",
    fullPath: "/v1/invoiceitems/{invoiceitem}",
  }),
  update: stripeMethod65({
    method: "POST",
    fullPath: "/v1/invoiceitems/{invoiceitem}",
  }),
  list: stripeMethod65({
    method: "GET",
    fullPath: "/v1/invoiceitems",
    methodType: "list",
  }),
  del: stripeMethod65({
    method: "DELETE",
    fullPath: "/v1/invoiceitems/{invoiceitem}",
  }),
});

// node_modules/stripe/esm/resources/Invoices.js
var stripeMethod66 = StripeResource.method;
var Invoices = StripeResource.extend({
  create: stripeMethod66({ method: "POST", fullPath: "/v1/invoices" }),
  retrieve: stripeMethod66({
    method: "GET",
    fullPath: "/v1/invoices/{invoice}",
  }),
  update: stripeMethod66({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}",
  }),
  list: stripeMethod66({
    method: "GET",
    fullPath: "/v1/invoices",
    methodType: "list",
  }),
  del: stripeMethod66({ method: "DELETE", fullPath: "/v1/invoices/{invoice}" }),
  finalizeInvoice: stripeMethod66({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/finalize",
  }),
  listLineItems: stripeMethod66({
    method: "GET",
    fullPath: "/v1/invoices/{invoice}/lines",
    methodType: "list",
  }),
  listUpcomingLines: stripeMethod66({
    method: "GET",
    fullPath: "/v1/invoices/upcoming/lines",
    methodType: "list",
  }),
  markUncollectible: stripeMethod66({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/mark_uncollectible",
  }),
  pay: stripeMethod66({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/pay",
  }),
  retrieveUpcoming: stripeMethod66({
    method: "GET",
    fullPath: "/v1/invoices/upcoming",
  }),
  search: stripeMethod66({
    method: "GET",
    fullPath: "/v1/invoices/search",
    methodType: "search",
  }),
  sendInvoice: stripeMethod66({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/send",
  }),
  voidInvoice: stripeMethod66({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/void",
  }),
});

// node_modules/stripe/esm/resources/Mandates.js
var stripeMethod67 = StripeResource.method;
var Mandates = StripeResource.extend({
  retrieve: stripeMethod67({
    method: "GET",
    fullPath: "/v1/mandates/{mandate}",
  }),
});

// node_modules/stripe/esm/resources/OAuth.js
var stripeMethod68 = StripeResource.method;
var oAuthHost = "connect.stripe.com";
var OAuth = StripeResource.extend({
  basePath: "/",
  authorizeUrl(params, options) {
    params = params || {};
    options = options || {};
    let path = "oauth/authorize";
    if (options.express) {
      path = `express/${path}`;
    }
    if (!params.response_type) {
      params.response_type = "code";
    }
    if (!params.client_id) {
      params.client_id = this._stripe.getClientId();
    }
    if (!params.scope) {
      params.scope = "read_write";
    }
    return `https://${oAuthHost}/${path}?${stringifyRequestData(params)}`;
  },
  token: stripeMethod68({
    method: "POST",
    path: "oauth/token",
    host: oAuthHost,
  }),
  deauthorize(spec, ...args) {
    if (!spec.client_id) {
      spec.client_id = this._stripe.getClientId();
    }
    return stripeMethod68({
      method: "POST",
      path: "oauth/deauthorize",
      host: oAuthHost,
    }).apply(this, [spec, ...args]);
  },
});

// node_modules/stripe/esm/resources/PaymentIntents.js
var stripeMethod69 = StripeResource.method;
var PaymentIntents = StripeResource.extend({
  create: stripeMethod69({ method: "POST", fullPath: "/v1/payment_intents" }),
  retrieve: stripeMethod69({
    method: "GET",
    fullPath: "/v1/payment_intents/{intent}",
  }),
  update: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}",
  }),
  list: stripeMethod69({
    method: "GET",
    fullPath: "/v1/payment_intents",
    methodType: "list",
  }),
  applyCustomerBalance: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/apply_customer_balance",
  }),
  cancel: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/cancel",
  }),
  capture: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/capture",
  }),
  confirm: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/confirm",
  }),
  incrementAuthorization: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/increment_authorization",
  }),
  search: stripeMethod69({
    method: "GET",
    fullPath: "/v1/payment_intents/search",
    methodType: "search",
  }),
  verifyMicrodeposits: stripeMethod69({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/verify_microdeposits",
  }),
});

// node_modules/stripe/esm/resources/PaymentLinks.js
var stripeMethod70 = StripeResource.method;
var PaymentLinks = StripeResource.extend({
  create: stripeMethod70({ method: "POST", fullPath: "/v1/payment_links" }),
  retrieve: stripeMethod70({
    method: "GET",
    fullPath: "/v1/payment_links/{payment_link}",
  }),
  update: stripeMethod70({
    method: "POST",
    fullPath: "/v1/payment_links/{payment_link}",
  }),
  list: stripeMethod70({
    method: "GET",
    fullPath: "/v1/payment_links",
    methodType: "list",
  }),
  listLineItems: stripeMethod70({
    method: "GET",
    fullPath: "/v1/payment_links/{payment_link}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/PaymentMethods.js
var stripeMethod71 = StripeResource.method;
var PaymentMethods = StripeResource.extend({
  create: stripeMethod71({ method: "POST", fullPath: "/v1/payment_methods" }),
  retrieve: stripeMethod71({
    method: "GET",
    fullPath: "/v1/payment_methods/{payment_method}",
  }),
  update: stripeMethod71({
    method: "POST",
    fullPath: "/v1/payment_methods/{payment_method}",
  }),
  list: stripeMethod71({
    method: "GET",
    fullPath: "/v1/payment_methods",
    methodType: "list",
  }),
  attach: stripeMethod71({
    method: "POST",
    fullPath: "/v1/payment_methods/{payment_method}/attach",
  }),
  detach: stripeMethod71({
    method: "POST",
    fullPath: "/v1/payment_methods/{payment_method}/detach",
  }),
});

// node_modules/stripe/esm/resources/Payouts.js
var stripeMethod72 = StripeResource.method;
var Payouts = StripeResource.extend({
  create: stripeMethod72({ method: "POST", fullPath: "/v1/payouts" }),
  retrieve: stripeMethod72({ method: "GET", fullPath: "/v1/payouts/{payout}" }),
  update: stripeMethod72({ method: "POST", fullPath: "/v1/payouts/{payout}" }),
  list: stripeMethod72({
    method: "GET",
    fullPath: "/v1/payouts",
    methodType: "list",
  }),
  cancel: stripeMethod72({
    method: "POST",
    fullPath: "/v1/payouts/{payout}/cancel",
  }),
  reverse: stripeMethod72({
    method: "POST",
    fullPath: "/v1/payouts/{payout}/reverse",
  }),
});

// node_modules/stripe/esm/resources/Plans.js
var stripeMethod73 = StripeResource.method;
var Plans = StripeResource.extend({
  create: stripeMethod73({ method: "POST", fullPath: "/v1/plans" }),
  retrieve: stripeMethod73({ method: "GET", fullPath: "/v1/plans/{plan}" }),
  update: stripeMethod73({ method: "POST", fullPath: "/v1/plans/{plan}" }),
  list: stripeMethod73({
    method: "GET",
    fullPath: "/v1/plans",
    methodType: "list",
  }),
  del: stripeMethod73({ method: "DELETE", fullPath: "/v1/plans/{plan}" }),
});

// node_modules/stripe/esm/resources/Prices.js
var stripeMethod74 = StripeResource.method;
var Prices = StripeResource.extend({
  create: stripeMethod74({ method: "POST", fullPath: "/v1/prices" }),
  retrieve: stripeMethod74({ method: "GET", fullPath: "/v1/prices/{price}" }),
  update: stripeMethod74({ method: "POST", fullPath: "/v1/prices/{price}" }),
  list: stripeMethod74({
    method: "GET",
    fullPath: "/v1/prices",
    methodType: "list",
  }),
  search: stripeMethod74({
    method: "GET",
    fullPath: "/v1/prices/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/Products.js
var stripeMethod75 = StripeResource.method;
var Products = StripeResource.extend({
  create: stripeMethod75({ method: "POST", fullPath: "/v1/products" }),
  retrieve: stripeMethod75({ method: "GET", fullPath: "/v1/products/{id}" }),
  update: stripeMethod75({ method: "POST", fullPath: "/v1/products/{id}" }),
  list: stripeMethod75({
    method: "GET",
    fullPath: "/v1/products",
    methodType: "list",
  }),
  del: stripeMethod75({ method: "DELETE", fullPath: "/v1/products/{id}" }),
  search: stripeMethod75({
    method: "GET",
    fullPath: "/v1/products/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/PromotionCodes.js
var stripeMethod76 = StripeResource.method;
var PromotionCodes = StripeResource.extend({
  create: stripeMethod76({ method: "POST", fullPath: "/v1/promotion_codes" }),
  retrieve: stripeMethod76({
    method: "GET",
    fullPath: "/v1/promotion_codes/{promotion_code}",
  }),
  update: stripeMethod76({
    method: "POST",
    fullPath: "/v1/promotion_codes/{promotion_code}",
  }),
  list: stripeMethod76({
    method: "GET",
    fullPath: "/v1/promotion_codes",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Quotes.js
var stripeMethod77 = StripeResource.method;
var Quotes = StripeResource.extend({
  create: stripeMethod77({ method: "POST", fullPath: "/v1/quotes" }),
  retrieve: stripeMethod77({ method: "GET", fullPath: "/v1/quotes/{quote}" }),
  update: stripeMethod77({ method: "POST", fullPath: "/v1/quotes/{quote}" }),
  list: stripeMethod77({
    method: "GET",
    fullPath: "/v1/quotes",
    methodType: "list",
  }),
  accept: stripeMethod77({
    method: "POST",
    fullPath: "/v1/quotes/{quote}/accept",
  }),
  cancel: stripeMethod77({
    method: "POST",
    fullPath: "/v1/quotes/{quote}/cancel",
  }),
  finalizeQuote: stripeMethod77({
    method: "POST",
    fullPath: "/v1/quotes/{quote}/finalize",
  }),
  listComputedUpfrontLineItems: stripeMethod77({
    method: "GET",
    fullPath: "/v1/quotes/{quote}/computed_upfront_line_items",
    methodType: "list",
  }),
  listLineItems: stripeMethod77({
    method: "GET",
    fullPath: "/v1/quotes/{quote}/line_items",
    methodType: "list",
  }),
  pdf: stripeMethod77({
    host: "files.stripe.com",
    method: "GET",
    fullPath: "/v1/quotes/{quote}/pdf",
    streaming: true,
  }),
});

// node_modules/stripe/esm/resources/Refunds.js
var stripeMethod78 = StripeResource.method;
var Refunds2 = StripeResource.extend({
  create: stripeMethod78({ method: "POST", fullPath: "/v1/refunds" }),
  retrieve: stripeMethod78({ method: "GET", fullPath: "/v1/refunds/{refund}" }),
  update: stripeMethod78({ method: "POST", fullPath: "/v1/refunds/{refund}" }),
  list: stripeMethod78({
    method: "GET",
    fullPath: "/v1/refunds",
    methodType: "list",
  }),
  cancel: stripeMethod78({
    method: "POST",
    fullPath: "/v1/refunds/{refund}/cancel",
  }),
});

// node_modules/stripe/esm/resources/Reviews.js
var stripeMethod79 = StripeResource.method;
var Reviews = StripeResource.extend({
  retrieve: stripeMethod79({ method: "GET", fullPath: "/v1/reviews/{review}" }),
  list: stripeMethod79({
    method: "GET",
    fullPath: "/v1/reviews",
    methodType: "list",
  }),
  approve: stripeMethod79({
    method: "POST",
    fullPath: "/v1/reviews/{review}/approve",
  }),
});

// node_modules/stripe/esm/resources/SetupAttempts.js
var stripeMethod80 = StripeResource.method;
var SetupAttempts = StripeResource.extend({
  list: stripeMethod80({
    method: "GET",
    fullPath: "/v1/setup_attempts",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/SetupIntents.js
var stripeMethod81 = StripeResource.method;
var SetupIntents = StripeResource.extend({
  create: stripeMethod81({ method: "POST", fullPath: "/v1/setup_intents" }),
  retrieve: stripeMethod81({
    method: "GET",
    fullPath: "/v1/setup_intents/{intent}",
  }),
  update: stripeMethod81({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}",
  }),
  list: stripeMethod81({
    method: "GET",
    fullPath: "/v1/setup_intents",
    methodType: "list",
  }),
  cancel: stripeMethod81({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}/cancel",
  }),
  confirm: stripeMethod81({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}/confirm",
  }),
  verifyMicrodeposits: stripeMethod81({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}/verify_microdeposits",
  }),
});

// node_modules/stripe/esm/resources/ShippingRates.js
var stripeMethod82 = StripeResource.method;
var ShippingRates = StripeResource.extend({
  create: stripeMethod82({ method: "POST", fullPath: "/v1/shipping_rates" }),
  retrieve: stripeMethod82({
    method: "GET",
    fullPath: "/v1/shipping_rates/{shipping_rate_token}",
  }),
  update: stripeMethod82({
    method: "POST",
    fullPath: "/v1/shipping_rates/{shipping_rate_token}",
  }),
  list: stripeMethod82({
    method: "GET",
    fullPath: "/v1/shipping_rates",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Sources.js
var stripeMethod83 = StripeResource.method;
var Sources = StripeResource.extend({
  create: stripeMethod83({ method: "POST", fullPath: "/v1/sources" }),
  retrieve: stripeMethod83({ method: "GET", fullPath: "/v1/sources/{source}" }),
  update: stripeMethod83({ method: "POST", fullPath: "/v1/sources/{source}" }),
  listSourceTransactions: stripeMethod83({
    method: "GET",
    fullPath: "/v1/sources/{source}/source_transactions",
    methodType: "list",
  }),
  verify: stripeMethod83({
    method: "POST",
    fullPath: "/v1/sources/{source}/verify",
  }),
});

// node_modules/stripe/esm/resources/SubscriptionItems.js
var stripeMethod84 = StripeResource.method;
var SubscriptionItems = StripeResource.extend({
  create: stripeMethod84({
    method: "POST",
    fullPath: "/v1/subscription_items",
  }),
  retrieve: stripeMethod84({
    method: "GET",
    fullPath: "/v1/subscription_items/{item}",
  }),
  update: stripeMethod84({
    method: "POST",
    fullPath: "/v1/subscription_items/{item}",
  }),
  list: stripeMethod84({
    method: "GET",
    fullPath: "/v1/subscription_items",
    methodType: "list",
  }),
  del: stripeMethod84({
    method: "DELETE",
    fullPath: "/v1/subscription_items/{item}",
  }),
  createUsageRecord: stripeMethod84({
    method: "POST",
    fullPath: "/v1/subscription_items/{subscription_item}/usage_records",
  }),
  listUsageRecordSummaries: stripeMethod84({
    method: "GET",
    fullPath:
      "/v1/subscription_items/{subscription_item}/usage_record_summaries",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/SubscriptionSchedules.js
var stripeMethod85 = StripeResource.method;
var SubscriptionSchedules = StripeResource.extend({
  create: stripeMethod85({
    method: "POST",
    fullPath: "/v1/subscription_schedules",
  }),
  retrieve: stripeMethod85({
    method: "GET",
    fullPath: "/v1/subscription_schedules/{schedule}",
  }),
  update: stripeMethod85({
    method: "POST",
    fullPath: "/v1/subscription_schedules/{schedule}",
  }),
  list: stripeMethod85({
    method: "GET",
    fullPath: "/v1/subscription_schedules",
    methodType: "list",
  }),
  cancel: stripeMethod85({
    method: "POST",
    fullPath: "/v1/subscription_schedules/{schedule}/cancel",
  }),
  release: stripeMethod85({
    method: "POST",
    fullPath: "/v1/subscription_schedules/{schedule}/release",
  }),
});

// node_modules/stripe/esm/resources/Subscriptions.js
var stripeMethod86 = StripeResource.method;
var Subscriptions = StripeResource.extend({
  create: stripeMethod86({ method: "POST", fullPath: "/v1/subscriptions" }),
  retrieve: stripeMethod86({
    method: "GET",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  update: stripeMethod86({
    method: "POST",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  list: stripeMethod86({
    method: "GET",
    fullPath: "/v1/subscriptions",
    methodType: "list",
  }),
  cancel: stripeMethod86({
    method: "DELETE",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  del: stripeMethod86({
    method: "DELETE",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  deleteDiscount: stripeMethod86({
    method: "DELETE",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}/discount",
  }),
  resume: stripeMethod86({
    method: "POST",
    fullPath: "/v1/subscriptions/{subscription}/resume",
  }),
  search: stripeMethod86({
    method: "GET",
    fullPath: "/v1/subscriptions/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/TaxCodes.js
var stripeMethod87 = StripeResource.method;
var TaxCodes = StripeResource.extend({
  retrieve: stripeMethod87({ method: "GET", fullPath: "/v1/tax_codes/{id}" }),
  list: stripeMethod87({
    method: "GET",
    fullPath: "/v1/tax_codes",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TaxRates.js
var stripeMethod88 = StripeResource.method;
var TaxRates = StripeResource.extend({
  create: stripeMethod88({ method: "POST", fullPath: "/v1/tax_rates" }),
  retrieve: stripeMethod88({
    method: "GET",
    fullPath: "/v1/tax_rates/{tax_rate}",
  }),
  update: stripeMethod88({
    method: "POST",
    fullPath: "/v1/tax_rates/{tax_rate}",
  }),
  list: stripeMethod88({
    method: "GET",
    fullPath: "/v1/tax_rates",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Tokens.js
var stripeMethod89 = StripeResource.method;
var Tokens = StripeResource.extend({
  create: stripeMethod89({ method: "POST", fullPath: "/v1/tokens" }),
  retrieve: stripeMethod89({ method: "GET", fullPath: "/v1/tokens/{token}" }),
});

// node_modules/stripe/esm/resources/Topups.js
var stripeMethod90 = StripeResource.method;
var Topups = StripeResource.extend({
  create: stripeMethod90({ method: "POST", fullPath: "/v1/topups" }),
  retrieve: stripeMethod90({ method: "GET", fullPath: "/v1/topups/{topup}" }),
  update: stripeMethod90({ method: "POST", fullPath: "/v1/topups/{topup}" }),
  list: stripeMethod90({
    method: "GET",
    fullPath: "/v1/topups",
    methodType: "list",
  }),
  cancel: stripeMethod90({
    method: "POST",
    fullPath: "/v1/topups/{topup}/cancel",
  }),
});

// node_modules/stripe/esm/resources/Transfers.js
var stripeMethod91 = StripeResource.method;
var Transfers = StripeResource.extend({
  create: stripeMethod91({ method: "POST", fullPath: "/v1/transfers" }),
  retrieve: stripeMethod91({
    method: "GET",
    fullPath: "/v1/transfers/{transfer}",
  }),
  update: stripeMethod91({
    method: "POST",
    fullPath: "/v1/transfers/{transfer}",
  }),
  list: stripeMethod91({
    method: "GET",
    fullPath: "/v1/transfers",
    methodType: "list",
  }),
  createReversal: stripeMethod91({
    method: "POST",
    fullPath: "/v1/transfers/{id}/reversals",
  }),
  listReversals: stripeMethod91({
    method: "GET",
    fullPath: "/v1/transfers/{id}/reversals",
    methodType: "list",
  }),
  retrieveReversal: stripeMethod91({
    method: "GET",
    fullPath: "/v1/transfers/{transfer}/reversals/{id}",
  }),
  updateReversal: stripeMethod91({
    method: "POST",
    fullPath: "/v1/transfers/{transfer}/reversals/{id}",
  }),
});

// node_modules/stripe/esm/resources/WebhookEndpoints.js
var stripeMethod92 = StripeResource.method;
var WebhookEndpoints = StripeResource.extend({
  create: stripeMethod92({ method: "POST", fullPath: "/v1/webhook_endpoints" }),
  retrieve: stripeMethod92({
    method: "GET",
    fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
  }),
  update: stripeMethod92({
    method: "POST",
    fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
  }),
  list: stripeMethod92({
    method: "GET",
    fullPath: "/v1/webhook_endpoints",
    methodType: "list",
  }),
  del: stripeMethod92({
    method: "DELETE",
    fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
  }),
});

// node_modules/stripe/esm/resources.js
var Apps = resourceNamespace("apps", { Secrets });
var BillingPortal = resourceNamespace("billingPortal", {
  Configurations,
  Sessions,
});
var Checkout = resourceNamespace("checkout", {
  Sessions: Sessions2,
});
var FinancialConnections = resourceNamespace("financialConnections", {
  Accounts,
  Sessions: Sessions3,
});
var Identity = resourceNamespace("identity", {
  VerificationReports,
  VerificationSessions,
});
var Issuing = resourceNamespace("issuing", {
  Authorizations,
  Cardholders,
  Cards: Cards2,
  Disputes,
  Transactions,
});
var Radar = resourceNamespace("radar", {
  EarlyFraudWarnings,
  ValueListItems,
  ValueLists,
});
var Reporting = resourceNamespace("reporting", {
  ReportRuns,
  ReportTypes,
});
var Sigma = resourceNamespace("sigma", {
  ScheduledQueryRuns,
});
var Tax = resourceNamespace("tax", {
  Calculations,
  Settings,
  Transactions: Transactions2,
});
var Terminal = resourceNamespace("terminal", {
  Configurations: Configurations2,
  ConnectionTokens,
  Locations,
  Readers: Readers2,
});
var TestHelpers = resourceNamespace("testHelpers", {
  Customers,
  Refunds,
  TestClocks,
  Issuing: resourceNamespace("issuing", { Cards }),
  Terminal: resourceNamespace("terminal", {
    Readers,
  }),
  Treasury: resourceNamespace("treasury", {
    InboundTransfers,
    OutboundPayments,
    OutboundTransfers,
    ReceivedCredits,
    ReceivedDebits,
  }),
});
var Treasury = resourceNamespace("treasury", {
  CreditReversals,
  DebitReversals,
  FinancialAccounts,
  InboundTransfers: InboundTransfers2,
  OutboundPayments: OutboundPayments2,
  OutboundTransfers: OutboundTransfers2,
  ReceivedCredits: ReceivedCredits2,
  ReceivedDebits: ReceivedDebits2,
  TransactionEntries,
  Transactions: Transactions3,
});

// node_modules/stripe/esm/RequestSender.js
var MAX_RETRY_AFTER_WAIT = 60;
var RequestSender = class {
  constructor(stripe2, maxBufferedRequestMetric) {
    this._stripe = stripe2;
    this._maxBufferedRequestMetric = maxBufferedRequestMetric;
  }
  _addHeadersDirectlyToObject(obj, headers2) {
    obj.requestId = headers2["request-id"];
    obj.stripeAccount = obj.stripeAccount || headers2["stripe-account"];
    obj.apiVersion = obj.apiVersion || headers2["stripe-version"];
    obj.idempotencyKey = obj.idempotencyKey || headers2["idempotency-key"];
  }
  _makeResponseEvent(requestEvent, statusCode2, headers2) {
    const requestEndTime = Date.now();
    const requestDurationMs = requestEndTime - requestEvent.request_start_time;
    return removeNullish({
      api_version: headers2["stripe-version"],
      account: headers2["stripe-account"],
      idempotency_key: headers2["idempotency-key"],
      method: requestEvent.method,
      path: requestEvent.path,
      status: statusCode2,
      request_id: this._getRequestId(headers2),
      elapsed: requestDurationMs,
      request_start_time: requestEvent.request_start_time,
      request_end_time: requestEndTime,
    });
  }
  _getRequestId(headers2) {
    return headers2["request-id"];
  }
  _streamingResponseHandler(requestEvent, callback) {
    return (res) => {
      const headers2 = res.getHeaders();
      const streamCompleteCallback = () => {
        const responseEvent = this._makeResponseEvent(
          requestEvent,
          res.getStatusCode(),
          headers2,
        );
        this._stripe._emitter.emit("response", responseEvent);
        this._recordRequestMetrics(
          this._getRequestId(headers2),
          responseEvent.elapsed,
        );
      };
      const stream = res.toStream(streamCompleteCallback);
      this._addHeadersDirectlyToObject(stream, headers2);
      return callback(null, stream);
    };
  }
  _jsonResponseHandler(requestEvent, callback) {
    return (res) => {
      const headers2 = res.getHeaders();
      const requestId = this._getRequestId(headers2);
      const statusCode2 = res.getStatusCode();
      const responseEvent = this._makeResponseEvent(
        requestEvent,
        statusCode2,
        headers2,
      );
      this._stripe._emitter.emit("response", responseEvent);
      res
        .toJSON()
        .then(
          (jsonResponse) => {
            if (jsonResponse.error) {
              let err;
              if (typeof jsonResponse.error === "string") {
                jsonResponse.error = {
                  type: jsonResponse.error,
                  message: jsonResponse.error_description,
                };
              }
              jsonResponse.error.headers = headers2;
              jsonResponse.error.statusCode = statusCode2;
              jsonResponse.error.requestId = requestId;
              if (statusCode2 === 401) {
                err = new StripeAuthenticationError(jsonResponse.error);
              } else if (statusCode2 === 403) {
                err = new StripePermissionError(jsonResponse.error);
              } else if (statusCode2 === 429) {
                err = new StripeRateLimitError(jsonResponse.error);
              } else {
                err = StripeError.generate(jsonResponse.error);
              }
              throw err;
            }
            return jsonResponse;
          },
          (e) => {
            throw new StripeAPIError({
              message: "Invalid JSON received from the Stripe API",
              exception: e,
              requestId: headers2["request-id"],
            });
          },
        )
        .then(
          (jsonResponse) => {
            this._recordRequestMetrics(requestId, responseEvent.elapsed);
            const rawResponse = res.getRawResponse();
            this._addHeadersDirectlyToObject(rawResponse, headers2);
            Object.defineProperty(jsonResponse, "lastResponse", {
              enumerable: false,
              writable: false,
              value: rawResponse,
            });
            callback(null, jsonResponse);
          },
          (e) => callback(e, null),
        );
    };
  }
  static _generateConnectionErrorMessage(requestRetries) {
    return `An error occurred with our connection to Stripe.${
      requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""
    }`;
  }
  static _shouldRetry(res, numRetries, maxRetries, error) {
    if (
      error &&
      numRetries === 0 &&
      HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)
    ) {
      return true;
    }
    if (numRetries >= maxRetries) {
      return false;
    }
    if (!res) {
      return true;
    }
    if (res.getHeaders()["stripe-should-retry"] === "false") {
      return false;
    }
    if (res.getHeaders()["stripe-should-retry"] === "true") {
      return true;
    }
    if (res.getStatusCode() === 409) {
      return true;
    }
    if (res.getStatusCode() >= 500) {
      return true;
    }
    return false;
  }
  _getSleepTimeInMS(numRetries, retryAfter = null) {
    const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
    const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
    let sleepSeconds = Math.min(
      initialNetworkRetryDelay * Math.pow(numRetries - 1, 2),
      maxNetworkRetryDelay,
    );
    sleepSeconds *= 0.5 * (1 + Math.random());
    sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
    if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
      sleepSeconds = Math.max(sleepSeconds, retryAfter);
    }
    return sleepSeconds * 1e3;
  }
  _getMaxNetworkRetries(settings = {}) {
    return settings.maxNetworkRetries &&
      Number.isInteger(settings.maxNetworkRetries)
      ? settings.maxNetworkRetries
      : this._stripe.getMaxNetworkRetries();
  }
  _defaultIdempotencyKey(method, settings) {
    const maxRetries = this._getMaxNetworkRetries(settings);
    if (method === "POST" && maxRetries > 0) {
      return `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
    }
    return null;
  }
  _makeHeaders(
    auth,
    contentLength,
    apiVersion,
    clientUserAgent,
    method,
    userSuppliedHeaders,
    userSuppliedSettings,
  ) {
    const defaultHeaders = {
      Authorization: auth ? `Bearer ${auth}` : this._stripe.getApiField("auth"),
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": this._getUserAgentString(),
      "X-Stripe-Client-User-Agent": clientUserAgent,
      "X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
      "Stripe-Version": apiVersion,
      "Stripe-Account": this._stripe.getApiField("stripeAccount"),
      "Idempotency-Key": this._defaultIdempotencyKey(
        method,
        userSuppliedSettings,
      ),
    };
    const methodHasPayload =
      method == "POST" || method == "PUT" || method == "PATCH";
    if (methodHasPayload || contentLength) {
      if (!methodHasPayload) {
        emitWarning(
          `${method} method had non-zero contentLength but no payload is expected for this verb`,
        );
      }
      defaultHeaders["Content-Length"] = contentLength;
    }
    return Object.assign(
      removeNullish(defaultHeaders),
      normalizeHeaders(userSuppliedHeaders),
    );
  }
  _getUserAgentString() {
    const packageVersion = this._stripe.getConstant("PACKAGE_VERSION");
    const appInfo = this._stripe._appInfo
      ? this._stripe.getAppInfoAsString()
      : "";
    return `Stripe/v1 NodeBindings/${packageVersion} ${appInfo}`.trim();
  }
  _getTelemetryHeader() {
    if (
      this._stripe.getTelemetryEnabled() &&
      this._stripe._prevRequestMetrics.length > 0
    ) {
      const metrics = this._stripe._prevRequestMetrics.shift();
      return JSON.stringify({
        last_request_metrics: metrics,
      });
    }
  }
  _recordRequestMetrics(requestId, requestDurationMs) {
    if (this._stripe.getTelemetryEnabled() && requestId) {
      if (
        this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric
      ) {
        emitWarning(
          "Request metrics buffer is full, dropping telemetry message.",
        );
      } else {
        this._stripe._prevRequestMetrics.push({
          request_id: requestId,
          request_duration_ms: requestDurationMs,
        });
      }
    }
  }
  _request(
    method,
    host,
    path,
    data,
    auth,
    options = {},
    callback,
    requestDataProcessor = null,
  ) {
    let requestData;
    const retryRequest = (
      requestFn,
      apiVersion,
      headers2,
      requestRetries,
      retryAfter,
    ) => {
      return setTimeout(
        requestFn,
        this._getSleepTimeInMS(requestRetries, retryAfter),
        apiVersion,
        headers2,
        requestRetries + 1,
      );
    };
    const makeRequest = (apiVersion, headers2, numRetries) => {
      const timeout =
        options.settings &&
        options.settings.timeout &&
        Number.isInteger(options.settings.timeout) &&
        options.settings.timeout >= 0
          ? options.settings.timeout
          : this._stripe.getApiField("timeout");
      const req = this._stripe
        .getApiField("httpClient")
        .makeRequest(
          host || this._stripe.getApiField("host"),
          this._stripe.getApiField("port"),
          path,
          method,
          headers2,
          requestData,
          this._stripe.getApiField("protocol"),
          timeout,
        );
      const requestStartTime = Date.now();
      const requestEvent = removeNullish({
        api_version: apiVersion,
        account: headers2["Stripe-Account"],
        idempotency_key: headers2["Idempotency-Key"],
        method,
        path,
        request_start_time: requestStartTime,
      });
      const requestRetries = numRetries || 0;
      const maxRetries = this._getMaxNetworkRetries(options.settings || {});
      this._stripe._emitter.emit("request", requestEvent);
      req
        .then((res) => {
          if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
            return retryRequest(
              makeRequest,
              apiVersion,
              headers2,
              requestRetries,
              res.getHeaders()["retry-after"],
            );
          } else if (options.streaming && res.getStatusCode() < 400) {
            return this._streamingResponseHandler(requestEvent, callback)(res);
          } else {
            return this._jsonResponseHandler(requestEvent, callback)(res);
          }
        })
        .catch((error) => {
          if (
            RequestSender._shouldRetry(null, requestRetries, maxRetries, error)
          ) {
            return retryRequest(
              makeRequest,
              apiVersion,
              headers2,
              requestRetries,
              null,
            );
          } else {
            const isTimeoutError =
              error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE;
            return callback(
              new StripeConnectionError({
                message: isTimeoutError
                  ? `Request aborted due to timeout being reached (${timeout}ms)`
                  : RequestSender._generateConnectionErrorMessage(
                      requestRetries,
                    ),
                detail: error,
              }),
            );
          }
        });
    };
    const prepareAndMakeRequest = (error, data2) => {
      if (error) {
        return callback(error);
      }
      requestData = data2;
      this._stripe.getClientUserAgent((clientUserAgent) => {
        var _a, _b;
        const apiVersion = this._stripe.getApiField("version");
        const headers2 = this._makeHeaders(
          auth,
          requestData.length,
          apiVersion,
          clientUserAgent,
          method,
          (_a = options.headers) !== null && _a !== void 0 ? _a : null,
          (_b = options.settings) !== null && _b !== void 0 ? _b : {},
        );
        makeRequest(apiVersion, headers2, 0);
      });
    };
    if (requestDataProcessor) {
      requestDataProcessor(
        method,
        data,
        options.headers,
        prepareAndMakeRequest,
      );
    } else {
      prepareAndMakeRequest(null, stringifyRequestData(data || {}));
    }
  }
};

// node_modules/stripe/esm/Webhooks.js
function createWebhooks(platformFunctions) {
  const Webhook = {
    DEFAULT_TOLERANCE: 300,
    signature: null,
    constructEvent(
      payload,
      header,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt,
    ) {
      try {
        this.signature.verifyHeader(
          payload,
          header,
          secret,
          tolerance || Webhook.DEFAULT_TOLERANCE,
          cryptoProvider,
          receivedAt,
        );
      } catch (e) {
        if (e instanceof CryptoProviderOnlySupportsAsyncError) {
          e.message +=
            "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`";
        }
        throw e;
      }
      const jsonPayload =
        payload instanceof Uint8Array
          ? JSON.parse(new TextDecoder("utf8").decode(payload))
          : JSON.parse(payload);
      return jsonPayload;
    },
    async constructEventAsync(
      payload,
      header,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt,
    ) {
      await this.signature.verifyHeaderAsync(
        payload,
        header,
        secret,
        tolerance || Webhook.DEFAULT_TOLERANCE,
        cryptoProvider,
        receivedAt,
      );
      const jsonPayload =
        payload instanceof Uint8Array
          ? JSON.parse(new TextDecoder("utf8").decode(payload))
          : JSON.parse(payload);
      return jsonPayload;
    },
    generateTestHeaderString: function (opts) {
      if (!opts) {
        throw new StripeError({
          message: "Options are required",
        });
      }
      opts.timestamp =
        Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
      opts.scheme = opts.scheme || signature.EXPECTED_SCHEME;
      opts.cryptoProvider = opts.cryptoProvider || getCryptoProvider();
      opts.signature =
        opts.signature ||
        opts.cryptoProvider.computeHMACSignature(
          opts.timestamp + "." + opts.payload,
          opts.secret,
        );
      const generatedHeader = [
        "t=" + opts.timestamp,
        opts.scheme + "=" + opts.signature,
      ].join(",");
      return generatedHeader;
    },
  };
  const signature = {
    EXPECTED_SCHEME: "v1",
    verifyHeader(
      encodedPayload,
      encodedHeader,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt,
    ) {
      const {
        decodedHeader: header,
        decodedPayload: payload,
        details,
        suspectPayloadType,
      } = parseEventDetails(
        encodedPayload,
        encodedHeader,
        this.EXPECTED_SCHEME,
      );
      const secretContainsWhitespace = /\s/.test(secret);
      cryptoProvider = cryptoProvider || getCryptoProvider();
      const expectedSignature = cryptoProvider.computeHMACSignature(
        makeHMACContent(payload, details),
        secret,
      );
      validateComputedSignature(
        payload,
        header,
        details,
        expectedSignature,
        tolerance,
        suspectPayloadType,
        secretContainsWhitespace,
        receivedAt,
      );
      return true;
    },
    async verifyHeaderAsync(
      encodedPayload,
      encodedHeader,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt,
    ) {
      const {
        decodedHeader: header,
        decodedPayload: payload,
        details,
        suspectPayloadType,
      } = parseEventDetails(
        encodedPayload,
        encodedHeader,
        this.EXPECTED_SCHEME,
      );
      const secretContainsWhitespace = /\s/.test(secret);
      cryptoProvider = cryptoProvider || getCryptoProvider();
      const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(
        makeHMACContent(payload, details),
        secret,
      );
      return validateComputedSignature(
        payload,
        header,
        details,
        expectedSignature,
        tolerance,
        suspectPayloadType,
        secretContainsWhitespace,
        receivedAt,
      );
    },
  };
  function makeHMACContent(payload, details) {
    return `${details.timestamp}.${payload}`;
  }
  function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
    if (!encodedPayload) {
      throw new StripeSignatureVerificationError(
        encodedHeader,
        encodedPayload,
        {
          message: "No webhook payload was provided.",
        },
      );
    }
    const suspectPayloadType =
      typeof encodedPayload != "string" &&
      !(encodedPayload instanceof Uint8Array);
    const textDecoder = new TextDecoder("utf8");
    const decodedPayload =
      encodedPayload instanceof Uint8Array
        ? textDecoder.decode(encodedPayload)
        : encodedPayload;
    if (Array.isArray(encodedHeader)) {
      throw new Error(
        "Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.",
      );
    }
    if (encodedHeader == null || encodedHeader == "") {
      throw new StripeSignatureVerificationError(
        encodedHeader,
        encodedPayload,
        {
          message: "No stripe-signature header value was provided.",
        },
      );
    }
    const decodedHeader =
      encodedHeader instanceof Uint8Array
        ? textDecoder.decode(encodedHeader)
        : encodedHeader;
    const details = parseHeader(decodedHeader, expectedScheme);
    if (!details || details.timestamp === -1) {
      throw new StripeSignatureVerificationError(
        decodedHeader,
        decodedPayload,
        {
          message: "Unable to extract timestamp and signatures from header",
        },
      );
    }
    if (!details.signatures.length) {
      throw new StripeSignatureVerificationError(
        decodedHeader,
        decodedPayload,
        {
          message: "No signatures found with expected scheme",
        },
      );
    }
    return {
      decodedPayload,
      decodedHeader,
      details,
      suspectPayloadType,
    };
  }
  function validateComputedSignature(
    payload,
    header,
    details,
    expectedSignature,
    tolerance,
    suspectPayloadType,
    secretContainsWhitespace,
    receivedAt,
  ) {
    const signatureFound = !!details.signatures.filter(
      platformFunctions.secureCompare.bind(
        platformFunctions,
        expectedSignature,
      ),
    ).length;
    const docsLocation =
      "\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://github.com/stripe/stripe-node#webhook-signing";
    const whitespaceMessage = secretContainsWhitespace
      ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value"
      : "";
    if (!signatureFound) {
      if (suspectPayloadType) {
        throw new StripeSignatureVerificationError(header, payload, {
          message:
            "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n" +
            docsLocation +
            "\n" +
            whitespaceMessage,
        });
      }
      throw new StripeSignatureVerificationError(header, payload, {
        message:
          "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n" +
          docsLocation +
          "\n" +
          whitespaceMessage,
      });
    }
    const timestampAge =
      Math.floor(
        (typeof receivedAt === "number" ? receivedAt : Date.now()) / 1e3,
      ) - details.timestamp;
    if (tolerance > 0 && timestampAge > tolerance) {
      throw new StripeSignatureVerificationError(header, payload, {
        message: "Timestamp outside the tolerance zone",
      });
    }
    return true;
  }
  function parseHeader(header, scheme) {
    if (typeof header !== "string") {
      return null;
    }
    return header.split(",").reduce(
      (accum, item) => {
        const kv = item.split("=");
        if (kv[0] === "t") {
          accum.timestamp = parseInt(kv[1], 10);
        }
        if (kv[0] === scheme) {
          accum.signatures.push(kv[1]);
        }
        return accum;
      },
      {
        timestamp: -1,
        signatures: [],
      },
    );
  }
  let webhooksCryptoProviderInstance = null;
  function getCryptoProvider() {
    if (!webhooksCryptoProviderInstance) {
      webhooksCryptoProviderInstance =
        platformFunctions.createDefaultCryptoProvider();
    }
    return webhooksCryptoProviderInstance;
  }
  Webhook.signature = signature;
  return Webhook;
}

// node_modules/stripe/esm/stripe.core.js
var DEFAULT_HOST = "api.stripe.com";
var DEFAULT_PORT = "443";
var DEFAULT_BASE_PATH = "/v1/";
var DEFAULT_API_VERSION = ApiVersion;
var DEFAULT_TIMEOUT = 8e4;
var MAX_NETWORK_RETRY_DELAY_SEC = 2;
var INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
var APP_INFO_PROPERTIES = ["name", "version", "url", "partner_id"];
var ALLOWED_CONFIG_PROPERTIES = [
  "apiVersion",
  "typescript",
  "maxNetworkRetries",
  "httpAgent",
  "httpClient",
  "timeout",
  "host",
  "port",
  "protocol",
  "telemetry",
  "appInfo",
  "stripeAccount",
];
var defaultRequestSenderFactory = (stripe2) =>
  new RequestSender(stripe2, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(
  platformFunctions,
  requestSender = defaultRequestSenderFactory,
) {
  Stripe2.PACKAGE_VERSION = "12.13.0";
  Stripe2.USER_AGENT = Object.assign(
    {
      bindings_version: Stripe2.PACKAGE_VERSION,
      lang: "node",
      publisher: "stripe",
      uname: null,
      typescript: false,
    },
    determineProcessUserAgentProperties(),
  );
  Stripe2.StripeResource = StripeResource;
  Stripe2.resources = resources_exports;
  Stripe2.HttpClient = HttpClient;
  Stripe2.HttpClientResponse = HttpClientResponse;
  Stripe2.CryptoProvider = CryptoProvider;
  function Stripe2(key, config = {}) {
    if (!(this instanceof Stripe2)) {
      return new Stripe2(key, config);
    }
    const props = this._getPropsFromConfig(config);
    this._platformFunctions = platformFunctions;
    Object.defineProperty(this, "_emitter", {
      value: this._platformFunctions.createEmitter(),
      enumerable: false,
      configurable: false,
      writable: false,
    });
    this.VERSION = Stripe2.PACKAGE_VERSION;
    this.on = this._emitter.on.bind(this._emitter);
    this.once = this._emitter.once.bind(this._emitter);
    this.off = this._emitter.removeListener.bind(this._emitter);
    if (
      props.protocol &&
      props.protocol !== "https" &&
      (!props.host || /\.stripe\.com$/.test(props.host))
    ) {
      throw new Error(
        "The `https` protocol must be used when sending requests to `*.stripe.com`",
      );
    }
    const agent = props.httpAgent || null;
    this._api = {
      auth: null,
      host: props.host || DEFAULT_HOST,
      port: props.port || DEFAULT_PORT,
      protocol: props.protocol || "https",
      basePath: DEFAULT_BASE_PATH,
      version: props.apiVersion || DEFAULT_API_VERSION,
      timeout: validateInteger("timeout", props.timeout, DEFAULT_TIMEOUT),
      maxNetworkRetries: validateInteger(
        "maxNetworkRetries",
        props.maxNetworkRetries,
        0,
      ),
      agent,
      httpClient:
        props.httpClient ||
        (agent
          ? this._platformFunctions.createNodeHttpClient(agent)
          : this._platformFunctions.createDefaultHttpClient()),
      dev: false,
      stripeAccount: props.stripeAccount || null,
    };
    const typescript = props.typescript || false;
    if (typescript !== Stripe2.USER_AGENT.typescript) {
      Stripe2.USER_AGENT.typescript = typescript;
    }
    if (props.appInfo) {
      this._setAppInfo(props.appInfo);
    }
    this._prepResources();
    this._setApiKey(key);
    this.errors = Error_exports;
    this.webhooks = createWebhooks(platformFunctions);
    this._prevRequestMetrics = [];
    this._enableTelemetry = props.telemetry !== false;
    this._requestSender = requestSender(this);
    this.StripeResource = Stripe2.StripeResource;
  }
  Stripe2.errors = Error_exports;
  Stripe2.webhooks = createWebhooks;
  Stripe2.createNodeHttpClient = platformFunctions.createNodeHttpClient;
  Stripe2.createFetchHttpClient = platformFunctions.createFetchHttpClient;
  Stripe2.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
  Stripe2.createSubtleCryptoProvider =
    platformFunctions.createSubtleCryptoProvider;
  Stripe2.prototype = {
    _appInfo: void 0,
    on: null,
    off: null,
    once: null,
    VERSION: null,
    StripeResource: null,
    webhooks: null,
    errors: null,
    _api: null,
    _prevRequestMetrics: null,
    _emitter: null,
    _enableTelemetry: null,
    _requestSender: null,
    _platformFunctions: null,
    _setApiKey(key) {
      if (key) {
        this._setApiField("auth", `Bearer ${key}`);
      }
    },
    _setAppInfo(info) {
      if (info && typeof info !== "object") {
        throw new Error("AppInfo must be an object.");
      }
      if (info && !info.name) {
        throw new Error("AppInfo.name is required");
      }
      info = info || {};
      this._appInfo = APP_INFO_PROPERTIES.reduce(
        (accum, prop) => {
          if (typeof info[prop] == "string") {
            accum = accum || {};
            accum[prop] = info[prop];
          }
          return accum;
        },
        void 0,
      );
    },
    _setApiField(key, value) {
      this._api[key] = value;
    },
    getApiField(key) {
      return this._api[key];
    },
    setClientId(clientId) {
      this._clientId = clientId;
    },
    getClientId() {
      return this._clientId;
    },
    getConstant: (c) => {
      switch (c) {
        case "DEFAULT_HOST":
          return DEFAULT_HOST;
        case "DEFAULT_PORT":
          return DEFAULT_PORT;
        case "DEFAULT_BASE_PATH":
          return DEFAULT_BASE_PATH;
        case "DEFAULT_API_VERSION":
          return DEFAULT_API_VERSION;
        case "DEFAULT_TIMEOUT":
          return DEFAULT_TIMEOUT;
        case "MAX_NETWORK_RETRY_DELAY_SEC":
          return MAX_NETWORK_RETRY_DELAY_SEC;
        case "INITIAL_NETWORK_RETRY_DELAY_SEC":
          return INITIAL_NETWORK_RETRY_DELAY_SEC;
      }
      return Stripe2[c];
    },
    getMaxNetworkRetries() {
      return this.getApiField("maxNetworkRetries");
    },
    _setApiNumberField(prop, n, defaultVal) {
      const val = validateInteger(prop, n, defaultVal);
      this._setApiField(prop, val);
    },
    getMaxNetworkRetryDelay() {
      return MAX_NETWORK_RETRY_DELAY_SEC;
    },
    getInitialNetworkRetryDelay() {
      return INITIAL_NETWORK_RETRY_DELAY_SEC;
    },
    getClientUserAgent(cb) {
      return this.getClientUserAgentSeeded(Stripe2.USER_AGENT, cb);
    },
    getClientUserAgentSeeded(seed, cb) {
      this._platformFunctions.getUname().then((uname) => {
        var _a;
        const userAgent = {};
        for (const field in seed) {
          userAgent[field] = encodeURIComponent(
            (_a = seed[field]) !== null && _a !== void 0 ? _a : "null",
          );
        }
        userAgent.uname = encodeURIComponent(uname || "UNKNOWN");
        const client = this.getApiField("httpClient");
        if (client) {
          userAgent.httplib = encodeURIComponent(client.getClientName());
        }
        if (this._appInfo) {
          userAgent.application = this._appInfo;
        }
        cb(JSON.stringify(userAgent));
      });
    },
    getAppInfoAsString() {
      if (!this._appInfo) {
        return "";
      }
      let formatted = this._appInfo.name;
      if (this._appInfo.version) {
        formatted += `/${this._appInfo.version}`;
      }
      if (this._appInfo.url) {
        formatted += ` (${this._appInfo.url})`;
      }
      return formatted;
    },
    getTelemetryEnabled() {
      return this._enableTelemetry;
    },
    _prepResources() {
      for (const name in resources_exports) {
        this[pascalToCamelCase(name)] = new resources_exports[name](this);
      }
    },
    _getPropsFromConfig(config) {
      if (!config) {
        return {};
      }
      const isString = typeof config === "string";
      const isObject2 = config === Object(config) && !Array.isArray(config);
      if (!isObject2 && !isString) {
        throw new Error("Config must either be an object or a string");
      }
      if (isString) {
        return {
          apiVersion: config,
        };
      }
      const values = Object.keys(config).filter(
        (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value),
      );
      if (values.length > 0) {
        throw new Error(
          `Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(
            ", ",
          )}`,
        );
      }
      return config;
    },
  };
  return Stripe2;
}

// node_modules/stripe/esm/stripe.esm.node.js
var Stripe = createStripe(new NodePlatformFunctions());
var stripe_esm_node_default = Stripe;

// functions/src/util/isProduction.ts
var isProduction = () => process.env.NODE_ENV === "production";
var isProduction_default = isProduction;

// functions/src/constants/defaultHeaders.ts
var headers = {
  "Access-Control-Allow-Origin": isProduction_default()
    ? "https://typeitjs.com"
    : "*",
  "Access-Control-Allow-Headers": "Content-Type",
};
var defaultHeaders_default = headers;

// licenseOptions.ts
var licenseOptions_default = [
  {
    slug: "typeit_limited",
    friendlySlug: "limited",
    name: "TypeIt - Limited License",
    htmlTitle: "<strong class='font-bold'>Limited</strong> Commercial License",
    simpleTitle: "Limited License",
    price: 900,
    description:
      "Use TypeIt on a single commercial project. Includes lifetime updates.",
    permissionDescription:
      "You are now eligible to use TypeIt for a single commercial project.",
    licenseLink: "https://typeitjs.com/licenses/download/limited-commercial",
    usageScope: "a single commercial project",
    priceId: process.env.STRIPE_LIMITED_LICENSE_PRICE_ID,
  },
  {
    slug: "typeit_unlimited",
    friendlySlug: "unlimited",
    name: "TypeIt - Unlimited License",
    htmlTitle:
      "<strong class='font-bold'>Unlimited</strong> Commercial License",
    simpleTitle: "Unlimited License",
    price: 2900,
    description:
      "Unlimited use on any commercial project. Includes lifetime updates.",
    permissionDescription:
      "You are now eligible to use TypeIt commercially for an unlimited number of projects.",
    usageScope: "any number of commercial projects",
    licenseLink: "https://typeitjs.com/licenses/download/unlimited-commercial",
    priceId: process.env.STRIPE_UNLIMITED_LICENSE_PRICE_ID,
  },
];

// functions/src/util/getLicenseData.ts
var getLicenseData_default = (slug) => {
  return licenseOptions_default.find((option) => {
    return option.slug === slug;
  });
};

// functions/create-checkout-session.ts
var stripe = new stripe_esm_node_default(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
var statusCode = 200;
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
var domain = isProduction_default()
  ? "https://typeitjs.com"
  : "http://localhost:8000";
var handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode,
      headers: defaultHeaders_default,
      body: JSON.stringify({
        message: "Not a valid request!",
      }),
    };
  }
  const slug = new URLSearchParams(event.body).get("slug");
  const licenseData = getLicenseData_default(slug);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: licenseData.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${domain}/confirmation/${licenseData.friendlySlug}?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/licenses/purchase`,
  });
  return {
    statusCode: 303,
    headers: __spreadProps(__spreadValues({}, defaultHeaders_default), {
      Location: session.url,
    }),
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    handler,
  });
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=create-checkout-session.js.map
