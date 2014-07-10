var RevealTemplates = {
	Dummy: "<div class=\"reveal\">\
			<div id=\"slides\" class=\"slides\">\
	        	<section>\
	        		<h1 class=\"slideHeader\">loading lists items individually</h1>\
	        		<ul>\
						<li class=\"fragment\">List Item 1</li>\
						<li class=\"fragment\">List Item 2</li>\
						<li class=\"fragment\">List Item 3</li>\
					</ul>\
				</section>\
				<section>\
	            	<section>\
	            		<p class=\"fragment grow\">grow</p>\
	            	</section>\
					<section>\
						Vertical Slide 2\
					</section>\
				</section>\
				<section data-markdown>\
					<script type=\"text/template\">\
						- Item 1 <!-- .element: class=\"fragment\" data-fragment-index=\"2\" -->\
						- Item 2 <!-- .element: class=\"fragment\" data-fragment-index=\"1\" -->\
					</script>\
				</section>\
				<section data-markdown>\
					<script type=\"text/template\">\
						## Page title\
						A paragraph with some text and a [link](http://hakim.se).\
					</script>\
				</section>\
			</div>\
		</div>",
		
	NewVerticalSlide: "<section><h1 class=\"slideHeader\">New slide header</h1>Content of new vertical slide</section>",
	
	NewHorizontalSlide: "<section><h1 class=\"slideHeader\">New slide header</h1>Content of new horizontal slide</section>"
}