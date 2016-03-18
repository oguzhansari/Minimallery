(function ($) {
    'use strict';
    $.fn.ffGallery = function (o) {
        var o = jQuery.extend({
            animateSpeed: 1500,
            animateType: 'animated',
            animatedEffect: ['zoomIn', 'zoomOut'],
            id: "glry-" + randomcode(20)
        }, o);
        return this.each(function () {
            var GT = $(this);
            var GID = o.id;
            var GTitle = GT.attr("data-gallery");
            GT.click(function () {
                var imgArrays = JSON.parse(GT.attr("data-gallery-imgs").replace(/\'/g, "\""));
                var thumbsArrays = JSON.parse(GT.attr("data-gallery-imgs").replace(/\'/g, "\""));
                var normalSizeImgs = "";
                var thumbSizeImgs = "";
                var activeImg = 0;
                var totalImg = imgArrays.length;
                var total = totalImg - 1;
                for (var i = 0; i < totalImg; i++) {
                    normalSizeImgs += '<div class="img-ctn" data-gallery-img-id="' + i + '"><figure><img src="' + imgArrays[i] + '" /></figure></div>';
                    thumbSizeImgs += '<li data-gallery-thumb-id="' + i + '"><figure><img src="' + thumbsArrays[i] + '" /></figure></li>';
                }
                var galleryHTML = '<div class="ff-galleries" id="' + GID + '"><div class="ff-gallery-ctn"><a href="#" class="ff-close"><img src="Assets/img/icon-gallery-close.png" /></a>'
                                + '<div class="ff-gallery-content"><div class="ff-gallery-title">' + GTitle + '</div><a href="#" class="ff-leftright ff-left"><span><img src="Assets/img/icon-gallery-arrow-left.png" /></span></a><div class="ff-gallery-images">'
                                + normalSizeImgs
                                + '</div><a href="#" class="ff-leftright ff-right"><span><img src="Assets/img/icon-gallery-arrow-right.png" /></span></a><div class="ff-gallery-thumbs"><nav><ul>'
                                + thumbSizeImgs
                                + '</ul></nav></div></div></div></div>';
                $('body').append(galleryHTML);
                var Gallery = $('#' + GID);
                Gallery.css({ 'display': 'block', 'opacity': 0 }).animate({ 'opacity': 1 }, 750);
                $('.ff-gallery-thumbs ul li', Gallery).click(function () {
                    $('.ff-gallery-thumbs ul li', Gallery).removeClass('active');
                    $(this).addClass('active');
                    GClicker($(this).attr('data-gallery-thumb-id'));
                    return false;
                });
                $('.ff-close', Gallery).click(function () {
                    Gallery.animate({ 'opacity': 0 }, 750, function () { $(this).remove(); });
                    return false;
                });
                $('.ff-left', Gallery).click(function () {
                    var nid = activeImg == 0 ? total : (parseInt(activeImg) - 1);
                    $('.ff-gallery-thumbs ul li[data-gallery-thumb-id="' + nid + '"]', Gallery).trigger("click");
                    return false;
                });
                $('.ff-right', Gallery).click(function () {
                    var nid = activeImg == total ? 0 : (parseInt(activeImg) + 1);
                    $('.ff-gallery-thumbs ul li[data-gallery-thumb-id="' + nid + '"]', Gallery).trigger("click");
                    return false;
                });
                function GClicker(nid) {
                    $('.ff-gallery-images .img-ctn[data-gallery-img-id="' + activeImg + '"]', Gallery).removeClass('active');
                    $('.ff-gallery-images .img-ctn[data-gallery-img-id="' + nid + '"]', Gallery).addClass('active');
                    activeImg = nid;
                }
                $('.ff-gallery-thumbs ul li[data-gallery-thumb-id="' + activeImg + '"]', Gallery).trigger("click");
                $(Gallery).hover(function () {
                    $("body").attr("onKeyDown", "$.doKey(event); return false;");
                }, function () {
                    $("body").removeAttr("onKeyDown");
                });
                $.doKey = function (e) {
                    if (e.keyCode == 37) {
                        $('.ff-left', Gallery).trigger("click");
                    } else if (e.keyCode == 39) {
                        $('.ff-right', Gallery).trigger("click");
                    }
                    return false;
                }
                return false;
            });
        });
    }
})(jQuery);
