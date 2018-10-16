const path = require('path');

module.exports = {
    // Ponto de partida
    // entry: './src/index.js',
    entry: ["babel-polyfill", "./src/index.js"], // irá empacotar em um unico arquivo.
    // Ponto de sainda
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module:{
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            /*{
            test: /\.css$/,
            use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
        ]
    }*/
    {
        test: /\.css$/,
        use: [
            { loader: "style-loader/url" },
            { loader: "file-loader" }
        ]
    },
    {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }
]
},
devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
}
};
