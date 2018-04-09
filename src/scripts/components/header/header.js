// @flow

import React from 'react';
import type { Element, Node } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from 'components/navigation/navigation.js';
import { bindActionCreators } from 'redux';
import { fetchSettings } from 'actions';

class Header extends React.Component {  

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    this.props.fetchSettings();
  }

  isHome(): boolean {
    const homeUrl = this.props.settings.home;
    const currentUrl = this.context.router.route.location.pathname;
    return currentUrl === homeUrl;
  }

  renderLogo(): Element<'img'>|void {
    if (!this.props.settings.custom_logo) {
      return;
    }

    return <img src={ this.props.settings.custom_logo } />
  }

  renderSiteName(): Element<'h1'>|Element<'p'> {
    return this.isHome() ? (
      <h1 className="site-header-branding__title"><Link to={ this.props.settings.home }>{ this.props.settings.name }</Link></h1>
    ) : (
      <p className="site-header-branding__title"><Link to={ this.props.settings.home }>{ this.props.settings.name }</Link></p>
    )
  }

  render(): Node {
    if (!this.props.settings || !this.props.settings.home) {
      return <header className="site-header"></header>
    }

    return (
      <header className="site-header">
		    <div className="site-header-branding">
          { this.renderLogo() }
          { this.renderSiteName() }
				  <p className="site-header-branding__description">{ this.props.settings.description }</p>
        </div>
        <Navigation></Navigation>
	    </header>
    )
  }
}

function mapStateToProps({ settings }) {
  return { settings }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSettings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);