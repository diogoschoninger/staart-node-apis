const express = require('express');

const app = express();

app.use(express.json());

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const todosDatabase = (() => {
	let idSequence = 1;
	const todos = {};

	const insert = async (todo) => {
		await wait(500);
		const id = idSequence++;
		const data = { ...todo, id };
		todos[id] = data;
		return data;
	};

	const list = async () => {
		await wait(100);
		return Object.values(todos);
	};

	const get = async (id) => {
		await wait(100);
		return todos[id];
	};

	const update = async (todo) => {
		await wait(500);
		todos[todo.id] = todo;
		return todo;
	};

	const del = async (id) => {
		await wait(500);
		delete todos[id];
	};

	return {
		insert,
		list,
		get,
		update,
		del,
	};
})();

app.get('/todos', async (req, res) => {
	found = await todosDatabase.list();

	res.status(200).json(todos).end();
});

app.get('/todos/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	const found = await todosDatabase.get(id);

	if (!found)
		return res.status(404).json({ message: 'Resource not found' }).end();

	res.status(200).json(todo).end();
});

app.post('/todos', async (req, res) => {
	const todo = req.body;

	const inserted = await todosDatabase.insert(todo);

	res.status(201).header('Location', `/todos/${inserted.id}`).json(todo).end();
});

app.put('/todos/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const todo = { ...req.body, id };

	const found = await todosDatabase.get(id);

	if (!found)
		return res.status(404).json({ message: 'Resource not found' }).end();

	const updated = await todosDatabase.update(todo);
	res.status(200).json(updated).end();
});

app.delete('/todos/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	const found = await todosDatabase.get(id);
	if (!found)
		return res.status(404).json({ message: 'Resource not found' }).end();

	await todosDatabase.del(id);
	res.status(204).end();
});

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
