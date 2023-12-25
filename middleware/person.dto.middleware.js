const PersonDto = require("../dto/person.dto");

function validatePerson(req, res, next) {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  req.person = new PersonDto(null, name, age);
  next();
}

module.exports = { validatePerson };

