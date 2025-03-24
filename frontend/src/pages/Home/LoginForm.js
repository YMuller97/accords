import { useContext, useState } from 'react';
import classes from './LoginForm.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import FormInput from '../../components/Forms/FormInput';
import { NavLink } from "react-router-dom";
// DOMPurify is a sanitizer for HTML, MathML and SVG
import DOMPurify from 'dompurify';

const LoginForm = () => {
    //  States to manage the email input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [formError, setFormError] = useState('');

    // Regular expression to test the email address:
    // the first ^ indicates the start of the string,  
    // [^] specifies forbidden characters, 
    // \s designates spaces, 
    // the final i indicates that we don't take into account upper and lower case
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    //  Extracting data from the context
    const {logUser, setIsLogged} = useContext(AuthContext)
    
    // Function to fetch the authentification
    const authenticateUser = async (sanitizedEmail, sanitizedPassword) => {
        try {
            // First try to authenticate as regular user
            const userResponse = await fetch('api/users/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_user: sanitizedEmail,
                    password_user: sanitizedPassword
                })
            });
            
            // If user authentication successful
            if (userResponse.ok) {
                const userData = await userResponse.json();
                return {
                    token: userData.token,
                    userType: 'user'
                };
            }
            
            // If user authentication failed, try admin authentication
            const adminResponse = await fetch('api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_admin: sanitizedEmail,
                    password_admin: sanitizedPassword
                })
            });
            
            // If admin authentication successful
            if (adminResponse.ok) {
                const adminData = await adminResponse.json();
                return {
                    token: adminData.token,
                    userType: 'admin'
                };
            }
            
            // If both authentications failed
            return null;
        } catch (erreur) {
            console.error("echec d'authentification: ", erreur)
            return null
        }
    }
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailTouched(true);
        setPasswordTouched(true);

        if (!email || !password) {
            setFormError('Tous les champs doivent être renseignés!');
            return;
        }

        if (!isValidEmail.test(email)) {
            setFormError('Format d\'email invalide!');
            return;
        }

        // If the entered data matches a user in the database, store it
        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);  

        // Authenticate user
        const authResult = await authenticateUser(sanitizedEmail, sanitizedPassword);
        
        if (authResult) {
            const { token, userType } = authResult;
            // Store the token in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userType', userType);
            
            // Update the authentication context
            setIsLogged(true);
            
            // Retrieve user information
            const userInfo = await fetchUserProfile(token, userType);
            if (userInfo) {
                logUser({...userInfo, userType});
            }
        } else {
            setFormError("Authentification échouée, veuillez vérifier vos identifiants.");
        }
    }
    
    // Function to fetch user profile
    const fetchUserProfile = async (token, userType) => {
        try {
            const endpoint = userType === 'admin' ? 'api/admin/me' : 'api/users/me'
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Réponse d'erreur:", errorText);
                throw new Error("Echec lors de la récupération du profil")
            }
            return await response.json()
        } catch (erreur) {
            console.error('Erreur lors de la recherche du profil: ', erreur)
            return null
        }
    }

    // Checks the email and the password inputs as soon as the input is selected
    const handleEmailFocus = () => {
        setEmailTouched(true);
    };
    
    const handlePasswordFocus = () => {
        setPasswordTouched(true);
    };

    return (
        <div className={classes['login-container']}>
            <form className={classes['login-form']} onSubmit={handleSubmit}>
                <FormInput 
                        type={"email"} 
                        name={"mail"} 
                        placeholder={"Adresse e-mail"} 
                        handleChange={(e) => setEmail(e.target.value)}
                        onFocus={handleEmailFocus}
                        val={email}
                        className={`${classes['input-line']} ${emailTouched && (!email || !isValidEmail.test(email)) ? classes.error : ''}`}
                />
                <FormInput 
                    type="password" 
                    name="password" 
                    placeholder="Mot de passe" 
                    val={password} 
                    handleChange={(e) => setPassword(e.target.value)} 
                    onFocus={handlePasswordFocus}
                    className={`${classes['input-line']} ${passwordTouched && !password ? classes.error : ''}`}
                />
                {formError && <span className={`${classes.error} ${classes.errorMessage}`}>{formError}</span>}
                <FormInput type={"submit"} name={"loginButton"} placeholder={""} val="Se connecter" className={classes['btn-submit']}/>  
            </form>

            <div className={classes['pass-link']}>Mot de passe oublié ?</div>
            <hr></hr>
            <span>Pas encore inscrits ?</span>
            <br></br>
            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                <span className={classes['btn-connect']}>Créer un compte</span>
            </NavLink>
        </div>
    );
}

export default LoginForm;