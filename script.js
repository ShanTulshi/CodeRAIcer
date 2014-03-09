var codelist = document.getElementById("codelist");
var firebase = new Firebase("https://coderaicing.firebaseIO.com/");
if (localStorage.getItem("facebookUID") != null && localStorage.getItem("facebookUID") != "null") {
    var uid = localStorage.getItem("facebookUID");
    var codes = firebase.child(uid).child("code");
    var i = 0;
    codes.on('child_added', function(data) {
	var option = document.createElement("option");
	option.text = "Code " + i;
	option.firebaseId = data.name();
	codelist.add(option);
	codelist.selectedIndex = codelist.length - 1;
	i++;
    });
}

// Game Logic
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var testRaicer = new Raicer();
var raicerController = new RaicerController(testRaicer);

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

    if (running && frame != null && frame.contentWindow != null) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();
	testRaicer.draw(context, canvas.height);
	context.restore();
	b2world.Step(1.0/60.0, 10, 10);
	b2world.ClearForces();
	raicerController.update(testRaicer, dt);
	// b2world.DrawDebugData()
	frame.contentWindow.update();
    }
}

testRaicer.implementPhysics();

var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var dbg = new b2DebugDraw();
dbg.SetSprite(context);
dbg.SetDrawScale(30);
dbg.SetFillAlpha(0.5);
dbg.SetLineThickness(1.0);
dbg.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
b2world.SetDebugDraw(dbg);

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
	frame.contentWindow.control = raicerController;
	frame.contentWindow.Vec2 = Box2D.Common.Math.b2Vec2;
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

function saveCode() {
    if (localStorage.getItem("facebookUID") != null && localStorage.getItem("facebookUID") != "null") {
	var uid = localStorage.getItem("facebookUID");
	var codes = firebase.child(uid).child("code");
	var selectedId = codelist.options[codelist.selectedIndex].firebaseId;
	codes.child(selectedId).set(editor.getValue());
    }
}

function loadCode() {
    if (localStorage.getItem("facebookUID") != null && localStorage.getItem("facebookUID") != "null") {
	var uid = localStorage.getItem("facebookUID");
	var codes = firebase.child(uid).child("code");
	var selectedId = codelist.options[codelist.selectedIndex].firebaseId;
	var ref = codes.child(selectedId);
	ref.once("value", function(data) {
	    editor.setValue(data.val());
	});
    }
}

function newCode() {
    if (localStorage.getItem("facebookUID") != null && localStorage.getItem("facebookUID") != "null") {
	var uid = localStorage.getItem("facebookUID");
	var codes = firebase.child(uid).child("code");
	var data = codes.push("");
	loadCode();
    }
}