import babel from 'rollup-plugin-babel';

module.exports = {
    input: './src/index.js',
    output: {
        name: 'paneledOutlierExplorer',
        file: './build/paneledOutlierExplorer.js',
        format: 'umd',
        globals: {
            d3: 'd3',
            webcharts: 'webCharts'
        },
    },
    external: (function() {
        var dependencies = require('./package.json').dependencies;

        return Object.keys(dependencies);
    }()),
    plugins: [
        babel({
            presets: [['es2015',{'modules': false}]],
            plugins: ['external-helpers'],
            exclude: 'node_modules/**'})
    ]
};
