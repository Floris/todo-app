import React from 'react';
import axios from "axios";
import io from 'socket.io-client';



// import './TodoInput.css';

export default class TodoInput extends React.Component {

state = {
    inputValue: ''
};

updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value
});
}

handleSubmit = (event) => {
    const socket = io.connect('http://localhost:8000');

    const body = {
        text: this.state.inputValue
    }

    const config = {
        headers: {
            'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjNjYzdjNGU0MDQ4YTJmODQzZjQ2OGIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTMwNzA5OTU3fQ.ZapTg9Fu1PjQP8wW0pdLIo4SpsnsG4wnuXE8JbV4t3I',
            'Content-Type':'application/json',
        }
      };

    axios.post('http://localhost:8000/todos',body, config)
      .then(function (response) {
        console.log(response);
        socket.emit('getNewTodo', true);
      })
      .catch(function (error) {
        console.log(error);
      });
}

// componentDidMount() {



// }

render() {

    return( 
        <div className='TodoInput'>
        <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
    <button onClick={() => {this.handleSubmit()}}>SUBMIT</button>
        </div>
      );
}

}

