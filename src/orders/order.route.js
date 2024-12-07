const express = require("express");
const { createOrder, getOrdersByEmail } = require("./order.controller");

const router = express.Router();

// Creamos una nueva orden
router.post("/", createOrder);

// Obtener todas las ordenes por email del usuario
router.get("/email/:email", getOrdersByEmail);




module.exports = router;