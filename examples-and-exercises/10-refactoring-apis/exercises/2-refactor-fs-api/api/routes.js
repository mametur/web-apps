const handlers = require('./handlers.js');
const express = require('express');

// create the router
router = express.Router();

router.use((req, res, next) => {
	console.log('routes!');
	next();
});

router.get('/', (req, res) => {
	res.send('routes!');
});

// write the routes!
router.post('/param/:value', handlers.paramValue);

router.post('/query', handlers.queryValue);

router.post('/body', handlers.bodyValue);

module.exports = router;
