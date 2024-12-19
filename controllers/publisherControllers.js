const { publisherModel } = require('../schemas/PublisherSchema.js');
const {
    publisherPostService,
    publishersGetService,
    publisherGetService,
    publisherUpdateService,
    publisherDeleteService,
} = require('../services/publisherServices.js');
const { cuilVal } = require('../helpers/cuilValidator.js');


const publisherPostController = async (req, res) => {

    const {name, cuil, address} = req.body;

    if(!name|| !cuil || !address) return res.status(400).send("Faltan datos");

    const validCuil = cuilVal(cuil)
    if(!validCuil) return res.status(400).send("Datos incorrectos");

    const publisher = await publisherPostService(name, validCuil, address);
    if(!publisher) return res.status(400).send(publisher)
    
    return res.status(201).send(publisher)
}


const publishersGetController = async (req, res) => {

    const publishers = await publishersGetService();

    if(!publishers) return res.status(404).send(publishers)
    
    return res.status(200).send(publishers)
       
}


const publisherGetController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

    const publisher = await publisherGetService(id);
    if(!publisher) return res.status(404).send(publisher)

    return res.status(200).send(publisher)
}
 
const publisherUpdateController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")
    const {name, cuil, address} = req.body;

    const validCuil = cuilVal(cuil)
    if(!validCuil) return res.status(400).send("Datos incorrectos");

    const updatedData = {
        name,
        validCuil,
        address
    }

    const publisherUpdate = await publisherUpdateService(id, updatedData)
    if(!publisherUpdate) return res.status(400).send(publisherUpdate)

    return res.status(200).send(publisherUpdate)
}


const publisherDeleteController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")
        
    const deletePublisher = await publisherDeleteService(id);
    if(!deletePublisher) return res.status(404).send(deletePublisher);

    return res.status(200).send(deletePublisher)
}


module.exports = {
    publisherPostController,
    publishersGetController,
    publisherGetController,
    publisherUpdateController,
    publisherDeleteController
}
