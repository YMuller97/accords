import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] =useState(false);
  const [ user, setUser ] = useState(null);
  const [ admin, setAdmin ] = useState(null);
  // Data is fetched from the test JSON file, users are fetched from the backend
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);

  // States to manage favorites
  const [favsData, setFavsData] = useState([]);
  const [loggedUserFavs, setLoggedUserFavs] = useState([])

  //Fetch all favorites from the database
  useEffect(() => {
    fetch('api//favs/all')
    .then(response => response.json())
    .then(datas => {
        setFavsData(datas);
    })
    .catch(error => console.error('Erreur lors du fetch favoris:', error));
  },[])

//Create a local list containing the logged user's favorites; will be passed        
useEffect(() => {
    if(user && user.dataValues && favsData) {
        const userFavs = favsData.filter((fav) => fav.id_user === user.dataValues.id_user);
        setLoggedUserFavs(userFavs);
    }
}, [user, favsData])


  const logUser = useCallback((userData) => {
    if (userData) {
      const { userType, ...data } = userData;
      if (userType === 'admin') {
        setAdmin(data);
        setIsAdmin(true);
      } else {
        setUser(data);
        const userFavs = favsData.filter((fav) => fav.id_user === userData.dataValues.id_user);
        setLoggedUserFavs(userFavs);
        setIsAdmin(false);
      }
      setIsLogged(true);
    }
  }, [favsData]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    setIsLogged(false);
    setIsAdmin(false);
    setUser(null);
    setAdmin(null);
  }, []);


  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const storedUserType = localStorage.getItem('userType');
      

  if (token && storedUserType) {
    const endpoint = storedUserType === 'admin' 
      ? 'api//admin/me' 
      : 'api//users/me';
    
    const response = await fetch(endpoint, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const userData = await response.json();
      logUser({ ...userData, userType: storedUserType });
    } else {
      logout();
    }
  }
} catch (error) {
  console.error('Erreur vérification auth:', error);
  logout();
}

  }, [logUser, logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

   // Chargement des données initiales
   useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, dataRes] = await Promise.all([
          fetch("api//users"),
          fetch("/data.json")
        ]);
        

    setUsers(await usersRes.json());
    setDatas(await dataRes.json());
  } catch (error) {
    console.error("Erreur chargement données:", error);
  }
};

loadData();

  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedUserFavs, setLoggedUserFavs, datas, users, logUser, isLogged, setIsLogged, logout, isAdmin, user, admin, currentAuth: isAdmin ? admin : user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
