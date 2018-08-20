$(function () {
  var currentpage = 1;
  var pagesize = 5;
  var url = [];
  render();
  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      data: {
        page: currentpage,
        pageSize: pagesize
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        var renderhtml = template("rendertpl", info);
        $("tbody").html(renderhtml)
        //分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
            render()
          }
        });
      }
    })
  }

  // 弹出模态框
  $(".addbtn").click(function () {
    $("#men").modal("show");
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        var html = template("addhtml", info);
        $(".dropdown-menu").html(html);

      }
    })
  })

  // 点击a
  $(".dropdown-menu").on("click", "a", function () {
    var id = $(this).attr("data-id");
    var text = $(this).text()

    $("#dropdownText").text(text);
    $("[name=brandId]").val(id)
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID")
  });
  // 图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result);

      url.unshift(data.result);
      console.log(url)



      // console.log(url)
      $("#imgBox").prepend("<img src=" + url[0].picAddr + " width='100'>")
      if (url.length > 3) {
        $("#imgBox img").eq(-1).remove()
      }
      if (url.length === 3) {
        $("#form").data("bootstrapValidator").updateStatus("image", "VALID")

      }
    }
  });
  //表单校验
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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          },
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入产品描述'
          },
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入产品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '必须为非零数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入产品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码为xx-xx'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入产品原价'
          },
          regexp: {
            regexp: /^\d+$/,
            message: '必须为数字'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入产品现价'
          },
          regexp: {
            regexp: /^\d+$/,
            message: '必须为数字'
          }
        }
      },
      image: {
        validators: {
          //不能为空
          notEmpty: {
            message: '图片不得少于三张'
          },
        }
      },
    }

  });
  //添加请求
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    var content = $("#form").serialize()

    content += "&picName1=" + url[0].picName + "&picAddr1=" + url[0].picAddr;
    content += "&picName2=" + url[1].picName + "&picAddr2=" + url[1].picAddr;
    content += "&picName3=" + url[2].picName + "&picAddr3=" + url[2].picAddr;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: content,
      dataType: "json",
      success: function (info) {
        console.log(info)
        if(info.success){
          currentpage=1;
          render()
          $("#men").modal("hide");
          $("#dropdownText").text("请选择二级分类");
          $("#form").data("bootstrapValidator").resetForm(true);
          $("#imgBox img").remove()

        }
      },
      
    })

  })


})