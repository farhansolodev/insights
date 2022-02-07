const admin = require("firebase-admin")
const SERVICE_ACCOUNT_KEY = JSON.parse(process.env.firebase_key)
// const { initializeApp } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

const app = admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT_KEY)
}, 'virtual-spaces');
console.log(`Firebase app [${app.name}] initialized...`)

// const firebaseApp = initializeApp(SERVICE_ACCOUNT_KEY, "virtual-space")

const firestore = getFirestore(app)
console.log(`Connected to Firestore... `)

module.exports = { db: firestore }
