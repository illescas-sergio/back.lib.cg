const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
    id: String,
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
    title: String,
    category: String,
    price: mongoose.Schema.Types.Double,
    release_date: mongoose.Schema.Types.Date,
    description: String,
    
});

//paginacion
bookSchema.plugin(mongoosePaginate);

const bookModel = mongoose.model("Book", bookSchema);

module.exports = {
    bookModel
}