// Facebook
var firebase = new Firebase("https://coderaicing.firebaseio.com");
var auth = new FirebaseSimpleLogin(firebase, function (error, user) {

});
// auth.login("facebook");

// Game Logic
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var testRaicer = new Raicer();

// Sandbox
var frame = null;

// Running
var running = false;
var submitButton = document.getElementById("submitButton");
var runButton = document.getElementById("runButton");
runButton.disabled = true;
submitButton.disabled = false;

function render(dt) {
    'use strict';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    testRaicer.draw(context);
    context.restore();
    if (running && frame != null && frame.contentWindow != null) {
	frame.contentWindow.update();
    }
}

testRaicer.implementPhysics();

// Game loop
function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


var now;
var dt = 0;
var last = timestamp();
var step = 1/60;

function doFrame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
	dt = dt - step;
    }
    render(dt);
    last = now;
    requestAnimationFrame(doFrame);
}

requestAnimationFrame(doFrame);

function validateCode(doc) {
    if (typeof frame.contentWindow.update != "function") {
	alert("Error: You are missing an update function.");
	return false;
    }
    if (typeof frame.contentWindow.init != "function") {
	alert("Error: You are missing an init function.");
	return false;
    }
    return true;
}

function submitCode() {    
    if (frame != null) {
	document.body.removeChild(frame);
    }
    frame = document.createElement("iframe");
    frame.style.display = 'none';
    document.body.appendChild(frame);
    var script = frame.contentWindow.document.createElement("script");
    script.type = "text/javascript";
    script.id = "script";
    script.innerHTML = editor.getValue();

    frame.contentWindow.document.body.appendChild(script);

    if (!validateCode(frame)) {
	document.body.removeChild(frame);
	runButton.disabled = true;
    } else {
	frame.contentWindow.testRaicer = testRaicer;
	runButton.disabled = false;
    }
}

function toggleRunning(button) {
    if (running == true) {
	button.innerHTML = "Start";
	submitButton.disabled = false;
    } else {
	button.innerHTML = "Stop";
	submitButton.disabled = true;
	frame.contentWindow.init();
    }
    running = !running;
}