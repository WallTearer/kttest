/**
 * Module for logging messages with related data
 * @param {bool} silent - if true, logs will not be shown
 * @author Kyrylo Boiarkin
 */
module.exports = function(silent) {  
  /**
   * Log message with some additional data
   * @param {string} msg - log message
   * @param {Object} data - optional data object
   */
  this.log = function(msg, data) {
    if ( !silent ) {
      if ( !data )
	console.log(msg);
      else
	console.log(msg, data);
    }
  };
};
