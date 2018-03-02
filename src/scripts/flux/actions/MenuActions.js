import axios                from 'axios';
import alt                  from 'flux/alt/alt.js';
import { WP_API_ENDPOINTS } from 'config/api.config.js';
import { Menu, menuItem }   from 'models/menu.model';

class MenuActions {

  fetchMenu(menuId) {
    return (dispatch) => {
      dispatch(menuId);

      axios.get(WP_API_ENDPOINTS.menus + '/' + menuId).then((response) => { 
        this.updateMenu(menuId, response.data);
      }).catch((error) => {
        this.fetchMenuFailed(error);
        throw error;
      });
    }
  }
  
  updateMenu(menuId, data) {
    return { menuId, data };
  }

  fetchMenuFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(MenuActions);