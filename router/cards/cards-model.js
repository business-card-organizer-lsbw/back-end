const db = require("../../data/dbConfig");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update
};

function find() {
	return db("cards").select("*");
}

function findBy(filter) {
	return db("cards").where(filter);
}

function findById(id) {
	return db("cards").where({ id });
}

// // SQLITE3
// function add(card) {
// 	return db("cards").insert(card);
// }

// Postgres
async function add(card) {
	const [newCard] = await db("cards")
		.insert(card)
		.returning("*");

	return newCard;
}

// //SQLITE3
// function update(changes, id) {
// 	return db("cards")
// 		.where({ id })
// 		.update(changes);
// }

// Postgres
async function update(updated, id) {
	const [updatedCard] = await db("cards")
		.where({ id })
		.update(updated)
		.returning("*");
	return updatedCard;
}

function remove(id) {
	return db("cards")
		.where({ id })
		.del()
		.then(card => {
			if (card) {
				return card;
			} else {
				return null;
			}
		});
}
