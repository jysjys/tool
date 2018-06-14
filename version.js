
versionController();
function versionController() {
    var version = '1.2.0';
    var links = document.getElementsByTagName('link');
    var scripts = document.getElementsByTagName('script');
    // es6可以换种语法针对domlist集合做处理
    var linkItem ,scriptItem;
    for (var i=0; i<links.length; i++) {
         linkItem = links[i].getAttribute('href');
        if (linkItem !== null) {
             links[i].setAttribute('href', linkItem + '?version=' + version)
        } else {
            // console.log('true is null')
        }
    }
    for (var i=0; i<scripts.length; i++) {
        scriptItem = scripts[i].getAttribute('src');
        if (scriptItem !== null) {
            scripts[i].setAttribute('src', scriptItem + '?version=' + version)
        } else {
            console.log('true is null')
        }
    }
}
ieBrowserVersion();
function ieBrowserVersion() {
    var isIE = navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
    if (isIE)
    {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(navigator.userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion < 10) {
            window.location.href = './common/versionOutDated.html'
        }
        //IE版本过低
    }//isIE end
}