const {Router} = require('express');
const {
    publisherPostController,
    publishersGetController,
    publisherGetController,
    publisherUpdateController,
    publisherDeleteController
   
} = require('../../controllers/publisherControllers.js');

const publishersRouter = Router();



publishersRouter.post("/", publisherPostController);

publishersRouter.get("/", publishersGetController);


publishersRouter.get("/:id", publisherGetController)


publishersRouter.put("/:id", publisherUpdateController)

publishersRouter.delete("/:id", publisherDeleteController)
module.exports = {
    publishersRouter,
}

