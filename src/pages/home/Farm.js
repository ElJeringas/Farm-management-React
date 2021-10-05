import React, { useState } from 'react';
import { Button,CardActions,Card,Typography } from '@material-ui/core';
import Title from '../login/components/title/title';
import Input from './farm_components/Input';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Farm.css'
import land from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/landimage.png'
import leftback from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/landback.png'
import { Save } from '@material-ui/icons';
import { Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions } from '@mui/material';

import { makeStyles } from '@material-ui/core';

const apiUrl = 'https://farm-management.xyz/lands/';

const useStyles = makeStyles((theme) => ({

    root: {
        minWidth:"30vw",
        margin:"1em",
        boxSizing:"border-box",
        maxWidth: 800,
        minHeight:300,
        maxHeight:500,
        backgroundColor:"#FFF8DC",
    },
    
  }));


const Farm = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [location, setLocation]=useState('');
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
            setLocation(value)    
        }
    }
    const btnDisabled = name.length > 0 && location.length > 0 ; // this three conditions should have filled for activate the button submmit. 


    function handleSubmit (){
        let farm = {name,location}
        let token = localStorage.getItem('token');

        console.log(token);

        const api = apiUrl; 


        axios.post(api ,farm,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
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
                <div className='farm-container'>
                <img className= 'wallpaper-background' src={land} alt="land" width="500" height="500"></img>
                

                    <div className='farm-content'>
{/*                         <Title text='Farm Create'/>
 */}                        <Card className={classes.root} >
                        <Typography align='center' variant='h5'>
                            Crear Finca
                        </Typography>
                        <Input 
                            attribute={{
                                id:'name',
                                label:'farm name',
                                name:'name',
                                type: 'text',
                                placeholder: 'Farm name'
                            }}

                            handleChange={handleChange}
    
                        />
                        <Input  
                            attribute={{
                            id:'location',
                            label:'farm location',
                            name:'location',
                            type: 'text',
                            placeholder: 'Location'
                            }}

                            handleChange={handleChange}
                        />

                        <CardActions>                                 
                        <Button variant="contained" startIcon={<Save/>} disabled={!btnDisabled} color="primary" onClick={handleSubmit}>
                            Crear
                        </Button>
                        </CardActions>
                        <CardActions>
                    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
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
                          {"Su finca: "}<b>{name}</b> {" ...Ha sido creada"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Se encuentra disponible para su uso.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}autoFocus>Cerrar</Button>
                        </DialogActions>                    
                    </Dialog> 
                </div>
                    <img className= 'wallpaper-background-left' src={leftback} alt="land" width="350" height="350"></img>
                </div>
            </div>
        )
    
}
export default  Farm;