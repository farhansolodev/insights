const SERVICE_ACCOUNT_KEY = require("./keys/serviceAccountKey")
const PORT = process.env.PORT || 3000

// Initialize Firebase
const firebase = require("firebase-admin")
const firebaseApp = firebase.initializeApp(
	{
		credential: firebase.credential.cert(SERVICE_ACCOUNT_KEY),
	},
	"insights-server"
)

firebaseApp && console.log(`Firebase app [${firebaseApp.name}] initialized... `)

;(module.exports.db = firebase.firestore(firebaseApp)) && console.log(`Connected to Firestore... `)

// Initialize Express
const express = require("express")
const app = express()
const http = require("http").createServer(app)
module.exports.io = require("socket.io")(http)

app.use(express.json())

try {
	const virtualSpaceRoutes = require("./routes/virtualSpaceRoutes")
	app.use("/vs", virtualSpaceRoutes)
} catch (error) {
	throw error
}

http.listen(PORT, () => console.log(`Listening for HTTP requests on port ${PORT}... `))

// module.exports = {
// 	db, io
// }
