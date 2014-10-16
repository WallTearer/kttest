var loadFbUsers = require('./fbusers');
var async = require('async');

var MIN_ID = 1;
var MAX_ID = 30;

// loading users from facebook
loadFbUsers(MIN_ID, MAX_ID, function(err, users) {
  
  // iterating through the loaded users
  async.each(users, function(item, callback){
    console.log('user = ', item);		
    callback();
  }, function(err){
    // finished iterating over loaded users
  });
  
});



