import { select } from 'd3';
import minimize from './minimize';

export default function m__imize(chart) {
    //Maximize chart.
    if (!chart.wrap.classed('expanded')) {
      //Clear previously expanded chart.
        if (chart.parent.expandedChart)
            minimize(chart.parent.expandedChart);

      //Attach expanded chart to parent.
        chart.parent.expandedChart = chart;

      //Modify chart configuation and redraw.
        chart.wrap.select('.m__imize-chart').html('&minus;').attr('title', 'Minimize chart');
        chart.wrap.classed('expanded', true);

        chart.config.width = null;
        chart.config.max_width = 9999;
        chart.config.height = null;
        chart.config.aspect = 2.5;

        chart.draw();

      //Sort expanded chart first.
        select(chart.div)
            .selectAll('.wc-chart')
            .sort(function(a,b) {
                return a.measure === chart.currentMeasure ? -1 : b.measure === chart.currentMeasure ? 1 : chart.config.measures.indexOf(a.measure) - chart.config.measures.indexOf(b.measure);
            });

      //Scroll window to expanded chart.
        const
            bodyRect = document.body.getBoundingClientRect(),
            elemRect = chart.wrap.node().getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;
        window.scrollTo(0,offset);
    }
    //Minimize chart
    else {
        minimize(chart);

      //Revert to default sort.
        select(chart.div)
            .selectAll('.wc-chart')
            .sort(function(a,b) {
                return chart.config.measures.indexOf(a.measure) - chart.config.measures.indexOf(b.measure);
            });
    }
}
