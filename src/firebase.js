import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDcylJeqwtlMQcGyyYNfP2sjj9wEpjBqII',
	authDomain: 'pvg-international.firebaseapp.com',
	projectId: 'pvg-international',
	storageBucket: 'pvg-international.appspot.com',
	messagingSenderId: '461377296200',
	appId: '1:461377296200:web:77e80c806cdd832628057d',
	measurementId: 'G-E12YZMW18D',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()

async function createUserProfileDocument(userAuth, additionalData) {
	if (!userAuth) {
		return
	}
	const userRef = db.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get()

	if (!snapShot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}

	return userRef
}
export { db, storage, auth, createUserProfileDocument, firebase as default }
