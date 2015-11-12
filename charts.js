

function plotHighchart(position,address,capacity,histavg,current){

    $(position).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Water Status'
        },
        xAxis: {
            categories: [address]
        },
        yAxis: {

            plotLines: [{
                color: 'red',
                value: histavg,
                width: '2',
                zIndex: 200
            }],
            min: 0,
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            data: [capacity],
            color: '#F7D774'
        },
            {
                data: [current],
                color: '#0303C2'
            }]
    });
}
function plotGauge(position,value){

    var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.15;
    config4.circleColor = "#808015";
    config4.textColor = "#555500";
    config4.waveTextColor = "#FFFFAA";
    config4.waveColor = "#AAAA39";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 3;
    loadLiquidFillGauge(position, value, config4);
}

