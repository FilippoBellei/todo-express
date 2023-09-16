const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('db.sqlite');
const port = 3000;

// Compression, security, logger and json parser middleware
app.use(compression());
app.use(helmet());
app.use(logger(':date :remote-addr ":method :url" :status'));
app.use(express.json());

// GET /todo
// It returns all the tasks
app.get('/todo', (req, res, next) => {
    const sql = 'SELECT * FROM task;';
    db.all(sql, (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length !== 0) {
            const data = rows;
            res.json({ result: data });
            return;
        }
        res.status(404);
        res.json({ result: false });
    });
});

// GET /todo/id
// It returns a task
app.get('/todo/:id', (req, res, next) => {
    const { id } = req.params;
    const sql = `SELECT * FROM task WHERE id = ?;`;
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
        res.status(404);
        res.json({ result: false });
    });
});

// POST /todo
// It creates a task
// {
//     name:  "name",
//     description: "description"
// }
app.post('/todo', (req, res, next) => {
    const { name, description } = req.body;
    if (name && description) {
        const sql = 'INSERT INTO task (name, description) VALUES(?, ?);';
        db.run(sql, [name, description], (err) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ result: true });
        });
        return;
    }
    res.status(400);
    res.json({ result: false });
});

// PUT /todo/id
// It updates a task
// {
//     name:  "name",
//     description: "description"
// }
app.put('/todo/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (name && description) {
        let sql = `SELECT * FROM task WHERE id = ?;`;
        db.get(sql, id, (err, row) => {
            if (err) {
                next(err);
                return;
            }
            if (row) {
                sql = 'UPDATE task SET name = ?, description = ? WHERE id = ?';
                db.run(sql, [name, description, id], (err) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.json({ result: true });
                });
                return;
            }
            res.status(404);
            res.json({ result: false });
        });
        return;
    }
    res.status(400);
    res.json({ result: false });
});

// DELETE /todo/id
// It deletes a task
app.delete('/todo/:id', (req, res, next) => {
    const { id } = req.params;
    let sql = `SELECT * FROM task WHERE id = ?;`;
    db.get(sql, id, (err, row) => {
        if (err) {
            next(err);
            return;
        }
        if (row) {
            sql = 'DELETE FROM task WHERE id = ?';
            db.run(sql, [id], (err) => {
                if (err) {
                    next(err);
                    return;
                }
                res.json({ result: true });
            });
            return;
        }
        res.status(404);
        res.json({ result: false });
    });
});

// 500 and 404 errors handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.json({ result: false });
});
app.use((req, res) => {
    res.status(404);
    res.json({ result: false });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});
