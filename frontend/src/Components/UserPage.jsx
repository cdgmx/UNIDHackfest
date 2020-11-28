import React, {useState, useEffect,useRef} from 'react';
import "../Components/Styles/UserPage.css";
import auth from '../auth'
import { Chrono } from "react-chrono";



const UserPage = (props) => {
  const logoutHandler = () => {
    window.location.href = "/";
  };

  //////
  const [qr, setQR] = useState(auth.info.qr)
    const [info, setInfo] = useState({...auth.info})

    const [history, setHistory] = useState([])
    const [historyLoad, setHistoryLoad] = useState(false)
    const [items, setItems] = useState([{
        title: "May 1940",
        contentTitle: "Dunkirk",
        contentText:"Men of the British.",
      }])
    const [loading, setLoading] = useState(false)

    const handleUser = () =>{
        props.history.push("/user")
        console.log('auth   info')
        console.log(auth.info)
    }
    const handleAdmin = () =>{
        props.history.push("/admin")
    }
    const handleForm = () =>{
        props.history.push("/form")
    }
    

    // const items = [{}]
    const handleHistory = async() =>{
        const isAuth = await auth.isAuthenticated()
        console.log("auth Done")
        console.log(isAuth)
        if(isAuth){
        await auth.getHistory(()=>{
            setHistory(auth.scannedData)
            setLoading(true)
        })
        } 
    }

    const handleReset = async() =>{
        const isAuth = await auth.isAuthenticated()
        console.log("auth Done")
        console.log(isAuth)
        if(isAuth){
        await auth.resetqr(()=>{
            console.log("resetqr")
            setQR(auth.info.qr)
        })}
    }


        useEffect(() => {
        async function info (){
           await auth.getInfo(()=>{   
            })
            
            setInfo(auth.info)
        }
        info()
        handleHistory()
        },[]);

        const firstUpdate = useRef(true); //this is to make the history use effect not render at first load
        useEffect(() => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
                return;
            }
            async function setData(){
            let preItems = []
            
            let historyData =  history.map(function(key,index){
                return{
                    title :  `${history[index].date} ${history[index].time}${history[index].period}`,
                    cardTitle :`${history[index].name} ` ,
                    cardSubtitle : `${history[index].name}`
                }
            })
            console.log(historyData)
            setItems(historyData)
            setHistoryLoad(true)
            }
            setData()
      },[history]);

  /////
  return (
    <div className="userpage-div">
      <button type="button" className="logout-btn" onClick={logoutHandler}>
        LOGOUT
      </button>
      <div className="users-name">
        <p>Welcome: Tristan John Girao</p>{" "}

        <p>Name:{info.name}</p>
        <p>Address: {info.address} {info.town} {info.province}</p>
        <p>Contact: {info.contact}</p>
        <p>Birthday: Tristan John Girao</p>
        {/*Change this to `Welcome : ${data.fullname}`*/}
        
        <p>Here's your QR CODE</p>
      </div>
      <img src="" alt="QR Code Here" className="qr-code" />
      <button type="button" className="resetqr-btn">
        Reset QR
      </button>
    </div>
  );
};

export default UserPage;
