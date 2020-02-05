'use strict';

/**
 * Builds a Velocity template from a JS configuration object
 * @param {Object} mappingConfig
 * @returns {string}
 */
function buildTplFromJson(mappingConfig) {
    var valueMap = {};
    var outputFields = [];
    var columns = [];
    for (var attr in mappingConfig) {
        if (mappingConfig.hasOwnProperty(attr)) {
            // Skip config entries that are empty, should reduce output TPL size noticeably in some cases
            if (empty(mappingConfig[attr])) {
                delete mappingConfig[attr];
                continue;
            }
            valueMap[attr] = '$!{'+ attr +'}';
            if (!Array.isArray(mappingConfig[attr])) {
                mappingConfig[attr] = [mappingConfig[attr]];
            }
            mappingConfig[attr].forEach(function(config, index){
                outputFields.push(buildFieldStr(attr, index, config));
                if (typeof(config) === 'string') {
                    columns.push(config);
                } else {
                    columns.push(config.label);
                    // TODO: support recursive config structure
                }
            });
        }
    }
    var outputStr = '#set( $mappingConfig = '+ JSON.stringify(mappingConfig) +' )' +
        '#set( $columns = '+ JSON.stringify(columns) +' )' +
        '#if( $outputColumns )' +
        '$output.columns([$!{mappingConfig}, $!{columns}])' +
        '#{else}' +
        '$output.start([$!{mappingConfig}, $!{columns}, $!{data}])' +
        outputFields.join('$output.fieldJoin()') +
        '$output.end([$!{mappingConfig}, $!{columns}, $!{data}])' +
        '#{end}';

    return outputStr;
}

/**
 * Builds a Velocity string to handle outputting a field, applying callbacks and configuration
 * @param {string} attr
 * @param {number} index
 * @param {string|object} config
 * @returns {string}
 */
function buildFieldStr(attr, index, config) {
    var indexStr = typeof(index) !== 'undefined' ? '['+ index +']' : '';
    var dataAttr;

    if (typeof(config) === 'object') {
        if ('static' in config && config.static) {
            dataAttr = "'"+ attr +"'";
            return '$output.field( [ '+ JSON.stringify(attr) + ', '+ dataAttr +', $!{mappingConfig['+ JSON.stringify(attr) + ']' + indexStr +'}, $!{data} ] )';
        }
    }

    var fallbackAttr;
    var ifChain = [];
    var ifAttr = '$!{data.'+ attr.split('.').map(function(a){
        ifChain.push(a);
        return ifChain.join('.');
    }).join('} && $!{data.') +'}';
    var ifFbAttr;
    dataAttr = '$!{data.'+ attr +'}';
    if (typeof(config) === 'object') {
        /* TODO: below are filters that have to modify the compiled template. This needs to become a part of the filters definition, but able to still execute at compile time */
        if ('condition' in config) {
            // http://velocity.apache.org/engine/2.0/user-guide.html#if-elseif-else
            ifChain = [];
            var ifCondAttr = '$!{data.'+ config.condition.split('.').map(function(a){
                ifChain.push(a);
                return ifChain.join('.');
            }).join('} && $!{data.') +'}';
            ifAttr = ifCondAttr +' && '+ ifAttr;
        }
        if ('fallback' in config) {
            ifChain = [];
            ifFbAttr = '$!{data.'+ config.fallback.split('.').map(function(a){
                ifChain.push(a);
                return ifChain.join('.');
            }).join('} && $!{data.') +'}';
            fallbackAttr = '$!{data.' + config.fallback + '}';
        }
    }
    var output = '#if('+ ifAttr +')$output.field( [ '+ JSON.stringify(attr) + ', '+ dataAttr +', $!{mappingConfig['+ JSON.stringify(attr) + ']' + indexStr +'}, $!{data} ] )';
    if (fallbackAttr) {
        output += '#elseif('+ ifFbAttr +')$output.field( [ '+ JSON.stringify(attr) + ', '+ fallbackAttr +', $!{mappingConfig['+ JSON.stringify(attr) + ']' + indexStr +'}, $!{data} ] )';
    }
    output += '#{else}$output.field( [ '+ JSON.stringify(attr) + ', null, $!{mappingConfig['+ JSON.stringify(attr) + ']' + indexStr +'}, $!{data} ] )#{end}';

    return output;
}

