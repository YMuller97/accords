import LoginForm from "./LoginForm";
// import UserInfo from "./UserInfo";
import Welcome from "./Welcome";

import BasicSearch from "./BasicSearch";
import classes from "./Home.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import {useContext} from "react";

const Home = () => {
  const {isLogged} = useContext(AuthContext);
  console.log("Etat de connexion : ", isLogged);

  if (isLogged) {
    return (
      <div className={classes.homepage}>
        <Welcome />
        <BasicSearch />
      </div>
    );
  } else {
    return (
      <div className={classes.homepage}>
        <Welcome />
        <LoginForm />
      </div>
    );
  }
};

export default Home;
