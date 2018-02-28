const path = require('path');

module.exports = {
  THEME_NAME: 'wp-react',
  PROXY_TARGET: 'wpreact.local',
  HOST: 'localhost',
  PORT: 3000,
  PATHS: {
    src: unipath('src'),
    compiled: unipath('compiled'),
    modules: unipath('node_modules'),
    base: unipath('.'),
  }
};

function unipath(base) {
  return function join() {
    const _paths = [base].concat(Array.from(arguments));
    return path.resolve(path.join.apply(null, _paths));
  }
}
