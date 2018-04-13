// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WP_API_BASE_URL } from 'config/api.config';
import { Menu, MenuItem } from 'models/menu.model';
import { fetchMenu } from 'actions';

import './navigation.scss';

class Navigation extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentDidMount() {
    this.props.fetchMenu(this.props.name);
  }

  isCurrentRoute(menuItem: MenuItem): boolean {
    const menuItemRelativePath = menuItem.url.replace(WP_API_BASE_URL, '');
    return menuItemRelativePath === this.context.router.route.location.pathname;
  }

  getMenuClassName(menu: Menu): string {
    let classNameArray = [];
    classNameArray.push('navigation__list');

    if (typeof menu.menu_item_parent === 'undefined') {
      classNameArray.push('menu nav-menu');
    } else {
      classNameArray.push('navigation__list--sub sub-menu');
    }
    return classNameArray.join(' ');
  }

  getMenuItemClassName(menuItem: MenuItem): string {
    let classNameArray = [];
    classNameArray.push('navigation__item menu-item');
    classNameArray.push(`menu-item-type-${menuItem.type}`);
    classNameArray.push(`menu-item-object-${menuItem.object}`);
    classNameArray.push(`menu-item-${menuItem.post_name}`);
    classNameArray.push(`menu-item-${menuItem.ID}`);

    if (this.isCurrentRoute(menuItem)) {
      classNameArray.push('current-menu-item current_page_item');
    }

    if (menuItem.has_children) {
      classNameArray.push(`menu-item-has-children`);
    }

    return classNameArray.join(' ');
  }

  renderMenuItems(menu: Menu) {
    return (
      <ul className={ this.getMenuClassName(menu) }>
        { menu.items.map((menuItem, i) => {
          return (
            <li key={ i } className={ this.getMenuItemClassName(menuItem) }>
              <Link to={ menuItem.url }>{ menuItem.title }</Link>
              { menuItem.has_children && this.renderMenuItems(menuItem) }
            </li>
          )
        }) }
      </ul>
    )
  }

  render(): Node {

    if (!this.props.menus || !this.props.menus[this.props.name]) {
      return <div className="navigation"></div>;
    }

    return (
      <div className="navigation">
        { this.renderMenu(this.props.menus[this.props.name]) }
      </div>
    )
  }
};

function mapStateToProps({ menus }) {
  return { menus }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMenu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);