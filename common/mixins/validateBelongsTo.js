'use strict'

let _ = require('lodash');
let Promise = require('bluebird')
module.exports = function(Model, options) {
  _(Model.settings.relations)
    .map((obj,key)=>{obj._vid = key;return obj})
    .filter(relation=>relation.type==='belongsTo')
    .each((relation)=>{
      let fk = relation._vid+"Id"
      if(relation.as){
        fk = relation.as;
      }
      if(relation.require === false){
        return
      }
      Model.validateAsync(fk,function(err,next){
        let app = this.app;
        // allow belongsTo self
        if(relation.model === Model.modelName && this[fk].toString() === this.id.toString()){
          return next();
        }
        Promise.fromCallback(this[relation._vid].bind(this))
          .then((doc)=>{
            if(!doc)err();
            next()
          })
          .catch(()=>{err();next()})
      },{message:"target not a exist target."})
    })
}
