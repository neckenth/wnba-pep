import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Roster from './Roster'

class App extends Component {

//make two react components - players and stats
//each should have a component did mount to load the data
//then work on victory

//this component should render both others from different links
//this component should be stateless
  // componentDidMount() {
  //   axios.get('/api/players')
  //   .then(res => {
  //     const rosterData = res.data
  //     this.setState()
  //   })
  // }
  render() {

    return (
      <div>
      <Roster />
      </div>


      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
