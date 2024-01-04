const { Op } = require('sequelize');
const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const {data_inicial, data_final} = req.query;
    const where = {};

    // SE EXISTIREM OS PARAMS, CRIAR UMA PROPRIEDADE {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //SE EXISTIR DATA INICIAL, ADICIONA A PROP gte com o valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //Se EXISTIR DATA FINAL, idem
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (erro) {
      return res.status(500).json({erro: erro.messagem});
    }

  }
}

module.exports = CursoController;
