const { collection, getDocs } = require("firebase/firestore")
const { db } = require("../app")

module.exports = class User {
	// when a new user is created
	constructor(options) {
		this.setId(uuidv4())
		this.setName(options.name || null)
		this.setDescription(options.description || null)
		this.pfp = null
		this.previousRooms = []
		this.previousCollabs = []
	}

	getPfp() {
		return this.pfp
	}

	getId() {
		return this.id
	}

	getName() {
		return this.name
	}

	getDescription() {
		return this.description
	}

	getPreviousRooms() {
		return this.previousRooms
	}

	getPreviousCollabs() {
		return this.previousCollabs
	}

	setPfp(pfp_base64) {}

	setId(id) {
		this.id = id
	}

	setName(name) {
		this.name = name
	}

	setDescription(description) {
		this.description = description
	}

	addRoomToPreviousRooms(roomId) {
		this.previousRooms.push(roomId)
	}

	addCollabToPreviousCollabs(collabID) {
		this.previousCollabs.push(collabID)
	}
}
