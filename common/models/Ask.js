'use strict';
const _ = require("lodash")
const mongodb = require('mongodb');
module.exports = function(Ask) {
	Ask.getQuestion = async function(questionId){
		let Question = Ask.app.models.Question
		let qustion_instance = await Question.findById(questionId)
		if(!qustion_instance){
			return {isSucc:-1,msg:"找不到问卷"}
		}
		for(let i=0; i< qustion_instance.Groups.length;i++){
			qustion_instance.Groups[i].totalScore = 0
			qustion_instance.Groups[i].id = new mongodb.ObjectID()  
			for(let j =0; j< qustion_instance.Groups[i].questions.length;j++){
				qustion_instance.Groups[i].questions[j].isSelect = "-1"
			}
		}
		return {
			isSucc:0,
			msg:"success",
			instance:qustion_instance
		}
	}
	Ask.remoteMethod('getQuestion',{
    accepts:[
      {arg:'questionId',type:'string',required:true},
    ],
    http:{path:'/getQuestion',verb:"get"},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
	Ask.subAsk = async function(group){
		let questionId = group.id
		let Question = Ask.app.models.Question
		let qustion_instance = await Question.findById(questionId)
		if(!qustion_instance){
			return {isSucc:-1,msg:"找不到问卷"}
		}
		qustion_instance.upTime +=1
		await qustion_instance.save()
		delete group.id
		await Ask.create(group)
		return {isSucc:0,msg:"success"}

	}
	Ask.remoteMethod('subAsk',{
    accepts:[
      {arg:'group',type:'object',required:true},
    ],
    http:{path:'/subAsk',verb:"post"},
    returns:{
      arg: 'ret', type: 'object', root: true
    }
  })
};
