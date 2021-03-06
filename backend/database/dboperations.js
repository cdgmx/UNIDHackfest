const config = require ('./dbconfig');
const mysql = require('mysql2/promise');
var QRCode = require('qrcode');
var dateFormat = require('dateformat');
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');

//-------Legends-------------
// user - the one being scanned
// admin - the one who is scanning
// client - both user and admin, persons who uses the app
// key - word/element in a column we use to find data
// value - the value we are matching in key column
// token - refresh token
// admin_id - A universally unique identifier UUID
// user_id - A universally unique identifier UUID
//---------------------------
db =  mysql.createPool(config) //create db pool

//turn mysql array of data into json object
function parseData(data){ 
    return JSON.parse(JSON.stringify(data))
}

async function getClientInfo(client,key,value){
        try{
            // let client ="users"
            // let client_id = "qwerqwe"
            if(!client || !key || !value) throw "one of paramenters is null getClientInfo"
            const sqlSelect = `SELECT * FROM ${client} WHERE ${key} = ?` 
            const [rows, fields] = await db.execute(sqlSelect, [value])
            if(!rows.length == 0) {
                results = parseData(rows[0])
                //generating the qr code from the qrkey results given only for users
                if(client != "admins") results.qr = await QRCode.toString(results.qrkey,{type:'svg'})
                
                return results
                //console.log(results)
            }
            else{
                return null
            }
        }
        catch (error){
            console.log(error)
            return null
        }   
}

async function verifyClient(client,email,password){
    try{
        // let client ="users"
        // let client_id = "qwerqwe"
        console.log(password)
        console.log(email)
        if(!client || !email || !password) throw "one of paramenters is null getClientInfo"
        const sqlSelect = `SELECT * FROM ${client} WHERE email = ?` 
        const [rows, fields] = await db.execute(sqlSelect, [email])
        if(rows) {
            results = parseData(rows[0])
            if(client != "admins") results.qr = await QRCode.toString(results.qrkey,{type:'svg'})

            
            let verify = await bcrypt.compare(password, results.password)
            if(verify){
                return results
            }
            else return null
            
            //generating the qr code from the qrkey results given only for users
        
            
         
            //console.log(results)
        }
        else{
            return null
        }
    }
    catch (error){
        console.log(error)
        return null
    }   
}


async function postClientInfo(client, values){
    try{
        if(!client || !values) throw "one of paramenters is null postClientInfo"
        var response = null
        var sqlInsert = null
        var response2 = null
        var sqlInsert2 = null
        
        const {email,name,address,town,province,contact,birthday,password} = values
        //generate Unique ID for qr and client_id
        var client_id = uuidv4()
        var qrkey = uuidv4()
        const saltRounds = 10;

        let newpass = await bcrypt.hash(password, saltRounds)


        if(client == "user"){

            sqlInsert= `INSERT INTO users
            (email,name,address,town,province,contact,birthday,password,client_id,qrkey)
            VALUES (?,?,?,?,?,?,?,?,?,?)`

            sqlInsert2= `INSERT INTO clients
            (client_id,permission)
            VALUES (?,?)`

            response = await db.execute(sqlInsert,[email,name,address,town,province,contact,birthday,newpass,client_id,qrkey])
            response2 = await db.execute(sqlInsert2,[client_id,'0'])
        }
        else{
            sqlInsert = `INSERT INTO admins 
            (email,name,address,town,province,contact,password,client_id)
            VALUES (?,?,?,?,?,?,?,?)`

            sqlInsert2 = `INSERT INTO clients
            (client_id,permission)
            VALUES (?,?)`

            response = await db.execute(sqlInsert,[email,name,address,town,province,contact,newpass,client_id])
            response2 = await db.execute(sqlInsert2,[client_id,'1'])
        }

        if (response && response2){
            return true
        }
        else{
            return null
        }
    }
    catch(error){
        console.log(error)
        return null
    }
}

async function putClientInfo(client, column,value, key,client_id){
    try{
        if(!client || !column|| !value|| !key|| !client_id) throw "one of paramenters is null putClientInfo"
        //client DB{users, admins} column{address, name, bday} key ={thing you want to match}
        const sqlUpdate = `UPDATE ${client} SET ${column} = ? WHERE ${key} = ?` 
        const response = await db.execute(sqlUpdate, [value,client_id])
        if(response) {
            return true
            //console.log(results)
        }
        else{
            return null
        }
    }
    catch (error){
        console.log(error)
        return null
    }   
}

async function checkTokens(token){
    try{
        
        if(!token) throw "one of paramenters is null"
        const sqlSelect = `SELECT * FROM tokens WHERE token = ?` 
        const [rows, fields] = await db.execute(sqlSelect, [token])
        if(!rows.length == 0) {
            results = parseData(rows[0])
            return results
            
        }
        else{
            return null
        }
    }
    catch (error){
        console.log(error)
        return null
    }   
}

