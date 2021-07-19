import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './sass/main.css';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Signup = React.lazy(() => import('./pages/Signup'));
const HomePage = React.lazy(() => import('./pages/Homepage'));
function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/log'>
            <Signup />
          </Route>
          <Route path='/homepage'>
            <HomePage />
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
