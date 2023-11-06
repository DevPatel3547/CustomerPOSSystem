var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    console.log('Test');
    // let data = { response: 'You sent: ' + req.body.message};
    // res.status(200).send(data);
    const requestData = req.body;
    res.json({ title: 'POST request successful', data: requestData });
});

module.exports = router;
