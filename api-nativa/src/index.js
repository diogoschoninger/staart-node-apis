const http = require('http');

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

	// POST /todos
	// GET /todos
	// GET /todos/:id
	// DELETE /todos/:id
	// PUT /todos/:id

	// Not found
	return res.writeHead(404).end('Resource not found.');
});

server.listen(3000, '0.0.0.0', () => {
	console.log('Server started.');
});
