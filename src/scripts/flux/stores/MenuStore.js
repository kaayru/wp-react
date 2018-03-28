// @flow

import alt          from 'flux/alt/alt.js';
import MenuActions  from 'flux/actions/MenuActions.js';
import { Menu }     from 'models/menu.model';

class MenuStore {
  menus: Object;
  errorMessage: ? string = null;
  bindListeners: (Object) => Object;

  constructor() {
    this.menus = {};
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateMenu: MenuActions.UPDATE_MENU,
      handleFetchMenu: MenuActions.FETCH_MENU,
      handleFetchMenuFailed: MenuActions.FETCH_MENU_FAILED
    });
  }

  handleUpdateMenu(menuInfo): void {
    const menu = new Menu(menuInfo.data);
    this.menus[menuInfo.menuId] = menu;
    this.errorMessage = null;
  }
  handleFetchMenu(menuId: string) {
    // reset the array while we're fetching new menu so React can
    // be smart and render a spinner for us since the data is empty.
    if (this.menus[menuId]) {
      delete this.menus[menuId];
    }
  }

  handleFetchMenuFailed(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export default alt.createStore(MenuStore, 'MenuStore');
export type MenuStoreState = {menus: Array<Menu>, errorMessage: string};