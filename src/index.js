import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { watchMapCases, watchCountryTimeseries } from "./redux/sagas";
import { mapCasesReducer } from "./redux/reducers/mapCases.reducer";
import { countryTimeseriesReducer } from "./redux/reducers/countryTimeseries.reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(thunk, sagaMiddleware);
const enhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools({})(middlewares)
    : middlewares;

const store = createStore(
  combineReducers({
    mapCases: mapCasesReducer,
    countryTimeseries: countryTimeseriesReducer
  }),
  enhancers
);

sagaMiddleware.run(watchMapCases);
sagaMiddleware.run(watchCountryTimeseries);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
