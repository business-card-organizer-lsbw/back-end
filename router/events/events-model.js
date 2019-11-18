const db = require("../../data/dbConfig");

module.exports = {
	add,
	find,
	findBy,
	findById,
	findByTitle,
	remove,
	update
};

function find() {
	return db("events").select("*");
}

function findBy(filter) {
	return db("events").where(filter);
}

function findById(id) {
	return db("events")
		.where({ id })
		.first();
}

function findByTitle(title) {
	return db("events")
		.where({ title })
		.first();
}

async function add(event) {
	const [newEvent] = await db("events")
		.insert(event)
		.returning("*");

	return newEvent;
}

async function update(updated, id) {
	const [updatedEvent] = await db("events")
		.where({ id })
		.update(updated)
		.returning("*");
	return updatedEvent;
}

function remove(id) {
	return db("events")
		.where({ id })
		.del()
		.then(event => {
			if (event) {
				return event;
			} else {
				return null;
			}
		});
}
