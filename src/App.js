import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import "./components/LoginForm/LoginForm.css"


import Todos from './components/Todos/Todos';

class App extends Component {

  state = {

  }

  handleSubmit = () => {

    const xxx = (da) => this.setState(da);

    const body = {
      // email: this.state.email,
      username: this.state.username,
      password: this.state.password
  }

  const config = {
      headers: {
          'Content-Type':'application/json'
      }
    };

  axios.post('http://localhost:8000/login',body, config)
    .then(function (response) {
      // console.log(response.data.user.user.email); 
      // console.log(response.data["x-auth"]);
      xxx({
        // loggedInUser: response.data.user.user.email,
        loggedInUser: response.data.user.user.username,
        'x-auth': response.data["x-auth"],
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  updateInputValue1 = (evt) => {
    this.setState({
      // email: evt.target.value
      username: evt.target.value
  });
  }

  updateInputValue2 = (evt) => {
    this.setState({
      password: evt.target.value
  });
  }
  

  render() {

    let loggedInMessage;

    if(this.state.loggedInUser != null){
      loggedInMessage = (
        <div className='loggedInMessage'>
          <h3>
        Logged in as: {this.state.loggedInUser} 
        </h3>
        </div>
      );
    }

    // let loggedIn;

    // if(this.state.loggedInUser != null){
    //   loggedIn = (
    //     <Todos auth={this.state["x-auth"]} />
    //   );
    // }

    let loginForm;
    
    if(this.state.loggedInUser == null){
      loginForm = (
        <div className='LoginFormContainer'>
        <div className='LoginForm'>
            {/* <input type="email" value={this.state.email} onChange={evt => this.updateInputValue1(evt)} /> */}
            <input type="text" placeholder="Username" onChange={evt => this.updateInputValue1(evt)}  autofocus="true"/>
            <div className="animateBorder"></div>
            <input type="password" placeholder="Password" onChange={evt => this.updateInputValue2(evt)}/>
            <div className="animateBorder"></div>
            <button onClick={() => {this.handleSubmit()}}><strong>LOGIN</strong></button>
            <p>Powered by NodeJS / Socket.io and MongoDB</p>
        </div>
        </div>
      );
    }
        
    return (
      <div className="App">
      {/* {loggedInMessage} */}

      {loginForm}

      <Todos auth={this.state["x-auth"]} username={this.state.username} />
      
      </div>
    );

  }
   
}

export default App;