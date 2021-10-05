import React, {useState} from 'react'
import { Button,CardActions,Card,Typography } from '@material-ui/core';
import axios from 'axios';
import Title from '../login/components/title/title';
import Input from '../home/farm_components/Input';
import { useHistory } from 'react-router-dom';
import { Select } from '@material-ui/core';
import { MenuItem,FormControl,InputLabel,FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackupIcon from '@material-ui/icons/Backup';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions } from '@mui/material';
import { Avatar } from '@material-ui/core';
import farmicon from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/034-horse.png'
import paddockbk from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/paddockbg.png'
import pasto from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/pastoback.png'

import './Paddocks.css';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth:400,
        margin:"1em",
        padding:50,
        boxSizing:"border-box",
        maxWidth: 345,
        minHeight:500,
        maxHeight:700,
    },
    media: {
        minWidth:"100px",
        minHeight: 100,
        maxHeight:120,
        backgroundPosition:"top",
        backgroundAttachment:"top",
        paddingBottom:10,
    },
/*     root: {
        minWidth:"500px",
        margin:"1em",
        boxSizing:"border-box",
        maxWidth: 800,
        minHeight:500,
        maxHeight:800,
        backgroundColor:"#FFF8DC",
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }, */

    sizeAvatar: {
        height: theme.spacing(10),
        width: theme.spacing(10),
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        margin:"auto",
      },
}));

const Paddocks = ()=> {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [meassure, setMeassure] = useState('');
    const [idSelecter, setIdSelecter] = useState('')
    const[getLands, setGetLands]=useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const history=useHistory();
    const classes = useStyles();
    const [isSuccessfully, setIsSuccessfully] = useState(false);



    const URL = "https://farm-management.xyz/lands/" //url de land
    let token = localStorage.getItem('token');

    const Back = () =>{
        history.push('/GetLand')
    }
    const handleIsClose = () => {
        setisOpen(false);
        setIsSuccessfully(false);
    };
    
      const handleIsOpen = () => {
        setisOpen(true);
    };

    function ShowLand (){
        axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
    /*               console.log(res);
    */              setGetLands(res.data);
                    return;
            })
            .catch(err=>{
                console.log(err);
            })
            setOpen(false);
    }

    function LandSelect(event){ //selector de fincas
        const id = event.target.value;
        setIdSelecter(id);
    }

    const renderBody = () => {
        return getLands && getLands.map(({id,name}) => {
    
            return (
            <MenuItem value={id}>{name}</MenuItem>
            )
        })
    }

    function handleChange(valid, value){
        if(valid==='name'){
            setName(value);
        }
        if(valid==='description'){
            setDescription(value);
        }
        if(valid==='meassure'){
            setMeassure(value);
        }

    }

    const btnDisabled = name.length > 0 && description.length > 0 && meassure > 0 && idSelecter > 0; // this three conditions should have filled for activate the button submmit. 


    function handleSubmit(){
        let paddock = {name,description,meassure}
        console.log(paddock);
        const api = `${URL}${idSelecter}/paddocks/`; 
        console.log(api);
        axios.post(api ,paddock,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
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
            <div className='pdk-container'>
                <div className='inline'>
                    <img className= 'side-back'src={paddockbk} alt="bk" width="500" height="500"></img>
                    <img className= 'home-background'src={pasto} alt="bk" width="500" height="500"></img>
                </div>

                <div className='pdk-content'>
                {open && ShowLand()}
                <Card className={classes.root} >
                <Typography align='center' variant='h5'>
                            Crear Potrero
                        </Typography>
                <Input
                    attribute={{
                        id:'name',
                        label:'name',
                        name:'name',
                        type:'text',
                        placeholder:'nombre'
                    }}
                    handleChange={handleChange}
                />
                <Input
                    attribute={{
                        id:'description',
                        label:'description',
                        name:'description',
                        type:'text',
                        placeholder:'descripcion'
                    }}
                    handleChange={handleChange}
                />  

                <Input
                    attribute={{
                        id:'meassure',
                        label:'meassure',
                        name:'meassure',
                        type:'number',
                        placeholder:'potrero'
                    }}
                    handleChange={handleChange}
                />
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-autowidth-label">Finca</InputLabel>
                    <Select
                            labelId="land"
                            id="land"
                            onOpen={handleIsOpen}
                            onClose={handleIsClose}
                            onChange={(e) => LandSelect(e)}
                            autoWidth
                        >
                        {renderBody()}
                    </Select>
                    <FormHelperText>Seleccionar Finca</FormHelperText>
                </FormControl>
                <CardActions>  
                <Button variant="contained" color="primary" disabled={!btnDisabled} startIcon={<BackupIcon/>}onClick={handleSubmit}>
                    Crear
                </Button>
                </CardActions>  
                <CardActions>
                <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                    Volver
                </Button>
                <Button variant="contained" color="secondary" startIcon={<RemoveRedEyeOutlinedIcon/>} onClick={Back}>
                    Ver Potreros
                </Button>    
                </CardActions>
                </Card> 

            <Dialog
                        open={isSuccessfully}
                        onClose={handleIsClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                    <Avatar className={classes.sizeAvatar}
                            alt="Farm"
                            src={farmicon}
                            sx={{ width: 500, height: 500 }}
                        />
                        {"Potrero creado en la finca: "}{idSelecter}

                    </DialogTitle>
                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                           Potrero {name} creado!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleIsClose}autoFocus>Cerrar</Button>
                    </DialogActions>                    
                </Dialog>
            </div>
            </div>
        )
    
}

export default Paddocks;
