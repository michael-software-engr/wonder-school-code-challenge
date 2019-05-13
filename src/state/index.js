const buildGroupId = (groupsByKey, group) => {
  if (group) return group.id;

  if (!group) {
    return Object.keys(groupsByKey).length;
  }
};

const buildGroups = (tasks) => {
  const groupsByKey = tasks.reduce((memo, task) => {
    const name = task.group;
    const key = name.toLowerCase().replace(new RegExp(' ', 'g'), '-')
    const group = memo[key]
    const tasks = group && group.tasks
    const groupId = buildGroupId(memo, group)

    return {
      ...memo,
      [key]: {
        id: groupId,
        name,
        tasks: [...(tasks ? tasks : []), task]
      }
    }
  }, {})

  return Object.keys(groupsByKey)
               .map(key => ({ ...groupsByKey[key], key }))
               .sort((a, b) => a.id - b.id)
}

const fetchInitialState = () => (
  fetch('/data.json').then(
    response => response.json().then(
      (tasks) => ({ allTasks: tasks, groups: buildGroups(tasks) })
    )
  )
)

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
