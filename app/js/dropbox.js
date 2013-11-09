var client = new Dropbox.Client({key: "gzh9gtknnfo104t"});

$(function () {
	$('#loginDropbox').click(function (e) {
		e.preventDefault();
		// This will redirect the browser to OAuth login.
		client.authenticate();
	});

	// Try to finish OAuth authorization.
	client.authenticate({interactive:false}, function (error) {
		if (error) {
			alert('Authentication error: ' + error);
		}
	});

	if (client.isAuthenticated()) {
		// Client is authenticated. Display UI.
		// $('#loginDropbox').hide();
		// $('#main').show();
	}


});
