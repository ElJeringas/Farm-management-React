import React , {useState} from 'react';
import axios from "axios";
import { Button } from '@material-ui/core';
import functionGetLand from '/Users/Santiago/Desktop/React - Farm/react-farm/src/commons/methods/land/functionGetLand';
import Input from '../home/farm_components/Input';
import { useHistory } from 'react-router-dom';
import Title from '../login/components/title/title';
const Groups  =()=>  {
    const [name, setName] = useState('');
    const [description, setDescription]=useState('');
    const location = null;
    const history=useHistory();

    
    function handleChange(name, value){
        if(name === 'name'){
            setName(value)
        }else{
            setDescription(value)    
        }
    }

    function handleSubmit (){
        let farm = {name,description,location}
        console.log(farm);
        let token = localStorage.getItem('token');

        console.log(token);

        const URL = "https://farm-management.xyz/lands/1/groups/" //url de land


        axios.post(URL ,farm,{ headers: {"Content-type": "application/json", "Authorization" : `Token ${token}`} })
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

/*     console.log(functionGetLand.GetService());
 */
    return (
        <div>
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
            <div >
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Crear
                </Button>
            </div>                                      
        </div>
    )
}

export default Groups;
