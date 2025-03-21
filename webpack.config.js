const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  return {
    plugins: [
      new Dotenv()
    ],
    entry: './scripts/background.js', // this is your starting point
    output: {
      filename: 'background.bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: argv.mode || 'development',
    devtool: isProd ? false : 'source-map',
  }
};