import React,{useState,useEffect} from 'react'
import axios from 'axios'
import MyNavbar from './navbar'
import {useHistory} from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import {HashLoader} from 'react-spinners'

const Result = (props) => {
    let history = useHistory();
    let ID = props.match.params.id;
    let [loading,setLoading] = useState(false)

    let [pollData,setPollData] = useState({});
    let pollLable = [];
    let pollDatasets = [];
    let [data,setData] = useState({});

    useEffect(async ()=>{
        await axios.get('https://pollmaker.herokuapp.com/poll/' + ID)
        .then((response)=>{
            setPollData(response.data)
            setLoading(true)
            response.data.options.map((info)=>{
                pollLable.push(info.opt);
                pollDatasets.push(info.votes)
            })
            setData( {
                labels: pollLable,
                datasets: [
                  {
                    label: '# of Votes',
                    data: pollDatasets,
                    fill: false,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8',
                      'rgba(255, 206, 86, 0.8)',
                      'rgba(75, 192, 192, 0.8)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              })
        })
    },[])
    

    const config = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      
      };

    return (
        <>
            <MyNavbar></MyNavbar>
            <div className='container' style={{marginTop:"50px",paddingBottom:"100px"}} >
                <div className='row'>
                    <div className='col-lg-4 offset-lg-4'>
                        <h2 style={{marginBottom:"10px"}}>{pollData.pollQuestion}</h2>
                        {loading?<Doughnut data={data}/>:<div style={{marginTop:'10em'}}><center><HashLoader size={100} loading /></center> </div>}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Result
