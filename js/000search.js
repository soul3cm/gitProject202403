
var regionTitle = [];
var counter = [];
var regionData = [];


$(function(){


    $.ajax({
        type: "GET",
        url: "api/product/product-Read-api.php",
        async: false,
        dataType: "json",
        success: showdata,
        error: function () {
            alert("error-api/product/product-Read-api.php");
        }
    });

    $("body").on("click" ," #myList .Pname", function () {                
        console.log($(this).data("division") +','+$(this).text());
        var dataJSON = {};
        // dataJSON["Division"]=$(this).data("division");
        dataJSON["Pname"]=$(this).text();
        console.log(dataJSON);
              
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

        $("#postModal_division").val($(this).data("division"));
        $("#postModal_Pname").val($(this).text());
    });
});




    var contents = {};

    function showdata(data) {
        $("#myList").empty();
        
        
    
        var products=[{ID: '7', division: '牛肉', Pname: '美國牛腱', content: '牛腱，美國進口的', create_time: '2024-03-16 22:27:58'},{ID: '6', division: '豬肉', Pname: '肝連', content: '肉表面有層QQ 白白的東西', create_time: '2024-03-14 20:22:09'},{ID: '5', division: '豬肉', Pname: '豬腳', content: '沒有特別分前後腿，計價方式為重量', create_time: '2024-03-08 22:59:08'},{ID: '4', division: '蛋', Pname: '皮蛋', content: '松花皮蛋', create_time: '2024-03-08 22:58:14'},{ID: '3', division: '蛋', Pname: '鹹蛋', content: '鹹鴨蛋', create_time: '2024-03-08 22:57:58'},{ID: '2', division: '雞肉', Pname: '美國棒棒腿', content: '進口的肉雞腿，請勿於此發文台灣土雞腿', create_time: '2024-03-08 22:57:02'},{ID: '1', division: '豬肉', Pname: '豬頭皮', content: '生的', create_time: '2024-03-08 22:56:01'}];


        console.log(products[0].division);
    
    

        const categories = Array.from(new Set(data.data.map(function(item) {
            return item.division;
        })));  
        // console.log(categories);

        const contents = {};
        for (const category of categories) {
          contents[category] = [];
          for (const product of products) {
            if (product.division === category) {
              contents[category].push(product.Pname);
            }
          }
        }
        
        // 輸出結果
        console.log(contents);

        $("#myList").empty();
        let count = 0 ;
        for (let key in contents){
            // console.log(key);
            count++ ;
            var strHTML ='<button class="accordion">'+key+'</button><div class="panel" id="panel'+count+'"></div>'
            $("#myList").append(strHTML);
            // console.log(contents[key]);
            contents[key].forEach(item => {
                var strHTML2 ='<p data-division="'+key+'" class="Pname">'+item+'</p>';
                var panelID = 'panel' +count ;
                
                $("#"+panelID).append(strHTML2);
                // console.log(item);
            });
            
        }

        
        var acc = document.getElementsByClassName("accordion");
        var i;
        // 這邊手風琴
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
        console.log(data.data[0].content);
        var strHTML = '<p>產品簡介 : '+data.data[0].content +'</p>';
        $("#product_content").append(strHTML);
    }
    


