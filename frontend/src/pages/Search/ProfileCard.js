import classes from './ProfileCard.module.css';
import star_icon_checked from '../../medias/star_icon_checked.png';
import star_icon_unchecked from '../../medias/star_icon_unchecked.png';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import InstrumentBubble from "../../components/InstrumentBubble/InstrumentBubble";
import GenreBubble from "../../components/GenreBubble/GenreBubble";
import { SearchContext } from '../../contexts/SearchContext';
import { AuthContext } from '../../contexts/AuthContext';


const ProfileCard = ({user, favState}) => {


    const { addFav, deleteFav} = useContext(SearchContext);
    const {user: loggedUser} = useContext(AuthContext);
    const [isFav, setIsFav] = useState(favState);
    

    const handleSetFav = () => {
        if(isFav) {
            //Call the function that will delete the favorite from the database
            deleteFav(loggedUser.dataValues.id_user, user.id_user)
        } else {
            //Call the function that will add the favorite from the database
            addFav(loggedUser.dataValues.id_user, user.id_user)
        }
        setIsFav(!isFav);
    }




    return (
        <div className={classes['profile-card']}>
            <Link to={`/profil/${user.id_user}`}>
                <div className={classes['card-picture']}>
                    <img src={`api/${user.picture_user}`}
                    alt="Profile"/>
                </div>
            </Link>
            <div className={classes['card-info']}>
                <div className={classes['card-header']}>
                <Link to={`/profil/${user.id_user}`}>
                    <p className={classes['card-user-name']}>{user.first_name_user} {user.name_user}</p> 
                </Link>
                    <p className={classes['card-user-location']}>{user.postal_code_user} {user.location_user}</p>
                </div>
                <div className={classes['user-instruments']}>

                        {Array.isArray(user.Plays) && user.Plays.map(plays => (
                            <InstrumentBubble key={plays.Instrument.id_instrument} instrument={plays.Instrument.name_instrument} />
                            
                        ))}

                    
                </div>
                <div className={classes['user-music-genres']}>

                    {Array.isArray(user.Prefers) && user.Prefers.map(prefers => (
                            <GenreBubble key={prefers.Genre.id_genre} genre={prefers.Genre.name_genre} />
                        ))}


                </div>
            </div>
            <div className={classes['fav-column']}>
                <div className={classes['fav-check']} onClick={handleSetFav}>
                    <img src={isFav ? star_icon_checked : star_icon_unchecked } alt="favori" />
                </div>
            </div>
        </div>
    );
}
export default ProfileCard;