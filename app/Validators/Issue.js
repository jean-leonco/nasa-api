'use strict';

class Issue {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      issue: 'required',
      description: 'required',
    };
  }

  get messages() {
    return {
      'issue.required': 'É preciso informar o alerta',
      'description.required': 'É preciso informar uma descrição',
    };
  }
}

module.exports = Issue;
