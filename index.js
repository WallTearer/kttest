/**
 * This application is doing the following things:
 * - loading users from facebook
 * - writing user data to csv file
 * - uploading csv file to the ftp server
 * @author Kyrylo Boiarkin
 */
var loadFbUsers = require('./modules/fbusers');
var writeToCsv = require('./modules/csvwriter');
var ftpUpload = require('./modules/ftpuploader');
var loggerConstructor = require('./modules/logger');
var config = require('./config/config');

// instantiating logger
var logger = new loggerConstructor(config.silentLogger);
logger.log('Start');

// loading users from facebook
logger.log('Loading users from facebook');
loadFbUsers(config.minUserId, config.maxUserId, onFbUsersLoaded);

// after fb users are loaded, writing them to csv file
function onFbUsersLoaded(err, users) {
  if ( err )
    return logger.log('Error occured when loading users from facebook: ', err);
  logger.log('Writing data to csv');
  writeToCsv(users, config.filePath, onCsvCreated);
}

// after csv file was created, uploading files to ftp server
function onCsvCreated(err) {
  if ( err )
    return logger.log('Error happend when creating a csv file: ', err);
  logger.log('Uploading to ftp file ', config.filePath);
  ftpUpload(config.filePath, onFileUploaded);    
}

// showing final message after file was uploaded to ftp
function onFileUploaded(err, uploadedFileName) {
  if ( err )
    return logger.log('Error happened when uploading file to ftp: ', err);
  logger.log('File ' + uploadedFileName + ' was successfully uploaded to ftp server');
  logger.log('Done');
}
