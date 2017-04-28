const Zone = require('../models/Zone');
// CRUD operators in export
module.exports = {
  find: function(params, callback){
    Zone.find(params, function(err, zones){
      if(err){
        // error has to be first parameter, payload is 2nd
        callback(err, null);
        return;
      }
      callback(null, zones);
    });
  },
  findById: function(id, callback){
    Zone.findById(id, function(err, zone){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, zone);
    })
  },
  create: function(){

  },
  update: function(){

  },
  delete: function(){

  }
}