// Update with your config settings.

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./data/users.db3"
		},
		useNullAsDefault: true,
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			}
		},
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		}
	},

	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		useNullAsDefault: true,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		}
	}
};
