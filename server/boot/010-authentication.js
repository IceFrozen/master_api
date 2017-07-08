'use strict';
var loopback = require('loopback');
module.exports = function enableAuthentication(server) {
  // enable authentication
  server.middleware('auth', loopback.token({
    model: server.models.accessToken,
    currentUserLiteral: 'me'
  }));
  server.enableAuth();
  server.models.AccessToken.belongsTo(server.models.user,{foreignKey:"userId",as:"user"})
  let app = server;
  app.models.RoleMapping.defineProperty('principalId', { type: function(id) {return require('mongodb').ObjectId('' + id)}})
  app.models.RoleMapping.belongsTo(app.models.User);
  app.models.User.hasMany(app.models.RoleMapping, {foreignKey: 'principalId'});
  app.models.Role.hasMany(app.models.User, {through: app.models.RoleMapping, foreignKey: 'roleId'});
};
