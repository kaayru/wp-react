import { combineReducers } from 'redux';
import SettingsReducer from 'reducers/settings.reducer';
import MenusReducer from 'reducers/menus.reducer';

const rootReducer = combineReducers({
  settings: SettingsReducer,
  menus: MenusReducer
});

export default rootReducer;
