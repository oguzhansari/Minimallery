(function ($) {
    'use strict';
    $.fn.ffminimallery = function (o) {
        var o = jQuery.extend({
            id: "glry-" + randomcode(20)
        }, o);
        return this.each(function () {
            var GT = $(this);
            var GID = o.id;
            var GTitle = GT.attr("data-minimallery");
            GT.click(function () {
                var imgArrays = JSON.parse(GT.attr("data-minimallery-imgs").replace(/\'/g, "\""));
                var thumbsArrays = JSON.parse(GT.attr("data-minimallery-imgs").replace(/\'/g, "\""));
                var normalSizeImgs = "";
                var thumbSizeImgs = "";
                var activeImg = 0;
                var totalImg = imgArrays.length;
                var total = totalImg - 1;
                for (var i = 0; i < totalImg; i++) {
                    normalSizeImgs += '<div class="img-ctn" data-minimallery-img-id="' + i + '"><figure><img src="' + imgArrays[i] + '" /></figure></div>';
                    thumbSizeImgs += '<li data-minimallery-thumb-id="' + i + '"><figure><img src="' + thumbsArrays[i] + '" /></figure></li>';
                }
                var minimalleryHTML = '<div class="minimallery" id="' + GID + '"><div class="minimallery-ctn"><a href="#" class="ff-close"><img src="Assets/img/icon-minimallery-close.png" /></a>'
                                + '<div class="minimallery-content"><div class="minimallery-title">' + GTitle + '</div><a href="#" class="ff-leftright ff-left"><span><img src="Assets/img/icon-minimallery-arrow-left.png" /></span></a><div class="minimallery-images">'
                                + normalSizeImgs
                                + '</div><a href="#" class="ff-leftright ff-right"><span><img src="Assets/img/icon-minimallery-arrow-right.png" /></span></a><div class="minimallery-thumbs"><nav><ul>'
                                + thumbSizeImgs
                                + '</ul></nav></div></div></div></div>';
                $('body').append(minimalleryHTML);
                var minimallery = $('#' + GID);
                minimallery.css({ 'display': 'block', 'opacity': 0 }).animate({ 'opacity': 1 }, 750);
                $('.minimallery-thumbs ul li', minimallery).click(function () {
                    $('.minimallery-thumbs ul li', minimallery).removeClass('active');
                    $(this).addClass('active');
                    GClicker($(this).attr('data-minimallery-thumb-id'));
                    return false;
                });
                $('.ff-close', minimallery).click(function () {
                    minimallery.animate({ 'opacity': 0 }, 750, function () { $(this).remove(); });
                    return false;
                });
                $('.ff-left', minimallery).click(function () {
                    var nid = activeImg == 0 ? total : (parseInt(activeImg) - 1);
                    $('.minimallery-thumbs ul li[data-minimallery-thumb-id="' + nid + '"]', minimallery).trigger("click");
                    return false;
                });
                $('.ff-right', minimallery).click(function () {
                    var nid = activeImg == total ? 0 : (parseInt(activeImg) + 1);
                    $('.minimallery-thumbs ul li[data-minimallery-thumb-id="' + nid + '"]', minimallery).trigger("click");
                    return false;
                });
                function GClicker(nid) {
                    $('.minimallery-images .img-ctn[data-minimallery-img-id="' + activeImg + '"]', minimallery).removeClass('active');
                    $('.minimallery-images .img-ctn[data-minimallery-img-id="' + nid + '"]', minimallery).addClass('active');
                    activeImg = nid;
                }
                $('.minimallery-thumbs ul li[data-minimallery-thumb-id="' + activeImg + '"]', minimallery).trigger("click");
                $(minimallery).hover(function () {
                    $("body").attr("onKeyDown", "$.doKey(event); return false;");
                }, function () {
                    $("body").removeAttr("onKeyDown");
                });
                $.doKey = function (e) {
                    if (e.keyCode == 37) {
                        $('.ff-left', minimallery).trigger("click");
                    } else if (e.keyCode == 39) {
                        $('.ff-right', minimallery).trigger("click");
                    }
                    return false;
                }
                return false;
            });
        });
    }
})(jQuery);
$(function () {
    $('[data-minimallery]').minimallery();
});
function randomcode(t) { void 0 == t && (t = 10); for (var o = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", s = 0; t > s; s++) o += n.charAt(Math.floor(Math.random() * n.length)); return o }
