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
        this.accountType = null //available after login either admin or admin
        this.client_id = null
        this.responseMessage = null
        this.scannedData = null
        this.scanDetail = null
        this.regInfo = null
        this.qrkey = null
        this.error = null
        
        Axios.defaults.withCredentials = true;
    }
    async signUp(cb){
        try{
            console.log("Try")
            let response = await Axios.post('http://localhost:3001/form/signUp', {
                regInfo: this.regInfo,
                accountType:this.accountType})

            console.log("Success Sign Up") 
            this.message = response.data.message
        }
        catch(error){
            this.message =  error.response.data.message
            console.log("ERROR: " +  error.response.data.message)
        }   

        cb()
    }


    async signIn(cb) {
        try{
            let response = await Axios.post('http://localhost:3001/form/signIn',{
            email:this.email,
            // password: this.password,
            password: this.password,
            accountType:this.accountType
            })
            console.log("Login")
            console.log(this.accountType)
            this.info = response.data.info
            this.authenticated = true

            cb()
        }
        catch(error){
            console.log("ERROR: " +  error)
        }
        
    }

    async getScanData(cb){
        try{
            let response = await Axios.get('http://localhost:3001/admin/scanned',  {qrkey: 503})
            console.log("Received Scan Data Response") 
            console.log(response.data)
            this.scannedData = response.data
        }
        catch(error){
            console.log("ERROR: " +  error.response.data)
        }   
        cb()

    }

    async getHistory(cb){
        try{
            let response = await Axios.get('http://localhost:3001/user/history')
            
            console.log("Received Scan Data Response") 
            console.log(response.data)
            this.scannedData = response.data
        }
        catch(error){
            console.log("ERROR: " +  error.response.data.message)
        }   
        cb()

    }

    

    async resetqr(cb){
        try{
           
        let response = await Axios.put('http://localhost:3001/user/qr',{withCredentials: true},{email: this.info.email},
        )
            if(response){
                
                this.info.qr = response.data
            }
            
        }
        catch(error){
            console.log("ERROR: " +  error.response.data.message)
        }
        cb()
    }


    async logout(cb){

        try{
            let response =  await Axios.delete('http://localhost:3001/logout',
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

    async postScanData(cb){
        console.log("submitScan pass")
        try{
            console.log("Try")
            let response = await Axios.post('http://localhost:3001/admin/scanned',  {qrkey: this.qrkey},
            {withCredentials: true,
            })

            console.log("Received Scan Response") 

            this.scanDetail = response.data 
            this.responseMessage = "Scanning Success"
                   
        }
        catch(error){
            console.log("ERROR: " +  error.response.data)
            this.responseMessage = error.response.data
            
        }   

        cb()
    }

    async getInfo(cb){
        try{ 
            let response = await Axios.get('http://localhost:3001/user/info',{withCredentials: true}, {accountType: this.accountType},
            )
            console.log("Received Info")        
            this.info = response.data
            console.log(this.info)   
        }
        catch (error){
            console.log("ERROR: " +  error.response.data.message)
        }
        cb()
    }


    async getInfoAdmin(cb){
        try{ 
            let response = await Axios.get('http://localhost:3001/admin/info',{withCredentials: true}, {accountType: this.accountType},
            )
            console.log("Received Info")        
            this.info = response.data
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
            let response = await Axios.post('http://localhost:3001/authenticate',  {accountType: this.accountType},
            {withCredentials: true,
            })
            console.log("ACcess Token is still valid")        
            this.authenticated = true
            this.client_id = response.data.client_id
            this.permission = response.data.permission
            console.log("permission ")
                console.log(this.permission)
            if(this.permission == "0") { 
                this.accountType = "user"}
            else{
                this.accountType = "admin"
            }


            console.log("client id: " + response.data.client_id )  
        }
        catch (error){
            this.authenticated = false
            console.log("ERROR: " +  error.response.data.message)
        }
        if(!this.authenticated){
            try{
                console.log("try refresh")
                let response = await  Axios.get('http://localhost:3001/refreshToken', {withCredentials: true}, {accountType: this.accountType},
                )     
                console.log("Refreshed The Token") 
                this.authenticated = true
                this.client_id = response.data.client_id 

                this.permission = response.data.permission
                console.log("permission ")
                console.log(this.permission)
                if(this.permission == "0") { 
                    this.accountType = "user"}
                else{
                    this.accountType = "admin"
                }

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