const path  = require('path')
const webpack  = require('webpack')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')
const htmlWebpackPlugin  = require('html-webpack-plugin')
const copyPlugin  = require('copy-webpack-plugin')


const getMeMode = () => {
    return process.env.MY_REACT_APP_MODE
}

const getMeSourceMap = () => {
    switch (process.env) {
        case 'development' : {
            return 'inline-source-map'
        }
        case 'production' : {
            return 'source-map'
        }
    }
}


module.exports = {
    mode: getMeMode(),
    devtool: getMeSourceMap(),
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.js','.jsx','.ts','.tsx']
    },
    devServer: {
        port: 3333,
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './public')
        }
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),  new htmlWebpackPlugin({template: './public/index.html'}),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
        new copyPlugin({
            patterns: [
                {from: './public/favicon.ico', to: ''},
                {from: './public/logo192.png', to: ''},
                {from: './public/logo512.png', to: ''},
                {from: './public/manifest.json', to: ''},
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif|ico)$/,
                type: 'asset/resource'
            }
        ]
    }
}