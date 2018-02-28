import React              from 'react';
import MenuActions        from 'flux/actions/MenuActions.js';
import MenuStore          from 'flux/stores/MenuStore.js';
import { PRIMARY_MENU }       from 'config/menu.config.js';

var Navigation = React.createClass({
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

  render() {
    if (!this.state.menus || !this.state.menus[PRIMARY_MENU]) {
      return <div></div>;
    }

    return (
      <ul>
        { this.state.menus[PRIMARY_MENU].items.map((menuItem, i) => {
            return (<li key={ i }><a href={ menuItem.url }>{ menuItem.title }</a></li>)
        }) }
      </ul>
    )
  }
});

export default Navigation;