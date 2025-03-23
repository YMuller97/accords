import {useContext, useEffect, useRef, useState} from "react";
import classes from "./BasicSearch.module.css";
import FormSelect from "../../components/Forms/FormSelect";
import {Form} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const BasicSearch = () => {
  const {datas} = useContext(AuthContext);
  const [searchBand, setSearchBand] = useState(false);
  const searchBandRef = useRef(null);
  const instrumentsList = datas.instruments;
  const searchOptions = [
    {value: "player", label: "Un.e musicien.ne"},
    {value: "band", label: "Un groupe"},
  ];
  // const handleChange = () => {
  //     setSearchBand(!searchBand)
  // }

  return (
    <div className={classes["basic-search"]}>
      <h1>Rencontre des musiciens près de chez toi</h1>

      <form className={classes["basic-search-form"]}>
        {/* <div className={classes['form-line']}>
                    <label htmlFor='category'>Je cherche : </label>
                    <select id='category' name='category' onChange={handleChange}>
                        <option value="">Que recherchez-vous ?</option>
                        <option value="player">Un.e musicien.ne</option>
                        <option value="band">Un groupe</option>
                    </select>
                </div>  */}
        <FormSelect
          name={"category"}
          ref={searchBandRef}
          label={"Je cherche : "}
          placeholder={"Que recherchez-vous ?"}
          options={searchOptions}
        />

        <div className={classes["form-line"]}>
          <label htmlFor="instrument">Instrument : </label>
          <select id="instrument" name="instrument">
            <option value="">
              Quel instrument {searchBand ? "jouez vous ?" : "cherchez-vous ?"}
            </option>
            <option value="guitar">Guitare</option>
            <option value="bass">Basse</option>
            <option value="drums">Batterie</option>
            <option value="piano">Piano</option>
            <option value="sax">Saxophone</option>
            <option value="violin">Violon</option>
          </select>
        </div>

        <div className={classes["form-line"]}>
          <label htmlFor="location">Lieu : </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Entrez un numéro de département"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default BasicSearch;
