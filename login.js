function login() {
    var firebase = new Firebase("https://coderaicing.firebaseio.com");
    var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
	if (error) {
	    alert("There was an error logging in. Please try again.");
	    localStorage.setItem("facebookUID", null);
	} else if (user) {
	    localStorage.setItem("facebookOAuth", user.accessToken);
	    localStorage.setItem("facebookUID", user.uid);
	} else {
	    localStorage.setItem("facebookUID", null);
	}
	window.location.replace("index.html");
    });
    var oAuth = localStorage.getItem("facebookOAuth");
    if (oAuth == null) {
	auth.login("facebook", {
	    rememberMe: true
	});
    } else {
	auth.login("facebook", {
	    access_token: oAuth,
	    rememberMe: true
	});
    }
}