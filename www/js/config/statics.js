(function() {
	this.app.constant("ENV", {
		"API_URL": "http://localhost:3000/api/",
		"SOCKET_URL": "http://localhost:5001",
		"MESSAGES_PATH": "templates/shared/errors"
	});
}).call(this);