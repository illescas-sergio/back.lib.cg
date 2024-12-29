const { findAuthorByCompleteName } = require('../services/authorServices.js');
const { findPublisherByName } = require('../services/publisherServices.js');
const {
    bookPostService,
    booksGetService,
    bookGetService,
    bookUpdateService,
    bookDeleteService,
    bothAuthorsTestService,
    withAuthors
} = require('../services/bookServices.js');
const { nameSplit, authorsSeparator } = require('../helpers/authorNameProcessor.js');
const { dateFormatter } = require('../helpers/dateFormatter.js');


const bookPostController = async (req, res) => {

    const {author, publisher, title, category, price, release_date, description} = req.body;
    if(!author || !publisher || !title || !category || !price || !release_date || !description) return res.status(400).send("Faltan datos");
    console.log(author)
    const full = authorsSeparator(author)

    let authorsIds = []
    
    if(full.length > 1){

        const arrayAuthors = bothAuthorsTestService(full)
        console.log(arrayAuthors)
      
        try {
            for (const el of arrayAuthors) {
                const { first_name, last_name } = el;
                const authorExist = await findAuthorByCompleteName(first_name, last_name);
                if (authorExist.length < 1) {
                    throw new Error(`Autor no encontrado: ${first_name} ${last_name}`);
                }
                authorsIds.push(authorExist[0]._id);
            }
        } catch (err) {
            return res.status(404).send(err.message);
        }
        
    } else {
        const {first_name, last_name} = nameSplit(author);
        const authorExist = await findAuthorByCompleteName(first_name, last_name);
        if(authorExist.length < 1) return res.status(404).send("No se encuentra el autor");
        const authorId = authorExist[0]._id;
        authorsIds.push(authorId)
    }
    
    const publisherExist = await findPublisherByName(publisher);
    
    if(publisherExist.length < 1) return res.status(404).send("No se encuentra la editorial");
    const publisherId = publisherExist[0]._id;

    const verifiedReleaseDate = dateFormatter(release_date)

    
    const bookData = {
        author: authorsIds,
        publisher: publisherId,
        title: title,
        category: category,
        price: price,
        release_date: verifiedReleaseDate,
        description: description
    }
    
    const addedBook = await bookPostService(bookData);
    if(!addedBook) return res.status(400).send(addedBook)
    

    return res.send(addedBook)
}


const booksGetController =  async (req, res) => {

    const {page, limit, category} = req.query;

    const qry = {}
    const opt = {}
    if(!page || !limit){
        opt['pagination'] = false;
    } else {
        opt['page'] = page;
        opt['limit'] = limit;
    }
    if(category){
        qry['category'] = category;
    } else {
        qry['category'] = null;
    }

    const books = await booksGetService(qry,opt);
    if(!books) return res.status(404).send(books)

    return res.status(200).send(books)
}

const bookGetController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

    const book = await bookGetService(id);
    if(!book) return res.status(404).send(book)

    return res.status(200).send(book)
}
 
const bookUpdateController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

    const {title, category, price, release_date, description} = req.body;
    if(!title || !category || !price || !release_date || !description) return res.status(400).send("Faltan datos");

    const forUpdateData = {
        title,
        category,
        price,
        release_date,
        description
    }
    
    const updatedBook = await bookUpdateService(id, forUpdateData);
    console.log(updatedBook)
    if(!updatedBook) return res.status(400).send(updatedBook)

    return res.send(updatedBook)
}


const bookDeleteController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

    const deletedBook = await bookDeleteService(id);
    if(deletedBook.deletedCount === 0) return res.status(404).send("No se encuentra");

    return res.status(200).send(deletedBook)
}


module.exports = {
    bookPostController,
    booksGetController,
    bookGetController,
    bookUpdateController,
    bookDeleteController
}
