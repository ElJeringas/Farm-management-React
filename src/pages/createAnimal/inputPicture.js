import React, { useState,Component } from 'react';
import axios from 'axios';
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

const inputPicture=()=> {
    const [file, setFile] = useState(null);
    function fileSelected(event){
        setFile(event.target.files[0]);
    }

    function fileUpload(){
        const fd = new FormData();
        fd.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        const api = 'https://farm-management.xyz/lands/4/animals/'; 
        let token = localStorage.getItem('token');

        axios.post(api ,fd,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
        .then( ( response ) => {
            console.log( response.status )
            console.log(response.data);
            if(response.status === 201){
                console.log("tas bien");
                console.log(response.data);
            }else{
                console.log('tas mal');
            }
        } )
        .catch( (error) =>{
            // handle error
            console.log(error);
        })        
    }
    
    return (
        <div>
            <div>
                <CssTextField variant={"outlined"} InputLabelProps={{ shrink: true }} type='file' id='files' name='Picture' label='Picture' onChange={this.fileSelected}/>
                    <button onClick={this.fileUpload}>Enviar</button>              
            </div>            
        </div>
    )
}

export default  inputPicture;