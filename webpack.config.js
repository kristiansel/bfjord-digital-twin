const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DroneInspection',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
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
      { from: 'models/Bru.trb', to: 'models/Bru.trb'}
    ])
  ]
};