'use strict';
const _ = require("lodash")
const mongodb = require('mongodb');
module.exports = function(Ask) {
	Ask.getCheckInfo = async function(options){
		console.log(options)
  	return { isSucc:0,msg:"成功"}
  }
  Ask.remoteMethod('getCheckInfo',{
    accepts:[
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/getCheckInfo'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
  Ask.subMission = async function(lessions,options){
   	
   	if(!options.accessToken) {
   		throw new Error("login first")
   	}
   	let userId = options.accessToken.userId
   	if(!userId) {
   		throw new Error("login first")
   	}
  	let type = lessions.type
  	let nowDate = new Date()
  	let year =  nowDate.getFullYear()
  	let month = nowDate.getMonth() + 1
  	let day = nowDate.getDate()
  	let dataString = year +"-" + month +"-" +day
  	let data  = {
  		dateTime:dataString,
      	userId:userId
  	}
  	delete lessions.type
  	if(type === 'know') {
  		data['know'] = lessions
  	}else{
  		data['mark'] = lessions
  	}
  	// let newRet = (await Ask.findOne({where:{dateTime:dataString,userId:userId}}))[0]
  	let newRet = (await Ask.findOrCreate({where:{dateTime:dataString,userId:userId}},data))[0]
  	if(newRet) {
  		newRet[type]
  	}
  	console.log(newRet)

	console.log(options)
	console.log(lessions)



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
