exports.up = function(knex) {
	return knex.schema.table("cards", tbl => {
		tbl.dropColumns("qr_string", "qr_code");
		tbl.text("qr_svg");
	});
};

exports.down = function(knex) {
	return knex.schema.table("cards", tbl => {
		tbl.string("qr_string", 128);
		tbl.binary("qr_code", 128);
		tbl.dropColumn("qr_svg");
	});
};
