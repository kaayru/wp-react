// @flow

import axios                from 'axios';
import alt                  from 'flux/alt/alt.js';
import { WP_API_ENDPOINTS } from 'config/api.config.js';
import { Menu, menuItem }   from 'models/menu.model';

class MenuActions {

  fetchMenu(menuId: string): Object {
    return (dispatch) => {
      axios.get(WP_API_ENDPOINTS.menus + '/' + menuId).then((response) => { 
        this.updateMenu(menuId, response.data);
      }).catch((error) => {
        this.fetchMenuFailed(error);
        throw error;
      });
    }
  }
  
  updateMenu(menuId: string, data: Menu) {
    return { menuId, data };
  }

  fetchMenuFailed(errorMessage: string) {
    return errorMessage;
  }
}

module.exports = alt.createActions(MenuActions);