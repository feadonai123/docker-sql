const db = require('../db');

module.exports = async(req, res)=>{
  const items = await db.getAll();
  res.send(items);
}