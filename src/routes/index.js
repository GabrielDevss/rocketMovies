const { Router } = require("express");

const usersRoutes = require("./users.routes");
const movieNoteRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movieNotes", movieNoteRoutes);
routes.use("/movieTags", movieTagsRoutes);

module.exports = routes;
