import { applyMiddleware, createStore,compose } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "../reducers";


  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );



const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store