import { AsyncStorage } from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TASKS';

var tasks = [];

export default function saveTasks(task) {
  // AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  tasks.push(task)
  // console.log(tasks)
}