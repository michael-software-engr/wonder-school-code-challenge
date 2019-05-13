import React from 'react'
import PropTypes from 'prop-types'

import { liGridCName, liGridItemNameCName } from '../lib'

const isLockedTask = ({ dependencyIds, allTasks }) => (
  dependencyIds.find((depId) => {
    const task = allTasks.find(({ id }) => depId === id)

    if (!task) throw Error(`Task id '${depId}' not found.`)

    return !task.completedAt;
  })
)

const Task = ({
  task: { id, task, completedAt, dependencyIds },
  allTasks,
  toggleTaskHandler
}) => (
  <article>
    {
      isLockedTask({ dependencyIds, allTasks }) ? (
        <div className={liGridCName}>
          <img
            src={[process.env.PUBLIC_URL, '/locked.svg'].join('')}
            alt="Locked"
          />
          <span className={liGridItemNameCName}>Locked Task</span>
        </div>
      ) : (
        <div
          onClick={(event) => { toggleTaskHandler(id, event); }}
          className={liGridCName}
        >
          {
            completedAt ? (
              <img src={[process.env.PUBLIC_URL, '/completed.svg'].join('')} alt="Complete" />
            ) : <img src={[process.env.PUBLIC_URL, '/incomplete.svg'].join('')} alt="Incomplete" />
          }

          <span
            className={[liGridItemNameCName, completedAt ? 'line-through' : ''].join(' ')}
          >
            {task}
          </span>
        </div>
      )
    }
    <hr />
  </article>
)

Task.propTypes = {
  task: PropTypes.shape().isRequired,
  allTasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  toggleTaskHandler: PropTypes.func.isRequired
}

export default Task;
