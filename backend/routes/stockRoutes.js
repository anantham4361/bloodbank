// const express = require('express');

// module.exports = (pool) => {
//   const router = express.Router();
//   const stockController = require('../controllers/stockController');

//   router.get('/', (req, res, next) => {
//     req.pool = pool;
//     stockController.getStock(req, res, next);
//   });

//   router.put('/', (req, res, next) => {
//     req.pool = pool;
//     stockController.updateStock(req, res, next);
//   });

//   return router;
// };

const express = require('express');
const stockController = require('../controllers/stockController');

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    req.pool = pool;
    stockController.getStock(req, res);
  });

  router.put('/', (req, res) => {
    req.pool = pool;
    stockController.updateStock(req, res);
  });

  return router;
};
