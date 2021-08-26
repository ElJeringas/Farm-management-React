import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Card,CardMedia,CardContent,Typography,CardActions,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    const[posts, setPosts]=useState([]);
    useEffect(()=>{
        axios.get("https://farm-management.xyz/lands/3/animals/",{ headers: { "Authorization" : `Token ${token}`}})
            .then(res=>{
                console.log(res);
                setPosts(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    })
    return (
        <div>
            <div className="get-container">
                <div className="get-content">
                    {posts.map(post=>(
                        <Card className={classes.root} >
                            <CardMedia className={classes.media} image={post.picture} title="animal"/>
                            <CardContent>
                                <Typography component="p" variant="h7" gutterBottom>
                                   <b>Nombre:</b> {post.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <b>Fecha de nacimiento:</b> {post.birth_date}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <b>Genero:</b> {post.gender}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <b>Finca:</b> {post.land}
                                </Typography>
                                <Typography variant="caption" component="p" align="right">
                                    <b>id:</b> {post.id}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}

                    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                    </Button>     
                </div>
            </div>
        </div>
    )
}
export default GetAnimal;
