import React, {useState, useRef,useEffect} from 'react';
import Axios from 'axios';
import './Form.css';
import Login from "./Components/Login"
import Scanner from "./Components/Scanner"
import Register from "./Components/Register"

import auth from './auth'




function Form(props) {
  //Legends: 
    //Client - the one using the webapp at the moment
    //User - is the consumer or the one that being scanned
    //Admin - is the one who is scanning
  const InitInfo = {
    id: null,
    email: null,
    name: null,
    age: null,
    address: null,
    town: null,
    province: null,
    contact: null,
    gender: null,
    password: null,
    password2: null, 
    birthday: null,
    qr:null,
    storename: null,
    clientEmail:null,
    clientPassword: null,
  };
  
  const [myInfo, setMyInfo] = useState(InitInfo);
  const [selectedDate,setSelectedDate] = useState(null);
  const [hasAcccount,setHasAccount] = useState(null);//checj if you are already logged in or not
  const [adminAcc,setAdminAcc] = useState(false); //false for user,  true for store

  const [signState, setSignState] = useState({
    signIn: true, //if true, the current display will be sign in, else if false it will be register
    signData: "Sign in", 
    prevSignData: "Register",
  
  });

  const [accType, setAccType] = useState({
      currentAccName: "User", 
      prevAccName: "Admin"
  });

  const [isFormError, setIsFormError] = useState({
    hasError:false,
    contact: false, 
    email: false,
    password: false
  });

  /*const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
      if (adminAcc == false){
        auth.qr = myInfo.qr
        auth.name  =  myInfo.name
        auth.login(() => { 
        props.history.push("/user")
        })
      }
      else{
        auth.storename = myInfo.storename
        auth.login(() => { 
        props.history.push("/admin")
        })
      }
    
  }, [hasAcccount])
  */

  //this is different than hooks because we only performing a linear operation and there's no need a complicated chuchu
  //this responds to the submit button that we created. so when the client clicked it, it will go here
  const handleSignIn = (e) => {
    e.preventDefault()
    auth.email = myInfo.clientEmail
    auth.password = myInfo.clientPassword
    
    if(accType.currentAccName == "User")  
      auth.accountType = "user"
    else 
      auth.accountType = "admin"
  
    auth.signIn(() => { 
      console.log("push")
      props.history.push("/")
    })
    setHasAccount(true) 
  }


  const handleValidation = () =>{
    var hasError
    var mailerror
    var contacterror
    var passerror

    ///
    if(myInfo.contact != null && myInfo.contact != "" ){
      if(myInfo.contact.length > 12  || myInfo.contact.length < 11)
      {
        hasError = true
        contacterror = true
        console.log("error in contact")
      }
      else{
        contacterror = false
        console.log("no error contact")
      }
    }
    else{
      console.log("no Input contact")
      
    }

     ///
    if(myInfo.email != null && myInfo.email != "" ){
      var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!myInfo.email.match(mailformat))
      {
        hasError = true
        mailerror = true
        console.log("error in Mail")
      }
      else{
        mailerror = false
        console.log("no error Mail")
      }
    }
    else{
      console.log("no Input Mail")
    }
     ///
    if(myInfo.password != null && myInfo.password != ""  ){
      if(myInfo.password != myInfo.password2 ){

        hasError = true
        passerror = true
        console.log("error in second pass")
        console.log("Pass1: " + myInfo.password)
        console.log("Pass2: " + myInfo.password2)
      }
      else{
        passerror = false
        console.log("no error in secondpass")   
      }
    }
    else{
      console.log("no Input Password")
    }
     ///

     if(hasError)
     {
      console.log("has error")
      setIsFormError({hasError: true,  email: mailerror, contact:contacterror, password:passerror})
     }
     else
     {
      console.log("no error")
      setIsFormError({hasError: false,  email: mailerror, contact:contacterror, password:passerror})
     }
     
     return false;
   
  };


  const handleRegister = (e) => {

    if(!isFormError.hasError)
    {
      auth.regInfo = myInfo
      if(accType.currentAccName == "User")  
      auth.accountType = "user"
      else 
      auth.accountType = "admin"

      auth.signUp(()=>{
         
      })
      alert("Registeration Submitted")
      //changeSign()
      e.preventDefault()
      e.target.reset()
      //reset date
      changeSign()

    }
  }
  const changeSign = () => {
    
    
    if (signState.signIn == true)
    {
      setSignState({signIn: false, signData: signState.prevSignData, prevSignData: signState.signData})
    }
    else
    {
      setSignState({signIn: true, signData: signState.prevSignData, prevSignData: signState.signData})
   
    }
    
   
  };

  const handleAccType = () =>{

    if (adminAcc == false){
      setAdminAcc(true)
      setAccType({currentAccName: "Admin", prevAccName: "User"})
    }
    else{
      setAdminAcc(false)
      setAccType({currentAccName: "User", prevAccName: "Admin"})
    }
    
  };

  const isRegister = () =>{
      
  }

  const testbutton = () =>{
    props.history.push("/user")
  }
  // <Scan />this is what we return to the index.js, when the index.js called this app.js, we return an html structure that we append or inserted to the existing html file, everything that you want to appear in html file should be put here
  return (
    
      <div className="App">
              {signState.signIn ?
              
                <Login
                setMyInfo = {setMyInfo}
                myInfo = {myInfo}

                changeSign = {changeSign}
                signState = {signState}
                handleAccType = {handleAccType}
                accType = {accType}
                handleSignIn = {handleSignIn}
                />
              :
              <Register
                setMyInfo = {setMyInfo}
                myInfo = {myInfo}

                changeSign = {changeSign}
                signState = {signState}
                handleAccType = {handleAccType}
                accType = {accType}
                handleValidation= {handleValidation}
                isFormError = {isFormError}
                handleRegister = {handleRegister}
                setSelectedDate = {setSelectedDate}
                selectedDate = {selectedDate}
                />
              }
           
      
      </div>
  
  )
}


//this is the name we want to be called in index.js, we can change the name 'App' to anything we like but just be aware that we need to change it also to the index.js also 
export default Form;
