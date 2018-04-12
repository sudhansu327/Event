const HtmlWebpackPlugin = require('Html-Webpack-Plugin'),
    webpack = require("webpack"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    rootDir = path.resolve(__dirname, '..'),
    virtualPath = (process.env.VIRTUAL_DIR || '/').trim(),
    env = (process.env.NODE_ENV || 'development').trim();

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        query: {
                            configFileName: './tsconfig-jit.json'
                        }
                    },
                    { loader: 'angular-router-loader' },
                    { loader: 'angular2-template-loader' },
                    {
                        loader: 'string-replace-loader',
                        query: {
                            multiple: [
                                { search: 'module.id', replace: 'module.id.toString()' },
                                { search: 'app/routes', replace: '.', flags: 'g' }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html:css)$/
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './assets/fonts/[hash].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './assets/img/[name].[ext]'
                }
            }
        ]
    },
    profile: false,
    entry: {
        polyfills: './app/polyfills.ts',
        vendor: './app/vendor.ts',
        bundle: './app/main.ts'
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'dist/[name].[hash].js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        path: path.resolve(rootDir, "wwwroot"),
        publicPath: virtualPath,
        sourceMapFilename: 'dist/[file].map'
    },
    plugins: [
        new ExtractTextPlugin('assets/css/[name].bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bundle', 'vendor', 'polyfills']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            title: 'Global Mobile',
            template: env === 'local' ? './index.webpack.local.html' : './index.webpack.html',
            filename: 'index.html',
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(rootDir, 'assets/img/**/*'),
                to: path.resolve(rootDir, 'wwwroot')
            }
        ])
    ],
    resolve: {
        extensions: [".ts", ".js", ".css", ".png", ".jpg", ".gif"]
    }
}