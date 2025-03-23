---
title: Accords - Projet CDA 
author: Alexandre TEIXEIRA, Youri MULLER, Aldrit KULETA, Omrane SEBGUI, Irina DASTUGUE
header: ${title}
footer: ${author} - Page ${pageNo} / ${totalPages}

---

------

Création : 10/12/2024 
Modification : 10/12/2024

------



# <center>Note de Cadrage</center>

## <center>"Accords" : application de rencontre entre musiciens.  </center>



## Définition du projet : 

Projet académique ayant pour but de mettre en pratique nos compétences acquises  pendant la formation CDA en développant une application web complète utilisant React pour le frontend et Express pour le backend.

L'application permettra à des musiciens de trouver d'autres personnes partageant leur passion afin de jouer à plusieurs ou monter un groupe. 

Elle comportera des profils utilisateurs et administrateurs avec les fonctionnalités suivantes :

**Utilisateurs :**

-  Affichage français/anglais.

-  Inscription / connexion.

-  Création, personnalisation,  suppression, visualisation d'un profil.

-  Recherche de profils de musiciens à l'aide de filtres (instruments joués,  localisation, style, niveau, etc. ).

-  Sauvegarde de profils en favoris.

-  Mise en relation via une messagerie.

-  Possibilité de signaler un profil .

**Administrateurs :**

- Consulter l'application comme un utilisateur.
- Consulter les signalements.
- Bannir un utilisateur.
- Consulter rapports de bugs



<div style="page-break-after:always"></div>



## Contraintes techniques :

Le frontend sera organisé en composants réutilisables et développé avec React. L'interface doit être responsive et interactive, avec des mises à jour en temps réel sans rechargement de la page.

Le backend utilisera Express et fournira une API REST pour permettre la communication entre le frontend et le backend, facilitant l'échange de données.

La base de données utilisera PostgreSQL ou MongoDB.

Les sessions seront gérées avec des JSON Web Tokens pour la sécurité et l'authentification.

La gestion de version se fera avec Git, facilitant ainsi le travail en collaboration

L'application devra être mise en ligne.



