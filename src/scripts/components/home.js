// @flow

import DataStore from 'flux/stores/DataStore.js';
import React     from 'react';

class Home extends React.Component {
  render() {
        // const allData = DataStore.getPageBySlug('home')

        return (
            <div>
                <h2>Hello world!</h2>
            </div>
        );
  }
}

export default Home;