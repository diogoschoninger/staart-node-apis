const express = require('express');
const router = require('./routes.js');
const logger = require('../middlewares/logger');

const app = express();

app.use(express.json());

app.use('/todos', logger, router);

app.all('*', (req, res) =>
	res.status(404).json({ message: 'This endpoint not exists' }).end()
);

app
	.listen(3333, '0.0.0.0', () => {
		console.log('Server started.');
	})
	.once('error', () => {
		console.error(error);
		process.exit(1);
	});
