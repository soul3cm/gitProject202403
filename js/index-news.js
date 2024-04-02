$(function(){
    $.ajax({
        type: "GET",
        url: "api/news/news-Read-api.php",
        async: false,
        dataType: "json",
        success: showdata_news,
        error: function () {
            alert("error-api/news/news-Read-api.php");
        }
    });

    function showdata_news(data){
        console.log(data.data);
        $("#index_news").empty();
        data.data.forEach(function(item){
             
    
            var strHTML='<li>'+item.create_time+'<strong class="text-center">&nbsp;&nbsp;'+item.content+'</strong></li>';
            $("#index_news").append(strHTML);
        });
    }
    
})