'use strict';

/**
* @name: User
* @description: contains a set of user
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @firstName        | string         |
* | @lastName         | string         |
* | @email            | string         |
* | @nickname         | string         |
*
*/

(function() {
	this.app.factory('User', function(restmod, ENV) {
    return restmod.model('/user');
  });
}).call(this);
