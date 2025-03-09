import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const isAdmin = parsedUser?.isAdmin;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">E-Commerce</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          
          {/* Hide Cart if user is an Admin */}
          {!isAdmin && <li><Link to="/checkout">Cart</Link></li>}
          
          {token && parsedUser ? (
            <li>
              <Link to={isAdmin ? "/admin-profile" : "/user-profile"}>
                Profile
              </Link>
            </li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
