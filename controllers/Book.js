const fs = require("fs");
const { nanoid } = require("nanoid");

const data_buku = require("../models/book.json");

function saveData(data) {
  return fs.writeFile(`../models/book.json`, data, function (err) {
    if (err) {
      console.log(err);
      return JSON.stringify(err);
    }
  });
}

const getAllBook = async (req, res, next) => {
  res.status(200).json({ status: "success", data: data_buku });
};

const AddBook = async (req, res, next) => {
  const id = nanoid(16);
  let student = {
    name: "Mike",
    age: 23,
    gender: "Male",
    department: "English",
    car: "Honda",
  };
  fs.writeFileSync(data_buku, student);
  res.status(200).json({ status: "success", data: data_buku });
};

module.exports = {
  getAllBook,
  AddBook,
};
