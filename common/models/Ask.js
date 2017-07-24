'use strict';
const _ = require("lodash")
const mongodb = require('mongodb');
module.exports = function(Ask) {
	Ask.getAskInfo = async function(options){
	 // 获取最近三个月分数记录
    if(!options.accessToken) {
      throw new Error("login first")
    }
    let userId = options.accessToken.userId
    if(!userId) {
      throw new Error("login first")
    }
  	let nowData = Date.now()
    let min = nowData - (1000 * 60 * 60 * 24 * 30 * 3 )
    var filter = {where: {n: {gt: 1}}, skip: 1, fields: ['n']};
    let askInfos = await Ask.find({where:{
      userId:userId,
      time:{gte:min}
    }})
    for(let i =0 ; i < askInfos.length;i++) {
        let ask = askInfos[i]
        for(let j =0 ; j < ask.group.length;j++) {
            delete ask.group[j].questions
        }
    }
    console.log(askInfos)
    return { isSucc:0,msg:"成功",ret:askInfos}
  }
  Ask.remoteMethod('getAskInfo',{
    accepts:[
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/getAskInfo'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
  Ask.subMission = async function(lessions,options){
   	
  

  	return { isSucc:0,msg:"成功"}
  }
  Ask.remoteMethod('subMission',{
    accepts:[
      {"arg":"lessions","type":"object","required":true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/subMission'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
};
