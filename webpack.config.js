const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Use 'production' for production builds
  entry: {
    main: './static/js/main.js', // Main entry point
    playground: './static/js/playground.js', // Playground entry point
  },
  output: {
    filename: '[name].bundle.js', // Output file names based on entry point names
    path: path.resolve(__dirname, 'static/dist'), // Output to the 'dist' folder
    publicPath: '/static/dist/', // Used by Webpack dev server
  },
  module: {
    rules: [
      {
        test: /\.css$/, // For importing CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './templates/index.html',
      chunks: ['main'], // Only include the main bundle
    }),
    new HtmlWebpackPlugin({
      filename: 'playground.html',
      template: './templates/playground.html',
      chunks: ['playground'], // Only include the playground bundle
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'static'),
    port: 3000,
    hot: true,
    devMiddleware: {
      writeToDisk: true, // Write files to disk for Flask to serve
    },
  },
};
