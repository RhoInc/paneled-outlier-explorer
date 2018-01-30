import defineData from './init/defineData';
import captureMeasures from './init/captureMeasures';
import { select } from 'd3';
import { multiply } from 'webcharts';
import layout from './init/layout';
import applyFilters from './init/applyFilters';

export default function init(data) {
    const chart = this;

    //Attach various data arrays to charts.
    defineData.call(this, data);

    //Capture unique set of measures in data.
    captureMeasures.call(this);

    //Define layout of renderer.
    layout.call(this);

    //Initialize charts.
    multiply(this, this.data.raw, 'measure_unit');

    //Initialize listing.
    this.listing.config.cols = Object.keys(data[0]).filter(
        key => ['brushed', 'measure_unit', 'abnormal', 'abnormalID'].indexOf(key) === -1
    ); // remove system variables from listing
    this.listing.init(this.data.raw);

    //Define custom event listener for filters.
    const controls = this.controls.wrap.selectAll('.control-group');
    controls
        .filter(control => control.label === 'X-axis')
        .selectAll('option')
        .property(
            'label',
            d => this.config.time_cols.filter(time_col => time_col.value_col === d).pop().label
        );

    controls.on('change', function(d) {
        if (['dropdown', 'subsetter'].indexOf(d.type) > -1) {
            d.value = select(this)
                .selectAll('option')
                .filter(function() {
                    return this.selected;
                })
                .text();
            applyFilters.call(chart, d);
        }
    });
}
