const express = require('express');
const auth = require('../middleware/authorization');
const {
  createUser,
  login,
  verifyUser,
  updateUserById
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', login);
userRouter.get('/verify-user', auth, verifyUser);
userRouter.put('/update', auth, updateUserById);

module.exports = userRouter;
