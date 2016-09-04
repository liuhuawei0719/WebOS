//click the buttom to enter full screen
function requestFullScreen(element) {
    // 判断各种浏览器，找到正确的方法
    var requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen ||    //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
    if (requestMethod) {
        requestMethod.call(element);
    }
    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

$(function(){
    var settings = $('.settings');
    var internet = $('.internet');
    // var cache = [];
    // $.preLoadImages = function(){
    //     var args_lens = arguments.length;
    //     for(var i = args_lens;i--;){
    //         var cacheImage = document.createElement('img');
    //         cacheImage.src = arguments[i];
    //         cache.push(cacheImage);
    //     }
    // };
    // $.preLoadImages('img/girl1.jpg','img/girl2.jpg','img/girl3.jpg','img/girl4.jpg','img/girl5.jpg',
    //     'img/girl6.jpg','img/girl7.jpg','img/girl8.jpg','img/girl9.jpg');
    $('#chrome').click(function () {
        internet.addClass('open').find('iframe').attr('src','https://wwww.bing.com');
        if (settings.hasClass('open') == true) {
            settings.addClass('bottom');
            settings.click(function() {
                $('.internet').addClass('bottom');
                settings.removeClass('bottom');
            });
        }
    });
    $('#close-internet').click(function () {
        internet.removeClass('open');
        internet.removeClass('bottom');
        internet.removeClass('bottom');
        if (settings.hasClass('open') == true) {
            // $('.settings').addClass('open');
            settings.removeClass('bottom');
        }
    });
// if($('.settings').hasClass('open') == true && $('.internet').hasClass('open') == true){
    internet.click(function() {
        // $('.internet').removeClass('bottom').addClass('open');
        // $('.settings').addClass('bottom');
        settings.addClass('bottom');
    });
// }
    $('#settings').click(function () {
        settings.addClass('open');
        if (internet.hasClass('open') == true) {
            internet.addClass('bottom');
        }
    });
    $('#close-settings').click(function () {
        settings.removeClass('open');
        if (internet.hasClass('open') == true) {
            internet.removeClass('bottom');
        }
    });

    $('div.imag').click(function () {
        var imag = $(this);
        $('.imag').removeClass('chosen');
        imag.addClass('chosen');
        var url = 'url(' + imag.children().attr('src') + ') no-repeat center center fixed';

        $('body').css({ 'background': url, 'background-size': 'cover' });
    });

    $('.slider').click(function () {
        $(this).toggleClass('slider-active');
    });

    $('#dock-hidden-slider').click(function () {
        $('.dock').toggleClass('hidden');
    });

    $('.dock-position-slider').click(function () {
        var pos = $(this).attr('id');
        $('.dock-position-slider').removeClass('slider-active');
        $(this).addClass('slider-active');
        if ($('.dock').hasClass('bottom') == true) {
            $('.dock').removeClass('bottom');
        } else if ($('.dock').hasClass('left') == true) {
            $('.dock').removeClass('left');
        } else if ($('.dock').hasClass('right') == true) {
            $('.dock').removeClass('right');
        }

        $('.dock').addClass(pos);
    });

    var search_mask = $('.search_mask');
        $(search_mask).on("click", function(e){
            $(this).hide();
            $('bottom_search').find('input').focus();
            $(document).on("click", function(){
                $("search_mask").show();
            });
            e.stopPropagation();
        });


    var open_seven = function(){
        $('#seven_heros').dblclick(function(){
            internet.addClass('open').find('iframe').attr('src','http://qqgame.qq.com/frame/WdPageJump.shtml?appid=381&pid=10');
            if (settings.hasClass('open') == true) {
                settings.addClass('bottom');
                settings.click(function() {
                    $('.internet').addClass('bottom');
                    settings.removeClass('bottom');
                });
            }
        })
    };
    open_seven();
});




