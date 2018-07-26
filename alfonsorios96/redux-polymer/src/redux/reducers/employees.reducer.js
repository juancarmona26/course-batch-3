'use strict';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEES':
      // ALWAYS return new state
      state.push(action.employee);
      return state;
    
    // Return the state, nothing changed.
    default:
      return state;
  }
};

export {reducer};
