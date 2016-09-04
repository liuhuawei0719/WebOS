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




;
/**
 * Created by Admin on 2016/8/31.
 */
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
var i = 1,
    j = 1;
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
    for (i = 0; i < length; i++) {
        controlTops.push(controlListElem[i].offsetTop + controlHeight);
    }
    for (i = 1; i < length; i++) {
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
    // var scrollTo = function(index) {
    //     contentsElem.scrollTop = contentTops[index];
    // };
    // controlListElem.on('click', '.os-control-item', function(e) {
    //     scrollTo(this.getAttribute('data-index'));
    //     return false;
    // });
})();


;/**
 * Created by Admin on 2016/9/4.
 */
//------------------预加载-------------------
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(root 即 window)
        root.resLoader = factory(root);
    }
}(this, function () {
    var isFunc = function(f){
        return typeof f === 'function';
    };
    //构造器函数
    function resLoader(config){
        this.option = {
            resourceType : 'image', //资源类型，默认为图片
            baseUrl : './', //基准url
            resources : [], //资源路径数组
            onStart : null, //加载开始回调函数，传入参数total
            onProgress : null, //正在加载回调函数，传入参数currentIndex, total
            onComplete : null //加载完毕回调函数，传入参数total
        };
        if(config){
            for(i in config){
                this.option[i] = config[i];
            }
        }
        else{
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    };

    resLoader.prototype.start = function(){
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for(var i=0,l=this.option.resources.length; i<l; i++){
            var r = this.option.resources[i], url = '';
            if(r.indexOf('http://')===0 || r.indexOf('https://')===0){
                url = r;
            }
            else{
                url = baseUrl + r;
            }

            var image = new Image();
            image.onload = function(){_this.loaded();};
            image.onerror = function(){_this.loaded();};
            image.src = url;
        }
        if(isFunc(this.option.onStart)){
            this.option.onStart(this.total);
        }
    };

    resLoader.prototype.loaded = function(){
        if(isFunc(this.option.onProgress)){
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if(this.currentIndex===this.total){
            if(isFunc(this.option.onComplete)){
                this.option.onComplete(this.total);
            }
        }
    };

    //暴露公共方法
    return resLoader;
}));

//preloader Init
var flag = true;
if(!requestFullScreen(document.documentElement)&&flag==true) {
    var loader = new resLoader({
        resources: [
            'img/girl1.jpg',
            'img/girl2.jpg',
            'img/girl3.jpg',
            'img/girl4.jpg',
            'img/girl5.jpg',
            'img/girl6.jpg',
            'img/girl7.jpg',
            'img/girl8.jpg',
            'img/girl9.jpg',
            'img/icons/settings.png',
            'img/icons/windowsstart.png',
            'img/icons/seven_heros.png',
            'audio/3374.wav'
        ],
        onStart: function (total) {
        },
        onProgress: function (current, total) {
            setTimeout(function () {
                $('.letter').addClass('loaded');
                $('.reg-text').addClass('loaded');
            }, 100);
            var percent = current / total * 100;
            $('.fix_load_caption').text('loading now..:');
            $('.progressbar').css('width', percent + '%');
            $('.progresstext .current').text(current);
            $('.progresstext .total').text(total);
        },
        onComplete: function (total) {
            $('.fix_load_caption').text('finished:');
            $('#start_button').delay(2000).css('opacity', '1').click(function () {
                requestFullScreen(document.documentElement);
                flag = false;
                $('.progress').delay(1100).fadeOut(500, function () {
                    var start_os = document.getElementById('start_os');
                    start_os.play();
                });
            })
        }
    });
    loader.start();
}

//--------------------右键菜单---------------
var menu_main = new BootstrapMenu('#screen', {
    actions: [
        {
            name: '查看（V）',
            onClick: function() {
                toastr.error("无此功能！");
            }
        },
        {
            name: '排序方式（O）',
            onClick: function() {
                toastr.error("无此功能！");
            }
        },
        {
            name: '重启（E）',
            onClick: function() {
                toastr.info("正在重启");
                history.go(0)
            }
        },
        {
            name: '显示设置',
            onClick: function() {
                toastr.error("无此功能！");
            }
        },
        {
            name: '个性化',
            onClick: function() {
                toastr.error("无此功能！");
            }
        }
    ]
});

var app_items_menu = new BootstrapMenu('.app_items', {
    actions: [
        {
            name: '打开',
            onClick: function () {
                toastr.warning("请双击打开应用！");
            }
        },
        {
            name: '打开目录',
            onClick: function () {
                toastr.error("对不起，无法找到该目录！");
            }
        },
        {
            name: '删除此应用',
            onClick: function () {
                $('.app_items').css('display', 'none');
                toastr.success("已删除应用");
            }
        }
    ]
});

//drag
var elem = document.querySelector('.app_items');
var elem2 = document.querySelector('.internet');
var elem3 = document.querySelector('.settings');
var item_draggie = new Draggabilly( elem );
var iframe_draggie = new Draggabilly( elem2 );
var settings_draggie =  new Draggabilly( elem3 );
;/*
 * Toastr
 * Copyright 2012-2014
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
; (function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.0',
                warning: warning
            };

            var previousToast;

            return toastr;

            //#region Accessible Methods
            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }
            //#endregion

            //#region Internal Methods

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options) {
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)
                    .attr('aria-live', 'polite')
                    .attr('role', 'alert');

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    target: 'body',
                    closeHtml: '<button>&times;</button>',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions(),
                    iconClass = map.iconClass || options.iconClass;

                if (options.preventDuplicates) {
                    if (map.message === previousToast) {
                        return;
                    } else {
                        previousToast = map.message;
                    }
                }

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                toastId++;

                $container = getContainer(options, true);
                var intervalId = null,
                    $toastElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    $progressElement = $('<div/>'),
                    $closeElement = $(options.closeHtml),
                    progressBar = {
                        intervalId: null,
                        hideEta: null,
                        maxHideTime: null
                    },
                    response = {
                        toastId: toastId,
                        state: 'visible',
                        startTime: new Date(),
                        options: options,
                        map: map
                    };

                if (map.iconClass) {
                    $toastElement.addClass(options.toastClass).addClass(iconClass);
                }

                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass);
                    $toastElement.append($titleElement);
                }

                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass);
                    $toastElement.append($messageElement);
                }

                if (options.closeButton) {
                    $closeElement.addClass('toast-close-button').attr('role', 'button');
                    $toastElement.prepend($closeElement);
                }

                if (options.progressBar) {
                    $progressElement.addClass('toast-progress');
                    $toastElement.prepend($progressElement);
                }

                $toastElement.hide();
                if (options.newestOnTop) {
                    $container.prepend($toastElement);
                } else {
                    $container.append($toastElement);
                }
                $toastElement[options.showMethod](
                    {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                );

                if (options.timeOut > 0) {
                    intervalId = setTimeout(hideToast, options.timeOut);
                    progressBar.maxHideTime = parseFloat(options.timeOut);
                    progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    if (options.progressBar) {
                        progressBar.intervalId = setInterval(updateProgress, 10);
                    }
                }

                $toastElement.hover(stickAround, delayedHideToast);
                if (!options.onclick && options.tapToDismiss) {
                    $toastElement.click(hideToast);
                }

                if (options.closeButton && $closeElement) {
                    $closeElement.click(function (event) {
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                            event.cancelBubble = true;
                        }
                        hideToast(true);
                    });
                }

                if (options.onclick) {
                    $toastElement.click(function () {
                        options.onclick();
                        hideToast();
                    });
                }

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function hideToast(override) {
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () {
                            removeToast($toastElement);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                }
            }
            //#endregion

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window['toastr'] = factory(window['jQuery']);
    }
}));
