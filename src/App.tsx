import { useQuery } from '@apollo/client';
import { accessTokenQuery } from 'apollo-config/interface';
import { GET_ACCESS_TOKEN_LOCALLY } from 'apollo-config/localQueries';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from 'utils/protectedRoute';
import { useAuthUtils } from 'utils/useAuthUtils';
import LoginPage from 'views/login/login';
import NotFoundPage from 'views/notFound/notFound';
import TestPage from 'views/test/test';

const App = () => {
  const {isLoggedIn} = useAuthUtils()
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          child={<TestPage />}
          path='/'
          exact
        />
        <Route
          exact
          path="/login"
          render={() => isLoggedIn ? <Redirect to={'/'} />
            : <LoginPage />}
        />
        <Route
          component={NotFoundPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
