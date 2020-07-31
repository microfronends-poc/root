const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, { mode }) => {
	const production = mode === 'production';

	return {
		entry: path.resolve(__dirname, 'src/root'),
		output: {
			filename: 'mf-root.js',
			libraryTarget: 'system',
			path: path.resolve(__dirname, 'dist'),
		},
		devtool: production ? 'none' : 'sourcemap',
		module: {
			rules: [
				{ parser: { system: false } },
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{ loader: 'babel-loader' }],
				},
			],
		},
		devServer: {
			historyApiFallback: true,
			disableHostCheck: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				inject: false,
				template: 'src/index.ejs',
				templateParameters: {
					isLocal: env && env.isLocal === 'true',
				},
			}),
			new CleanWebpackPlugin(),
		],
		externals: ['single-spa'],
	};
};