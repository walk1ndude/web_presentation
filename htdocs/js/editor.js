var Engine = RevealEngine;

var wsUrl = "ws://localhost:8888";

function slideControl(config) {	
	if (Engine.IsInitialized) {
		if (config["type"] == "webpres") {
			Engine.GoToSlide(config["slideIndex"])
		}
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
	
	$("#removeMain").on("click", Engine.RemoveCurrentSlide);
	
	$("#leftMain").on("click", Engine.GoToLeftSlide);
	$("#rightMain").on("click", Engine.GoToRightSlide);
	
	$("#aboveMain").on("click", Engine.GoToAboveSlide);
	$("#belowMain").on("click", Engine.GoToBelowSlide);
	
	$(document).on("dblclick", "#presentation-container", Engine.EditSlide);
	
	$(document).on("mousedown", "div:not(.presentation-container)", Engine.FinishEdit);
	
	var ws = new WebSocket(wsUrl);
    
    ws.onmessage = function(evt) {
    	slideControl($.parseJSON(evt.data))
    }
});
