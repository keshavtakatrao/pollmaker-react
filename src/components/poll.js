import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MyNavbar from './navbar'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



const Poll = (props) => {
    let history = useHistory();
    let ID = props.match.params.id
    let [opt, setOpt] = useState([]);
    let [polldata, setData] = useState({});
    let [error, setError] = useState(false);
    useEffect(async () => {
        await axios.get('https://pollmaker.herokuapp.com/poll/' + ID)
            .then((response) => {
                setData(response.data);
                setOpt(response.data.options)
            })
    }, [])

    const [value, setValue] = React.useState('');
    const [show, setShow] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        setShow(false);
        history.push('/sign-in')
    }

    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        if (value == '') {
            setError(true);
        }
        else {
            let data = {
                vote: value
            }
            await axios.post('https://pollmaker.herokuapp.com/submit/' + ID, data)
                .then((response) => {
                    if (response.data.message == 'vote submitted') {
                        handleShow();
                        window.localStorage.setItem(ID,"true");
                    }
                })
        }
    }
    if(window.localStorage.getItem(ID)){
        alert('you have submitted the poll')
        history.push('/sign-in')
    }
    return (
        <>
            <MyNavbar></MyNavbar>
            <Modal show={show} backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Poll Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>Poll Submitted <br></br>
                   Thank You
                    <br></br>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='container col-8 offset-2 shadow-lg p-3 mb-5 bg-white rounded' style={{ marginTop: "50px" }}>
                {error ? <div class="alert alert-danger" role="alert">
                    Please select any option
                    </div> : null}
                <div className='row'>
                    <div className='col-12'>
                        <center>
                            <h1>Poll</h1>
                        </center>
                        <div className='offset-1'>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit()
                            }}>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend"><h2 style={{ color: 'blueviolet' }}>{polldata.pollQuestion}</h2></FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        {
                                            opt.map((data) => {
                                                return (
                                                    <>
                                                        <FormControlLabel value={data.opt} control={<Radio />} label={data.opt} />
                                                    </>
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                    <button className='btn btn-primary' type='submit'>Submit</button>
                                </FormControl>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Poll
