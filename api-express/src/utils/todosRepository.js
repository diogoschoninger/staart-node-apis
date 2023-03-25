const todosDatabase = (() => {
	let idSequence = 1;
	const todos = {};

	const insert = async (todo) => {
		const id = idSequence++;
		const data = { ...todo, id };
		todos[id] = data;
		return data;
	};

	const list = async () => {
		return Object.values(todos);
	};

	const get = async (id) => {
		return todos[id];
	};

	const update = async (todo) => {
		todos[todo.id] = todo;
		return todo;
	};

	const del = async (id) => {
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

module.exports = todosDatabase;
