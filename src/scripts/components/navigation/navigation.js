// @flow

import React                          from 'react';
import type { Node }                  from 'react';
import { Link }                       from 'react-router-dom';
import MenuActions                    from 'flux/actions/MenuActions.js';
import MenuStore, { MenuStoreState }  from 'flux/stores/MenuStore.js';
import { PRIMARY_MENU }               from 'config/menu.config.js';
import { WP_API_BASE_URL }            from 'config/api.config';
import { Menu, MenuItem }             from 'models/menu.model';

import './navigation.scss';

class Navigation extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor() {
    super();
    this.state = MenuStore.getState();
  }

  componentDidMount() {
    MenuStore.listen(this.onChange.bind(this));
    MenuActions.fetchMenu(PRIMARY_MENU);
  }

  componentWillUnmount() {
    MenuStore.unlisten(this.onChange);
  }

  onChange(state: MenuStoreState) {
    this.setState(state);
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
    if (!this.state.menus || !this.state.menus[PRIMARY_MENU]) {
      return <div className="navigation"></div>;
    }

    return (
      <div className="navigation">
        { this.renderMenuItems(this.state.menus[PRIMARY_MENU]) }
      </div>
    )
  }
};

export default Navigation;