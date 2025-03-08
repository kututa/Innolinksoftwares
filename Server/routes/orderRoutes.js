const express = require("express");
const router = express.Router();

const{getOrders, getOrder, createOrder, updateOrder, deleteOrder, status, getOrdersWithUsers} = require('../controllers/orderController');


router.get('/', getOrders);

router.get('/id', getOrder);

router.post('/create', createOrder);

router.put('/update', updateOrder);

router.delete('/delete', deleteOrder);

router.put('/status', status);

router.get('/users', getOrdersWithUsers);

module.exports = router;