const db = require("../../data/dbConfig");

module.exports = {
	add,
	findById,
	findByUserId,
	findUserCollection,
	update,
	remove
};

function findById(id) {
	return db("cards_collection").where({ id });
}

// For finding a users card collection
function findByUserId(card_receiver) {
	return db("cards_collection").where({ card_receiver });
}

function findUserCollection(card_receiver) {
	return db("cards_collection")
		.join("cards", "cards_collection.card_id", "cards.id")
		.where("cards_collection.card_receiver", "=", card_receiver)
		.select(
			"cards_collection.id",
			"cards_collection.card_id",
			"event",
			"first_name",
			"last_name",
			"phone",
			"email",
			"company",
			"job",
			"street",
			"city",
			"zip",
			"state",
			"country",
			"website"
		);
}

// For adding a card to a users collection
function add(card) {
	return db("cards_collection").insert(card);
}

// // Postgres
// async function add(card) {
// 	const [newCard] = await db("cards_collection")
// 		.insert(card)
// 		.returning("*");

// 	return newCard;
// }

// //SQLITE3
// function update(changes, id) {
// 	return db("cards_collection")
// 		.where({ id })
// 		.update(changes);
// }

// Postgres
async function update(updated, id) {
	const [updatedCard] = await db("cards_collection")
		.where({ id })
		.update(updated)
		.returning("*");
	return updatedCard;
}

function remove(id) {
	return db("cards_collection")
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
