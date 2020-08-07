// @flow
import './css/bootstrap.min.css';
import './css/awesomefonts.css';
import './css/neat.css';
import './css/mono-blue.min.css';
import React, {useContext} from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import DiagramBuilder from "./pages/diagramBuilder/DiagramBuilder";
import WorkflowList from "./pages/workflowList/WorkflowList";
import buildReducer from "./store/reducers/builder";
import bulkReducer from "./store/reducers/bulk";
import mountedDeviceReducer from "./store/reducers/mountedDevices";
import searchReducer from "./store/reducers/searchExecs";
import Header from './common/header/Header'
import { GlobalContext } from './common/GlobalContext';

const rootReducer = combineReducers({
  bulkReducer,
  searchReducer,
  buildReducer,
  mountedDeviceReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

function App() {
  const global = useContext(GlobalContext)
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={[
              global.frontendUrlPrefix + "/builder",
              global.frontendUrlPrefix + "/builder/:name/:version",
            ]}
            render={(props) => <DiagramBuilder {...props}/>}
          />
          <Route
            exact
            path={[
              global.frontendUrlPrefix + "/:type",
              global.frontendUrlPrefix + "/:type/:wfid",
            ]}
            render={() => (
              <>
                <Header />
                <WorkflowList />
              </>
            )}
          />
          <Redirect to={global.frontendUrlPrefix + "/defs"} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
