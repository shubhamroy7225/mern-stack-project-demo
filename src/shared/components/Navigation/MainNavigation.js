import React, { useState } from "react";
import Backdrop from '../UIElements/Backdrop/Backdrop'
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
const MainNavigation = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const handledSideDrawer=()=>{
    setSideDrawerOpen(true)
  }
  const closeSideDrawer = ()=>{
    setSideDrawerOpen(false)
  }
  return (
    <>
    {
      sideDrawerOpen && <Backdrop onClick={closeSideDrawer}/>
    }
      
        <SideDrawer show={sideDrawerOpen} onClick={closeSideDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
    
      <MainHeader>
        <button className="main-navigation__menu-btn " onClick={handledSideDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlace</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
