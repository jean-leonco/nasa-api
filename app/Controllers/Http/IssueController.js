'use strict';

const Issue = use('App/Models/Issue');

class IssueController {
  async index({ request }) {
    const { page } = request.get();

    const issues = await Issue.query().paginate(page);

    return issues;
  }

  async store({ request }) {
    const data = request.all();

    const issue = await Issue.create(data);

    return issue;
  }

  async show({ params, response }) {
    try {
      const issue = await Issue.findOrFail(params.id);

      return issue;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o alerta',
        },
      });
    }
  }

  async update({ request, params, response }) {
    try {
      const issue = await Issue.findOrFail(params.id);

      const data = request.only(['issue', 'title']);

      issue.merge(data);

      await issue.save();

      return issue;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o alerta',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const issue = await Issue.findOrFail(params.id);

      issue.delete();

      return response.send({
        sucess: { message: 'Alerta foi deletado' },
      });
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Alguma coisa deu errado, não pudemos encontrar o alerta',
        },
      });
    }
  }
}

module.exports = IssueController;
