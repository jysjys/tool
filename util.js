var Util = {};

Util.globalTopTip = function(a, b, c, d, e) {
    if ("undefined" != typeof a) {
        null == c && (c = 5e3),
        null == b && (b = "top_success");
        var f = $("#global_top_dialog");
        f.length > 0 && f.remove(),
        f = $('<div id="global_top_dialog" class="global_top_dialog"><div class="left_arrow"></div>' + a + '<div class="right_arrow"></div></div>').appendTo("body"),
        f.addClass(b),
        e && (f.find(".left_arrow").remove(),
        f.find(".right_arrow").remove(),
        f.addClass("noarrow"));
        var g = f.outerWidth();
        d ? f.css("top", $(d).offset().top + "px") : 0 == $("#header").length && f.css("top", "0px"),
        f.css({
            "margin-left": -(.5 * g) + "px"
        }).show(),
        setTimeout(function() {
            f.addClass("show"),
            setTimeout(function() {
                f.removeClass("show"),
                setTimeout(function() {
                    f.fadeOut("slow").remove()
                }, 250)
            }, c)
        }, 50)
    }
}
Util.getCookie = function (name) {
  //用处理字符串的方式查找到key对应value
  var name = escape(name);
  //读cookie属性，这将返回文档的所有cookie
  var allcookies = document.cookie;
  //查找名为name的cookie的开始位置
  name += "=";
  var pos = allcookies.indexOf(name);
  //如果找到了具有该名字的cookie，那么提取并使用它的值
  if (pos != -1) { //如果pos值为-1则说明搜索"version="失败
    var start = pos + name.length; //cookie值开始的位置
    var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
    if (end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie
    var value = allcookies.substring(start, end); //提取cookie的值
    value = decodeURI(value); //对它解码
    return (value);
  } else { //搜索失败，返回空字符串
    return "";
  }
}
Util.setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  var cookie = cname + "=" + encodeURI(cvalue) + ";path=/;";
  if(exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    cookie += expires;
  }
  document.cookie = cookie;
}
Util.removeCookie = function (cname) {
    Util.setCookie(cname, '', -1);
}

Util.ajax = function(opts) {
  var auth = Util.getCookie('Authorization');
  var defaults = {
    auth: auth,
    async: false,
    type: 'post',
    data: {},
    success: function(){},
    error: null
  }
  opts = $.extend(defaults, opts);

  $.ajax({
    headers: {
      Accept: "application/json; charset=utf-8",
      Authorization: 'Bearer' + ' ' + opts.auth
    },
    data: opts.data,
    url: opts.url,
    type: opts.type,
    success: function(data) {
      opts.success && opts.success(data);
    },
    error: function(error) {
      if(opts.error && error.error !== 'invalid_token') {
        opts.error(error);
        return;
      }
      // window.location.href = '/pages/login.html';
    }
  });
}

