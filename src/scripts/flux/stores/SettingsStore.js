import alt          from 'flux/alt/alt.js';
import SettingsActions  from 'flux/actions/SettingsActions.js';

class SettingsStore {
  constructor() {
    this.settings = {};
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateSettings: SettingsActions.UPDATE_SETTINGS,
      handleFetchSettings: SettingsActions.FETCH_SETTINGS,
      handleFetchSettingsFailed: SettingsActions.FETCH_SETTINGS_FAILED
    });
  }

  handleUpdateSettings(settings) {
    this.settings = settings;
    this.errorMessage = null;
  }
  handleFetchSettings() {
    // reset the array while we're fetching new settings so React can
    // be smart and render a spinner for us since the data is empty.
    this.settings = {};
  }

  handleFetchSettingsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

export default alt.createStore(SettingsStore, 'SettingsStore');