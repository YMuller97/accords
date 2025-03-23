import React, { useEffect, useState } from 'react';
import classes from './ReportDetails.module.css'; // Créez ce fichier CSS
import { Link } from 'react-router-dom';

const ReportDetails = ({ report, onResolve }) => {
  // -------------------------------------------------------------- HOOKS -------------------------------------------------------------- //

  const [sourceUser, setSourceUser] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [isResolved, setIsResolved] = useState(report.is_processed);
  
  // ------------------------------------------------------------- EFFECTS ------------------------------------------------------------- //
  
  useEffect(() => {
    const getUserData = async () => {
      const sourceUserData = await getUserById(report.id_source_user)
      setSourceUser(sourceUserData)
      const targetUserData = await getUserById(report.id_target_user)
      setTargetUser(targetUserData)
    }
    getUserData();
  }, [report]);

  useEffect(() => {
    setIsResolved(report.is_processed);
  }, [report]);
  
  // ------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------- //
  
  const getUserById = async (userId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token");
    }
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  }

  if (!report) {
    return <p>Sélectionnez un signalement pour voir les détails.</p>;
  }

  const handleResolve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3001/reports/resolve/${report.id_report}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({is_processed: true})
      });
      if (!response.ok) {
        throw new Error('Echec de la résolution du signalement');
      }
      setIsResolved(true); // Mettre à jour l'état local
      onResolve(report.id_report);
    } catch (error) {
      console.error("Erreur : ", error);
    }
  };
  
  // ------------------------------------------------------------- RENDERING ------------------------------------------------------------- //

  return (
    <div className={classes.reportDetails}>
      <h2>Détails du signalement #{report.id_report}</h2>
      <p><strong>Type:</strong> {report.type_report}</p>
      <p><strong>Description:</strong> {report.description_report}</p>
      <div className={classes.userInfoSection}>
        <h3>Utilisateur Source</h3>
        {sourceUser ? (
          <div className={classes.userCard}>
            <Link to={`/profil/${sourceUser.id_user}`}>
              <p><strong>Nom:</strong> {sourceUser.name_user} {sourceUser.first_name_user}</p>
            </Link>
            <p><strong>Email:</strong> <a href={`mailto:${sourceUser.email_user}`}>{sourceUser.email_user}</a></p>
            {/* Add more user fields as needed */}
          </div>
        ) : (
          <p>Aucune information disponible pour l'utilisateur source.</p>
        )}
      </div>
      
      <div className={classes.userInfoSection}>
        <h3>Utilisateur Signalé</h3>
        {targetUser ? (
          <div className={classes.userCard}>
            <Link to={`/profil/${targetUser.id_user}`}>
              <p><strong>Nom:</strong> {targetUser.name_user} {targetUser.first_name_user}</p>
            </Link>
            <p><strong>Email: </strong> <a href={`mailto:${targetUser.email_user}`}> {targetUser.email_user}</a></p>
          </div>
        ) : (
          <p>Aucune information disponible pour l'utilisateur cible.</p>
        )}
      </div>
      <div className={classes.statusContainer}>
        <p><strong>Résolu:</strong> {isResolved ? 'Oui' : 'Non'}</p>
        {!isResolved && (
          <button 
            onClick={handleResolve}
            className={classes.resolveButton}
          >
            Marquer comme résolu
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;