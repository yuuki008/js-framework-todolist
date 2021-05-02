import React from 'react';
import {render} from 'react-dom';
import * as History from 'history'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router'
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Todo } from './pages/Todo';
import { AuthWrapper } from './AuthWrapper'


render(
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <AuthWrapper>
          <>
            <Route exact path="/" component={Todo} />
          </>
        </AuthWrapper>
      </Switch>
    </Router>,
  document.getElementById('root')
);

