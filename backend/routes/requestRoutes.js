
const express = require('express');
const requestControllerFactory = require('../controllers/requestController');

module.exports = (pool) => {
  const router = express.Router();
  const requestController = requestControllerFactory(pool);

  router.post('/', requestController.submitRequest);
  router.get('/', requestController.getAllRequests);
  router.put('/:id', requestController.updateRequestStatus);

  return router;
};
