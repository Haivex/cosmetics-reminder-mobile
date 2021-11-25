const en = {
  createTaskScreen: {
    screenTitle: 'Create task',
    titleInputPlaceholder: 'Give title',
    dateInputPlaceholder: 'Choose date',
    timeInputPlaceholder: 'Choose time',
    createTaskButton: 'Create',
    titleTitle: 'Title',
    beginningDateTitle: 'Beginning Date',
    beginningTimeTitle: 'Beginning Time',
    titleHelperText: 'Write title',
    dateHelperText: 'Write date',
    timeHelperText: 'Write time',
    cyclicHelperText: 'Please enter a valid interval',
    cyclicQuestion: 'Whether to set as a cyclic task?',
    cyclicInputs: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
    },
  },
  currentTasksScreen: {
    screenTitle: 'To-do',
    currentTasksTitle: 'Current tasks',
    incomingTasksTitle: 'Incoming tasks',
  },
  finishedTasksScreen: {
    screenTitle: 'Finished tasks',
  },
  taskMenu: {
    changeTitle: 'Change title',
    finishTask: 'Done',
    deleteTask: 'Delete',
    restoreTask: 'Restore',
    renameInput: {
      title: 'Give title',
      description: 'Give a new title',
      cancelButton: 'Cancel',
      changeButton: 'Change',
    },
    editTask: 'Edit task',
  },
  bottomNavigation: {
    createTaskTitle: 'Create task',
    currentTasks: 'To-do',
    finishedTasks: 'Finished tasks',
  },
  datePicker: {
    label: 'Choose date (DD-MM-YYYY)',
    acceptButton: 'Accept',
  },
  timePicker: {
    label: 'Choose time (HH:MM XM)',
    acceptButton: 'Accept',
    cancelButton: 'Cancel',
  },
  appSettings: {
    logOut: 'Log out',
    notificationsSettings: 'Manage notifications',
  },
  notificationsSettings: {
    notificationsStatus: 'Turn on/off notifications',
  },
  editTaskScreen: {
    confirmButton: 'Confirm',
    title: 'Edit task',
  },
  noTask: {
    defaultText: 'There are no tasks.',
    createProposition: 'Create one!',
    goodWork: "Good Work! You've done all tasks",
    finishedTaskInfo: 'Finished tasks will appear here',
  },
  loadingTasks: 'Tasks are loading...',
  search: 'Search',
};
export default en;
export type AppTranslation = typeof en;
