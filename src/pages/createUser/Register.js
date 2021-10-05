import React ,{useState} from 'react';
import Input from './components/input/input';
import Title from './components/title/title';
import './register.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Register = () =>{

    const [username, setUsername] = useState('');
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[phone_number, setPhone] = useState('');
    const[password, setPassword] = useState('');
    const [password_confirmation, setConfPass] = useState('');
    const [token, setToken] = useState('');
    const [phone_code, setPhone_code] = useState('');
    const history=useHistory();


    //******************* */

    const [open, setOpen] = useState(false);
  
/*     const handleOpen = () => {
      setOpen(true);
    };
   */
    const handleClose = () => {
      setOpen(false);
    };

    //******************** */

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
     
    }

    function handleChangeVerifyPhone(e){
            setPhone_code(e.target.value);
            console.log(phone_code);

    }

    function handleChangeVerifyToken(e){
        setToken(e.target.value);
        console.log(token);
}

    function handleSubmit(){
        let account = {username,name,email,phone_number,password,password_confirmation}
        console.log(account);
        Axios.post('https://farm-management.xyz/users/signup/', account)
		.then( ( response ) => {
			console.log( response.status)
            if(response.status == 201){
                console.log("tas bien");
                setOpen(true);
                
            }
		} )
        .catch( (error) =>{
            // handle error
            console.log(error);
/*             setOpen(true);
 */        })
    }

    function Verify(){
        console.log(token,phone_code);
        
        Axios.post(`https://farm-management.xyz/users/verify/`, token,{ headers: {"Content-type": "application/json"} })
		.then( ( response ) => {
			console.log( response.status)
            if(response.status == 201){
                console.log("tas bien");
                setOpen(true);
                
            }
		} )
        .catch( (error) =>{
            // handle error
            console.log(error);
/*             setOpen(true);
 */        }) 
        Axios.post(`https://farm-management.xyz/users/${username}/`, phone_code,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
		.then( ( response ) => {
			console.log( response.status)
            if(response.status == 201){
                console.log("tas bien");
                setOpen(true);
                
            }
		} )
        .catch( (error) =>{
            // handle error
            console.log(error);
/*             setOpen(true);
 */        })        
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
          /* margin:'10px', */
          marginTop: '10px',
          padding: '0 20px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
    })(Button);

   
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
                            {/* <Popup /> */}
                        </StyledButton>    
                        <div className='register-container'>
                            ¿Ya tienes una cuenta?
                            <Button color="secondary" onClick={()=> logeo() }>Entrar</Button>
                        </div>
                        <Dialog open={true} onClose={handleClose}>
                            <DialogTitle>Codigo de verificacion</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                Para registrarse en esta aplicación, por favor introduce el código de verificación que te enviamos 
                                a tu teléfono y correo electrónico y pulsa el botón de enviar.
                                </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="codePhone"
                                        name="codePhone"
                                        label="Código de verificación teléfono"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChangeVerifyPhone} 
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="codeMail"
                                        name="codeMail"
                                        label="Código de verificación email"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChangeVerifyToken} 
                                    />                                    
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cerrar</Button>
                                    <Button onClick={Verify}>Enviar</Button>
                                </DialogActions>
                        </Dialog>       
                    </div>
                </div>
    
            </div>
        )
    
}
export default  Register ;