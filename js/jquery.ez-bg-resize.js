/******************************************************
    * jQuery plug-in
    * Easy Background Image Resizer
    * Developed by J.P. Given (http://johnpatrickgiven.com)
    * Some modifcations by Hay Kranen < http://www.haykranen.nl >
    * Useage: anyone so long as credit is left alone
******************************************************/

(function($) {
    var containerObj = false;

    // plugin definition
    $.fn.ezBgResize = function(center) {
        center = center || false;
        //console.log(center);
        // First position object
        containerObj = this;

        containerObj.css("visibility","hidden");

        $("body").css({
            "overflow":"hidden"
        });

        $(window).bind("load", function() {
            resizeImage();
        });

        $(window).bind("resize",function() {
            resizeImage();
        });

    };

    function resizeImage() {
        containerObj.css({
            "position":"fixed",
            "top":"0px",
            "left":"0px",
            "z-index":"-1",
            "overflow":"hidden",
            "width":$(window).width() + "px",
            "height":$(window).height() + "px"
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

        $("body").css({
            "overflow":"auto"
        });
    }
})(jQuery);