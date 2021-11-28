import {initializeApp} from "firebase-admin";
import * as functions from "firebase-functions";
import {onCyclicTaskCreation as onCyclicTaskCreationImported} from "./onCyclicTaskCreation";
import {taskRunner as taskRunnerImported} from "./taskRunner";

initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const onCyclicTaskCreation = onCyclicTaskCreationImported;

export const taskRunner = taskRunnerImported;
