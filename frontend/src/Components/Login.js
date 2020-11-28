import React from "react";
import "./Login.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const Login = (props) => {
  const {

    setMyInfo,
    myInfo,

    changeSign ,
    signState ,
    handleAccType ,
    accType,
    handleSignIn
   

  } = props;

  const changeInfo = (e) => {
    const { value, name } = e.target;
    setMyInfo({ ...myInfo, [name]: value });
    // console.log("this is change");
    // console.log("id: " + initInformation.Id);
    // console.log("email: " + initInformation.email);
  };

  return (
    <div className="loginbox">

            <form  onSubmit={handleSignIn}>
            <h1>{signState.signData} as {accType.currentAccName}</h1>
            <p>Email or ID Number</p>

            <input 
            type="text" 
            name="clientEmail" 
            placeholder="Enters email" 
            onChange = {(e) =>{changeInfo(e)}} >
            </input>

            <p>Password</p>

            <input 
            type="password" 
            name="clientPassword" 
            placeholder="Enter Password"  onChange = {(e) =>{changeInfo(e)}}>
           
            </input>

            <input 
                  type="submit" 
                  value="Submit"
            ></input>
            
            <a href="#">Don't have an account? </a>
            <a href="#"  onClick={changeSign} >{signState.prevSignData}</a><br></br>
            <a href="#"  onClick={handleAccType } >Change into {accType.prevAccName} Mode</a><br></br>
            </form>
                
          

           
         
      </div>
  );
};

export default Login;
