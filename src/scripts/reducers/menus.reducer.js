import { FETCH_MENU } from 'actions';

export default function(state = null, action) {
  switch(action.type) {
    case `${FETCH_MENU}_FULFILLED`: 
      const menu =  action.payload.data;
      const menuId = action.meta.menuId;
      const newState = {...state, [menuId]: menu};
      return newState;
  }
  
  return state;
} 
