/******************************************************
    * jQuery plug-in
    * Easy Background Image Resizer
    * Developed by J.P. Given (http://johnpatrickgiven.com)
    * Useage: anyone so long as credit is left alone
******************************************************/

(function($) {
	// Global Namespace
    var jqez = {};
    var container;
    var image;

    // Define the plugin
    $.fn.ezBgResize = function(options) {
		
		// Set global to obj passed
		jqez = options;
		
		// If img option is string convert to array.
		// This is in preparation for accepting an slideshow of images.
		if (!$.isArray(jqez.img)) {
			var tmp_img = jqez.img;
			jqez.img = [tmp_img]
		}
		
		$("<img/>").attr("src", jqez.img).load(function() {
			jqez.width = this.width;
			jqez.height = this.height;
			
			// Create a unique div container
			$("body").append('<div id="jq_ez_bg"></div>');
			
			container = $("#jq_ez_bg");
			
			// Add the image to it.
			container.html('<img src="' + jqez.img[0] + '" width="' + jqez.width + '" height="' + jqez.height + '" border="0">');

			// First position object
			container.css({
            	"position":"fixed",
            	"top":"0px",
  			    "left":"0px",
       	    	"z-index":"-1",
    	        "overflow":"hidden",
				"opacity" : jqez.opacity,
				"visibility": "hidden"
  		    });
			// Overflow set to hidden so scroll bars don't mess up image size.
	        $("body").css({
	            "overflow":"hidden"
	        });
	        
	        image = container.children('img');

			resizeImage();
			$(window).bind("resize", function() {
				resizeImage();
			});
			
		});
    };

	
	// Actual resize function
    function resizeImage() {
		container.css({
    	    "width":$(window).width() + "px",
			"height":$(window).height() + "px"
  		});
        
		
		// Image relative to its container
		image.css("position", "relative");

        // Resize the img object to the proper ratio of the window.
        var iw = image.width();
        var ih = image.height();
        
        if ($(window).width() > $(window).height()) {
            //console.log(iw, ih);
            if (iw > ih) {
                var fRatio = iw/ih;
                image.css("width",$(window).width() + "px");
                image.css("height",Math.round($(window).width() * (1/fRatio)));

                var newIh = Math.round($(window).width() * (1/fRatio));

                if(newIh < $(window).height()) {
                    var fRatio = ih/iw;
                    image.css("height",$(window).height());
                    image.css("width",Math.round($(window).height() * (1/fRatio)));
                }
            } else {
                var fRatio = ih/iw;
                image.css("height",$(window).height());
                image.css("width",Math.round($(window).height() * (1/fRatio)));
            }
        } else {
            var fRatio = ih/iw;
            image.css("height",$(window).height());
            image.css("width",Math.round($(window).height() * (1/fRatio)));
        }
		
		// Center the image
		if (typeof(jqez.center) == 'undefined' || jqez.center) {
			if (image.width() > $(window).width()) {
				var this_left = (image.width() - $(window).width()) / 2;
				image.css({
					"top"  : 0,
					"left" : -this_left
				});
			}
			if (image.height() > $(window).height()) {
				var this_height = (image.height() - $(window).height()) / 2;
				image.css({
					"left" : 0,
					"top" : -this_height
				});
			}
		}

        container.css({
			"visibility" : "visible"
		});

		// Allow scrolling again
		$("body").css({
            "overflow":"auto"
        });
		
        
    }
})(jQuery);