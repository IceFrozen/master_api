'use strict';
var disableAllMethods = require('../utils/helpers.js').disableAllMethods;
const _ = require("lodash")
const myUtils = require("../utils/myUtils");
const async = require("async")
const Promise = require("bluebird")
module.exports = function(Seller) {
  // Seller.prototype.transferCoinToSeller = async function(sellerId,num){
  //   let models = Seller.app.models;
  //   //console.log(sellerId,num)
  //   if(!_.isInteger(num) || num <= 0){
  //     throw new Error("invalid number: num");
  //   }
  //   let user = await Promise.promisify(this.user).call(this)
  //   if(user.coin < num){
  //     throw new Error("user's money is not enough")
  //   }
  //   let sellerUserInfo = await models.user.findById(sellerId)
  //   if(!sellerUserInfo){
  //     throw new Error("seller not exist");
  //   }

  //   let trans = await models.Transaction.SellerTransferCoinToSeller(this.id,sellerUserInfo.id,num);

  //   await trans.pending();
  //   await models.user.beginTransfer(this.id,trans)
  //   user = await models.user.findById(this.id);
  //   if(user.coin < 0){
  //     await trans.cancaling();
  //     await models.user.cancalTransfer(this.id,trans)
  //     await trans.cancaled();
  //     throw new Error("user's money is not enough")
  //   }
  //   await models.user.beginTransfer(sellerId,trans)
  //   await trans.commit()
  //   await models.user.doneTransfer(this.id,trans)
  //   await models.user.doneTransfer(sellerId,trans)
  //   await trans.done()
  //   return user.coin;
  // }
  // Seller.remoteMethod('prototype.transferCoinToSeller',{
  //   accepts:[
  //     {arg:'sellerId',type:'string'},
  //     {arg:'num',type:'number'}
  //   ],
  //   http:{path:'/transferCoinToSeller'},
  //   returns:{
  //     arg: 'newCoin', type: 'number', root: true
  //   }
  // })
  // Seller.prototype.transferCoinToPlayer = async function(playerId,num){
  //   let models = Seller.app.models;
  //   // console.log(playerId,num)
  //   if(!_.isInteger(num) || num <= 0){
  //     throw new Error("invalid number: num");
  //   }
  //   let user = await Promise.promisify(this.user).call(this)
  //   if(user.coin < num){
  //     throw new Error("user's money is not enough")
  //   }
  //   let sellerUserInfo = await models.user.findById(playerId)
  //   if(!sellerUserInfo){
  //     throw new Error("seller not exist");
  //   }

  //   let trans = await models.Transaction.SellerTransferCoinToPlayer(this.id,sellerUserInfo.id,num);

  //   await trans.pending();
  //   await models.user.beginTransfer(this.id,trans)
  //   user = await models.user.findById(this.id);
  //   if(user.coin < 0){
  //     await trans.cancaling();
  //     await models.user.cancalTransfer(this.id,trans)
  //     await trans.cancaled();
  //     throw new Error("user's money is not enough")
  //   }
  //   await models.user.beginTransfer(playerId,trans)
  //   await trans.commit()
  //   await models.user.doneTransfer(this.id,trans)
  //   await models.user.doneTransfer(playerId,trans)
  //   await trans.done()
  //   return user.coin;
  // }
  // Seller.remoteMethod('prototype.transferCoinToPlayer',{
  //   accepts:[
  //     {arg:'playerId',type:'string'},
  //     {arg:'num',type:'number'}
  //   ],
  //   http:{path:'/transferCoinToPlayer'},
  //   returns:{
  //     arg: 'newCoin', type: 'number', root: true
  //   }
  // })
  // //申请提现
  // Seller.prototype.transferRebate = async function(){
  //   let models = Seller.app.models;
  //   let data = {
  //     isSucc:0,
  //     msg:''
  //   }
  //   let RebateDetail = models.RebateDetail
  //   let rebateDetails = await RebateDetail.find({where:{
  //     sellerId:this.id,
  //     status:0,
  //   }})

  //   let total = 0
  //   rebateDetails.map(item =>total+=item.cash)
  //   let ApplyCash = models.ApplyCash
  //   let apCash = await ApplyCash.create({
  //     status:-3,
  //     cash:total,
  //     sellerId:this.id
  //   })
  //   for(let rebItem of rebateDetails) {
  //      rebItem.ApplyCashId = apCash.id
  //      rebItem.status = 1
  //      await rebItem.save()
  //   }
  //   apCash.status = 0
  //   await apCash.save()
  //   return data
  // }
  // Seller.remoteMethod('prototype.transferRebate',{
  //   accepts:[
  //     {arg:'money',type:'number'}
  //   ],
  //   http:{path:'/transferRebate'},
  //   returns:{
  //     arg: 'data', type: 'object', root: true
  //   }
  // })
  // //获取返点价格
  // Seller.prototype._getTotalRebate = function(cb){
  //   let data = {
  //     sellerId:this.id,
  //     rebate:0
  //   }
  //   let RebateDetail = Seller.app.models.RebateDetail
  //   let _RebateDetail= Seller.getDataSource().connector.collection(RebateDetail.modelName)
  //   _RebateDetail.aggregate([
  //       { $match:{ status:0,sellerId:data.sellerId}},
  //       { $group:{ _id:"0",rebate : { $sum :"$cash" } } }
  //      ],(err,ret) => {
  //       if(ret[0]) data.rebate = ret[0].rebate
  //       return cb(err,data)
  //   })
  // } 
  //  Seller.prototype.getTotalRebate = async function(cb){
  //   let data = {
  //     sellerId:this.id,
  //     level:-1,
  //     rebates:0
  //   }


  //   if(this.level < 0) {
  //     let rets = []
  //     await findUpLevelSeller(this,rets)
  //     this.level = rets.length
  //     await this.save()
  //   }
  //   data.level = this.level
  //   let RebateDetail = Seller.app.models.RebateDetail
  //   let sellerId = this.id
  //   let ret = await RebateDetail.find({
  //     where:{sellerId:sellerId,status:0},
  //     include:{order:{playerInfo:{seller:"wxInfo"}}}
  //   })
  //   data.rebates = ret
  //   return data
  //  }


  // Seller.remoteMethod('prototype.getTotalRebate',{
  //   accepts:[],
  //   http:{path:'/getTotalRebate'},
  //   returns:{
  //     arg: 'data', type: 'object', root: true
  //   }
  // })
};
// async function findUpLevelSeller (seller,ret) {
//   if(seller.id.toString() == seller.uplevelId.toString()) {  // 如果是根推广员 则不加成
//     return 
//   }
//   ret.push({
//     sellerId:seller.id,
//   })
//   let sellerUplevel = await Promise.promisify(seller.uplevel).call(seller)
//   if(!sellerUplevel) return
//   return await findUpLevelSeller(sellerUplevel,ret)
// }