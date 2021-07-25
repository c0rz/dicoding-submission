const fs = require("fs");
const { nanoid } = require("nanoid");

function saveData(data) {
  return fs.writeFile(`../book.json`, JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
      return JSON.stringify(err);
    }
  });
}

function getData() {
  return require("../book.json");
}

const getBook = async (req, res) => {
  const data_buku = getData();
  const read = req.query.reading;
  const finish = req.query.finished;
  const name = req.query.name;
  if (read) {
    let result;
    let data = [];
    if (read == "0") {
      result = false;
    } else if (read == "1") {
      result = true;
    }
    // console.log(result);
    for (let i = 0; i < data_buku.books.length; i++) {
      if (data_buku.books[i].reading == result) {
        const obj = {
          id: data_buku.books[i].id,
          name: data_buku.books[i].name,
          publisher: data_buku.books[i].publisher,
        };
        data.push(obj);
      }
    }
    return res.status(200).json({
      status: "success",
      data: {
        books: data,
      },
    });
  }
  if (finish) {
    let result;
    let data = [];
    if (finish == "0") {
      result = false;
    } else if (finish == "1") {
      result = true;
    }
    for (let i = 0; i < data_buku.books.length; i++) {
      if (data_buku.books[i].finished == result) {
        const obj = {
          id: data_buku.books[i].id,
          name: data_buku.books[i].name,
          publisher: data_buku.books[i].publisher,
        };
        data.push(obj);
      }
    }
    return res.status(200).json({
      status: "success",
      data: {
        books: data,
      },
    });
  }
  if (name) {
    let data = [];
    const data_search = data_buku.books.filter(function (o) {
      return o.name.toLowerCase().includes(name.toLowerCase());
    });
    for (let i = 0; i < data_search.length; i++) {
      const obj = {
        id: data_search[i].id,
        name: data_search[i].name,
        publisher: data_search[i].publisher,
      };
      data.push(obj);
    }
    return res.status(200).json({
      status: "success",
      data: {
        books: data,
      },
    });
  }
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
      console.log(data_buku.books[i]);
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
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const finished = pageCount === readPage;
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
    finished: finished,
    reading: reading,
    insertedAt: insertedAt,
    updatedAt: insertedAt,
  };
  // console.log(book);
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

  const id_book = req.params.id;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
  } else if (readPage > pageCount) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  var index = data_buku.books.findIndex(function (item, i) {
    return item.id === id_book;
  });

  if (index !== -1) {
    data_buku.books[index] = {
      ...data_buku.books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    saveData(data_buku);
    return res.status(200).json({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
};

const DeleteBook = async (req, res, next) => {
  let data_buku = getData();
  const id_book = req.params.id;
  var index = data_buku.books.findIndex(function (item, i) {
    return item.id === id_book;
  });
  if (index !== -1) {
    data_buku.books.splice(index, 1);
    saveData(data_buku);
    return res.status(200).json({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
};

module.exports = {
  getBook,
  DetailBook,
  AddBook,
  EditBook,
  DeleteBook,
};
