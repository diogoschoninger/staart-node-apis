const logRequest = (req, res, next) => {
	console.log({
		url: req.url,
		method: req.method,
		headers: req.headers,
		body: req.body,
	});

	next();
};

module.exports = logRequest;
