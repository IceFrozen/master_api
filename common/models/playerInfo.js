'use strict';
var disableAllMethods = require('../utils/helpers.js').disableAllMethods;
const _ = require("lodash")
const Promise = require("bluebird")
const wx = require("../../lib/wechat")
const co = require("co")
module.exports = function(Player)
{
  Player.getFromWxCode = async function(wxCode,isAutoCreate){

    //TODO 本地测试用 
    // return await Player.findOne({where:{wxUnionid:"oUMZzwJwXL2N9AtR2lD6pihyolfk"}})
    let wxAccessToken = await wx.user.getAccessToken(wxCode)
    let wxUserInfo = await wx.user.getUserInfo(wxAccessToken.access_token,wxAccessToken.openid)
    let playerInfo = await Player.findOne({where:{wxUnionid:wxUserInfo.unionid}})
    if(!playerInfo && isAutoCreate){
      playerInfo = await Player.create({
        wxOpenid:[wxUserInfo.openid],
        wxHeadimgurl:wxUserInfo.headimgurl,
        wxNickname:wxUserInfo.nickname,
        wxUnionid:wxUserInfo.unionid,
        wxAccessToken:wxAccessToken.access_token,
        wxRefreshToken:wxAccessToken.refresh_token
      })
    }
    else if(playerInfo){
      // save new token
      if(playerInfo.wxOpenid.indexOf(wxUserInfo.openid) == -1){
        playerInfo.wxOpenid.push(wxUserInfo.openid)
      }
      playerInfo.wxHeadimgurl=wxUserInfo.headimgurl;
      playerInfo.wxNickname=wxUserInfo.nickname;
      playerInfo.wxUnionid=wxUserInfo.unionid;
      playerInfo.wxAccessToken = wxAccessToken.access_token;
      playerInfo.wxRefreshToken = wxAccessToken.refresh_token;
      await playerInfo.save();
    }
    return playerInfo;
  }

  Player.getAdminInfo = async function(wxUnionid){
    let playerInfo = await Player.findOne({where:{wxUnionid:wxUnionid}})
    if(!playerInfo){
      playerInfo = await Player.create({
        wxOpenid:[],
        wxHeadimgurl:"",
        wxNickname:"admin",
        sex:1,
        wxUnionid:wxUnionid,
        wxAccessToken:"__",
        wxRefreshToken:"__"
      })
    }
    return playerInfo
  }
  
  /*Player.getFromOpenid = async function(openid,isAutoCreate){
    let wxUserInfo = await co(Player.app.wxapi.getUser(openid))
    let playerInfo = await Player.findOne({where:{wxUnionid:wxUserInfo.unionid}})
    if(!playerInfo && isAutoCreate){
      playerInfo = await Player.create({
        wxOpenid:[wxUserInfo.openid],
        wxHeadimgurl:wxUserInfo.headimgurl,
        wxNickname:wxUserInfo.nickname,
        wxUnionid:wxUserInfo.unionid,
        sex:wxUserInfo.sex,
        wxAccessToken:"__",
        wxRefreshToken:"__"
      })
    }
    else if(playerInfo){
      // save new token
      if(playerInfo.wxOpenid.indexOf(wxUserInfo.openid) == -1){
        playerInfo.wxOpenid.push(wxUserInfo.openid)
      }
      playerInfo.wxHeadimgurl=wxUserInfo.headimgurl;
      playerInfo.wxNickname=wxUserInfo.nickname;
      playerInfo.wxUnionid=wxUserInfo.unionid;
      playerInfo.wxAccessToken = playerInfo.wxAccessToken || "__"
      playerInfo.wxRefreshToken = playerInfo.wxRefreshToken || "__"
      await playerInfo.save();
    }
    return playerInfo;
  }*/
};
