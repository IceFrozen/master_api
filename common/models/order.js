 'use strict';
const Promise = require("bluebird")
const moment = require("moment")
const crypto = require('crypto');
const axios = require('axios');
module.exports = function(Order) {
  Order.observe("before save",function(ctx,next){
    let app = Order.app
    if(!ctx.isNewInstance)return next();
    ctx.instance.status = 0;
    ctx.instance.createTime = new Date();
    ctx.instance.payTime = new Date("1970-01-01 00:00:00 Z")
    next()
  })

   Order.observe("after save",async function(ctx){
    // let app = Order.app
    // if(!ctx.isNewInstance) return
    // let param = {
    //   merNo: "sqh@sundagame.com",
    //   ordercode: ctx.instance.id.toString(),
    //   goodsId: ctx.instance.goodsId,
    //   amount: ctx.instance.amount.toFixed(2),
    //   statedate: moment().format("YYYYMMDD"),
    //   callbackurl: "http://wx.mahjong.haowan98.com/api/sufupay_callback",
    //   callbackMemo: "01"
    // }
    // ctx.instance.param = JSON.stringify(param);
    // //TODO  for test
    // // await ctx.instance.save();
    // // await ctx.instance.complete();
    // // return
    // let desStr = encode(ctx.instance.param);
    // let desres = await axios.post('http://pay.qianhaisufu.com:3280/initOrder?merNo='+param.merNo,desStr)
    // if(desres.data.result && desres.data.result !==200){
    //   console.log(desres.data)
    //   throw new Error(desres.data.resultmsg)
    // }
    // let res = decode(desres.data);
    // ctx.instance.url = JSON.parse(res).codeUrl;
    // await ctx.instance.save();
    }
   )

  Order.prototype.complete = async function(){
   //  this.status = 1;
   //  this.payTime = new Date();
   //  await this.save()
   //  let coinMap = {
   //     "10":10,
   //     "20":25,
   //     "50":70,
   //     "100":200
   //   }
   //  await Order.app.mahjong.games.renqiu.recharge(this.userId,coinMap[this.amount.toFixed(0)])
   //  let playerInfo = await Order.app.models.PlayerInfo.findOne({where:{wxUnionid:this.userId}})
   //  if(!playerInfo) {
   //    return
   //  }
   //  let seller = await Promise.promisify(playerInfo.seller).call(playerInfo)
   //  if(seller){
   //    let ret = []
   //    await findUpLevelSeller(Order.app.models,this.id,seller,this.amount,1,ret)
   //    await saveRebateDetail(Order.app.models,this,ret)
   //  }
    }
};

async function findUpLevelSeller (Models,orderId,seller,amount,uplevelCount,ret) {
  
  if(amount <= 0) return
  // let rate = 0
  // if(uplevelCount == 1) rate = 0.60
  // if(uplevelCount == 2) rate = 0.05
  // if(uplevelCount == 3) rate = 0.05
  if(seller.id.toString() == seller.uplevelId.toString()) {  // 如果是根推广员 则不加成
    //如果跟推广员 则获得全部提成
    await seller.save()  
    return 
  }
  // let baseRebate = amount * rate
  //baseRebate = parseFloat(baseRebate.toFixed(2))
  //if(baseRebate <= 0) {
    //return
  // }
  // let RebateDetail = Models.RebateDetail
  // let rebateDeatil = (await RebateDetail.findOrCreate({where:{orderId:orderId,sellerId:seller.id}},{
  //     cash:baseRebate,
  //     orderId:orderId,
  //     sellerId:seller.id
  //   }))[0]
  // await rebateDeatil.save()
  ret.push({
    sellerId:seller.id,
    level:uplevelCount
  })
  let sellerUplevel = await Promise.promisify(seller.uplevel).call(seller)
  if(!sellerUplevel) return
  let newCountLevel = uplevelCount +1
  return await findUpLevelSeller(Models,orderId,sellerUplevel,amount,newCountLevel,ret)
}


async function saveRebateDetail (Models,order,ret) {
  let RebateDetail = Models.RebateDetail
  let rates = [0.6,0.05,0.05]
  if(ret.length === 0) return 
  if(ret.length === 1)  rates = [0.7,0,0]
  if(ret.length === 2)  rates = [0.65,0.05,0]
  if(ret.length === 3)  rates = [0.6,0.05,0.05]
  for(let i = 0;i < ret.length; i++)  {
      if(!rates[i] || rates[i] <= 0) {
        // throw new Error("this is a  error when get rate in rates:" ,rates[i])
        console.error("this is a  error when get rate in rates:" ,rates[i])
        continue
      }
      let baseRebate = order.amount * rates[i]
      baseRebate = parseFloat(baseRebate.toFixed(2))
      if(!baseRebate || baseRebate <= 0) {
        // throw new Error("this is a error when get baseRebate " ,baseRebate,rates[i],order.amount * rates[i])
        console.error("this is a error when get baseRebate " ,baseRebate,rates[i],order.amount * rates[i])
        continue
      }
      let rebateDeatil = (await RebateDetail.findOrCreate({where:{orderId:order.id,sellerId:ret[i].sellerId}},{
      cash:baseRebate,
      orderId:order.id,
      sellerId:ret[i].sellerId,
      level:ret[i].level
    }))[0]
    await rebateDeatil.save()
  }
}


function encode(str){
  let des = crypto.createCipheriv("des-cbc",Buffer.from("jgvtosbp","utf8"),Buffer.from("jgvtosbp","utf8"))
  let desStr = des.update(str,'utf8','hex')
  desStr += des.final('hex')
  return desStr;
}

function decode(desStr){
  let des = crypto.createDecipheriv("des-cbc",Buffer.from("jgvtosbp","utf8"),Buffer.from("jgvtosbp","utf8"))
  let str = des.update(desStr.toLowerCase(),'hex','utf8')
  str += des.final('utf8')
  return str;
}
