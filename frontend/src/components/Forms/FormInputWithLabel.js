import classes from "./FormInputWithLabel.module.css";

const FormInputWithLabel = ({type, name, placeholder, val, labelText, handleChange}) => {
  return (
    <>
      <div className={classes['form-line']}>
        <label htmlFor={name}>{labelText}</label>
        <input id={name} type={type} name={name} placeholder={placeholder} value={val} className={classes['input-line']} onChange={handleChange}></input>
      </div>
    </>
  )
}

export default FormInputWithLabel;
