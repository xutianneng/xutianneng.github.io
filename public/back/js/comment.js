$(function(){
  $(document).on("ajaxStart",function () {
    NProgress.start()
  });
  $(document).on("ajaxStop",function () {
    NProgress.done()
  });
  //======================================
  $(".lt-cai").click(function(){
    $(".lt-top").toggleClass("message");
    $(".letao-right").toggleClass("message");
    $(".letao-left").toggleClass("message");
  })
  //============================================
  $(".btn-fen").click(function(){
    $(".child").stop().slideToggle()
    
  })
  //============================================
  $(".lt-dan").click(function(){
    $("#meng").stop().modal("show")
  })
  //=============================================
  //退出
  $(".del").click(function(){
    $.ajax({
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        // console.log(info)
        if(info.success){
          location.href="login.html"
        }
      }
    })
  });
  //登陆拦截
  if(location.href.indexOf("login.html")===-1){
    $.ajax({
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        console.log(info)
        if(info.error===400){
          location.href="login.html"
        }
      }
    })
  }
})