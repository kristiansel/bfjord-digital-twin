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
      { from: 'models/bru2.trb', to: 'models/bru2.trb'},
      { from: 'models/pongtonger2.trb', to: 'models/pongtonger2.trb'},
      { from: 'models/ortho2.trb', to: 'models/ortho2.trb'},
      { from: 'models/flightpath2.trb', to: 'models/flightpath2.trb'},
      { from: 'models/crack1.trb', to: 'models/crack1.trb'},
      { from: 'models/crack2.trb', to: 'models/crack2.trb'},
      { from: 'models/crack3.trb', to: 'models/crack3.trb'},
      { from: 'models/crack4.trb', to: 'models/crack4.trb'},
      { from: 'models/crack5.trb', to: 'models/crack5.trb'},
      { from: 'models/crack6.trb', to: 'models/crack6.trb'},
      { from: 'models/crack7.trb', to: 'models/crack7.trb'},
      { from: 'models/lysmast.pdf', to: 'models/lysmast.pdf'}

    ])
  ]
};