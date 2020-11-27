import Axios from 'axios';
import React, {useState, useEffect} from 'react';
class Auth{
    constructor (){  
        this.authenticated = false
        this.info ={
            name:" ", 
            address: " ",
            contact: " ",
            birthday: " ",
            qr: " ",
        }
        this.accountType = null
        this.client_id = null
        this.message = null
        this.scannedData = null
        this.regInfo = null
    }
    async regClient(cb){
        try{
            console.log("Try")
            let response = await Axios.post('http://localhost:3005/register',  {regInfo: this.regInfo},
            {withCredentials: true,
            })
            console.log("Received Scan Response") 
            this.message = response.data.message
        }
        catch(error){
            this.message =  error.response.data.message
            console.log("ERROR: " +  error.response.data.message)
        }   

        cb()
    }
    async getScanData(cb){
        try{
            let response = await Axios.post('http://localhost:3005/getScanned',  {qrkey: 503},
            {withCredentials: true,
            })
            console.log("Received Scan Data Response") 
            console.log(response.data.scannedData)
            this.scannedData = response.data.scannedData
        }
        catch(error){
            console.log("ERROR: " +  error.response.data.message)
        }   
        cb()

    }

    async login(cb) {
        try{
            let response = await Axios.post('http://localhost:3005/login',{
            email:this.email,
            password: this.password,
            accountType:this.accountType
            },{withCredentials: true})
            this.info = response.data.info
            this.authenticated = true
            cb()
        }
        catch(error){
            console.log("ERROR: " +  error.response.data.message)
        }
        console.log("email " + this.email)
        console.log("password " + this.password)  
    }

    async resetqr(cb){
        try{
        let response = await Axios.post('http://localhost:3005/resetQR',  {email: this.info.email},
        {withCredentials: true})
            if(response){
                this.info.qr = response.data.qr
            }
            
        }
        catch(error){
            console.log("ERROR: " +  error.response.data.message)
        }
        cb()
    }


    async logout(cb){

        try{
            let response =  await Axios.delete('http://localhost:3005/logout',
            {withCredentials: true,
            })
                if(response)
                {
                     console.log(response.data.message)   
                }
        }

        catch(error){
            console.log("ERROR: " +  error.response.data.message)
        }
        cb()    
      
    }

    async submitScan(cb){
        console.log("submitScan pass")
        try{

            console.log("Try")
            let response = await Axios.post('http://localhost:3005/submitScan',  {qrkey: 503},
            {withCredentials: true,
            })
            console.log("Received Scan Response") 
            this.message = response.data.message
            
                   
        }
        catch(error){
            this.message =  error.response.data.message
            console.log("ERROR: " +  error.response.data.message)
        }   

        cb()
    }

    async getInfo(cb){
      
        try{ 
            let response = await Axios.post('http://localhost:3005/getInfo',  {accountType: this.accountType},
            {withCredentials: true,
            })
            console.log("Received Info")        
            this.info = response.data.info 
            console.log(this.info)   
        }
        catch (error){
            console.log("ERROR: " +  error.response.data.message)
        }
        cb()

    }
    async isAuthenticated(){
        try{ 
            console.log("AuthPass")
            let response = await Axios.post('http://localhost:3005/authenticate',  {accountType: this.accountType},
            {withCredentials: true,
            })
            console.log("ACcess Token is still valid")        
            this.authenticated = true
            this.client_id = response.data.client_id
            this.permission = response.data.permission
            console.log("client id: " + response.data.client_id )  
        }
        catch (error){
            this.authenticated = false
            console.log("ERROR: " +  error.response.data.message)
        }
        if(!this.authenticated){
            try{
                console.log("try refresh")
                let response = await  Axios.post('http://localhost:3005/refreshToken',  {accountType: this.accountType},
                {withCredentials: true,
                })     
                console.log("Refreshed The Token") 
                this.authenticated = true
                this.client_id = response.data.client_id 
                console.log("client id: " + response.data.client_id ) 
            }
            catch (error){
                this.authenticated = false
                console.log("ERROR: " +  error.response.data.message)
            }
        }

        return this.authenticated  
        
    } 
}


export default new Auth();