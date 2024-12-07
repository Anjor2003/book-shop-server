const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Order = require("../orders/order.model");
const Book = require("../books/book.model");

// Funcion para calcular admin stats
router.get("/", async (req, res) => {
  try {
    // Numero total de ordenes
    const totalOrders = await Order.countDocuments();

    // Total de ventas(Suma del precio total de las ordenes)
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Estadistica de tendencia de libros
    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } }, // Coincidir con libros tendencia
      { $count: "trendingBooksCount" }, // devuelve el conteo de libros tendencia
    ]);
    // Si solo quieres el conteo coomo numero, puedes extraerlo de esta manera
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;
    // Total de numero de libros
    const totalBooks = await Book.countDocuments();

    // Ventas Mensuales (arupar por mes)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Agrupar por mes y año
          totalSales: { $sum: "$totalPrice" }, // Suma Total de Ventas por mes
          totalOrders: { $sum: 1 }, // Cuenta total de ordenes por mes
        },
      },
      {
        $sort: { _id: 1 }, // Ordenar por mes y año ascendente
      },
    ]);
    // resultado sumatorio
    res.status(200).json({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.error("Error al obtener las estadísticas", error);
    res.status(500).json({ message: "No se pudo obtener las estadísticas" });
  }
});

module.exports = router;
