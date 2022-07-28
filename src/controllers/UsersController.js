const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex("users")
      .select("email")
      .where({ email });

    if (checkUserExists.length) {
      throw new AppError("Este e-mail já está em uso!");
    }

    const hasPassword = await hash(password, 8);
    await knex("users").insert({
      name,
      email,
      password: hasPassword,
    });

    return response.json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").select("*").where({ id }).first();

    if (!user) {
      throw new AppError("Usuário não cadastrado!");
    }

    const userWithUpdateEmail = await knex("users")
      .select("*")
      .where({ id })
      .first();

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      console.log(checkOldPassword);
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
      console.log(user.password);
    }

    console.log(password);

    await knex("users").where({ id }).update({
      name,
      email,
      password: user.password,
    });

    return response.json(user);
  }
}

module.exports = UsersController;
