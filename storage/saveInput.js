import { AsyncStorage } from '@react-native-community/async-storage';

const STORAGE_KEY = 'TASKS';

export const saveTasks = (tasks) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}