var Engine = RevealEngine;

var wsUrl = "ws://localhost:8888";

var checkInterval = 1000;

function slideControl(config) {
	alert(config)
	
	if (config["type"] == "webpres") {
		Engine.GoToSlide(config["slideIndex"])
	}
}

$(document).ready(function(){	
	$("#createMain").on("click", Engine.InitPresentation);
	
	$("#addMain").on("click", function() {
		$("#addVertical").toggle();
		$("#addHorizontal").toggle();
	});
	
	$("#addVertical").on("click", Engine.AddVerticalSlide);
	$("#addHorizontal").on("click", Engine.AddHorizontalSlide);
	
	$("#deleteMain").on("click", Engine.DeleteCurrentSlide);
	
	$("#leftMain").on("click", Engine.GoToLeftSlide);
	$("#rightMain").on("click", Engine.GoToRightSlide);
	
	$("#aboveMain").on("click", Engine.GoToAboveSlide);
	$("#belowMain").on("click", Engine.GoToBelowSlide);
	
	var ws = new WebSocket(wsUrl);
    
    ws.onmessage = function(evt) {
    	slideControl($.parseJSON(evt.data))
    }
	/*
	$.getJSON(urlCfg, function(config) {
		for(var property in config) {
			slides.property = config[property];
		}
		console.log(slides); 
	});*/
});
