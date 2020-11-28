import React, {useState, useEffect,Component} from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types'
//import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup
//import QrScanner from 'qr-scanner'; 
//QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';
import QrReader from 'react-qr-scanner'
import "./Scanner.css";
import auth from '../auth'



class Scanner extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      delay: 500,
      name: "",
      status:"None",
      result: 'No result',
      facingMode: "rear"
    }
    this.adminName = null
    
    this.handleScan = this.handleScan.bind(this)
  }

  


  handleScan(result){
    if(result){
      this.setState({ result })
    }
  }
  handleError(err){
    console.error(err)
  }

  onChangeName(newName){
    this.setState({
      storeName:  newName

    })
  }
  
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

   

    const  handleCamera = () => {
      if(this.state.facingMode == "front")
      {
      this.setState({facingMode: "rear"});
      }
      else{
        this.setState({facingMode: "front"});
      }
    }
    const submitScan = () => {

      
      this.setState({result: "No result"});
      Axios.post('localhost:3001/api/scan',  {userEmail: this.state.result
      }).then((response) =>{
       
        if(response.data.err == "error")
        {
          alert("No data found")
          this.setState({status: "failed"});
        }
        else{
        this.setState({status: "sucess"});
        console.log("response Data:" + response)
        this.setState({name: response.data.name});
        Axios.post('localhost:3001/api/dataStore',  
        {
          userName: response.data.name,
          userEmail :response.data.email,
          userAddress : response.data.address,
          userTown :response.data.town,
          userProvince :response.data.province,
          userContact :response.data.contact,
          userBirthday :response.data.birthday,
          storeName: this.props.storeName
      })


         }
      })
    };

   
    return(

      <div>
            <div className="box">
       

            <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            chooseDeviceId = {this.handleDeviceId}
            />
        <button onClick = {handleCamera}>Change Camera to {this.state.facingMode}</button>      
        <button onClick = {submitScan}>Submit Scan</button>
        
        <p> Name:{this.adminName} </p>

        <p>{this.state.result}</p>

        <p>Status: {this.state.status}</p>

        <p>Client Name: {this.state.name}</p>
       
     
       </div>
       </div>

    )
  }
}


//this is the name we want to be called in index.js, we can change the name 'App' to anything we like but just be aware that we need to change it also to the index.js also 
export default Scanner;