Util.isBrowser = function(){
    var Sys={};
    var ua=navigator.userAgent.toLowerCase();
    var s;
    (s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
    (s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:
    (s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
    (s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
    (s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
    if(Sys.ie){//Js判断为IE浏览器
      if(Sys.ie == '9.0'){//Js判断为IE 9
        return 'IE9';
      }else if(Sys.ie == '8.0'){//Js判断为IE 8
        return 'IE8';
      }else{
        return 'MSIE';
      }
    }
    if(Sys.firefox){//Js判断为火狐(firefox)浏览器
      return 'firefox';
    }
    if(Sys.chrome){//Js判断为谷歌chrome浏览器
      return 'chrome';
    }
    if(Sys.opera){//Js判断为opera浏览器
      return 'opera';
    }
    if(Sys.safari){//Js判断为苹果safari浏览器
      return 'safari';
    }
}

$.fn.loading = function(options) {
    var isLoading = this.data('isLoading')
    if(!options || options == 'true') {
        this.data('isLoading', true).attr('disabled', 'disabled');
    }else if(options == 'close') {
        this.data('isLoading', false).removeAttr('disabled');
    }
    return this;
}

$.confirm = function(options){
  var confirmWin = $("#global_confirm_window");
  var okval = "确定";
  if(options.okval){
    okval = options.okval;
  }
  if(!confirmWin.length){
    confirmWin = $("<div id='global_confirm_window' tabindex='-1' class='confirm-box' title='请确认'><div class='dlg-content'>"+options.content+"</div><div class='dlg-buttons'><span class='button default okbtn'>" + okval + "</span>&nbsp;&nbsp;<span class='button cancelbtn close'>取消</span></div></div>").appendTo("body");
  }else{
    confirmWin.find(".dlg-content").html(options.content);
    confirmWin.find(".okbtn").html(okval);
  }
  if(options.width){
    confirmWin.css("width", options.width);
  }
  if(options.height){
    confirmWin.css("height", options.height);
  }
  confirmWin.dialog();
  $(document).off('keyup.confirm').on('keyup.confirm', function(e){
    if(e.keyCode == 13)
      confirmWin.find(".okbtn").trigger('click');
  })
  confirmWin.find(".okbtn").off().on("click", function(){
    confirmWin.dialog("close");
    if(options.onConfirm){
      options.onConfirm();
    }
  });
  confirmWin.find(".cancelbtn").off("click.cancel").on("click.cancel", function(){
    if(options.onCancel){
      options.onCancel();
    }
  });
};
/**
 * 说明： 在页面指定元素中构建分页条
 * @param curPage 当前第几页
 * @param totalPage 一共有多少页
 * @param clickHandler 点击事件，传入参数为当前第几页
 * @param barCount 分页条共显示多少个按钮
 */
$.fn.pagination = function(curPage, totalPage, records, clickHandler, barCount){
  var pageBarNum = 5;
  if(barCount){
   pageBarNum = barCount;
  }
  var pageToal = '<span style="font-size:14px;position:absolute;left:0;float:left;display:inline-block;padding-left:0;margin:25px 0;border-radius:4px;">共'+ records +'条记录 </span>';
  $(pageToal).appendTo($(this));
  if(totalPage <= 1){
    return;
  }
  var pager = $('<ul></ul>').appendTo($(this));
  var tar = pager.addClass("pagination");
  var start = 1;
  var end = totalPage;
  if(totalPage > pageBarNum){
    var index = Math.floor(pageBarNum/2);
    var start = (curPage-index) > 0 ? (curPage-index) : 1;
    if(totalPage - start < pageBarNum){
      start = totalPage - pageBarNum + 1;
    }
    var end = start + pageBarNum - 1;
  }
  var pageHtml = "";
  if(curPage > 1){
    pageHtml += "<li><a p='" + (curPage - 1) + "'>«</a ></li>";
  }else{
    pageHtml += "<li class='disabled'><a>«</a ></li>";
  }
  if(start >= 2){
    pageHtml += "<li><a p='1'>1</a ></li>";
  }
  if(start >= 3){
    pageHtml += "<li class='disabled ellipsis'><a>...</a ></li>";
  }
  for (var i = start; i <= end; i++) {
    if (i > totalPage)
      break;
    if (i == curPage) {
      pageHtml += '<li class="disabled"><a>' + i + '</a ></li>';
    } else {
      pageHtml += "<li><a p='" + i + "'>" + i + "</a ></li>";
    }
  }
  if(end <= totalPage - 2){
    pageHtml += "<li class='disabled ellipsis'><a>...</a ></li><li><a p='"+totalPage+"'>"+totalPage+"</a ></li>";
  }else if(end <= totalPage - 1){
    pageHtml += "<li><a p='"+ totalPage +"'>"+totalPage+"</a ></li>";
  }
  if(curPage < totalPage){
    pageHtml += "<li><a p='" + (curPage + 1) + "'>»</a ></li>";
  }else{
    pageHtml += "<li class='disabled'><a>»</a ></li>";
  }
  tar.html(pageHtml);
  if(clickHandler){
    tar.find("a[p]").on("click", function(){
      var page = $(this).attr("p");
      clickHandler(parseInt(page));
    });
  }
};

var maskStackCount = 0;
$.mask = function(method){
  if(typeof method == "undefined"){
    method="open";
  }
  if (method == "open") {
    if (maskStackCount == 0) {
      var mask = $("<div id='window-mask' class='window-mask' style='display:none'></div>").appendTo("body");
      mask.css({
        width: $(window).width() + "px",
        height: $(window).height() + "px",
        filter: "alpha(opacity=60)"
      }).show();
      $(window).bind("resize.mask", function(){
        mask.css({
          width: $(window).width() + "px",
          height: $(window).height() + "px"
        });
      });
    }
    maskStackCount++;
  }
  else if(method == "close"){
    maskStackCount--;
    if(maskStackCount == 0){
      $("#window-mask").remove();
      $(window).unbind("resize.mask");
    }
  }

};

$.fn.dialog = function(option) {
  var dlgWin = $(this);
  if ("string" == typeof option)
    "close" == option && (dlgWin.find(".dialog-close").trigger("click"),
    null != $("#window-mask") && $("#window-mask").hide());
  else {
    var defaults = {
      fixed: !0,
      closable: !0,
      mask: !0
    };
    option = $.extend(defaults, option),
    option || (option = {});
    var title = "";
    option.title ? title = option.title : dlgWin.attr("title") && (title = dlgWin.attr("title"),
    dlgWin.attr("title", "")),
    dlgWin.addClass("dialog-box").show();
    var closeBtn = $("<div class='dialog-close'>&times;</div>").appendTo(dlgWin);
    closeBtn.bind("click", function() {
      if (!option.onClose || 0 != option.onClose()) {
        $.mask("close"),
        dlgWin.hide(),
        dlgWin.removeClass("dialog-box").find(".dialog-close").remove();
        var title = dlgWin.find(".dialog-title");
        dlgWin.attr("title", title.text()),
        title.remove(),
        $(window).unbind("resize.dialog")
      }
    }),
    dlgWin.find(".close").on("click", function() {
      closeBtn.click()
    }),
    option.closable && closeBtn.show(),
    "" != title && dlgWin.prepend("<h2 class='dialog-title'>" + title + "</h2>"),
    option.mask && $.mask(),
    $(window).bind("resize.dialog", function() {
      var outerWidth = dlgWin.outerWidth()
        , outerHeight = dlgWin.outerHeight()
        , top = 0;
      option.fixed ? (dlgWin.css("position", "fixed"),
      top = ($(window).height() - outerHeight) / 2 + "px") : (dlgWin.css("position", "absolute"),
      top = ($(window).height() - outerHeight) / 2 + $(document).scrollTop() + "px");
      var left = ($(window).width() - outerWidth) / 2 + "px";
      dlgWin.css({
        top: top,
        left: left
      })
    }),
    $(window).trigger("resize.dialog"),
    dlgWin.find(".dialog-title").draggable({
      target: dlgWin
    });
  }
  return dlgWin
}

$.fn.draggable = function(options){
  var defaults = {
    target: "default",
    clone: false,
    undrag: "",
    scroll: true,
    //callback
    start: function(){},
    drag: function(){},
    end: function(){}
  };
  var opt = $.extend(defaults, options);
  $(this).off("mousedown.drag").on("mousedown.drag", function(e){
    $(document).on("selectstart.drag dragstart", function(){return false;});
    var $this = $(this);
    var target = typeof opt.target == "string" && opt.target == "default" ? $this : opt.target;
    var downX = e.pageX;
    var downY = e.pageY;
    var downLeft = target.offset().left;
    var downTop = target.offset().top;
    if(opt.clone){
      target = $this.clone().removeAttr("id").css("position", "absolute")
      .offset({
        left: downLeft,
        top: downTop
      });
      if(typeof opt.clone == "function"){
        opt.clone.call(target, e);
        downLeft = target.css("left").replace("px", "") * 1;
        downTop = target.css("top").replace("px", "") * 1;
      }
      if(opt.opacity){
        target.css("opacity", opt.opacity);
      }
    }
    $(document).on("mousemove.drag", function(e){
      if(!$this.hasClass("ondrag")){
        $this.addClass("ondrag");
        if(opt.clone)
          target.appendTo($this.parent());
        opt.start.call($this[0], e);
      }
      var left = e.pageX - downX + downLeft;
      var top = e.pageY - downY + downTop;
      if(opt.bounding){
        var boundingleft = opt.bounding.offset().left;
        var boundingtop = opt.bounding.offset().top;
        if(left > boundingleft && top > boundingtop
          && left < boundingleft + opt.bounding.outerWidth() - target.outerWidth()
          && top < boundingtop + opt.bounding.outerHeight() - target.outerHeight()){
          target.offset({
            left: left,
            top: top
          });
        }
      }else{
        target.offset({
          left: left,
          top: top
        });
      }
      opt.drag.call($this[0], e);
    });
    $(document).on("mouseup.drag", function(e){
      opt.end.call($this[0], e);
      if(opt.clone){
        target.remove();
      }
      $(document).off("selectstart.drag dragstart");
      $(document).off("mousemove.drag");
      $(document).off("mouseup.drag");
      if(!$(".drop-hover").length){
        $this.removeClass("ondrag");
      }
    });
    $(this).on("mouseup.drag", function(e){
      $(document).trigger("mouseup.drag");
      $(this).off("mouseup.drag");
    });
  });
  if(!!opt.undrag){
    $(this).find(opt.undrag).off("mousemove.drag").on("mousemove.drag", function(e){
      e.stopPropagation();
    }).on("dragstart", function(){return false});
  }
  return this;
};

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

Array.prototype.remove = function(elem){
  var index = this.indexOf(elem);
  console.log(this, elem, index)
  if(index > -1){
    this.splice(index, 1);
  }
};

$(function() {
  if($.fn.tooltip) {
    $(document).on('mouseenter', "[data-toggle='tooltip']", function() {
      $(this).tooltip('show');
    });
  }
  if($.fn.datetimepicker) {
    $.fn.datetimepicker.defaults = {
      language: 'zh-CN',
      weekStart: 1,
      autoclose: 1,
      fontAwesome: 1,
      // endDate: new Date(),
      todayBtn:  1,
      todayHighlight: 1,
      minView: 2,
      forceParse: 0
      // container: "#page-wrapper"
    }
  }
});