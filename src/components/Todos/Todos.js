import React from 'react';
import axios from "axios";
import io from 'socket.io-client';

import Nav from './../Nav/Nav';

import './Todos.css';

// URL of the API
const socket = io.connect('http://localhost:8000');

export default class Todos extends React.Component {

state = {
  inputValue: '',
  'x-auth': this.props['auth']
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // Typical usage (don't forget to compare props):

  if (this.props.auth !== prevProps.auth) {
    // this.fetchData(this.props["x-auth"]);
    this.setState({'x-auth':this.props.auth});

    // DEBUG NEEDS TO BE REMOVED
    console.log('auth:', this.props.auth);
  }

}


handleSubmit = (event) => {

  const body = {
      text: this.state.inputValue
  }

  const auth = this.state["x-auth"];

  const config = {
      headers: {
          "x-auth": auth,
          'Content-Type':'application/json',
      }
    };

    console.log(config);

  axios.post('http://localhost:8000/todos',body, config)
    .then(function (response) {
      console.log(response);
      socket.emit('getNewTodo');      
    })
    .catch(function (error) {
      console.log(error);
    });
}

selectTodoToUpdate = (todoId, todoText) => {


console.log(todoId);
  console.log(document.getElementById(todoId).getElementsByClassName('toggleOff'));
  
  document.querySelectorAll('.toggleOff').forEach( (item) => {
    item.style.display = 'block';
  });

  document.querySelectorAll('.toggleOn').forEach( (item) => {
    item.style.display = 'none';
  });


  document.getElementById(todoId).getElementsByClassName('toggleOff')[0].style.display = 'none';
  document.getElementById(todoId).getElementsByClassName('toggleOn')[0].style.display = 'block';


  this.setState({
    tempInputValue: todoText,
    tempId: todoId
  });

}

updateTodo = () => {
  console.log(this.state['x-auth']);

  console.log("UPDATE ID: ", this.state.tempId);
  console.log('UPDATE TEXT: ', this.state.tempInputValue);

  document.getElementById(this.state.tempId).getElementsByClassName('toggleOff')[0].style.display = 'block';
  document.getElementById(this.state.tempId).getElementsByClassName('toggleOn')[0].style.display = 'none';

  const body = {
    text: this.state.tempInputValue
}

const auth = this.state["x-auth"];

const config = {
    headers: {
        "x-auth": auth,
        'Content-Type':'application/json',
    }
  };

  console.log(config);

axios.patch(`http://localhost:8000/todos/${this.state.tempId}`,body, config)
  .then(function (response) {
    console.log(response);
    socket.emit('getNewTodo');      
  })
  .catch(function (error) {
    console.log(error);
  });

}

deleteTodo = () => {
  console.log(this.state['x-auth']);

  console.log("DELETE ID: ", this.state.tempId);
  console.log('UPDATE TEXT: ', this.state.tempInputValue);

  document.getElementById(this.state.tempId).getElementsByClassName('toggleOff')[0].style.display = 'block';
  document.getElementById(this.state.tempId).getElementsByClassName('toggleOn')[0].style.display = 'none';


const auth = this.state["x-auth"];

const config = {
    headers: {
        "x-auth": auth,
        'Content-Type':'application/json',
    }
  };

  console.log(config);

axios.delete(`http://localhost:8000/todos/${this.state.tempId}`, config)
  .then(function (response) {
    console.log(response);
    socket.emit('getNewTodo');      
  })
  .catch(function (error) {
    console.log(error);
  });

}

componentWillMount() {

  socket.on('connect', function () {
    console.log('Connected');
  });

}

componentDidMount() {

  const xxx = (da) => this.setState(da);

  socket.on('todos', function (data) {
    console.log('Get todos:', data.todos);
    xxx(data.todos);
  });
}

//UPDATE THE INPUT VALUE OF THE INPUT TO CREATE A TODO
updateInputValue = (evt) => {
  this.setState({
    inputValue: evt.target.value
});
}

tempInputValue = (evt) => {
  this.setState({
    tempInputValue: evt.target.value
  });
}

onDragOver = (ev) => {
  ev.preventDefault();
}

onDragStart = (ev, id) => {
  console.log('dragstart:', id);
  ev.dataTransfer.setData("id",id);

  // FOR INTERNET EXPLORER
  // ev.dataTransfer.setData(“text/plain”,id)

}

onDrop = (ev, cat) => {       
  let id = ev.dataTransfer.getData("id");

  // FOR INTERNET EXPLORER
  // var id = ev.dataTransfer.getData(“text”);

  console.log('IS IS NU VERPLAATST:  ' + id + "category is nu " + cat);


  const body = {
    category: cat
}

const auth = this.state["x-auth"];

const config = {
    headers: {
        "x-auth": auth,
        'Content-Type':'application/json',
    }
  };

  console.log(config);

axios.patch(`http://localhost:8000/todos/${id}`,body, config)
  .then(function (response) {
    console.log(response);
    socket.emit('getNewTodo');      
  })
  .catch(function (error) {
    console.log(error);
  });

}


render() {
    let backlog = [];
    let inProgressItems = [];
    let bugFixes = [];
    let readyForQa = [];
    let doneItems = [];


      if(this.state.todos != null) {

        this.state.todos.map( todo => {

          if(todo.category === 1){
            backlog.push(
              <li key={todo._id} 
              onDragStart={(e)=>this.onDragStart(e, todo._id)}                    
              draggable                    
              className="draggable"> 
              
              <div id={todo._id}>
              <div className="toggleOff">
              <div onClick={() => {this.selectTodoToUpdate(todo._id, todo.text)}}> {todo.text} </div>
              </div>
    
              <div className="toggleOn">
              <input value={this.state.tempInputValue} onChange={evt => this.tempInputValue(evt)} />
              <button onClick={() => {this.updateTodo()}}>SUBMIT</button>
              <button onClick={() => {this.deleteTodo()}}>DELETE</button>
              </div>
              </div>
               
               </li>
            );
        }

          if(todo.category === 2){
            inProgressItems.push(
              <li key={todo._id} 
              onDragStart={(e)=>this.onDragStart(e, todo._id)}                    
              draggable                    
              className="draggable"> 
              
              <div id={todo._id}>
              <div className="toggleOff">
              <div onClick={() => {this.selectTodoToUpdate(todo._id, todo.text)}}> {todo.text} </div>
              </div>
    
              <div className="toggleOn">
              <input value={this.state.tempInputValue} onChange={evt => this.tempInputValue(evt)} />
              <button onClick={() => {this.updateTodo()}}>SUBMIT</button>
              <button onClick={() => {this.deleteTodo()}}>DELETE</button>
              </div>
              </div>
               
               </li>
            );
        }

        if(todo.category === 3){
          bugFixes.push(
            <li key={todo._id} 
            onDragStart={(e)=>this.onDragStart(e, todo._id)}                    
            draggable                    
            className="draggable"> 
            
            <div id={todo._id}>
            <div className="toggleOff">
            <div onClick={() => {this.selectTodoToUpdate(todo._id, todo.text)}}> {todo.text} </div>
            </div>
  
            <div className="toggleOn">
            <input value={this.state.tempInputValue} onChange={evt => this.tempInputValue(evt)} />
            <button onClick={() => {this.updateTodo()}}>SUBMIT</button>
            <button onClick={() => {this.deleteTodo()}}>DELETE</button>
            </div>
            </div>
             
             </li>
          );
      }

      if(todo.category === 4){
        readyForQa.push(
          <li key={todo._id} 
          onDragStart={(e)=>this.onDragStart(e, todo._id)}                    
          draggable                    
          className="draggable"> 
          
          <div id={todo._id}>
          <div className="toggleOff">
          <div onClick={() => {this.selectTodoToUpdate(todo._id, todo.text)}}> {todo.text} </div>
          </div>

          <div className="toggleOn">
          <input value={this.state.tempInputValue} onChange={evt => this.tempInputValue(evt)} />
          <button onClick={() => {this.updateTodo()}}>SUBMIT</button>
          <button onClick={() => {this.deleteTodo()}}>DELETE</button>
          </div>
          </div>
           
           </li>
        );
    }

    if(todo.category === 5){
      doneItems.push(
        <li key={todo._id} 
        onDragStart={(e)=>this.onDragStart(e, todo._id)}                    
        draggable                    
        className="draggable"> 
        
        <div id={todo._id}>
        <div className="toggleOff">
        <div onClick={() => {this.selectTodoToUpdate(todo._id, todo.text)}}> {todo.text} </div>
        </div>

        <div className="toggleOn">
        <input value={this.state.tempInputValue} onChange={evt => this.tempInputValue(evt)} />
        <button onClick={() => {this.updateTodo()}}>SUBMIT</button>
        <button onClick={() => {this.deleteTodo()}}>DELETE</button>
        </div>
        </div>
         
         </li>
      );
  }

        });

    }

    let createTodoPage;

    if(this.state['x-auth'] != null){
      createTodoPage = (
        <div className="Todos container-drag">
        <Nav username={this.props.username} />

          <div className='createForm'>
          <h3>Create:</h3>
          <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
          <button onClick={() => {this.handleSubmit()}}>SUBMIT</button>

        </div>
          <div className="todosContainer">

        <div className="Todo">
        <h3>Backlog</h3>
         <ul className="droppable"
         onDragOver={(e)=>this.onDragOver(e)}                    
         onDrop={(e)=>this.onDrop(e, 1)}>

          {backlog}

         </ul>
         </div>

           <div className="Todo">
        <h3>In Progress</h3>
         <ul className="droppable"
         onDragOver={(e)=>this.onDragOver(e)}                    
         onDrop={(e)=>this.onDrop(e, 2)}>

          {inProgressItems}

         </ul>
         </div>

           <div className="Todo">
        <h3>Bug Fixes</h3>
         <ul className="droppable"
         onDragOver={(e)=>this.onDragOver(e)}                    
         onDrop={(e)=>this.onDrop(e, 3)}>

          {bugFixes}

         </ul>
         </div>

           <div className="Todo">
        <h3>Ready For Qa</h3>
         <ul className="droppable"
         onDragOver={(e)=>this.onDragOver(e)}                    
         onDrop={(e)=>this.onDrop(e, 4)}>

          {readyForQa}

         </ul>
         </div>

         <div className="Todo">
        <h3>Done</h3>
         <ul className="droppable"
         onDragOver={(e)=>this.onDragOver(e)}                    
         onDrop={(e)=>this.onDrop(e, 5)}>

          {doneItems}

         </ul>
         </div>

          </div>
        </div>
      );
    }

    return( 
      <div> 
      {createTodoPage}
      </div>
      );
}

}

