// @flow

import alt          from 'flux/alt/alt.js';
import SettingsActions  from 'flux/actions/SettingsActions.js';
import { Settings } from 'models/settings.model';

class SettingsStore {
  settings: Settings;
  errorMessage: ? string = null;
  bindListeners: (Object) => Object;
  
  constructor() {
    this.settings = new Settings();
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateSettings: SettingsActions.UPDATE_SETTINGS,
      handleFetchSettings: SettingsActions.FETCH_SETTINGS,
      handleFetchSettingsFailed: SettingsActions.FETCH_SETTINGS_FAILED
    });
  }

  handleUpdateSettings(settings: Settings): void {
    this.settings = settings;
    this.errorMessage = null;
  }
  handleFetchSettings(): void {
    // reset the array while we're fetching new settings so React can
    // be smart and render a spinner for us since the data is empty.
    this.settings = new Settings();
  }

  handleFetchSettingsFailed(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }
}

export default alt.createStore(SettingsStore, 'SettingsStore');