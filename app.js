var firebaseAdmin = require("firebase-admin")

const SERVICE_ACCOUNT_KEY = require("./keys/serviceAccountKey")
const PORT = process.env.PORT || 3000

// Initialize Firebase
const firebaseApp = firebaseAdmin.initializeApp(
	{
		credential: firebaseAdmin.credential.cert(SERVICE_ACCOUNT_KEY),
	},
	"insights-server"
)

firebaseApp && console.log(`Firebase app [${firebaseApp.name}] initialized... `)

const db = firebaseAdmin.firestore(firebaseApp)

db && console.log(`Connected to Firestore... `)

const io = require("socket.io")(PORT)

io && console.log(`Socket.io listening on port ${PORT}... `)

const { connectionHandler } = require("./handlers")
io.on("connection", connectionHandler)

module.exports = {
	db
}