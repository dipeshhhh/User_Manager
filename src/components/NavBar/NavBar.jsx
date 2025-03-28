import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { removeToken } from "../../utils/auth";
import "./Navbar.css";

import FavIcon from "../../assets/shield_person.svg";
import Avatar from "../../assets/account_circle.svg";
import Logout from "../../assets/logout.svg";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const avatarIconRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((userMenuRef.current && avatarIconRef.current) &&
        (
          !userMenuRef.current.contains(event.target) &&
          avatarIconRef.current.toString() !== event.target.toString()
        )
      ) { setIsUserMenuOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => { setIsUserMenuOpen(!isUserMenuOpen) };

  const handleAvatarClick = (event) => {
    toggleUserMenu();
  }

  const handleFavIconClick = () => {
    navigate("/");
  }

  return (
    <nav className="navbar">
      <section className="navbar-section navbar-section-left" onClick={handleFavIconClick}>
        <img ref={avatarIconRef} src={FavIcon} className="navbar-icon" onClick={handleFavIconClick} />
        <h5 className="navbar-title" onClick={handleFavIconClick}>User Manager</h5>
      </section>
      <section className="navbar-section navbar-section-right">
        <div className="user-menu-container">
          <img src={Avatar} className="navbar-icon" onClick={handleAvatarClick} />
          {isUserMenuOpen && <UserMenu referrer={userMenuRef} />}
        </div>
      </section>
    </nav>
  )

}

function UserMenu({ referrer }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  }
  return (
    <ul className="user-menu" ref={referrer}>
      <li className="user-menu-item" onClick={handleLogout}>
        <img src={Logout} />
        Logout
      </li>
    </ul>
  )
}