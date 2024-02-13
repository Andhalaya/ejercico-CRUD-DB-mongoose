
const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const tasksRouter = require('./routes/tasks');

dbConnection();
app.use(express.json());
app.use('/tasks', tasksRouter);


app.listen(PORT, () => console.log(`Express esta escuchando en http://localhost:${PORT}`));