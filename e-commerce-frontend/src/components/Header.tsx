import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const isAdmin = parsedUser?.isAdmin;
  const location = useLocation(); // Get current route

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">E-Commerce</Link>
      </div>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">Products</Link>
          </li>

          {/* Hide Cart if user is an Admin */}
          {token && parsedUser && (
            <li className={location.pathname === "/checkout" ? "active" : ""}>
              <Link to="/checkout">Cart</Link>
            </li>
          )}

          {token && parsedUser ? (
            <li
              className={
                location.pathname === (isAdmin ? "/admin-profile" : "/user-profile")
                  ? "active"
                  : ""
              }
            >
              <Link to={isAdmin ? "/admin-profile" : "/user-profile"}>Profile</Link>
            </li>
          ) : (
            <li className={location.pathname === "/login" ? "active" : ""}>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
