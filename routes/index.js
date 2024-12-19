const {Router} = require('express');
const { booksRouter } = require('./books/booksRouter.js');
const { authorsRouter } = require('./authors/authorsRouter.js');
const { publishersRouter } = require('./publishers/publishersRouter.js');

const router = Router();


router.use('/books', booksRouter)
router.use('/authors', authorsRouter)
router.use('/publishers', publishersRouter)


module.exports = {
    router
}




