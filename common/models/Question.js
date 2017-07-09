'use strict';
const _ = require("lodash")
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

};
