
import auth from '../auth'
import Scan from '../Scan'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as ReactBootStrap from 'react-bootstrap'



import React, { useState, useEffect } from "react";
import "../Components/Styles/AdminPage.css";
import NewScan from "../Components/NewScan";
import ViewLog from "../Components/ViewLog";

const AdminPage = () => {

  const [scanned, setScanned] = useState([])
  const [loading, setLoading] = useState(false)


  // states
  const [display, setDisplay] = useState(null);
  // this will change to 'Scanning QR' if Scanning QR function is running

  const newScanHandler = () => {
    setDisplay(<NewScan />); //scanHandler button to click to scan
  };

  //handlers

  const viewLogHandler = () => {
    setDisplay(<ViewLog />);
  };

  const adminProfileHandler = () => {
    alert("Wait For the Next Update!");
  };

  const adminLogoutHandler = () => {
    window.location.href = "/";
  };


  
//   const handleGetScan = async() =>{

//     const isAuth = await auth.isAuthenticated()
//     console.log("auth Done")
//     if(isAuth){
//     auth.getScanData(()=>{
//         console.log("retrieving")
//         // let x = Object.assign({},auth.scannedData)
//         // auth.scannedData
//         // console.log(x)
//         setScanned(auth.scannedData)
//         setLoading(true)
//     })
//     }
 
// }

 


// useEffect(()=>{
//     async function info (){
//         await auth.getInfoAdmin(()=>{   
//             console.log("auth.info.name")
//             console.log(auth.info)
//          })
//         }
//         info()
//     handleGetScan()
//     console.log("admin effect")

// },[])


  //return
  return (
    <React.Fragment>
      <div className="admin-div">
        <div className="topnav">

     
          <button
            type="button"
            className="topnav-btn"
            id="newscan-btn"
            onClick={newScanHandler}
          >
            New Scan
          </button>
          <button
            type="button"
            className="topnav-btn"
            id="viewlog-btn"
            onClick={viewLogHandler}
          >
            View Log
          </button>
          <button
            type="button"
            className="topnav-btn"
            id="adminprofile-btn"
            onClick={adminProfileHandler}
          >
            Admin Profile
          </button>
          <button
            type="button"
            className="topnav-btn"
            id="adminlogout-btn"
            onClick={adminLogoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="main-div">
          {display === null ? <NewScan /> : display}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
