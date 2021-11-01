import {SingleAction} from '../TaskMenu';
import {completeAction, deleteAction, renameAction} from './taskActions';

const currentTaskActions: SingleAction[] = [
  deleteAction,
  renameAction,
  completeAction,
];

export default currentTaskActions;
