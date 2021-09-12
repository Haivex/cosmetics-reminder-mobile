const sharedConfig = {
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

export default {
    firebaseWebConfig: {
      ...sharedConfig,
      apiKey: process.env.FIREBASE_WEB_API_KEY,
      databaseURL: process.env.FIREBASE_WEB_DATABASE_URL,
      appId: process.env.FIREBASE_WEB_APP_ID,
    },
    firebaseAndroidConfig: {
      ...sharedConfig,
      apiKey: process.env.FIREBASE_ANDROID_API_KEY,
      databaseURL: process.env.FIREBASE_ANDROID_DATABASE_URL,
      appId: process.env.FIREBASE_ANDROID_APP_ID,
    },
    firebaseIosConfig: {
      ...sharedConfig,
      apiKey: process.env.FIREBASE_IOS_API_KEY,
      databaseURL: process.env.FIREBASE_IOS_DATABASE_URL,
      appId: process.env.FIREBASE_IOS_APP_ID,
    }
}
