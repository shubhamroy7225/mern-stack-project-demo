import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Signin from "./auth/Signin/Signin";
import Auth from "./user/pages/Auth";
function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/place/new" component={NewPlace} exact />
        <Route path="/place/:placeId" component={UpdatePlace} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Route path="/auth" component={Auth} exact />
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default App;
