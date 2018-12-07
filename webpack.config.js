const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
    drone: './src/drone.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // library: 'DroneInspection',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: 'css-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      assets: path.resolve(__dirname, 'assets')
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/@technology/webgl-viewer/dist', to: 'node_modules/@technology/webgl-viewer/dist' },
      { from: 'node_modules/@technology/webgl-viewer/images', to: 'node_modules/@technology/webgl-viewer/images' },
      { from: 'node_modules/@technology/webgl-viewer/fonts', to: 'node_modules/@technology/webgl-viewer/fonts' },
      { from: 'src/sw.js' },
      { from: 'src/viewer.js', to: 'src/viewer.js' },
      { from: 'css/', to: 'css/' },
      { from: 'assets/', to: 'assets/' },
      { from: 'models/', to: 'models/' },
      { from: 'index.html' },
      { from: 'drone.html' },
      { from: 'traffic.html' },
      { from: 'wind.html' }
    ])
  ]
};