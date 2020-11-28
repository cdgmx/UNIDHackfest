import React from "react";
import "../Login.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
      

const AdminRegister = (props) => {
  const {
      setMyInfo,
      myInfo, 

      changeSign ,
      signState ,
      handleAccType ,
      accType,
      handleValidation,
      isFormError,
      handleRegister

  } = props;

  const changInfo = (e) => {
      const { value, name } = e.target;
      setMyInfo({ ...myInfo, [name]: value });
      // console.log("this is change");
      // console.log("id: " + initInformation.Id);
      // console.log("email: " + initInformation.email);
    };


  return (
      <div className="loginbox">
      <form  autoComplete="none" onSubmit={handleRegister}>
            <h1>{signState.signData} as {accType.currentAccName}</h1>
            <p>Email or ID Number</p>

            <input 
                  type="text" 
                  name="storename" 
                  placeholder="Store Name" 
                  autoComplete="true"   
                  required   
                  onChange = {(e) =>{changInfo(e)}}
            ></input>
            

            <input 
                  type="text" 
                  name="address" 
                  placeholder="Address" 
                  required 
                  onChange = {(e) =>{changInfo(e)}} 
            ></input>
            
            <input 
                  type="text" 
                  name="town" 
                  placeholder="Town/City" 
                  required 
                  onChange = {(e) =>{changInfo(e)}} 
            ></input>

            <input 
                  type="text" 
                  name="province" 
                  placeholder="Province" 
                  required 
                  onChange = {(e) =>{changInfo(e)}}
            ></input>
            
            <input 
                  type="text" 
                  name="contact"  
                  placeholder="Contact" 
                  required 
                  onChange = {(e) =>{changInfo(e)}}
                  onBlur = {handleValidation}
            ></input>
            {isFormError.contact  ? (<p>Contact is invalid</p>):(null)}

            <input 
                  type="text" 
                  name="email" 
                  placeholder="Enter Email" 
                  required 
                  onBlur = {handleValidation} 
                  onChange = {(e) =>{changInfo(e)}}
             ></input>
            {isFormError.email  ? (<p>Email is invalid</p>):(null) }
      
           
            <input 
                  type="password" 
                  name="password" 
                  placeholder="Create Password" 
                  required 
                  onChange = {(e) =>{changInfo(e)}}
            ></input>
      

            <input 
                  type="password" 
                  name="password2" 
                  placeholder="Enter Password again"  
                  required 
                  onChange = {(e) =>{changInfo(e)}}
                  onBlur = {handleValidation}
            ></input>
            {isFormError.password  ? (<p>Password does not Match</p>):(null)}


            <input 
                  type="submit" 
                  value="Submit"
            ></input>
            <a href="#"  onClick={changeSign} >{signState.prevSignData}</a><br></br>
            <a href="#"  onClick={handleAccType } >Change into {accType.prevAccName} Mode</a><br></br>
      </form>

</div>
  );
};

export default AdminRegister;
 