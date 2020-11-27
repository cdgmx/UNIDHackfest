const config = require ('./dbconfig');
const mysql = require('mysql2/promise');
var QRCode = require('qrcode');
var dateFormat = require('dateformat');

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
            const sqlSelect = `SELECT * FROM ${client} WHERE ${key} = ?` 
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

async function checkTokens(token){
    try{
        const sqlSelect = `SELECT * FROM tokens WHERE token = ?` 
        const [rows, fields] = await db.execute(sqlSelect, [token])
        if(!rows.length == 0) {
            results = parseData(rows[0])
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

async function updateTokens(token, client_id){
    try{
        const sqlInsert = `INSERT INTO tokens (token, client_id) VALUES(?,?)` 
        db.execute(sqlInsert, [token,client_id])
        return true
        //console.log(results)
    }
    catch (error){
        console.log(error)
        return null
    }   
}


async function deleteTokens(token){
    try{
        const sqlDelete= `DELETE FROM tokens WHERE token = ?` 
        let response = await db.execute(sqlDelete, [token])
        if(response){
            return true
            //console.log(results)
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


async function postScanInfo(admin_id,user_id){
    try{
        //creating the dates
        var now = new Date();
        var day = dateFormat(now,"d")
        var month = dateFormat(now,"m")
        var year = dateFormat(now,"yyyy")
        var time = dateFormat(now,"h:MM")
        var period = dateFormat(now, "TT")
        var date = dateFormat(now, "yyyy-mm-dd")
        
        // let client ="users"
        // let client_id = "qwerqwe"
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
            // console.log('success')
            return rows
            
        }
        else{
            // console.log("error here")
            // console.log(rows)
            // console.log(fields)
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
        client_id = "zcasf"
        key = "admin_id"
        info_id ="user_id"


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
                    console.log("dataGetClientInfo")
                }
                return preresults[index]
              }))

              
            //   rows[0].user_id = {"test":1}
            console.log("x")
           
            return x
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

async function regClient(client, values){
    //resting all of data comming from columns
    try{
        var response = null
        var sqlInsert = null
        const {email,name,address,town,province,contact,birthday,password} = values
        console.log(values)
        if(client == "users"){sqlInsert= `INSERT INTO users
        (email,name,address,town,province,contact,birthday,password)
        VALUES (?,?,?,?,?,?,?,?)`
    
        response = await db.execute(sqlInsert,[email,name,address,town,province,contact,birthday,password])
        }

        else{sqlInsert = `INSERT INTO admins 
        (email,name,address,town,province,contact,password)
        VALUES (?,?,?,?,?,?,?)`
        response = await db.execute(sqlInsert,[email,name,address,town,province,contact,password])
        }
         
        
        if (response){
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

async function updateClient(client, column,value, key,client_id){
    try{
        //client DB{users, admins} column{address, name, bday} key ={thing you want to match}
        const sqlUpdate = `UPDATE ${client} SET ${column} = ? WHERE ${key} = ?` 
        const response = await db.execute(sqlUpdate, [{value},client_id])
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


module.exports = {
    getClientInfo: getClientInfo,
    checkTokens: checkTokens,
    updateTokens:updateTokens,
    postScanInfo:postScanInfo,
    getPermission:getPermission,
    getScanned:getScanned,
    deleteTokens:deleteTokens,
    regClient:regClient,
    updateClient:updateClient
}


