const { db } = require("../app")

module.exports = class Collab {
	constructor(options) {
		this.id = options.id || null
		this.name = options.name || null
		this.displayPic = options.displayPic || "gs://insights-server-fd594.appspot.com/collab-display-pictures/default_collab_cover.png"
		this.content = options.content || []
		this.contributors = options.contributors || []
		this.owners = options.owners || []
	}

	serialize() {
		return {
			id: this.id,
			name: this.name,
			displayPic: this.displayPic,
			content: this.content,
			contributors: this.contributors,
			owners: this.owners,
		}
	}

	async save() {
		try {
			const res = await db.collection("collabs").add(this.serialize())
			const id = res._path.segments[1]
			this.setId(id)
			return res
			// const collref = collection(db, "collabs")
			// return await addDoc(collref, this.serialize())
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	getId() {
		return this.id
	}

	getName() {
		return this.name
	}

	getDisplayPic() {
		return this.displayPic
	}

	getContent() {
		return this.content
	}

	getContributors() {
		return this.contributors
	}

	getOwners() {
		return this.owners
	}

	async setId(id) {
		this.id = id
		return db.collection("collabs").doc(id).update({id: id})
	}

	setName(name) {
		this.name = name
	}

	setDisplayPic(dp) {
		this.displayPic = dp
	}

	setContent(content) {
		this.content = content
	}

	addContributors(contributorId) {
		this.contributors.push(contributorId)
	}

	addOwners(ownerId) {
		this.owners.push(ownerId)
	}
}
