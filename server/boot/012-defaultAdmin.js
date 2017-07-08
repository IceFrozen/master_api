var Promise = require("bluebird")
var co = require("co")
module.exports = function(app,callback){
  initDefaultAdmin(app).then(()=>{
    console.log("init admin user success")
    callback();
  })
  .catch(e=>{
    console.error(e)
    callback(e)
  })
}
// upsert 'sundaAdmin' user
async function initDefaultAdmin(app){
  var playerInfo = await app.models.PlayerInfo.getFromOpenid('oL-YqwfEedCFWkQNOikSSIX8zNqc',true)
  var user = await app.models.user.upsertWithWhere({id:playerInfo.id},{
      id:playerInfo.id,
      username:"testAdmin",
      password:"testAdmin"
  })
  var role = await app.models.Role.findOne({where:{name:'admin'}})
  var count = await role.principals.count({principalId:playerInfo.id})
  if(count === 0){
    await role.principals.create({
      principalType: "USER",
      principalId: playerInfo.id
    })
  }
  await app.models.AdminInfo.findOrCreate({where:{id:playerInfo.id}},{id:playerInfo.id})
  await app.models.SellerInfo.findOrCreate({where:{id:playerInfo.id}},{id:playerInfo.id,uplevelId:playerInfo.id})
  playerInfo.sellerId = playerInfo.id;
  await playerInfo.save();
}
