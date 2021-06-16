const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    target: 'node',
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        alias: {
            "@services": path.resolve(__dirname, 'src/services/'),
            "@lib": path.resolve(__dirname, 'src/lib/')
        }    
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [ nodeExternals() ],
    devServer: {
        contentBase: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ["js", "ts"],
          }),
        new NodemonPlugin()
      ],
};
