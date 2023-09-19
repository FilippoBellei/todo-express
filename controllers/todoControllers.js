const express = require('express');
const db = require('../db/db');

const router = express.Router();

// GET /todo
// It returns all the tasks
router.get('/', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
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
router.post('/', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
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

module.exports = router;
