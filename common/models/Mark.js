'use strict';
const _ = require("lodash")
const mongodb = require('mongodb');
module.exports = function(Mark) {
  Mark.getCheckInfo = async function(type,options){
    if(!options.accessToken) {
      throw new Error("login first")
    }
    let userId = options.accessToken.userId
    if(!userId) {
      throw new Error("login first")
    }
    let dataString = DateTranslate()
    let data  = {
      dateTime:dataString,
      userId:userId
    }
    let newRet = (await Mark.findOne({where:{dateTime:dataString,userId:userId,type:type}}))
    return newRet
  }
  Mark.remoteMethod('getCheckInfo',{
    accepts:[
      {"arg":"type","type":"string","required":true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/getCheckInfo'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
  // 签到表
  Mark.subMission_know = async function(lessions,options){
     if(!options.accessToken) {
      throw new Error("login first")
    }
    let userId = options.accessToken.userId
    if(!userId) {
      throw new Error("login first")
    }
    let dataString = DateTranslate()
    let data  = {
      dateTime:dataString,
      userId:userId,
      type:"know"
    }
    data.lession1 = questionClear(null,lessions.lession1)
    data.lession2 = questionClear(null,lessions.lession2)
    data.lession3 = questionClear(null,lessions.lession3)
    data.askInput = lessions.askInput
    let newRet = (await Mark.findOne({where:{dateTime:dataString,userId:userId,type:"know"}}))
    if(!newRet) {
      await Mark.create(data)
      return { isSucc:0,msg:"成功"}
    }
    newRet['lession1'] = questionClear(newRet.lession1,lessions.lession1)
    newRet['lession2'] = questionClear(newRet.lession2,lessions.lession2)
    newRet['lession3'] = questionClear(newRet.lession3,lessions.lession3)
    if(!newRet.askInput){
      newRet.askInput = lessions.askInput
    }else {
       newRet.askInput =[].concat(newRet.askInput,lessions.askInput)
    }
    await newRet.save()
    return { isSucc:0,msg:"成功"}
  }
  Mark.remoteMethod('subMission_know',{
    accepts:[
      {"arg":"lessions","type":"object","required":true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/subMission_know'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
  // 自我觉察
   Mark.subMission_mark = async function(lessions,options){
    if(!options.accessToken) {
      throw new Error("login first")
    }
    let userId = options.accessToken.userId
    if(!userId) {
      throw new Error("login first")
    }
    let dataString = DateTranslate()
    let data  = {
      dateTime:dataString,
      userId:userId,
      type:"mark"
    }
    data.lession1 = questionClear(null,lessions.lession1)
    data.lession2 = questionClear(null,lessions.lession2)
    data.lession3 = questionClear(null,lessions.lession3)
    data.askInput = lessions.askInput
    let newRet = (await Mark.findOne({where:{dateTime:dataString,userId:userId,type:"mark"}}))
    if(!newRet) {
      await Mark.create(data)
      return { isSucc:0,msg:"成功"}
    }
    newRet['lession1'] = questionClear(newRet.lession1,lessions.lession1)
    newRet['lession2'] = questionClear(newRet.lession2,lessions.lession2)
    newRet['lession3'] = questionClear(newRet.lession3,lessions.lession3)
    if(!newRet.askInput){
      newRet.askInput = lessions.askInput
    }else {
       newRet.askInput =[].concat(newRet.askInput,lessions.askInput)
    }
    await newRet.save()
    return { isSucc:0,msg:"成功"}
  }
  Mark.remoteMethod('subMission_mark',{
    accepts:[
      {"arg":"lessions","type":"object","required":true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/subMission_mark'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
};
const DateTranslate = function (nowDate = new Date()) {
  let year =  nowDate.getFullYear()
  let month = nowDate.getMonth() + 1
  let day = nowDate.getDate()
  let dataString = year +"-" + month +"-" +day
  return dataString

} 

const questionClear = function (origin, target) {
  if(!origin) origin = []
  if(!target) target = []
  let total = [].concat(target,origin)
  return _.uniq(total);


}