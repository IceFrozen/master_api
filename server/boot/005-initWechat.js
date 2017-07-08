var WechatAPI = require('co-wechat-api');

var api = new WechatAPI("wx805f60be1812cff6", "cfdbc4d1f9d1ebd6bd635e939065e3fa");
module.exports = function enableAuthentication(server) {
  server.wxapi = api;
};
