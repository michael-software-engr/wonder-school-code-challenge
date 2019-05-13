import React, { Component } from 'react'

import Container from './components/Container';

// import fetchInitialState, { toggleTask } from './state/index'
import fetchInitialState, { toggleTask } from './state/elixir'

export default class App extends Component {
  componentDidMount() {
    fetchInitialState().then((data) => {
      this.setState({
        ...data,
        currentPath: window.location.pathname.replace(/\/coding_challenge\/index\.html/, '') || '/'
      })
      // this.setState({ ...data, currentPath: window.location.pathname || '/' })
    })
  }

  toggleTaskHandler = (id, event) => {
    event.preventDefault()

    this.setState((prevState) => ({ ...prevState, ...toggleTask(id, prevState.allTasks) }))
  }

  linkClickHandler = (currentPath, event) => {
    event.preventDefault()
    this.setState({ currentPath })
    window.history.pushState(
      {},
      'title - Firefox currently ignores this parameter, although it may use it in the future.',
      currentPath
    );
  }

  render() {
    if (!this.state) return <div>Loading....</div>;

    console.log({ state: this.state, path: window.location.pathname })

    return (
      <Container
        state={this.state}
        linkClickHandler={this.linkClickHandler}
        toggleTaskHandler={this.toggleTaskHandler}
      />
    )
  }
}
