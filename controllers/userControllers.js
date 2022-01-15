const User = require("../models/User")

// CREATE

const createUser = (req, res) => {
	// Part 2
	const user = new User({
		name: req.body.name,
		description: req.body.description,
	})

	res.json(user)

	// Part 3
	// const user = new User()
	// fetch('www.insights-server.com/users?name=Susan&Password=dh39h392h&','POST')
	// user.setName(req.params.name)
}

// READ
const getUserById = (req, res) => {
	// Part 2
	// Part 3
}

const getUserID = (req, res) => {
	// Part 2
	// Part 3
}

const getUserName = (req, res) => {
	// Part 2
	// Part 3
}

const getUserPfp = (req, res) => {
	// Part 2
	// Part 3
}

const getUserDescription = (req, res) => {
	// Part 2
	// Part 3
}

const getUserPreviousRooms = (req, res) => {
	// Part 2
	// Part 3
}

const getUserPreviousCollabs = (req, res) => {
	// Part 2
	// Part 3
}

//UPDATE
const updateUserID = (req, res) => {
	// Part 2
	// Part 3
}

const updateUserName = (req, res) => {
	// Part 2
	// Part 3
}

const updateUserDescription = (req, res) => {
	// Part 2
	// Part 3
}

const updateUserPfp = (req, res) => {
	// Part 2
	// Part 3
}

// DELETE
const deleteUser = (req, res) => {
	// Part 2
	// Part 3
}

module.exports = {
	createUser,
	getUserID,
	getUserById,
	getUserName,
	getUserPfp,
	getUserDescription,
	getUserPreviousRooms,
	getUserPreviousCollabs,
	updateUserID,
	updateUserName,
	updateUserDescription,
	updateUserPfp,
	deleteUser,
}
