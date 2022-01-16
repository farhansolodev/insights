const firebase = require("firebase-admin")
const { db } = require("../app")

const DEFAULTS = {
	picture: "gs://insights-server-fd594.appspot.com/profile-pictures/default_profile_picture.jpg",
}

module.exports = {
	create: (options) => {
		try {
			return db.collection("collabs").add({
				name: options.name,
				description: "",
				pfp: DEFAULTS.picture,
				previousRooms: [],
				previousCollabs: [],
			})
		} catch (error) {
			throw error
		}
	},

	addRoom: (userId, roomId) => {
		try {
			db.collection("users")
				.doc(userId)
				.update({
					previousRooms: firebase.firestore.FieldValue.arrayUnion(roomId),
				})
		} catch (error) {
			throw error
		}
	},
}
