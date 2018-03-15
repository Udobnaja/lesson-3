const HtmlWebPackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: true
                            }
                        }]
                })
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: [/src\/images/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: [/src\/fonts/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: [/src\/fonts/],
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            outputPath: 'images',
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        tracking: {
            global: 'tracking',
            commonjs: 'tracking',
            amd: 'tracking'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename:'./[name].css'
        })
    ],
    devtool : "source-map"
};