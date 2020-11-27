import React from "react";
import "./Login.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import UserRegister from "../Components/RegistrationComponents/UserRegister"
import AdminRegister from "../Components/RegistrationComponents/AdminRegister"



const Register = (props) => {
  const {
    setMyInfo,
    myInfo,
    
    changeSign ,
    signState ,
    handleAccType ,
    accType,
    handleValidation,
    isFormError,
    handleRegister,
    setSelectedDate,
    selectedDate,
  } = props;



  return (
   
      ((accType.currentAccName == "User") ?
        <UserRegister
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
        :
        <AdminRegister
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
      )
     
    
  );
};

export default Register;
