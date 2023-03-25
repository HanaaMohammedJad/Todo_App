var express = require('express');
var router = express.Router();

/**
 * Home Page Route
 */
router.get('/', (req, res) => {
    res.send("Welcome in TODO App !!!!!")
});

module.exports = router;