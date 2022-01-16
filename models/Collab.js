const { db } = require("../app")

const DEFAULTS = {
	name: "Untitled",
	picture: "gs://insights-server-fd594.appspot.com/collab-display-pictures/default_collab_cover.png",
}

module.exports = {
	create: (options) => {
		try {
			return db
				.collection("collabs")
				.add({
					name: DEFAULTS.name,
					displayPicture: DEFAULTS.picture,
					owners: options.owners,
					contributors: [],
					content: [],
				})
		} catch (error) {
			throw error
		}
	},
}
