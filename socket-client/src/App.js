import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';

class App extends Component {

  constructor() {
    super();
    this.state = {
      endpoint: "localhost:4001",
      id: 0,
      jsLib: '--none-'
    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('vote', this.state.id, this.state.jsLib)
  }
  ///

  // adding the function
  setData = (id, jsLib) => {
    this.setState({ id, jsLib })
  }

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    setInterval(this.send(), 1000)
    socket.on('vote', (id, jsLib) => {
      document.getElementById("votes").innerText = " Your favorite JS is : " + id + " - " + jsLib
    })
  }

  render() {

    const socket = socketIOClient(this.state.endpoint);


    return (

      <div style={{ textAlign: "center" }}   >
        
          <div className="row">
            <div className="col-1"> &nbsp;
          </div>
            <div className="col-3">
              <h2> Pick you favorite JS </h2>

              <Button id="react" className="btn btn-defalut" onClick={() => this.setData(1, 'react')}>react</Button> <br></br>
              <Button id="ember" className="btn btn-defalut" onClick={() => this.setData(2, 'ember')}>ember</Button> <br></br>
              <Button id="vue" className="btn btn-defalut" onClick={() => this.setData(3, 'vue')}>vue</Button><br></br>
              <Button id="angular" className="btn btn-defalut" onClick={() => this.setData(4, 'angular')}>angular </Button><br></br>
              <br></br>
              <Button variant="contained" color="primary" onClick={() => this.send()}>Vote</Button>
            </div>
            <div className="col-8">
              <p>&nbsp;</p>
              <p> <label id="votes" ></label></p>
            </div>
          </div>
       
      </div>

    )
  }

}

export default App;