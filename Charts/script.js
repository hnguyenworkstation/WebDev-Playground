var chart;
var chatTime;

var chartData = [
    {username: "quanghung93s", value: 750},
    {username: "ladell", value: 1500},
    {username: "sara", value: 2500},
    {username: "bob", value: 1300},
    {username: "chrismunroe", value: 3241},
    {username: "funnydad", value: 2441}
];

AmCharts.ready(
    function() {
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData;
        chart.titleField = "username";
        chart.valueField = "value";
        chart.outlineColor = "";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 2;
        
        chart.depth3D = 20;
        chart.angle = 30;
        
        chart.write("charts");
    }
)