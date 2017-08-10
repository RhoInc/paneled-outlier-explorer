import { extent } from 'd3';

export default function onPreprocess() {
    //Set the y-domain individually for each measure.
    this.config.y.domain = extent(
        this.raw_data.filter(d => d.TEST === this.currentMeasure),
        d => +d.STRESN
    );
    const range = this.config.y.domain[1] - this.config.y.domain[0];
    this.config.y.format = range < 0.1 ? '.3f' : range < 1 ? '.2f' : range < 10 ? '.1f' : '1d';
}
