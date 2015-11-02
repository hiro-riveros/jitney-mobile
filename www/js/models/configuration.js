'use strict';

/**
* @name: Configuration
* @description: contains a set of user configuration
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @automatic_map    | boolean        |
* | @frequent_destiny | string         |
*
*/

(function() {
	this.app.factory('Configuration', function(restmod, ENV) {
    return restmod.model('/configuration');
  });
}).call(this);
