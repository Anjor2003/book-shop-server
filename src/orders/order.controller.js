const Order = require("./order.model");

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order({ ...req.body });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.error("Error al crear la orden", error);
    res.status(500).send({ message: "No se pudo crear la orden" });
  }
};

const getOrdersByEmail = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({
      createdAt: -1,
    });
    if (!orders) {
      return res.status(404).json({ message: "No se encontraron ordenes" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las ordenes", error);
    res.status(500).json({ message: "No se pudo obtener las ordenes" });
  }
};

module.exports = { createOrder, getOrdersByEmail };
