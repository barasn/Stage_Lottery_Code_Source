import React from "react";
import logo from "./logo.svg";
import "./App.css";

import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  };


  async componentDidMount() {
    /** const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalanace(lottery.options.address); */
    const [manager, players, balance] = await Promise.all([
       lottery.methods.manager().call(),
       lottery.methods.getPlayers().call(),
       web3.utils.getBalanace(lottery.options.address)
    ]);

    this.setState({ manager, players, balance });
  }

  onSubmit = (event) => {
    event.preventDefault();

  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
          </p>

          <hr />

          <form onSubmit={this.onSubmit}>
            <h4> Want to try your luck?</h4>
            <div>
              <label>Amount of ether to enter</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
              />
            </div>
            <button>Enter</button>
          </form>
      </div>
    );
  }
}

export default App;
