import * as React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Stack,
  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
function TodoList({todos, toggleTodo, deleteTodo, editTodos}) {
    return (
      <List>
        {todos.map((todo) => (
        <ListItem key={todo.id}>
          <ListItemText
            primary={todo.text}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          />
        <Stack direction='row' spacing={2}>
          <Button size="small" variant='contained' startIcon={<EditIcon/>} disabled={todo.completed===true} onClick={() => handleClickOpen(todo)}>
          Edit
          </Button>
        
          <Button color='error' size="small" variant='contained' startIcon={<DeleteIcon/>} onClick={() => deleteTodo(todo.id)}>
            Delete
          </Button>
          <Button color='success' size="small" variant='contained' startIcon={<CheckIcon/>} onClick={() => toggleTodo(todo.id)}>
            Completed
          </Button>  
        </Stack>
        </ListItem>
      ))}
      </List>
    );
  }
  
  export default TodoList;
