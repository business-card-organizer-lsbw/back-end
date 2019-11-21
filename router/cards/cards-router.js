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
		.first()
		.then(card => {
			res.status(200).json(card);
		})
		.catch(err => res.status(500).json(err));
});

//get by user id
router.get("/user/:id", restricted, (req, res) => {
	Cards.findByUserId(req.params.id)
		.then(card => {
			res.status(200).json(card);
		})
		.catch(err => res.status(500).json(err));
});

router.put("/", (req, res) => {
	const cardData = req.body;

	Cards.add(cardData)
		.then(card => {
			res.status(201).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "could not process request" });
		});
});

router.post("/", (req, res) => {
	const cardData = req.body;

	Cards.add(cardData)
		.then(card => {
			res.status(201).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "could not process request" });
		});
});

router.put("/:id", restricted, (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Cards.findById(id)
		.then(card => {
			if (card) {
				Cards.update(changes, id).then(updatedCard => {
					res.json(updatedCard);
				});
			} else {
				res.status(404).json({ message: "Could not find Card with given id" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "Failed to update card" });
		});
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Cards.remove(id);

		if (deleted) {
			return res.status(200).json({ removed: deleted });
		} else {
			return res
				.status(404)
				.json({ message: "Could not find Card with given ID" });
		}
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

module.exports = router;
