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

  const [searchText, setSearchText] = useState('');
  const [todos, setTodos] = useState(()=> {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos):[];
  });
  const [status, setStatus] = React.useState(null);
  const [openSortDialogue, setOpenSortDialogue] = React.useState(false);
  const [openSearchDialogue, setOpenSearchDialogue] = useState(false);

  
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handleCloseSortDialogue = () => {
    setOpenSortDialogue(false);
  };

  const handleOpenSortDialogue = () => {
    setOpenSortDialogue(true);
  };
  
  const handleCloseSearchDialogue = () => {
    setOpenSearchDialogue(false);
  };

  const handleOpenSearchDialogue = () => {
    setOpenSearchDialogue(true);
  };

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
  const filteredTodos = () =>
  {
    return todos.filter(items => items.text.toLowerCase().includes(searchText.toLowerCase()));
  };

  const handleEnter = (e) =>
  {
    if (e.key==='Enter') 
    {
      e.preventDefault();
        if (searchText.trim()==='')
        {
          alert('Please enter a todo')
        }      
        else 
        {
          handleOpenSearchDialogue();
        }
    }
  };
  const filterBy = () => {
    if (status===null)
    {
      return ''
    }
    else if (status==='complete')
    {
      return todos.filter(items => items.completed===true) 
    }
    else
    {
      return todos.filter(items => items.completed===false);
    }
    }
  
  
  return (
    <>
    <Container maxWidth = "md">
    <Box sx={{ flexGrow: 1, marginBottom:10, marginTop:2}}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" startIcon={<FilterListIcon/>} onClick={handleOpenSortDialogue}>Sort</Button>
          <Dialog
          open={openSortDialogue}
          onClose={handleCloseSortDialogue}
        >
          <DialogTitle>Todo Status</DialogTitle>
          <DialogContent>
          <FormControl>
         <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={status}
          onChange={(e) =>  setStatus(e.target.value)}
        >
          <FormControlLabel value="complete" control={<Radio />} label="Completed Todos" />
          <FormControlLabel value="incomplete" control={<Radio />} label="InComplete Todos" />
      </RadioGroup>
    </FormControl>
          </DialogContent>
          <DialogContentText>
          
            <List>
          {filterBy().length > 0 ? (
          filterBy().map(todo => (
            <ListItem key={todo.id}>
              <ListItemText>
                {todo.text}
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText>Please select a todo status</ListItemText>
          </ListItem>
        )}
        </List>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseSortDialogue}>Cancel</Button>
          </DialogActions>
        </Dialog>
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
          <Dialog
        open={openSearchDialogue}
        onClose={handleCloseSearchDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Search Results</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <List>
          {filteredTodos().length > 0 ? (
          filteredTodos().map(todo => (
            <ListItem key={todo.id}>
              <ListItemText>
                Todo: {todo.text}
                <br />
                Status: {todo.completed ? 'Complete' : 'Incomplete'}
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText>No matching todos.</ListItemText>
          </ListItem>
        )}
        </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSearchDialogue}>Close</Button>
        </DialogActions>
      </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
    <TodoAdd addTodo={addTodo}/>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodos={editTodos}/>
    <Box sx={{display:'flex', justifyContent: 'center', marginTop: 10}}>
      <Button color='error' size="medium" variant='contained' startIcon={<DeleteIcon/>} disabled={todos.length === 0}  onClick={() => setTodos([])}>
            Clear All
      </Button>
    </Box>
    </Container>
    </>
  );
}


export default App;
