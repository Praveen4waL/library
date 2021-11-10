const express = require('express')
const router = express.Router()
require('./routes/crud')(router)
require('./routes/authentication')(router)

router.use(function(req, res, next) {
    const invalidInput = function(err,result) {
        if(err)
        return res.status(400).json(err);
        else
        res.json(result)
    };
    next();
});

module.exports = router