import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import MyNavbar from './navbar';
import { useHistory } from 'react-router-dom';

import './component.css'

export default function Login() {
    let history = useHistory();
    if(window.localStorage.getItem('curr_user')){
        history.push('/')
    }
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let handelLogin = async () => {
        let data = {
            email,
            password
        }
        await axios.post('https://pollmaker.herokuapp.com/login', data)
            .then((response) => {
                if (response.data.message == 'allow') {
                    window.localStorage.setItem('curr_user', data.email);
                    window.localStorage.setItem('curr_id', response.data.id);
                    history.push('/')
                }
            });

    }

    return (
        <>
        <MyNavbar></MyNavbar>
        <form onSubmit={(e) => {
            e.preventDefault();
            handelLogin();
        }}>
            <div className='inner'>
            <h3>Log in</h3>

            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
                        </div>

                        <div className="form-group">

                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                        <p className="forgot-password text-right">
                            don't have account ? <Link to={'/sign-up'}>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </form>
        
        </>
    );
}