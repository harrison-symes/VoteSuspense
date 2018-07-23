import React from 'react'

const names = [
  'Harrison',
  'Dan',
  'Cate',
  'Phoenix',
  'Rebecca',
  'Ross',
  'Cliff',
  'Anton',
  'Reblocka'
]

const size = Math.floor(Math.random() * 5) + 5

const team = []

while (team.length < size) {
  const random = names[Math.floor(Math.random() * names.length)]
  if (!team.includes(random)) team.push(random)
}

let votes = team.map(() => Math.random() > 0.2)

const doDrama = votes.includes(false)

if (doDrama) {
  votes = votes.filter(el => el).concat(votes.filter(el => !el))
}

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasStarted: false,
      hasEnded: false,
      revealed: 0
    }
    this.timeout = null
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }
  start() {
    this.setState({hasStarted: true})
    this.timeout = setTimeout(() => this.tick(), 1500)
  }
  tick() {
    let {revealed} = this.state
    revealed++
    this.setState({revealed})
    if (revealed == votes.length) this.stop()
    else this.timeout = setTimeout(() => this.tick(), revealed * 1000)
  }
  stop() {
    window.clearTimeout(this.timeout)
    this.setState({hasEnded: true})
  }
  render() {
    const {hasStarted, hasEnded, revealed} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Mission Intentions</p>
        </header>
        <section className="modal-card-body">
          <h1 className="title">
            {!hasStarted
              ? 'All shall be revealed...'
              : hasEnded
                ? votes.includes(false)
                  ? 'The Mission has failed!'
                  : 'The Mission was a success!'
                : 'Reveal in progress...'
            }
          </h1>
          <h2 className="subtitle">
            The Team:
          </h2>
          <div className="columns is-multiline">
            {team.map(name => <div className="column is-4">{name}</div>)}
          </div>
          <hr />
          {votes.map((vote, i) => <div className={`box ${
            i < revealed
              ? ''
              : vote ? 'is-success' : 'is-danger'
          }`}>
            {hasStarted
              ? i < revealed
                ? vote
                  ? 'Success'
                  : 'Fail'
                : '...'
              : 'Pending...'
            }
          </div>)}
        </section>
        <footer className="modal-card-foot">
          {!hasStarted && <button className="button is-fullwidth" onClick={this.start}>Reveal!</button>}
          {hasEnded && <button onClick={this.props.close} className="button is-fullwidth">Close</button>}
        </footer>
      </div>
    </div>
  }
}

export default Modal
