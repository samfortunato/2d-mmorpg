import { h, Fragment } from 'preact';
import { Route, Switch } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { LogIn } from './log-in';
import { EnterMfaCode } from './enter-mfa-code';
import { SignUp } from './sign-up';
import { SetupMfa } from './setup-mfa';

export function AuthScreen() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}/log-in`}><LogIn /></Route>
        <Route exact path={`${path}/enter-mfa-code`}><EnterMfaCode /></Route>
        <Route exact path={`${path}/sign-up`}><SignUp /></Route>
        <Route exact path={`${path}/setup-mfa`}><SetupMfa /></Route>
      </Switch>
    </>
  );
}
