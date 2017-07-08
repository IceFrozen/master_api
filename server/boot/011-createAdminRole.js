module.exports = function(app,callback){
  app.models.Role.upsertWithWhere({name:"admin"},{name:"admin"}).asCallback(callback)
}
