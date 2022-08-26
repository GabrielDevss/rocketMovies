const knex = require("../database/knex");

class MovieNoteController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.user.id;

    const note_id = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("movieTags").insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movieNotes").where({ id }).first();
    const tags = await knex("movieTags").where({ note_id: id }).orderBy("name");

    return response.json({ ...note, tags });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movieNotes").delete().where({ id });

    return response.json();
  }
}

module.exports = MovieNoteController;
