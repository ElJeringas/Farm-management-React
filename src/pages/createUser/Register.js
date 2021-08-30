import React ,{useState} from 'react';
import Input from './components/input/input';
import Title from './components/title/title';
import './register.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import SpringModal from '../Popup/Popup';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });


  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };




const Register = () =>{

    const [username, setUsername] = useState('');
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[phone_number, setPhone] = useState('');
    const[password, setPassword] = useState('');
    const [password_confirmation, setConfPass] = useState('');
    const history=useHistory();


    //******************* */

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
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
                setOpen(true);
            }
		} )
        .catch( (error) =>{
            // handle error
            console.log(error);
/*             setOpen(true);
 */        })
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
                            {/* <Popup /> */}
                        </StyledButton>    
                        <div className='register-container'>
                            ¿Ya tienes una cuenta?
                            <Button color="secondary" onClick={()=> logeo() }>Entrar</Button>
                        </div>                
                    </div>
                </div>
                
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="spring-modal-title">Registro exitoso!</h2>
                            <p id="spring-modal-description">Revise bandeja de entrada del correo para validar la verificacion de su usuario</p>
                        </div>
                    </Fade>
                </Modal>

            </div>
        )
    
}
export default  Register ;