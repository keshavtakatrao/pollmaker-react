import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory,Link } from 'react-router-dom'

const MyNavbar = () => {
    let history = useHistory();

    function Logout() {
        window.localStorage.removeItem('curr_id');
        window.localStorage.removeItem('curr_user');
        history.push('/sign-in')
    };
    return (
        <Navbar className='navbar' collapseOnSelect expand="lg" bg="dark" variant="dark" style={{paddingLeft:"50px"}}>
                <Link to='/' style={{textDecoration:"none"}}><Navbar.Brand to='/home'>Polls Maker</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end">
                    {window.localStorage.getItem('curr_user') &&              
                        <button type='submit' className='btn btn-primary ml-auto' onClick={Logout} >Log Out</button>}
           
                    </Nav>
                </Navbar.Collapse>
            </Navbar>)
}
export default MyNavbar