import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/context/auth-context";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid)
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/place/new" component={NewPlace} exact />
        <Route path="/place/:placeId" component={UpdatePlace} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/auth" component={Auth} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId:userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {/* <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/place/new" component={NewPlace} exact />
            <Route path="/place/:placeId" component={UpdatePlace} exact />
            <Route path="/:userId/places" component={UserPlaces} exact />
            <Route path="/auth" component={Auth} exact />
            <Redirect to="/" />
          </Switch> */}
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
