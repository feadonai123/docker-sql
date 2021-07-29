const db = require('../db');

module.exports = async(req, res)=>{
  const {name, description} = req.body;
  const response = await db.createItem({
    name: name,
    description: description,
  });
  res.send(response);
}