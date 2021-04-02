import React from "react";
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
import { useAuth } from "./shared/components/hooks/auth-hook";
function App() {
 const {token,login,logout,userId} = useAuth()
  let routes;
  if (token) {
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
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
