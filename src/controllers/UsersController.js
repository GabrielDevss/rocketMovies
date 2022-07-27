const { hash } = require("bcryptjs");
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const hasPassword = await hash(password, 8);
    await knex("users").insert({
      name,
      email,
      password: hasPassword,
    });
    
    return response.json();
  }
}

module.exports = UsersController;
