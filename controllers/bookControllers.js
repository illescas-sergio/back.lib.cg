const { bookModel } = require('../schemas/BookSchema.js');
const { findAuthorByCompleteName } = require('../services/authorServices.js');
const { findPublisherByName } = require('../services/publisherServices.js');
const { nameSplit } = require('../helpers/nameSplit.js');


const bookPostController = async (toValidateInfo, bookData) => {

    
    const {author, publisher} = toValidateInfo;

    const {first_name, last_name} = nameSplit(author)

    const authorExist = await findAuthorByCompleteName(first_name, last_name);

    if(!authorExist){
        return authorExist// Tirar error si no exste
    }

    const publisherExist = await findPublisherByName(publisher);
    
    if(!publisherExist){
        return publisherExist
    }

    const newBook = await bookModel.create({

        author: authorExist[0],
        publisher: publisherExist[0],
        title: bookData.title,
        category: bookData.category,
        price: bookData.price,
        release_date: bookData.release_date,
        description: bookData.description
    })

    return newBook
}

    

    


const booksGetController = async () => {

    const books = await bookModel.find().exec();

    return books
}

const bookGetController = async (bookId) => {

    const book = await bookModel.findById(bookId).exec();

    return book
}
 
const bookUpdateController = async (bookId, forUpdateData) => {

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


const bookDeleteController = async (bookId) => {

    const deleteBook = await bookModel.deleteOne({
        _id: bookId
    });

    return deleteBook
}


module.exports = {
    bookPostController,
    booksGetController,
    bookGetController,
    bookUpdateController,
    bookDeleteController
}
