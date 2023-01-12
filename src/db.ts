import mysql2 from 'mysql2'
require

const db = mysql2.createConnection({
    host     :   'localhost', 
    user     :    'Chukwuebuka',
    password :    'Chukwuebuka_123',
    database :    'clearance'
});


export = db;