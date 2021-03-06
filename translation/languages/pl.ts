import {AppTranslation} from './en';

const pl: AppTranslation = {
  createTaskScreen: {
    screenTitle: 'Utwórz zadanie',
    titleInputPlaceholder: 'Podaj tytuł',
    dateInputPlaceholder: 'Wybirz datę',
    timeInputPlaceholder: 'Wybirz godzinę',
    createTaskButton: 'Utwórz',
    titleTitle: 'Tytuł',
    beginningDateTitle: 'Data rozpoczęcia',
    beginningTimeTitle: 'Godzina rozpoczęcia',
    titleHelperText: 'Uzupełnij tytuł',
    dateHelperText: 'Uzupełnij datę',
    timeHelperText: 'Uzupełnij czas',
    cyclicHelperText: 'Podaj prawidłowy interwał',
    cyclicQuestion: 'Czy ustawić jako zadanie cykliczne?',
    cyclicInputs: {
      days: 'Dni',
      hours: 'Godziny',
      minutes: 'Minuty',
    },
  },
  currentTasksScreen: {
    screenTitle: 'Do zrobienia',
    currentTasksTitle: 'Aktualne zadania',
    incomingTasksTitle: 'Nadchodzące zadania',
  },
  finishedTasksScreen: {
    screenTitle: 'Zakończone zadania',
  },
  taskMenu: {
    changeTitle: 'Zmień nazwę',
    finishTask: 'Ukończ',
    deleteTask: 'Usuń',
    restoreTask: 'Przywróć',
    renameInput: {
      title: 'Podaj tytuł',
      description: 'Podaj nowy tytuł tego zadania',
      cancelButton: 'Anuluj',
      changeButton: 'Zmień',
    },
    editTask: 'Edytuj zadanie',
  },
  bottomNavigation: {
    createTaskTitle: 'Utwórz zadanie',
    currentTasks: 'Aktualne zadania',
    finishedTasks: 'Zakończone zadania',
  },
  datePicker: {
    label: 'Wybierz datę (DD-MM-YYYY)',
    acceptButton: 'Zatwierdź',
  },
  timePicker: {
    label: 'Wybierz godzinę (HH:MM)',
    acceptButton: 'Potwierdź',
    cancelButton: 'Anuluj',
  },
  appSettings: {
    logOut: 'Wyloguj się',
    notificationsSettings: 'Zarządzaj powiadomieniami',
    appearanceSettings: 'Dostosuj wygląd',
    languageSettings: 'Zmień język',
  },
  notificationsSettings: {
    notificationsStatus: 'Włącz/Wyłącz powiadomienia',
  },
  editTaskScreen: {
    confirmButton: 'Zatwierdź',
    title: 'Edytuj zadanie',
  },
  noTask: {
    defaultText: 'Nie ma tu żadnych zadań.',
    createProposition: 'Stwórz jedno!',
    goodWork: 'Dobra robota! Wykonałeś wszystkie zadania',
    finishedTaskInfo: 'Tutaj pojawią się zakończone zadania',
  },
  loadingTasks: 'Trwa wczytywanie zadań...',
  search: 'Wyszukaj',
  signIn: 'Zaloguj się aby kontynuować!',
  appearanceSettings: {
    changeTheme: 'Dark / Light Theme',
  },
  languageSettings: {
    changeLanguage: 'Wybierz język',
  },
};
export default pl;
