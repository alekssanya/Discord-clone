import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import type { Configuration } from "webpack-dev-server"

type Mode = 'production' | 'development'
interface EnvVariables {
    mode: Mode
}

export default (env: EnvVariables) => {
    const config: webpack.Configuration = {
        mode: env.mode,
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        devtool: env.mode === 'development' ? 'source-map' : false,
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: 'images/[hash][ext][query]',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: path.resolve(__dirname, 'public', 'icon.ico'),
                title: 'My App',
            }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css"
            }),
            //new BundleAnalyzerPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'imgs/[name][hash:8].[ext]',
                            }
                        },
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            }
        },
        devServer: {
            port: 5000,
            open: true
        },
    }

    return config
}