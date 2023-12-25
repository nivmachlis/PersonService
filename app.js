// app.js
const express = require('express');
const bodyParser = require('body-parser');
const personRouter = require('./router/person.router');
const { initializeDatabase } = require('./SQL/postgresql');

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase(); 
app.use(bodyParser.json());

app.use('/api', personRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
