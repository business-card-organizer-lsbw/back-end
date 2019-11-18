const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
	const role = req.decodedToken.role;
	if (role === "ADMIN") {
		Users.find()
			.then(users => {
				res.json(users);
			})
			.catch(err => res.send(err));
	} else {
		Users.findBy({ role })
			.then(users => {
				res.json(users);
			})
			.catch(err => res.send(err));
	}
});

module.exports = router;
