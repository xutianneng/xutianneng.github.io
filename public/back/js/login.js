$(function () {
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: "用户名不存在"
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }

  });
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    // console.log("阻止")
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info)
        if (info.success) {
          location.href="index.html"
        }
        if (info.error === 1000) {
          // message:"用户名不存在";
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }
        if (info.error === 1001) {
          // message:"用户名不存在";
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      },
      error: function (info) {
        console.log(info)

      }
    })
  })
  $(".con").on("click", function () {
    $("form").data("bootstrapValidator").resetForm(true)
  });
 
})