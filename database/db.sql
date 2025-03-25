-- Suppression de la base de données si elle existe déjà
-- DROP DATABASE IF EXISTS accords;

-- -- ------------------------------------------------------------------------
-- -- -------------------------CREATION DE LA BASE---------------------------
-- -- ------------------------------------------------------------------------

-- CREATE DATABASE accords
--     WITH 
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'fr_FR.UTF-8'
--     LC_CTYPE = 'fr_FR.UTF-8'
--     TEMPLATE = template0;

-- -- Connexion à la base de données
-- \c accords

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
    location_user VARCHAR(50),
    time_by_week INTEGER,
    time_available INTEGER,
    description_user VARCHAR(500),
    picture_user VARCHAR(255)
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
   label_level VARCHAR(30)
);

-- -----------------------------------------------------------------------
-- Structure de la table musical_genres
--  
CREATE TABLE musical_genres (
    id_genre SERIAL PRIMARY KEY,
    name_genre VARCHAR(30) NOT NULL,
    id_parent INTEGER,
    FOREIGN KEY (id_parent) REFERENCES musical_genres(id_genre)
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
CREATE TABLE conversations (
   id_conv SERIAL PRIMARY KEY,
   content_conv jsonb NOT NULL
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

-- -----------------------------------------------------------------------
-- Structure de la table locations
--  
CREATE TABLE locations (
    id_location SERIAL,
    postal_code VARCHAR(10) NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
   PRIMARY KEY (id_location)
);



-- Insertion des instruments
INSERT INTO instruments (id_instrument, name_instrument) VALUES
('1', 'guitare'),
('2', 'piano'),
('3', 'violon'),
('4', 'batterie'),
('5', 'saxophone'),
('6', 'trompette'),
('7', 'triangle'),
('8', 'clarinette'),
('9', 'violoncelle'),
('10', 'harpe'),
('11', 'accordéon'),
('12', 'contrebasse'),
('13', 'xylophone'),
('14', 'trombone'),
('15', 'banjoline');

-- Insertion des niveaux
INSERT INTO levels (id_level, label_level) VALUES
('1', 'débutant'),
('2', 'pratique occasionnelle'),
('3', 'intermédiaire'),
('4', 'avancé'),
('5', 'expert');

-- Insertion des utilisateurs
INSERT INTO users (id_user, name_user, first_name_user, alias_user, birth_date_user, email_user, password_user, postal_code_user, location_user, description_user, picture_user) VALUES
-- pass 1234biere
('1', 'Robert', 'Bob', 'L''âne', '1974', 'bob.dit.lane@wanadoo.fr', '$2b$10$L0uU5zf3Vz1CYRtWDQKxy..7bBsSrYkknXSrNH/bRyeNmHVO6DrIK', '88230', 'Xonrardmer', 'Je joue du triangle le vendredi soir au bistrot avec les copains, j''ai le rythme dans la peau. J''aimerais pratiquer avec d''autres gens.', 'uploads/1742373840917-Bob Robert.png'),
-- pass piano2023
('2', 'Dupont', 'Marie', 'Mélodie', '1988', 'marie.melodie@gmail.com', '$2b$10$qktUIAsdVyAJ8l3EQ/sDqOK7j8g0YNYeoCSEMb.8Gv.SQM3c96wee', '75011', 'Paris', 'Pianiste passionnée cherchant à former un groupe de jazz.', 'uploads/1742373891419-Marie Dupont.png'),
-- pass guitar123
('3', 'Martin', 'Luc', 'Rockstar', '1995', 'luc.rockstar@hotmail.com', '$2b$10$kJQAj0bt8kFeg.66Vui4ZeadsUQ9vbhYewftRpTZcbF1cXVysO5zS', '69001', 'Lyon', 'Guitariste débutant cherchant des personnes pour jouer du rock.', 'uploads/1742373962211-Luc Martin.png'),
-- pass saxo4ever
('4', 'Leroy', 'Sophie', 'Sax Girl', '1982', 'sophie.sax@yahoo.fr', '$2b$10$j7PNo7E.kZGxzvq3ctXKMOcR9P0awn44ryrNjOgfgITHptVLqcb5C', '33000', 'Bordeaux', 'Saxophoniste de niveau intermédiaire, intéressée par le jazz et le funk.', 'uploads/1742374024187-Sophie Leroy.png'),
-- pass batterie90
('5', 'Petit', 'Thomas', 'Drum Master', '1990', 'thomas.drums@gmail.com', '$2b$10$OtaB/WdSpi1fRrOA4rMlE.u4nkeXCnCvxOSYdh4nnefpziUCru.ei', '59000', 'Lille', 'Batteur expérimenté cherchant à intégrer un groupe de metal.', 'uploads/1742374048951-Thomas Petit.png'),
-- pass violon85
('6', 'Dubois', 'Claire', 'Violoniste', '1985', 'claire.violon@orange.fr', '$2b$10$3K2JPggippsfERBf2tJjAeEVjGbkn0g7q4yYOsJuYRps.EBb1Zcre', '31000', 'Toulouse', 'Violoniste classique ouverte à d''autres styles musicaux.', 'uploads/1742374072972-Claire Dubois.png'),
-- pass trumpet78
('7', 'Moreau', 'Pierre', 'Trompettiste', '2002', 'pierre.trompette@gmail.com', '$2b$10$X.cCiTE/PJ55.09nRBTm7O4EqY8BsEDU6k3rVDz7TpOL9dBD/m/jW', '44000', 'Nantes', 'Trompettiste de jazz cherchant à former un big band.', 'uploads/1742374094650-Pierre Moreau.png'),
-- pass accordion92
('8', 'Lefebvre', 'Julie', 'Accordéoniste', '1992', 'julie.accordeon@yahoo.com', '$2b$10$Tivg6WmzWSRjYxXwB.nyn.Q9jRPcJKmlRfzlcLD39g1k45Lzrdvgi', '67000', 'Strasbourg', 'Accordéoniste passionnée de musique traditionnelle.', 'uploads/1742374113021-Julie Lefebvre.png'),
-- pass bass1987
('9', 'Garcia', 'Antoine', 'Contrebassiste', '1987', 'antoine.contrebasse@hotmail.fr', '$2b$10$5L2EE2gWi41fVWFE2XYSA.jrXA8Qn1qRDgXeXp0K94OSbLe2Vaq2C', '13001', 'Marseille', 'Contrebassiste de jazz cherchant des musiciens pour des jam sessions.', 'uploads/1742374134054-Antoine Garcia.png'),
-- pass harpe2023
('10', 'Roux', 'Émilie', 'Harpiste', '1983', 'emilie.harpe@gmail.com', '$2b$10$mCzcVyfzqD4fcRmYeraJAer4jk21rv1xP/AWTOHINl6FeJgUXiPbW', '35000', 'Rennes', 'Harpiste classique intéressée par la musique celtique.', 'uploads/1742374159636-Emilmie Roux.png'),
-- pass clarinet80
('11', 'Fournier', 'Nicolas', 'Clarinettiste', '1980', 'nicolas.clarinette@orange.fr', '$2b$10$7v/9RtAwEbjowtZV/v25lOwSaeeIgzxtU14YGH.pz7hEjCWabAnke', '21000', 'Dijon', 'Clarinettiste amateur cherchant à jouer dans un orchestre.', 'uploads/1742374182587-Nicolas Fournier.png'),
-- pass xylo1993
('12', 'Girard', 'Céline', 'Xylophone', '1993', 'celine.xylo@gmail.com', '$2b$10$86y9efIZJJUtDLmTzXJ6mOBdE/rul0TXGmyunsAUmwG1Jmagt0eFu', '54000', 'Nancy', 'Percussionniste spécialisée en xylophone, ouverte à tous styles.', 'uploads/1742374203882-Celine Girard.png'),
-- pass trombone89
('13', 'Morel', 'Julien', 'Trombone', '2005', 'julien.trombone@yahoo.fr', '$2b$10$AXNpt3BtSk6Hho9czb/eD.2eHjYyo8mcPvk/OR3dAn8q8p1W5X5bS', '76000', 'Rouen', 'Tromboniste cherchant à intégrer un orchestre symphonique.', 'uploads/1742374228044-Julien Morel.png'),
-- pass banjo2023
('14', 'Lambert', 'Aurélie', 'Banjo', '1991', 'aurelie.banjo@hotmail.com', '$2b$10$.l2f2Bp7P4nujVBRPbw4wupD./f90fcRfA58T.JP5Xujm8GHTLHuK', '38000', 'Grenoble', 'Joueuse de banjo passionnée de bluegrass et de country.', 'uploads/1742374249890-Aurelie Lambert.png'),
-- pass cello1986
('15', 'Faure', 'Maxime', 'Violoncelliste', '1986', 'maxime.violoncelle@gmail.com', '$2b$10$0WuL0WTsvNi2vy2T2dJ6f.zAYSZacJYKodCtk4r6XvU6p0Qqe4yaC', '34000', 'Montpellier', 'Violoncelliste professionnel cherchant à former un quatuor à cordes.', 'uploads/1742374270466-Maxime Faure.png'),
-- pass flute2023
('16', 'Mercier', 'Camille', 'Flûtiste', '1994', 'camille.flute@orange.fr', '$2b$10$eIQygqTh4mhJv5Uf3jExOORwOpi0xjBwuaDYnc/2DYLsxtT5Wi8B.', '49000', 'Angers', 'Flûtiste traversière cherchant à explorer la musique contemporaine.', 'uploads/1742374290884-Camille Mercier.png');

-- Insertion des localisations
INSERT INTO locations (id_location, postal_code, latitude, longitude) VALUES
('1', '38000', '45.1970415', '5.721307075804626'),
('2', '88230', '48.12955595', '7.007314051358351'),
('3', '75011', '48.8600808', '2.378139882269922'),
('4', '69001', '45.76940595', '4.826674363904056'),
('5', '33000', '44.83910495', '-0.5814266226076892'),
('6', '59000', '50.63020418728268', '3.0774166644353182'),
('7', '67000', '48.58322677198068', '7.755884428381643'),
('8', '35000', '48.109323001895206', '-1.6822927359717579'),
('9', '31000', '43.60439495', '1.4392567639237313'),
('10', '21000', '47.331844000000004', '5.044738082239081'),
('11', '44000', '47.2231248233877', '-1.5532762084556064'),
('12', '76000', '49.445400449999994', '1.0938964773934732'),
('13', '54000', '48.69118744583333', '6.175580058333334'),
('14', '13001', '43.30821760995261', '5.38474947014218'),
('15', '34000', '43.61504814768133', '3.878711308323424'),
('16', '49000', '47.523981899999995', '-0.5148760037236004');

-- Insertion des genres musicaux
INSERT INTO musical_genres (id_genre, name_genre) VALUES
('1', 'Rock'),
('2', 'Pop'),
('3', 'Electro'),
('4', 'Classique'),
('5', 'Metal'),
('6', 'Jazz'),
('7', 'Folk'),
('8', 'Reggae'),
('9', 'Rap'),
('10', 'Blues');
-- Insertion des administrateurs
INSERT INTO administrators (id_admin, name_admin, email_admin, password_admin) VALUES
('1', 'Irina', 'irina@mail.fr', '$2b$10$0LE4HsUUjCY0/17/T8sKzuV1gxkupBgjQ3KITIpXSisNdAWNmdmQC'),
('2', 'Aldrit', 'aldrit@mail.fr', '$2b$10$0LE4HsUUjCY0/17/T8sKzuV1gxkupBgjQ3KITIpXSisNdAWNmdmQC'),
('3', 'Imrane', 'imrane@mail.fr', '$2b$10$0LE4HsUUjCY0/17/T8sKzuV1gxkupBgjQ3KITIpXSisNdAWNmdmQC'),
('4', 'Youri', 'youri@mail.fr', '$2b$10$0LE4HsUUjCY0/17/T8sKzuV1gxkupBgjQ3KITIpXSisNdAWNmdmQC'),
('5', 'Alex', 'alex@mail.fr', '$2b$10$0LE4HsUUjCY0/17/T8sKzuV1gxkupBgjQ3KITIpXSisNdAWNmdmQC'),
('6', 'Amandine', 'amandine@mail.fr', '$2b$10$0LE4HsUUjCY0/17/T8sKzuV1gxkupBgjQ3KITIpXSisNdAWNmdmQC');

-- Insertion des conversations
INSERT INTO conversations (id_conv, content_conv) VALUES
('1', '{"messages": [{"content": "Bonjour Julie! Je me demandais si vous vouliez créer un groupe Atypique accordéon-triangle?", "id_user": 1, "timestamp": "2025-03-20T11:13:10.893Z"}, {"content": "Bonjour Bob! ", "id_user": 8, "timestamp": "2025-03-20T11:15:20.541Z"}, {"content": "Oui pourquoi pas!", "id_user": 8, "timestamp": "2025-03-20T11:15:29.124Z"}, {"content": "Je vois que tu aimes le rock, on pourrait essayer de reprendre All along the watchtower. Ca te dit?", "id_user": 8, "timestamp": "2025-03-20T11:16:10.177Z"}], "participants": [{"role": "initiator", "id_user": 1}, {"role": "responder", "id_user": 8}]}'),
('2', '{"messages": [{"content": "Bonjour Aurélie, veux-tu faire des choses impies avec moi ???", "id_user": 1, "timestamp": "2025-03-20T11:13:56.616Z"}], "participants": [{"role": "initiator", "id_user": 1}, {"role": "responder", "id_user": 14}]}'),
('3', '{"messages": [{"content": "Bonjour Bob, vous avez été signalé pour contenu inapproprié!!", "id_admin": 5, "timestamp": "2025-03-20T11:19:13.540Z"}], "participants": [{"role": "admin", "id_admin": 5}, {"role": "user", "id_user": 1}]}'),
('4', '{"messages": [{"content": "Bonjour Aurélie! J''aimerais beaucoup m''ouvrir à la musique folk. Seriez-vous disponible pour jouer quelques morceaux un de ces week-end?", "id_user": 3, "timestamp": "2025-03-20T11:24:17.049Z"}], "participants": [{"role": "initiator", "id_user": 3}, {"role": "responder", "id_user": 14}]}');

-- Insertion des signalements (reports)
INSERT INTO reports (id_report, type_report, description_report, is_processed, id_target_user, id_source_user) VALUES
('1', 'NSFW Content', 'Bob m''a proposé de faire des choses impies! Je suis choquée!', false, '1', '14');

-- Insertion des préférences musicales
INSERT INTO prefer (id_user, id_genre) VALUES
('1', '1'),
('2', '6'),
('3', '1'),
('4', '6'),
('4', '2'),
('5', '5'),
('6', '4'),
('7', '6'),
('8', '7'),
('9', '6'),
('10', '4'),
('10', '7'),
('11', '4'),
('12', '2'),
('13', '4'),
('14', '7'),
('15', '4'),
('16', '3'),
('1', '3'),
('2', '4'),
('3', '7'),
('4', '4'),
('4', '9'),
('5', '6'),
('6', '3'),
('7', '1'),
('8', '9'),
('9', '10'),
('10', '3'),
('10', '8'),
('11', '5'),
('12', '4'),
('13', '7'),
('14', '8'),
('15', '9'),
('16', '1');

-- Insertion des instruments joués par les utilisateurs
INSERT INTO play (id_user, id_level, id_instrument) VALUES
('1', '2', '7'),
('2', '4', '2'),
('3', '1', '1'),
('4', '3', '5'),
('5', '4', '4'),
('6', '4', '3'),
('7', '3', '6'),
('8', '4', '11'),
('9', '4', '12'),
('10', '4', '10'),
('11', '2', '8'),
('12', '4', '13'),
('13', '3', '14'),
('14', '4', '15'),
('15', '1', '9'),
('16', '4', '8'),
('1', '2', '2'),
('2', '2', '3'),
('3', '1', '4'),
('4', '3', '3'),
('5', '4', '5'),
('6', '1', '6'),
('7', '3', '7'),
('8', '4', '8'),
('9', '1', '9'),
('10', '4', '11'),
('11', '2', '10'),
('12', '4', '12'),
('13', '3', '13'),
('14', '2', '14'),
('15', '3', '15'),
('16', '4', '2');

INSERT into is_favorite (id_user, id_fav) VALUES 
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),
('1', '6'),
('16', '1'),
('16', '15'),
('16', '14'),
('16', '13');

-- Définition de la valeur initiale de l'auto-incrément pour chaque table
ALTER SEQUENCE users_id_user_seq RESTART WITH 17;
ALTER SEQUENCE instruments_id_instrument_seq RESTART WITH 16;
ALTER SEQUENCE levels_id_level_seq RESTART WITH 6;
ALTER SEQUENCE musical_genres_id_genre_seq RESTART WITH 11;
ALTER SEQUENCE administrators_id_admin_seq RESTART WITH 7;
ALTER SEQUENCE conversations_id_conv_seq RESTART WITH 5;
ALTER SEQUENCE reports_id_report_seq RESTART WITH 2;
ALTER SEQUENCE locations_id_location_seq RESTART WITH 17;