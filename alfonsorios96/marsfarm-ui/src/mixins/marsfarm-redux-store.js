import { createStore } from "redux";
import PolymerRedux from "./marsfarm-polymer-redux.js";
import temperaturesJSON from './temperatures.js';

const initialState = {
  user: {
    name: 'Alfonso'
  },
  temperatures: temperaturesJSON
};

const reducer = state => state;

const store = createStore(
  reducer,
  initialState
);
const ReduxMixin = PolymerRedux(store);

export default ReduxMixin;
