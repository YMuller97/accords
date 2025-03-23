import logo from "../../medias/accords_logo.png";
import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={classes.welcome}>
      <img src={logo} alt="App logo" className={classes["welcome-logo"]} />
      <div className={classes["welcome-text"]}>
        <h2 className={classes.title}>Rencontrez des musiciens</h2>
        <p className={classes.paragraph}>
          Grâce à notre annuaire en ligne et ses nombreuses options de filtres,
          trouvez des musiciens près de chez vous !
        </p>
      </div>
    </div>
  );
};

export default Welcome;
