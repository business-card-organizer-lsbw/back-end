const db = require("../../data/dbConfig");

const Users = require("./users-model");

describe("users-model", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	describe("add()", () => {
		it("should add the user into the database", async () => {
			const query = await Users.add({
				username: "test",
				password: "test",
				email: "test@gmail.com"
			});
			console.log(query);

			const users = await db("users");

			expect(users).toHaveLength(1);
		});
	});
});
