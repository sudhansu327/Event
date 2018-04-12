const   path = require('path'),
        webpack = require("webpack"),
        ExtractTextPlugin = require("extract-text-webpack-plugin"),
        CleanWebpackPlugin = require('clean-webpack-plugin'),
        env = (process.env.NODE_ENV || 'local').trim();

console.log('Running Webpack in ' + env + ' mode.');
console.log('Public path set to ' + process.env.VIRTUAL_DIR || '/');


module.exports = require('./configs/webpack.development');

switch(env) {
    case 'local':
        module.exports = require('./configs/webpack.development');

        module.exports.devServer = {
            contentBase: path.join(__dirname, '/wwwroot/'),
            publicPath: "/",
            compress: true,
            hot: true,
            historyApiFallback: true,
            proxy: {
                "/api": "http://localhost:33810"
            },
            port: 9000
        };

        module.exports.module.rules.push(
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader'
                    }]
                }),
                exclude: [
                    path.resolve(__dirname, "app/routes"),
                    path.resolve(__dirname, "app/layout")
                ]
            });
        break;
    case 'development':
        module.exports = require('./configs/webpack.development');

        module.exports.module.rules.push(
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }]
                })
                //,
                //exclude: [
                //    path.resolve(__dirname, "app/routes"),
                //    path.resolve(__dirname, "app/layout")
                //]
            });

        module.exports.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    'dead_code': true,
                    'unused': true,
                    'warnings': false
                },
                mangle: true,
                comments: false,
                sourceMap: true
            }));

        module.exports.plugins.push(
            new CleanWebpackPlugin([
            path.resolve(__dirname, 'wwwroot')
            ]));
        
        break;
    case 'production':
        module.exports = require('./configs/webpack.production');

        module.exports.plugins.push(
            new CleanWebpackPlugin([
            path.resolve(__dirname, 'wwwroot')
            ]));
        break;
}