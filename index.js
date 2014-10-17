var loadFbUsers = require('./modules/fbusers');
var writeToCsv = require('./modules/csvwriter');


var MIN_ID = 1;
var MAX_ID = 30;
var FILE_NAME = '/tmp/fbusers.csv';

console.log('Started');

// loading users from facebook
loadFbUsers(MIN_ID, MAX_ID, onFbUsersLoaded);

// after fb users are loaded, writing them to csv file
function onFbUsersLoaded(err, users) {
  writeToCsv(users, FILE_NAME, function(err){
    console.log('fb users write finished');
  });
}


 


