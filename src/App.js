import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
