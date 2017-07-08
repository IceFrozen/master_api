const _ =require('lodash')
module.exports = function(Model, options) {
  Model.defineProperty('__created', {type: Date, default: '$now'});
  Model.defineProperty('__modified', {type: Date, default: '$now'});

  Model.observe('before save', function event(ctx, next) { //Observe any insert/update event on Model
    if (ctx.instance) {
      ctx.instance.__modified = new Date();
    }
    next();
  }); 
}

