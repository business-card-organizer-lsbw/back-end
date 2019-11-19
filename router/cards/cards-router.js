const router = require("express").Router();

const Cards = require("./cards-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
	Cards.find()
		.then(cards => {
			res.status(200).json(cards);
		})
		.catch(err => res.status(500).json(err));
});

router.get("/:id", restricted, (req, res) => {
	Cards.findById(req.params.id)
		.then(card => {
			res.status(200).json(card);
		})
		.catch(err => res.status(500).json(err));
});

router.post("/", (req, res) => {
	const cardData = req.body;
	console.log(cardData);

	Cards.add(cardData)
		.then(card => {
			res.status(201).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "could not process request" });
		});
});

// router.put("/:id", restricted, async (req, res) => {
// 	const { id } = req.params;
// 	const changes = req.body;
// 	try {
// 		const card = await Cards.findById(id);

// 		if (card) {
// 			const updatedCard = await Cards.update(changes, id);
// 			res.status(200).json(updatedCard);
// 		} else {
// 			res.status(404).json({ message: "Could not find card with that ID" });
// 		}
// 	} catch (err) {
// 		res.status(500).json({ message: "Something went wrong" });
// 	}
// });

// router.delete("/:id", restricted, async (req, res) => {
// 	const { id } = req.params;

// 	try {
// 		const deleted = await Cards.remove(id);

// 		if (deleted) {
// 			res.json({ removed: deleted });
// 		} else {
// 			res.status(404).json({ message: "Could not find Card with given ID" });
// 		}
// 	} catch (err) {
// 		res.status(500).json({ message: "Something went wrong" });
// 	}
// });

module.exports = router;
