const fs = require("fs");
const { nanoid } = require("nanoid");

function saveData(data) {
  return fs.writeFile(
    `../models/book.json`,
    JSON.stringify(data),
    function (err) {
      if (err) {
        console.log(err);
        return JSON.stringify(err);
      }
    }
  );
}

function getData() {
  return require("../models/book.json");
}

const getAllBook = async (req, res) => {
  const data_buku = getData();
  let data = [];
  for (let i = 0; i < data_buku.books.length; i++) {
    const obj = {
      id: data_buku.books[i].id,
      name: data_buku.books[i].name,
      publisher: data_buku.books[i].publisher,
    };
    data.push(obj);
  }
  return res.status(200).json({
    status: "success",
    data: {
      books: data,
    },
  });
};

const DetailBook = async (req, res) => {
  const data_buku = getData();
  const id_book = req.params.id;
  var status = false;
  let data = [];
  for (let i = 0; i < data_buku.books.length; i++) {
    if (data_buku.books[i].id == id_book) {
      status = true;
      data.push(data_buku.books[i]);
    }
  }
  if (status == true) {
    return res.status(200).json({
      status: "success",
      data: {
        book: data[0],
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
  }
};

const AddBook = async (req, res, next) => {
  const data_buku = getData();
  const { name, year, author, summary, publisher, pageCount, readPage } =
    req.body;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
  } else if (readPage > pageCount) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }
  let book = {
    id: id,
    name: name,
    year: year,
    author: author,
    summary: summary,
    publisher: publisher,
    pageCount: pageCount,
    readPage: readPage,
    finished: false,
    reading: false,
    insertedAt: publisher,
    updatedAt: publisher,
  };
  console.log(book);
  data_buku.books.push(book);
  saveData(data_buku);
  return res.status(201).json({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: { bookId: id },
  });
};

const EditBook = async (req, res, next) => {
  let data_buku = getData();
  const idnye = req.body.id;
  let student = {
    name: "Mike",
    age: 23,
    gender: "anjass",
    department: "English",
    car: publisher,
  };
  for (let i = 0; i < data_buku.books.length; i++) {
    if (data_buku.books[i].id == idnye) {
      student.id = idnye;
      data_buku.books[i] = student;
    }
  }
  saveData(data_buku);
  res.status(200).json({ status: "success", data: data_buku });
};

const DeleteBook = async (req, res, next) => {
  let data_buku = getData();
  const idnye = req.params.id;
  for (let i = 0; i < data_buku.books.length; i++) {
    if (data_buku.books[i].id == idnye) {
      data_buku.books.splice(i, 1);
    }
  }
  saveData(data_buku);
  res.status(200).json({ status: "success", data: data_buku });
};

module.exports = {
  getAllBook,
  DetailBook,
  AddBook,
  EditBook,
  DeleteBook,
};
