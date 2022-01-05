import {initializeApp} from "firebase-admin";
import {onCyclicTaskCreation as onCyclicTaskCreationImported} from "./onCyclicTaskCreation";
import {onCyclicTaskDeletion as onCyclicTaskDeletionImported} from "./onCyclicTaskDeletion";
import {onCyclicTaskUpdate as onCyclicTaskUpdateImported} from "./onCyclicTaskUpdate";
import {taskRunner as taskRunnerImported} from "./taskRunner";

initializeApp();

export const onCyclicTaskCreation = onCyclicTaskCreationImported;
export const onCyclicTaskDeletion = onCyclicTaskDeletionImported;
export const onCyclicTaskUpdate = onCyclicTaskUpdateImported;

export const taskRunner = taskRunnerImported;
