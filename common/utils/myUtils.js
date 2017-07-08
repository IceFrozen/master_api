// License text available at https://opensource.org/licenses/MIT
const _ = require('lodash');
const crypto = require("crypto")
const md5 = exports.md5Export =function (data){
  var md5sum = crypto.createHash("md5");
  md5sum.update(new Buffer(data), 'utf8');
  str = md5sum.digest('hex');
  return str;
}

const sortObject =  exports.sortObject = function(object) {
  var index, key, keys, sortedObj;
  sortedObj = {};
  keys = Object.keys(object);
  keys.sort(function(key1, key2) {
    key1 = key1.toLowerCase();
    key2 = key2.toLowerCase();
    if (key1 < key2) {
      return -1;
    }
    if (key1 > key2) {
      return 1;
    }
    return 0;
  });
  for (index in keys) {
    key = keys[index];
    sortedObj[key] = object[key];
  }
  return sortedObj;
};


const stringify = exports.stringify = function(params, quotes) {
  var k, ls;
  quotes = quotes || false;
  ls = '';
  for (k in params) {
    if (typeof params[k] === 'object') {
      ls += k + '=' + JSON.stringify(params[k]) + '&';
    } else {
      ls += k + '=' + params[k] + '&';
    }
  }
  return ls.substring(0, ls.length - 1);
};

const  objectFilter = exports.objectFilter = function(object) {
  var k, param_filter;
  param_filter = {};
  for (k in object) {
    if (!object[k] || object[k] === '') {
      continue;
    } else {
      param_filter[k] = object[k];
    }
  }
  return param_filter;
};


