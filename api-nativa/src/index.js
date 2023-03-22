const http = require('http');

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

const jsonHeader = { 'Content-Type': 'application/json' };

const server = http.createServer((req, res) => {
	// GET /hello/:nome -> `Hello, ${name}!`
	if (req.method === 'GET' && /^\/hello\/\w+$/.test(req.url)) {
		const [, , name] = req.url.split('/');
		return res.writeHead(200).end(`Hello ${name}!`);
	}

	// GET /hello -> "Hello world!"
	if (req.method === 'GET' && req.url.startsWith('/hello')) {
		return res.writeHead(200).end('Hello world!');
	}

	// POST /echo
	if (req.method === 'POST' && req.url.startsWith('/echo')) {
		res.writeHead(200);
		req.pipe(res);
		return;
	}

	// *****************************************************

	// API TO-DOs

	// {id, title, text}

	// POST /todos { "text": "string", "title": "string" }
	if (req.method === 'POST' && req.url.startsWith('/todos')) {
		let bodyRaw = '';

		req.on('data', (data) => (bodyRaw += data));

		req.once('end', () => {
			const todo = JSON.parse(bodyRaw);

			todosDatabase.insert(todo).then((inserted) => {
				res.writeHead(201, jsonHeader).end(JSON.stringify(inserted));
			});
		});

		return;
	}

	// GET /todos/:id
	if (req.method === 'GET' && /^\/todos\/\d+$/.test(req.url)) {
		const [, , idRaw] = req.url.split('/');
		const id = parseInt(idRaw);

		todosDatabase.get(id).then((todo) => {
			if (!todo) {
				res.writeHead(404, jsonHeader).end({ message: 'Resource not found' });
			} else {
				res.writeHead(200, jsonHeader).end(todos);
			}
		});

		return;
	}

	// GET /todos
	if (req.method === 'GET' && req.url.startsWith('/todos')) {
		todosDatabase.list().then((todos) => {
			res.writeHead(200, jsonHeader).end(JSON.stringify({ todos }));
		});

		return;
	}

	// DELETE /todos/:id
	if (req.method === 'DELETE' && /^\/todos\/\d+$/.test(req.url)) {
		const [, , idRaw] = req.url.split('/');
		const id = parseInt(idRaw);

		todosDatabase.del(id).then(() => {
			res.writeHead(204, jsonHeader).end();
		});

		return;
	}

	// PUT /todos/:id { "text": "string", "title": "string" }
	if (req.method === 'PUT' && /^\/todos\/\d+$/.test(req.url)) {
		let bodyRaw = '';
		const [, , idRaw] = req.url.split('/');
		const id = parseInt(idRaw);

		req.on('data', (data) => (bodyRaw += data));

		req.once('end', () => {
			const todo = { ...JSON.parse(bodyRaw), id };

			todosDatabase.update(todo).then((updated) => {
				res.writeHead(200, jsonHeader);
				res.end(JSON.stringify(updated));
			});
		});

		return;
	}

	// Not found
	return res.writeHead(404).end('Resource not found.');
});

server.listen(3000, '0.0.0.0', () => {
	console.log('Server started.');
});
