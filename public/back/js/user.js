$(function () {
  var page = 1;
  var pagesize = 5;
  render();
  function render() {
    $.ajax({
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pagesize
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        var html = template("tpl", info);
        $("tbody").html(html);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page1) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            page = page1;
            render()
          }
        });
      }
    })
  }
})