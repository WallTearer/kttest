/**
 * Module for loading users from facebook that have ids between minId and maxId
 */

var async = require('async');
var fb = require('fb');

/**
 * Loading users
 * @param {int} minId - minimum user id
 * @param {int} maxId - maximum user id
 * @param {function} callback - will be called with 2 arguments (err, users)
 */
module.exports = function (minId, maxId, callback) {
  
  var currentId = minId;
  var processedIdsCount = 0;
  var loadedUsers = [];

  // sending requests to get users one by one in an async way
  async.whilst(
    function() {
      return currentId <= maxId;
    },
    function(iterationCallback) {
      // loading info about a user
      fb.api(String(currentId), function (res) {
	processedIdsCount++;

	if ( res && !res.error )
	  loadedUsers[res.id] = { id: res.id, name: res.name };

	// if all users are loaded, returning them
	if ( processedIdsCount === (maxId - minId + 1) ) {
	  callback(null, loadedUsers);
	}
      });  

      currentId++;
      iterationCallback();
    },
    function() {
      // well, loop has ended, nothing to do here. This callback is required by async.whilst
    }
  );
};
