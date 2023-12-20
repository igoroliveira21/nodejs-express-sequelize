const express = require('express');
const pessoas = require('./pessoasRoute.js');
const categorias = require('./categoriaRoute.js');
const cursos = require('./cursoRoute.js');


module.exports = app => {
  app.use(
    express.json(),
    pessoas,
    categorias,
    cursos
  );
};
