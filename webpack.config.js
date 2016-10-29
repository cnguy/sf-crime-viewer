module.exports = {
    entry: "./app/static/src/App.js",
    output: {
        path: "./app/static/src/",
        filename: "App.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};