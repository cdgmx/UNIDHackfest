import React, {useState,useEffect} from 'react'
import auth from '../../auth'
import Scan from '../../Scan'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as ReactBootStrap from 'react-bootstrap'


const AdminMain = (props) => {

    const [scanned, setScanned] = useState([])
    const [loading, setLoading] = useState(false)



    const handleUser = () =>{
        props.history.push("/user")
    }
    const handleAdmin = () =>{
        props.history.push("/admin")
    }
    const handleForm = () =>{
        props.history.push("/form")
    }

    const handleGetScan = async() =>{

        const isAuth = await auth.isAuthenticated()
        console.log("auth Done")
        if(isAuth){
        auth.getScanData(()=>{
            console.log("retrieving")
            // let x = Object.assign({},auth.scannedData)
            // auth.scannedData
            // console.log(x)
            setScanned(auth.scannedData)
            setLoading(true)
        })
        }
     
    }
  
     


    useEffect(()=>{
        async function info (){
            await auth.getInfoAdmin(()=>{   
                console.log("auth.info.name")
                console.log(auth.info)
             })
            }
            info()
        handleGetScan()
        console.log("admin effect")

    },[])

    const columns = [
        {dataField:"date", text: "Date"},
        {dataField:"name", text: "Name"},
        {dataField:"contact", text: "Contact"},
        {dataField:"address", text: "Address", filter: textFilter()},
        {dataField:"town", text: "Town", filter: textFilter()},
        {dataField:"province", text: "Province", filter: textFilter()},
    ]

    return(
        <div>
            <h3>admin</h3>
            
            <Scan
            storename = {auth.info.name}
            />
            <button 
            
            onClick = { () => {
                auth.logout(()=>{
                props.history.push("/")
                })
            }}

            > logout</button>
            <button onClick = {handleUser}>User</button>
            <button onClick = {handleAdmin}>Admin</button>   
            <button onClick = {handleForm}>Form</button>   
            <button onClick = {handleGetScan}>get ScanData</button>
            {loading ?(
            <BootstrapTable
                keyField = "id"
                data = {scanned}
                columns = {columns}
                pagination ={paginationFactory()}
                filter={ filterFactory()}
            /> )
            :(<ReactBootStrap.Spinner animation ="border"/>)
           }
        </div>
    )

}


export default AdminMain;