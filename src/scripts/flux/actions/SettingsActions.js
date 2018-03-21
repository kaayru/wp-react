// @flow

import axios                from 'axios';
import alt                  from 'flux/alt/alt.js';
import { WP_API_ENDPOINTS } from 'config/api.config.js';

class SettingsActions {

  fetchSettings(): Object {
    return (dispatch) => {
      axios.get(WP_API_ENDPOINTS.settings).then((response) => { 
        this.updateSettings(response.data);
      }).catch((error) => {
        this.fetchSettingsFailed(error);
        throw error;
      });
    }
  }
  
  updateSettings(data: Object) {
    return data;
  }

  fetchSettingsFailed(errorMessage: string): string {
    return errorMessage;
  }
}

module.exports = alt.createActions(SettingsActions);