const router = require("express").Router();
const axios = require("axios");

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

//get qr code
router.get("/qrcode/:id", (req, res) => {
	res.setHeader("Content-Type", "image/svg+xml");
	Cards.findById(req.params.id)
		.then(card => {
			res.end(card.qr_svg);
		})
		.catch(err => res.status(500).json(err));
});

router.post("/", restricted, (req, res) => {
	const cardData = req.body;

	Cards.add(cardData)
		.then(card => {
			const id = card.id;
			axios
				.post(
					`https://api.qrserver.com/v1/create-qr-code/?data=${id}&format=svg`
				)
				.then(response => {
					const qr_svg = response.data;
					Cards.update({ qr_svg }, id).then(updated => {
						//added .id for postgres
						res.status(201).json(updated);
					});
				})
				.catch(err => {
					console.log(err);
					return err;
				});
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

router.delete("/:id", restricted, async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Cards.remove(id);

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
