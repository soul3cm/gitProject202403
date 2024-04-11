
     var flag_userID = false;
    var flag_username = false;
        var flag_password = false;
        var flag_re_password = false;
        var flag_email = false;
        var flag_chk01 = false;

    $(function(){
        //判斷是否登入
        if(getCookie("UID01") !=""){
                //UID01存在，傳遞至後端api 判斷是否合法
                var dataJSON = {};
                dataJSON["UID01"]=getCookie("UID01");
                // console.log(JSON.stringify(dataJSON));
                $.ajax({
                    type: "POST",
                    url: "https://3cmproject.000webhostapp.com/project1/member/member-Check_UID-api.phpp",
                    data: JSON.stringify(dataJSON),
                    dataType: "json",
                    success:showdata_Check_UID,
                    error:function(){
                        alert("error-member-Check_UID-api.php")
                    }
                });
            }

        // 監測帳號輸入
        $("#userID").bind("input propertychange", function(){
               // console.log($(this).val().length); is-invalid
                if($(this).val().length > 7 && $(this).val().length <21){
                    //符合規定
                    var dataJSON = {};
                    dataJSON["UserID"] = $("#userID").val();
                    // console.log(JSON.stringify(dataJSON));

                    $.ajax({
                        type:"POST",
                        url:"https://3cmproject.000webhostapp.com/project1/member/member-check_ID_uni_api.php",
                        data:JSON.stringify(dataJSON),
                        dataType:"json",
                        success: showdata_check_ID_uni,
                        error: function(){
                            alert("error-member-check_ID_uni_api.php");
                        }
                    });
                    
                }else{
                    //不符合規定
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                    flag_userID = false;
                }
            });

            // 監測使用者名稱
            $("#username").bind("input propertychange", function(){
               // console.log($(this).val().length); is-invalid
                if($(this).val().length > 0 && $(this).val().length <10){
                    //符合規定
                    var dataJSON = {};
                    dataJSON["UserName"] = $("#username").val();
                    // console.log(JSON.stringify(dataJSON));

                    $.ajax({
                        type:"POST",
                        url:"https://3cmproject.000webhostapp.com/project1/member/member-check_Name_uni_api.php",
                        data:JSON.stringify(dataJSON),
                        dataType:"json",
                        success: showdata_check_Name_uni,
                        error: function(){
                            alert("error-member-check_Name_uni_api.php");
                        }
                    });
                    
                }else{
                    //不符合規定
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                    flag_username = false;
                }
            });

            
            //即時監聽 #password
            $("#password").bind("input propertychange", function(){
               // console.log($(this).val().length); is-invalid
                if($(this).val().length > 7 && $(this).val().length < 21){
                    //符合規定
                    $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                    flag_password = true;
                }else{
                    //不符合規定
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                    flag_password = false;
                }
            });

            //即時監聽 #re_password
            $("#re_password").bind("input propertychange", function(){
                if($(this).val() == $("#password").val()){
                    //符合規定
                    $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                    flag_re_password = true;
                }else{
                    //不符合規定
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                    flag_re_password = false;
                }
            });

            //即時監聽 #email
            $("#email").bind("input propertychange", function(){
               // console.log($(this).val().length); is-invalid
                if($(this).val().length > 0 && $(this).val().length < 30){
                    //符合規定
                    $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                    flag_email = true;
                }else{
                    //不符合規定
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                    flag_email = false;
                }
            });

            //監聽 checkbox #chk01
            $("#chk01").change(function(){
                if($(this).is(":checked")){
                    // console.log("遵守");
                    flag_chk01 = true;
                }else{
                    // console.log("不遵守");  
                    flag_chk01 = false;  
                }
                
            });

            //註冊按鈕監聽 #reg_btn
            $("#reg_btn").click(function(){
                // console.log("test");             
                if(flag_username && flag_password && flag_re_password && flag_email && flag_chk01){
                    
                    var dataJSON = {};
                    dataJSON["UserID"] = $("#userID").val();
                    dataJSON["UserName"] = $("#username").val();
                    dataJSON["Password"] = $("#password").val();
                    dataJSON["Email"]    = $("#email").val();
                  

                    

                    //傳遞至後端執行註冊行為
                    $.ajax({
                        type: "POST",
                        url: "https://3cmproject.000webhostapp.com/project1/member/member-Create-api.php",
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: showdata,
                        error: function(){
                            alert("error-member-Create-api.php");
                        }
                    });

                }else{
                    alert("欄位有錯請修正!");
                }
            });

            //登入按鈕監聽 #login_btn
            $("#login_btn").click(function(){
                
                var dataJSON ={};
                dataJSON["UserID"]=$("#login_userID").val();
                dataJSON["Password"]=$("#login_password").val();

                //傳遞至後端執行登入行為
                $.ajax({
                    type:"POST",
                    url: "https://3cmproject.000webhostapp.com/project1/member/member-login_api.php",
                    data: JSON.stringify(dataJSON),
                    dataType:"json",
                    success: showdata_login,
                    error: function(){
                        alert("error-member-login_api.php");
                    }
                });
            });

            $("#cancelModal").click(function(){
                location.reload();
            });
            $("#member_x").click(function(){
                location.reload();
            });

            $("#logout_btn").click(function(){
                setCookie("UID01","",7);
                location.reload();
            });
    });

    function showdata(data){
            console.log(data);
            if(data.state){
                alert(data.message);
                location.reload();
            }else{
                alert(data.message);
            }
        }

        function showdata_check_ID_uni(data) {
            console.log(data);
            if (data.state) {
                //帳號不存在, 可以使用!
                $("#userID").removeClass('is-invalid');
                $("#userID").addClass('is-valid');
                flag_userID = true;
                // 顯示帳號符合規則的訊息
                 $("#userID + .valid-feedback").text("帳號不存在，可以使用").show();

                // 隱藏帳號不符合規則的訊息
                $("#userID + .invalid-feedback").hide();
            } else {
                //帳號存在, 不可以使用!
                $("#userID").removeClass('is-valid');
                $("#userID").addClass('is-invalid');
                flag_userID = false;

                $("#userID + .invalid-feedback").text("名稱存在，不可以使用!").show();

                // 隱藏帳號符合規則的訊息
                $("#userID + valid-feedback").hide();
            }
        }

        function showdata_check_Name_uni(data) {
            // console.log(data);
            if (data.state) {
                //名稱不存在, 可以使用!
                $("#username").removeClass('is-invalid');
                $("#username").addClass('is-valid');
                flag_username = true;                
                 $("#username + .valid-feedback").text("名稱不存在，可以使用").show();                
                $("#username + .invalid-feedback").hide();
            } else {
                //名稱存在, 不可以使用!
                $("#username").removeClass('is-valid');
                $("#username").addClass('is-invalid');
                flag_username = false;

                $("#username + .invalid-feedback").text("名稱存在，不可以使用!").show();

                // 隱藏帳號符合規則的訊息
                $("#username + valid-feedback").hide();
            }
        }

        function showdata_login(data){
            console.log(data);
            if(data.state){
                alert(data.message);
                //console.log(data.data[0].UID01);
                var uid01 = data.data[0].UID01;
                setCookie("UID01", uid01, 7);

                $("#loginModal").modal("hide");
                
                $("#user_message").text(data.data[0].Username+"登入中!");
                location.reload();
                $("#loginModal_btn").addClass('invisible');
                $("#regModal_btn").addClass('invisible');
                $("#logout_btn").removeClass("d-none");
               
            }else{
                alert(data.message);
            }
        }

        function showdata_Check_UID(data){
            console.log(data);
            if(data.state){
                //驗證成功
                $("#user_message").text(data.data[0].Username+"登入中!");
                
                $("#loginModal_btn").addClass('d-none');
                $("#regModal_btn").addClass('d-none');
                $("#logout_btn").removeClass("d-none");
                
            }else{
                //驗證失敗
               
            }
        }


        //w3s
        function setCookie(cname, cvalue, exdays) {

            
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

         //w3s
         function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
