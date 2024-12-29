const {bookModel} = require('../schemas/BookSchema.js');
const {nameSplit} = require('../helpers/authorNameProcessor.js');
const { findAuthorByCompleteName } = require('../services/authorServices.js');


const bookPostService = async (bookData) => {

    const newBook = await bookModel.create({

        author: bookData.author,
        publisher: bookData.publisher,
        title: bookData.title,
        category: bookData.category,
        price: bookData.price,
        release_date: bookData.release_date,
        description: bookData.description
    })

    return newBook
}


const booksGetService = async (qry, opt) => {

    const {page, limit} = opt;
   

    if(page && limit){
        const pagination = {page, limit};
        const books = await bookModel.find().populate('publisher').populate('author').paginate(pagination);
        return books
    }

    const {category} = qry;
    if(!category){
        const books = await bookModel.find().populate('publisher').populate('author');
        return books

    } else {
        const books = await bookModel.find({category: category}).populate('publisher').populate('author');
        return books
    }

   
}


const bookGetService = async (bookId) => {

    const book = await bookModel.findById(bookId).populate('publisher').populate('author').exec();

    return book
}

 
const bookUpdateService = async (bookId, forUpdateData) => {

    const newBookData = await bookModel.updateOne({
        _id: bookId
    },{

        title: forUpdateData.title,
        category: forUpdateData.category,
        price: forUpdateData.price,
        release_date: forUpdateData.release_date,
        description: forUpdateData.description

    });

    return newBookData
}

const bookDeleteService = async (bookId) => {

    const deleteBook = await bookModel.deleteOne({
        _id: bookId
    });

    return deleteBook
}


const findBookByName = async (name) => {

    const book = await bookModel.find({name: name}).exec()

    return book
}

const bothAuthorsTestService = (full) => {

    const authors = [];
    
    full.forEach((el) => {
        authors.push(nameSplit(el)) ;
    })
    return authors
}


module.exports = {
    bookPostService,
    booksGetService,
    bookGetService,
    bookUpdateService,
    bookDeleteService,
    findBookByName,
    bothAuthorsTestService,
}