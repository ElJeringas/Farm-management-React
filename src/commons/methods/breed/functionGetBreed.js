
function functionGetBreed() {
    const URL = "https://farm-management.xyz/breeds/" //url de breeds
    let token = localStorage.getItem('token');

    axios.get(URL,{ headers: { "Authorization" : `Token ${token}`}})
    .then(res=>{
        const result=(res.data);
        return result;
    })
    .catch(err=>{
        console.log(err);
    })
}
