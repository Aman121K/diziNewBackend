const express = require('express')
const barberController = require('../controllers/BarberController');

const isUser = require('../middleware/isUser');

const barberRoute = express.Router();

barberRoute.route('/')
.post( isUser, barberController.add)
.get( isUser, barberController.get)
.put( isUser , barberController.update)
.delete( isUser, barberController.delete)

barberRoute.route('/getSalonBarbers/:barberId')
.get( isUser, barberController.getSalonBarbers)


module.exports = barberRoute;