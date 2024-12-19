const {authorModel} = require('../schemas/AuthorSchema.js');


const findAuthorByCompleteName = async (first_name, last_name) => {

    const author = await authorModel.find({first_name: first_name, last_name: last_name}).exec();

    return author

}

module.exports = {
    findAuthorByCompleteName,
}