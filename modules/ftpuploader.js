/**
 * Module for uploading a given file to the ftp server
 * @author Kyrylo Boiarkin
 */
var ftp = require('ftp');
var fs = require('fs');
var path = require('path');
var config = require('./../config/config');

/**
 * Upload file fileName to the ftp server
 * @param {string} fileName - name of the file that should be uploaded
 * @param {function} callback - called after upload to ftp is done, one argument (err, uploadedFileName)
 */
module.exports = function(fileName, callback) {
  // creating an ftp client
  var ftpClient = new ftp();
  // need to wait until ftp clien will be ready
  ftpClient.on('ready', function() {
    var fileBaseName = path.basename(fileName);
    // putting file to ftp server
    ftpClient.put(fileName, fileBaseName, function(err) {
      if (err) {
	ftpClient.end();
	return callback(err);
      }
      ftpClient.end();
      return callback(null, fileBaseName);
    });
  });
  // catching errors from ftp client
  ftpClient.on('error', function(err) {
    return callback(err);
  });
  // connect to ftp server
  ftpClient.connect(config.ftp);
};
