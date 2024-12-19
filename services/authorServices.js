const {authorModel} = require('../schemas/AuthorSchema.js');

const authorsGetService = async () => {

    const authors = await authorModel.find().exec();

    return authors
}

const authorGetService = async (authorId) => {

    const author = await authorModel.findById(authorId).exec();

    return author
}

const authorPostService = async (first_name, last_name, dni, country) => {

    const newAuthor = await authorModel.create({
    
        first_name: first_name,
        last_name: last_name,
        dni: dni,
        country: country

    })

    return newAuthor
}

const authorUpdateService = async (authorId, forUpdateData) => {

    const newAuthorData = await authorModel.updateOne({
        _id: authorId
    },{
        first_name: forUpdateData.first_name,
        last_name: forUpdateData.last_name,
        dni: forUpdateData.dni,
        country: forUpdateData.country
    });

    return newAuthorData
}

const authorDeleteService = async (authorId) => {

    const deleteAuthor = await authorModel.deleteOne({
        _id: authorId
    });

    return deleteAuthor
}


const findAuthorByCompleteName = async (first_name, last_name) => {

    const author = await authorModel.find({first_name: first_name, last_name: last_name}).exec();

    return author
}

module.exports = {
    authorsGetService,
    authorGetService,
    authorPostService,
    authorUpdateService,
    authorDeleteService,
    findAuthorByCompleteName,
}