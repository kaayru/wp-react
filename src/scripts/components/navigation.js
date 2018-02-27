import React          from 'react';
import MenuActions    from 'flux/actions/MenuActions.js';
import MenuStore      from 'flux/stores/MenuStore.js';

const menuName = 'primary'

var Navigation = React.createClass({
  getInitialState() {
    return MenuStore.getState();
  },

  componentDidMount() {
    MenuStore.listen(this.onChange);
    MenuActions.fetchMenu(menuName);
  },

  componentWillUnmount() {
    MenuStore.unlisten(this.onChange);
  },

  onChange(state) {
    console.log(state);
    this.setState(state);
  },

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong: { this.state.errorMessage } </div>
      );
    }

    if (!this.state.menus || !this.state.menus[menuName]) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        { this.state.menus[menuName].items.map((menuItem, i) => {
            return (<li key={ i }><a href={ menuItem.url }>{ menuItem.title }</a></li>)
        }) }
      </ul>
    )
  }
});

export default Navigation;