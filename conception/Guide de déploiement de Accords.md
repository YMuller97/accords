# Guide de déploiement de Accords



## Introduction

Ce guide détaille le processus de déploiement d'Accords, notre application React / Node.js avec une base de données PostgreSQL sur un serveur Linux.
Accords est une application de mise en relation de musiciens.

### Prérequis

* Un serveur Linux (Ubuntu 22.04 LTS recommandé)
* Un accès root au serveur
* Une connaissance de base en administration Linux

## Préparation du serveur

### Installation des outils nécessaires

Il faut tout d'abord mettre à jour le système

```bash
apt update && apt upgrade -y
```

Puis, on peut installer Apache

```bash
apt install apache2
```

Ainsi que Node.js et npm(package manager)

```bash
apt install -y nodejs
```


## Configuration du réseau

On commence par ajouter des règles au pare-feu UFW (UFW est pré-installé sur Ubuntu, si vous utilisez une autre distribution, il faudra peut-être l'installer ou utiliser iptables)

```bash
ufw allow ssh
ufw allow 21 #FTP
ufw allow 80 #HTTP
ufw allow 443 #HTTPS
```

Il faut ensuite démarrer UFW

```bash
ufw enable
```

## Configuration de la BDD


Ensuite on passe à PostgreSQL

```bash
apt install postgresql -y
```

Il faut tout d'abord se connecter à PostgreSQL

```bash
sudo -u postgres psql
```

On créé ensuite la base

```sql
CREATE DATABASE accords WITH ENCODING 'UTF8' LC_COLLATE='fr_FR.UTF-8' LC_CTYPE='fr_FR.UTF-8' TEMPLATE=template0;
```

La suite ne fonctionne pas encore:
On créé l'utilisateur avec les bons droits

```sql
CREATE USER accordsadmin WITH PASSWORD 'accordspwd';
GRANT ALL PRIVILEGES ON DATABASE accords TO accordsadmin;
```

Il faut ensuite se connecter à la base pour accorder tous les privilèges sur tous les schémas et objets

```sql
\c accords
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO accordsadmin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO accordsadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO accordsadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO accordsadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO accordsadmin;
```

Vous pouvez maintenant quitter psql

```sql
\q
```

## Installation et lancement de l'application

On installe les dépendances 

```bash
npm install
```

On peut ensuite lancer l'application avec

```bash
npm run accords
```