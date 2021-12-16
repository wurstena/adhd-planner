
var tasks = [];
var completedTasks = [];
var rewards = [];
var categories = [];
var priority_indexes = [0, 1, 2];

export default function saveTasks(task) {
  let index = tasks.length
  task.key = index
  tasks.push(task)
  sortArrayByDate(tasks)
}

export function completeTask(index) {
  let position = priority_indexes.findIndex(element => element == index);
  priority_indexes[position] = -1
  let rand = Math.floor(Math.random() * tasks.length);
  while (rand == priority_indexes[0] || rand == priority_indexes[1] || rand == priority_indexes[2]) {
    rand = Math.floor(Math.random() * tasks.length);
  }
  priority_indexes[position] = rand
  let completed_task = tasks[index]
  completedTasks.push(completed_task);
  tasks.splice(index, 1)
  sortArrayByDate(tasks)
  sortArrayByDate(completedTasks)
}

export function deleteTask(index) {
  tasks.splice(index, 1)
  sortArrayByDate(tasks)
}

export function saveCategory(category) {
  categories.push(category)
}

export function deleteCategory(index) {
  categories.splice(index, 1)
}

export function saveReward(reward) {
  rewards.push(reward)
}

export function deleteReward(index) {
  rewards.splice(index, 1)
}

export function getGraphData() {
  sortArrayByDate(tasks)
  return [tasks.length, completedTasks.length]
}

export function getPriorityData() {
  sortArrayByDate(tasks)
  let task_1 = tasks[priority_indexes[0]] ? tasks[priority_indexes[0]] : null
  let task_2 = tasks[priority_indexes[1]] ? tasks[priority_indexes[1]] : null
  let task_3 = tasks[priority_indexes[2]] ? tasks[priority_indexes[2]] : null

  let arr = [];
  if (task_1 !== null) {
    arr.push(task_1)
  }
  if (task_2 !== null) {
    arr.push(task_2)
  }
  if (task_3 !== null) {
    arr.push(task_3)
  }
  return arr
}

export function shufflePriorityData() {
  if (tasks.length >= 3) {
    let index_1 = Math.floor(Math.random() * tasks.length);
    let index_2 = Math.floor(Math.random() * tasks.length);
    while (index_2 == index_1) {
      index_2 = Math.floor(Math.random() * tasks.length);
    }
    let index_3 = Math.floor(Math.random() * tasks.length);
    while (index_3 == index_2 || index_3 == index_1) {
      index_3 = Math.floor(Math.random() * tasks.length);
    }
    priority_indexes = [index_1, index_2, index_3]
  }
}

export function getTasksData() {
  sortArrayByDate(tasks)
  sortArrayByDate(completedTasks)
  return tasks
}

export function getCompletedTaskData() {
  sortArrayByDate(tasks)
  sortArrayByDate(completedTasks)
  return completedTasks
}

export function getRewards() {
  return rewards
}

export function getCategories() {
  return categories
}

function sortArrayByDate(arr) {
  arr.sort(function (x, y) {
    if (x.date < y.date) {
      return -1;
    }
    if (x.date > y.date) {
      return 1;
    }
    if (x.date == y.date) {
      if (x.time < y.time) {
        return -1;
      }
      if (x.time > y.time) {
        return 1
      }
    }
    return 0;
  });
}

export { rewards as rewards_list }
export { categories as category_list }
export { tasks as task_list }
export { completedTasks as completed_task_list }