/**
 * This application is doing the following things:
 * - loading users from facebook
 * - writing user data to csv file
 * - uploading csv file to an ftp server
 * @author Kyrylo Boiarkin
 */
var loadFbUsers = require('./modules/fbusers');
var writeToCsv = require('./modules/csvwriter');
var ftpUpload = require('./modules/ftpuploader');

var MIN_ID = 1;
var MAX_ID = 30;
var FILE_NAME = '/tmp/kyryloboiarkin_fbusers.csv';

console.log('Start');

// loading users from facebook
console.log('Loading users from facebook');
loadFbUsers(MIN_ID, MAX_ID, onFbUsersLoaded);

// after fb users are loaded, writing them to csv file
function onFbUsersLoaded(err, users) {
  if ( err )
    return console.log('Error occured when loading users from facebook: ', err);
  console.log('Writing data to csv');
  writeToCsv(users, FILE_NAME, onCsvCreated);
}

// after csv file was created, uploading files to ftp server
function onCsvCreated(err) {
  if ( err )
    return console.log('Error happend when creating a csv file: ', err);
  console.log('Uploading to ftp file ', FILE_NAME);
  ftpUpload(FILE_NAME, onFileUploaded);    
}

// showing final message after file was uploaded to ftp
function onFileUploaded(err, uploadedFileName) {
  if ( err )
    return console.log('Error happened when uploading file to ftp: ', err);
  console.log('File ' + uploadedFileName + ' was successfully uploaded to ftp server');
  console.log('Done');
}
