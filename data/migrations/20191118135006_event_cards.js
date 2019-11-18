exports.up = function(knex) {
	return knex.schema.createTable("event_cards", tbl => {
		tbl.increments();

		tbl
			.integer("card_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("cards")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		tbl
			.integer("event_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("events")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("event_cards");
};
