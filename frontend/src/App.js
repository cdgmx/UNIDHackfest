import React, {useState, useEffect} from 'react';
import './Form.css';
import Form from "./Form"
import AdminMain2 from './Components/MainPage/AdminMain';


import AdminPage from './Components/AdminPage';
import UserPage from './Components/UserPage';


import UserMain from './Components/MainPage/UserMain';
import LandingPage from './Components/MainPage/LandingPage';
import ProtectedRoute from './ProtectedRoute'
import {BrowserRouter,Route, Switch, Link} from 'react-router-dom'
import Axios from 'axios';

import Auth from './auth'

import Loader from './Loader'



function App() {

    var token 
    var refresh
 
    
        

    return (
        <div>
                <Switch>
                    <Route exact  path ="/" component ={LandingPage} />
                    <ProtectedRoute isForm = {true} exact path ="/form" component ={Form}/> 
                    <ProtectedRoute isForm = {false} exact path ="/user" component ={UserPage}/>
                    <ProtectedRoute  isForm = {false}  exact path ="/admin" component ={AdminPage}/> 
                    <Route path ="*" component ={() => "404 not found hehe"} />
                </Switch>
            
                

        </div>
    )   
}


//this is the name we want to be called in index.js, we can change the name 'App' to anything we like but just be aware that we need to change it also to the index.js also 
export default App;
