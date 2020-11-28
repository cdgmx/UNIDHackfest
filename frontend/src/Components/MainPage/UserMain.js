import React, {useState, useEffect,useRef} from 'react';
import auth from '../../auth'
import { Chrono } from "react-chrono";

 const UserMain = (props) => {
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
    
  

    return(
        <div>
            <h3>Client ID:{auth.client_id}</h3>
            <h3>Name:{info.name}</h3>
            <h3>Address:{info.address} {info.town} {info.province}</h3>
            <h3>Contact:{info.contact}</h3>
            <h3>Birthday:{info.birthday}</h3>
            <div className="Qr" dangerouslySetInnerHTML={{ __html: info.qr}}/>
            <button 
            onClick = { () => {
                auth.logout(()=>{
                props.history.push("/")
                })
            }}

            >logout</button>
            <button onClick = {handleUser}>User</button>
            <button onClick = {handleAdmin}>Admin</button>    
            <button onClick = {handleForm}>Form</button>  
            <button onClick = {handleReset}>Reset QR</button>  
            <div style={{width: "500px", height: "500px" }}>
            { historyLoad ? ( <Chrono items={items}  mode="VERTICAL"  hideControls cardHeight = {300}/> ) : 
            <> </>  //load only when historyLoad is true
            } 
            </div>


        </div>
    )

}


export default UserMain;