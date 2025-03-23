import classes from './PolCookies.module.css';

const PolCookies = () => {
  return (
    <div className={classes['politique-cookies']}>
      <h1>Politique des Cookies</h1>

      <h2>1. Définition des cookies</h2>
      <p>Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site.</p>

      <h2>2. Types de cookies utilisés</h2>
      <p>Nous utilisons les types de cookies suivants :</p>
      <ul>
        <li>Cookies essentiels : nécessaires au fonctionnement du site</li>
        <li>Cookies de performance : pour analyser l'utilisation du site et améliorer nos services</li>
        <li>Cookies de fonctionnalité : pour mémoriser vos préférences</li>
        <li>Cookies de ciblage : pour vous proposer des contenus personnalisés (le cas échéant)</li>
      </ul>

      <h2>3. Utilisation des cookies</h2>
      <p>Nous utilisons les cookies pour :</p>
      <ul>
        <li>Améliorer votre expérience de navigation</li>
        <li>Analyser l'utilisation de notre site</li>
        <li>Personnaliser le contenu et les publicités</li>
      </ul>

      <h2>4. Gestion des cookies</h2>
      <p>Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Vous pouvez choisir de bloquer ou de supprimer les cookies, mais cela pourrait affecter certaines fonctionnalités du site.</p>

      <h2>5. Durée de conservation des cookies</h2>
      <p>Les cookies essentiels sont conservés pendant la durée de votre session. Les autres cookies peuvent être conservés jusqu'à 13 mois.</p>

      <h2>6. Consentement</h2>
      <p>En utilisant notre site, vous consentez à l'utilisation des cookies conformément à cette politique. Vous pouvez retirer votre consentement à tout moment en modifiant vos paramètres de cookies.</p>

      <h2>7. Mise à jour de la politique</h2>
      <p>Nous nous réservons le droit de modifier cette politique des cookies à tout moment. Toute modification sera publiée sur cette page.</p>

      <h2>8. Contact</h2>
      <p>Pour toute question concernant notre politique des cookies, veuillez nous contacter à support@accords-app.com.</p>
    </div>
  );
};

export default PolCookies;