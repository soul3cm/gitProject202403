$(function(){
        //點擊後彈出google地圖
        $('#locationInput').on('input', function() {
            var inputValue = $(this).val();
            var mapLink = "https://www.google.com/maps/search/?api=1&query=" + inputValue;
            $('#mapLink').attr('href', mapLink);
        });



        //確認發文的按鈕
        $("#postModal_check_btn").click(function(){
            var dataJSON = {};
                dataJSON["UserName"]=$("#postModal_userName").val();
                dataJSON["Addr"]=$("#postModal_Addr").val();
                dataJSON["Division"]=$("#postModal_division").val();
                dataJSON["Pname"]=$("#postModal_Pname").val();
                dataJSON["Unit"]=$("#postModal_unit").val();

                dataJSON["Price"]=$("#postModal_price").val();
                dataJSON["Special"]=$("#postModal_special").val();
                dataJSON["GoogleMap"]=$("#locationInput").val();
                dataJSON["Note"]=$("#postModal_note").val();
                
                console.log(JSON.stringify(dataJSON));
                $.ajax({
                    type: "POST",
                    url: "api/post/post-Create-api.php",
                    data: JSON.stringify(dataJSON),
                    dataType: "json",
                    success:search_post,
                    error:function(){
                        alert("error-api/post/post-Create-api.php");
                        
                    }
                });
        });
    });

    function search_post(data) {
        console.log(data);
        if (data.state) {
            $("#snackbar").text("貼文發布成功");
                        snackbar();
            $("#postModal_unit").val(""); 
            $("#postModal_price").val("");
            $("#locationInput").val("");
            $("#postModal_note").val("");             
            
             
        // 從 cookie 中讀取上次點擊的按鈕 ID        
        // var select_town = getCookie("areaName");        
        var PnameClicked = getCookie("PnameClicked");
        if (PnameClicked) {
            $("#" + PnameClicked).click();
        }
        
        }else{
            $("#postModal_unit").val(""); 
            $("#postModal_price").val("");
            $("#locationInput").val("");
            $("#postModal_note").val("");
            $("#snackbar").text("欄位未填/錯誤 ,或未登入");
                        snackbar();
        }   
    }