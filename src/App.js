import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/header";
import "./App.css";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import { v4 as uuidv4 } from "uuid";

import Axios from "axios";

class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount() {
    //fetch request
    Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => this.setState({ todos: res.data} ))
  }

  //toggle item list (completed)
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //delete todo item
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    }))
  };

  //Add todo
  addTodo = (title) => {
    Axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    //add to the state
    
  };

  render() {
    // console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />

            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;