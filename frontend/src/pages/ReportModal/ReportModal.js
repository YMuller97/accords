import React, { useState } from 'react';
import classes from './ReportModal.module.css';

const ReportModal = ({ isOpen, onClose, onSubmit, targetUserId, targetName }) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      type_report: reportType, 
      description_report: description, 
      id_target_user: targetUserId 
    });
    setReportType('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <h2>Signaler l'utilisateur {targetName}</h2>
        <form onSubmit={handleSubmit}>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="Hate speech">Discours haineux</option>
            <option value="Offensive name">Nom offensant</option>
            <option value="NSFW Content">Contenu NSFW</option>
            <option value="Harassment">Harcèlement</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du signalement"
            required
          />
          <div className={classes.buttonContainer}>
            <button type="submit">Envoyer le signalement</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
