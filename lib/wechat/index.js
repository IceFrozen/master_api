let WechatAPI = require("wechat-api")
const Promise = require("bluebird")
Promise.promisifyAll(WechatAPI)
var appConfig =require('../../appConfig')
let appid = appConfig.appId
let appsec =  appConfig.appSec
let wechat = new WechatAPI(appid,appsec);
let axios = require("axios")
exports.api = wechat
exports.user = {}

exports.user.getAccessToken = function(code){
  let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsec}&code=${code}&grant_type=authorization_code`
  return axios.get(url)
    .then(response=>{
      var data = response.data;
      if(data.errcode){
        return Promise.reject(new Error("code invalid: "+JSON.stringify(data)))
      }
      return data
    })
}

exports.user.getUserInfo = function(accessToken,openId){
  console.log(accessToken,openId)
  let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`
  return axios.get(url)
    .then(res=>{
      var data = res.data;
      if(data.errcode){
        return Promise.reject(new Error("AccessToken invalid"))
      }
      return data;
    })
}

exports.user.flushToken = function(refreshToken){
  let url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appid}&grant_type=refresh_token&refresh_token=${refreshToken}`
  return axios.get(url)
    .then(res=>{
      var data = res.data;
      if(data.errcode){
        return Promise.reject(new Error("refreshToken invalid"))
      }
      return data;
    })
}
