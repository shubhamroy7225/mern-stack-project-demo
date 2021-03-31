import React, { useContext } from 'react';
import {AuthContext} from "../../../shared/components/context/auth-context"
import {NavLink} from 'react-router-dom'
import "./NavLinks.css"
const NavLinks = (props) => {
    const auth = useContext(AuthContext);
    return (
        <ul className='nav-links'>
            <li>
        <NavLink to='/' exact>All Users</NavLink>
            </li>
            {auth.isLoggedIn &&
            <li>
        <NavLink to='/u1/places'>My Place</NavLink>
            </li>}
            {auth.isLoggedIn &&
            <li>
        <NavLink to='/place/new'>Add Place</NavLink>
            </li>}
            {!auth.isLoggedIn &&
            <li>
        <NavLink to='/auth'>Login</NavLink>
            </li>}
            {auth.isLoggedIn && <button  style={{
                border:'none'
            }} onClick={auth.logout}>Logout</button> }
        </ul>
    );
};

export default NavLinks;