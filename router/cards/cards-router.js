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
