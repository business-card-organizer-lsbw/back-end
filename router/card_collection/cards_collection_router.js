const router = require("express").Router();

const CardsCollection = require("./card_collection_model");
const restricted = require("../auth/restricted-middleware");

router.post("/", restricted, (req, res) => {
	const cardData = req.body;

	CardsCollection.findByUserId(cardData.card_receiver).then(cards => {
		if (
			cards.length &&
			cards.filter(item => item.card_id == cardData.card_id).length
		) {
			res.status(400).json({ message: "this card has already been added" });
		} else {
			CardsCollection.add(cardData)
				.then(card => {
					res.status(201).json(card);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({ message: "could not process request" });
				});
		}
	});
});

router.get("/:id", restricted, (req, res) => {
	const { id } = req.params;

	CardsCollection.findUserCollection(id)
		.then(cards => {
			res.status(200).json(cards);
		})
		.catch(err => res.status(500).json(err));
});

router.put("/:id", restricted, (req, res) => {
	const { id } = req.params;
	const changes = req.body.event;

	if (!changes) {
		res.status(400).json({ message: "User may only update event field" });
	} else {
		CardsCollection.findById(id)
			.then(card => {
				if (card) {
					CardsCollection.update({ event: changes }, id).then(updatedCard => {
						res.json(updatedCard);
					});
				} else {
					res
						.status(404)
						.json({ message: "Could not find Card with given id" });
				}
			})
			.catch(err => {
				res.status(500).json({ message: "Failed to update card" });
			});
	}
});

router.delete("/:id", restricted, async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await CardsCollection.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res.status(404).json({ message: "Could not find Card with given ID" });
		}
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

module.exports = router;
