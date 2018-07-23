import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import IntentionsDisplay from './IntentionsDisplay'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }
  render() {
    const {showModal} = this.state
    return <div className="container has-text-centered">
      <h1>Is there a spy?</h1>
      {showModal
        ? <IntentionsDisplay close={this.toggleModal} />
        : <button onClick={this.toggleModal}>Reveal Intentions</button>
      }
    </div>
  }
}


export default App
