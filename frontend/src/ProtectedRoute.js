import React, {useState,useEffect,useCallback,useRef, Component, useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth'
import Loader from './Loader'
import LandingPage from './Components/MainPage/LandingPage';

const ProtectedRoute = ({component:Component, ...rest}) =>{
    const [state, setState] = useState({isLoading: true, authenticated: false, client: null});
    useEffect(()=>{
        async function checkAuth() {
        const isAuth = await auth.isAuthenticated()
        setState({isLoading: false, authenticated:isAuth, client: auth.accountType});
        console.log("is " + isAuth) 
        console.log("is " +  auth.accountType) 
        }

    checkAuth();
    },[])

    if(state.isLoading) {
    console.log(`loading....`)
    return <Loader/>
    }
    
    return(
        <Route {...rest} render ={
                props =>  
                (
                   state.authenticated ?
                        (state.client == "user" ?
                                ( rest.currentPath == "admin" || rest.currentPath == "form" ?
                                        (
                                            <Redirect to ={{
                                                pathname: `/user`,
                                                state: {
                                                    from:props.location.history
                                                }
                                            }}/>
                                        )
                                    :
                                        (
                                            <Component {...props} />     
                                        )            

                                    
                                )
                            :
                                (   rest.currentPath == "user" || rest.currentPath == "form" ?
                                        (
                                            <Redirect to ={{
                                                pathname: `/admin`,
                                                state: {
                                                    from:props.location.history
                                                }
                                            }}/>
                                            
                                        )
                                    :
                                        (
                                            <Component {...props} />     
                                        )

                                )                         
                        )
                   :
                   ( rest.currentPath == "admin" || rest.currentPath == "user" ?
                            (
                                <Redirect to ={{
                                    pathname: `/form`,
                                    state: {
                                        from:props.location.history
                                    }
                                }}/>
                            )
                        
                        :
                            (
                                <Component {...props} />    
                            )    
                   )
                      
                )          
            
        }/>
      
    )
}
export default ProtectedRoute;