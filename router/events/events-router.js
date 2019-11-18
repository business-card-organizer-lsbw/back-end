const router = require("express").Router();

const Events = require("./events-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
	Events.find()
		.then(events => {
			res.status(200).json(events);
		})
		.catch(err => res.status(500).json(err));
});

router.get("/:id", restricted, (req, res) => {
	Events.findById(req.params.id)
		.then(event => {
			res.status(200).json(event);
		})
		.catch(err => res.status(500).json(err));
});
