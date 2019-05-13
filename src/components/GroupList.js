import React from 'react'
import PropTypes from 'prop-types'

import { liGridCName, liGridItemNameCName } from '../lib'

const GroupList = ({ groups, linkClickHandler }) => [
  <h2 key="title" className="page-title">Things To Do</h2>,
  <hr key="divider" />,

  <section key="group-list-actual" className="group-list-actual">
    {
      groups.map(group => {
        const { tasks } = group;
        const xOfTasksComplete = tasks.filter(task => task.completedAt).length

        const groupPath = `/groups/${group.id}`;

        return (
          <article key={group.key}>
            <a
              href={groupPath}
              onClick={(event) => { linkClickHandler(groupPath, event) }}
              className={liGridCName}
            >
              <div><img src="/group.svg" alt="Group" /></div>
              <div>
                <div className={liGridItemNameCName}>{group.name}</div>
                <div className="progress">{xOfTasksComplete} OF {tasks.length} TASKS COMPLETE</div>
              </div>
            </a>
            <hr />
          </article>
        )
      })
    }
  </section>
]

GroupList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  linkClickHandler: PropTypes.func.isRequired
}

export default GroupList;
