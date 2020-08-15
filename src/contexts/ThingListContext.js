import React, { Component } from 'react'

const ThingListContext = React.createContext({
  thingList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setThingList: () => {},
})
export default ThingListContext

export class ThingListProvider extends Component {
  state = {
    thingList: [],
    error: null,
  };

  setThingList = thingList => {
    this.setState({ thingList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      thingList: this.state.thingList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setThingList: this.setThingList,
    }
    return (
      <ThingListContext.Provider value={value}>
        {this.props.children}
      </ThingListContext.Provider>
    )
  }
}
