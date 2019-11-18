exports.seed = function(knex) {
	return knex("users")
		.truncate()
		.then(function() {
			return knex("users").insert([
				{
					username: "admin",
					password: "password",
					email: "admin@gmail.com",
					role: "ADMIN"
				},
				{
					username: "admin2",
					password: "password",
					email: "admin2@gmail.com",
					role: "ADMIN"
				},
				{
					username: "justin",
					password: "1234",
					email: "justin@gmail.com",
					role: ""
				}
			]);
		});
};
