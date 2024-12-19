const { authorModel } = require('../schemas/AuthorSchema.js');


const authorPostController = async (first_name, last_name, dni, country) => {

    const newAuthor = await authorModel.create({
    
        first_name: first_name,
        last_name: last_name,
        dni: dni,
        country: country

    })

    return newAuthor
}

const authorsGetController = async () => {

    const authors = await authorModel.find().exec();

    return authors
}

const authorGetController = async (authorId) => {

    const author = await authorModel.findById(authorId).exec();

    return author
}
 
const authorUpdateController = async (authorId, forUpdateData) => {

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

const authorDeleteController = async (authorId) => {

    const deleteAuthor = await authorModel.deleteOne({
        _id: authorId
    });

    return deleteAuthor
}


module.exports = {
    authorPostController,
    authorsGetController,
    authorGetController,
    authorUpdateController,
    authorDeleteController
}
