const camelizeKeys = obj => Object.keys(obj).reduce((acc, key) => {
  const words = key.split('_')
  const camelized = [
    words[0],
    ...words.slice(1).map(word => [word[0].toUpperCase(), ...word.slice(1)].join(''))
  ].join('')

  return {
    ...acc,
    [camelized]: obj[key]
  }
}, {})

const buildTasks = (tasks, groups) => tasks.map(task => ({
  ...camelizeKeys(task),
  dependencyIds: task.dependency_ids ? task.dependency_ids : [],
  group: groups.find(({ id }) => id === task.task_group_id).name
}))

const fetchInitialState = () => (
  fetch('/api/task_groups').then(
    response => response.json().then(
      (json) => {
        const groupsRawData = json.data
        const groups = groupsRawData.map(group => ({
          ...camelizeKeys(group),
          key: group.name.toLowerCase().replace(new RegExp(' ', 'g'), '-'),
          tasks: buildTasks(group.tasks, groupsRawData)
        }))

        const allTasks = groups.map(group => group.tasks).flat()

        return { groups, allTasks }
      }
    )
  )
)

const buildGroups = (tasks) => {
  const groupsByKey = tasks.reduce((acc, task) => {
    const name = task.group;
    const key = name.toLowerCase().replace(new RegExp(' ', 'g'), '-')
    const group = acc[key]
    const tasks = group && group.tasks

    return {
      ...acc,
      [key]: {
        id: task.taskGroupId,
        name,
        tasks: [...(tasks ? tasks : []), task]
      }
    }
  }, {})

  return Object.keys(groupsByKey)
               .map(key => ({ ...groupsByKey[key], key }))
               .sort((a, b) => a.id - b.id)
}

export const toggleTask = (idToToggle, allTasks) => {
  const newAllTasks = allTasks.map((task) => {
    if (idToToggle !== task.id) return task;

    const { completedAt } = task

    if (completedAt) return { ...task, completedAt: null }

    return { ...task, completedAt: new Date() }
  });

  return { allTasks: newAllTasks, groups: buildGroups(newAllTasks) }
}

export default fetchInitialState
