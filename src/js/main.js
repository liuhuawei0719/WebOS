$(function(){
    $('#chrome').click(function () {
        $('.internet').addClass('open');
        if ($('.settings').hasClass('open') == true) {
            $('.settings').addClass('bottom');
            $('.settings').click(function() {
                $('.internet').addClass('bottom');
                $('.settings').removeClass('bottom');
            });
        }
    });
    $('#close-internet').click(function () {
        $('.internet').removeClass('open');
        $('.internet').removeClass('bottom');
        $('.settings').removeClass('bottom');
        if ($('.settings').hasClass('open') == true) {
            // $('.settings').addClass('open');
            $('.settings').removeClass('bottom');
        }
    });
// if($('.settings').hasClass('open') == true && $('.internet').hasClass('open') == true){
    $('.internet').click(function() {
        // $('.internet').removeClass('bottom').addClass('open');
        // $('.settings').addClass('bottom');
        $('.settings').addClass('bottom');
    });
// }
    $('#settings').click(function () {
        $('.settings').addClass('open');
        if ($('.internet').hasClass('open') == true) {
            $('.internet').addClass('bottom');
        }
    });
    $('#close-settings').click(function () {
        $('.settings').removeClass('open');
        if ($('.internet').hasClass('open') == true) {
            $('.internet').removeClass('bottom');
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

});


