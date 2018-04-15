import axios from 'axios';
import { WP_API_ENDPOINTS } from 'config/api.config';

export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const FETCH_MENU = 'FETCH_MENU';

export function fetchSettings() {
  const promise = axios.get(WP_API_ENDPOINTS.settings)

  return {
    type: FETCH_SETTINGS,
    payload: promise
  };
}

export function fetchMenu(menuId) {
  const promise = axios.get(`${WP_API_ENDPOINTS.menus}/${menuId}`)
    .then(response => {

      const getMenuItems = function(parentId, allMenuItems) {
        return allMenuItems
          .filter(item => item.menu_item_parent == parentId)
          .map(item => {
            item.items = getMenuItems(item.ID, allMenuItems);
            return item;
          });
      }

      const allMenuItems = response.data.items;
      response.data.items = getMenuItems('0', allMenuItems)

      return response;
    });

  return {
    type: FETCH_MENU,
    payload: promise,
    meta: { menuId }
  };
}