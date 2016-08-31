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


;
/**
 * Created by Admin on 2016/8/31.
 */
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
var i = 1,
    j = 1,
    m = 16, //左侧选项卡数量+1
    n = 0; //每个选项卡列表数量+1
//            for (; i < m; i++) {
//                html.push('<a class="os-control-item" data-index="' + (i - 1) + '" href="#content' + i + '">选项' + i + '</a>');
//            }
//            controls.innerHTML = html.join('');
//            html = [];
//            for (i = 1; i < m; i++) {
//                html.push('<div id="content' + i + '" class="os-control-content"><ul class="os-table-view">');
//                for (j = 1; j < n; j++) {
//                    html.push('<li class="os-table-view-cell">第' + i + '个选项卡子项-' + j + '</li>');
//                }
//                html.push('</ul></div>');
//            }
//            contents.innerHTML = html.join('');
//默认选中第一个
controls.querySelector('.os-control-item').classList.add('os-active');
contents.querySelector('.os-control-content').classList.add('os-active');
(function() {
    var controlsElem = document.getElementById("segmentedControls");
    var contentsElem = document.getElementById("segmentedControlContents");
    var controlListElem = controlsElem.querySelectorAll('.os-control-item');
    var contentListElem = contentsElem.querySelectorAll('.os-control-content');
    var controlWrapperElem = controlsElem.parentNode;
    var controlWrapperHeight = controlWrapperElem.offsetHeight;
    var controlMaxScroll = controlWrapperElem.scrollHeight - controlWrapperHeight;//左侧类别最大可滚动高度
    var maxScroll = contentsElem.scrollHeight - contentsElem.offsetHeight;//右侧内容最大可滚动高度
    var controlHeight = controlListElem[0].offsetHeight;//左侧类别每一项的高度
    var controlTops = []; //存储control的scrollTop值
    var contentTops = [0]; //存储content的scrollTop值
    var length = contentListElem.length;
    for (var i = 0; i < length; i++) {
        controlTops.push(controlListElem[i].offsetTop + controlHeight);
    }
    for (var i = 1; i < length; i++) {
        var offsetTop = contentListElem[i].offsetTop;
        if (offsetTop + 100 >= maxScroll) {
            var height = Math.max(offsetTop + 100 - maxScroll, 100);
            var totalHeight = 0;
            var heights = [];
//                        for (var j = i; j < length; j++) {
//                            var offsetHeight = contentListElem[j].offsetHeight;
//                            totalHeight += offsetHeight;
//                            heights.push(totalHeight);
//                        }
            for (var m = 0, len = heights.length; m < len; m++) {
                contentTops.push(parseInt(maxScroll - (height - heights[m] / totalHeight * height)));
            }
            break;
        } else {
            contentTops.push(parseInt(offsetTop));
        }
    }
    contentsElem.addEventListener('scroll', function() {
        var scrollTop = contentsElem.scrollTop;
        for (var i = 0; i < length; i++) {
            var offsetTop = contentTops[i];
            var offset = Math.abs(offsetTop - scrollTop);
//						console.log("i:"+i+",scrollTop:"+scrollTop+",offsetTop:"+offsetTop+",offset:"+offset);
            if (scrollTop < offsetTop) {
                if (scrollTop >= maxScroll) {
                    onScroll(length - 1);
                } else {
                    onScroll(i - 1);
                }
                break;
            } else if (offset < 20) {
                onScroll(i);
                break;
            }else if(scrollTop >= maxScroll){
                onScroll(length - 1);
                break;
            }
        }
    });
    var lastIndex = 0;
    //监听content滚动
    var onScroll = function(index) {
        if (lastIndex !== index) {
            lastIndex = index;
            var lastActiveElem = controlsElem.querySelector('.os-active');
            lastActiveElem && (lastActiveElem.classList.remove('os-active'));
            var currentElem = controlsElem.querySelector('.os-control-item:nth-child(' + (index + 1) + ')');
            currentElem.classList.add('os-active');
            //简单处理左侧分类滚动，要么滚动到底，要么滚动到顶
            var controlScrollTop = controlWrapperElem.scrollTop;
            if (controlScrollTop + controlWrapperHeight < controlTops[index]) {
                controlWrapperElem.scrollTop = controlMaxScroll;
            } else if (controlScrollTop > controlTops[index] - controlHeight) {
                controlWrapperElem.scrollTop = 0;
            }
        }
    };
    //滚动到指定content
    var scrollTo = function(index) {
        contentsElem.scrollTop = contentTops[index];
    };
    controlsElem.on('tap', '.os-control-item', function(e) {
        scrollTo(this.getAttribute('data-index'));
        return false;
    });
})();
