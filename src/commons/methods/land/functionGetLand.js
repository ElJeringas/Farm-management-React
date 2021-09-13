import axios from "axios";
import React from 'react'

 class functionGetLand{
     GetService(){
        const URL = "https://farm-management.xyz/lands/" //url de land
        let token = localStorage.getItem('token');
    
        axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
        .then(res=>{
            const result=(res.data);
            console.log(result);
            console.log(res.status);
            return result;
        })
        .catch(err=>{
            console.log(err);
        })
     }

}
 export default functionGetLand;