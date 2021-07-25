const router = require("express-promise-router")();
const BookController = require("./controllers/Book");

router.route("/").get(BookController.getBook);
router.route("/:id").get(BookController.DetailBook);
router.route("/").post(BookController.AddBook);
router.route("/:id").put(BookController.EditBook);
router.route("/:id").delete(BookController.DeleteBook);

module.exports = router;
