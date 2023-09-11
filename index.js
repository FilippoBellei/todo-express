const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('db.sqlite');
const port = 3000;

app.use(express.json());

app.get('/todo', (req, res) => {
    db.all('SELECT * FROM task;', (error, rows) => {
        if (error) {
            res.json({ error: error });
            return;
        }
        data = null;
        if (rows) data = rows;
        res.json({ response: data });
    });
});

app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM task WHERE id = ?;`, [id], (error, row) => {
        if (error) {
            res.json({ error: error });
            return;
        }
        data = null;
        if (row) data = row;
        res.json({ response: data });
    });
});

app.post('/todo', (req, res) => {
    const { name, description } = req.body;
    db.run(
        'INSERT INTO task (name, description) VALUES(?, ?);',
        [name, description],
        (error) => {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ success: true });
        }
    );
});

app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run(
        'UPDATE task SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        (error) => {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ success: true });
        }
    );
});

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM task WHERE id = ?', [id], (error) => {
        if (error) {
            res.json({ error: error });
            return;
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});
