/**
 * @file app.js
 * @brief Entry point for the server application
 * 
 * This file sets up the Express server, configures middleware, and defines route handlers for various endpoints.
 */

const express = require("express");
var cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const levelRoutes = require("./routes/levelRoutes");
const instrumentRoutes = require("./routes/instrumentRoutes");
const genreRoutes = require("./routes/genreRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const favsRoutes = require("./routes/favsRoutes");;
const administratorRoutes = require("./routes/administratorRoutes");
const reportRoutes = require("./routes/reportRoutes")
const path = require("path");

const app = express();
app.use(cors());

/**
 * @middleware express.json
 * @description Parses incoming JSON requests
 */
app.use(express.json());

/**
 * @middleware static
 * @description Serves static files from the "uploads" directory
 */
app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

/**
 * @route /users
 * @description Routes related to user operations
 */
app.use("/users", userRoutes);

/**
 * @route /admin
 * @description Routes related to administrator operations
 */
app.use("/admin", administratorRoutes);

/**
 * @route /conv
 * @description Routes related to conversations
 */
app.use("/conv", conversationRoutes);

/**
 * @route /levels
 * @description Routes related to skill levels
 */
app.use("/levels", levelRoutes);

/**
 * @route /instruments
 * @description Routes related to musical instruments
 */
app.use("/instruments", instrumentRoutes);

/**
 * @route /genres
 * @description Routes related to musical genres
 */
app.use("/genres", genreRoutes);

/**
 * @route /reports
 * @description Routes related to user reports and moderation
 */
app.use("/reports", reportRoutes);
app.use("/favs", favsRoutes);

const PORT = 3001;

/**
 * @function listen
 * @description Starts the server and listens on the specified port
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});