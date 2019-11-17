function find() {
	return db("users").select("id", "username", "password", "department");
}

function findBy(filter) {
	return db("users").where(filter);
}

function findById(id) {
	return db("users")
		.where({ id })
		.first()
		.select("username", "id", "department");
}

async function add(user) {
	return await db("users").insert(user);
}
