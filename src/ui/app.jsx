import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route, Switch, useHistory } from 'react-router-dom';

import { AuthService } from '../services/auth-service';

import { AppContextProvider } from './contexts/app';
import { AuthScreen } from './auth-screen';
import { GameScreen } from './game-screen';

export function App() {
  const history = useHistory();

  useEffect(goToAuthIfNotLoggedIn, []);

  function goToAuthIfNotLoggedIn() {
    if (!AuthService.isLoggedIn()) history.push('/auth/log-in');
  }

  return (
    <AppContextProvider>
      <main>
        <Switch>
          <Route path="/auth" component={AuthScreen} />
          <Route exact path="/" component={GameScreen} />
        </Switch>
      </main>
    </AppContextProvider>
  );
}
