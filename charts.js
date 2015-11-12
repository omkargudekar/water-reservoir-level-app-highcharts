var divCounter=1;
var globalDiv=['#infoBottom','#infoLeft','#infoRight'];

function getRandomNumber(max, min) {

    return Math.floor((Math.random() * max) + min);

}

function generateChartDiv(data) {


    data.current = getRandomNumber(data['capacity'] / 2, data['capacity'] / 3);
    var highChartPosition = "container-chart" + divCounter;
    var gaugePosition = "gauge-chart" + divCounter;
    $(globalDiv[divCounter%3]).append('<div class="waterLevelPanel">' +
        '<div class="headerText"><b>#'+divCounter+'</b>  '+data['address']+'</div>' +
        '<div id="' + highChartPosition + '" style="width: 100%; height: 190px; margin: 0 auto"></div>' +
        '<svg id="' + gaugePosition + '" width="100%" height="55" onclick="gauge1.update(NewValue());"></svg>' +
        '</div>');

    plotHighchart(data, "#" + highChartPosition, divCounter);
    plotGauge(data, gaugePosition);

    divCounter++;
}



function plotHighchart(data, position) {


    var chart=$(position).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text:  ''
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

    loadLiquidFillGauge(position, ((data['current']) / (data['capacity']) * 100));


}

