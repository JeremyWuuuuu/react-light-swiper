'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');

const CWD = fs.realpathSync(process.cwd());
const resolve = relativePath => path.resolve(CWD, relativePath);

module.exports = {
  entry: resolve('src/index.ts'),
  build: resolve('build'),
  public: resolve('public'),
  src: resolve('src'),
  test: resolve('src/test'),
  indexHTML: resolve('src/index.html'),
  packageJSON: resolve('package.json')
}