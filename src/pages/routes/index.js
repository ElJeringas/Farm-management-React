import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
}from 'react-router-dom'
import Login from '../login/login';
import Register from '../createUser/Register';
import Farm from '../home/Farm';

export default ()=> ( 
    //add the url of login/register, feed, product, profile,etc
    <Router>
        <Switch>
        <Route path="/farm" exact component={Farm}/>
        <Route path ="/" exact component={Login} />
        <Route path ="/register" exact component={Register}/> 
        </Switch>
    </Router>
)