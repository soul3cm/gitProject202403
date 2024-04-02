        //搜尋 git 台灣縣市   ，如果做專題，可以用all data那個檔案
        //選地圖 就秀貼文，回饋按鈕也在這個檔案
        var selected_cityName;
        var selected_townName;
        var CityCountyData = []; //縣市區資料 
        var count_class =0;      
        var count_fun =0;
        var count_Pname=0 ;  //記數，用於手風琴ID
        $(function () {
            //載入縣市鄉鎮區資料
            axios.get('js/CityCountyData.json')
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    CityCountyData = response.data;
                    $("#cityName").empty();
                    
                    response.data.forEach(function (item) {
                       

                        strHTHL ='<tr><td class="cityName_td">'+item.CityName+'</td></tr>';
                          
                          $("#cityName").append(strHTHL);
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
                
               
                
              
                //監聽縣市選單
                $('#cityName').on('click', ".cityName_td",  function() {
                    
                console.log($(this).val());

                    
                    $("#cityLink").text($(this).text());
                    console.log($(this).text());
                    selected_cityName = $(this).text();
                    console.log(CityCountyData);
                    
                    CityCountyData.forEach(function (item) {
                        
                        if (item.CityName == selected_cityName) {
                            //產生鄉鎮區選單
                            $("#areaName").empty();                           
                            item.AreaList.forEach(function (area) {
                                
                                var strHTML = '<tr><td class="areaName_td">'+area.AreaName+'</td></tr>';
                                $("#areaName").append(strHTML);
                            });
                        }
                    });

                    
                });

                //監聽鄉鎮區選單
                $("#areaName").on('click', ".areaName_td", function () {
                    closeNav()
                    setCookie("PnameClicked",null, 1);
                    console.log($(this).text());
                    selected_townName = $(this).text();
                    $(".openbtn").text('\u2630'+selected_cityName+selected_townName);

                    if(selected_cityName !="" &&selected_townName !=""){
                    $("#postModal_Addr").val(selected_cityName+selected_townName);
                    }

                    var dataJSON={};
                    dataJSON["Addr"]=selected_cityName+selected_townName;
                    console.log(dataJSON);
                    
                    //選完就先把該區的貼文秀出來
                
                    $.ajax({
                        type: "post",
                        url: "api/search/search-Read-api.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: showdata_town_post,
                        error: function () {
                            alert("error-api/search/search-Read-api.php");
                        }
                    });

                    for(i=0;i<=(data_Pname.length-1);i++){
                        dataJSON["Division"]=data_Pname[i];
                        console.log(dataJSON["Division"]);
                    
                        $.ajax({
                            type: "post",
                            url: "api/search/search-count-division-api.php",
                            async: false,
                            data: JSON.stringify(dataJSON),
                            dataType: "json",
                            success: showdata_count_post,
                            error: function () {
                                alert("error-api/search/search-count-division-api.php");
                            }
                        });
                    }

                });

                // 貼文的OX按鈕
                $("#postCard").on("click","#vote_btn_O" , function() {
                    var dataJSON={} ;                    
                    var dataRea_postid;
                    var dataRea_username;
                    var dataRea_reaox;
                    var dataRea_postid=$(this).data("postid");
                    var dataRea_username=$(this).data("username");
                    var dataRea_reaox=$(this).data("reaox");
                    // console.log(dataRea_postid);
                    // console.log(dataRea_username);
                    // console.log(dataRea_reaox);
                                          
                    dataJSON["PostID"] = dataRea_postid;
                    dataJSON["UserName"] = dataRea_username;
                    dataJSON["ReaOX"] = dataRea_reaox;
                    console.log(JSON.stringify(dataJSON));
                    $.ajax({
                        type: "POST",
                        url: "api/search/search-Create-rea-api.php",
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success:Creaction_showdata,
                        error:function(){
                            alert("error-api/search/search-Create-rea-api.php")
                        }
                    });
                
                });
                $("#postCard").on("click","#vote_btn_X" , function() {
                    var dataJSON={} ;                    
                    var dataRea_postid;
                    var dataRea_username;
                    var dataRea_reaox;
                    var dataRea_postid=$(this).data("postid");
                    var dataRea_username=$(this).data("username");
                    var dataRea_reaox=$(this).data("reaox");
                    // console.log(dataRea_postid);
                    // console.log(dataRea_username);
                    // console.log(dataRea_reaox);
                        
                    dataJSON["PostID"] = dataRea_postid;
                    dataJSON["UserName"] = dataRea_username;
                    dataJSON["ReaOX"] = dataRea_reaox.toString();
                    console.log(JSON.stringify(dataJSON));
                    $.ajax({
                        type: "POST",
                        url: "api/search/search-Create-rea-api.php",
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success:Creaction_showdata,
                        error:function(){
                            alert("error-api/search/search-Create-rea-api.php")
                        }
                    });
                
                });

            

            



        });
        function showdata_count_reaction(data){
            $(".count_post_reaction"+count_fun).empty();
            console.log(data);
            console.log(data.data[0]);
            console.log(data.data[0].reaOX_1_count);
            console.log(data.data[0].reaOX_0_count);
            console.log(data.data[1]);

            var strHTHL ='O:<strong >'+data.data[0].reaOX_1_count+' </strong>X:<strong >'+data.data[0].reaOX_0_count+'</strong>';

           $(".count_post_reaction"+count_fun).append(strHTHL);
        }

        function showdata_count_post(data){
            count_Pname++;
            console.log(data);
            console.log(count_Pname);
            $("#division_post"+count_Pname).text(data.data.post_count);
        }

        function showdata_town_post(data){
            if(data.state){

            }else{
                $("#snackbar").text("未選擇區域或沒有貼文");
                        snackbar();
            }
            console.log(data);
            var special;
            $("#postCard").empty();

            var post_userName=$("#postModal_userName").val();
            var collect_postID=[];
            count_class = 0;

            
            data.data.forEach(function(item){
               count_class ++;
                

                if(item.special==1){
                    special='特價';
                }else{special='';}
                var strHTML='<div class="col-4 col-lg-3 count_reaction" ><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front">'+
                    '<h2>'+item.Pname+'</h2><p>價格'+item.price+'元 單位:'+item.unit+'<span style="color:red;">'+special+
                    '</span></p><p>貼文者:'+item.userName+'</p>'+
                     '<p class="count_post_reaction'+count_class+'" data-id="'+item.postID+'">O:<strong >99 </strong>X:<strong >9</strong></p><h4>'+item.create_time+'</h4></div>'+
                     '<div class="flip-card-back"><h1>備註:</h1><p>'+item.note+'</p>'+
            '           <a href="https://www.google.com/maps/search/?api=1&query=" target="_blank" class="mapLink_post">'+
                     item.googleMap+'</a>'+
                        '<P >VOTE' +
                     '<button type="button" class="btn btn-success vote_btn_O" data-userName="'+post_userName+'" data-postID="'+item.postID+'" data-reaOX="1" id="vote_btn_O">O</button>' +
                     '<button type="button" class="btn btn-danger " data-userName="'+post_userName+'" data-postID="'+item.postID+'" data-reaOX="0" id="vote_btn_X">X</button>'+
                        '</P></div></div></div></div>';
                 
                $("#postCard").append(strHTML);


                collect_postID.push(item.postID);
                
                
            });

                   




            console.log(collect_postID);
            count_fun=0;
            var per_postID;
                collect_postID.forEach(function(item){
                    count_fun++;
                    per_postID=item;
                    
                    var dataJSON={};
                    dataJSON["PostID"]=item;
                

                    $.ajax({
                        type: "post",
                        url: "api/search/search-count-reaction-api.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: showdata_count_reaction,
                        error: function () {
                            alert("error-api/search/search-count-reaction-api.php");
                        }
                    });
                });




            $( ".mapLink_post").click(function() {
                var mapValue_post = $(this).text();                    
                console.log($(this).text());
                var mapLink_post = "https://www.google.com/maps/search/?api=1&query=" + mapValue_post;
                $('.mapLink_post').attr('href', mapLink_post);
            });
            
           
            


        }

        function get_post_count(data){
            if(data.state){
                console.log("取得貼文數成功");
            }
        }

        function Creaction_showdata(data) {
            $("#snackbar").text("已回應");
            snackbar();
            console.log(data);
            if (data.state) {
                console.log(data.message);   
                
            };
               

            var PnameClicked = getCookie("PnameClicked");
            if (PnameClicked) {
                $("#" + PnameClicked).click();
            }else{
                $("#snackbar").text("欄位未填/錯誤 ,或未登入");
                            snackbar();
            }  
        }
   