const Book = require("./book.model");

// crear un libro
const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "El libro se ha creado correctamente", book: newBook });
  } catch (error) {
    console.error("Error al crear el libro", error);
    res.status(500).send({ message: "El libro no se ha creado" });
  }
};

// GET de todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error al obtener los libros", error);
    res.status(500).send({ message: "Error al obtener los libros" });
  }
};

// GET de un libro por id
const getABook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Libro no encontrado" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error al obtener el libro", error);
    res.status(500).send({ message: "Error al obtener el libro" });
  }
};

// Actualizar un libro
const updateABook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Libro no encontrado" });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      message: "Libro actualizado correctamente",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error al actualizar el libro", error);
    res.status(500).send({ message: "No se pudo actualizar el libro" });
  }
};

// Eliminar un libro
const deleteABook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Libro no encontrado" });
    }
    res.status(200).send({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el libro", error);
    res.status(500).send({ message: "No se pudo eliminar el libro" });
  }
};

module.exports = { postABook, getAllBooks, getABook, updateABook, deleteABook };
