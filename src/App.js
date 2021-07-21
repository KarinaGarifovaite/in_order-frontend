import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './sass/main.css';
import ProtectedRoute from './pages/ProtectedRoute';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Signup = React.lazy(() => import('./pages/Signup'));
const HomePage = React.lazy(() => import('./pages/Homepage'));

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem('token') || null;

  useEffect(() => {
    if (token) setIsAuth(true);

    if (isAuth) {
      fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'in_order-token': token,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [token, isAuth, user]);

  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, user }}>
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route path='/log'>
              <Signup />
            </Route>
            <ProtectedRoute path='/homepage'>
              <HomePage />
            </ProtectedRoute>
          </Suspense>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
