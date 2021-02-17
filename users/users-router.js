const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
	const department = req.decodedToken.department;
	if (department === "HR" || department === "IT") {
		Users.find()
			.then(users => {
				res.json(users);
			})
			.catch(err => res.send(err));
	} else {
		Users.findBy({ department })
			.then(users => {
				res.json(users);
			})
			.catch(err => res.send(err));
	}
});

module.exports = router;
