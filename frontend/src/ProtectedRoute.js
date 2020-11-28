import React, {useState,useEffect,useCallback,useRef, Component, useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth'
import Loader from './Loader'
import LandingPage from './Components/MainPage/LandingPage';

const ProtectedRoute = ({component:Component, ...rest}) =>{

    const [state, setState] = useState({isLoading: true, authenticated: false});
  
    useEffect(()=>{
        async function checkAuth() {
        const isAuth = await auth.isAuthenticated()
        setState({isLoading: false, authenticated:isAuth});
        console.log("is " + isAuth) 
        }
    checkAuth();
    },[])

    if(state.isLoading) {
    console.log(`loading....`)
    return <Loader/>
    }
    
    return(
        <Route {...rest} render ={
                
                props =>  (
                   state.authenticated ?
                        (rest.isForm?
                        <Redirect to ={{
                            pathname: `/`,
                            state: {
                                from:props.location.history
                            }
                        }}/>
                        : 
                        <Component {...props} />  
                        )
                    :
                        (
                            rest.isForm?
                            <Component {...props} />  
                            : 
                            <Redirect to ={{
                                pathname: "/",
                                state: {
                                    from:props.location.history
                                }
                            }}/>
                        )
                    )          
            
        }/>
      
    )
}
export default ProtectedRoute;