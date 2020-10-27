'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const host = 'localhost';

// - setup -
const FILES_DIR = __dirname + '/text-files';
// create the express app
const app = express();

// - use middleware -
// allow Cross Origin Resource Sharing
app.use(cors());
// parse the body
app.use(bodyParser.json());

// https://github.com/expressjs/morgan#write-logs-to-a-file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
// and log to the console
app.use(morgan('dev'));

// statically serve the frontend
app.use(express.static('public')); // call other files

// - declare routes -
// helpful hint:
//  open /public/actions.js next to this file
//  can you figure out which action calls which route?
//  which http method does each action use?
//  what route does each one call?

// read all file names
//  called in init.js
//  redirected to by other routes
app.get('/files', (req, res, next) => {
	fs.readdir(FILES_DIR, (err, list) => {
		if (err && err.code === 'ENOENT') {
			res.status(404).end();
			console.error(err);
			return;
		}
		if (err) {
			// https://expressjs.com/en/guide/error-handling.html
			next(err);
			return;
		}

		res.json(list);
	});
});

// read a file
//  called by action: fetchAndLoadFile
app.get('/files/:action', (req, res, next) => {
	const fileName = req.params.action;

	fs.readFile(`${FILES_DIR}/${fileName}`, 'utf-8', (err, fileText) => {
		if (err && err.code === 'ENOENT') {
			res.status(404).end();
			console.error(err);
			return;
		}
		if (err) {
			// https://expressjs.com/en/guide/error-handling.html
			next(err);
			return;
		}

		const responseData = {
			name: fileName,
			text: fileText,
		};
		res.json(responseData);
	});
});

// write a file
//  called by action: saveFile
app.post('/files/:action', (req, res, next) => {
	const fileName = req.params.action; // read from params
	const fileText = req.body.text; // read from body
	console.log('file text', typeof fileText);
	fs.writeFile(`${FILES_DIR}/${fileName}`, fileText, (err) => {
		if (err && err.code === 'ENOENT') {
			res.status(404).end();
			console.error(err);
			return;
		}

		// https://stackoverflow.com/questions/33214717/why-post-redirects-to-get-and-put-redirects-to-put
		res.redirect(303, '/files');
	});
});

// delete a file
//  called by action: deleteFile
app.delete('/files/:action', (req, res, next) => {
	const fileName = req.params.action; // read from params
	console.log('fileName', fileName);
	fs.unlink(`${FILES_DIR}/${fileName}`, (err) => {
		if (err) {
			res.status(404).end();
			console.error(err);
			return;
		}

		res.redirect(303, '/files');
	});
});

// - handle errors in the routes and middleware -
//  this works, nothing to change!

// https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).end();
});

// - open server -
// try to exactly match the message logged by demo.min.js
app.listen(config.PORT, () => {
	console.log(`App works on http://${host}:${config.PORT} ${config.MODE} mode`);
});
