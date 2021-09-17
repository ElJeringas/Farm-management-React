import React , {useState} from 'react';
import axios from "axios";
import { Button } from '@material-ui/core';
/* import functionGetLand from '/Users/Santiago/Desktop/React - Farm/react-farm/src/commons/methods/land/functionGetLand';*/
import Input from '../home/farm_components/Input';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Title from '../login/components/title/title';
import { Select } from '@material-ui/core';
import { MenuItem,FormControl,InputLabel,FormHelperText } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackupIcon from '@material-ui/icons/Backup';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions } from '@mui/material';


const useStyles = makeStyles({
    
    root: {
        minWidth:"350px",
        margin:"1em",
        boxSizing:"border-box",
        maxWidth: 345,
        minHeight:200,
        maxHeight:300,
    },
    media: {
        minWidth:"100px",
        minHeight: 100,
        maxHeight:120,
        backgroundPosition:"top",
        backgroundAttachment:"top",
    },
  });

const Groups  =()=>  {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [description, setDescription]=useState('');
    const [location, setLocation] = useState('');
    const[getLands, setGetLands]=useState([]); //land
    const [paddocks, setPaddocks] = useState([]);//paddocks
    const [idSelecter, setIdSelecter] = useState('') //selector land
    const [isSuccessfully, setIsSuccessfully] = useState(false);

    const [open, setOpen] = useState(false);
    let token = localStorage.getItem('token');
    const URL = "https://farm-management.xyz/lands/" //url de land


    const history=useHistory(); 

    const Back = () =>{
        history.push('/GetLand')
    }
    
    const handleClose = () => {
        setOpen(false);
        setIsSuccessfully(false);
    };
    
      const handleOpen = () => {
        setOpen(true);
    };

    
    function handleChange(name, value){
        if(name === 'name'){
            setName(value);
            console.log(btnDisabled);
        }else{
            setDescription(value);
            console.log(btnDisabled);
        }
    }

    function ShowLand (){
        axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
                console.log(res);
                setGetLands(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
            setOpen(false);
    }

    function LandSelect(event){ //selector de fincas 
        const id = event.target.value;
        setIdSelecter(id);
        console.log(id);
        const api = `${URL}${id}/paddocks/`; 
        console.log(api);
        axios.get(api,{ headers: { "Authorization" : `Token ${token}`}})
        .then(res=>{
            console.log(res);
            setPaddocks(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    }

    function PaddockSelect(event){ //selector de paddocks 
        const idPdk = event.target.value;
        setLocation(idPdk);
        console.log(location);
        const api = `${URL}${idPdk}/paddocks/`; 
        console.log(api);
    }



    const renderBodyLands = () => {
        return getLands && getLands.map(({id,name}) => {
    
            return (
            <MenuItem value={id}>{name}</MenuItem>
            )
        })
    }

    const renderBodyPaddocks = () => { //show the groups available in the paddocks, evaluate the state 'is_active' this is false if are occupied with paddocks (will dissable the option of the menu item) and not if dont are occupied ()
        return paddocks && paddocks.map(({id,name,is_active}) => {
            return (
                <MenuItem value={id}disabled={!!is_active}>{name} 
                </MenuItem>
            )
        })
    }

    const btnDisabled = name.length > 0 && description.length > 0 && location > 0; // this three conditions should have filled for activate the button submmit. 
    const selectDisabled = getLands.length>0;
    function handleSubmit (){
        let sendGroup = {name,description,location}
        console.log(sendGroup);
        
        const api = `${URL}${idSelecter}/groups/`; 

        axios.post(api ,sendGroup,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
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
            {open && ShowLand()}
            <Title text={'Crear Grupos'}/>
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
                    id:'description',
                    label:'description',
                    name:'description',
                    type: 'text',
                    placeholder: 'Descripcion'
                }}
                handleChange={handleChange}
            /> 
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-autowidth-label">Finca</InputLabel>
                          <Select
                            labelId="land"
                            id="land"
                            onOpen={handleOpen}
                            onClose={handleClose}
                            onChange={(e) => LandSelect(e)}
                            autoWidth
                          >
                            {renderBodyLands()}
                          </Select>
                        <FormHelperText>Seleccionar finca</FormHelperText>
                    </FormControl>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-autowidth-label">Potrero</InputLabel>
                            <Select
                                labelId="land"
                                id="land"
                                onOpen={handleOpen}
                                onClose={handleClose}
                                onChange={(e) => PaddockSelect(e)}
                                disabled={!selectDisabled}
                                error={!selectDisabled}
                                helperText="primero seleccione un potrero"
                                autoWidth
                                >
                                {renderBodyPaddocks()}
                          </Select>
                            <FormHelperText>Seleccionar potrero</FormHelperText>
                        </FormControl>
                    </div>
                    <Dialog
                        open={isSuccessfully}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Grupo creado en el potrero: "}{location}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Grupo creado!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}autoFocus>Cerrar</Button>
                    </DialogActions>                    
                    </Dialog>


            <div >
                <Button variant="contained" color="primary" /* disabled={true} */disabled={!btnDisabled} startIcon={<BackupIcon/>} onClick={handleSubmit}>
                    Crear
                </Button>
            </div>
            <div>
                <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                    Volver
                </Button>     
            </div>
            <div>
                <Button variant="contained" color="secondary" startIcon={<RemoveRedEyeOutlinedIcon/>} onClick={Back}>
                    Ver grupos
                </Button>
            </div>
        </div>
    )
}

export default Groups;
