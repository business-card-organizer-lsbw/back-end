const db = require("../../data/dbConfig");

module.exports = {
	add,
	findByUserId
};

// For finding a users card collection
function findByUserId(card_receiver) {
	return db("cards_collection").where({ card_receiver });
}

// For adding a card to a users collection
function add(card) {
	return db("cards_collection").insert(card);
}
