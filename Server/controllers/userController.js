const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bycrypt = require("bcryptjs");
const {generateToken} = require('../utils/jwtUtil');

// Fetch all users
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// Fetch a single user
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
};

// Create a new user
const registerUser = async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  if (!fullName || !email || !password || !phone) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      phone,
    },
  });
  res.json(user);
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try{
     const user = await prisma.user.findUnique({
       where: {
         email,
       },
     });

     if (!user) {
       return res.status(400).json({ error: "Invalid Email" });
     }

     const isMatch = await bycrypt.compare(password, user.password);

     if (!isMatch) {
       return res.status(400).json({ error: "Invalid password" });
     }

     const token = generateToken({ id: user.id, email: user.email });

     res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//get user profile
const getUserProfile = async (req, res) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
        
      },
    });
    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  getUserProfile,
};
