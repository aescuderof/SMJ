const express = require('express');

const {
  getAllCollares,
  createCollar,
  updateCollarById,
  deleteCollarById
} = require('../controllers/collar.controller');

const router = express.Router();

router.get('/', getAllCollares);
router.post('/', createCollar);
router.put('/:id', updateCollarById);
router.delete('/:id', deleteCollarById);

module.exports = router;
