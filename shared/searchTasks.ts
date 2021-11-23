import {Task} from '../types';

const searchTasks = (tasks: Task[], query: string): Task[] => {
  let filteredTasks = [...tasks];

  const filters = ['before:', 'after:', 'cyclic:'];
  let foundedFilter: string | undefined = '';
  let isFilterTurnedOn = false;

  const searchedTitleWords: string[] = [];
  const queriesWords = query.split(' '); //space

  queriesWords.forEach(word => {
    if (!isFilterTurnedOn) {
      foundedFilter = filters.find(filter => filter === word);
      if (foundedFilter) {
        isFilterTurnedOn = true;
        return;
      }
    }
    if (isFilterTurnedOn) {
      switch (foundedFilter) {
        case 'before:':
          filteredTasks = filteredTasks.filter(
            task => task.date.toDate() < new Date(word),
          );
          break;
        case 'after:':
          filteredTasks = filteredTasks.filter(
            task => task.date.toDate() > new Date(word),
          );
          break;
        case 'cyclic:':
          filteredTasks = filteredTasks.filter(task => {
            if (word === 'true') {
              return typeof task.cyclicInterval !== 'undefined';
            }
            return typeof task.cyclicInterval === 'undefined';
          });
          break;
      }
      isFilterTurnedOn = false;
      return;
    }
    searchedTitleWords.push(word);
  });
  const searchedTitle = searchedTitleWords.join(' ').toLowerCase(); //space
  return filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchedTitle),
  );
};
export default searchTasks;
