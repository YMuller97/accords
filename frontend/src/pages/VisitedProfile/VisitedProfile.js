import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./VisitedProfile.module.css";
import InstrumentCard from "../../components/InstrumentCard/InstrumentCard";
import InstrumentBubble from "../../components/InstrumentBubble/InstrumentBubble";
import GenreBubble from "../../components/GenreBubble/GenreBubble";
import { AuthContext } from "../../contexts/AuthContext";
import ReportModal from "../ReportModal/ReportModal";

const VisitedProfile = ({userId}) => {

  // ------------------------------------------------------------- HOOKS ------------------------------------------------------------- //
  const [visitedUser, setUser] =  useState(undefined);
  const [instruments, setInstruments] =  useState(undefined);
  const [genres, setGenres] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { user, isAdmin, admin } = useContext(AuthContext);
  const navigate = useNavigate();

  // ------------------------------------------------------------- EFFECTS ------------------------------------------------------------- //
  // Fetch visitedUser data, instruments, and genres when the component mounts or when userId changes
  useEffect(() => {
    // Fetch visitedUser details by userId
    fetch('api/users/'+ userId)
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(error => console.error('Erreur:', error));

    // Fetch instruments played by the visitedUser
    fetch('api/users/'+ userId+'/instruments')
      .then(response => response.json())
      .then(data => {
          setInstruments(data);
      })
      .catch(error => console.error('Erreur:', error));

    // Fetch preferred genres of the visitedUser
    fetch('api/users/'+ userId+'/genres')
      .then(response => response.json())
      .then(data => {
          setGenres(data);
      })
      .catch(error => console.error('Erreur:', error));

  },[userId]);

  // ------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------- //
  // Function to handle the creation of a new conversation with the visited visitedUser
  const handleCreateConversation = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      
      // Determine the current user's ID (admin or regular user)
      const currentUserId = isAdmin ? admin.dataValues.id_admin : user.dataValues.id_user;
      const currentUserIdInt = parseInt(currentUserId, 10);
      const visitedUserIdInt = parseInt(visitedUser.id_user, 10);
      
      // Check if the current user is an admin
      if (isAdmin) {
        // Admin-specific conversation creation logic
        const checkResponse = await fetch('api/conv/check-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            adminId: currentUserId,
            userId: visitedUserIdInt
          })
        });
        
        const checkData = await checkResponse.json();
        if (checkData.exists) {
          // Navigate to the existing conversation
          navigate(`/msg?selected=${checkData.id_conv}`);
        } else {
          // Create a new admin-to-user conversation
          const response = await fetch('api/conv/admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              content_conv: {
                messages: [],
                participants: [
                  { role: 'admin', id_admin: currentUserId },
                  { role: 'user', id_user: visitedUserIdInt }
                ]
              }
            })
          });
          
          if (response.ok) {
            const newConv = await response.json();
            navigate(`/msg?selected=${newConv.id_conv}`);
          } else {
            console.error("Erreur lors de la création de la conversation admin");
          }
        }
      } else {
        // Regular user conversation creation logic (existing code)
        const checkResponse = await fetch('api/conv/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            userId1: currentUserIdInt,
            userId2: visitedUserIdInt
          })
        });
        
        const checkData = await checkResponse.json();
        if (checkData.exists) {
          // Navigate to the existing conversation
          navigate(`/msg?selected=${checkData.id_conv}`);
        } else {
          // Create a new user-to-user conversation
          const response = await fetch('api/conv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              content_conv: {
                messages: [],
                participants: [
                  { role: 'initiator', id_user: currentUserIdInt },
                  { role: 'responder', id_user: visitedUserIdInt }
                ]
              }
            })
          });
          
          if (response.ok) {
            const newConv = await response.json();
            navigate(`/msg?selected=${newConv.id_conv}`);
          } else {
            console.error("Erreur lors de la création de la conversation");
          }
        }
      }
    } catch (error) {
      console.error("Erreur : ", error);
    }
  };

  const handleSubmitReport = async (reportData) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      const response = await fetch('api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...reportData,
          id_source_user: user.dataValues.id_user
        })
      });
      if (response.ok) {
        
        console.log("Signalement envoyé avec succès");
      } else {
        console.error("Erreur lors de l'envoi du signalement");
      }
    } catch (error) {
      console.error("Erreur : ", error);
    }
  };

  // Display a loading message while data is being fetched
  if (!visitedUser || !instruments || genres=== undefined ) {
    return <div>Chargement...</div>;
  }
  
  // ------------------------------------------------------------- RENDERING ------------------------------------------------------------- //
  return (
    <div className={classes["visited-profile"]}>
      <div className={classes["profile"]}>
        <div className={classes["profile-picture"]}>
          <img src={`api/${visitedUser.picture_user}`} alt="" />
        </div>
        {/* Button to start a conversation */}
        {user && (<div><button 
            className={classes['contact-button']} 
            onClick={handleCreateConversation}
        >
            Contacter
        </button>
        <button 
          className={classes['contact-button']} 
          onClick={() => setIsReportModalOpen(true)}
        >
          Signaler
        </button></div>)}
        <div className={classes["profile-content"]}>
          <h2>
            {visitedUser.first_name_user +" "+ visitedUser.name_user}
          </h2>
          <h3>
            {visitedUser.alias_user}
          </h3>
          <div className={classes["age-location"]}>
            <p> {new Date().getFullYear() - visitedUser.birth_date_user} ans</p>
            <p>{visitedUser.location_user} </p>
          </div>

          <div className={classes["instrument-profile"]}>
          {instruments.map( instrument => {
            return <InstrumentBubble key={instrument.id_instrument} instrument={instrument.Instrument.name_instrument}/>
          })}
          </div>
          <div className={classes["genre-container"]}>
          {Array.isArray(genres) && genres.map(genre => {
            return <GenreBubble key={genre.id_genre} genre={genre.Genre.name_genre}/>
          })}
          </div>
        </div>
      </div>
      <div className={classes["instrument-container"]}>
        <div className={classes["instrument-column"]}>
          {instruments.map( instrument => {
            return <InstrumentCard key={instrument.id_instrument} instrument={instrument.Instrument.name_instrument} level={instrument.Level.label_level}/>
          })}
          
        </div>
      </div>
      <div className={classes["objectifs-container"]}>
        <div className={classes["objectifs-column"]}>
          <p>Objectifs : </p>
          <p>Temps consacré par semaine:</p>
          <p>Temps souhaité en groupe:</p>
        </div>
        <div className={classes["choice-column"]}>
          <p>Loisirs </p>
          <p>4h/semaine</p>
          <p>2h/semaine</p>
        </div>
      </div>
      <div className={classes["description-container"]}>
        <p>Description</p>
        <p>
          {visitedUser.description_user}
        </p>
      </div>
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleSubmitReport}
        targetUserId={visitedUser.id_user}
        targetName={`${visitedUser.first_name_user} ${visitedUser.name_user}`}
      />
    </div>
  );
};

export default VisitedProfile;