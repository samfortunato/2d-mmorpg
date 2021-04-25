import { h, Fragment } from 'preact';
import { Route, Switch } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { LogIn } from './log-in';
import { SignUp } from './sign-up';

export function AuthScreen() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}/log-in`}><LogIn /></Route>
        <Route exact path={`${path}/sign-up`}><SignUp /></Route>
      </Switch>
    </>
  );
}
