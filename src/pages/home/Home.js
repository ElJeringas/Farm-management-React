import React from 'react';
import { Grid,Card,CardMedia,CardContent,Typography,CardActions,Button } from '@material-ui/core';
import pig from 'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/pig.png';
import berja from 'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/berja.png';
import groups from 'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/groups.png';
import farmer from 'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/farmer.png';
import { GridList } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { boxSizing } from '@material-ui/system';
import { useHistory } from 'react-router-dom';

import './Home.css';

const mStyles = makeStyles(theme => ({
    grd: {
        flexGrow: 1,
        padding: theme.spacing(1),
    }
}))

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



 const Home  =()=> {
    const history=useHistory();
/*     const usuario = () =>{
        history.push('/register')
    } */
    
    const Animal = () =>{
        history.push('/animal')
    }
    
    const Finca = () =>{
        history.push('/farm')
    }

    const getAnimal = () =>{
        history.push('/GetAnimal')
    }

    const getLand = () =>{
        history.push('/GetLand')
    }

    const logOut = () =>{
        localStorage.removeItem('token');
        history.push('/')
    }
      
    const classes = useStyles();
    const styles = mStyles();
     const cardInfo = [
         {image:berja,title:"Fincas",text:"crear Fincas",go:(e => Finca()),get:(e => getLand())},
         {image:pig,title:"Animales",text:"crear animales",go:(e => Animal()),get:(e => getAnimal())},
         {image:groups,title:"Grupos",text:"crear grupos",go:(e => Finca()),get:null},
         {image:farmer,title:"Usuarios",text:"crear usuarios",go:null/* (e => registro()) */,get:null},
     ]; 
/* const renderCard = (card,index)=>{
    return(
        <div className={styles.grd}>
            <Grid container spacing={0} direction="row" justify="center" alignItems="center" style={{ minHeight: '100vh' }} >
                <Grid  items xs={12} sm={6} md={6}>
                    <Card className={classes.root} key={index}>
                        <CardMedia className={classes.media} image={card.image} title="farm"/>
                        <CardContent>
                            <Typography component="p" variant="h7">
                                {card.title}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  size="small" variant ="outlined" color="primary" onClick={card.go}>
                                crear
                            </Button>
                            <Button size="small" variant ="outlined" color="primary"onClick={card.get}>
                                Ver
                            </Button>                
                        </CardActions>
                    </Card>
                </Grid>
                
                
            </Grid>
        </div>
    )
} */
        return (
            <div className="home-container" >
                <div className="home-content">
                        <div className={styles.grd}>
                            <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                                {cardInfo.map(card=>(
                                    <Grid  items xs={12} sm={6} md={6}>
                                        <Card className={classes.root} >
                                            <CardMedia className={classes.media} image={card.image} title="farm"/>
                                                <CardContent>
                                                    <Typography component="p" variant="h7">
                                                        {card.title}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button  size="small" variant ="outlined" color="primary" onClick={card.go}>
                                                        crear
                                                    </Button>
                                                    <Button size="small" variant ="outlined" color="primary"onClick={card.get}>
                                                        Ver
                                                    </Button>                
                                                </CardActions>
                                        </Card>
                                    </Grid>

                                ))}
                            </Grid>
                            <Button alignItems="center" size="normal" variant ="contained" color="secondary"onClick={(e => logOut())}>
                                Salir
                            </Button>  
                        </div>    
  
                </div>
            </div>
        )
}

export default Home;
