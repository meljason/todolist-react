import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends React.Component {
    
  render() {
    // console.log(this.props.todos)
    return this.props.todos.map((todo) => (
        <TodoItem style={todoItemStyle} key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
    ));
  }
}


//proptypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markCOmplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}

const todoItemStyle = {
  paddingTop: "25px",
  backgroundColor: "#FFFFFF"
}

export default Todos;
