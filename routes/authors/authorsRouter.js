const {Router} = require('express');
const {
    authorPostController, 
    authorsGetController, 
    authorGetController,
    authorUpdateController,
    authorDeleteController
} = require('../../controllers/authorControllers.js');

const authorsRouter = Router();

authorsRouter.get("/", async (req, res) => {

    const authors = await authorsGetController();

    return res.status(200).send(authors)
   
})

authorsRouter.get("/:id", async (req, res) => {

    const {id} = req.params;

    const author = await authorGetController(id);

    return res.status(200).send(author)
   
})

authorsRouter.post("/", async (req, res) => {

    const {first_name, last_name, dni, country} = req.body;

    const author = await authorPostController(first_name, last_name, dni, country)
    
    return res.status(200).send(author)
})

authorsRouter.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {first_name, last_name, dni, country} = req.body;

    const updatedData = {
        first_name,
        last_name,
        dni,
        country
    }

    const authorUpdate = await authorUpdateController(id, updatedData)

    return res.status(200).send(authorUpdate)
})

authorsRouter.delete("/:id", async (req, res) => {

    const {id} = req.params;

    const deleteAuthor = await authorDeleteController(id);

    return res.status(200).send(deleteAuthor)
})

module.exports = {
    authorsRouter
}




 
// tasksRouter.delete("/:id", isAuthDtoValidationMiddleware, async (req, res) => {
//     const {id} = req.params;
//     if(!id) return res.status(404).send("No es posible identificar el elemento")
//     const delTask = await deleteTask(id);
//     if(!delTask) return res.status(502).send("algo salió mal")
//     return res.status(200).send(delTask)
// });

// module.exports = {
//     tasksRouter
// }