const ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('Html-Webpack-Plugin'),
    ngToolsWebpack = require('@ngtools/webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    webpack = require("webpack"),
    path = require('path'),
    rootDir = path.resolve(__dirname, '..');

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['@ngtools/webpack']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.css$/,
                include: rootDir + '/app/vendor.ts',
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.css$/,
                include: rootDir + '/app/',
                exclude: rootDir + '/app/vendor.ts',
                loader: "css-loader"
            }
        ]
    },
    profile: true,
    devtool: false,
    entry: {
        polyfills: './app/polyfills.ts',
        vendor: './app/vendor.ts',
        bundle: './app/main.aot.ts'
    },
    output: {
        filename: 'dist/[name].[hash].js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        path: path.resolve(rootDir, "wwwroot"),
        publicPath: '/or/'
    },
    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig-aot.json',
            entryModule: rootDir + '/app/app.module#AppModule'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                'dead_code': true,
                'unused': true
            },
            mangle: true,
            comments: false,
            sourceMap: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        //new ExtractTextPlugin(__dirname + "/wwwroot/styles.bundle.css"),
        new HtmlWebpackPlugin({
            title: 'Tree-shaking',
            template: './index-webpack.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(rootDir, 'assets/img/**/*'),
                to: path.resolve(rootDir, 'wwwroot/assets/img')
            }
        ])
    ],
    resolve: {
        extensions: [".ts", ".js"]
    }
}