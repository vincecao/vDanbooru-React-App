/* eslint-disable @typescript-eslint/no-var-requires */
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';
require('react-scripts/config/env');

const path = require('path');
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig');

module.exports = createJestConfig(
  (relativePath) => require.resolve(path.join('react-scripts', relativePath)),
  __dirname, // given that Jest config is in project root
  false,
);
