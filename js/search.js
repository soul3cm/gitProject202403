
var regionTitle = [];
var counter = [];
var regionData = [];
var data_Pname=[];
// 宣告全域變數或者物件來保存資料




$(function(){


    $.ajax({
        type: "GET",
        url: "https://3cmproject.000webhostapp.com/project1/product/product-Read-api.php",
        async: false,
        dataType: "json",
        success:showdata_search_product,
        error: function () {
            alert("error-product-Read-api.php");
        }
    });

    

    



    // 點擊產品出現簡介
    $("body").on("click" ," #myList .Pname", function () {                
        // console.log($(this).data("division") +','+$(this).text());
        // console.log(this.id);
        // 點擊手風琴按鈕保存到 cookie 中
        var buttonid_panel = $(this).attr('id');
        setCookie('PnameClicked',buttonid_panel, 1); // 保存1天
        var dataJSON = {};
        // dataJSON["Division"]=$(this).data("division");
        dataJSON["Pname"]=$(this).text();
        // 底下這串在 search_map.js
        
        // console.log(dataJSON);
              
        $.ajax({
            type: "post",
            url: "api/search/search-content-api.php",
            data: JSON.stringify(dataJSON),
            dataType: "json",
            success: showdata_content,
            error: function () {
                alert("error-api/search/search-content-api.php");
            }
        });

        dataJSON["Addr"]=selected_cityName+selected_townName;
        // console.log(dataJSON);
        //這邊的success在 search_map.js
        $.ajax({
            type: "post",
            url: "api/search/search-Read-Pname-api.php",
            data: JSON.stringify(dataJSON),
            dataType: "json",
            success:  showdata_town_post,
            error: function () {
                alert("error-api/search/search-Read-Pname-api.php");
            }
        });

        $("#postModal_division").val($(this).data("division"));
        $("#postModal_Pname").val($(this).text());
    });
    
     // 從 cookie 中讀取上次點擊的按鈕 ID
     
    //  var select_town = getCookie("areaName");
     
    // var PnameClicked = getCookie("PnameClicked");


     // 如果有存儲按鈕 ID，則自動觸發該按鈕的點擊事件
    //  if (select_city) {
    //     $("#" + select_city).click();
    // }

    // if (select_town) {
    //     $("#" + select_town).addClass("selected");
    // }
    // if (PnameClicked) {
    //     $("#" + PnameClicked).click();
    // }

   
    
         // 將選擇的值保存到 cookie 中

});




    var contents = {};

    function showdata_search_product(data) {
        
        $("#myList").empty();
        // console.log(data);
        // console.log(data.data);
    
        var products=data.data;
        // console.log(products[0].division);
    
    
        // 將所有的分類不重複地取出
        const categories = Array.from(new Set(data.data.map(function(item) {
            return item.division;
        })));  
        // console.log(categories);
        // 將分類放到全域變數
        data_Pname =categories;
        // console.log(data_Pname);

        const contents = {};
        for (const category of categories) {
          contents[category] = [];
          for (const product of products) {
            if (product.division === category) {
              contents[category].push(product.Pname);
            }
          }
        }
        
        // 印出手風琴
        // console.log(contents);

        $("#myList").empty();
        let count_panel = 0 ;
        let Pname_num =0;
        for (let key in contents){
            // console.log(key);
            count_panel++ ;
            var strHTML ='<button class="accordion">'+key+'<span style="float: right;" id="division_post'+count_panel+'"></span></button><div class="panel" id="panel'+count_panel+'"></div>'
            $("#myList").append(strHTML);
            // console.log(contents[key]);
            contents[key].forEach(item => {
                Pname_num ++;
                var strHTML2 ='<p data-division="'+key+'" class="Pname" id="PN'+Pname_num+'">'+item+'</p>';
                var panelID = 'panel' +count_panel ;
                
                $("#"+panelID).append(strHTML2);
                // console.log(item);
            });
            
        }

        
        var acc = document.getElementsByClassName("accordion");
        var i;
        // 這邊手風琴展開
        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
        }


    
    }

    function showdata_content(data){
        $("#product_content").empty();
        // console.log(data.data[0].content);
        var strHTML = '<p>產品簡介 : '+data.data[0].content +'</p>';
        $("#product_content").append(strHTML);
    }

    
    // 這是小吃店 snackbar，按讚後會出現的訊息
    function snackbar() {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
      }
        
    function special_input(number){
        $("#postModal_special").val(number);
    }


