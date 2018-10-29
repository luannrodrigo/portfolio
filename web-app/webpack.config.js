const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    // Ponto de partida
    // entry: './src/index.js',
    entry: {
        babelPolyfill: 'babel-polyfill', 
        index: './src/index.js', 
        indexController: './src/controllers/IndexController.js'
    },
    // Ponto de sainda para a pasta bundle
    output: {
        path: path.resolve(__dirname, 'dist/bundle'),
        filename: '[name].bundle.js'
    },
    // Para optimizar o e minificar o js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                output: {
                    comments: false
                }
            }
            }),
    new OptimizeCSSAssetsPlugin({})
        ]   
    },
    // MInificando e extraindo o código css
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css.css'
        })
    ],
        module: {
    rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
            test: /\.css$/,
            use: [
                { loader: MiniCssExtractPlugin.loader }, //style-loader
                { loader: "css-loader" }
            ]
        },

        {
            test: /\.(scss)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader, // inject CSS to page
            }, {
                loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
                loader: 'postcss-loader', // Run post css actions
                options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            }, {
                loader: 'sass-loader' // compiles Sass to CSS
            }]
        },
        /*{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }*/
    ]
},
devServer: {
    contentBase: path.join(__dirname, 'dist'),
        compress: true,
            port: 9000
}
    };
