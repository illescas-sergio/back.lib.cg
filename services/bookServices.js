const {bookModel} = require('../schemas/BookSchema.js');


const findBookByName = async (name) => {

    const book = await bookModel.find({name: name}).exec()

}

module.exports = {
    findBookByName,
}