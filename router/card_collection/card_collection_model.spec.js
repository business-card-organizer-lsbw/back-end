const db = require("../../data/dbConfig");

const Collection = require("./card_collection_model");

describe("cards_collection_model", () => {
	beforeEach(async () => {
		await db("cards_collection").truncate();
	});

	describe("add()", () => {
		it("should add the card users collection", async () => {
			const query = await Collection.add({
				card_receiver: 1,
				card_id: 1
			});
			console.log(query);

			const cards = await db("cards");

			expect(cards).toHaveLength(0);
		});
	});
	describe("remove()", () => {
		it("should remove the card from the users collection", async () => {
			const query = await Collection.remove(2);

			const cards = await db("cards");

			expect(cards).toHaveLength(0);
		});
	});
});
