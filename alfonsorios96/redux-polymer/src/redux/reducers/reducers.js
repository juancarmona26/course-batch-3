'use strict';

import { combineReducers } from 'redux';
import {reducer as UserReducer} from './user.reducer';
import {reducer as EmployeesReducer} from './employees.reducer';

export default combineReducers({
  user: UserReducer,
  employees: EmployeesReducer
})
