import mysql2 from 'mysql2'

const db = mysql2.createConnection({
    host     :   'localhost', 
    user     :    'phpmyadmin',
    password :    'Lorenzo',
    database :    'clearance'
});


export = db;