// const request = require("supertest");

// const cards = require("./cards-router");

// describe("cards", () => {
// 	it("db environment set to testing", () => {
// 		expect(process.env.NODE_ENV).toBe("testing");
// 	});

// 	describe("POST /cards", () => {
// 		it("should return a status of 201 Created", () => {
// 			return request(cards)
// 				.post("/cards")
// 				.send({ user_id: 1 })
// 				.then(res => {
// 					expect(res.status).toBe(201);
// 				});
// 		});
// 	});

// 	describe("DELETE /cards/:id", () => {
// 		it("should return a status of 200 ok", () => {
// 			return request(cards)
// 				.delete("/1")
// 				.then(res => {
// 					expect(res.status).toBe(200);
// 				});
// 		});
// 	});
// });
