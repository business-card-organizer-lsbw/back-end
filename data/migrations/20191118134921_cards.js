exports.up = function(knex) {
	return knex.schema.createTable("cards", tbl => {
		tbl.increments();

		tbl
			.integer("user_id")
			.notNullable()
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");

		tbl.string("first_name", 128);
		tbl.string("last_name", 128);
		tbl.string("phone", 128);
		tbl.string("email", 128);
		tbl.string("company", 128);
		tbl.string("job", 128);
		tbl.string("street", 128);
		tbl.string("city", 128);
		tbl.integer("zip", 128);
		tbl.string("state", 128);
		tbl.string("country", 128);
		tbl.string("website", 128);
		tbl.string("qr_string", 128);
		tbl.binary("qr_code", 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("cards");
};
