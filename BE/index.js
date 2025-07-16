//Initializes environment variables
require('dotenv').config();

const process = require('process');

//Brings express.js to the application
const express = require('express');
const server = express();
~
//Enables express.js to use JSON for the responses
server.use(express.json());

// Ensures all responses are JSON and disables default HTML error responses
server.use((req, res, next) => {
  res.type('application/json');
  next();
});

//Calls and initializes a sequelize instance to handle database communication
const sequelize = require('./config/database'); // instância Sequelize

//Database table initialization section.
//Use require('./models/<MODEL_NAME>').sync() to create/update the table

//Authentication component models
require('./components/authentication/authentication-model-sync');

//Authorization component models
require('./components/authorization/authorization-model-sync');

console.log('Finished configuring database');

//Router declaration 
const mainRouter = require('./routers/main-router');
server.use('/', mainRouter);

const errorHandler = require('./middleware/error-handler');

// Rota 404 (não encontrada)
server.use(errorHandler.notFound);

// Erro interno (500)
server.use(errorHandler.internalError);

//Authenticates DB and then launches express.js
sequelize.authenticate()
  .then(() => {
    console.log(`Successfully connected to DB on  ${process.env.DB_USER}@${process.env.DB_HOST}`);
    
    console.log(`Starting an Express.js application on host: ${process.env.DB_HOST}:${process.env.PORT}`);
    server.listen(process.env.PORT, () => {
      console.log(`Express.js application running on host: ${process.env.DB_HOST}:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error initializing appplication:', err));