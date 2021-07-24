const router = require("express-promise-router")();
const BookController = require("./controllers/Book");

router.route("/").get(BookController.getAllBook);
router.route("/").post(BookController.AddBook);

module.exports = router;
