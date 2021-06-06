import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './component.css'
import MyNavbar from "./navbar";
import Mainpage from './mainpage'
import Createpoll from './createpoll'
import { HashLoader } from 'react-spinners'


function Home() {
  let history = useHistory();
  let id = window.localStorage.getItem('curr_id');
  if (!window.localStorage.getItem('curr_user')) {
    history.push('/sign-in');
  }
  let [polls, setPolls] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(async () => {
    await axios.get('https://pollmaker.herokuapp.com/getpolls/' + id).
      then((response) => {
        setPolls(response.data)
        setLoading(true)
      })

  }, [])
  console.log(window.localStorage.getItem('curr_id'))
  console.log(polls)
  return (
    <>

      <MyNavbar></MyNavbar>
      <div className='content' style={{ marginBottom: '10em' }}>
        <div className='container'>
          <div className='row'>
            <Link className='btn btn-primary col col-lg-2 col-md-4 col-sm-3 col-xs-4 ' style={{ marginBottom: "20px" }} to='/createpoll' >Create Poll</Link>
          </div>
        </div>
        <hr />

        {loading ? polls.length == 0 ? <><center><h1>No previous polls present </h1><br />Create a new poll</center></> : <>
          <div class="card shadow mb-4 col-12 col-lg-10 col-md-10 offset-lg-1 offset-md-1">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Previous Polls</h6>
            </div>
            <div class="card-body">

              <table class="table table-striped table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th className='col-4 col-md- col-lg-7'>Poll</th>
                    <th className='col-8 col-md-5 col-lg-5'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    polls.map((data) => {
                      return (
                        <tr>
                          <td>{data.pollQuestion}</td>
                          <td>
                            <div className='container'>
                              <div className='row'>
                                <div className='col-2'>
                                  <button className='btn btn-primary btn-sm' onClick={() => {
                                    navigator.clipboard.writeText(data.shortUrl)
                                  }}>Copy URL</button>
                                </div>
                                <div className='col-2'>
                                  <button className='btn btn-warning btn-sm col-xs-12' style={{ marginLeft: "50px" }} onClick={() => {
                                    history.push('/result/' + data._id)
                                  }}>
                                    Result
                              </button>
                                </div>
                              </div>
                            </div>

                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </> : <><div className='col-10 offset-1' style={{ marginTop: "50px" }}><center><HashLoader loading /></center></div>  </>}

      </div>
    </>
  );

}

export default Home