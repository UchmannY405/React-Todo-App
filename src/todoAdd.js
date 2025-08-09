import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function TodoAdd({addTodo}) {

    const [text, setText] = useState('');
    const [errorMsg, seterrorMsg] = useState(false);

    const HandleSubmit = (e) =>
    {
        e.preventDefault();

        if (text.trim())
        {
            addTodo(text.trim());
            setText('');
            seterrorMsg(false);     
        }
        else
        {
            seterrorMsg(true);
        }
    }
    return (
      <>
      <Box 
      component="form" 
      onSubmit={HandleSubmit} 
      sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2, // space between text field and button
        margin: 'auto',
        maxWidth: '100%',
        width: 500}}>
      <TextField
        fullWidth 
        label="Enter todo"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={errorMsg}
        helperText={errorMsg ? "Task can't be empty" : ""}
       />
      <Button 
        type="submit" 
        color='success'
        variant="contained">Submit</Button>
     </Box>
      
      </>
    );
  }
  
  export default TodoAdd;
  