const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const publisherSchema = new mongoose.Schema({
    name: String,
    address: String,
    cuil: String,
    published_books:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],    
});

//paginacion
publisherSchema.plugin(mongoosePaginate);

const publisherModel = mongoose.model("Publisher", publisherSchema);

module.exports = {
    publisherModel
}