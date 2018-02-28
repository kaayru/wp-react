const path = require('path');

module.exports = {
  // Should reflect the name of the theme directory
  THEME_NAME: 'wp-react',
  // Shuld reflect the public URL where WP is installed
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
