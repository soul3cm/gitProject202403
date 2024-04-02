        //搜尋 git 台灣縣市   ，如果做專題，可以用all data那個檔案
        //選地圖 就秀貼文，回饋按鈕也在這個檔案
        var selected_cityName;
        var selected_townName;
        var CityCountyData = []; //縣市區資料 
        var count_class =0;      
        var count_fun =0;
        $(function () {
            //載入縣市鄉鎮區資料
            axios.get('js/CityCountyData.json')
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    CityCountyData = response.data;

                    
                    $("#cityName").empty();
                    $("#cityName").append('<option selected disabled>選擇縣市名稱</option>');
                    var count=0;
                    response.data.forEach(function (item) {
                        count++;
                        console.log(item.CityName);

                        strHTHL = '<option class="city" value="' + item.CityName + '"id="city'+count+'">' + item.CityName + '</option>';
                       
                          
                      
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
            $("#cityName").click(function () {
                
                console.log($(this).text());
                selected_cityName = $(this).text();
                console.log(CityCountyData);
                var count=0;
                CityCountyData.forEach(function (item) {
                    
                    if (item.CityName == selected_cityName) {
                        //產生鄉鎮區選單
                        $("#areaName").empty();
                        $("#areaName").append('<option selected disabled>選擇鄉鎮區名稱</option>');
                        item.AreaList.forEach(function (area) {
                            count++;
                            var strHTML = '<option class="area" value="' + area.AreaName + '" id="area'+count+'">' + area.AreaName + '</option>';
                            $("#areaName").append(strHTML);
                        });
                    }
                });

                
            });

            //監聽鄉鎮區選單
            $("#areaName").change(function () {
                console.log($(this).val());
                selected_townName = $(this).val();

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

                

            });


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

        function showdata_town_post(data){
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
                    '<h2>'+item.Pname+'</h2><p>價格'+item.price+'元 單位:'+item.unit+'</p><p style="color:red;">'+special+
                     '</p><p>貼文者:'+item.userName+'</p>'+
                     '<p class="count_post_reaction'+count_class+'" data-id="'+item.postID+'">O:<strong >99 </strong>X:<strong >9</strong></p></div>'+
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
                        url: "api/search/search-count-reaction.php",
                        async: false,
                        data: JSON.stringify(dataJSON),
                        dataType: "json",
                        success: showdata_count_reaction,
                        error: function () {
                            alert("error-api/search/search-count-reaction.php");
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

        function Creaction_showdata(data) {
            console.log(data);
            if (data.state) {
                console.log(data.message);   
                
            }   
        }
   