const {Router} = require('express');
const {
    bookPostController,
    booksGetController,
    bookGetController,
    bookUpdateController,
    bookDeleteController 
} = require('../../controllers/bookControllers.js');

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {

    const books = await booksGetController();

    return res.status(200).send(books)
   
})


booksRouter.get("/:id", async (req, res) => {

    const {id} = req.params;

    const book = await bookGetController(id);

    return res.status(200).send(book)
   
})

booksRouter.post("/", async (req, res) => {

    const {author, publisher, title, category, price, release_date, description} = req.body;

    const toValidateInfo = {
        author,
        publisher
    }

    const bookData = {
        title,
        category,
        price,
        release_date,
        description
    }
    
    const addedBook = await bookPostController(toValidateInfo, bookData);

    return res.send(addedBook)
})

booksRouter.put("/:id", async (req, res) => {

    const {id} = req.params;

    const {title, category, price, release_date, description} = req.body;

    const forUpdateData = {
        title,
        category,
        price,
        release_date,
        description
    }
    
    const updatedBook = await bookUpdateController(id, forUpdateData);

    return res.send(updatedBook)
})


booksRouter.delete("/:id", async (req, res) => {

    const {id} = req.params;

    const deletedBook = await bookDeleteController(id);

    return res.status(200).send(deletedBook)
})

module.exports = {
    booksRouter
}

