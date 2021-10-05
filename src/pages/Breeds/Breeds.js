import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Title from '../login/components/title/title';
import Input from '../home/farm_components/Input';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions } from '@mui/material';
import { Card,CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import bkder from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/breedsbg.png';
import pastoback from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/pastoback.png'


import './Breeds.css'

const apiUrl = 'https://farm-management.xyz/breeds/';


const useStyles = makeStyles((theme) => ({

    root: {
        minWidth:300,
        margin:"1em",
        boxSizing:"border-box",
        maxWidth: 500,
        minHeight:300,
        maxHeight:400,
        backgroundColor:"#FFFFFF",
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    
  }));
const Breeds = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [description, setDescription]=useState('');
    const [purpose, setPurpose] = useState('');
    const history=useHistory();
    const [isSuccessfully, setIsSuccessfully] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setIsSuccessfully(false);
      };

    const Back = () =>{
        history.push('/home')
    }


    function handleChange(name, value){
        if(name === 'name'){
            setName(value)
        }else{
            setDescription(value)    
        }
        if(name==='purpose'){
            setPurpose(value)
        }
    }

    const btnDisabled = name.length > 0 && purpose.length > 0  && description.length > 0; // this three conditions should have filled for activate the button submmit. 


    function handleSubmit (){
        let breed = {name,description,purpose}
        let token = localStorage.getItem('token');

        console.log(token);

        const api = apiUrl; 


        axios.post(api ,breed,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
        .then( ( response ) => {
            console.log( response.status )
            console.log(response.data);
            if(response.status == 201){
                console.log("tas bien");
                console.log(response.data);
                setIsSuccessfully(true);
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
                <div className='breed-container'>
                <div className='inline'>
                    <img className= 'side-back'src={pastoback} alt="bk" width="500" height="500"></img>
                    <img className= 'home-background'src={bkder} alt="bk" width="500" height="500"></img>
                </div>                    
                    <div className='breed-content'>
                    <Card className={classes.root} >
                        <Title text='Breed Create'/>
                        <Input 
                            attribute={{
                                id:'name',
                                label:'name',
                                name:'name',
                                type: 'text',
                                placeholder: 'Nombre de la raza'
                            }}

                            handleChange={handleChange}
    
                        />
                        <Input  
                            attribute={{
                            id:'description',
                            label:'description',
                            name:'description',
                            type: 'text',
                            placeholder: 'descripcion'
                            }}

                            handleChange={handleChange}
                        />
                        <Input  
                            attribute={{
                            id:'purpose',
                            label:'purpose',
                            name:'purpose',
                            type: 'text',
                            placeholder: 'prooposito'
                            }}

                            handleChange={handleChange}
                        />

                    <CardActions> 
                        <Button variant="contained" color="primary"startIcon={<Save/>} disabled={!btnDisabled} onClick={handleSubmit}>
                            Crear
                        </Button>
                    </CardActions> 
                    <CardActions> 
                    <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                    </Button>                                       
                    </CardActions> 
                    </Card>

                    <Dialog
                          open={isSuccessfully}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                          {"Su raza: "}{name} {" Ha sido creado"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Se encuentra disponible para su uso
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}autoFocus>Cerrar</Button>
                        </DialogActions>                    
                    </Dialog>                     
                    </div>
                </div>
            </div>
        )
    
}
export default  Breeds;