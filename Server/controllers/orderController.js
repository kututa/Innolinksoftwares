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
  console.log("params", req.params);
  const { orderNumber } = req.params;

  if (!orderNumber) {
    return res.status(400).json({ error: "orderNumber is required" });
  }

  const order = await prisma.order.findUnique({
    where: {
      orderNumber: orderNumber,
    },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
};

const generateOrderNumber = async () => {
  // Example: "SR-2025-001"
  const lastOrder = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" },
    select: { orderNumber: true },
  });

  let nextNumber = 1;
  if (lastOrder) {
    const match = lastOrder.orderNumber.match(/SR-(\d{4})-(\d{3})/);
    if (match) {
      nextNumber = parseInt(match[2]) + 1;
    }
  }

  return `SR-${new Date().getFullYear()}-${String(nextNumber).padStart(
    3,
    "0"
  )}`;
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      projectName,
      projectDescription,
      budget,
      additionalRequirements,
      attachments,
    } = req.body;

    if (!userId || !budget || !serviceId) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const orderNum = await generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        userId,
        projectName,
        projectDescription,
        serviceId,
        orderNumber: orderNum,
        budget,
        additionalRequirements,
        attachments,
        status: "pending",
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, orderNumber, totalAmount } = req.body;
    const order = await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userId,
        orderNumber,
        totalAmount,
      },
    });

    res.json(order);
  } catch (err) {
    console.log("server error", err);
  }
};
// Delete an order
const deleteOrder = async (req, res) => {
  try {
  } catch (err) {
    console.log("server error", err);
  }
};
//change order status
const status = async (req, res) => {
  console.log("body", req.body);
  try {
    const { orderNumber, status } = req.body;

    if (!orderNumber || !status) {
      return res.status(400).json({ error: "Please provide orderNumber" });
    }
    
    const order = await prisma.order.update({
      where: {
        orderNumber: orderNumber,
      },
      data: {
        status,
      },
    });

    res.json(order);
  } catch (err) {
    console.log("server error", err);
  }
};

//orders with users
const getOrdersWithUsers = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        service: true,
      },
    });
    res.json(orders);
  } catch (err) {
    console.log("server error", err);
  }
};

//change order priority
const priority = async (req, res) => {
  try {
    const { orderId, priority } = req.body;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        priority,
      },
    });

    res.json(order);
  } catch (err) {
    console.log("server error", err);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  status,
  getOrdersWithUsers,
  priority,
};
