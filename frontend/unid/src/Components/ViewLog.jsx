import React, { useState, useEffect } from "react";
import "../Components/Styles/ViewLog.css";
import DailyDataModal from "../Components/DailyDataModal";
import Axios from "axios";

const ViewLog = () => {
  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setDataList(response.data);
    });
  }, []);

  const expandViewHandler = () => {
    setModal(<DailyDataModal setModal={setModal} data={dataList} />);

    // console.log("clicked");
  }; //click to view DailyDataModal

  return (
    <React.Fragment>
      {/* {console.log(dataList)}
      {console.log(dataList)} */}
      <div className="table-div">
        {dataList.map((dl) => (
          <div
            key={dl.user_id}
            className="data-div"
            onClick={expandViewHandler}
          >
            <p className="username-p">{`${dl.fname} ${dl.mname} ${dl.lname}`}</p>
            <p className="datescanned-p"></p>

            <p className="age-p">{dl.age}</p>

            <p className="gender-p">{dl.gender}</p>
          </div>
        ))}
      </div>
      <div>{modal}</div>
    </React.Fragment>
  );
};

export default ViewLog;
