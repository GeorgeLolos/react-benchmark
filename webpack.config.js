/* global __dirname */

const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const jsDir = path.resolve(__dirname, 'js');
const htmlDir = path.resolve(__dirname, 'html');
const buildDir = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(jsDir, 'main.js'),
    output: {
        path: buildDir,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: buildDir,
    },
    module: {
        loaders: [
            {
                loader: 'react-hot',
                test: jsDir,
            },
            {
                loader: 'babel-loader',
                test: jsDir,
                query: {
                    presets: ['es2015', 'react'],
                },
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: htmlDir } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};
