'use strict';

import {createStore} from 'redux';
import PolymerRedux from './polymer-redux';

import reducer from './reducers/reducers';

const store = createStore(
  reducer
);

const ReduxMixin = PolymerRedux(store);

export {ReduxMixin};
