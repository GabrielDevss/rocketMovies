require('express-async-errors');
const express = require("express");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError");
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, resquest, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

database();
const Port = 3333;
app.listen(Port, () => console.log(`Server is running on port ${Port}`));
