import React, {useState} from 'react'
import axios from 'axios';

import { Grid,Card,CardContent,Typography,CardActions,Button,Avatar,Divider } from '@material-ui/core';
import lands from'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/icons/014-barn.png';
import animal from'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/icons/035-chicken.png';
import breed from'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/icons/031-cow.png';
import green from "@material-ui/core/colors/green";
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import home from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/land.gif'
import side from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/countryside.png'
import AssignmentIcon from '@material-ui/icons/Assignment';
import { styled } from '@mui/material/styles';
import Badge from '@material-ui/core/Badge';
import CreateNewFolderRoundedIcon from '@material-ui/icons/CreateNewFolderRounded';
import { red } from 'material-ui-colors';
import { IconButton } from '@material-ui/core';
import './Home.css';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const mStyles = makeStyles(theme => ({
    grd: {
        flexGrow: 1,
        padding: theme.spacing(1),
    }
}))

const useStyles = makeStyles(theme =>({

    root: {
        display: "flex",
        minWidth:90,
        margin:"1em",
        boxSizing:"border-box",
        paddingTop:8,
        maxWidth: 300,
        minHeight:80,
        maxHeight:300,
        flexDirection: "row",
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1,
        '&:hover': {
            transition: "transform 0.15s ease-in-out",
            transform: "scale3d(1.035, 1.035, 1)",
          },
/*                     transition: "0.3s",
            "&:hover": {
                    boxShadow: theme.shadows[11],            
                }, */
      
    },
    card: {
        minWidth:75,
        margin:"1em",
        boxSizing:"border-box",
        paddingTop:8,
        maxWidth: 125,
        minHeight:100,
        maxHeight:350,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "16vw",
        paddingRight: "16vw",
        paddingBottom: 1,
            transition: "0.3s",
/*             boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
 */            "&:hover": {
                    boxShadow: theme.shadows[5],            },
      },
      cardContent: {
        flexGrow: 1,
        minWidth: 350,
        maxWidth:400,
      },
      cardNumber: {
        display: "flex",
        flexDirection: "row",
        height: theme.spacing(10),
        width: theme.spacing(30),
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        margin:10,
        

      },
      cardIcon: {
        display: "block",
        flexDirection: "column",
        height: theme.spacing(10),
        width: theme.spacing(30),
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        margin:10,
        

      },
    avatar: {
        height: theme.spacing(10),
        width: theme.spacing(10),
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        margin:"auto",
        textAlign:"center",
        
      },
      icons: {
        height: theme.spacing(10),
        width: theme.spacing(10),
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        margin:"auto",
        textAlign:"center",
      },
      nameIcon:{
        flexGrow: 1,
      },
      titleIcon:{
        textAlign: 'center',
        paddingBottom:6,
      },
      createPalette:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"left",
        alignContent:"left",
        alignItems:"left",
        textAlign:"left",

      },
      firstName: {
        textAlign: 'center',
        paddingBottom:6,
      }, 
      biography: {
        textAlign: 'justify',
        paddingBottom:10,
      },
      numbers:{
          textAlign:'left',
          marginRight:50,
          marginLeft:50,
      },
      palette:{
        textAlign:'left',
        marginRight:50,
        marginLeft:50,
      },
      avatarButton:{
        display:"block",
        flexDirection:"row-reverse",
        position:"-webkit-sticky",
        marginRight:0,
      },
      iconGet:{
        backgroundColor: green[900],
        '&:hover': {
            transition: "0.4s",
            background: green[700],
          },
      },

      iconCreate:{
        backgroundColor: red[900],
        '&:hover': {
            transition: "0.4s",
            background: red[500],
          },
      },
    }));



 const Home  =()=> {
    const history=useHistory();
    const URL = "https://farm-management.xyz/"
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    const[getUser, setGetUser]=useState([]); //almacenar lands
    const[getLands, setGetLands]=useState([]); //almacenar lands
    const[getAnimals, setGetAnimals]=useState([]); //almacenar animales
    const[getGroups, setGetGroups]=useState([]); //almacenar groups

    const [open, setOpen] = useState(true);


    function UserInfo (){
        axios.get(`${URL}users/${user}/`,{ headers: { "Authorization" : `Token ${token}`}})  //obtain user info
            .then(res=>{
              setGetUser([res.data.user]);
              setGetLands([res.data.lands.length])
              console.log(res.data.lands.length)
                return;
            })
            .catch(err=>{
                console.log(err);
            })

/*             axios.get(`${URL}users/${user}/`,{ headers: { "Authorization" : `Token ${token}`}})  //obtain user info
            .then(res=>{
              setGetUser([res.data.user]);
              setGetLands([res.data.lands.length])
              console.log(res.data.lands.length)
                return;
            })
            .catch(err=>{
                console.log(err);
            }) */

        setOpen(false);
    }
 

    const renderUser = () => {
        return getUser && getUser.map(({name,phone_number,profile, lands}) => {
    
            return (

                <Card className={classes.card}>
                    
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar
                        alt="Profile Image"
                        src={profile.picture}
                        className={classes.avatar}
                    />
                </StyledBadge>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.firstName} noWrap gutterBottom variant="p" component="h3">{name}</Typography>
                    <Typography className={classes.firstName} noWrap variant="caption" component="p">{phone_number}</Typography>
                    <Typography className={classes.biography} variant="caption" component="p">{profile.biography}</Typography>
                    <Divider style={{width:'100%'}} />
                </CardContent>
                
                <CardContent className={classes.cardNumber}>
                    <Typography className={classes.numbers} variant="caption" component="p">
                       <b> Lands: </b> {getLands}
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography className={classes.numbers} variant="caption" component="p">
                       <b> Animals: </b> 45
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography className={classes.numbers} variant="caption" component="p">
                       <b> Groups: </b> 13
                    </Typography>
                </CardContent>
                

            

                </Card>
            )
        })
    }
    


    const Animal = () =>{
        history.push('/animal')
    }
    
    const Finca = () =>{
        history.push('/farm')
    }
    
    const Breeds = () =>{
        history.push('/Breeds')
    }

    const getAnimal = () =>{
        history.push('/GetAnimal')
    }

    const getLand = () =>{
        history.push('/GetLand')
    }

    const getBreed = () =>{
        history.push('/GetBreeds')
    }

    const logOut = () =>{
        localStorage.removeItem('token');
        history.push('/')
    }
      
    const classes = useStyles();
    const styles = mStyles();

     const cardInfo = [
         {image:lands,title:"Fincas",text:"crear Fincas",go:(e => Finca()),get:(e => getLand())},
         {image:animal,title:"Animales",text:"crear animales",go:(e => Animal()),get:(e => getAnimal())},
         {image:breed,title:"Razas",text:"crear razas",go:(e => Breeds()),get:(e => getBreed()) },
         
     ]; 

        return (
            
            <div className="home-container" >
                {open && UserInfo()}
                <div className='inline'>
                    <img className= 'side-back'src={side} alt="logo" width="200" height="200"></img>
                    <img className= 'home-background'src={home} alt="logo" width="150" height="150"></img>
                </div>
                
                <div className="home-content"> 
                {renderUser()}

                        <div className={styles.grd}>
                       <Grid container spacing={1} direction="flex-start" justify="center" alignItems="center" > 
                                {cardInfo.map(card=>(
                                    <Grid  items xs={2} sm={4} md={4}>
                                        <Card /* elevation={12} */ className={classes.root}>
                                            <Avatar
                                                alt={card.title}
                                                src={card.image}
                                                className={classes.icons}
                                            />
                                        <CardContent className={classes.cardIcon}>
                                            <Typography className={classes.firstName} variant="caption" component="p">
                                                {card.title}
                                                <Divider style={{width:'100%'}} />
                                            </Typography>
                                        </CardContent>

                                        <CardActions className={classes.createPalette}>
                                            <IconButton size='small' className={classes.avatarButton}>
                                                <Avatar className={classes.iconGet}/* style={{ backgroundColor: green[900] }} */ variant="rounded" onClick={card.get}alt={`crear ${card.title}`}>
                                                    <AssignmentIcon />
                                                </Avatar>
                                            </IconButton>

                                            <IconButton size='small' className={classes.avatarButton} onClick={card.go} alt={`ver ${card.title}`}>
                                                <Avatar  className={classes.iconCreate} variant="rounded">
                                                    <CreateNewFolderRoundedIcon/>
                                                </Avatar>
                                            </IconButton>    
                                        </CardActions>
                                    </Card> 
                                    </Grid>
                                ))}    
                        </Grid>  
                        
 {/*                            <Grid container spacing={1} direction="row" justify="center" alignItems="center" style={{ minHeight: '50vh' }}>
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

                            </Grid> */}
                            <Button alignItems="center" size="normal" variant ="contained" color="secondary"onClick={(e => logOut())}>
                                Salir
                            </Button>  
                            
                        </div>    
                </div>
            </div>
        )
}

export default Home;
