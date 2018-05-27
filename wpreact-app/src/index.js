import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware'

import Home from 'components/home.js';
import Page from 'components/page.js';
import Header from 'components/header/header.js';
import reducers from 'reducers';

const store = createStore(reducers, {}, applyMiddleware(
  promiseMiddleware()
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/:pageSlug" component={ Page } exact />
            <Route render={() => { return <Redirect to="/" /> }} />
          </Switch> 
        </div>
    </Router>
  </Provider>
  , document.getElementById('main')
);