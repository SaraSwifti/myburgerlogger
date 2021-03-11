
const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

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
    burger.create('name', req.body.burger_name, (result) => {
        response.json({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log('condition', condition);
    console.log(req.body.devoured);
    burger.update(req.body.devoured, condition,
        (result) => {
            if (result.changedRows ===0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});




module.exports = router;