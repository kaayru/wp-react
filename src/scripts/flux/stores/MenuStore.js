import alt          from 'flux/alt/alt.js';
import MenuActions  from 'flux/actions/MenuActions.js';

class MenuStore {
  constructor() {
    this.menus = {};
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateMenu: MenuActions.UPDATE_MENU,
      handleFetchMenu: MenuActions.FETCH_MENU,
      handleFetchMenuFailed: MenuActions.FETCH_MENU_FAILED
    });
  }

  handleUpdateMenu(menu) {
    this.menus[menu.slug] = menu;
    this.errorMessage = null;
  }
  handleFetchMenu(menuSlug) {
    // reset the array while we're fetching new menu so React can
    // be smart and render a spinner for us since the data is empty.
    if (this.menus[menuSlug]) {
      delete this.menus[menuSlug];
    }
  }

  handleFetchMenuFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

export default alt.createStore(MenuStore, 'MenuStore');