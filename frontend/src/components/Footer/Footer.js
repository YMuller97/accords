import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerLinks}>
          <a href="/conditions-generales" className={classes.footerLink}>
            Conditions Générales d'Utilisation
          </a>
          <a
            href="/politique-de-confidentialite"
            className={classes.footerLink}
          >
            Politique de Confidentialité
          </a>
          <a href="/politique-des-cookies" className={classes.footerLink}>
            Politique des Cookies
          </a>
        </div>

        <div className={classes.footerContact}>
          <p>
            Contactez-nous :{" "}
            <a href="mailto:support@accords-app.com">support@accords-app.com</a>
          </p>
          <p>© 2025 Accords. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
