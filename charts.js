var divCounter = 0

function getRandomNumber(max, min) {

    return Math.floor((Math.random() * max) + min);

}

function generateChartDiv(data,pointer) {


    pointer='';

    data.current = getRandomNumber(data['capacity'] / 2, data['capacity'] / 3 )
    divCounter++;
    var highChartPosition = "container-chart" + divCounter;
    var gaugePosition = "gauge-chart" + divCounter;
    $("#info").append('<div class="waterLevelPanel">' +
        '<div id="' + highChartPosition + '" style="width: 100%; height: 180px; margin: 0 auto"></div>' +
        '<svg id="' + gaugePosition + '" width="100%" height="55" onclick="gauge1.update(NewValue());"></svg>' +
        '</div>');

    plotHighchart(data, "#" + highChartPosition,pointer);
    plotGauge(data, gaugePosition);

    return null;

}

function plotHighchart(data, position,pointer) {

    $(position).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: pointer+''+data['address']
        },
        xAxis: {
            categories: [data['address']]
        },
        yAxis: {

            plotLines: [{
                color: 'red',
                value: data['histavg'],
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
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [
            {
                data: [(data['capacity'] - data['current'])],
                color: '#F7D774',
                showInLegend: false

            },
            {
                data: [data['current']],
                color: '#0303C2',
                showInLegend: false

            }]
    });
}
function plotGauge(data, position) {

    var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.15;
    config4.circleColor = "#2ECCFA";
    config4.textColor = "#000";
    config4.waveTextColor = "#000";
    config4.waveColor = "#2ECCFA";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 3;
    loadLiquidFillGauge(position, ((data['current']) / (data['capacity']) * 100), config4);
}

