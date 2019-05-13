// import React from 'react'
import PropTypes from 'prop-types'

const Route = ({ currentPath, path, children }) => (
  currentPath === path ? children : null
)

Route.propTypes = {
  currentPath: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Route;
