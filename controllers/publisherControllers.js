const { publisherModel } = require('../schemas/PublisherSchema.js');


const publisherPostController = async (name, cuil, address) => {

    const newPublisher = await publisherModel.create({
    
        name: name,
        cuil: cuil,
        address: address
    })

    return newPublisher
}

const publishersGetController = async () => {

    const publishers = await publisherModel.find().exec();

    return publishers
}

const publisherGetController = async (authorId) => {

    const publisher = await publisherModel.findById(authorId).exec();

    return publisher
}
 
const publisherUpdateController = async (authorId, forUpdateData) => {

    const newPublisherData = await publisherModel.updateOne({
        _id: authorId
    },{
        name: forUpdateData.name,
        cuil: forUpdateData.cuil,
        address: forUpdateData.address

    });

    return newPublisherData
}


const publisherDeleteController = async (authorId) => {

    const deletePublisher = await publisherModel.deleteOne({
        _id: authorId
    });

    return deletePublisher
}


module.exports = {
    publisherPostController,
    publishersGetController,
    publisherGetController,
    publisherUpdateController,
    publisherDeleteController
}
