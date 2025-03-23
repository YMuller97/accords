import ImageUpload from "./ImageUpload";
import classes from "./ProfileForm.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ProfileForm = () => {
  const { user, datas} = useContext(AuthContext);

  const [picture, setPicture] = useState(null); // État pour le fichier image
  // const [instrument, setInstrument] = useState({ name_instrument: "" });
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  // Sélection aléatoire d'un utilisateur au chargement des données
  // useEffect(() => {
  //   if (datas && datas.users && datas.users.length > 0) {
  //     logUser(datas.users[Math.floor(Math.random() * datas.users.length)]);
  //   }
  // }, [datas, logUser]);

  // Mise à jour des listes depuis les données
  useEffect(() => {
    if (datas && datas.instruments) {
      setInstrumentsList(datas.instruments);
    }
    if (datas && datas.levels) {
      setLevelsList(datas.levels);
    }
    if (datas && datas.musical_genres) {
      setGenresList(datas.musical_genres);
    }
  }, [user, datas]);

  // Soumission du formulaire avec fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!picture) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("picture_user", picture); // Clé attendue par le backend

    const token = localStorage.getItem("authToken"); // Récupère le token depuis user (ajuste selon ton contexte)
    if (!token) {
      throw new Error("Aucun token d'authentification disponible");
    }

    try {
      const response = await fetch("http://localhost:3001/users/me/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l’upload");
      }

      const data = await response.json();
      console.log("Image uploadée avec succès :", data);
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  return (
    <div>
      <form className={classes.grid} onSubmit={handleSubmit}>
        <div className={classes.containerLeft}>
          <div className={`${classes.container} ${classes.idCard}`}>
            <div
              className={`${classes.containerIdCard} ${classes.profilImage}`}
            >
              <div className={classes.box}>
                <ImageUpload picture={picture} setPicture={setPicture} />
              </div>
            </div>
            <div
              className={`${classes.containerIdCard} ${classes.profilInformations}`}
            >
              <input
                type="text"
                className={classes.color}
                placeholder={user?.name_user || ""}
              />
              <br />
              <input
                type="text"
                className={classes.color}
                placeholder={user?.first_name_user || ""}
              />
              <br />
              <input type="text" placeholder="Pseudo" />
              <br />
              <input type="text" placeholder="Année de naissance" />
              <br />
              <input type="text" placeholder="Code postal" />
              <br />
            </div>
          </div>
          <div className={`${classes.container} ${classes.description}`}>
            <textarea
              rows="15"
              cols="50"
              placeholder="Parles-nous de toi !"
              minLength={50}
              maxLength={2000}
            ></textarea>
          </div>
        </div>
        <div className={classes.containerRight}>
          <div className={classes.containerInstruments}>
            <div className={classes.instrument}>
              <select>
                <option value="">Instruments</option>
                {instrumentsList.map((instrument) => (
                  <option
                    key={instrument.id_instrument}
                    value={instrument.id_instrument}
                  >
                    {instrument.name_instrument}
                  </option>
                ))}
              </select>
              <select>
                <option value="">Niveau</option>
                {levelsList.map((level) => (
                  <option key={level.id_level} value={level.id_level}>
                    {level.label_level}
                  </option>
                ))}
              </select>
              <p className={classes.add}>+</p>
            </div>
          </div>
          <div className={classes.containerGenres}>
            <div className={classes.genres}>
              <select>
                <option value="">Genres</option>
                {genresList.map((musical_genre) => (
                  <option
                    key={musical_genre.id_genre}
                    value={musical_genre.id_genre}
                  >
                    {musical_genre.name_genre}
                  </option>
                ))}
              </select>
              <p className={classes.add}>+</p>
            </div>
          </div>
          <div className={classes.others}>
            <div className={classes.goal}>
              <p className={classes.left}>Objectifs :</p>
              <select className={classes.right}>
                <option>Loisirs</option>
                <option>Professionnel</option>
              </select>
            </div>
            <div className={classes.timePerWeek}>
              <p className={classes.left}>Temps consacré par semaine :</p>
              <select className={classes.right}>
                <option> - 2H/semaine</option>
                <option>entre 2H et 4H / semaine</option>
                <option>entre 4H et 6H / semaine</option>
                <option> + 6H / semaine</option>
              </select>
            </div>
            <div className={classes.timePerWeekWished}>
              <p className={classes.left}>Temps souhaité en groupe :</p>
              <select className={classes.right}>
                <option> - 2H/semaine</option>
                <option>entre 2H et 4H / semaine</option>
                <option>entre 4H et 6H / semaine</option>
                <option> + 6H / semaine</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className={classes.saveProfilButton}>
          Sauvegarder 🖬
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
