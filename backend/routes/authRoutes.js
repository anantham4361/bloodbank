// routes/authRoutes.js

const express = require('express');

module.exports = (pool) => {
  const router = express.Router();
  const authController = require('../controllers/authController')(pool);

  router.post('/login', authController.loginAdmin);

  return router;
};