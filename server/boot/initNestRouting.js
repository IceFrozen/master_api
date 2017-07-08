module.exports = function(app){
  app.models.user.nestRemoting('sellerInfo');
  app.models.user.nestRemoting('adminInfo');
  app.models.SellerInfo.nestRemoting('ApplyCashInfo');
  app.models.SellerInfo.nestRemoting('RebateDetail');
}
