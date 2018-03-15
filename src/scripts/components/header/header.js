import React                from 'react';
import createReactClass     from 'create-react-class';
import Navigation           from 'components/navigation/navigation.js';
import SettingsActions      from 'flux/actions/SettingsActions.js';
import SettingsStore      from 'flux/stores/SettingsStore.js';

var Header = createReactClass({  
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

  render() {
    if (!this.state.settings) {
      return <header className="site-header"></header>
    }

    return (
      <header className="site-header">
		    <div className="site-header-branding">
			    <h1 className="site-header-branding__title">{ this.state.settings.name }</h1>
				  <p className="site-header-branding__description">{ this.state.settings.description }</p>
        </div>

        <Navigation></Navigation>
	    </header>
    )
  }
});

export default Header;