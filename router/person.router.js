const express = require('express');
const { getAllPersons, createPerson, updatePerson, deletePerson, getPersonsByColumns } = require('../controller/personController');
const { validatePerson } = require('../middleware/person.dto.middleware');

const personRouter = express.Router();

personRouter.get('/persons', getAllPersons);
personRouter.get('/persons/search', getPersonsByColumns);
personRouter.post('/persons', validatePerson, createPerson);
personRouter.put('/persons/:id', validatePerson, updatePerson);
personRouter.delete('/persons/:id', deletePerson);

module.exports = personRouter;
