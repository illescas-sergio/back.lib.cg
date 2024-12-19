const {Router} = require('express');
const {
    publisherPostController,
    publishersGetController,
    publisherGetController,
    publisherUpdateController,
    publisherDeleteController
   
} = require('../../controllers/publisherControllers.js');

const publishersRouter = Router();



publishersRouter.post("/", async (req, res) => {

    const {name, cuil, address} = req.body;

    const publisher = await publisherPostController(name, cuil, address);
    
    return res.status(200).send(publisher)
   
});

publishersRouter.get("/", async (req, res) => {

    const publishers = await publishersGetController();
    
    return res.status(200).send(publishers)
       
})


publishersRouter.get("/:id", async (req, res) => {

    const {id} = req.params;

    const publisher = await publisherGetController(id);

    return res.status(200).send(publisher)
   
})


publishersRouter.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {name, cuil, address} = req.body;

    const updatedData = {
        name,
        cuil,
        address
    }

    const publisherUpdate = await publisherUpdateController(id, updatedData)

    return res.status(200).send(publisherUpdate)
})

publishersRouter.delete("/:id", async (req, res) => {

    const {id} = req.params;

    const deletePublisher = await publisherDeleteController(id);

    return res.status(200).send(deletePublisher)
})
module.exports = {
    publishersRouter,
}

