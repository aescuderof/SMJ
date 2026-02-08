const express = require('express');
const {
	getAllCollares,
	createCollar,
	updateCollarById,
	deleteCollarById
} = require('../controllers/collar.controller');
const collarRouter = express.Router();

collarRouter.get('/', getAllCollares);
collarRouter.post('/', createCollar);
collarRouter.put('/:id', updateCollarById);
collarRouter.delete('/:id', deleteCollarById);

module.exports = collarRouter;
