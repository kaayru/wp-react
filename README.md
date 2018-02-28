# React WordPress Theme

## Documentation & examples
* [Theme built with React](https://github.com/ryelle/Anadama-React)
* [Step by step tutorial](https://medium.freecodecamp.org/how-to-build-react-apps-on-top-of-the-wordpress-rest-api-bcc632808025)
* [Wordpress HRM Webpack](https://github.com/tadejstanic/wp-hrm-webpack)

## Getting started

Set theme name and URL of WP install in `webpack/env.config.js`.

```javascript
module.exports = {
  // Should reflect the name of the theme directory
  THEME_NAME: 'wp-react',
  // Shuld reflect the public URL where WP is installed
  PROXY_TARGET: 'wpreact.local',
  ...
}
```

Install all dependencies and launch the local server with HMR and Browsersync.

```bash
# Install NPM dependencies
npm install
# Start server
npm start
```

The site will be assible under http://localhost:3000.

## Release Process

```bash
# Build package
npm run build
```

This will extract all required theme files and copy them into the `build` directory, which is then ready to become an *official* WP theme package. 

You can move it into your local Wordpress `themes` directory, rename it to whatever you want, modify theme description data in `style.css` and finally activate the new theme.