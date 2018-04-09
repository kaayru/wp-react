import axios from 'axios';
import { WP_API_ENDPOINTS } from 'config/api.config';

export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const FETCH_MENU = 'FETCH_MENU';

export function fetchSettings() {
  const promise = axios.get(WP_API_ENDPOINTS.settings);

  return {
    type: FETCH_SETTINGS,
    payload: promise
  };
}

export function fetchMenu(menuId) {
  const promise = axios.get(`${WP_API_ENDPOINTS.menus}/${menuId}`);

  return {
    type: FETCH_MENU,
    payload: promise,
    meta: { menuId }
  };
}