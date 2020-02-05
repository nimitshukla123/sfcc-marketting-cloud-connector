'use strict';

/**
 * Returns parameter value from data (uses recursion)
 * @param {string} attr Period-delimited path to a parameter
 * @param {Array|Object} data
 * @returns {*}
 */
function getParamValue(attr, data) {
    var value;
    var attrs = attr.split('.');
    var obj;
    if (!Array.isArray(data)) {
        data = [data];
    }
    for (var di=0; di<data.length; di++) {
        obj = data[di];
        attrs.forEach(function objectMapper(k, i, arr){
            if (empty(obj) || !isObject(obj)) {
                value = obj;
                return;
            }

            if (i === 0) {
                if (k !== 'params' && k in obj) {
                    obj = obj[k];
                } else if ('params' in obj && obj.params.hasOwnProperty(k)) {
                    obj = obj.params[k];
                }
            } else {
                if (k in obj) {
                    obj = obj[k];
                }
            }
            if (i === arr.length-1) {
                value = obj;
            }
        });

        if (!empty(value)) {
            break;
        }
    }

    return value;
}

/**
 * Handles object key/value mapping, writes to callback that accepts key and value as params
 * @param {Object} obj Keys serve as the value path, Values serve as the key to be written to
 * @param {Array|Object} data Source of data that should provide values to be mapped. Should be an object, or an array of objects
 * @param {Function} outputCallback Callback that is executed with resulting key and value. Signature: function(key, value)
 */
function mapValues(obj, data, outputCallback) {
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr) && !empty(obj[attr])) {
            if (Array.isArray(obj[attr])) {
                obj[attr].forEach(function(a){
                    outputCallback(a, getParamValue(attr, data));
                });
            } else {
                outputCallback(obj[attr], getParamValue(attr, data));
            }
        }
    }
}

/**
 * Return object values as an array
 * @param {Object} obj
 * @returns {Array}
 */
function objValues(obj) {
    var arr = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && obj[k]) {
            arr.push(obj[k]);
        }
    }
    return arr;
}

/**
 * Build a simple array of values from a collection
 * @param {string} valueKey The key to be fetched from each item in collection
 * @param {Array|dw.util.List} iterable Array or List to iterate
 * @param {Object} fallbackData Fallback data object
 * @returns {Array}
 */
function buildSimpleArrayFromIterable(valueKey, iterable, fallbackData) {
    var arrOut = [];
    var val;
    for (var i = 0; i < iterable.length; i++) {
        val = mappingFilter(valueKey, getParamValue(valueKey, fallbackData ? [iterable[i], fallbackData] : iterable[i]), iterable[i]);
        arrOut.push(val);
    }
    return arrOut;
}

/**
 * Build an array of objects from a collection
 * @param {Object} objMap Keys serve as the value path, Values serve as the key to be written to
 * @param {Array|dw.util.List} iterable Array or List to iterate
 * @param {Object} fallbackData Fallback data object
 * @returns {Array}
 */
function buildMappedArrayFromIterable(objMap, iterable, fallbackData) {
    var arrOut = [];
    var val;
    for (var i = 0; i < iterable.length; i++) {
        val = {};
        mapValues(objMap, fallbackData ? [iterable[i], fallbackData] : iterable[i], function mapObj(k, v){
            val[k] = mappingFilter(k, v, iterable[i]);
        });
        arrOut.push(val);
    }
    return arrOut;
}
