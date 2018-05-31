# React WordPress Theme

## Documentation & examples

* [Theme built with React](https://github.com/ryelle/Anadama-React)
* [Step by step tutorial](https://medium.freecodecamp.org/how-to-build-react-apps-on-top-of-the-wordpress-rest-api-bcc632808025)
* [Wordpress HRM Webpack](https://github.com/tadejstanic/wp-hrm-webpack)
* [Alt Flow React Example](https://github.com/theodesp/alt-flow-react-example/)

## Getting started

Set theme name and URL of WP install in `webpack/env.config.js`.

```javascript
module.exports = {
  // Should reflect the name of the theme directory
  THEME_NAME: 'wp-react',
  // Should reflect the public URL where WP is installed
  PROXY_TARGET: 'localhost:8000',
  ...
}
```

Install Docker, configs, NPM dependencies and launch the local server with HMR and Browsersync.

```bash
# Mount containers:
$ docker-compose up --build

# Install extra-configs
$ chmod +x install.sh && ./install.sh

# Build & start the front server:
$ cd wpreact-app
$ yarn && yarn start
```

### Browse to:

* `locahost:8000`: Configure WP Install after first build
* `locahost:8000/wp-admin`: WordPress Admin Dashboard
* `localhost:3001`: React App

### Settings:

* **Enable URL rewriting** for the WP REST API:
  Go to `Settings/Permalinks`, select one of the rewritten options, and save.
* Enable wp-react theme in `Appearance/Themes`
* Install required plugins in `Appearance/Install Plugins`

### Docker commands

* `docker ps`: List all Docker containers.
* `docker exec -it {container name} bash`: SSH into Docker container. Container names can be found using `docker ps`.
* `docker-compose down`: Shut down all containers (usefull in case of error during build)

## Release Process

```bash
# Build package
npm run build
```

This will extract all required theme files and copy them into the `build` directory, which is then ready to become an _official_ WP theme package.

You can move it into your local Wordpress `themes` directory, rename it to whatever you want, modify theme description data in `style.css` and finally activate the new theme.
