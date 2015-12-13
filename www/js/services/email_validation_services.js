(function() {
	this.app.service('EmailValidatorServices', function(){
  	return {
			validate: function(email) {
				var regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regularExpression.test(email);
			}
		};
	});
}).call(this);