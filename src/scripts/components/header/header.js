import React                from 'react';
import createReactClass     from 'create-react-class';
import { Link }             from 'react-router-dom';
import Navigation           from 'components/navigation/navigation.js';
import SettingsActions      from 'flux/actions/SettingsActions.js';
import SettingsStore      from 'flux/stores/SettingsStore.js';

var Header = createReactClass({  

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState() {
    return SettingsStore.getState();
  },

  componentDidMount() {
    SettingsStore.listen(this.onChange);
    SettingsActions.fetchSettings();
  },

  componentWillUnmount() {
    SettingsStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  isHome() {
    const homeUrl = this.state.settings.home;
    const currentUrl = this.context.router.route.location.pathname;
    return currentUrl === homeUrl;
  },

  render() {
    if (!this.state.settings) {
      return <header className="site-header"></header>
    }

    return (
      <header className="site-header">
		    <div className="site-header-branding">
          {isHome() ? (
            <h1 className="site-header-branding__title"><Link to={ this.state.settings.home }>{ this.state.settings.name }</Link></h1>
          ) : (
            <p className="site-header-branding__title"><Link to={ this.state.settings.home }>{ this.state.settings.name }</Link></p>
          )}
				  <p className="site-header-branding__description">{ this.state.settings.description }</p>
        </div>

        <Navigation></Navigation>
	    </header>
    )
  }
});

export default Header;