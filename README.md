# Getting Started with Accords App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

```bash
npm run accords
```

This will run the app along with the server in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

If you want to run the app, you'll need to run a working database for it. To do so you'll have two choices, either run our Docker configuration or install a PostgreSQL configuration on your environment.

### a - Docker

To run our Docker configuration, you'll first need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/). Then, you'll just need to download our Docker-DB zip, unzip it anywhere on your environment, and then run this in the Docker_DB directory:

```bash
docker compose up
```

You'll have a running database for the app with a set of starter data.

### b - PostgreSQL Installation

Install PostgreSQL:

```bash
apt install postgresql -y
```

Then, you need to connect to PostgreSQL:

```bash
sudo -u postgres psql
```

Create the database:

```sql
CREATE DATABASE accords WITH ENCODING 'UTF8' LC_COLLATE='fr_FR.UTF-8' LC_CTYPE='fr_FR.UTF-8' TEMPLATE=template0;
```

If you want to use our set of starter data, you can copy the insertions from our insertion script file.

You can now quit psql:

```sql
\q
```

## Installation and Running the Application

First, update the system:

```bash
apt update && apt upgrade -y
```

Then, install Apache:

```bash
apt install apache2
```

Install Node.js and npm (package manager):

```bash
apt install -y nodejs
```

Install the dependencies:

```bash
npm install
```

Finally, you can run the app with:

```bash
npm run accords
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)