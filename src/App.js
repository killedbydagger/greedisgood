import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/forgetpassword" component={ForgetPasswordPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
