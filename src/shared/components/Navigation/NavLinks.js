import React, { useContext } from "react";
import { AuthContext } from "../../../shared/components/context/auth-context";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && ( <li>
        <NavLink to="/" exact>
          Dashboard
        </NavLink>
      </li>)}
      <li>
        <NavLink to="/Places" exact>
          All Places
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          All Users
        </NavLink>
      </li>
      
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Place</NavLink>
        </li>
      )} */}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/place/new">Add Place</NavLink>
        </li>
      )} */}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && (
        <button
          style={{
            border: "none",
          }}
          onClick={auth.logout}
        >
          Logout
        </button>
      )} */}
    </ul>
  );
};

export default NavLinks;
