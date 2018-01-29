export default function adjustTicks() {
    if (this.config.x.rotate_tick_labels) {
        const ticks = this.svg
            .selectAll('.x.axis .tick text')
            .attr({
                transform: 'rotate(-45)',
                dx: -10,
                dy: 10
            })
            .style('text-anchor', 'end');

        ticks
            .filter(d => ('' + d).length > 10)
            .text(d => d.slice(0, 7) + '...')
            .style('cursor', 'help')
            .append('title')
            .text(d => d);
    }
}
