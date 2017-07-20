'use strict';

const _ = require('lodash')
const Promise = require("bluebird")
const wx = require("../../lib/wechat")
module.exports = function(User) {
  delete User.validations.email;
  User.prototype.createWithWechat = async function(wxCode,t){

    let uplevelSeller = await Promise.promisify(this.sellerInfo).call(this)
    if(!uplevelSeller){
      throw new Error("Uplevel seller not exist")
    }
    let models = User.app.models
    let newPlayer = await models.PlayerInfo.getFromWxCode(wxCode,true)
    let newUser = (await User.findOrCreate({where:{id:newPlayer.id}},{
      id:newPlayer.id,
      username:"wx:"+newPlayer.wxUnionid,
      password:"RANDOM_PASSORD_"+Math.random()
    }))[0]

    if(!newPlayer.sellerId) {
      newPlayer.sellerId = uplevelSeller.id
    }
    await newPlayer.save()
    return 0;
  }
  User.remoteMethod('prototype.createWithWechat',{
    accepts:[
      {arg:'wxCode',type:'string'},
      {arg:'t',type:'string'}
    ],
    http:{path:'/createWithWechat'},
    returns:{
      arg: 'errcode', type: 'number', root: true
    }
  })
  User.loginWithWechat = async function (wxCode, options) {
    let models = User.app.models
    console.log(wxCode,"wxCode")
    console.log(options,"options")
    if(options.accessToken) {
      return options.accessToken
    }
    let playerInfo = await models.PlayerInfo.getFromWxCode(wxCode,true)
    console.log(wxCode,"222")
   
    let userInfo = await User.findOrCreate({where:{id:playerInfo.id}},{
      id:playerInfo.id,
      username:playerInfo.wxUnionid,
      password:"RANDOM_PASSORD_"+Math.random()
    })
    let superSeller = await models.SellerInfo.findOne({where:{level:-1}})
    if(!superSeller) {
      throw new Error("can't  find SuperSeller!")
    }
    playerInfo.sellerId = superSeller.id
    await playerInfo.save()
    await userInfo[0].save()
    let accessToken = await userInfo[0].createAccessToken()
    return accessToken;
  }
  User.remoteMethod('loginWithWechat',{
    accepts:[
      {arg:'wxCode',type:'string'},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/loginWithWechat'},
    returns:{
      arg: 'accessToken', type: 'object', root: true
    }
  })
  //修改人物信息
  User.prototype.updateInfo = async function(userinfo){
    console.log(userinfo)
    this.name = userinfo.name,
    this.phoneNumber = userinfo.phoneNumber,
    this.birthday = userinfo.birthday,
    this.addressValue = userinfo.addressValue,
    this.sex = userinfo.sex
    this.email = userinfo.email||""
    this.isSetOk = 1
    return await this.save();
  }
  User.remoteMethod('prototype.updateInfo',{
    accepts:[
      {arg:'userinfo',type:'object',required:"true"},
    ],
    http:{path:'/updateInfo'},
    returns:{
      arg: 'userinfo', type: 'object', root: true
    }
  })

  User.beginTransfer = async function(userId,t){
    let Transaction = User.app.models.Transaction
    let coin = 0;
    if(t.transactionType == Transaction.AdminGenerateCoin){
      coin = t.coin;
    }
    else if(t.sourceId.toString() == userId.toString()){
      coin = - t.coin;
    }
    else if(t.destinationId.toString() == userId.toString()){
      coin = t.coin;
    }

    let where = {
      id:userId,
      pendingTransactions:{ne: t.id}
    }
    await User.updateAll(where,{$inc: {coin: coin}, $push: { pendingTransactions: t.id.toString() }})
  }
  User.doneTransfer = async function(userId,t){
    await User.updateAll({id:userId},{$pull: { pendingTransactions: t.id.toString() }})
  }
  User.cancalTransfer = async function(userId,t){
    let Transaction = User.app.models.Transaction
    let coin = 0;
    if(t.transactionType == Transaction.AdminGenerateCoin){
      coin = t.coin;
    }
    else if(t.sourceId.toString() == userId.toString()){
      coin = - t.coin;
    }
    else if(t.destinationId.toString() == userId.toString()){
      coin = t.coin;
    }
    await User.updateAll({id:userId,pendingTransactions:t.id},{$inc:{coin: -coin},$pull: { pendingTransactions: t.id.toString() }})
  }
};
