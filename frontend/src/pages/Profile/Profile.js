import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import InstrumentCard from "../../components/InstrumentCard/InstrumentCard";
import GenreCard from "../../components/GenreCard/GenreCard";
import classes from "./Profile.module.css";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);

  // Vérifier si l'utilisateur est connecté avant d'accéder à son ID
  const userId = user.dataValues.id_user;
  // console.log("Informations de userId", userId);
  // console.log("Informations de l'utilisateur", user.dataValues.id_user);

  useEffect(() => {
    // if (!userId) return; // Évite d'exécuter si userId est undefined

    fetch(
      `api/users/${user.dataValues.id_user}/instruments`
    )
      .then((response) => response.json())
      .then((instruments) => {
        // console.log(instruments);
        setInstruments(instruments);
      })
      .catch((error) => console.error("Erreur:", error));

    fetch(`api/users/${user.dataValues.id_user}/genres`)
      .then((response) => response.json())
      .then((genres) => {
        // console.log(genres);
        setGenres(genres);
      })
      .catch((error) => console.error("Erreur:", error));
  }, [userId, user.dataValues.id_user]);

  if (!user) {
    return <div>Chargement du profil...</div>;
  }

  const currentDate = new Date(); // Moved currentDate inside the component before the return statement

  return (
    <div className={classes.container}>
      <div className={classes.containerLeft}>
        <div className={`${classes.container} ${classes.idCard}`}>
          <div className={`${classes.containerIdCard} ${classes.profilImage}`}>
            <div className={classes.box}>
              <img
                src={`api/${user.dataValues.picture_user}`}
                alt="Profil"
                className={classes.box}
              />
            </div>
          </div>
          <div
            className={`${classes.containerIdCard} ${classes.profilInformations}`}
          >
            <h1 className={classes.nameSurname}>
              {user.dataValues.name_user}
            </h1>
            <h1 className={classes.nameSurname}>
              {user.dataValues.first_name_user}
            </h1>
            <h2 className={classes.pseudo}>
              {user.dataValues.alias_user}
            </h2>
            <p className={classes.otherInformations}>
              {currentDate.getFullYear() -
                new Date(
                  user.dataValues.birth_date_user
                ).getFullYear()}{" "}
              ans
            </p>
            <p className={classes.otherInformations}>
              {user.dataValues.postal_code_user}
            </p>
          </div>
        </div>
        <div className={`${classes.container} ${classes.description}`}>
          <h3>À propos :</h3>
          <p>{user.dataValues.description_user}</p>
        </div>
      </div>

      <div className={classes.containerRight}>
        <div className={classes.containerInstruments}>
          <div className={classes.instrument}>
            {instruments.map((instrument) => {
              return (
                <InstrumentCard
                  key={instrument.id_instrument}
                  instrument={instrument.Instrument.name_instrument}
                  level={instrument.Level.label_level}
                />
              );
            })}
          </div>
        </div>
        <div
          className={`${classes.genres} flex flex-col sm:flex-row gap-4 justify-center`}
        >
          {Array.isArray(genres) &&
            genres.map((genre) => {
              return (
                <GenreCard
                  key={genre.id_genre}
                  genre={genre.Genre.name_genre}
                />
              );
            })}
        </div>
        <div className={classes.others}>
          <div className={classes.goal}>
            <p className={classes.left}>Objectifs :</p>
            <p className={classes.right}>Loisirs</p>
          </div>
          <div className={classes.timePerWeek}>
            <p className={classes.left}>Temps consacré par semaine :</p>
            <p className={classes.right}>exemple</p>
          </div>
          <div className={classes.timePerWeekWished}>
            <p className={classes.left}>Temps souhaité en groupe :</p>
            <p className={classes.right}>exemple</p>
          </div>
          <NavLink className={classes.pencil} to="/profileForm">
            🖉
          </NavLink>
        </div>
      </div>
    </div> // Wrapped the entire content in a single parent <div> container
  );
};

export default Profile;
