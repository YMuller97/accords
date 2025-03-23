import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLogged, isAdmin, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    setTimeout(() => {
      logout();
    }, 0);
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.burgerIcon} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`${classes["nav-list"]} ${isOpen ? classes.open : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({isActive}) => (isActive ? classes.active : "")}
            onClick={toggleMenu}
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({isActive}) => (isActive ? classes.active : "")}
            onClick={toggleMenu}
          >
            Annuaire
          </NavLink>
        </li>
        <li>
          {isLogged ? (
            <NavLink
              to="/msg"
              className={({isActive}) => (isActive ? classes.active : "")}
              onClick={toggleMenu}
            >
              Messagerie
            </NavLink>
          ) : null}
        </li>
        <li>
          {isLogged && !isAdmin ? (
            <NavLink
              to="/profile"
              className={({isActive}) => (isActive ? classes.active : "")}
              onClick={toggleMenu}
            >
              Compte
            </NavLink>
          ) : null}
        </li>
        <li>
          {isLogged ? (
            <button onClick={handleLogout} className={classes.logout}> ➜ </button>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

