/**
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
