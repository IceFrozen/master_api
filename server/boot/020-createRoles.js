const Promise = require('bluebird')
module.exports = function(app){
  var Role = app.models.Role
  var SellerInfo = app.models.SellerInfo
  Role.registerResolverAsync = function(roleName,resolver){
    Role.registerResolver(roleName,function(role,context,cb){resolver(role,context).asCallback(cb)})
  }
  Role.registerResolverAsync("seller",function(role,context){
    if(!context.accessToken){
      return Promise.resolve(false);
    }
    var userId = context.accessToken.userId
    if(!userId){
      return Promise.resolve(false);
    }
    return SellerInfo.findById(userId).then(()=>true).catch(()=>false)
  })
}
