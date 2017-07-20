'use strict';

/*
	增加内建方法
*/
module.exports = function(app) {
  app.cashed = {}

  app.timeCashClear = setInterval(function(){
  	app.cashed = {}
  },100000)
};
