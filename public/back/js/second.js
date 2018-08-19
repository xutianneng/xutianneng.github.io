$(function () {
  var currentpage = 1;
  var pagesize = 5;
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentpage,
        pageSize: pagesize
      },
      dataType:"json",
      success:function(info){
        console.log(info)
        var htmlstr=template("rendertpl",info);
        $("tbody").html(htmlstr)
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page1) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page1;
            render()
          }
        });
      }
    })
  };
  $(".addbtn").click(function(){
    $("#men").modal("show");
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100,
      },
      dataType:"json",
      success:function(info){
        console.log(info)
        var addhtml=template("addtpl",info);
        $(".modal ul").html(addhtml)
      }
    })
  });
  $(".dropdown-menu").on("click","a",function(){
    $("#dropdownText").text($(this).text())
  })
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result.picAddr);
      var url=data.result.picAddr;
      $("#imgBox img").attr("src",url)
    }
});
})