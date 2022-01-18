var cors = require("cors")
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

app.use(cors())
app.use(express.json())

try {
	const virtualSpaceRoutes = require("./routes/virtualSpaceRoutes")
	// app.options("/vs", (req, res, next) => {
	// 	console.log("OPTIONS /vs")
	// 	res.status(200).send({ options: true })
	// })
	app.get("/vs", (req, res) => {
		res.header("Access-Control-Allow-Origin", "*")
		console.log(`User ${JSON.stringify(req.query["USER_ID"])} is trying to join ROOM [id: ${req.query["ROOM_ID"]}]` + ` Method: ${req.method}`)
		res.status(200).send("VS JOINED")
	})
	app.post("/vs", (req, res) => {
		res.header("Access-Control-Allow-Origin", "*")
		console.log(`User ${JSON.stringify(req.body.USER_ID)} is trying to create ROOM [name:${req.body.ROOM_NAME}]` + ` Method: ${req.method}`)
		res.status(200).send("VS CREATED")
	})
	// app.use("/vs", virtualSpaceRoutes)
} catch (error) {
	throw error
}

http.listen(PORT, () => console.log(`Listening for HTTP requests on port ${PORT}... `))

// module.exports = {
// 	db, io
// }
