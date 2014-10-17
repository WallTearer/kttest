/**
 * Module for writing data into specified csv file
 * @author Kyrylo Boiarkin
 */
var csv = require('fast-csv');
var fs = require('fs');
var async = require('async');

/**
 * Writing data into file fileName
 * @param {array} data - data to be written
 * @param {string} fileName - name of the file where data will be written
 * @param {function} callback - will be called in the end with one argument (err)
 */
module.exports = function(data, fileName, callback) {
  // creating streams for csv data and file that will accept csv data
  var csvStream = csv.createWriteStream({headers: true});
  var writableStream = fs.createWriteStream(fileName);
  
  // waiting until file is open
  writableStream.once('open', onFileOpen);
  
  // writing data to the file after file is open
  function onFileOpen(fd) {
    // piping csv stream into the file
    csvStream.pipe(writableStream);
    
    // iterating through the data in an async way one by one
    async.eachSeries(data, function(item, iterationCallback){
      if ( item ) {
	// writing data row to the file through csv streams
	csvStream.write(item);
      }
      iterationCallback();
    }, function(err){
      // closing scv stream
      csvStream.end();
      // executing callback only after write to file is finished
      writableStream.on("finish", function(){
	callback(err);
      });      
    });
  }
};
