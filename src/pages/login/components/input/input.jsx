import React from 'react';
import './input.css';
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


const Input = ({attribute,handleChange}) => {
    return (
        <div >
            <CssTextField  margin="none" variant="outlined" 
                id={attribute.id} /* identificar con que input estamos trabajando */
                label={attribute.name}
                name={attribute.name} /* trabajar con accesibilidad y trabajar con funciones dinamicas */
                placeholder={attribute.placeholder} /* texto de ayuda en caja */
                type={attribute.type}/* tipo de caracteres que se muestra */
                InputLabelProps={{className:'TextLabel'}}
                onChange={(e)=> handleChange(e.target.name, e.target.value)} /* manejador de estados a partr de un evento */
            />
        </div>
    )
};
export default Input;