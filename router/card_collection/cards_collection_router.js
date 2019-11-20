const router = require("express").Router();

const CardsCollection = require("./card_collection_model");
const restricted = require("../auth/restricted-middleware");

router.post("/", restricted, (req, res) => {
	const cardData = req.body;

	CardsCollection.add(cardData)
		.then(card => {
			res.status(201).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "could not process request" });
		});
});

router.get("/:id", restricted, (req, res) => {
	const { id } = req.params;

	CardsCollection.findByUserId(id)
		.then(cards => {
			res.status(200).json(cards);
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
