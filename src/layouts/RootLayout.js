import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header className="switch-page">
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
            to="/"
          >
            {" "}
            Trending Movies
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
            to="search"
          >
            {" "}
            Search Movies
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
            to="mylist"
          >
            {" "}
            My List
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
