import React, {useState, useEffect,Component} from 'react';
import Axios from 'axios';
//import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup
//import QrScanner from 'qr-scanner'; 
//QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';
import QrReader from 'react-qr-scanner'
import auth from './auth'




class Scanner extends Component {

 

  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      name: "",
      status:"None",
      result: 'No result',
      
    }


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
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }


    

    const submitScan = async() => {
      try{
        const isAuth = await auth.isAuthenticated()
        console.log("auth Done")
        if(isAuth){
          auth.qrkey = this.state.result
          console.log(this.state.result)
          console.log( auth.qrkey)
          await auth.postScanData(()=>{
            console.log("Submitted")
           
           
    

          })
        }
      this.setState({status: auth.message})
      }
      catch(error){
        this.setState({status: auth.message})
      }

    }
    
    return(
      <div>
      

        <QrReader
        delay={this.state.delay}
        style={previewStyle}
        onError={this.handleError}
        onScan={this.handleScan}
  />        <button onClick = {submitScan}>Submit Scan here</button>

        <p>Name: {this.props.storename}</p>

        <p>{this.state.result}</p>

        <p>Status: {this.state.status}</p>

        <p>Name: {this.state.name}</p>
      </div>


    )
  }
}
//this is the name we want to be called in index.js, we can change the name 'App' to anything we like but just be aware that we need to change it also to the index.js also 
export default Scanner;
