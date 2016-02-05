'use strict';

function _interopDefault (ex) { return 'default' in ex ? ex['default'] : ex; }

var objectAssign = _interopDefault(require('object-assign'));
var lodash = require('lodash');

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;

/**
 * @method apply
 * @param {Object} state
 * @return {Function}
 */
function apply(state) {

    return function (property, reducer) {

        var parts = property.split('.');
        var first = parts[0];

        if (parts.length === 1) {

            return objectAssign({}, state, babelHelpers.defineProperty({}, property, reducer(state[property])));
        }

        return objectAssign({}, state, babelHelpers.defineProperty({}, first, apply(state[first])(parts.slice(1).join('.'), reducer)));
    };
}

/**
 * @method set
 * @param {*} x
 * @return {Function}
 */
function set(x) {
    return function () {
        return x;
    };
}

/**
 * @method type
 * @param {*} x
 * @return {String}
 */
var type = function type(x) {

    if (Array.isArray(x)) {
        return 'array';
    }

    if ((typeof x === 'undefined' ? 'undefined' : babelHelpers.typeof(x)) === 'object') {
        return 'object';
    }

    return null;
};

/**
 * @method add
 * @param {*} x
 * @return {Function}
 */
function add() {
    for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
        x[_key] = arguments[_key];
    }

    return function (cursor) {

        switch (type(cursor)) {

            case 'array':
                return [].concat(babelHelpers.toConsumableArray(cursor), x);

            case 'object':
                var combined = objectAssign.apply(undefined, [{}].concat(x));
                return babelHelpers.extends({}, cursor, babelHelpers.extends({}, combined));

            default:
                return cursor;

        }
    };
}

/**
 * @method remove
 * @param {*} x
 * @return {Function}
 */
function remove() {
    for (var _len2 = arguments.length, x = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        x[_key2] = arguments[_key2];
    }

    return function (cursor) {

        switch (type(cursor)) {

            case 'array':

                switch (type(x)) {

                    case 'array':
                        return cursor.filter(function (current) {
                            return !x.filter(function (matcher) {
                                return lodash.matches(matcher)(current);
                            }).length;
                        });

                    default:
                        return cursor.filter(function (item) {
                            return ! ~x.indexOf(item);
                        });

                }

            default:
                return cursor;

        }
    };
}

exports.apply = apply;
exports.set = set;
exports.add = add;
exports.remove = remove;