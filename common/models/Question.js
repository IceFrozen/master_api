'use strict';
const _ = require("lodash")
const mongodb = require('mongodb');
module.exports = function(Question) {
	//创建问卷
	Question.createQuestion = async function(params,options){
		console.log("params",params)
		console.log("params",options)
   	let models = Question.app.models
   	// 检查params 的参数
   	if(!options.accessToken) {
   		throw new Error("login first")
   	}
   	let userId = options.accessToken.userId
   	if(!userId) {
   		throw new Error("login first")
   	}
  	let questionId = params.id || "null"
  	delete params.id
  	let question_instance = await Question.findById(questionId)
  	if(!question_instance){
  		question_instance = await Question.create(params)
      question_instance.userId = userId
  	}else{
  		question_instance.name = params.name
  		question_instance.delivery = params.delivery
  		question_instance.desc = params.desc
  		question_instance.Groups = params.Groups
  		await question_instance.save()
  	}
  	return { isSucc:0,msg:"成功"}
  }
  Question.remoteMethod('createQuestion',{
    accepts:[
      {arg:'params',type:'object',required:true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/createQuestion'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
	//得到问卷
  Question.getQuestion = async function(options){
   
    console.log("params",options)
    // 检查params 的参数
    if(!options.accessToken) {
      throw new Error("login first")
    }
    let userId = options.accessToken.userId
    if(!userId) {
      throw new Error("login first")
    }
    let question = await Question.findOne()
    if(!question) {
      return { isSucc:-1,msg:"失败",Ask: null}
    }
    return { isSucc:0,msg:"成功",Ask: buildReturnBack(question)}
  }
  Question.remoteMethod('getQuestion',{
    accepts:[
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/getQuestion'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
  Question.prototype.subQuestion = async function(askInfo,options){
    // 检查params 的参数
    if(!options.accessToken) {
      throw new Error("login first")
    }
    let userId = options.accessToken.userId
    if(!userId) {
      throw new Error("login first")
    }
    let Ask =  Question.app.models.Ask
    if(askInfo.id !== this.id.toString()) {
      return {isSucc:-1,msg:"保存失败"}
    }
    askInfo.userId = userId
    delete askInfo.id
    askInfo.time = Date.now()
    askInfo.questionId = this.id
    await Ask.create(askInfo)
    return {isSucc:0,msg:"success"}
  }
  Question.remoteMethod('prototype.subQuestion',{
    accepts:[
      {"arg":"askInfo","type":"object","required":true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],
    http:{path:'/subQuestion'},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
};


function buildReturnBack (question) {
    let ret = {
      id:question.id,
      name:question.name,
      desc:question.desc,
      groups:[],
      total:0
    }
    question.Groups.map(group => {
        let grouItem = {
          groupId : new mongodb.ObjectID(),
          name: group.title,
          index:group.index,
          fen:0,
          questions:[]
        }
        group.questions.map(q=> {
          let qItem = {
            questioId : grouItem.groupId+"_"+new mongodb.ObjectID(),
            name: q.name,
            index:q.index,
            selects:[],
            select:""
          }
          q.select.map(ss=>{
              let key = qItem.questioId + "_" + new mongodb.ObjectID()
              let value = ss.selection + "(" + ss.score +"分)"
              let index = ss.index
              let score = ss.score
              qItem.selects.push({key,value,index,score})
          })
          grouItem.questions.push(qItem)
        })
        ret.groups.push(grouItem)
    })
    return ret
}