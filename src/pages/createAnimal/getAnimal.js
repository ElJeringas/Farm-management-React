import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Card,CardMedia,CardContent,Typography,CardActions,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Select } from '@material-ui/core';
import { MenuItem,FormControl,InputLabel,FormHelperText } from '@material-ui/core';
import functionGetLand from '/Users/Santiago/Desktop/React - Farm/react-farm/src/commons/methods/land/functionGetLand'
import './getAnimal.css';




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

function GetAnimal() {
    const classes = useStyles();

    const history=useHistory();
    const Back = () =>{
        history.push('/home')
    }
    let token = localStorage.getItem('token');

    const URL = "https://farm-management.xyz/lands/" //url de land
    const[getLands, setGetLands]=useState([]); //land
    const [idSelecter, setIdSelecter] = useState('') //selector land
    const [isOpen, setisOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
      const handleOpen = () => {
        setOpen(true);
    };
    {open && //get de lands
        axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
  /*               console.log(res);
   */              setGetLands(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    function LandSelect(event){ //selector de fincas
        const id = event.target.value;
        setIdSelecter(id);
        console.log(id);
        const api = `${URL}${id}/animals/`; 
        axios.get(api,{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
/*                 console.log(res);*/
                setPosts(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
            setisOpen(true);
    }

    const renderBodyLands = () => {
        return getLands && getLands.map(({id,name}) => {
    
            return (
            <MenuItem value={id}>{name}</MenuItem>
            )
        })
    }    
  
    

    const[posts, setPosts]=useState([]);

/*     useEffect(()=>{
        const api = `${URL}${idSelecter}/animals/`; 
        axios.get(api,{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
/*                 console.log(res);
                setPosts(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }) */

    const removeData = (id) => {

        console.log(`${URL}${idSelecter}/animals/${id}/`)
        axios.delete(`${URL}${idSelecter}/animals/${id}/`,{ headers: { "Authorization" : `Token ${token}`}})
    }



    const renderBody = () => {
        return posts && posts.map(({ id, name, picture, birth_date,gender,land }) => {
            return (
                <Card className={classes.root} >
                            <CardMedia className={classes.media} image={picture} title="animal"/>
                            <CardContent>
                                <Typography component="p" variant="h7" gutterBottom>
                                   <b>Nombre:</b> {name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <b>Fecha de nacimiento:</b> {birth_date}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <b>Genero:</b> {gender}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <b>Finca:</b> {land}
                                </Typography>
                                <Typography variant="caption" component="p" align="right">
                                    <b>id:</b> {id}
                                </Typography>
                            </CardContent>
                <CardActions>
                    <Button size="small" variant ="contained" color="secondary" onClick={() => removeData(id)}>
                            Borrar
                    </Button>                
                </CardActions>                            
            </Card>
            )
        })
    }


    
    return (
        <div>
            <div className="get-container">
                <div className="get-content">
                    <Button size="small" variant ="contained" color="primary" onClick={handleOpen}>
                        Open the select
                    </Button>
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
                        {isOpen &&
                        renderBody()}
                    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                    </Button>     
                </div>
            </div>
        </div>
    )
}
export default GetAnimal;
