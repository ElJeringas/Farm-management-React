import React ,{useState} from 'react';
import Input from './components/input/input';
import Title from './components/title/title';
import './register.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Popup from '../Popup/Popup';



const Register = () =>{

    const [username, setUsername] = useState('');
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[phone_number, setPhone] = useState('');
    const[password, setPassword] = useState('');
    const [password_confirmation, setConfPass] = useState('');
    const history=useHistory();

    const logeo = () =>{
        history.push('/')
    }



    function handleChange(valid, value){
        if(valid === 'username'){
            setUsername(value)
        }

        if(valid === 'password'){
            setPassword(value);
        }

        if(valid === 'name'){
            setName(value);
        }
        if(valid === 'email'){
            setEmail(value);
        }
        if(valid === 'phone_number'){
            setPhone(value);
        }
        if (valid === 'password_confirmation'){
            setConfPass(value)
        }
    }

    function handleSubmit(){
        let account = {username,name,email,phone_number,password,password_confirmation}
        console.log(account);
        Axios.post('https://farm-management.xyz/users/signup/', account)
		.then( ( response ) => {
			console.log( response.status)
            if(response.status == 201){
                console.log("tas bien");
                return(
                    <Popup trigger={true}>
                    <h3>Todo bien</h3>
                    </Popup>
                )
            }else{
                console.log('tas mal');
            }
		} )
        .catch( (error) =>{
            // handle error
            console.log(error);
        })
    }

    
    /* @@@@@@@ */
     

    const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #f9aa33 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          width:'100px',
          alignItems:'center',
          /* margin:'10px', */
          marginTop: '10px',
          padding: '0 20px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
    })(Button);


    /* @@@@@@@ */
   
        return (
            <div>
                <div className='register-container'>
                    <div className='register-content'>
                        <Title text='Registro de nuevo usuario'/>
                        <Input
                            attribute={{
                                id:'username',
                                label:'usuario',
                                name:'username',
                                type:'text',
                                placeholder:'Ingrese usuario',
                            }}
                            handleChange={handleChange}          
                        
                        />
                        <Input
                            attribute={{
                                id:'name',
                                label:'Nombre de usuario',
                                name:'name',
                                type:'text',
                                placeholder:'Ingrese su nombre',
                            }}
                            handleChange={handleChange}          
                        />
                        <Input
                            attribute={{
                                id:'email',
                                label:'email',
                                name:'email',
                                type:'email',
                                placeholder:'Ingrese su email',
                            }}
                            handleChange={handleChange}          
                        />
                        <Input
                            attribute={{
                                id:'phone_number',
                                label:'telefono',
                                name:'phone_number',
                                type:'text',
                                placeholder:'Ingrese su telefono',
                            }}
                            handleChange={handleChange}          
                        />
                        <Input
                            attribute={{
                                id:'password',
                                label:'contraseña',
                                name:'password',
                                type:'password',
                                placeholder:'Ingrese su contraseña',
                            }}
                            handleChange={handleChange}          
                        />                        
                        <Input
                            attribute={{
                                id:'password_confirmation',
                                label:'confimar contraseña',
                                name:'password_confirmation',
                                type:'password',
                                placeholder:'Confirmar contraseña',
                            }}
                            handleChange={handleChange}          
                        />

                        <StyledButton onClick={handleSubmit}>
                            Register
                        </StyledButton>    
                        <div className='register-container'>
                            ¿Ya tienes una cuenta?
                            <Button color="secondary" onClick={()=> logeo() }>Entrar</Button>
                        </div>                
                    </div>
                </div>

            </div>
        )
    
}
export default  Register ;