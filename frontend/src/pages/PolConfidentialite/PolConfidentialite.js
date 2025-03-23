import classes from './PolConfidentialite.module.css'

const PolConfidentialite = () => {
  return (
    <div className={classes['politique-confidentialite']}>
      <h1>Politique de Confidentialité</h1>

      <h2>1. Collecte des données personnelles</h2>
      <p>Nous collectons les données personnelles suivantes lors de votre inscription et utilisation du site Accords :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Pseudo (facultatif)</li>
        <li>Photo de profil (facultative)</li>
        <li>Adresse e-mail</li>
        <li>Mot de passe (stocké de manière cryptée)</li>
        <li>Description du profil</li>
        <li>Données de connexion et d'utilisation du site</li>
      </ul>

      <h2>2. Utilisation des données</h2>
      <p>Vos données personnelles sont utilisées pour :</p>
      <ul>
        <li>Créer et gérer votre compte utilisateur</li>
        <li>Permettre la mise en relation entre musiciens</li>
        <li>Améliorer nos services et l'expérience utilisateur</li>
        <li>Vous envoyer des communications relatives au service</li>
      </ul>

      <h2>3. Partage des données</h2>
      <p>Nous ne partageons pas vos données personnelles avec des tiers, sauf :</p>
      <ul>
        <li>Avec votre consentement explicite</li>
        <li>Pour respecter une obligation légale</li>
        <li>Pour protéger nos droits, notre propriété ou la sécurité de nos utilisateurs</li>
      </ul>

      <h2>4. Sécurité des données</h2>
      <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.</p>

      <h2>5. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
      <ul>
        <li>Droit d'accès</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité des données</li>
        <li>Droit d'opposition</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à l'adresse : support@accords-app.com.</p>

      <h2>6. Modifications de la politique de confidentialité</h2>
      <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.</p>

      <h2>7. Contact</h2>
      <p>Pour toute question concernant notre politique de confidentialité, veuillez nous contacter à support@accords-app.com.</p>
    </div>
  );
};

export default PolConfidentialite; 