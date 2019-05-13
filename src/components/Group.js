import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task';

const Group = ({ group: { name, tasks }, linkClickHandler, toggleTaskHandler, allTasks }) => (
  <div>
    <div className="page-title-row">
      <h2 className="page-title debug">{name}</h2>

      <a href="/" onClick={(event) => { linkClickHandler('/', event) }} className="nav-all-groups debug">
        ALL GROUPS
      </a>
    </div>

    <hr />

    {
      tasks.map(task => (
        <Task
          task={task}
          allTasks={allTasks}
          toggleTaskHandler={toggleTaskHandler}
          key={task.id}
        />
      ))
    }
  </div>
)

Group.propTypes = {
  group: PropTypes.shape().isRequired,
  linkClickHandler: PropTypes.func.isRequired,
  toggleTaskHandler: PropTypes.func.isRequired,
  allTasks: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default Group;
