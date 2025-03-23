import classes from "./FormInput.module.css";

const FormSelect = ({name, options, label, placeholder, handleChange, val}) => {
  const Options = options.map((o, index) => {
    let opt = Object.values(o);
    return (
      <option key={index} value={opt[0]}>{opt[1]}</option>
    )
  });

  return (
    <>
      <div className={classes['form-line']}>
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} className={classes['input-line']} onChange={handleChange} value={val}>
          <option value="">{placeholder}</option>
          {Options}
        </select>
      </div>
    </>
  )  
}

export default FormSelect;
