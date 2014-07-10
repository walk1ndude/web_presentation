var RevealEngine = {
	depPath: "js/reveal.js/",
	
	InitReveal: function() {	
		Reveal.initialize({
			height: $(window).height(),
			
			width: $(window).width(),
		    // Display controls in the bottom right corner
		    controls: true,
		
		    // Display a presentation progress bar
		    progress: true,
		
		    // Display the page number of the current slide
		    slideNumber: true,
		
		    // Push each slide change to the browser history
		    history: true,
		
		    // Enable keyboard shortcuts for navigation
		    keyboard: true,
		
		    // Enable the slide overview mode
		    overview: false,
		
		    // Vertical centering of slides
		    center: true,
		
		    // Enables touch navigation on devices with touch input
		    touch: true,
		
		    // Loop the presentation
		    loop: false,
		
		    // Change the presentation direction to be RTL
		    rtl: false,
		
		    // Turns fragments on and off globally
		    fragments: true,
		
		    // Flags if the presentation is running in an embedded mode,
		    // i.e. contained within a limited portion of the screen
		    embedded: true,
		
		    // Number of milliseconds between automatically proceeding to the
		    // next slide, disabled when set to 0, this value can be overwritten
		    // by using a data-autoslide attribute on your slides
		    autoSlide: 0,
		
		    // Stop auto-sliding after user input
		    autoSlideStoppable: true,
		
		    // Enable slide navigation via mouse wheel
		    mouseWheel: false,
		
		    // Hides the address bar on mobile devices
		    hideAddressBar: true,
		
		    // Opens links in an iframe preview overlay
		    previewLinks: false,
		
		    // Transition style
		    transition: 'cube', // default/cube/page/concave/zoom/linear/fade/none
		
		    // Transition speed
		    transitionSpeed: 'default', // default/fast/slow
		
		    // Transition style for full page slide backgrounds
		    backgroundTransition: 'default', // default/none/slide/concave/convex/zoom
		
		    // Number of slides away from the current that are visible
		    viewDistance: 0,
		
		    // Parallax background image
		    parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
		
		    // Parallax background size
		    parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"
		
			dependencies: [
				{ src: RevealEngine.depPath + 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
				{ src: RevealEngine.depPath + 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: RevealEngine.depPath + 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: RevealEngine.depPath + 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
				{ src: RevealEngine.depPath + 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
				{ src: RevealEngine.depPath + 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
		        { src: RevealEngine.depPath + 'plugin/math/math.js', async: true }
		    ]	
		});
	},

	InitPresentation: function() {
	// some dummy pres
		$("#presentation-container").html(RevealTemplates.Dummy);
		
		RevealEngine.InitReveal();	
	},
	
	IsInitialized: function() {
		return $("#reveal").length();	
	},
	
	AddVerticalSlide: function() {
		var currentIndex = Reveal.getIndices();
		if (!currentIndex.v) {
			currentIndex.v = 0;
		}
		
		var horizontalSlide = $("#slides").children("section")[currentIndex.h];
		
		var verticalSlides = $(horizontalSlide).children("section");
		
		if (!!verticalSlides) {
			$(horizontalSlide).html("<section>" + $(horizontalSlide).html() + "</section>");
		}
		
		var currentSlide = $(horizontalSlide).children("section")[currentIndex.v];
		
		$(currentSlide).after(RevealTemplates.NewVerticalSlide);
		
		Reveal.slide(currentIndex.h, currentIndex.v + 1);
		
		RevealEngine.EditSlide();
	},
	
	AddHorizontalSlide: function() {
		var currentIndex = Reveal.getIndices();
		
		var currentSlide = $("#slides").children("section")[currentIndex.h];
		
		$(currentSlide).after(RevealTemplates.NewHorizontalSlide);
		
		Reveal.slide(currentIndex.h + 1, currentIndex.v);
		
		RevealEngine.EditSlide();
	},
	
	RemoveCurrentSlide: function() {
		var currentIndex = Reveal.getIndices();
		if (!currentIndex.v) {
			currentIndex.v = 0;
		}
		
		var horizontalSlide = $("#slides").children("section")[currentIndex.h];
		
		var verticalSlides = $(horizontalSlide).children("section");
		
		if (!!verticalSlides) {
			$(horizontalSlide).remove();
			
			currentIndex.h --;
			currentIndex.v = 0;
		} else {
			$(verticalSlides[currentIndex.v]).remove();
			
			// no more vertical -> go horizontal
			if (verticalSlides.length == 2) {
				$(horizontalSlide).html($(verticalSlides[1 - currentIndex.v]).html());
				
				currentIndex.v = 0;
			}
			
			currentIndex.v --;
		}
		
		Reveal.slide(currentIndex.h, currentIndex.v);
	},
	
	GoToLeftSlide: function() {
		Reveal.left();
	},
	
	GoToRightSlide: function() {
		Reveal.right();
	},
	
	GoToAboveSlide: function() {
		Reveal.up();
	},
	
	GoToBelowSlide: function() {
		Reveal.down();
	},
	
	GoToSlide: function(slideIndex) {
		var posHV = slideIndex.lastIndexOf("/")
		Reveal.slide(slideIndex.substring(2, posHV), slideIndex.substring(posHV + 1))
	},
	
	EditSlide: function() {
		var currentSlide = $("#slides section.present");
		
		$(currentSlide).attr("contenteditable", true);
		
		$(currentSlide).focus();
	},
	
	FinishEdit: function() {
		var currentSlide = $("#slides section.present");
		
		$(currentSlide).attr("contenteditable", false);
	}
}
