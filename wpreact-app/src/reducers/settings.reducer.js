import { FETCH_SETTINGS } from 'actions';

export default function(state = null, action) {
  switch(action.type) {
    case `${FETCH_SETTINGS}_FULFILLED`: 
    return action.payload.data;
  }
  
  return state;
} 
