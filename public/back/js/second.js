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
      dataType: "json",
      success: function (info) {
        console.log(info)
        var htmlstr = template("rendertpl", info);
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
  $(".addbtn").click(function () {
    $("#men").modal("show");
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        var addhtml = template("addtpl", info);
        $(".modal ul").html(addhtml)
      }
    })
  });
  $(".dropdown-menu").on("click", "a", function () {
    $("#dropdownText").text($(this).text())
    var id = $(this).attr('data-id')
    $("[name=categoryId]").val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result.picAddr);
      var url = data.result.picAddr;
      $("#imgBox img").attr("src", url)
      $("[name=brandLogo]").val(url);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")

    }
  });
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          },

        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          },

        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择图片'
          },

        }
      },
    }

  });
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {
          render();
          $("#men").modal("hide");
          $("#imgBox img").attr("src", "./images/none.png")
          $("#dropdownText").text("请选择一级分类");



        }
      }
    })
  })
})