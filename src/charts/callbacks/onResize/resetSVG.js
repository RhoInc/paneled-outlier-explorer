export default function resetSVG() {
    this.svg.selectAll('*').classed('hidden', false);
    this.svg.select('.poe-no-data').remove();
}
