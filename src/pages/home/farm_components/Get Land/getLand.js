import React,{useState} from 'react';
import axios from 'axios';
import { Grid,Card,CardContent,Typography,CardActions,Button,Avatar,Divider,Icon,IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import farmicon from 'c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/farmicon.png';
import corralito from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/GetLandDesign/corralito.png'
import leftback from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/GetLandDesign/homeizq.png'
import svgPaddock from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/svg/034-horse.svg'
import svgGroup from 'C:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/svg/030-sheep.svg'
import CancelIcon from '@material-ui/icons/Cancel';
import { red } from 'material-ui-colors';

import './getLand.css'
const useStyles = makeStyles(theme =>({
    grd: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    root: {
        display: "flex",
        minWidth:150,
        margin:"1em",
        boxSizing:"border-box",
        paddingTop:8,
        maxWidth: 300,
        minHeight:120,
        maxHeight:420,
        flexDirection: "column",
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1,
    },

    icons: {
        display:"block",
        height: theme.spacing(10),
        width: theme.spacing(10),
        justifyContent:"left",
        alignContent:"left",
        alignItems:"left",
        textAlign:"center",
      },
      cardNumber: {
        display: "flex",
        position: "absolute",
        flexDirection:"row",
        height: theme.spacing(4),
        width: theme.spacing(30),
        justifyContent:"right",
        alignContent:"right",
        alignItems:"right",
        textAlign:"justify",
        margin:15,
      },
      numbers:{
        textAlign:'center',
        marginRight:5,
        marginLeft:20,
    },

    createPalette:{
        textAlign:"center"
      },

    avatarButton:{
        left:    0,
        bottom:   0,
        position:"relative"
      },
      imageIcon: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        '&:hover': {
            transition: "transform 0.15s ease-in-out",
            transform: "scale3d(1.20, 1.20, 1)",
          },

      },
      iconRoot: {
        textAlign: 'center',
      },
      sizeAvatar: {
        backgroundColor: red[900],
        '&:hover': {
            transition: "transform 0.15s ease-in-out",
            background: red[500],
            transform: "scale3d(1.20, 1.20, 1)",
          },
        height: theme.spacing(3),
        width: theme.spacing(3),
      },
  }));

export default function GetLand() {
    const classes = useStyles();
    const history=useHistory();
    const URL = "https://farm-management.xyz/lands/"

    const Back = () =>{
        history.push('/home')
    }

    const GoPaddock = () =>{
        history.push('/paddocks')
    }
    const GoGroup = () =>{
        history.push('/groups')
    }
    let token = localStorage.getItem('token');
    const[posts, setPosts]=useState([]);
    const [open, setOpen] = useState(true);


   function ShowLand (){
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
        setOpen(true); //reload the page for each delete action
        ShowLand();
        renderBody();
    }

    const renderBody = () => {
        return posts && posts.map(({ id, name, location}) => {
            return (

                <Grid container spacing={1} direction="flex-start" justify="center" alignItems="center" > 

                <Grid  items xs={2} sm={4} md={4}>

                <Card elevation={9} className={classes.root} >
                    <Avatar
                        alt={"land"}
                        src={farmicon}
                        className={classes.icons}
                    />

                    <CardContent className={classes.cardNumber}>
                        <Typography className={classes.numbers} variant="caption" component="p">
                            {name}
                        </Typography>
                        <Divider orientation="vertical" />
                        <Typography className={classes.numbers} variant="caption" component="p">
                            {location}
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.createPalette}>
                        <IconButton size='small' className={classes.avatarButton}>
                                <Icon classes={classes.iconRoot} onClick={GoPaddock}>
                                    <img className={classes.imageIcon} src={svgPaddock}/>
                                </Icon>
                        </IconButton>
                        <IconButton size='small' className={classes.avatarButton}>
                                <Icon classes={classes.iconRoot} onClick={GoGroup}>
                                    <img className={classes.imageIcon} src={svgGroup}/>
                                </Icon>
                        </IconButton>
                        <IconButton size='small' className={classes.avatarButton} onClick={() => removeData(id)} alt={'borrar'}>
                                <Avatar sizes='small' /* style={{ backgroundColor: red[500] }} */ className={classes.sizeAvatar}>
                                    <CancelIcon/>
                                </Avatar>
                        </IconButton>      
                    </CardActions>

{/* 
                        <CardContent>
                            <Typography component="p" variant="h7" gutterBottom>
                                <b>Nombre:</b> {name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                <b>Ubicacion:</b> {location}
                            </Typography>
                            <Typography variant="caption" component="p" align="right">
                                <b>id:</b> {id}
                            </Typography>
                        </CardContent> */}
{/*                 <CardActions>
                    <Button size="small" variant ="contained" color="secondary" onClick={() => removeData(id)}>
                            Borrar
                    </Button>
                    <Button size="small" variant ="outlined" color="primary" onClick={GoGroup}>
                            Crear Grupo
                    </Button>
                    <Button size="small" variant ="outlined" color="primary" onClick={GoPaddock}>
                            Crear Potrero
                    </Button>                                                           
                </CardActions>  */}                           
            </Card>
            </Grid>
            </Grid>

            )
        })
    }
    return (
        <div>
            <div className="get-container">
            <div className='inline'>
                    <img className= 'side-back'src={corralito} alt="bk" width="500" height="500"></img>
                    <img className= 'home-background'src={leftback} alt="bk" width="700" height="700"></img>
            </div>
                <div className="get-content">
                <div className={classes.grd}>
                    {open && ShowLand()}
                </div>
                    {renderBody()}
                <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                    Volver
                </Button>   
                </div>
            </div>
        </div>
    )

}
