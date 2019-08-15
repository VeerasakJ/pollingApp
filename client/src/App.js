import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import { Bar } from 'react-chartjs-2';

class App extends Component {

  constructor() {
    super();
    this.state = {
      endpoint: "localhost:4001",
      id: 0,
      jsLib: '--none-',
      labels: {},
      votes: {},
      chartData: {}
    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('initial_data');
    socket.emit('vote', this.state.id, this.state.jsLib);
  }
  ///

  // adding the function
  setData = (id, jsLib) => {
    this.setState({ id, jsLib })
  }
  ///

  //
  setResult = (labels, votes) => {
    this.setState({ labels, votes })
  }
  ///

  // chart 
  getChartData() {
    this.setState({
      chartData: {
        labels: this.state.labels,
        datasets: [
          {
            data: this.state.votes,
            fill: false,
            borderColor: 'green'
          }
        ]
      }
    });
  }
  ///

  //
  componentDidMount = () => {

    const socket = socketIOClient(this.state.endpoint);
    setInterval(this.send(), 1000)

    socket.on('get_data', (result) => {
      var labels = result.map(function (e) {
        return e.jsLib;
      });

      var values = result.map(function (e) {
        return e.votes;
      });

      this.setResult(labels, values);
      this.getChartData();

      // document.getElementById("votes").innerText = "after set JSfamework : " + this.state.labels
      // document.getElementById("votes_result").innerText = " votes: " + values

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
            <Button id="react" className="btn btn-defalut" onClick={() => this.setData(1, 'react')}>react
            <img src={logo} className="App-logo" alt="logo" height="50px" />
            </Button> <br></br>
            <Button id="ember" className="btn btn-defalut" onClick={() => this.setData(2, 'ember')}>ember
            <img src="./img/ember.png" height="50px" />
            </Button> <br></br>
            <Button id="vue" className="btn btn-defalut" onClick={() => this.setData(3, 'vue')}>vue
            <img src="./img/vuejS.png" height="50px" />
            </Button><br></br>
            <Button id="angular" className="btn btn-defalut" onClick={() => this.setData(4, 'angular')}>angular
            <img src="./img/angularJS.png" height="50px" />
            </Button><br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={() => this.send()}>Vote</Button>
          </div>

          <div className="col-8">
            
            <h1> Most favorit JS Framework  </h1>
            <div className="App">
              <div className="App-header">
              </div>

              {/* --  barchart -- */}
              <div className="chart" >
                <Bar
                  // Test manual 
                  //  data= {{"labels":["ember","vue","angular","react"],
                  //   "datasets":[{"data":[45,24,18,49],"fill":false,"borderColor":"green"}]}}
                  data={this.state.chartData}
                  options={{
                    title: {
                      display: this.props.displayTitle,
                      text: 'Favorit JS ',
                      fontSize: 25
                    },
                    legend: {
                      display: this.props.displayLegend,
                      position: this.props.legendPosition
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;