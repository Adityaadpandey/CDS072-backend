const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator')


const add = require("../Controllers/add");
const get = require("../Controllers/get");






router.get('/', get);
router.post('/add', add);


module.exports = router;