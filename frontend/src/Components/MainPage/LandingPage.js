import React from 'react'
import auth from '../../auth'


 const LandingPage = (props) => {
    const handleUser = () =>{
        props.history.push("/user")
    }
    const handleAdmin = () =>{
        props.history.push("/admin")
    }
    const handleForm = () =>{
        props.history.push("/form")
    }
    return(
        <div>
            
            <h3>LandingPage</h3>
        
            <button onClick = {handleUser}>User</button>
            <button onClick = {handleAdmin}>Admin</button>
            <button onClick = {handleForm}>Form</button>
        </div>
    )

}


export default LandingPage;