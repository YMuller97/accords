import { createContext, useState, useEffect, useContext } from "react";     
import { AuthContext } from './AuthContext'
export const SearchContext = createContext();


export const SearchProvider = ({children}) => {

    const {user: loggedUser, loggedUserFavs, setLoggedUserFavs} = useContext(AuthContext);

    // -------------------------------------------------------------- HOOKS -------------------------------------------------------------- //
  
    // ------------------------------- States ------------------------------
    // const [favsData, setFavsData] = useState([]);
    // const [loggedUserFavs, setLoggedUserFavs] = useState([])
    const [usersData, setUsersData] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [genres, setGenres] = useState([]);
    const [levels, setLevels] = useState([]);
    const [filters, setFilters] = useState({
        is_favorite: false,
        name_user: '',
        id_instrument: '',
        id_level: '',
        id_genre: '',
        postal_code: '',
        time_by_week: '',
        time_available: '',
        objective: '',
    });
  
  
    // ------------------------------- Effects ------------------------------
    useEffect(() => {
        fetch('http://localhost:3001/users/all')
        .then(response => response.json())
        .then(datas => {
            setUsersData(datas);
        })
        .catch(error => console.error('Erreur lors du fetch users:', error));
    },[]);

    useEffect(() => {
        fetch('http://localhost:3001/instruments/')
        .then(response => response.json())
        .then(datas => {
            setInstruments(datas);
        })
        .catch(error => console.error('Erreur lors du fetch instruments:', error));
    },[]);

    useEffect(() => {
        fetch('http://localhost:3001/genres/')
        .then(response => response.json())
        .then(datas => {
            setGenres(datas);
        })
        .catch(error => console.error('Erreur lors du fetch instruments:', error));
    },[]);

    useEffect(() => {
        fetch('http://localhost:3001/levels/')
        .then(response => response.json())
        .then(datas => {
            setLevels(datas);
        })
        .catch(error => console.error('Erreur lors du fetch instruments:', error));
    },[]);

    // ------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------- //
        
    // Event handling function that will be passed as context and used by the inputs in FilterList component
    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    }
    // Toggle displaying only favorites profiles
    const handleToggleFavFilter = () => {
        // console.log("Checking current fav list when toggling fav filter : ", loggedUserFavs)
        setFilters((prevFilters) => ({
            ...prevFilters,
            is_favorite: !filters.is_favorite
        }))
    }

    //Add a new favorit'e in database
    const addFav = async (userId, favId) => {
        try {
            // Send POST request to add favorite
            const response = await fetch('http://localhost:3001/users/'+ userId + '/favs/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'favId': favId
                })
            });
            if(response.ok){
                //Update local list of favorites
                setLoggedUserFavs((prevLoggedUserFavs) => ([
                ...prevLoggedUserFavs,
                {
                    id_user: userId, 
                    id_fav: favId
                }
        ]))
            } else {
                // Show error message if operation fails
                const errorData = await response.json();
                alert(`Une erreur est survenue lors de l'ajout d'un favori : ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erreur : ', error);
        }

    }

    const deleteFav = async (userId, favId) => {
        //Send DELETE request to remove favorite
        const response = await fetch('http://localhost:3001/users/'+ userId + '/favs/' + favId, {
            method: 'DELETE'
        });
        if(response.ok){
            //Remove favorite from the local list
            const newFavs = loggedUserFavs.filter(fav => {
                return (fav.id_fav !== favId)
            })

            //Update local list of favorites
            setLoggedUserFavs(newFavs);
        } else {
            // Show error message if operation fails
            const errorData = await response.json();
            alert(`Une erreur est survenue lors de la suppression d'un favori : ${errorData.message}`);
        }
    }

    

    // Filter users by applying all filters 
    const filteredUsers = usersData.filter((user) => {
        return (
            (filters.is_favorite === false || !loggedUser || (loggedUser && loggedUserFavs.find(fav => fav.id_fav === user.id_user))) &&
            (filters.name_user.length < 2 || user.name_user.toLowerCase().includes(filters.name_user.toLowerCase())             // Using only one input to filter users by name, first name or alias
                                        || user.first_name_user.toLowerCase().includes(filters.name_user.toLowerCase()) 
                                        || user.alias_user.toLowerCase().includes(filters.name_user.toLowerCase())) && 
            (filters.id_instrument === '' || user.Plays.find(play => play.id_instrument === Number(filters.id_instrument))) &&
            (filters.id_level === '' || user.Plays.find(play => {
                if(filters.id_instrument === '')                                                                   // If no instrument is specified
                    return play.id_level === Number(filters.id_level)                                                       // search for level only
                else                                                                                               // else
                    return ((play.id_level === Number(filters.id_level)) && (play.id_instrument === Number(filters.id_instrument))); // search for level and instrument
            }) ) &&
            (filters.id_genre === '' || user.Prefers.find(prefer => prefer.id_genre === Number(filters.id_genre))) &&
            (filters.postal_code.length < 2 || user.postal_code_user.includes(filters.postal_code)) && 
            (filters.time_by_week === '' || user.time_by_week === filters.time_by_week) && 
            (filters.time_available === '' || user.time_available === filters.time_available)
        )
    })

    // ------------------------------------------------------------- RENDERING ------------------------------------------------------------- //
    return (
        <SearchContext.Provider value={{filters, handleFilterChange, handleToggleFavFilter, loggedUserFavs, setLoggedUserFavs, filteredUsers, usersData, instruments, genres, levels, addFav, deleteFav}}>
            {children}
        </SearchContext.Provider>
    )
}