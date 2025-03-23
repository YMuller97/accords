import logo from '../../medias/accords_logo.png';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';

const Header = () => {
    return (
        <>
            <header>
                <img src={logo} alt='App logo' className={classes['app-logo']}></img>
                <Navbar/>
            </header>
        </>
    );
}

export default Header;

