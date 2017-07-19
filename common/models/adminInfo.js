'use strict';
const _ = require("lodash")
module.exports = function(Admin) {
  // Admin.prototype.generateCoin = async function(num){
  //   if(!_.isInteger(num) || num <= 0){
  //     throw new Error("invalid number: num");
  //   }
  //   let user = await Promise.promisify(this.user).call(this)
  //   user.coin += num;
  //   await user.save()
  //   return user.coin;
  // }
  // Admin.remoteMethod('prototype.generateCoin',{
  //   accepts:[
  //     {arg:'num',type:'number'}
  //   ],
  //   http:{path:'/generateCoin'},
  //   returns:{
  //     arg: 'newCoin', type: 'number', root: true
  //   }
  // })
  // //审核 
  // Admin.prototype.ReviewCash = async function(applyId,passing,des){
  //     let ret = {isSucc:0,msg:"success"}
  //     console.log(applyId,passing,des)
  //     //passing = 1  pass
  //     //passing = 2  not pass
  //     //applyId means ApplyCash _id
  //     //不通过 
  //     //TODO 这里处理订单  
  //     let ApplyCashModel = Admin.app.models.ApplyCash
  //     let RebateDetail = Admin.app.models.RebateDetail
  //     let tmp = await ApplyCashModel.findById(applyId)
  //     if(!tmp) {
  //       ret.isSucc = -1 
  //       ret.msg = '找不到该申请'
  //       return ret
  //     }
  //     // 同意申请
  //     if(passing == 1) {
  //       tmp.status = 1
  //       //TODO 这里做 自动提款的功能
  //     }else {
  //       //审核不通过
  //       tmp.status = -1   
  //       // 找到该笔申请的细节
  //       let rebateDetails = await RebateDetail.find({where:{
  //           ApplyCashId:tmp.id,
  //           status:1,
  //           sellerId:tmp.sellerId
  //       }})
  //       if(rebateDetails.length  === 0) {
  //         ret.isSucc = -1 
  //         ret.msg = "该笔订单异常"
  //         return ret
  //       }
  //       //返还给用户订单
  //       for(let rebItem of rebateDetails) {
  //         rebItem.ApplyCashId = null
  //         rebItem.status = 0
  //         await rebItem.save()
  //       }
  //     }
  //     tmp.des = des | ""
  //     await tmp.save()
  //     return ret 
  // }
  // Admin.remoteMethod('prototype.ReviewCash',{
  //   accepts:[
  //     {arg:'applyId',type:'string',required:true},
  //     {arg:'passing',type:'number',required:true},
  //     {arg:'des',type:'string'},
  //   ],
  //   http:{path:'/ReviewCash'},
  //   returns:{
  //     arg: 'isSucc', type: 'number', root: true
  //   }
  // })
};
