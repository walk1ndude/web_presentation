var RevealEngine = {
	depPath: "js/reveal.js/",
	
	InitReveal: function() {	
		Reveal.initialize({
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
		    viewDistance: 1,
		
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
		$("#presentation-container").html("<div class=\"reveal\">\
			<div id=\"slides\" class=\"slides\">\
	        	<section id=\"slide0#0\">\
	        		<h2>loading lists items individually</h2>\
	        		<ul>\
						<li class=\"fragment\">List Item 1</li>\
						<li class=\"fragment\">List Item 2</li>\
						<li class=\"fragment\">List Item 3</li>\
					</ul>\
				</section>\
				<section>\
	            	<section id=\"slide1#0\">\
	            		<p class=\"fragment grow\">grow</p>\
	            	</section>\
					<section id=\"slide1#1\">\
						Vertical Slide 2\
					</section>\
				</section>\
				<section data-markdown id=\"slide2#0\">\
					<script type=\"text/template\">\
						- Item 1 <!-- .element: class=\"fragment\" data-fragment-index=\"2\" -->\
						- Item 2 <!-- .element: class=\"fragment\" data-fragment-index=\"1\" -->\
					</script>\
				</section>\
				<section data-markdown id=\"slide3#0\">\
					<script type=\"text/template\">\
						## Page title\
						A paragraph with some text and a [link](http://hakim.se).\
					</script>\
				</section>\
			</div>\
		</div>");
		RevealEngine.InitReveal();
	},
	
	AddVerticalSlide: function() {
		var currentSlide = Reveal.getIndices();
		console.log(currentSlide);
		$("#slides").append("<section id=\"slide" + currentSlide.h + "#" + (++ currentSlide.v) + "\">\
			New test vertical slide</section>");
	},
	
	AddHorizontalSlide: function() {
		var currentSlide = Reveal.getIndices();
		console.log(currentSlide);
		$("#slides").append("<section id=\"slide" + (++ currentSlide.h) + "#" + currentSlide.v + "\">\
			New test horizontal slide</section>");
	},
	
	DeleteCurrentSlide: function() {
		var currentSlide = Reveal.getIndices();
		console.log(currentSlide);
		$("#slide" + currentSlide.h + "#" + currentSlide.v).remove();
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
		console.log(slideIndex.substring(2, posHV), slideIndex.substring(posHV + 1))
		Reveal.slide(slideIndex.substring(2, posHV), slideIndex.substring(posHV + 1))
	}
}
