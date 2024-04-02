//  產品管理 
//input: { "UserName":"XX", "Addr":"A市B區", "Division":"豬肉", "Pname":"豬頭皮", "Unit":"一斤", "Price":"130", "Special":"1", "googleMap":"xx", "Note":"備註"}
    var post_newData= [];
    var post_id;
    $(function(){
        $("#CpostModal_btn").click(function(){
            var dataJSON = {};
                dataJSON["UserName"]=$("#CpostModal_userName").val();
                dataJSON["Addr"]=$("#CpostModal_Addr").val();
                dataJSON["Division"]=$("#CpostModal_division").val();
                dataJSON["Pname"]=$("#CpostModal_Pname").val();
                dataJSON["Unit"]=$("#CpostModal_unit").val();

                dataJSON["Price"]=$("#CpostModal_price").val();
                dataJSON["Special"]=$("#CpostModal_special").val();
                dataJSON["GoogleMap"]=$("#CpostModal_googleMap").val();
                dataJSON["Note"]=$("#CpostModal_note").val();
                
                console.log(JSON.stringify(dataJSON));
                $.ajax({
                    type: "POST",
                    url: "api/post/post-Create-api.php",
                    data: JSON.stringify(dataJSON),
                    dataType: "json",
                    success:Cpost_showdata,
                    error:function(){
                        alert("error-api/post/post-Create-api.php")
                    }
                });
        });


        // 讀取產品資料
        $.ajax({
                        type: "GET",
                        url: "api/post/post-Read-api.php",
                        async: false,
                        dataType: "json",
                        success: post_showdata,
                        error: function () {
                            alert("error-api/post/post-Read-api.php");
                        }
                    });

        //$(" #update_post_btn").click(function(){}) 更新
        $("body").on("click" ," #post_data #update_post_btn", function () {                
            console.log($(this).data("postid"));
            post_id = $(this).data("postid");            
            $("#UpostModal_userName").val($(this).data("username"));
            $("#UpostModal_Addr").val($(this).data("addr"));
            $("#UpostModal_division").val($(this).data("division"));
            $("#UpostModal_Pname").val($(this).data("pname"));
            $("#UpostModal_unit").val($(this).data("unit"));

            $("#UpostModal_price").val($(this).data("price"));
            $("#UpostModal_special").val($(this).data("special"));
            $("#UpostModal_googleMap").val($(this).data("googlemap"));
            $("#UpostModal_note").val($(this).data("note"));
        });

         //#post_Modal_updata_btn 監聽
         $("#post_Modal_updata_btn").click(function () {
            //傳遞更新資料至後端api { "UserName":"XX", "Addr":"A市B區", "Division":"豬肉", "Pname":"豬頭皮", "Unit":"一斤", "Price":"130", "Special":"1", "googleMap":"xx", "Note":"備註"}
            var dataJSON = {};
            dataJSON["PostID"] = post_id;
            dataJSON["UserName"]=$("#UpostModal_userName").val();
            dataJSON["Addr"]=$("#UpostModal_Addr").val();
            dataJSON["Division"]=$("#UpostModal_division").val();
            dataJSON["Pname"]=$("#UpostModal_Pname").val();
            dataJSON["Unit"]=$("#UpostModal_unit").val();

            dataJSON["Price"]=$("#UpostModal_price").val();
            dataJSON["Special"]=$("#UpostModal_special").val();
            dataJSON["GoogleMap"]=$("#UpostModal_googleMap").val();
            dataJSON["Note"]=$("#UpostModal_note").val();
            console.log(JSON.stringify(dataJSON));

            $.ajax({
                type: "POST",
                url: "api/post/post-Update-api.php",
                async: false,
                data: JSON.stringify(dataJSON),
                dataType: "json",
                success:  Upost_showdata,
                        
                error: function () {
                    alert("error-api/post/post-Update-api.php");
                }
            });
        });
        //delete_post_btn 產品刪除按鈕監聽， 使用永久性監聽器來處理按鈕點擊事件
            $("#post_data").on("click", "#delete_post_btn", function () {
                if (confirm("確認刪除?")) {
                    console.log($(this).data("postid"));
                    //傳遞刪除資料至後端api {"ID":"XX"}
                    var dataJSON = {};
                    dataJSON["PostID"] = $(this).data("postid");
                    console.log(JSON.stringify(dataJSON));

                    $.ajax({
                        type: "POST",
                        url: "api/post/post-Delete-api.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: Dpost_showdata,
                        error: function () {
                            alert("error-api/post/post-Delete-api.php");
                        }
                    });
                }
            });

    });
        function post_showdata(data) {
        //整理資料儲存為二維陣列
        data.data.forEach(function (item, key) {
               console.log(key);
               if (key % 5 == 0) {
                post_newData.push([]);
                }
                var page = parseInt(key / 5);
                post_newData[page].push(item);
            });
            post_drawTable(0);

            //產生頁碼
            $("#pageList_post").empty();
            post_newData.forEach(function(item, key){
                var thisPage = key + 1;
                var strHTML = '<li class="page-item"><a class="page-link" href="#" onclick="post_drawTable(' + key + ')">'+ thisPage +'</a></li>';
                $("#pageList_post").append(strHTML);
            });

            console.log(post_newData);
        }

        function post_drawTable(page) {
            
            $("#post_data").empty();
            post_newData[page].forEach(function (item) {
                let strHTML = '<tr><td>'+item.postID+'</td><td>'+item.userName+
                '</td><td>'+item.Addr+'</td><td>'+item.division+
                '</td><td>'+item.Pname+'</td><td>'+item.unit+
                '</td><td>'+item.price+'</td><td>'+item.special+
                '</td><td>'+item.googleMap+'</td><td>'+item.note+
                '</td><td>'+item.create_time+'</td><td><button class='+
                '"btn btn-success" data-bs-toggle="modal" data-bs-target="#UpostModal"'+
                'data-postID="' + item.postID + '" data-userName="' + item.userName + 
                '" data-Addr="' + item.Addr + '" data-division="' + item.division + 
                '" data-Pname="' + item.Pname + '" data-unit="' + item.unit + 
                '" data-price="' + item.price + '" data-special="' + item.special +
                '" data-googleMap="' + item.googleMap + '" data-note="' + item.note +
                '" id="update_post_btn">更新</button>'+
                '<button class="btn btn-danger" data-postID="' +
                 item.postID + '" id="delete_post_btn">刪除</button></td></tr>';
                $("#post_data").append(strHTML);
            });
        }

        function Cpost_showdata(data) {
            console.log(data);
            if (data.state) {
                alert("貼文新增成功");               
                
                // 重新載入頁面
                location.reload();
                
            }   
        }

        function Upost_showdata(data) {
            console.log(data);
            if (data.state) {
                alert("貼文更新成功");               
                
                // 重新載入頁面
                location.reload();
                
            }   
        }

        function Dpost_showdata(data) {
            console.log(data);
            if (data.state) {
                alert(data.message);
                location.reload();
            } else {
                alert(data.message);
            }
        }

       