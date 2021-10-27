import {SingleAction} from '../TaskMenu';
import {
  deleteAction,
  editAction,
  renameAction,
  restoreAction,
} from './taskActions';

const completedTaskActions: SingleAction[] = [
  deleteAction,
  renameAction,
  editAction,
  restoreAction,
];

export default completedTaskActions;