/**
 * Helper method used for debugging only
 * @param {*} obj
 * @returns {*}
 */
function jsObject(obj){
    //dw.system.Logger.debug('constructor name: {0}', obj.constructor.name);
    if (obj === null || typeof(obj) === 'undefined') {
        return obj;
    } else if (obj.constructor.name.match(/^dw\..+/)) {
        if (obj instanceof require('dw/util/Map')) {
            var object = {};
            obj.keySet().toArray().forEach(function(k){
                object[k] = obj.get(k);
            });
            return object;
        } else {
            return obj.toString();
        }
    } else if (typeof(obj)==='function') {
        return obj.toString();
    }
    return obj;
}

/**
 * Returns a JS object providing callbacks used for JSON output
 * @param {Function} filterValue
 * @returns {{columns: function, start: function, field: function, fieldJoin: function, end: function}}
 */
function jsonCallbacks(filterValue) {
    return {
        columns: function outputColumns(args) {
            /*var mappingConfig = args[0];
            var columns = args[1];*/
        },
        start: function transformHeader(args) {
            /*var mappingConfig = args[0];
            var columns = args[1];
            var data = args[2];*/
            return '{\n';
        },
        field: function transformField(args) {
            var fieldKey = args[0];
            var fieldValue = args[1];
            var fieldConfig = args[2];
            var data = args[3];

            /*dw.system.Logger.debug(
                'fieldKey: {0} ;; fieldValue: {1} ;; fieldConfig: {2}',
                JSON.stringify(fieldKey),
                JSON.stringify(jsObject(fieldValue)),
                JSON.stringify(jsObject(fieldConfig)));*/
            fieldValue = filterValue(fieldConfig, fieldKey, fieldValue, data);
            if (typeof(fieldValue) === 'undefined') {
                fieldValue = null;
            }

            var label = '';
            if (typeof(fieldConfig) === 'string') {
                label = fieldConfig;
            } else {
                label = fieldConfig.label;
            }
            return JSON.stringify(label) + ': ' + JSON.stringify(fieldValue);
        },
        fieldJoin: function joinValue() {
            return ',\n';
        },
        end: function transformFooter(args) {
            /*var mappingConfig = args[0];
            var columns = args[1];
            var data = args[2];*/
            return '}\n';
        }
    };
}

/**
 * Returns a JS object providing callbacks used for CSV output
 * @param filterValue
 * @returns {{columns: function, start: function, field: function, fieldJoin: function, end: function}}
 */
function csvCallbacks(filterValue) {
    return {
        columns: function outputColumns(args) {
            //var mappingConfig = args[0];
            var columns = args[1];
            return JSON.stringify(columns.toArray());
        },
        start: function transformHeader(args) {
            /*var mappingConfig = args[0];
            var columns = args[1];
            var data = args[2];*/
            return '[\n';
        },
        field: function transformField(args) {
            var fieldKey = args[0];
            var fieldValue = args[1];
            var fieldConfig = args[2];
            var data = args[3];
            //dw.system.Logger.debug('fieldKey: {0} ;; fieldValue: {1} ;; fieldConfig: {2}', JSON.stringify(fieldKey), JSON.stringify(fieldValue), JSON.stringify(fieldConfig));
            fieldValue = filterValue(fieldConfig, fieldKey, fieldValue, data);
            return JSON.stringify(fieldValue);
        },
        fieldJoin: function joinValue() {
            return ',';
        },
        end: function transformFooter(args) {
            /*var mappingConfig = args[0];
            var columns = args[1];
            var data = args[2];*/
            return ']\n';
        }
    };
}

exports.buildTplFromJson = buildTplFromJson;
exports.jsonCallbacks = jsonCallbacks;
exports.csvCallbacks = csvCallbacks;