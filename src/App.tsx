import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from 'utils';
import { TestPage,LoginPage,NotFoundPage } from 'views';

const App = () => {
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
          render={() => <LoginPage />}
        />
        <Route
          component={NotFoundPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
