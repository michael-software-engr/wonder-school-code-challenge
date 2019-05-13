import React from 'react'
import PropTypes from 'prop-types'

import Route from './Route';
import GroupList from './GroupList';
import Group from './Group';

import '../App.css'

const Container = ({ state, linkClickHandler, toggleTaskHandler }) => {
  if (!state) return <div>Loading....</div>;

  const { currentPath, groups } = state;

  const validPaths = ['/', ...groups.map(({ id }) => `/groups/${id}`)]

  return (
    <main>
      <div />

      <div>
        {
          validPaths.includes(currentPath) ? [
            <Route currentPath={currentPath} path="/" key="/">
              <GroupList groups={state.groups} linkClickHandler={linkClickHandler} />
            </Route>,

            ...groups.map((group) => {
              const { id } = group
              return (
                <Route currentPath={currentPath} path={`/groups/${id}`} key={`group-${id}`}>
                  <Group
                    group={group}
                    toggleTaskHandler={toggleTaskHandler}
                    allTasks={state.allTasks}
                    linkClickHandler={linkClickHandler}
                  />
                </Route>
              )
            })
          ] : (
            <div>ERROR: invalid route</div>
          )
        }
      </div>

      <div />
    </main>
  )
}

Container.propTypes = {
  state: PropTypes.shape().isRequired,
  linkClickHandler: PropTypes.func.isRequired,
  toggleTaskHandler: PropTypes.func.isRequired
}

export default Container;
