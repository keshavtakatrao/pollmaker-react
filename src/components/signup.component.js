import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './component.css'
import Navbar from './navbar'


function SignUp() {
    let history = useHistory();
    let [lastName, setLastName] = useState('');
    let [firstName, setFirstName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [warrning, setWarning] = useState('');
    if(window.localStorage.getItem('curr_id')){
        history.push('/')
    }
    

    let handlleSignup = async () => {
        let data = {
            firstName,
            lastName,
            email,
            password
        }

        await axios.post('https://pollmaker.herokuapp.com//signup', data)
            .then((response) => {
                if (response.data.message == 'user registered') {
                    alert("User Registered")
                    history.push('/sign-in');
                }
                else if (response.data.message == 'email exist') {
                    setWarning('email exist')
                }
                else {
                    alert('Error')
                }
            })
    }

    return (
        <>
        <Navbar></Navbar>
        <form onSubmit={(e) => {
            e.preventDefault();
            handlleSignup();
        }}>
            <div className='container col-8 offset-2 col-lg-4 offset-lg-4' style={{marginTop:"5em"}}>
            <h3 style={{textAlign:"center"}}>Register</h3>
            {warrning ? <div class="alert alert-danger" role="alert">
                {warrning}
            </div> : null}
            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered <Link to={'/sign-in'}> log in?</Link>
            </p>
            </div>
        </form>
        </>
    );

}

export default SignUp