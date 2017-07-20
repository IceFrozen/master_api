var co = require('co')
var url = require('url')
module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/api/ping', function(req, res,next) {
    console.log(req.query);
    res.send('SUCCESS');
  });
  app.get('/api/wxH5Config',function(req,res,next){
    let url = req.query.url;
    console.log(url)
    console.log(url)
    console.log(url)
    console.log(url)
    co(function*(){
      var data = yield app.wxapi.getJsConfig({
        debug:false,
        jsApiList:['onMenuShareAppMessage','onMenuShareTimeline'],
        url:url
      })
      console.log("noncestr=",data.nonceStr);
      console.log("timestamp=",data.timestamp);
      console.log("url=",url);
      res.send(data)
    }).then(()=>{})
  })
  var bodyParser = require('body-parser');
  app.post("/api/sufupay_callback",bodyParser.json({type:"*/*"}),function(req,res){
    console.log(req.body)
    if(typeof(req.body)==='string'){
      req.body = JSON.parse(req.body)
    }
    app.models.Order.findById(req.body.ordercode).then(function(order){
      if(order.status !== 0){
        res.end("success")
        return;
      }
      if(req.body.state=="10Z"){
        return order.complete();
      }
      else{
        throw new Error("BAD STATE")
      }
    })
    .then(()=>{
      res.end("success")
    })
    .catch((e)=>{
      res.end(e.message)
    })

  })
};
