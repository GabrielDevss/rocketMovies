const { Router } = require("express");
const MovieNoteController = require("../controllers/MovieNoteController");

const movieNoteRoutes = Router();

const movieNoteController = new MovieNoteController();

movieNoteRoutes.post("/:user_id", movieNoteController.create);
movieNoteRoutes.get("/:id", movieNoteController.show);
movieNoteRoutes.delete("/:id", movieNoteController.delete);

module.exports = movieNoteRoutes;
