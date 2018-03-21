// @flow

import React                        from 'react';
import type { Element, Node }       from 'react';
import createReactClass             from 'create-react-class';
import { Link }                     from 'react-router-dom';
import Navigation                   from 'components/navigation/navigation.js';
import SettingsActions              from 'flux/actions/SettingsActions.js';
import SettingsStore                from 'flux/stores/SettingsStore.js';
import type { SettingsStoreState }  from 'flux/stores/SettingsStore.js';
import { Settings }                 from 'models/settings.model';

class Header extends React.Component<{}, SettingsStoreState> {  

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = SettingsStore.getState();
  }

  componentDidMount() {
    SettingsStore.listen(this.onChange.bind(this));
    SettingsActions.fetchSettings();
  }

  componentWillUnmount() {
    SettingsStore.unlisten(this.onChange.bind(this));
  }

  onChange(state: SettingsStoreState) {
    this.setState(state);
  }

  isHome(): boolean {
    const homeUrl = this.state.settings.home;
    const currentUrl = this.context.router.route.location.pathname;
    return currentUrl === homeUrl;
  }

  renderLogo(): Element<'img'>|void {
    if (!this.state.settings.custom_logo) {
      return;
    }

    return <img src={ this.state.settings.custom_logo } />
  }

  renderSiteName(): Element<'h1'>|Element<'p'> {
    return this.isHome() ? (
      <h1 className="site-header-branding__title"><Link to={ this.state.settings.home }>{ this.state.settings.name }</Link></h1>
    ) : (
      <p className="site-header-branding__title"><Link to={ this.state.settings.home }>{ this.state.settings.name }</Link></p>
    )
  }

  render(): Node {
    if (!this.state.settings || !this.state.settings.home) {
      return <header className="site-header"></header>
    }

    return (
      <header className="site-header">
		    <div className="site-header-branding">
          { this.renderLogo() }
          { this.renderSiteName() }
				  <p className="site-header-branding__description">{ this.state.settings.description }</p>
        </div>

        <Navigation></Navigation>
	    </header>
    )
  }
}

export default Header;