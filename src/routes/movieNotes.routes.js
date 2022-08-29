const { Router } = require("express");
const MovieNoteController = require("../controllers/MovieNoteController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const movieNoteRoutes = Router();

const movieNoteController = new MovieNoteController();

movieNoteRoutes.use(ensureAuthenticated);
movieNoteRoutes.post("/", movieNoteController.create);
movieNoteRoutes.get("/:id", movieNoteController.show);
movieNoteRoutes.delete("/:id", movieNoteController.delete);

module.exports = movieNoteRoutes;
