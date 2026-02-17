const express = require('express');
const {
	createContactMessage,
	getAllContactMessages,
} = require('../controllers/contact.controller');

const contactRouter = express.Router();

contactRouter.get('/', getAllContactMessages);
contactRouter.post('/', createContactMessage);

module.exports = contactRouter;
