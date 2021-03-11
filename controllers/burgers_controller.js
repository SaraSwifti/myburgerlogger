
const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

router.get('/', (request, response) => {
    burger.all((data) => {
        const results = data.map((data) => ({
            ...data,
        }))
        console.log(results);
        const burgerData = {
            burger: results
        };
        // console.log(data);
        console.log(burgerData);
        response.render('index', burgerData);
    });
});

router.post('/api/burgers', (req, response) => {
    burger.create('name', req.body.name, (result) => {
        response.json({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log('condition', condition);
    console.log(req.body.eaten);
    burger.update(req.body.eaten, condition,
        (result) => {
            if (result.changedRows ===0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    burger.delete(condition, (result) => {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    })
})

module.exports = router;