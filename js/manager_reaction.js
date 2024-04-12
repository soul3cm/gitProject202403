//  產品管理 
//input: {"UserID":"XX", "PostID":"XXX", "ReaOX":"XX"}
    var reaction_newData= [];
    var r_id;
    $(function(){
        //建立回饋
        $("#CreactionModal_btn").click(function(){
            var dataJSON = {};
                dataJSON["UserName"]=$("#CreactionModal_userName").val();
                dataJSON["PostID"]=$("#CreactionModal_postID").val();
                dataJSON["ReaOX"]=$("#CreactionModal_reaOX").val();
                console.log(JSON.stringify(dataJSON));
                $.ajax({
                    type: "POST",
                    url: "https://3cmproject.000webhostapp.com/project1/reaction/reaction-Create-api.php",
                    data: JSON.stringify(dataJSON),
                    dataType: "json",
                    success:Creaction_showdata,
                    error:function(){
                        alert("error-reaction-Create-api.php")
                    }
                });
        });


        // 讀取回饋資料
        $.ajax({
                        type: "GET",
                        url: "https://3cmproject.000webhostapp.com/project1/reaction/reaction-Read-api.php",
                        async: false,
                        dataType: "json",
                        success: reaction_showdata,
                        error: function () {
                            alert("error-reaction-Read-api.php");
                        }
                    });
       

        
        //delete_reaction_btn 產品刪除按鈕監聽， 使用永久性監聽器來處理按鈕點擊事件
            $("#reaction_data").on("click", "#delete_reaction_btn", function () {
                if (confirm("確認刪除?")) {
                    console.log($(this).data("id"));
                    //傳遞刪除資料至後端api {"ID":"XX"}
                    var dataJSON = {};
                    dataJSON["ID"] = $(this).data("id");
                    console.log(JSON.stringify(dataJSON));

                    $.ajax({
                        type: "POST",
                        url: "https://3cmproject.000webhostapp.com/project1/reaction/reaction-Delete-api.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: Dreaction_showdata,
                        error: function () {
                            alert("error-reaction-Delete-api.php");
                        }
                    });
                }
            });

    });
        function reaction_showdata(data) {
        //整理資料儲存為二維陣列
        data.data.forEach(function (item, key) {
               console.log(key);
               if (key % 5 == 0) {
                reaction_newData.push([]);
                }
                var page = parseInt(key / 5);
                reaction_newData[page].push(item);
            });
            reaction_drawTable(0);

            //產生頁碼
            $("#pageList_reaction").empty();
            reaction_newData.forEach(function(item, key){
                var thisPage = key + 1;
                var strHTML = '<li class="page-item"><a class="page-link" href="#" onclick="reaction_drawTable(' + key + ')">'+ thisPage +'</a></li>';
                $("#pageList_reaction").append(strHTML);
            });

            console.log(reaction_newData);
        }

        function reaction_drawTable(page) {
            
            $("#reaction_data").empty();
            reaction_newData[page].forEach(function (item) {
                let strHTML = '<tr><td>' + item.ID + '</td><td>' + item.postID + '</td><td>' + item.userName + '</td><td>' + item.reaOX + '</td><td>' + item.create_time + '</td><td><button class="btn btn-danger" id="delete_reaction_btn" data-id="' + item.ID + '">刪除</button></td></tr>';
                $("#reaction_data").append(strHTML);
            });
        }

        function Creaction_showdata(data) {
            console.log(data);
            if (data.state) {
                alert("回饋新增成功");               
                
                // 重新載入頁面
                location.reload();
                
            }   
        }

        function Ureaction_showdata(data) {
            console.log(data);
            if (data.state) {
                alert("回饋更新成功");               
                
                // 重新載入頁面
                location.reload();
                
            }   
        }

        function Dreaction_showdata(data) {
            console.log(data);
            if (data.state) {
                alert(data.message);
                location.reload();
            } else {
                alert(data.message);
            }
        }

       