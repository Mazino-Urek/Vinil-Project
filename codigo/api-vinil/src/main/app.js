'use strict';

const express = require('express');
const parser = require('body-parser');

const app = express();
const router = express.Router();

const rota = router.get('/', (req, res, next)  => {
    res.status(200).send({
        title: "todo certo por aqui",
        version: "0.0.1"
    });
});

app.use('/', rota);



module.exports = app;