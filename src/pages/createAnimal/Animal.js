import React,{useState,useEffect} from 'react'
import { Typography } from '@material-ui/core';
import InputAnimal from './InputAnimal';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Card,CardActions,Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem,FormControl,InputLabel,FormHelperText } from '@material-ui/core';
import { Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions } from '@mui/material';
import backg from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/paddockbg.png'
import bro from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/Shared goals-bro.png'
import './createAnimal.css';


const useStyles = makeStyles((theme) => ({

    root: {
        minWidth:"500px",
        margin:"1em",
        boxSizing:"border-box",
        maxWidth: 800,
        minHeight:500,
        maxHeight:800,
        backgroundColor:"#FFFFFF",
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    
  }));

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


const Animal = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const[birth_date,setBirth] = useState('');
    const history=useHistory();
    const [idSelecter, setIdSelecter] = useState('')
    const[gender, setGender] = useState('');
    const [isSuccessfully, setIsSuccessfully] = useState(false);

/*     const[weight, setWeight] = useState(''); */
/*     const [breed, setBreed] = useState(''); */
   // const [group, setGroup] = useState('');
   
   let token = localStorage.getItem('token');

    const [open, setOpen] = useState(false);
    
    const URL = "https://farm-management.xyz/lands/" //url de land
    const[getLands, setGetLands]=useState([]);
    const [isOpen, setisOpen] = useState(false);

    const handleIsClose = () => {
      setisOpen(false);
  };
  
    const handleIsOpen = () => {
      setisOpen(true);
  };

  function ShowLand (){
    axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
        .then(res=>{
            console.log(res);
            setGetLands(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
        setisOpen(false);
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
  
    const handleClose = () => {
      setOpen(false);
      setIsSuccessfully(false);
    };

    const Back = () =>{
        history.push('/home')
    }

    
        const [picture,setPicture]=useState();
        
        function fileSelected(event){
            setPicture(event.target.files[0]);
        }

    function handleChange(valid, value){
        if(valid === 'name'){
            setName(value)
            
        }

        if(valid === 'birth_date'){
            setBirth(value);
        }

        if(valid === 'gender'){
            setGender(value);
        }
    }

    const btnDisabled = name.length > 0 && birth_date.length > 0  && gender.length > 0 && idSelecter > 0; // this three conditions should have filled for activate the button submmit. 


    function handleSubmit(){
        let token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append('name',name)
        formData.append('birth_date',birth_date)
        formData.append('picture',picture)
        formData.append('gender',gender)

        const api = `${URL}${idSelecter}/animals/`; 


        axios.post(api ,formData,{ headers: {"Content-type": "multipart/form-data'", "Authorization" : `Token ${token}`} })
        .then( ( response ) => {
            if(response.status == 201){
                console.log("tas bien");
                console.log(response.data);
                setIsSuccessfully(true);
            }
        } )
        .catch( (error) =>{
            // handle error
            console.log(error);
        })



    }
    //este codigo servira para el maquetado de los botonoes
/*     const StyledButton = withStyles({
        disabled:{
          background:'#808080',
          backgroundColor:'#FFFFFF'
        },
        root: {
          background: '#ADD8E6',
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
 */
   
        return (
            <div>
              {isOpen && ShowLand()}
                <div className='animal-container'>
                <div className='inline'>
                    <img className= 'side-back'src={backg} alt="bk" width="500" height="500"></img>
                    <img className= 'home-background'src={bro} alt="bk" width="500" height="500"></img>
                </div>
                    <div className='animal-content'>
                        <Card className={classes.root} >
                        <Typography align='center' variant='h5'>
                            Crear animal
                        </Typography>
                        <InputAnimal
                            attribute={{
                                id:'name',
                                label:'Animal name',
                                name:'Animal name',
                                type: 'text',
                                placeholder: 'Animal name'
                            }}
                            handleChange={handleChange}    

                        />
                        <InputAnimal
                            attribute={{
                                id:'birth_date',
                                label:'Birth date',
                                name:'birth_date',
                                type: 'date',
                                
                            }}
                            handleChange={handleChange} 
                        />
                        <CssTextField variant={"outlined"} InputLabelProps={{ shrink: true }} type='file' id='files' name='Picture' label='Picture' onChange={fileSelected}/>
                        <InputAnimal
                            attribute={{
                                id:'gender',
                                label:'Animal gender',
                                name:'gender',
                                type: 'text',
                                placeholder: 'Animal gender'
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
                        <Button variant="contained" color="primary" startIcon={<Save/>} disabled={!btnDisabled} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                        </Button>
                        </CardActions>
                        </Card>
                        {getLands.map(card=>(
                        <Dialog
                          open={isSuccessfully}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                          {"Su animal: "}{name} {" Ha sido creado"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Animal creado! se encuentra en la finca: {card.name}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}autoFocus>Cerrar</Button>
                        </DialogActions>                    
                        </Dialog>   
                        ))}                     
                    </div>
                </div>
            </div>
        )
    
}
export default  Animal;