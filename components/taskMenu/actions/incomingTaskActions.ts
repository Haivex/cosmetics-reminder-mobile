import {SingleAction} from '../TaskMenu';
import {
  completeAction,
  deleteAction,
  editAction,
  renameAction,
} from './taskActions';

const incomingTaskActions: SingleAction[] = [
  deleteAction,
  renameAction,
  completeAction,
  editAction,
];

export default incomingTaskActions;
