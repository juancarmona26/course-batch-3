'use strict';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      // ALWAYS return new state
      return Object.assign({}, state, action.user);
    
    // Return the state, nothing changed.
    default:
      return state;
  }
};

export {reducer};
