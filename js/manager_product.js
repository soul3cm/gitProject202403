//  產品管理 
    var product_newData= [];
    var p_id;
    $(function(){
        $("#CproductModal_btn").click(function(){
            var dataJSON = {};
                dataJSON["Division"]=$("#CproductModal_division").val();
                dataJSON["Pname"]=$("#CproductModal_Pname").val();
                dataJSON["Content"]=$("#CproductModal_content").val();
                // console.log(JSON.stringify(dataJSON));
                $.ajax({
                    type: "POST",
                    url: "https://3cmproject.000webhostapp.com/project1/product/product-Create-api.php",
                    data: JSON.stringify(dataJSON),
                    dataType: "json",
                    success:Cproduct_showdata,
                    error:function(){
                        alert("error-product-Create-api.php")
                    }
                });
        });


        // 讀取產品資料
        $.ajax({
                        type: "GET",
                        url: "https://3cmproject.000webhostapp.com/project1/product/product-Read-api.php",
                        async: false,
                        dataType: "json",
                        success: product_showdata,
                        error: function () {
                            alert("error-product-Read-api.php");
                        }
                    });

        //$(" #update_product_btn").click(function(){}) 更新
        $("body").on("click" ," #product_data #update_product_btn", function () {                
            // console.log($(this).data("id") +','+ $(this).data("division") +','+ $(this).data("pname")+','+ $(this).data("content"));
            product_id = $(this).data("id");
            $("#updateModal_division").val($(this).data("division"));
            $("#updateModal_Pname").val($(this).data("pname"));
            $("#updateModal_content").val($(this).data("content"));
            
        });

         //#member_Modal_updata_btn 監聽
         $("#product_Modal_updata_btn").click(function () {
            //傳遞更新資料至後端api {"ID":"XX",  "Division":"XX", "Pname":"XX", "content":"XX"}
            var dataJSON = {};
            dataJSON["ID"] = product_id;
            dataJSON["Division"] = $("#updateModal_division").val();
            dataJSON["Pname"] = $("#updateModal_Pname").val();
            dataJSON["Content"] = $("#updateModal_content").val();
            // console.log(JSON.stringify(dataJSON));

            $.ajax({
                type: "POST",
                url: "https://3cmproject.000webhostapp.com/project1/product/product-Update-api.php",
                async: false,
                data: JSON.stringify(dataJSON),
                dataType: "json",
                success:  Uproduct_showdata,
                        
                error: function () {
                    alert("error-product-Update-api.php");
                }
            });
        });
        //delete_product_btn 產品刪除按鈕監聽， 使用永久性監聽器來處理按鈕點擊事件
            $("#product_data").on("click", "#delete_product_btn", function () {
                if (confirm("確認刪除?")) {
                    // console.log($(this).data("id"));
                    //傳遞刪除資料至後端api {"ID":"XX"}
                    var dataJSON = {};
                    dataJSON["ID"] = $(this).data("id");
                    // console.log(JSON.stringify(dataJSON));

                    $.ajax({
                        type: "POST",
                        url: "https://3cmproject.000webhostapp.com/project1/product/product-Delete-api.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: Dproduct_showdata,
                        error: function () {
                            alert("error-product-Delete-api.php");
                        }
                    });
                }
            });

    });
        function product_showdata(data) {
        //整理資料儲存為二維陣列
        data.data.forEach(function (item, key) {
            //    console.log(key);
               if (key % 10 == 0) {
                product_newData.push([]);
                }
                var page = parseInt(key / 10);
                product_newData[page].push(item);
            });
            product_drawTable(0);

            //產生頁碼
            $("#pageList_product").empty();
            product_newData.forEach(function(item, key){
                var thisPage = key + 1;
                var strHTML = '<li class="page-item"><a class="page-link" href="#" onclick="product_drawTable(' + key + ')">'+ thisPage +'</a></li>';
                $("#pageList_product").append(strHTML);
            });

            // console.log(product_newData);
        }

        function product_drawTable(page) {
            
            $("#product_data").empty();
            product_newData[page].forEach(function (item) {
                let strHTML = '<tr><td>' + item.ID + '</td><td>' + item.division + '</td><td>' + item.Pname + '</td><td>' + item.content + '</td><td><button class="btn btn-success me-2" data-id="' + item.ID + '"data-division="' + item.division + '" data-Pname="' + item.Pname + '" data-content="' + item.content + '" id="update_product_btn"  data-bs-toggle="modal" data-bs-target="#UproductModal">更新</button><button class="btn btn-danger" id="delete_product_btn" data-id="' + item.ID + '">刪除</button></td></tr>';
                $("#product_data").append(strHTML);
            });
        }

        function Cproduct_showdata(data) {
            // console.log(data);
            if (data.state) {
                alert("產品新增成功");               
                
                // 重新載入頁面
                location.reload();
                
            }   
        }

        function Uproduct_showdata(data) {
            // console.log(data);
            if (data.state) {
                alert("產品更新成功");               
                
                // 重新載入頁面
                location.reload();
                
            }   
        }

        function Dproduct_showdata(data) {
            // console.log(data);
            if (data.state) {
                alert(data.message);
                location.reload();
            } else {
                alert(data.message);
            }
        }

       