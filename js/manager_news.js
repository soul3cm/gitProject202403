//  產品管理 
    var news_newData= [];
    var news_id;
    $(function(){
        //創建消息
        $("#CnewsModal_btn").click(function(){
            var dataJSON = {};
                
                dataJSON["Content"]=$("#CnewsModal_content").val();
                console.log(JSON.stringify(dataJSON));
                $.ajax({
                    type: "POST",
                    url: "https://3cmproject.000webhostapp.com/project1/news/news-Create-api.php",
                    data: JSON.stringify(dataJSON),
                    dataType: "json",
                    success:Cnews_showdata,
                    error:function(){
                        alert("error-news-Create-api.php")
                    }
                });
        });

        // 讀取消息
        $.ajax({
                        type: "GET",
                        url: "https://3cmproject.000webhostapp.com/project1/news/news-Read-api.php",
                        async: false,
                        dataType: "json",
                        success: news_showdata,
                        error: function () {
                            alert("error-news-Read-api.php");
                        }
                    });

        
        //delete_news_btn 消息刪除按鈕監聽， 使用永久性監聽器來處理按鈕點擊事件
            $("#news_data").on("click", "#delete_news_btn", function () {
                if (confirm("確認刪除?")) {
                    console.log($(this).data("id"));
                    var dataJSON = {};
                    dataJSON["ID"] = $(this).data("id");
                    console.log(JSON.stringify(dataJSON));

                    $.ajax({
                        type: "POST",
                        url: "https://3cmproject.000webhostapp.com/project1/news/news-Delete-api.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: Dnews_showdata,
                        error: function () {
                            alert("error-news-Delete-api.php");
                        }
                    });
                }
            });

    });
        function news_showdata(data) {
        //整理資料儲存為二維陣列
        data.data.forEach(function (item, key) {
               console.log(key);
               if (key % 5 == 0) {
                news_newData.push([]);
                }
                var page = parseInt(key / 5);
                news_newData[page].push(item);
            });
            news_drawTable(0);

            //產生頁碼
            $("#pageList_news").empty();
            news_newData.forEach(function(item, key){
                var thisPage = key + 1;
                var strHTML = '<li class="page-item"><a class="page-link" href="#" onclick="news_drawTable(' + key + ')">'+ thisPage +'</a></li>';
                $("#pageList_news").append(strHTML);
            });

            console.log(news_newData);
        }

        function news_drawTable(page) {
            
            $("#news_data").empty();
            news_newData[page].forEach(function (item) {
                let strHTML = '<tr><td>' + item.ID + '</td><td>' + item.content + '</td><td>' + item.create_time + '</td><td><button class="btn btn-danger" id="delete_news_btn" data-id="' + item.ID + '">刪除</button></td></tr>';
                $("#news_data").append(strHTML);
            });
        }

        function Cnews_showdata(data) {
            console.log(data);
            if (data.state) {
                alert("消息新增成功");    
                location.reload();
            }   
        }

        function Dnews_showdata(data) {
            console.log(data);
            if (data.state) {
                alert(data.message);
                location.reload();
            } else {
                alert(data.message);
            }
        }

       