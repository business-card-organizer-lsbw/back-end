const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");
const validateUser = require("../users/users-helpers");
const generateToken = require("./token");

router.post("/register", (req, res) => {
	let user = req.body;
	const validUser = validateUser(user);
	if (validUser.isSuccessful) {
		const hash = bcrypt.hashSync(user.password, 14);
		user.password = hash;

		Users.add(user)
			.then(user => {
				Users.findById(user[0]).then(user => {
					res.status(201).json(user);
				});
			})
			.catch(error => {
				res.status(500).json(error);
			});
	} else {
		req.status(400).json({
			message: "Invalid information about the user",
			errors: validateResult.errors
		});
	}
});

router.post("/login", (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message: `Welcome ${user.username}`,
					user,
					token
				});
			} else {
				res.status(401).json({ message: "Invalid Credentials" });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

module.exports = router;
