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

  getClassName(menuItem) {
    let classNameArray = [];
    classNameArray.push('navigation__item menu-item');
    classNameArray.push(`menu-item-type-${menuItem.type}`);
    classNameArray.push(`menu-item-object-${menuItem.object}`);
    classNameArray.push(`menu-item-${menuItem.post_name}`);
    classNameArray.push(`menu-item-${menuItem.ID}`);

    if (this.isCurrentRoute(menuItem)) {
      classNameArray.push('current-menu-item current_page_item');
    }

    return classNameArray.join(' ');
  },

  render() {
    if (!this.state.menus || !this.state.menus[PRIMARY_MENU]) {
      return <div className="navigation"></div>;
    }

    return (
      <div className="navigation">
        <ul className="navigation__list menu nav-menu">
          { this.state.menus[PRIMARY_MENU].items.map((menuItem, i) => {
            return (
              <li key={ i } className={ this.getClassName(menuItem) }>
                <Link to={ menuItem.url }>{ menuItem.title }</Link>
              </li>
            )
          }) }
        </ul>
      </div>
    )
  }
});

export default Navigation;