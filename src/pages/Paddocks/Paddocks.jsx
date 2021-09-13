import React, {useState} from 'react'
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Title from '../login/components/title/title';
import Input from '../home/farm_components/Input';
import { Label } from '@material-ui/icons';
const Paddocks = ()=> {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [meassure, setMeassure] = useState('');
    function handleChange(name,value){
        if(name==='name'){
            setName(value);
        }
        if(name==='description'){
            setDescription(value);
        }
        if(name==='meassure'){
            setMeassure(value);
        }

    }

    
        return (
            <div>
                <Input
                    attribute={{
                        id:'name',
                        label:'name',
                        name:'potrero',
                        type:'text',
                        placeholder:'potrero'
                    }}
                    handleChange={handleChange}
                />

                <Input
                    attribute={{
                        id:'name',
                        label:'name',
                        name:'potrero',
                        type:'text',
                        placeholder:'potrero'
                    }}
                    handleChange={handleChange}
                />
                <Input
                    attribute={{
                        id:'name',
                        label:'name',
                        name:'potrero',
                        type:'text',
                        placeholder:'potrero'
                    }}
                    handleChange={handleChange}
                />                
            </div>
        )
    
}

export default Paddocks;
