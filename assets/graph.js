var regChart, ticketChart;
var regTotal = 0, regRate = 0;
var ticketSubmitTotal = 0, ticketAnswerTotal = 0, responseRate = 0;

Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

/**
 * Request data from the server, add it to the graph and set a timeout to request again
 */

function requestRegData() {
    $.ajax({
        url: 'regGraph.php',
        success: function(point) {
            var series = regChart.series[0],
                shift = series.data.length > 40; // shift if the series is longer than 20

            // add the point
            regChart.series[0].addPoint(point, true, shift);
            regTotal = point[1];
            regRate = point[2].toFixed(2);
            regStatsView.render();

            // call it again after one second
            setTimeout(requestRegData, 2000);
        },
        cache: false
    });
};

function requestTicketData() {
    $.ajax({
        url: 'ticketGraph.php',
        success: function(point) {
            var series = ticketChart.series[0],
                shift = series.data.length > 40; // shift if the series is longer than 20

            submitPoint = [point[0],point[1]];
            ticketChart.series[0].addPoint([point[0],point[1]], true, shift);
            console.log(submitPoint);
            ticketSubmitTotal=point[1];

            answerPoint = [point[0],point[2]];
            ticketChart.series[1].addPoint([point[0],point[2]], true, shift);
            console.log(answerPoint);
            ticketAnswerTotal=point[2];

            ticketStatsView.render();

            // call it again after one second
            setTimeout(requestTicketData, 2000);
        },
        cache: false
    });
};

$(document).ready(function() {
regChart = new Highcharts.Chart({
    chart: {
        renderTo: 'reg-graph',
        defaultSeriesType: 'spline',
        marginLeft:55,
        marginRight: 20,
        marginBottom: 30,
        backgroundColor: "transparent",
        events: {
            load: requestRegData
        }
    },

            plotOptions: {
            series: {
                marker: {
                    radius: 3
                }
            }
        },
    title: {
        text: 'student registration'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        maxZoom: 20 * 1000
    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
            text: '# of People',
            margin: 10
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: '# of People',
        data: []
    }]
});

ticketChart = new Highcharts.Chart({
        chart: {
            renderTo: 'ticket-graph',
            defaultSeriesType: 'spline',
            marginLeft:55,
            marginRight: 20,
            marginBottom: 30,
            backgroundColor: "transparent",
            events: {
                load: requestTicketData
            }
        },

            plotOptions: {
            series: {
                marker: {
                    radius: 3
                }
            }
        },
        title: {
            text: 'ticketing'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: '# of Tickets',
                margin: 10
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Tickets Submitted',
            data: []
            },
            {
            name: 'Tickets Answered',
            data: []
            }
        ]
    });
});
