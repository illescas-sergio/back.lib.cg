const { 
    authorsGetService,
    authorGetService,
    authorPostService,
    authorUpdateService,
    authorDeleteService
} = require('../services/authorServices.js');
const {dniVal} = require('../helpers/dniValidator.js');


const authorPostController = async (req, res) => {

    const {first_name, last_name, dni, country} = req.body;

    if(!first_name || !last_name || !dni || !country) return res.status(400).send("Faltan datos");

    const validDni = dniVal(dni)
    
    if(!validDni) return res.status(400).send("Datos incorrectos");

    const author = await authorPostService(first_name, last_name, dni, country)
    if(!author) return res.status(400).send(author)

    return res.status(201).send(author)
}



const authorsGetController = async (req, res) => {

    const authors = await authorsGetService();
    if(!authors) return res.status(404).send(authors)

    return res.status(200).send(authors)
}

const authorGetController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

    const author = await authorGetService(id);
    if(!author) return res.status(404).send(author)

    return res.status(200).send(author)
}
 
const authorUpdateController = async (req, res) => {

    const {id} = req.params;
    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

        //Agregué esto
    const author = await authorGetService(id);
    if(!author) return res.status(404).send("No existe el autor")

    const {first_name, last_name, dni, country} = req.body;
    if(!first_name || !last_name || !dni || !country) return res.status(400).send("Faltan datos");

    const validDni = dniVal(dni)
    if(!validDni) return res.status(400).send("Datos incorrectos");

    const updatedData = {
        first_name,
        last_name,
        dni,
        country
    }

    const authorUpdate = await authorUpdateService(id, updatedData)
    if(!authorUpdate) return res.status(400).send(authorUpdate)

    return res.status(200).send(authorUpdate)
}

const authorDeleteController = async (req, res) => {

    const {id} = req.params;

    if(!id || id.length < 24) return res.status(404).send("No se encuentra")

    const deleteAuthor = await authorDeleteService(id);

    if(!deleteAuthor) return res.status(404).send();

    return res.status(200).send(deleteAuthor)
}


module.exports = {
    authorPostController,
    authorsGetController,
    authorGetController,
    authorUpdateController,
    authorDeleteController
}
