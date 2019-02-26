const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function(env = {}) {
    return {
        mode: env.production ? 'production' : 'development',
        devServer: {
            port: 3000,
            host: '0.0.0.0',
            stats: {
                children: false,
            },
        },
        entry: './src/index.ts',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            noParse: [
                /benchmark/,
            ],
            rules: [
                {test: /\.ts$/, loader: 'ts-loader'},
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Collision detection performance tests',
            }),
        ],
        stats: {
            children: false,
        },
    };
};
