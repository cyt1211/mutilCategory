/**
 * Created by cyt on 2016/8/9.
 */
(function ($) {
    $.fn.mutilCategory = function (options) {
        options = $.extend({}, $.fn.mutilCategory.defaults, options || {});
        var target = $(this);
        $(document).delegate("select[name='category']", "change", function () {
            var value = $(this).val();
            var url = options.categoryUrl + "?selected=" + value;//添加参数
            var obj = $(this);
            getCategoryData(url, obj, target);
        });
        function getCategoryData(url, obj, target) {
            LD.loading.show();
            $.ajax({
                type: "get",
                url: url, //提交的url
                dataType: "json",
                data: {},
                error: function (result) {//模拟ajax，调换了error和success
                    var result = { "Code": "200", "Message": "成功", "Data": [{ "CategoryName": "女装1", "CategoryID": 1 }, { "CategoryName": "女装2", "CategoryID": 2 }] };
                    var data = result.Data;
                    if (data.length!=0) {
                        var num = $("select[name='category']").length;
                        var thatIndex = obj.attr("data-id");
                        var thatVal = obj.val();
                        var htmlCreat = creatNextSelect(num + 1, data);
                        if (thatVal != -1) {
                            if (thatIndex == num) {
                                target.append(htmlCreat);
                                if (thatIndex == 1) {
                                    target.find("select:first").focus();
                                } else {
                                    obj.next().focus();
                                }
                            } else {
                                if (thatIndex == 1) {
                                    target.empty();
                                    target.append(htmlCreat);
                                    target.find("select:first").focus();
                                } else {
                                    obj.nextAll().remove();
                                    target.append(htmlCreat);
                                    obj.next().focus();
                                }

                            }
                        } else {
                            if (thatIndex == 1) {
                                target.empty();
                            } else {
                                obj.nextAll().remove();
                            }
                        }
                    }
                    LD.loading.hide();
                },
                success: function (err) {
                    LD.loading.hide();
                    console.log(err);
                }
            });
        }
        function creatNextSelect(id,data) {
            var html = "";
            html +='<select class="inline" name="category" style=" margin-right:5px;" data-id="'+ id + '">'
                              + '<option value="-1">请选择分类</option>';
            for (var i = 0; i < data.length; i++) {
                html+="<option value=" + data[i].CategoryID + ">" + data[i].CategoryName + "</option>";
            }
            html+='</select>';
           
            return html;
        }
    }
    $.fn.mutilCategory.defaults = {
        categoryUrl: "",
        placeHolder: '请选择分类',
    };
})(jQuery);