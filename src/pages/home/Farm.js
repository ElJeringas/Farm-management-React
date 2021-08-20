import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Title from '../login/components/title/title';
import Axios from 'axios';
import Input from './farm_components/Input';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const apiUrl = 'https://farm-management.xyz/lands/';
/* let token = localStorage.getItem('token'); */


const Farm = () => {
    const [name, setName] = useState('');
    const [location, setLocation]=useState('');
    const history=useHistory();


    const animal = () =>{
        history.push('/Animal')
    }


 


    function handleChange(name, value){
        if(name === 'name'){
            setName(value)
        }else{
            setLocation(value)    
        }
    }

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
                    <div className='farm-content'>
                        <Title text='Farm Create'/>
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

                    <div className='submit-button-container'>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Create
                        </Button>
                    </div>
                    <div >
                        ¿crear animal? {'\n'}
                        <Button color="secondary" onClick={()=> animal() }>animal</Button>
                    </div>                                        
                    </div>

                </div>
            </div>
        )
    
}
export default  Farm;