var tasks = [];
var completedTasks = [];
var rewards = [];
var categories = [];

export default function saveTasks(task) {
  let index = tasks.length
  task.key = index
  tasks.push(task)
}

export function completeTask(index) {
  let completed_task = tasks[index]
  completedTasks.push(completed_task);
  tasks.splice(index, 1)
}

export function deleteTask(index) {
  tasks.splice(index, 1)
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
  return [tasks.length, completedTasks.length]
}

export function getPriorityData() {
  return tasks.slice(0,3)
}

export function getTasksData() {
  return tasks
}

export function getCompletedTaskData() {
  return completedTasks
}

export function getRewards() {
  return rewards
}

export function getCategories() {
  return categories
}

export { rewards as rewards_list }
export { categories as category_list }
export { tasks as task_list }
export { completedTasks as completed_task_list }