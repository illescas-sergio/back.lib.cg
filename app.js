const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {router} = require('./routes/index.js');


const app = express();

app.use(express.json({limit: "50mb"}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb"}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });


//incorporo el arch .yml
const swaggerDocs = YAML.load('./api.yml')

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/", router);



module.exports = app;