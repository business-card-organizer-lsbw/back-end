const db = require("../data/dbConfig");

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find() {
	return db("users").select("id", "username", "password", "role");
}

function findBy(filter) {
	return db("users").where(filter);
}

function findById(id) {
	return db("users")
		.where({ id })
		.first()
		.select("username", "id", "role");
}

async function add(user) {
	return await db("users").insert(user);
}
