import React, { useState } from 'react'
import MyNavbar from './navbar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

const Createpoll = () => {

    let history = useHistory();
    let [pollQ, setPollQ] = useState('');
    let [opt1, setOpt1] = useState('');
    let [opt2, setOpt2] = useState('');
    let [opt3, setOpt3] = useState('');
    let [opt4, setOpt4] = useState('');
    let [shortUrl,setShortUri] = useState('');
    const [show, setShow] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const handleClose = () => {
        setShow(false);
        history.push('/')
    }
    const handleShow = () => setShow(true);
    const CopyText = ()=>{
       navigator.clipboard.writeText(shortUrl)
       setIsCopied(true);
       setTimeout(()=>{
           setIsCopied(false);
       },1000)
    }

    if(!window.localStorage.getItem('curr_user')){
        history.push('/')
    }

    let handleSubmit = async () => {
        let poll = {
            user_id: window.localStorage.getItem('curr_id'),
            pollQuestion: pollQ,
            options: [{opt:opt1,votes:0},{opt:opt2,votes:0},{opt:opt3,votes:0},{opt:opt4,votes:0}]
        }

        await axios.post('https://pollmaker.herokuapp.com/createpoll', poll)
            .then((response) => {
               if(response.data.message == 'poll created'){
                    setShortUri(response.data.shortUrl)
                    handleShow();
                    console.log(response.data)
               }
            })
    }

    return (
        <div>
            {/* Navbar */}
            <MyNavbar></MyNavbar>

            {/* {Modal} */}
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Poll Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>Click the button to copy poll URL <br></br>
                    <button className='btn btn-primary' onClick={CopyText}>
                        Copy short Url
                    </button>
                    <br></br>
                    {isCopied?'Link Copied':null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Body */}
            <div className='container col-8 offset-2 shadow-lg p-3 mb-5 bg-white rounded' style={{ marginTop: "50px"}}>
                <div className='row'>
                    <div className='col-12'>
                        <center>
                            <h1>Create Poll</h1>
                        </center>
                        <Form className='col-8 offset-2' style={{ marginBottom: "3em" }} onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <Form.Group controlId="formPollQuestion">
                                <Form.Label>Poll Question</Form.Label>
                                <Form.Control type="text" placeholder="Enter Poll Question" value={pollQ} onChange={(e) => setPollQ(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formOption1">
                                <Form.Label>Option 1</Form.Label>
                                <Form.Control type="text" placeholder="Option1" value={opt1} onChange={(e) => setOpt1(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formOption2">
                                <Form.Label>Option 2</Form.Label>
                                <Form.Control type="text" placeholder="Option2" value={opt2} onChange={(e) => setOpt2(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formOption3">
                                <Form.Label>Option 3</Form.Label>
                                <Form.Control type="text" placeholder="Option3" value={opt3} onChange={(e) => setOpt3(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formOption4">
                                <Form.Label>Option 4</Form.Label>
                                <Form.Control type="text" placeholder="Option1" value={opt4} onChange={(e) => setOpt4(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Createpoll
