var Engine = RevealEngine;

var wsUrl = "ws://localhost:8888";

function slideControl(config) {	
	if (Engine.IsInitialized) {
		if (config["type"] == "webpres") {
			Engine.GoToSlide(config["slideIndex"])
		}
	}
}

function showMenu(x) {
	var wMenu = $(window).width() * 0.2;

	if ($("#menu").css("visibility") == "visible") {
		if (x > wMenu) {
			$("#menu").css("width", "0px");
			$("#menu").css("visibility", "hidden");
		}
	} else if (x < 5) {
		$("#menu").css("width", wMenu + "px");
		$("#menu").css("visibility", "visible");	
	}
}

$(document).ready(function(){	
	$("#createMain").on("click", Engine.InitPresentation);

	$("#addVertical").on("click", Engine.AddVerticalSlide);
	$("#addHorizontal").on("click", Engine.AddHorizontalSlide);
	
	$("#removeMain").on("click", Engine.RemoveCurrentSlide);
	
	$("#leftMain").on("click", Engine.GoToLeftSlide);
	$("#rightMain").on("click", Engine.GoToRightSlide);
	
	$("#aboveMain").on("click", Engine.GoToAboveSlide);
	$("#belowMain").on("click", Engine.GoToBelowSlide);
	
	$(document).on("dblclick", "#presentation-container", Engine.EditSlide);
	
	$(document).on("mousedown", "div:not(.presentation-container)", Engine.FinishEdit);
	
	$(document).on("mousemove", function(event) {
		showMenu(event.pageX);
	});
	
	var ws = new WebSocket(wsUrl);
    
    ws.onmessage = function(evt) {
    	slideControl($.parseJSON(evt.data))
    }
});
