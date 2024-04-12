$(function () {
    //產生圖表
    var ctx01 = document.getElementById('myChart01');
    chart01 = new Chart(ctx01, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '各分類貼文數圖',
                data: [],
                borderWidth: 2,
                backgroundColor: ['#FAA98B', '#E6AECF', '#AEE0DD', '#01ACBD', '#FF445F', '#6F925A'],
                color: '#666'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    //串接資料
    $.ajax({
        type: "GET",
        url: "https://3cmproject.000webhostapp.com/project1/manager/home-count-division-api.php",
        async: false,
        dataType: "json",
        success: showdata_chart_division,
        error: function () {
            alert("error-home-count-division-api.php");
        }
    });

    $.ajax({
        type: "GET",
        url: "https://3cmproject.000webhostapp.com/project1/manager/home-count-member-api.php",
        async: false,
        dataType: "json",
        success: showdata_chart_member,
        error: function () {
            alert("error-home-count-member-api.php");
        }
    });
});

function showdata_chart_division(data){
    //更新圖表數據
    data.data.forEach(function(item){
        console.log(item)
        chart01.data.labels.push(item.division); //x軸
        chart01.data.datasets[0].data.push(item.division_count); //y軸
    });
    chart01.update();
};

function showdata_chart_member(data){
    $("#member_all").empty();
    var member_chart_count='會員人數:'+data.data.member_count+'';
    $("#member_all").append(member_chart_count);
}
