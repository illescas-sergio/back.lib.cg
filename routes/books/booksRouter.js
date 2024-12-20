const {Router} = require('express');
const {
    bookPostController,
    booksGetController,
    bookGetController,
    bookUpdateController,
    bookDeleteController 
} = require('../../controllers/bookControllers.js');

const booksRouter = Router();

booksRouter.get("/", booksGetController)

booksRouter.get("/:id", bookGetController)

booksRouter.post("/", bookPostController)

booksRouter.put("/:id", bookUpdateController)

booksRouter.delete("/:id", bookDeleteController)

module.exports = {
    booksRouter
}

