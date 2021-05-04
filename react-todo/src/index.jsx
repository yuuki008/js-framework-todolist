import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router'
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Todo } from './pages/Todo';
import { UserPage } from './pages/UserPage';
import { PaymentEditWrapper } from './pages/PaymentEditWrapper'


render(
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/" component={Todo} />
        <Route exact path="/mypage" component={UserPage} />
        <Route exact path="/user/payment/edit" component={PaymentEditWrapper} />
      </Switch>
    </Router>,
  document.getElementById('root')
);

