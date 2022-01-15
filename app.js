const express = require("express")
var firebaseAdmin = require("firebase-admin")

const config = require("./config")
const SERVICE_ACCOUNT_KEY = require("./keys/serviceAccountKey")
const PORT = process.env.PORT || config.PORT

// Initialize Firebase
const firebaseApp = firebaseAdmin.initializeApp(
	{
		credential: firebaseAdmin.credential.cert(SERVICE_ACCOUNT_KEY),
	},
	"insights-server"
)

const db = firebaseAdmin.firestore(firebaseApp)

// Initialize Express
const app = express()
const server = require("http").createServer(app)

app.use(express.json())

server.keepAliveTimeout = config.SERVER_TIMOUT_SECONDS * 1000

// try {
// 	const userRoutes = require("./routes/userRoutes")
// 	app.use("/users", userRoutes)
// } catch (error) {
// 	console.error(error)
// }

// try {
// 	const collabRoutes = require("./routes/collabRoutes")
// 	app.use("/collabs", collabRoutes)
// } catch (error) { 
// 	console.error(error)
// }

try {
	const virtualSpaceRoutes = require("./routes/virtualSpaceRoutes")
	app.use("/vs", virtualSpaceRoutes)
} catch (error) {
	console.error(error)
}

server.listen(PORT, () => console.log(`---- Listening on port ${PORT} ----`))

module.exports = {
	db,
	server,
}