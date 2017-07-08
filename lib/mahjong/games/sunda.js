const BaseGame = require("../baseGame")
const axios = require('axios')
const util = require('util')
function SundaMahjong(host,port,key){
  this.host = host;
  this.port = port || 80;
  this.key = key
}

module.exports = SundaMahjong
util.inherits(SundaMahjong,BaseGame)

SundaMahjong.prototype.recharge = async function(userId,amount){
  let url = `http://${this.host}:${this.port}/add_user_gems`
  let res = await axios.get(url,{params:{
    unionid:userId,
    gems:amount
  }})
  if(res.data.errcode !== 0){
    throw new Error(res.data.errmsg)
  }
}
