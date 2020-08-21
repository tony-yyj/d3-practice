const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src',
        overlay: true,
        quiet: true,
        hot: true,
    }
}