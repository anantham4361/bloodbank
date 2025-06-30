const express = require('express');
const donorController = require('../controllers/donorController');

module.exports = (pool) => {
  const router = express.Router();

  router.post('/register', (req, res) => donorController.registerDonor(req, res, pool));
  router.get('/', (req, res) => donorController.getAllDonors(req, res, pool));
  router.delete('/:id', (req, res) => donorController.deleteDonor(req, res, pool));

  return router;
};
