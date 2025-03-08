const express = require('express');
const router = express.Router();

const {getNotifications, getNotification, createNotification} = require('../controllers/notificationController');

router.get('/', getNotifications);

router.get('/:id', getNotification);

router.post('/create', createNotification);


module.exports = router;