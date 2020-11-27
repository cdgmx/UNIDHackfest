import React, {useState,useEffect,useCallback,useRef, Component, useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth'
import Loader from './Loader'
import LandingPage from './Components/MainPage/LandingPage';

const ProtectedRoute = ({component:Component, ...rest}) =>{

    const [state, setState] = useState({isLoading: true, authenticated: false});
    const firstUpdate = useRef(true);

    useEffect(()=>{
        
        async function checkAuth() {
        const isAuth = await auth.isAuthenticated()
        console.log(`useeffffect ${auth.authenticated}`)

        setState({isLoading: false, authenticated:isAuth});
        
        console.log(`is auth val  ${isAuth}`)

        }
    console.log(`check auth`)   
    checkAuth();
        
    },[])

    console.log(`state auth ${state.authenticated}`)

    if(state.isLoading) {
    console.log(`loading....`)
    return <Loader/>
    }

   
    
    console.log(rest.val)

    return(
        
        <Route {...rest} render ={
                
                props =>  (
                   state.authenticated ?
                        (rest.isForm?
                         
                        <Redirect to ={{
                            pathname: "/user",
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