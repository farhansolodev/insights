const { db } = require("../app")

module.exports = class VirtualSpace {
	constructor(options) {
		this.id = options.id || null
		this.name = options.name || null
		this.collabId = options.collabId || null
		this.writeId = options.writeId || null
		this.readId = options.readId || null
		this.readers = options.readers || []
		this.editors = options.editors || []
		this.owners = options.owners || []
	}

	serialize() {
		return {
			id: this.id,
			name: this.name,
			collabId: this.collabId,
			writeId: this.writeId,
			readId: this.readId,
			readers: this.readers,
			editors: this.editors,
			owners: this.owners,
		}
	}

	async save() {
		try {
			const res = await db.collection("virtual-spaces").add(this.serialize())
			// const id = res._path.segments[1]
			// this.setId(id)
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

	getCollabId() {
		return this.collabId
	}

	getWriteId() {
		return this.writeId
	}

	getReadId() {
		return this.readId
	}

	getReaders() {
		return this.readers
	}

	getEditors() {
		return this.editors
	}

	getOwners() {
		return this.owners
	}

	setId(id) {
		this.id = id
	}

	setName(name) {
		this.name = name
	}

	setCollabId(collabId) {
		this.collabId = collabId
	}

	setWriteId(writeId) {
		this.writeId = writeId
	}

	setReadId(readId) {
		this.readId = readId
	}

	addReaders(readers) {
		this.readers.push(readers)
	}

	addEditors(editors) {
		this.editors.push(editors)
	}

	addOwners(owners) {
		this.owners.push(owners)
	}
}
