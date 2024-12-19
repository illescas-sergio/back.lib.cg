const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const authorSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    dni: mongoose.Schema.Types.Number,
    country: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

//paginacion
authorSchema.plugin(mongoosePaginate);

const authorModel = mongoose.model("Author", authorSchema);

module.exports = {
    authorModel
}