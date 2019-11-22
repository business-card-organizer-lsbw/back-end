const request = require("supertest");
const db = require("../../data/dbConfig");
const express = require("express");
const app = express();
const cards = require("./cards-router");

app.use(cards);

describe("cards", () => {
	beforeEach(async () => {
		await db("cards").truncate();
	});
	it("db environment set to testing", () => {
		expect(process.env.NODE_ENV).toBe("testing");
	});

	describe("DELETE /:id", () => {
		it("should return a status of 200 ok", async () => {
			await db("cards").insert({
				user_id: 1,
				id: 1
			});
			const res = await request(app).delete("/1");

			expect(res.status).toBe(200);
		});
	});
});
