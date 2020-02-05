'use strict';

/**
 * Returns an array of filter definitions. Filters apply to mapped field values at runtime
 * @returns {Array<Object>}
 */
function filters() {
    return [
        {
            id: 'required',
            description: 'Throws exception when a required field has no value.',
            throws: 'RequiredAttributeException',
            callback: function filterRequired(config, key, value, data){
                if (config.required && empty(value)) {
                    throw new RequiredAttributeException(config.label);
                }
                return value;
            },
            priority: 3
        },
        {
            id: 'format',
            description: 'Applies StringUtils.format() against field value, using supplied format string.',
            callback: function applyFormat(config, key, value, data) {
                return require('dw/util/StringUtils').format(config.format, value);
            },
            priority: 2
        },
        /*{
            id: 'fallback',
            description: 'Returns a fallback value when the initial field value is empty.',
            callback: function fallbackValue(config, key, value, data) {
                if (empty(value)) {
                    value = getParamValue(config.fallback, data);
                    if (typeof(value) === 'function') {
                        value = value(key, data);
                    }
                }
                return value;
            },
            priority: 1
        },*/
        {
            id: 'static',
            description: 'Key is used as a static string value',
            callback: function staticValue(config, key, value, data) {
                if (config.static === true) {
                    value = key;
                }
                return value;
            },
            priority: 0
        },
        {
            id: 'type',
            description: 'Applies value type conversion handling.',
            values: [
                'bool',
                'array'
            ],
            parameters: [
                {
                    id: 'mappedValue',
                    type: 'string|object',
                    description: 'Required parameter when type=array. If string, it returns a simple array of values ' +
                    'where the string is a path to a value within each collection record. If object, the format ' +
                    'expected is the same format used by the entire map object definition (so treat it as if you are ' +
                    'mapping a data feed).'
                },
                {
                    id: 'concat',
                    type: 'boolean',
                    description: 'When resulting value is an array, return value as a comma-delimited string.'
                }
            ],
            callback: function filterType(config, key, value, data) {
                switch (config.type) {
                    case 'bool':
                        value = !!value;
                        break;
                    /*case 'array':
                        // mappedValue can be a string or an object
                        // if an object, it's similar to the standard attribute mapping definition
                        var mapDef = config.mappedValue;
                        var concat = 'concat' in config && config.concat;
                        if (!empty(mapDef)) {
                            if (typeof(mapDef) === 'string') {
                                value = buildSimpleArrayFromIterable(mapDef, value, data);
                            } else {
                                value = buildMappedArrayFromIterable(mapDef, value, data);
                            }
                        }
                        if (concat === true && !empty(value) && Array.isArray(value)) {
                            value = value.join(',');
                        }
                        break;*/
                    default:
                        break;
                }
                return value;
            },
            priority: 97
        },
        {
            id: '*',
            description: 'Convert objects to simple values.',
            callback: function convertObjects(config, key, value, data) {
                if (!isObject(value)) {
                    return value;
                }

                if (value instanceof Date) {
                    // convert Date to Calendar in current instance timezone
                    value = new (require('dw/util/Calendar'))(value);
                    value.setTimeZone(require('dw/system/Site').getCurrent().getTimezone());
                }

                if (value instanceof (require('dw/web/FormField'))) {
                    return value.value;
                } else if (value instanceof (require('dw/value/EnumValue'))) {
                    return value.displayValue;
                } else if (value instanceof (require('dw/value/Money'))) {
                    return require('dw/util/StringUtils').formatMoney(value);
                } else if (value instanceof (require('dw/util/Decimal'))) {
                    return value.valueOf();
                } else if (value instanceof (require('dw/util/Calendar'))) {
                    return require('dw/util/StringUtils').formatCalendar(value, 'MM/dd/y hh:mm:ss a');
                } else if (value instanceof (require('dw/util/Collection'))) {
                    return value.toArray();
                } else if (value instanceof (require('dw/content/MarkupText'))) {
                    return value.markup;
                } else if (value instanceof (require('dw/web/URL'))) {
                    return value.toString();
                }

                return value;
            },
            priority: 98
        }
    ];
}

function isObject(arg) {
    return arg !== null && typeof arg === 'object' && !Array.isArray(arg);
}

/**
 * @param {Array<Object>} filters Filters array which is sorted by priority of each filter (lowest number first)
 * @constructor
 */
function MapFilter(filters) {
    // Ensure we're only dealing with a plain array
    if (filters instanceof (require('dw/util/List'))) {
        filters = filters.toArray();
    }
    this.filters = filters;
    this.filters.sort(function(a, b){
        var ap = 'priority' in a ? a.priority : 99,
            bp = 'priority' in b ? b.priority : 99;
        if (ap < bp) {
            return -1;
        } else if (ap > bp) {
            return 1;
        }
        return 0;
    });
}

/**
 * Apply each filter's callback method
 * @param {string|Object} config The data map definition. Object = complex definition
 * @param {string} key The initial attribute key
 * @param {*} value The value mapped by helpers.getParamValue()
 * @param {Object} data Source of data, used when mapped value is a callback itself
 * @throws {RequiredAttributeException}
 */
MapFilter.prototype.applyFilters = function(config, key, value, data) {
    // The mapped value may be a callback function defined by trigger or feed
    // Function should have signature of `function(config, data){}`
    if (typeof(value) === 'function') {
        value = value(config, data);
    }
    this.filters.forEach(function filterApply(filter){
        if (filter.id === '*' || (isObject(config) && filter.id in config)) {
            value = filter.callback(config, key, value, data);
        }
    });

    return value;
};

/**
 * Checks if supplied error is of type RequiredAttributeException
 * @param {Error} e
 * @returns {boolean}
 */
MapFilter.prototype.isRequiredException = function(e) {
    return (e instanceof RequiredAttributeException) || e.message.indexOf('RequiredAttributeException') !== -1;
};

/**
 * Custom error/exception, thrown when required attribute is missing.
 * @param {string} attribute Attribute that is missing
 * @param {string} [message] Optional custom message
 * @constructor
 */
function RequiredAttributeException(attribute, message) {
    this.name = 'RequiredAttributeException';
    this.attribute = attribute;
    this.message = message || 'Required attribute "'+ attribute +'" is missing.';
    this.stack = (new Error()).stack;
}
RequiredAttributeException.prototype = Object.create(Error.prototype);
RequiredAttributeException.prototype.constructor = RequiredAttributeException;

exports.filters = filters;
exports.MapFilter = MapFilter;
exports.newMapFilter = function newMapFilter(/*filters...*/){
    return new MapFilter(Array.prototype.slice.call(arguments));
};
exports.RequiredAttributeException = RequiredAttributeException;
exports.newRequiredAttributeException = function newRequiredAttributeException(attribute, message){return new RequiredAttributeException(attribute, message);};