const jwt = require("jsonwebtoken");

module.exports = user => {
	const payload = {
		sub: user.id,
		username: user.username,
		role: user.role
	};
	const options = {
		expiresIn: "1d"
	};

	return jwt.sign(payload, process.env.JWT_SECRET, options);
};
