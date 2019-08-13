import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import Chart from './components/Chart';

import logo from './logo.svg';
// import './img/JS.jpg';
// import './img/angularJS.png';
// import './img/ember.png';
// import './img/vueJS.png';


class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:4001",
      id: 0,
      jsLib: '--none-',
      result: ""
    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('vote', this.state.id, this.state.jsLib, this.state.result);
  }
  ///

  // adding the function
  setData = (id, jsLib, result) => {
    this.setState({ id, jsLib, result })
  }
  ///

  //
  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    setInterval(this.send(), 1000)
    socket.on('vote', (id, jsLib, result) => {
      document.getElementById("votes").innerText = " Your favorite JS is : " + id + " - " + jsLib
      
    })
  }
  ///

  render() {
    const socket = socketIOClient(this.state.endpoint);
    return (
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        <div className="row">

          <div className="col-4">
            <p className=" form form-inline"> <h2> Pick you favorite        <img src="./img/JS.jpg" height="50px" />
            </h2>
            </p>
            <Button id="react" className="btn btn-defalut" onClick={() => this.setData(1, 'react', this.result)}>react
            <img src={logo} className="App-logo" alt="logo" height="50px" />
            </Button> <br></br>
            <Button id="ember" className="btn btn-defalut" onClick={() => this.setData(2, 'ember', this.result)}>ember
            <img src="./img/ember.png" height="50px" />
            </Button> <br></br>
            <Button id="vue" className="btn btn-defalut" onClick={() => this.setData(3, 'vue', this.result)}>vue
            <img src="./img/vuejS.png" height="50px" />
            </Button><br></br>
            <Button id="angular" className="btn btn-defalut" onClick={() => this.setData(4, 'angular', this.result)}>angular
            <img src="./img/angularJS.png" height="50px" />
            </Button><br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={() => this.send()}>Vote</Button>
          </div>
          <div className="col-8">

            <p> <label id="votes" ></label></p>
            <p><label id="votes_totals" ></label></p>
            <div className="App">
              <div className="App-header">
              </div>
              <Chart></Chart>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;