import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AllPlaceItem from "./places/components/AllPLacesItem";
import PlaceDetails from "./places/components/PlaceDetails";
import AllPlaces from "./places/pages/AllPlaces";
import { AuthContext } from "./shared/components/context/auth-context";
import { useAuth } from "./shared/components/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import UpdatePassword from "./user/components/UpdatePassword";
import UserProfile from "./user/components/UserProfile";
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const Users = React.lazy(() => import("./user/pages/Users"));
const MainNavigation = React.lazy(() =>
  import("./shared/components/Navigation/MainNavigation")
);
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/places" component={AllPlaces} exact />
        <Route path="/users" component={Users} exact />
        <Route path="/place/new" component={NewPlace} exact />
        <Route path="/place/:placeId" component={UpdatePlace} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Route path="/places/details/:placeId" component={PlaceDetails} exact />
        <Route path="/user/:userId/profile" component={UserProfile} exact />
        <Route path="/user/:userId/password" component={UpdatePassword} exact />
        <Redirect to="/places" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/places" component={AllPlaces} exact />
        <Route path="/users" component={Users} exact />
        <Route path="/places/details/:placeId" component={PlaceDetails} exact />
        <Route path="/auth" component={Auth} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Redirect to="/places" />
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
        <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
          <MainNavigation />
          <main>{routes}</main>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
