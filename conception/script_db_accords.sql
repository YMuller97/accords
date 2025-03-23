-- Suppression de la base de données si elle existe déjà
DROP DATABASE IF EXISTS accords;

-- ------------------------------------------------------------------------
-- -------------------------CREATION DE LA BASE---------------------------
-- ------------------------------------------------------------------------

CREATE DATABASE accords
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_FR.UTF-8'
    LC_CTYPE = 'fr_FR.UTF-8'
    TEMPLATE = template0;

-- Connexion à la base de données
\c accords

-- ------------------------------------------------------------------------
-- -------------------------CREATION DES TABLES---------------------------
-- ------------------------------------------------------------------------

-- -----------------------------------------------------------------------
-- Structure de la table users
--  

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name_user VARCHAR(30) NOT NULL,
    first_name_user VARCHAR(30) NOT NULL,
    alias_user VARCHAR(30) NOT NULL,
    birth_date_user INTEGER,
    email_user VARCHAR(30) UNIQUE NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    postal_code_user VARCHAR(10),
    location_user VARCHAR(50)
);

-- -----------------------------------------------------------------------
-- Structure de la table instruments
--  
CREATE TABLE instruments (
    id_instrument SERIAL PRIMARY KEY,
    name_instrument VARCHAR(30) NOT NULL
);

-- -----------------------------------------------------------------------
-- Structure de la table levels
--  
CREATE TABLE levels (
   id_level SERIAL PRIMARY KEY,
   label_level VARCHAR(15)
);

-- -----------------------------------------------------------------------
-- Structure de la table musical_genres
--  
CREATE TABLE musical_genres (
    id_genre SERIAL PRIMARY KEY,
    name_genre VARCHAR(30) NOT NULL
);

-- -----------------------------------------------------------------------
-- Structure de la table administrators
--  
CREATE TABLE administrators (
    id_admin SERIAL PRIMARY KEY,
    name_admin VARCHAR(30),
    email_admin VARCHAR(30) UNIQUE NOT NULL,
    password_admin VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------------------------
-- Structure de la table user_conversations
--  
CREATE TABLE user_conversations (
   id_conversation SERIAL PRIMARY KEY,
   id_recipient VARCHAR(50),
   id_user INTEGER NOT NULL,
   FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- -----------------------------------------------------------------------
-- Structure de la table admin_user_conversations
--  
CREATE TABLE admin_user_conversations (
   id_conversation_admin SERIAL PRIMARY KEY,
   id_user INTEGER NOT NULL,
   id_admin INTEGER NOT NULL,
   FOREIGN KEY (id_user) REFERENCES users(id_user),
   FOREIGN KEY (id_admin) REFERENCES administrators(id_admin)
);

-- -----------------------------------------------------------------------
-- Structure de la table messages
--  
CREATE TABLE messages (
   id_message SERIAL PRIMARY KEY,
   text_message VARCHAR(500),
   date_sent TIMESTAMP,
   is_read BOOLEAN,
   id_conversation INTEGER,
   id_conversation_admin INTEGER,
   id_message_parent INTEGER,
   CHECK (
      (id_conversation IS NOT NULL AND id_conversation_admin IS NULL) OR
      (id_conversation IS NULL AND id_conversation_admin IS NOT NULL)
   ),
   FOREIGN KEY (id_conversation) REFERENCES user_conversations(id_conversation),
   FOREIGN KEY (id_conversation_admin) REFERENCES admin_user_conversations(id_conversation_admin),
   FOREIGN KEY (id_message_parent) REFERENCES messages(id_message)
);
-- -----------------------------------------------------------------------
-- Structure de la table reports
--  
CREATE TABLE reports (
    id_report SERIAL PRIMARY KEY,
    type_report VARCHAR(20) CHECK (type_report IN ('Hate speech', 'Offensive name', 'NSFW Content', 'Harassment')) NOT NULL,
    description_report VARCHAR(500),
    is_processed BOOLEAN,
    id_target_user INTEGER NOT NULL,
    id_source_user INTEGER NOT NULL,
    FOREIGN KEY (id_target_user) REFERENCES users(id_user),
    FOREIGN KEY (id_source_user) REFERENCES users(id_user)
);

-- -----------------------------------------------------------------------
-- Structure de la table prefer
--  
CREATE TABLE prefer (
   id_user INTEGER,
   id_genre INTEGER,
   PRIMARY KEY (id_user, id_genre),
   FOREIGN KEY (id_user) REFERENCES users(id_user),
   FOREIGN KEY (id_genre) REFERENCES musical_genres(id_genre)
);

-- -----------------------------------------------------------------------
-- Structure de la table play
--  
CREATE TABLE play (
   id_user INTEGER,
   id_level INTEGER,
   id_instrument INTEGER,
   PRIMARY KEY (id_user, id_level, id_instrument),
   FOREIGN KEY (id_user) REFERENCES users(id_user),
   FOREIGN KEY (id_level) REFERENCES levels(id_level),
   FOREIGN KEY (id_instrument) REFERENCES instruments(id_instrument)
);

-- -----------------------------------------------------------------------
-- Structure de la table is_favorite
--  
CREATE TABLE is_favorite(
   id_user INTEGER,
   id_fav INTEGER,
   PRIMARY KEY(id_user, id_fav),
   FOREIGN KEY(id_user) REFERENCES users(id_user),
   FOREIGN KEY(id_fav) REFERENCES users(id_user)
);
