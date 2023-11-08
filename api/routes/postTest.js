var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    console.log('Test');
    const requestData = req.body;
    res.json({ title: 'POST request successful', data: requestData });
});

module.exports = router;
