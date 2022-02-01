const firebase = require("firebase-admin")
const db = require("../firebase")

module.exports = {
	create: (options) => {
		try {
			return db.collection("virtual-spaces").add({
				name: options.name,
				collabId: null,
				writeId: null,
				readId: null,
				owners: options.owners,
				readers: [],
				editors: [],
			})
		} catch (error) {
			throw error
		}
	},
	getRoomById: (roomId) => {
		try {
			return db.collection("virtual-spaces").doc(roomId)
		} catch (error) {
			throw error
		}
	},
	setCollabId: (roomId, collabId) => {
		try {
			db.collection("virtual-spaces").doc(roomId).update({
				collabId: collabId,
			})
		} catch (error) {
			throw error
		}
	},
	addOwners: (roomId, owners) => {
		try {
			db.collection("virtual-spaces").doc(roomId).update({
				owners: firebase.firestore.FieldValue.arrayUnion(...owners),
			})
		} catch (error) {
			throw error
		}
	},
}

// class VirtualSpace {
// 	constructor(options) {
// 		this.id = options.id || null
// 		this.name = options.name || null
// 		this.collabId = options.collabId || null
// 		this.writeId = options.writeId || null
// 		this.readId = options.readId || null
// 		this.readers = options.readers || []
// 		this.editors = options.editors || []
// 		this.owners = options.owners || []
// 	}

// 	getSerialized = async () => {
// 		try {
// 			const res = await Promise.all([getId(), getName(), getCollabId(), getWriteId(), getReadId(), getReaders(), getEditors(), getOwners()])

// 			return {
// 				id: res[0],
// 				name: res[1],
// 				collabId: res[2],
// 				writeId: res[3],
// 				readId: res[4],
// 				readers: res[5],
// 				editors: res[6],
// 				owners: res[7],
// 			}
//         } catch (error) {
//             console.error(error)
//             throw error
//         }
// 	}

// 	save = async () => {
// 		try {
// 			const res = await db.collection("virtual-spaces").add(this.serialize())
// 			const id = res._path.segments[1]
// 			this.setId(id)
// 		} catch (error) {
// 			console.error(error)
// 			throw error
// 		}
// 	}

// 	getProp = async (prop, setProp) =>
// 		this[prop]
// 			? this[prop]
// 			: db
// 					.collection("virtual-spaces")
// 					.doc(this.id)
// 					.get()
// 					.then((doc) => {
// 						const res = doc.data()[prop]
// 						setProp(res)
// 						return res
// 					})

// 	getId = async () => this.getProp("id", this.setId)
// 	setId = (id) => (this.id = id)

// 	getName = async () => this.getProp("name", this.setName)
// 	setName = (name) => (this.name = name)

// 	getCollabId = async () => this.getProp("collabId", this.setCollabId)
// 	setCollabId = (collabId) => (this.collabId = collabId)

// 	getWriteId = async () => this.getProp("writeId", this.setWriteId)
// 	setWriteId = (writeId) => (this.writeId = writeId)

// 	getReadId = async () => this.getProp("readId", this.setReadId)
// 	setReadId = (readId) => (this.readId = readId)

// 	getReaders = async () => this.getProp("readers", this.setReaders)
// 	setReaders = (readers) => (this.readers = [this.readers, ...readers])

// 	getEditors = async () => this.getProp("editors", this.setEditors)
// 	setEditors = (editors) => (this.editors = [this.editors, ...editors])

// 	getOwners = async () => this.getProp("owners", this.setOwners)
// 	setOwners = (owners) => (this.owners = [this.owners, ...owners])
// }
