import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const CssTextField = withStyles({
    input: {
    color: '#fff',
    },
    root: {
        margin: '10px',
      '& label.Mui-focused': {
        color: '#f9aa33',
      },
      
      '&::placeholder': {
        color: '#fff',
      },

      '& .MuiInput-underline:after': {
        borderBottomColor: '#f9aa33',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#A9A9A9', 
        },
        '&:hover fieldset': {
          borderColor: '#f9aa33',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f9aa33',
        },
      },
    },
  })(TextField);


const InputAnimal=({attribute,handleChange,param})=> {
    return (
        <div>
            <CssTextField
                InputLabelProps={{ shrink: true }}
                id={attribute.id}
                label={attribute.name}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                variant={"outlined"}
                onChange={(e => handleChange(e.target.id, e.target.value))}
                error={param}
/*                 helperText={param ? ' debe tener min 6 caracteres.' : ' '}
 */            />
        </div>
    )
}
export default  InputAnimal;