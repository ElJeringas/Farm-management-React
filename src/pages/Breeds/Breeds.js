import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Title from '../login/components/title/title';
import Input from '../home/farm_components/Input';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const apiUrl = 'https://farm-management.xyz/breeds/';


const Breeds = () => {
    const [name, setName] = useState('');
    const [description, setDescription]=useState('');
    const [purpose, setPurpose] = useState('');
    const history=useHistory();



    const Back = () =>{
        history.push('/home')
    }


    function handleChange(name, value){
        if(name === 'name'){
            setName(value)
        }else{
            setDescription(value)    
        }
        if(name==='purpose'){
            setPurpose(value)
        }
    }

    function handleSubmit (){
        let breed = {name,description,purpose}
        let token = localStorage.getItem('token');

        console.log(token);

        const api = apiUrl; 


        axios.post(api ,breed,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
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
                        <Title text='Breed Create'/>
                        <Input 
                            attribute={{
                                id:'name',
                                label:'name',
                                name:'name',
                                type: 'text',
                                placeholder: 'Nombre de la raza'
                            }}

                            handleChange={handleChange}
    
                        />
                        <Input  
                            attribute={{
                            id:'description',
                            label:'description',
                            name:'description',
                            type: 'text',
                            placeholder: 'descripcion'
                            }}

                            handleChange={handleChange}
                        />
                        <Input  
                            attribute={{
                            id:'purpose',
                            label:'purpose',
                            name:'purpose',
                            type: 'text',
                            placeholder: 'prooposito'
                            }}

                            handleChange={handleChange}
                        />

                    <div >
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Crear
                        </Button>
                    </div>

                    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                    </Button>                                       
                    </div>

                </div>
            </div>
        )
    
}
export default  Breeds;