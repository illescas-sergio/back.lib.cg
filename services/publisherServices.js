const {publisherModel} = require('../schemas/PublisherSchema.js');


const findPublisherByName = async (name) => {

    const publisher = await publisherModel.find({name: name}).exec()

    return publisher

}

module.exports = {
    findPublisherByName,
}