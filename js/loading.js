var LD = LD || {};
LD.loading = (function () {
    var createTag = function() {
        var html = '<div id="cover" style="position: fixed;top: 0;right: 0;bottom: 0;filter: alpha(opacity=60);background-color: #777;z-index: 2002;left: 0;display: none;opacity: 0.5;"><div style="position: absolute;width: 64px;height: 64px;background-image: url(' + "./images/preloader-w8-cycle-black.gif" + ');top:50%;left:50%"></div></div>';
        $('body').append(html);
    };
    var show = function() {
        if ($('#cover').length <= 0)
            createTag();
        $("#cover").show();
    };
    var hide = function() {
        $("#cover").hide();
    };
    return {
        show: show,
        hide: hide
    }
})();