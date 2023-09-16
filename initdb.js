const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const sql =
    'CREATE TABLE task (id INTEGER PRIMARY KEY, name TEXT, description TEXT);';

// Initialize the database
db.run(sql, (error) => {
    if (error) {
        console.error('Error during database initialization:');
        console.error(error);
        return;
    }
    console.log('Database initialized');
    db.close();
});
