const db = require('../db/db');

const sql =
    'CREATE TABLE task (id INTEGER PRIMARY KEY, name TEXT, description TEXT);';

// Initialize database
db.run(sql, (err) => {
    if (err) {
        console.error('Error during database initialization:');
        console.error(err);
        return;
    }
    console.log('Database initialized');
    db.close();
});
