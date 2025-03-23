import classes from "./FormInput.module.css";

const FormInput = ({type, name, placeholder, val, handleChange}) => {
    if(type === "submit") {
        return (
            <>
                <div className={classes['form-line']}>
                    <input type={type} 
                    name={name} 
                    value={val} 
                    className={classes['input-line']}></input>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={classes['form-line']}>
                    <input type={type} 
                    name={name} 
                    placeholder={placeholder} 
                    value={val} 
                    className={classes['input-line']} 
                    onChange={handleChange}></input>
                </div>
            </>
        )
    } 
}


export default FormInput;