async function updateTokens(token, client_id){
    try{
        if( !client_id || !token) throw "one of paramenters is null "

        const sqlInsert = `INSERT INTO tokens (token, client_id) VALUES(?,?)` 
        let data = await db.execute(sqlInsert, [token,client_id])
        if(data)return true
        else throw "problem updateTokens"
        
       
    }
    catch (error){
        console.log(error)
        return null
    }   
}


async function deleteTokens(token){
    try{
        if(!token) throw "one of paramenters is null "
        const sqlDelete= `DELETE FROM tokens WHERE token = ?` 
        let response = await db.execute(sqlDelete, [token])
        if(response){
            return true
            
        }
        else{
            throw "problem ind delete"
        }
      
    }
    catch (error){
        console.log(error)
        return null
    }   
}


async function postScanned(admin_id,user_id){
    try{
        //creating the dates
        console.log(admin_id,user_id)
        var now = new Date();
        var day = dateFormat(now,"d")
        var month = dateFormat(now,"m")
        var year = dateFormat(now,"yyyy")
        var time = dateFormat(now,"h:MM")
        var period = dateFormat(now, "TT")
        var date = dateFormat(now, "yyyy-mm-dd")
        
        
        const sqlInsert = `INSERT INTO scanned(   
            admin_id,
            user_id, 
            day, 
            month, 
            year,
            time,
            period,
            date) 
            VALUES (?,?,?,?,?,?,?,?)` 

        const [rows, fields] = await db.execute(sqlInsert, [admin_id, user_id, day,month,year,time,period,date])
        if(rows) {
            
            return rows
        }
        else{
            
            return null
        }
    }
    catch (error){
        console.log(error)
        return null
    }   
}

async function getScanned(client_id,key,info_id,client){ //per admin
    try{
        //proxy for testing
        // client_id = "zcasf"
        // key = "admin_id"
        // info_id ="user_id"\
        console.log("getScanned")
        console.log(key)
        console.log(client_id)
        if(!client || !key|| !client_id ||  !info_id ) throw "one of paramenters is null putClientInfo"
        const sqlSelect = `SELECT * FROM scanned WHERE ${key} = ?` 
        const [rows, fields] = await  db.execute(sqlSelect, [client_id])

        if(!rows.length == 0) {
            preresults = parseData(rows)

               let x = await Promise.all(Object.keys(preresults).map(async function(key, index) {
                let dataGetClientInfo = await getClientInfo(client,'client_id',preresults[index][info_id])
                if(dataGetClientInfo){
                    //no password or other sensitive data
                    preresults[index].name = dataGetClientInfo.name
                    preresults[index].address = dataGetClientInfo.address
                    preresults[index].town = dataGetClientInfo.town
                    preresults[index].province = dataGetClientInfo.province
                    preresults[index].contact = dataGetClientInfo.contact
                }
                else{
                    
                }
                return preresults[index]
              }))

              console.log(x)
              if(x) return x
              else throw "Error in promise"
            //   rows[0].user_id = {"test":1}
            // console.log("x")
           
            
        }
        //console.log(results)
    }
    catch (error){
        console.log(error)
        return null
    }   
}

async function getPermission(client_id){ //per admin
    try{
        if(!client_id) throw "null getPermission param"
        const sqlSelect = `SELECT * FROM clients WHERE client_id = ?`
        const [rows, fields] = await  db.execute(sqlSelect, [client_id])
        if(!rows.length == 0) {
            results = parseData(rows[0])
            return results
            //console.log(results)
        }
        //console.log(results)
    }
    catch (error){
        console.log(error)
        return null
    }   
}





async function getQr(client,key,value){
    try{
        const sqlSelect = `SELECT * FROM users WHERE qrkey= ?` 
        const [rows, fields] = await db.execute(sqlSelect, [value])
        if(!rows.length == 0) {
            results = parseData(rows[0])
            //generating the qr code from the qrkey results given
            results.qr = await QRCode.toString(results.qrkey,{type:'svg'})
            
            return results
            //console.log(results)
        }
        else{
            return null
        }
    }
    catch (error){
        console.log(error)
        return null
    }   
}


module.exports = {
    getClientInfo: getClientInfo,
    checkTokens: checkTokens,
    updateTokens:updateTokens,
    postScanned:postScanned,
    getPermission:getPermission,
    getScanned:getScanned,
    deleteTokens:deleteTokens,
    postClientInfo:postClientInfo,
    putClientInfo:putClientInfo,
    verifyClient:verifyClient
}


