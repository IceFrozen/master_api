// const Promise = require('bluebird')
// const _ =require('lodash')
// /*
//   数据适配器
// */
// module.exports = function(app,callback){
  
//   let models =  _.keys(app.models)
//   let modelObject = []
//   models.forEach(key=>{
//     modelObject.push({ModelName:key,app:app})
//   })
//  Promise.map(modelObject,DataAdapterFun).then(_=>{
//   }).catch(err=> {
//     console.log(err)
//     throw new Error(err)
//   }).asCallback(callback)
// }
// const DataAdapterFun = function (Model) {
//   if(_.isFunction(DataAdapter[Model.ModelName])){
//     return DataAdapter[Model.ModelName](Model)
//   }
//   return Promise.resolve()
// }
// var DataAdapter =  {}
// /*
//   数据适配器
// */

// let Models = ['Integrative']
// DataAdapter['Game'] = function (Model) {
//   let ModelClass = Model.app.models[Model.ModelName]
//   let Category = Model.app.models.Category
//   let initInter = []
//   return ModelClass.find()
//     .map((game)=>Models.map((model)=>[game,model]))
//     .map(_.flatten)
//     .map(([game,modelName])=>{
//       return Category.findOrCreate({where:{gameId:game.id.toString(),modelName:modelName}},{
//         gameId:game.id,
//         name:game.name,
//         modelName:modelName,
//         isCoordinate:false,
//         detail:[]
//       }) 
//     }) 
//     .mapSeries(categories=>{
//       let category = categories[0]
//       let subModelCalss = Model.app.models[category.modelName]
//       if(!subModelCalss) {
//         return Promise.reject(new Error("has not the class:" + category.modelName))
//       }
//       if(!category.isCoordinate){
//         return subModelCalss.initClass(category.gameId,category.id).then(ins=>{
//           category.isCoordinate = true
//           return category.save()
//         })
//       }
//       return Promise.resolve()
//     })
// }