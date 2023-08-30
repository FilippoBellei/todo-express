const express = require('express');
const app = express();
const port = 3000;

app.get('/todo', (req, res) => {
    res.json({ response: 'data' });
});

app.post('/todo', (req, res) => {
    res.json({ success: true });
});

app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    res.json({ success: true });
});

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});
