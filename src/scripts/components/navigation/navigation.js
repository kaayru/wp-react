import React                from 'react';
import createReactClass     from 'create-react-class';
import { Link }             from 'react-router-dom';
import MenuActions          from 'flux/actions/MenuActions.js';
import MenuStore            from 'flux/stores/MenuStore.js';
import { PRIMARY_MENU }     from 'config/menu.config.js';
import { WP_API_BASE_URL }  from 'config/api.config';

import './navigation.scss';

var Navigation = createReactClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState() {
    return MenuStore.getState();
  },

  componentDidMount() {
    MenuStore.listen(this.onChange);
    MenuActions.fetchMenu(PRIMARY_MENU);
  },

  componentWillUnmount() {
    MenuStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  isCurrentRoute(menuItem) {
    const menuItemRelativePath = menuItem.url.replace(WP_API_BASE_URL, '');
    return menuItemRelativePath === this.context.router.route.location.pathname;
  },

  getMenuClassName(menu) {
    let classNameArray = [];
    classNameArray.push('navigation__list');

    if (typeof menu.menu_item_parent === 'undefined') {
      classNameArray.push('menu nav-menu');
    } else {
      classNameArray.push('navigation__list--sub sub-menu');
    }
    return classNameArray.join(' ');
  },

  getMenuItemClassName(menuItem) {
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
  },

  renderMenuItems(menu) {
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
  },

  render() {
    if (!this.state.menus || !this.state.menus[PRIMARY_MENU]) {
      return <div className="navigation"></div>;
    }

    return (
      <div className="navigation">
        { this.renderMenuItems(this.state.menus[PRIMARY_MENU]) }
      </div>
    )
  }
});

export default Navigation;