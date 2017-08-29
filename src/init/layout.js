import { select, selectAll } from 'd3';
import toggleChart from './toggleChart';
import toggleCharts from './toggleCharts';

export default function layout() {
    const chart = this,
        //Create navigation bar.
        navigationBar = select(this.div).insert('ul', ':first-child').attr('id', 'navigation-bar'),
        navigationButtons = navigationBar
            .selectAll('li.navigation')
            .data(['Charts', 'Listing'])
            .enter()
            .append('li')
            .classed('navigation', true)
            .classed('active', d => d === 'Charts')
            .attr('id', d => d + '-nav')
            .text(d => d)
            .on('click', function(d) {
                navigationButtons.filter(di => di === d).classed('active', true);
                navigationButtons.filter(di => di !== d).classed('active', false);
                if (d === 'Charts') {
                    select('#Listing').classed('hidden', true);
                    select('#Charts').classed('hidden', false);
                } else {
                    select('#Charts').classed('hidden', true);
                    select('#Listing').classed('hidden', false);
                }
            }),
        //Create controls header.
        controlsHeader = select(this.div)
            .insert('div', ':first-child')
            .attr('id', 'controls-header')
            .text('Controls'),
        //Define all-chart toggle.
        measureListContainer = select(this.element + ' #left-side')
            .append('ul')
            .attr('id', 'measure-list-container'),
        measureListHeader = measureListContainer.append('div').attr('id', 'measure-list-header'),
        measureListCheckbox = measureListHeader
            .append('input')
            .attr({
                id: 'measure-list-checkbox',
                type: 'checkbox',
                title:
                    this.config.measures.length === this.config.allMeasures.length
                        ? 'Remove all charts'
                        : 'Display all charts'
            })
            .property('checked', this.config.measures.length === this.config.allMeasures.length)
            .on('click', function() {
                toggleCharts(chart, this);
            });
    measureListHeader.append('span').text('Measures');
    const measureList = measureListContainer //Define individual chart toggles.
        .append('ul')
        .attr('id', 'measure-list');
    const measureItems = measureList
        .selectAll('li.measure-item')
        .data(this.config.allMeasures)
        .enter()
        .append('li')
        .attr('class', d => 'measure-item ' + d.replace(/[^a-z0-9-]/gi, '-'))
        .each(function(d) {
            //Append div inside list item.
            const measureItemContainer = select(this)
                .append('div')
                .classed('measure-item-container', true);
            //Check whether measure should by displayed initially.
            const checked = chart.config.measures.indexOf(d) > -1; //Append checkbox inside div.
            const measureItemCheckbox = measureItemContainer
                .append('input')
                .classed('measure-checkbox', true)
                .attr({
                    type: 'checkbox',
                    title: checked ? 'Remove chart' : 'Display chart'
                })
                .property('checked', checked);
            const measureItemLabel = measureItemContainer.append('span').text(d => d);
        })
        .on('change', function(d) {
            toggleChart(chart, this);
        });
}
