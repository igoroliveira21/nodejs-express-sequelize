'use strict';
const isCpfValido = require('../../utils/validaCpfHelper.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id' //hasMany tem vários cursos
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'o campo nome deve ter no mínimo 3 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do email inválido'
        }
      }
    },
    cpf: {
      type:DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf) => {
          if (!isCpfValido(cpf)) throw new Error('número de cpf inválido');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: { //escopo de modelo
      where: {
        ativo: true, 
      }
    },
    scopes: {
      todosOsRegistros: {
        where: {}
      }
    }
  });
  return Pessoa;
};