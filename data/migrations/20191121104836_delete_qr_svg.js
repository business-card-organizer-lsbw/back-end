exports.up = function(knex) {
	return knex.schema.table("cards", tbl => {
		tbl.dropColumn("qr_svg");
	});
};

exports.down = function(knex) {
	return knex.schema.table("cards", tbl => {
		tbl.text("qr_svg");
	});
};
