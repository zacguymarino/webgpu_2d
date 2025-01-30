const path = require('path');

module.exports = {
  mode: 'development', // Use 'production' for production builds
  entry: './static/js/main.js', // Main entry point
  output: {
    filename: 'bundle.js',
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
  devServer: {
    static: path.join(__dirname, 'static'),
    port: 3000,
    hot: true,
    devMiddleware: {
      writeToDisk: true, // Write files to disk for Flask to serve
    },
  },
};
