exports.up = function(knex) {
	return knex.schema.createTable("events", tbl => {
		tbl.increments();

		tbl.string("title", 128).notNullable();
		tbl.string("date", 128);
		tbl.string("description", 128).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("events");
};
