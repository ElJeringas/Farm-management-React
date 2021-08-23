import React, { useState } from 'react';
import './login.css'
import Title from './components/title/title';
import Input from './components/input/input';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';




const Login = () => {
    const [username, setUser] = useState('');
    const [password, setPassword]=useState('');
    const history=useHistory();


    const registro = () =>{
        history.push('/register')
    }





    function handleChange(name, value){
        if(name === 'usuario'){
            setUser(value)
        }else{
            setPassword(value)    
        }
    }

    function handleSubmit (){
        let account = {username,password}
        console.log(account);
        Axios.post('https://farm-management.xyz/users/login/', account)
		.then( ( response ) => {
			console.log( response.status )            
            if(response.status == 201){
                console.log("tas bien");
                console.log(response.data["token"]);
                let token = response.data["token"];
                localStorage.setItem('token',token);
                history.push('/home');

            }else{
                console.log('tas mal');
            }
		} )
        .catch( (error) =>{
            // handle error
            console.log(error);
        })


    }

    const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #f9aa33 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          width:'100px',
          alignItems:'center',
          marginTop: '10px',
          padding: '0 20px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
    })(Button);

    return(
        <div>

    <div className='login-container'>

    <div className='login-content'>

        <Title text='Farm Management'/>

        <Input 
            attribute={{
                id:'usuario',
                label:'Contraseña',
                name:'usuario',
                type: 'text',
                placeholder: 'Ingrese su usuario'
            }}

            handleChange={handleChange}
    
        />
        <Input  
            attribute={{
                id:'contraseña',
                label:'Nombre de usuario',
                name:'contraseña',
                type: 'password',
                placeholder: 'Ingrese su contraseña'
            }}

            handleChange={handleChange}
        />

        <div className='submit-button-container'>
            <StyledButton onClick={handleSubmit}>
                Sign In
            </StyledButton>
        </div>

        
        <div >
            ¿No tienes una cuenta? {'\n'}
            <Button color="secondary" onClick={()=> registro() }>Regístrate</Button>
        </div>

    </div>
    
</div>
        </div>
    )
};

export default Login;
