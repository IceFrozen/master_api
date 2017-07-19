'use strict';
const _ = require("lodash")
const Promise = require("bluebird")
module.exports = function(Link)
{
	 // Link.prototype.createWithWechat = async function(wxCode){
	 // 	 let type = this.type
	 // 	 let uplevelSeller = await Promise.promisify(this.seller).call(this)
  //   	if(!uplevelSeller){
  //     	throw new Error("Uplevel seller not exist")
  //   	}
  //   	let models = Link.app.models
  //   	let newPlayer = await models.PlayerInfo.getFromWxCode(wxCode,true)
  //   	let newUser = (await models.user.findOrCreate({where:{id:newPlayer.id}},{
  //     	id:newPlayer.id,
  //     	username:"wx:"+newPlayer.wxUnionid,
  //     	password:"RANDOM_PASSORD_"+Math.random()
  //   	}))[0]
  //   	if(type === 'seller') {
  //   		let oldSellerInfo = await models.SellerInfo.findById(newUser.id)
  //   		if(oldSellerInfo){
  //     		return 0;
  //   		}
  //   		let newSeller = await models.SellerInfo.create({
  //     		id:newPlayer.id,
  //     		uplevelId:uplevelSeller.id
  //   		})
  //   		newPlayer.sellerId = newSeller.id;
  //   	}else if(type === 'player') {
  //   		if(newPlayer.sellerId && newPlayer.sellerId !== uplevelSeller.id){
  //   			return 0;
  //   		}
  //   		newPlayer.sellerId = uplevelSeller.id
  //   	}else {
  //   		throw new Error('error of type')
  //   	}
  //   	await newPlayer.save()
  //   	return 0
	 // }

	 // Link.remoteMethod('prototype.createWithWechat',{
  //  accepts:[
  //     {arg:'wxCode',type:'string'}
  //   ],
  //   http:{path:'/createWithWechat'},
  //   returns:{
  //     arg: 'errcode', type: 'number', root: true
  //   }
  // })
};
