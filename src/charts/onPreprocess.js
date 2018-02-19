import defineXsettings from './onPreprocess/defineXsettings';
import deriveStatistics from './onPreprocess/deriveStatistics';
import deriveVariables from './onPreprocess/deriveVariables';
import defineFilteredData from './onPreprocess/defineFilteredData';
import defineDisplayedData from './onPreprocess/defineDisplayedData';

export default function onPreprocess() {
    defineXsettings.call(this);
    deriveStatistics.call(this);
    deriveVariables.call(this);
    defineFilteredData.call(this);
    defineDisplayedData.call(this);
    this.raw_data = this.data.displayed;
}
