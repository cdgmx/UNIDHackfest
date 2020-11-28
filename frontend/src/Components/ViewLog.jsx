import React, { useState, useEffect } from "react";
import "../Components/Styles/ViewLog.css";
import DailyDataModal from "../Components/DailyDataModal";
import Axios from "axios";
import auth from '../auth'
import Scan from '../Scan'

const ViewLog = () => {
  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(null);
  let i = 0; //just to simulate key of each div. since it is giving me error you can delete this

  // useEffect(() => {
  //   //just delete this. there is a useEffect hook under with Axios
  //   setDataList(["dasdasdas", "", "", "", "", "", "", "", "", ""]); //simulate lang nga may unod kuno
  // }, []);

  const handleGetScan = async() =>{

    const isAuth = await auth.isAuthenticated()
    console.log("auth Done")
    if(isAuth){
    auth.getScanData(()=>{
        console.log("retrieving")
        // let x = Object.assign({},auth.scannedData)
        // auth.scannedData

      
        setDataList(auth.scannedData)
        console.log(auth.scannedData)
        
        
    })
    }

  
 
}




  // useEffect to fetch data from backend everytime the page is showing
  useEffect(() => { //gin comment ko danay kay ga error sa. need ko abi ma access ang page para maka design
    async function info (){
      await auth.getInfoAdmin(()=>{   
          console.log("auth.info.name")
          console.log(auth.info)
       })
      }
      info()
    handleGetScan()

  }, []);



  const expandViewHandler = () => {
    setModal(
      <DailyDataModal
        setModal={
          setModal
        } /*data={dataList} muni ang halin sa useEffect Axios*/
      />
    );

    // console.log("clicked");
  }; //click to view DailyDataModal

  return (
    <React.Fragment>
      {console.log(dataList)}
      {console.log(dataList)}
      {/* {console.log(dataList)}
      {console.log(dataList)} */}
      <div className="table-div">
        {dataList.map((
          dl //this will create the div depending on the number of scanned
        ) => (
          <div
            key={dl.id}
            className="data-div"
            onClick={expandViewHandler}
          >
            <div className="name-div">
              <p className="name-p">
                {`${dl.name}`}
              
              </p>
            </div>

            <div className="userdetails-div">
              <div className="detailtype-div">
                <div className="detailtype-div1">Date Scanned :</div>
                <div className="detailtype-div2">Age:</div>
                <div className="detailtype-div3">Gender :</div>
              </div>
              <div className="detail-div">
                <div className="detail-div1">
                {`${dl.date}`}
                
                </div>
                <div className="detail-div2">
                  {dl.age}
                  
                </div>
                <div className="detail-div3">
                   {dl.gender} 
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal}
    </React.Fragment>
  );
};

export default ViewLog;
