export default function m__imize(chart) {
    //Maximize chart.
    if (!chart.wrap.classed('expanded')) {
        chart.wrap.select('.m__imize-chart').html('&minus;').attr('title', 'Minimize chart');
        chart.wrap.classed('expanded', true);
        chart.config.width = chart.config.initialSettings.width * 3;
        chart.config.height = chart.config.initialSettings.height * 3;
        chart.draw();
    } else {
        //Minimize chart
        chart.wrap.select('.m__imize-chart').html('&plus;').attr('title', 'Maximize chart');
        chart.wrap.classed('expanded', false);
        chart.config.width = chart.config.initialSettings.width;
        chart.config.height = chart.config.initialSettings.height;
        chart.draw();
    }
}
