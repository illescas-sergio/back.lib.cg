const {publisherModel} = require('../schemas/PublisherSchema.js');

const publisherPostService = async (name, cuil, address) => {

    const newPublisher = await publisherModel.create({
    
        name: name,
        cuil: cuil,
        address: address
    })

    return newPublisher
}


const publishersGetService = async () => {

    const publishers = await publisherModel.find().exec();

    return publishers
}

const publisherGetService = async (authorId) => {

    const publisher = await publisherModel.findById(authorId).exec();

    return publisher
}

const publisherUpdateService = async (authorId, forUpdateData) => {

    const newPublisherData = await publisherModel.updateOne({
        _id: authorId
    },{
        name: forUpdateData.name,
        cuil: forUpdateData.cuil,
        address: forUpdateData.address

    });

    return newPublisherData
}

const publisherDeleteService = async (authorId) => {

    const deletePublisher = await publisherModel.deleteOne({
        _id: authorId
    });

    return deletePublisher
}
 



const findPublisherByName = async (name) => {

    const publisher = await publisherModel.find({name: name}).exec()

    return publisher

}

module.exports = {
    publisherPostService,
    publishersGetService,
    publisherGetService,
    publisherUpdateService,
    publisherDeleteService,
    findPublisherByName,

}