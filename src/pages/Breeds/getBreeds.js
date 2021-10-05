import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Card,CardMedia,CardContent,Typography,CardActions,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import breed from 'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/breed.png';
import moment from "moment";


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
        backgroundSize: 100,
        backgroundColor:"#fff0f5",
        backgroundPosition:"center",
        backgroundAttachment:"top",
    },
  });

export default function GetBreeds() {
    const classes = useStyles();
    const history=useHistory();
    const URL = "https://farm-management.xyz/breeds/"
    const Back = () =>{
        history.push('/home')
    }
    let token = localStorage.getItem('token');
    const[posts, setPosts]=useState([]);
    const [open, setOpen] = useState(true);


    function ShowBreeds (){
        axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
                console.log(res);
                setPosts(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
            setOpen(false);
    }

    const removeData = (id) => {

        axios.delete(`${URL}${id}/`,{ headers: { "Authorization" : `Token ${token}`}})
    }


    const renderBody = () => {
        return posts && posts.map(({ id, name, purpose, description,created,modified }) => {
            return (
                <Card className={classes.root} >
                <CardMedia className={classes.media} image={breed} title="land"/>
                <CardContent>
                    <Typography component="p" variant="h7" gutterBottom>
                       <b>Nombre:</b> {name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <b>Descripcion:</b> {description}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <b>Proposito:</b> {purpose}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <b>Creada:</b> {/* {created} */}{moment(created).format("MMMM Do YYYY")}{" "}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <b>Modificada:</b> {/* {modified} */}{moment(modified).fromNow()}
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
            {open && ShowBreeds()}
            <div className="get-container">
                <div className="get-content"> 
                    {renderBody()}
                    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                    </Button>     
                </div>
            </div>
        </div>
    )

}
