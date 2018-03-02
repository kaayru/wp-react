import {render}             from 'react-dom';
import DataActions          from 'flux/actions/DataActions.js';
import Home                 from 'components/home.js';
import Page                 from 'components/page.js';
import Navigation           from 'components/navigation/navigation.js';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

class AppInitializer {
    run() {
        render(
            <div>
                <Router>
                    <div>
                        <Navigation></Navigation>
                        <Switch>
                            <Route path="/" component={ Home } exact />
                            <Route path="/:pageSlug" component={ Page } exact />
                            <Route render={() => { return <Redirect to="/" /> }} />
                        </Switch> 
                    </div>
                </Router>
            </div>

            , document.getElementById('main')
        );
    }
}

new AppInitializer().run();