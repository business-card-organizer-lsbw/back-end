exports.up = function(knex) {
	return knex.schema.createTable("cards_collection", tbl => {
		tbl.increments();

		tbl
			.integer("card_receiver")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		tbl
			.integer("card_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("cards")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("cards_collection");
};
