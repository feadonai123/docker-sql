var connected = '';
const conectDb = async()=>{
  const mysql = require('mysql2/promise');
  if(connected!=='' && connected.state !== 'disconnected'){
    return connected;
  }
  try{
    var connection = await mysql.createConnection({
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });
    console.log("Conectou ao MySql");
    connected = connection;
    console.log("Conectou ao MySql 2 ");
    const querryCreateTable = "("+
      "`iditems` int NOT NULL AUTO_INCREMENT,"+
      "`name` varchar(220) CHARACTER SET utf8 NOT NULL,"+
      "`description` varchar(220) CHARACTER SET utf8 NOT NULL,"+
      "PRIMARY KEY (`iditems`)"+
      ")";
    const warning = await connection.query(`CREATE TABLE IF NOT EXISTS items ${querryCreateTable}`);
    console.log(querryCreateTable);
    console.log(warning)
    return connection;
  }catch(err){
    console.log("erro ao se conectar com mySql: " + err);
  }
}
conectDb();

const getAll = async()=>{
  const db = await conectDb();
  const [rowns] = await db.query('SELECT * FROM items');
  return rowns;
}

const createItem = async({
  name, 
  description
})=>{
  try{
    const db = await conectDb();
    const [rowns] = await db.query(`INSERT INTO items (name, description) VALUES ("${name}", "${description}")`);
    if(rowns.affectedRows>0){
      return true;
    }else{
      return false;
    }
  }catch(err){
    return false;
  }
}

const deleteItem = async({
  id
})=>{
  try{
    const db = await conectDb();
    const [rowns] = await db.query(`DELETE from items WHERE iditems=${id}`);
    if(rowns.affectedRows>0){
      return true;
    }else{
      return false;
    }
  }catch(err){
    return false;
  }
}
module.exports={getAll, createItem, deleteItem}



/*

connection.query(`SELECT * FROM items`, (err, rows, fields)=>{
  if(!err){
    console.log("Sucesso: ");
    const items = rows.map((item)=>{
      return{
        id: item.iditems,
        name: item.name,
        description: item.description
      }
    });
    console.log(items);
  }else{
    console.log("erro ao pegar dados do banco: " + err)
  }
});
//INSERT INTO items (name, description)   VALUES ("banana", "é uma banana normal" )
*/