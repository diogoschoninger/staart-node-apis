const todosDatabase = require('./utils/todosRepository');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
	found = await todosDatabase.list();

	res.status(200).json(found).end();
});

router.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	const found = await todosDatabase.get(id);

	if (!found)
		return res.status(404).json({ message: 'Resource not found' }).end();

	res.status(200).json(found).end();
});

router.post('/', async (req, res) => {
	const todo = req.body;

	const inserted = await todosDatabase.insert(todo);

	res.status(201).header('Location', `/todos/${inserted.id}`).json(todo).end();
});

router.put('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const todo = { ...req.body, id };

	const found = await todosDatabase.get(id);

	if (!found)
		return res.status(404).json({ message: 'Resource not found' }).end();

	const updated = await todosDatabase.update(todo);
	res.status(200).json(updated).end();
});

router.delete('/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	const found = await todosDatabase.get(id);
	if (!found)
		return res.status(404).json({ message: 'Resource not found' }).end();

	await todosDatabase.del(id);
	res.status(204).end();
});

module.exports = router;
