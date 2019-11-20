exports.up = function(knex) {
	return knex.schema.createTable("cards_collection", tbl => {
		tbl.increments();

		tbl
			.integer("card_receiver")
			.notNullable()
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");

		tbl
			.integer("card_id")
			.notNullable()
			.references("id")
			.inTable("cards")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		tbl.string("event", 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("cards_collection");
};
