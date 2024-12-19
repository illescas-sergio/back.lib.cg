const {Router} = require('express');
const {
    authorPostController, 
    authorsGetController, 
    authorGetController,
    authorUpdateController,
    authorDeleteController
} = require('../../controllers/authorControllers.js');

const authorsRouter = Router();

authorsRouter.get("/", authorsGetController)

authorsRouter.get("/:id", authorGetController)

authorsRouter.post("/", authorPostController)

authorsRouter.put("/:id", authorUpdateController)

authorsRouter.delete("/:id", authorDeleteController)

module.exports = {
    authorsRouter
}
