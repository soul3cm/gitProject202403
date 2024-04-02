//  產品管理 

    var product_newData= [];
    var p_id;
    $(function(){
        // 讀取產品資料
        $.ajax({
                        type: "GET",
                        url: "api/product/product-Read-api.php",
                        async: false,
                        dataType: "json",
                        success: product_showdata,
                        error: function () {
                            alert("error-api/product/produce-Read-api.php");
                        }
                    });

    });

        function product_showdata(data) {
        //整理資料儲存為二維陣列
        data.data.forEach(function (item, key) {
               console.log(key);
               if (key % 5 == 0) {
                product_newData.push([]);
                }
                var page = parseInt(key / 5);
                product_newData[page].push(item);
            });
            product_drawTable(0);

            //產生頁碼
            $("#pageList_member").empty();
            product_newData.forEach(function(item, key){
                var thisPage = key + 1;
                var strHTML = '<li class="page-item"><a class="page-link" href="#" onclick="product_drawTable(' + key + ')">'+ thisPage +'</a></li>';
                $("#pageList_member").append(strHTML);
            });

            console.log(product_newData);
        }




        function product_drawTable(page) {
            
            $("#product_data").empty();
            product_newData[page].forEach(function (item) {
                let strHTML = '<tr><td>' + item.ID + '</td><td>' + item.division + '</td><td>' + item.Pname + '</td><td>' + item.content + '</td><td><button class="btn btn-success me-2" data-id="' + item.ID + 'data-division="' + item.division + '" data-Pname="' + item.Pname + '" data-content="' + item.content + '" id=""  data-bs-toggle="modal" data-bs-target="#UproductModal">更新</button><button class="btn btn-danger" id="" data-id="' + item.ID + '">刪除</button></td></tr>';
                $("#product_data").append(strHTML);
            });
           
            
        }
