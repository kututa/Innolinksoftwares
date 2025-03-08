const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all orders
const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
};

// Fetch a single order
const getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(order);
};

// Create a new order
const createOrder = async (req, res) => {
    try{
        const { userId, serviceId, orderNumber, totalAmount} = req.body;
        if (!userId  || !totalAmount || !serviceId) {
            return res.status(400).json({ error: "Please fill all fields" });
        }        



        const order = await prisma.order.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                orderNumber,
                totalAmount,
                service: {
                    connect: {
                        id: serviceId,
                    },
                },
            }
        });

        res.json(order);
    } catch(err){
        console.log("server error", err)
    }
}

// Update an order
const updateOrder = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId, orderNumber, totalAmount} = req.body;
        const order = await prisma.order.update({
            where: {
                id: parseInt(id),
            },
            data: {
                userId,
                orderNumber,
                totalAmount
            }
        });

        res.json(order);
    } catch(err){
        console.log("server error", err)
    }
}

// Delete an order
const deleteOrder = async (req, res) => {
    try{
        const { id } = req.params;
        const order = await prisma.order.delete({
            where: {
                id: parseInt(id),
            }
        });

        res.json(order);
    } catch(err){
        console.log("server error", err)
    }
}


//change order status
const status = async (req, res) => {
    try{
     
        const { orderId, status } = req.body;
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status
            }
        });

        res.json(order);
    } catch(err){
        console.log("server error", err)
    }
}

//orders with users 
const getOrdersWithUsers = async (req, res) => {
    try{
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                service: true
            }
        });
        res.json(orders);


    }
    catch(err){
        console.log("server error", err)
    }
}

//change order priority
const priority = async (req, res) => {
    try{
        const { orderId, priority } = req.body;
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                priority
            }
        });

        res.json(order);
    } catch(err){
        console.log("server error", err)
    }
}


module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder, status, getOrdersWithUsers, priority };
