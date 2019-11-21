const db = require("../../data/dbConfig");

const Cards = require("./cards-model");

describe("cards-model", () => {
	beforeEach(async () => {
		await db("cards").truncate();
	});

	describe("add()", () => {
		it("should add the card into the database", async () => {
			const query = await Cards.add({
				user_id: 1,
				first_name: "Justin",
				last_name: "Brandley"
			});
			console.log(query);

			const cards = await db("cards");

			expect(cards).toHaveLength(1);
		});
	});
	describe("remove()", () => {
		it("should remove the card from the database", async () => {
			const query = await Cards.remove(2);

			const cards = await db("cards");

			expect(cards).toHaveLength(0);
		});
	});
});
