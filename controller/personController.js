
const { getAll, create, update, remove, getByColumns } = require('../SQL/query_builds');
const PersonDTO = require('../dto/person.dto');

const TABLE_NAME = 'persons';
const ID_COLUMN = 'id';

async function getAllPersons(req, res) {
  try {
    const persons = await getAll(TABLE_NAME);
    const personDTOs = persons.map((row) => new PersonDTO(row.id, row.name, row.age));
    res.json(personDTOs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createPerson(req, res) {
  const { name, age } = req.person;
  try {
    const createdPerson = await create(TABLE_NAME, ['name', 'age'], [name, age]);
    res.status(201).json(new PersonDTO(createdPerson.id, createdPerson.name, createdPerson.age));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updatePerson(req, res) {
  const { name, age } = req.body;
  const { id } = req.params;

  try {
    const updatedPerson = await update(TABLE_NAME, ID_COLUMN, id, { name, age });
    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(new PersonDTO(updatedPerson.id, updatedPerson.name, updatedPerson.age));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deletePerson(req, res) {
  const { id } = req.params;

  try {
    const deletedPerson = await remove(TABLE_NAME, ID_COLUMN, id);
    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(new PersonDTO(deletedPerson.id, deletedPerson.name, deletedPerson.age));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPersonsByColumns(req, res) {
    const values = req.query;
  
    try {
    const persons = await getByColumns(TABLE_NAME, values);
    const personDTOs = persons.map((row) => new PersonDTO(row.id, row.name, row.age));
    res.json(personDTOs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllPersons, createPerson, updatePerson, deletePerson, getPersonsByColumns };
