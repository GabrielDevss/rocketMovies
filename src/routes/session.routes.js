const { Router } = require("express");
const SessionUserController = require("../controllers/SessionUserController");

const sessionRoutes = Router();
const sessionUserController = new SessionUserController();

sessionRoutes.post("/", sessionUserController.create);

module.exports = sessionRoutes;
