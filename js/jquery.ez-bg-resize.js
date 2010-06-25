/******************************************************
	* jQuery plug-in
	* Easy Background Image Resizer
	* Developed by J.P. Given (http://johnpatrickgiven.com)
	* Useage: anyone so long as credit is left alone
******************************************************/
(function($) {
	// plugin definition
	$.fn.ezBgResize = function(options) {
		// First position object
		this.css("position","fixed");
		this.css("top","0px");
		this.css("left","0px");
		this.css("z-index","-1");
		this.css("overflow","hidden");
		
		// Set obj to the width and height of window
		this.css("width",getWindowWidth() + "px");
		this.css("height",getWindowHeight() + "px");
		
		// Resize the img object to the proper ratio of the window.
		var iw = this.children('img').width();
		var ih = this.children('img').height();
		if (getWindowWidth() > getWindowHeight()) {
			if (iw > ih) {
				var fRatio = iw/ih;
				this.children('img').css("width",getWindowWidth() + "px");
				this.children('img').css("height",Math.round(getWindowWidth() * (1/fRatio)));
				
				var newIh = Math.round(getWindowWidth() * (1/fRatio));
				
				if(newIh < getWindowHeight()) {
					var fRatio = ih/iw;
					this.children('img').css("height",getWindowHeight());
					this.children('img').css("width",Math.round(getWindowHeight() * (1/fRatio)));
				}
			} else {
				var fRatio = ih/iw;
				this.children('img').css("height",getWindowHeight());
				this.children('img').css("width",Math.round(getWindowHeight() * (1/fRatio)));
			}
		} else {
			var fRatio = ih/iw;
			this.children('img').css("height",getWindowHeight());
			this.children('img').css("width",Math.round(getWindowHeight() * (1/fRatio)));
		}
	};
	
	// private function for debugging
	function debug($obj) {
		if (window.console && window.console.log) {
			window.console.log('Window Width: ' + $(window).width());
			window.console.log('Window Height: ' + $(window).height());
		}
	};
	
	// Dependable function to get Window Height
	function getWindowHeight() {
		var windowHeight = 0;
		if (typeof(window.innerHeight) == 'number') {
			windowHeight = window.innerHeight;
		}
		else {
			if (document.documentElement && document.documentElement.clientHeight) {
				windowHeight = document.documentElement.clientHeight;
			}
			else {
				if (document.body && document.body.clientHeight) {
					windowHeight = document.body.clientHeight;
				}
			}
		}
		return windowHeight;
	};
	
	// Dependable function to get Window Width
	function getWindowWidth() {
		var windowWidth = 0;
		if (typeof(window.innerWidth) == 'number') {
			windowWidth = window.innerWidth;
		}
		else {
			if (document.documentElement && document.documentElement.clientWidth) {
				windowWidth = document.documentElement.clientWidth;
			}
			else {
				if (document.body && document.body.clientWidth) {
					windowWidth = document.body.clientWidth;
				}
			}
		}
		return windowWidth;
	};
})(jQuery);