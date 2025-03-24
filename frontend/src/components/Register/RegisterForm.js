import { useState } from 'react';
import classes from './RegisterForm.module.css';
import { Navigate } from 'react-router-dom';

const RegisterForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        mail: '',
        password: '',
        confirmPassword: '',
        checkedCondition: false
    });

    // Handle changes in form inputs
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevState => ({
            // Add to prevState the name of the retrieved information and its checked/unchecked value if it's a checkbox, otherwise the associated value
            ...prevState, [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas!");
            return;
        }

        try {
            // Send POST request to register user
            const response = await fetch('api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name_user: formData.name,
                    first_name_user: formData.firstName,
                    email_user: formData.mail,
                    password_tohash: formData.password
                })
            });

            if(response.ok){
                // Redirect to home page and show success message
                <Navigate to="/" replace />
                alert("Inscription réussie! Veuillez vous connecter.")
            } else {
                // Show error message if registration fails
                const errorData = await response.json();
                alert(`Une erreur est survenue lors de l'inscription : ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erreur : ', error);
        }
    };

    return (
        <>
        <div className={classes['register-container']}>
                <h2>Créer un compte</h2>
                <p>C'est simple et rapide</p>
                <hr></hr>
                <form className={classes['register-form']} onSubmit={handleSubmit}>
                    <div className={classes['form-line']}>
                        <input type="text" name='name' placeholder='Nom' value={formData.name} onChange={handleChange}></input>
                    </div>
                    <div className={classes['form-line']}>
                        <input type="text" name='firstName' placeholder='Prénom' value={formData.firstName} onChange={handleChange}></input>
                    </div>
                    <div className={classes['form-line']}>
                        <input type="email" name='mail' placeholder='Adresse e-mail' value={formData.mail} onChange={handleChange}></input>
                    </div>
                    <div className={classes['password-line']}>
                        <div className={classes['form-line']}>
                            <input type="password" name='password' placeholder='Mot de passe' value={formData.password} onChange={handleChange}></input>
                        </div>
                        <div className={classes['form-line']}>
                            <input type="password" name='confirmPassword' placeholder='Confirmez le mot de passe' value={formData.confirmPassword} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className={classes['check-line']}>
                        <input type="checkbox" name='checkAcceptCondition' checked={formData.checkedCondition} onChange={handleChange}></input>
                        <label htmlFor='checkAcceptCondition'>En cliquant sur S'inscrire, vous acceptez nos <a href='#'>Conditions Générales d'utilisation</a>. Découvrez comment nous recueillons, utilisons et partageons vos données en lisant notre Politique de confidentialité et comment nous utilisons les cookies et autres technologies similaires.</label>
                    </div>
                    <div className={classes['form-line']}>
                        <input type='submit' value="S'inscrire" className={classes['btn-submit']}></input>
                    </div>   
                </form>
                <div className={classes['redirect']}>
                    <button className={classes['redirect-btn']}>J'ai déjà un compte</button>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;