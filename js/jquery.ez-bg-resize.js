/******************************************************
    * jQuery plug-in
    * Easy Background Image Resizer
    * Developed by J.P. Given (http://johnpatrickgiven.com)
    * Some modifcations by Hay Kranen < http://www.haykranen.nl >
    * Useage: anyone so long as credit is left alone
******************************************************/

(function($) {
    var containerObj, center = false;

    // plugin definition
    $.fn.ezBgResize = function(center) {
        center = center || false;
        //console.log(center);
        // First position object
        containerObj = this;

        containerObj.css("visibility","hidden");

        $("body").css({
            "overflow-x":"hidden"
        });

        $(window).load(function() {
            resizeImage();
        });

        $(window).bind("resize",function() {
            resizeImage();
        });

    };

    function resizeImage() {
        $("body").css({
            "overflow-x":"auto"
        });

        containerObj.css({
            "position":"fixed",
            "top":"0px",
            "left":"0px",
            "z-index":"-1",
            "overflow":"hidden",
            "width":getWindowWidth() + "px",
            "height":getWindowHeight() + "px"
        });

        // Resize the img object to the proper ratio of the window.
        var iw = containerObj.children('img').width();
        var ih = containerObj.children('img').height();
        
        if ($(window).width() > $(window).height()) {
            //console.log(iw, ih);
            if (iw > ih) {
                var fRatio = iw/ih;
                containerObj.children('img').css("width",$(window).width() + "px");
                containerObj.children('img').css("height",Math.round($(window).width() * (1/fRatio)));

                var newIh = Math.round($(window).width() * (1/fRatio));

                if(newIh < $(window).height()) {
                    var fRatio = ih/iw;
                    containerObj.children('img').css("height",$(window).height());
                    containerObj.children('img').css("width",Math.round($(window).height() * (1/fRatio)));
                }
            } else {
                var fRatio = ih/iw;
                containerObj.children('img').css("height",$(window).height());
                containerObj.children('img').css("width",Math.round($(window).height() * (1/fRatio)));
            }
        } else {
            var fRatio = ih/iw;
            containerObj.children('img').css("height",$(window).height());
            containerObj.children('img').css("width",Math.round($(window).height() * (1/fRatio)));
        }

        containerObj.css("visibility","visible");

        // Center BG Image
        if (center) {
            containerObj.children('img').css("position","relative");

            if (containerObj.children('img').width() > containerObj.width()) {
                var wDiff = (containerObj.children('img').width() - containerObj.width()) / 2;
                containerObj.children('img').css("left", "-" + wDiff + "px");
            }
        }
    }

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