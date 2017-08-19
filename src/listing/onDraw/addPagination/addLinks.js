import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addLinks() {
    //Count rows.
    this.pagination.rowsTotal = this.data.length;

    //Calculate number of pages needed and create a link for each page.
    this.pagination.numPages = Math.ceil(this.pagination.rowsTotal / this.pagination.rowsShown);
    this.pagination.wrap.selectAll('a').remove();

    for (let i = 0; i < this.pagination.numPages; i++) {
        this.pagination.wrap
            .append('a')
            .datum({ rel: i })
            .attr({
                href: '#',
                rel: i
            })
            .text(i + 1)
            .classed('page-link', true)
            .classed('active', d => d.rel == this.pagination.activeLink)
            .classed('hidden', i > 4);
    }

    this.pagination.links = this.pagination.wrap.selectAll('a.page-link');
}