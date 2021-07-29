const db = require('../db');

module.exports = async(req, res)=>{
  const {id} = req.body;
  const response = await db.deleteItem({
    id: id
  });
  res.send(response);
}