import React, { useState, useEffect } from "react";
import "../Components/Styles/ViewLog.css";
import DailyDataModal from "../Components/DailyDataModal";
import Axios from "axios";

const ViewLog = () => {
  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(null);
  let i = 0; //just to simulate key of each div. since it is giving me error you can delete this

  useEffect(() => {
    //just delete this. there is a useEffect hook under with Axios
    setDataList(["", "", "", "", ""]); //simulate lang nga may unod kuno
  }, []);

  //useEffect to fetch data from backend everytime the page is showing
  // useEffect(() => { //gin comment ko danay kay ga error sa. need ko abi ma access ang page para maka design
  //   Axios.get("http://localhost:3001/api/get").then((response) => {
  //     setDataList(response.data);
  //   });
  // }, []);

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
      {/* {console.log(dataList)}
      {console.log(dataList)} */}
      <div className="table-div">
        {dataList.map((
          dl //this will create the div depending on the number of scanned
        ) => (
          <div
            key={/*dl.user_id*/ (i += 1)}
            className="data-div"
            onClick={expandViewHandler}
          >
            <p className="username-p">
              {/* {`${dl.fname} ${dl.mname} ${dl.lname}`} */}
              username here
            </p>
            <p className="datescanned-p">datescanned here</p>

            <p className="age-p">
              {/* {dl.age} */}
              age here
            </p>

            <p className="gender-p">
              {/* {dl.gender} */}
              gender here
            </p>
          </div>
        ))}
      </div>
      <div>{modal}</div>
    </React.Fragment>
  );
};

export default ViewLog;
