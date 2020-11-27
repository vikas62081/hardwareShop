import React from 'react';
import './App.css';
import {routes} from './common/router'
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {Notification} from './common/components/notification'
import Header from './common/components/header'
import SecurityPin from './common/components/securityPin'
import Login from './common/components/login'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import {reducer} from './common/reducers'
import {sendSMS} from './common/ha'
const store = createStore(reducer, compose(
  // applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
function App() {
  return (
    <div className="App">
     {/* <h1>React App</h1> */}
     <Provider store={store}>
     <Header/>
     {/*<Login/>*/}
      <SnackbarProvider maxSnack={3}>
          <Router>
                <Switch>
                    {routes.map((route,index) => <Route key={index} {...route} />)}
                </Switch>
          </Router>
          <Notification/>
      </SnackbarProvider>
      </Provider>
    </div>
  );
}

export default App;
