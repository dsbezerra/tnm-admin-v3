import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

module.exports = {

  context: __dirname,

  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    './app/index',
  ],

  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },

  stats: {
    colors: true,
    timings: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],

  module: {

    loaders: [

      {
        test: /(\.js|\.jsx)$/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-1'],
      },

      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },

    ],
  },
}
