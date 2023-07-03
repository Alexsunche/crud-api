import path from 'path';

export default {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
         exclude: /node_modules/,
      }
    ],
  },
};