import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';


const Mainpage = () => {
    let history = useHistory();
    let [polls,setPolls] = useState([]);
    useEffect(async ()=>{
        await axios.get('https://pollmaker.herokuapp.com/getpolls/'+ window.localStorage.getItem('cuur_id')).
        then(response=> setPolls(response.data))
      },[])
      console.log(polls)
    return (
        <>
            <div className='content'>
                <div className='container'>
                    <div className='row'>
                        <Link className='btn btn-primary lg-col-2 md-col-4' style={{ marginBottom: "20px" }} to='/createpoll' >Create Poll</Link>
                    </div>
                </div>
                <hr />
                {polls.message == 'no polls' ? <><center><h1>No previous polls present </h1><br />Create a new poll</center></> : null}
            </div>

        </>
    )
}

export default Mainpage
