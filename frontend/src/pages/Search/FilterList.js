import classes from "./FilterList.module.css";
import star_icon_checked from "../../medias/star_icon_checked.png";
import star_icon_unchecked from "../../medias/star_icon_unchecked.png";
import { useContext } from "react";
// import { AuthContext } from '../../contexts/AuthContext';
import { SearchContext } from "../../contexts/SearchContext";
import FormSelect from "../../components/Forms/FormSelect";
import FormInputWithLabel from "../../components/Forms/FormInputWithLabel";

const FilterList = () => {
  // -------------------------------------------------------------- HOOKS -------------------------------------------------------------- //

  //Contexts
  const { filters, handleFilterChange, instruments, genres, levels, handleToggleFavFilter } = useContext(SearchContext);

  // -------------------------------------------------------------- DATAS -------------------------------------------------------------- //

  //List of instruments from database, used to define options in FormSelect component
  const instrumentsList = instruments;

  //List of levels from database, used to define options in FormSelect component
  const levelsList = levels;

  //List of musical genres from database, used to define options in FormSelect component
  const genresList = genres;

  //List of objectives, used to define options in FormSelect component
  const objectives = [
    { id: "1", label: "Pas d'objectif particulier" },
    { id: "2", label: "Juste pour le plaisir" },
    { id: "3", label: "Enregistrements et concerts" },
    { id: "4", label: "Professionalisation" },
  ];

  // ------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------- //

  // ------------------------------------------------------------- RENDERING ------------------------------------------------------------- //
  return (
    <>
      <div className={classes["filter-form-container"]}>
        <form className={classes["filter-form"]}>
          <div className={classes["check-fav"]}>
            <label htmlFor="fav-only">Mes Favoris</label>
            <div className={classes["fav-only"]} onClick={handleToggleFavFilter}>
              <img
                src={filters.is_favorite ? star_icon_checked : star_icon_unchecked}
                alt="favoris"
              />
            </div>
          </div>

          {/* Search by user name */}
          <FormInputWithLabel
            type={"text"}
            name={"name_user"}
            placeholder={"Nom, prenom"}
            val={filters.name_user}
            labelText={"Rechercher"}
            handleChange={handleFilterChange}
          />

          {/* Filter by instrument played */}
          <FormSelect
            name={"id_instrument"}
            val={filters.instrument}
            options={instrumentsList}
            label={"Instruments : "}
            placeholder={"Quel instrument cherchez-vous ?"}
            handleChange={handleFilterChange}
          />

          {/* Filter by level of playing */}
          <FormSelect
            name={"id_level"}
            val={filters.level}
            options={levelsList}
            label={"Niveau : "}
            placeholder={"Quel niveau cherchez-vous ?"}
            handleChange={handleFilterChange}
          />

          {/* Filter by musical genre */}
          <FormSelect
            name={"id_genre"}
            val={filters.genre}
            options={genresList}
            label={"Genre musical : "}
            placeholder={"Quel genre jouez-vous ?"}
            handleChange={handleFilterChange}
          />

          {/* Filter by localisation */}
          <FormInputWithLabel
            type={"text"}
            name={"postal_code"}
            placeholder={"Numéro de département"}
            val={filters.postal_code}
            labelText={"Département"}
            handleChange={handleFilterChange}
          />

          {/* Filter by weekly individual practice time */}
          <FormInputWithLabel
            type={"number"}
            name={"time_by_week"}
            placeholder={"Heures par semaine"}
            val={filters.practiceTime}
            labelText={"Pratique personnelle : "}
            handleChange={handleFilterChange}
          />

          {/* Filter by weekly band rehearsal availability */}
          <FormInputWithLabel
            type={"number"}
            name={"time_available"}
            placeholder={"Heures par semaine"}
            val={filters.rehearsalTime}
            labelText={"Pratique en groupe : "}
            handleChange={handleFilterChange}
          />

          {/* Filter by objectives as a band */}
          <FormSelect
            name={"goals"}
            val={filters.objective}
            options={objectives}
            label={"Objectifs : "}
            placeholder={"Quel sont vos objectifs ?"}
            handleChange={handleFilterChange}
          />

          {/* <input type="submit" onChange={handleSubmit} value="Appliquer les filtres"></input> */}
        </form>
      </div>
    </>
  );
};
export default FilterList;
