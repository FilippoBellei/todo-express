const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('db.sqlite');
const port = 3000;

app.use(morgan(':date :remote-addr ":method :url" :status'));
app.use(express.json());

app.get('/todo', (req, res, next) => {
    db.all('SELECT * FROM task;', (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length !== 0) {
            const data = rows;
            res.json({ result: data });
            return;
        }
        res.status(404).json({ result: false });
    });
});

app.get('/todo/:id', (req, res, next) => {
    const { id } = req.params;
    sql = `SELECT * FROM task WHERE id = ?;`;
    db.get(sql, id, (err, row) => {
        if (err) {
            next(err);
            return;
        }
        if (row) {
            const data = row;
            res.json({ result: data });
            return;
        }
        res.status(404).json({ result: false });
    });
});

app.post('/todo', (req, res, next) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO task (name, description) VALUES(?, ?);';
    db.run(sql, [name, description], (err) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ result: true });
    });
});

app.put('/todo/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = 'UPDATE task SET name = ?, description = ? WHERE id = ?';
    db.run(sql, [name, description, id], (err) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ result: true });
    });
});

app.delete('/todo/:id', (req, res, next) => {
    const { id } = req.params;
    sql = 'DELETE FROM task WHERE id = ?';
    db.run(sql, [id], (err) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ result: true });
    });
});

app.use((req, res, next) => res.status(404).json({ result: false }));
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ result: false });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});
