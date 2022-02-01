const SERVICE_ACCOUNT_KEY = require("./keys/serviceAccountKey")
const firebase = require("firebase-admin")
const firebaseApp = firebase.initializeApp(
	{
		credential: firebase.credential.cert(SERVICE_ACCOUNT_KEY),
	},
	"insights-server"
)

firebaseApp && console.log(`Firebase app [${firebaseApp.name}] initialized... `)

module.exports = firebase.firestore(firebaseApp) && console.log(`Connected to Firestore... `)
