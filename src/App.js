import { Box } from '@mui/material';
import * as React from 'react';
import TodoAdd from './todoAdd.js';
import TodoList from './todoList.js';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import DeleteIcon from '@mui/icons-material/Delete';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const [todos, setTodos] = useState(()=> {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos):[];
  });
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const addTodo = (InputText) =>{  
    const newTodos= {
    id: Date.now(),
    text: InputText,
    completed: false
    }
    setTodos(todos => [newTodos, ...todos])
  }
  const toggleTodo= (id) => {
    setTodos(prev => 
      prev.map(todos =>
        todos.id ===id ? {...todos, completed: !todos.completed} : todos 
      )
    )
  }
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todos => todos.id !==id));
  }

  const editTodos = (id, newText) =>
  {
    setTodos(prev => prev.map(todos =>
      todos.id === id ? {...todos, text: newText} : todos
    ))
  }
  return (
    <>
    <Container maxWidth = "md">
    <Box sx={{ flexGrow: 1, marginBottom:10, marginTop:2}}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" startIcon={<FilterListIcon/>} onClick={handleOpen}>Sort</Button>
          <Typography variant="h6" align='center' component="div" sx={{ flexGrow: 1 }}>
            My Todo App
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleEnter}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    <TodoAdd addTodo={addTodo}/>
    </Container>
    </>
  );
}


export default App;
