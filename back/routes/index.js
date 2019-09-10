var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('\n\nSESSION\n\n', req.session)
    if (req.session.views) {
      req.session.views++
    } else {
      console.log('first view')
      req.session.views = 1;
    }
    res.set('Content-Type', 'text/html');
    res.send(`<div><h1>mouahahahah</h1><p>${req.session.views}nth visit</p></div>`);
});

module.exports = router;
