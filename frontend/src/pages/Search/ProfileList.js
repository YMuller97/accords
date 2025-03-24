import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SearchContext } from "../../contexts/SearchContext";
import classes from "./ProfileList.module.css";
import ProfileCard from "./ProfileCard";

const ProfileList = () => {
  // -------------------------------------------------------------- HOOKS -------------------------------------------------------------- //

  const { usersData, filteredUsers: rawFilteredUsers , loggedUserFavs} = useContext(SearchContext);
  const { user, users } = useContext(AuthContext);
  const [sortedUsers, setSortedUsers] = useState([]);
  // const [favsData, setFavsData] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState({});

  const filteredUsers = useMemo(() => {
    return rawFilteredUsers;
  }, [rawFilteredUsers]); 


  // -------------------------------------------------------------- DATAS -------------------------------------------------------------- //
  const allUsers = useMemo(() => {
    if (!user || !user.dataValues) {
      // Si pas d'utilisateur connecté, retourner tous les utilisateurs
      return users;
    }

    return usersData.filter(ListedUser => 
      Number(ListedUser.id_user) !== Number(user.dataValues.id_user)
    );
}, [users, user, usersData]);

  // ------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------- //
  // Fonction pour calculer la distance entre deux points géographiques
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
  };

  // Fonction pour récupérer les coordonnées de tous les utilisateurs
  const fetchUserCoordinates = async () => {
    try {
      const response = await fetch("api/users/coordinates");
      const data = await response.json();

      const coordinatesMap = {};
      // Gère le cas où data est un objet unique ou un tableau
      const coordinatesArray = Array.isArray(data) ? data : [data];

      coordinatesArray.forEach((item) => {
        if (item.postal_code && item.latitude && item.longitude) {
          coordinatesMap[item.postal_code] = {
            latitude: item.latitude,
            longitude: item.longitude,
          };
        }
      });

      setUserCoordinates(coordinatesMap);
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées", error);
    }
  };

  const sortByDistance = useCallback(
    (usersToSort) => {
      if (
        !user ||
        !user.dataValues ||
        !user.dataValues.postal_code_user
      ) {
        console.log(
          "Impossible de trier : utilisateur connecté sans code postal"
        );
        return usersToSort;
      }

      const currentUserCoords =
        userCoordinates[user.dataValues.postal_code_user];
      if (!currentUserCoords) {
        console.log("Coordonnées de l'utilisateur connecté non trouvées");
        return usersToSort;
      }

      return usersToSort
        .map((user) => {
          const userCoords = userCoordinates[user.postal_code_user];
          if (!userCoords) {
            user.distance = Infinity;
          } else {
            user.distance = calculateDistance(
              currentUserCoords.latitude,
              currentUserCoords.longitude,
              userCoords.latitude,
              userCoords.longitude
            );
          }
          return user;
        })
        .sort((a, b) => {
          if (a.distance === Infinity && b.distance === Infinity) return 0;
          if (a.distance === Infinity) return 1;
          if (b.distance === Infinity) return -1;
          return a.distance - b.distance;
        });
    },
    [userCoordinates, user]
  );

  // ------------------------------------------------------------- EFFECTS ------------------------------------------------------------- //
  useEffect(() => {
    fetchUserCoordinates();
  }, []);

  // useEffect(() => {
  //   fetch('api/favs/all')
  //   .then(response => response.json())
  //   .then(datas => {
  //       setFavsData(datas);
  //   })
  //   .catch(error => console.error('Erreur lors du fetch favoris:', error));
  // })

  useEffect(() => {
    let userList;

    if (!user || !user.dataValues) {
      // Si aucun utilisateur connecté, utiliser tous les utilisateurs
      userList = filteredUsers.length > 0 ? filteredUsers : allUsers;
    } else {
      // Si un utilisateur est connecté, filtrer par id_user
      userList = (
        filteredUsers.length > 0 ? filteredUsers : allUsers
      ).filter((ListedUser) => ListedUser.id_user !== user.dataValues.id_user);
    }

    if (
      userList &&
      userList.length > 0 &&
      Object.keys(userCoordinates).length > 0
    ) {
      // Trier uniquement si les coordonnées sont disponibles
      setSortedUsers(sortByDistance(userList));
    } else {
      // Si pas de coordonnées, utiliser simplement la liste filtrée ou complète
      setSortedUsers(userList);
    }
  }, [filteredUsers, allUsers, user, userCoordinates, sortByDistance]);


  // ------------------------------------------------------------- RENDERING ------------------------------------------------------------- //

  // // Creating the card for each user that needs to be displayed
  // // If the filtered users array is populated, use it to render the list of cards, otherwise use the array of all users
  // const Cards = filteredUsers.length > 0 ? filteredUsers.map((u) => {
  //     return(
  //             <ProfileCard key={u.id_user} user = {u}/>
  //     )
  //  }) : users.map((u) => {
  //     return(
  //             <ProfileCard key={u.id_user} user = {u}/>
  //     )
  //  })

  // console.log("Profile list sorted users : ", sortedUsers)

  const Cards = sortedUsers.map((u) => (
    <ProfileCard key={u.id_user} user={u} favState={(loggedUserFavs.find(fav => fav.id_fav === u.id_user) !== undefined)}/>
  ));

  return (
    <div className={classes["search-results"]}>
      <h1>Résultats :</h1>
      <div className={classes["profile-list"]}>{Cards}</div>
    </div>
  );
};

export default ProfileList;
