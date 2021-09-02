import React,{useState,useEffect} from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import axios from 'axios';


export default function Asynchronous() {
  const [data, setData] = useState([]);
  let token = localStorage.getItem('token');
  useEffect(()=>{
    axios.get("https://farm-management.xyz/lands/",{ headers: { "Authorization" : `Token ${token}`}})
    .then(res=>{
        setData(res.data);
        console.log(data);
      })
    })
  return (
    <div>
    {data.map(post=>(
      <Autocomplete
        id="asincrono"
        options={post.name}
        getOptionLabel={(option)=>option.id}
        style={{width:300}}
        renderInput={(params) => <TextField {...params} label="fincas" variant="outlined" />}
      />

    ))}
    </div>
  )
}
