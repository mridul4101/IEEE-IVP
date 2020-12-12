import React, { useState, useEffect } from 'react';
import {  Spinner,Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {HorizontalBar} from 'react-chartjs-2';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
// import Data from './database.json';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';


init("user_NI9DNlQc3Lcvb48w7nGYW");

interface Q {
  question: string;
  options: string[];
}
type SurveyData = {
  Title?: string;
  description?: string;
  time?: string;
  isPublic?: boolean;
  question: Q[];
};



var DeclareResult: Array<number[]> = [];
const initialState: SurveyData = {
  Title: '',
  description: '',
  time: '00:00',
  isPublic: false,
  question: [{ question: '', options: [''                                                                                                                                                                                                                                                                                                                                                                  ] }],
};

var totalResponse=0;
const getResult = async (id) => {
  const filter = window.surveyInstance.filters.SentSurvey(id, null);
  const logs = await window.surveyInstance.queryFilter(filter);
  const parseLogs = logs.map((log) => window.surveyInstance.interface.parseLog(log));
  const surveyAll = parseLogs.map((ele) => ele.args[1]);
  // console.log('Result :', surveyAll);
  totalResponse = surveyAll.length;
  for(const i of surveyAll){
    for(const j in i){
      DeclareResult[j][i[j]] = DeclareResult[j][i[j]] + 1;
    }
  }
  // console.log(DeclareResult);
  return surveyAll;
};

function Result() {
  const { SurveyHash } = useParams()  as {SurveyHash : string};
  const [exist, setExist] = useState<boolean>(true);
  const [spin, setSpin] = useState<boolean>(true);
  const [newSurvey, setNewSurvey] = useState<SurveyData>(initialState);
  const [user, setUser] = useState("None")
  const [userId, setUserId] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [temp, setTemp] = useState("");
  const [add, setAdd] = useState(false);
  const [isprivate,SetIsprivate] = useState<Boolean>(false);
  const [author, setAuthor] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    if(window.wallet !== undefined)
    {
      var addr = await window.wallet.getAddress();
      setUser(addr);
    }

    console.log(user);

    const hash = await window.surveyInstance.surveys(SurveyHash);
    setAuthor(hash[2]);
    // console.log('Remix : ', hash);
    const ipfshash = hash[0];
    SetIsprivate(!hash[4]);

    const data = await axios.get(`https://ipfs.infura.io/ipfs/${ipfshash}`);
    // console.log(data.data);
    //  if(data.status !== 200)setExist(false);
    setNewSurvey(data.data);
    const graph:SurveyData = data.data;
    // console.log(graph);
    for(const i of graph.question ){ 
      let n = i.options.length;
      // console.log('value',i.options.length);
      const x = (new Array(n)).fill(0);
      DeclareResult.push(x);
    }
    // console.log(DeclareResult);
  };


  const addUser = async () => {
      if (window.wallet) {
        try {

          // var variable = {from_name: 'Mridul 2015', reply_to: 'mridul.dgp2020@gmail.com', address: SurveyHash};
          const templateId = 'template_x07vc7r';
          const serviceId = 'service_nwdogwb';

          userEmail.map(e => {

            var variable = {reply_to: e, address: SurveyHash};
            emailjs.send(
              serviceId, templateId,
              variable
              ).then(res => {
                console.log('Email successfully sent!')
              })
              // Handle errors here however you like, or use a React error boundary
              .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))

          })
          
          const sur = await window.surveyInstance
            .connect(window.wallet)
            .addUsers(SurveyHash,userId);

          // console.log('TXN Hash :', sur);
          Swal.fire({
            icon: 'success',
            title: 'Done...',
            text: 'You have added users',
          });

        } catch (e) {
          let add = await window.wallet.getAddress();
          if(!add)add = window.wallet.address;
          const x = new ethers.VoidSigner(add, window.provider);

          try {
            const A = await window.surveyInstance.connect(x).estimateGas.addUsers(SurveyHash,userId);
            // console.log(A); 
          } catch (e) {
            // console.log('Error is : ', e);
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${e}`,
            });
          // setisSubmit(false);
          }
        }
      } else
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Connect to wallet!',
        });
  }


  const handleChange = (e) => { 
    if(temp.length === 42 ){
      setAdd(true)}
    else{setAdd(false)}
      setTemp(e.target.value)
  }

  const URL = "http://localhost:5000/getuser";

  const addAddress = async() => {
    // var required_entry = Data.filter((d)=>{
    //   if(d.email === temp) return d;
    // })[0];
    var required_entry = {name:"", email:"", hex:""};
    var required_id = "";

    console.log(temp);
    try{
      const response = await axios.post(URL,{email:temp});
      console.log(response.data);
      required_entry = response.data
      required_id = required_entry.hex;
    }
    catch(e){
      console.log(e.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.error,
        });
      return;
    }
    
    // if(required_entry === undefined)
    // {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Invalid email ID',
    //   });
    //   return;
    // }
    
    // var id_required = required_entry.id;

    // console.log(temp);
    // console.log(id_required);
    setUserEmail([...userEmail, temp]);
    setUserId([...userId, required_id]);
    setTemp("");
  }

  const removeAddress = () => {
    setUserId(userId.filter((_, i) => i!==userId.length-1));
    setUserEmail(userEmail.filter((_, i) => i!==userEmail.length-1));
  }


  useEffect(() => {
    (async () => {
      try {
        await getData();
        await getResult(SurveyHash);        
      } catch {
        setExist(false);
      }
      setSpin(false);
    })();
  }, [spin]);

  return (
    <>
    <div className=" m-4 ">
      {
        spin ? (
          
          <div className="preloader" >
            <Spinner className="loader" animation="border" variant="primary" role="status"/>
          </div>
        ) : null
      }

      {
        exist ? (
          <>
              <br/>

              <h1 style={{color: "white"}}>Analysis of Survey Result</h1>

              {
                isprivate && user!=="None" && user===author
                ? <div style={{ maxWidth: '800px' }} className="mx-auto">
                    <div className="text-left bg-white p-5 rounded">
                      <h4 style={{color: "black"}}> Add users to be authorised for this survey.</h4>
                      <hr/>

                      <Row>
                        <Col>
                          <div className="form-group column">
                            <input className="form-control" name="user" placeholder="Enter email Id of user to be authorised" value={temp} onChange={handleChange}/>
                            <br/>
                            <button className="btn btn-primary border bordercircle" onClick={addAddress}> <i className="fa fa-plus m-0" aria-hidden="true"></i> </button>
                            <button className="btn btn-primary border bordercircle float-right" onClick={removeAddress}> <i className="fa fa-minus m-0" aria-hidden="true"></i> </button>
                          </div>                
                        </Col>
                        <Col style={{marginTop: "0px"}}>
                          <ul className="list-group list-group-flush " style={{overflow:'auto'}} >
                            {
                              userEmail.map((ele, i) => (
                                <>
                                  <li className="list-group-item">{i+1}) {ele} ({userId[i]})</li>
                                </>
                              ))
                            }
                          </ul>

                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {
                              userId.length > 0
                              ? userId.length === 1
                                ? <button className="btn btn-primary" onClick={addUser}>Authorize above {userId.length} user for this survey</button>
                                : <button className="btn btn-primary" onClick={addUser}>Authorize above {userId.length} users for this survey</button>
                              : <button className="btn btn-primary disabled" onClick={addUser}>Authorize above users for this survey</button>
                            }
                            
                          </div>
                        
                        </Col>
                      </Row>
                    </div>
                  </div>
                :null
              }

              <br/>
            

              <h2 style={{color: "white"}} className="text-center" >Total Responses: {totalResponse}</h2>
              <div style={{ maxWidth: '800px' }} className="mx-auto">

                <div
                  
                  className="text-left bg-white p-5 rounded"
                >
                  <h3 className="text-dark"> {newSurvey.Title} </h3>
                  <hr />
                  <ReactMarkdown source={newSurvey.description} escapeHtml={false} />
                </div>

                <div>
                  {
                    newSurvey.question.map((ele, index) => (
                      <div
                      
                      className="text-left bg-white my-3 p-5 rounded"
                      >
                        <h6><span className="badge badge-pill badge-primary mr-2 text-dark" >Q : {index + 1}</span>{ele.question}</h6>
                        <HorizontalBar data={
                          {labels: ele.options,
                          datasets: [
                            {
                              label: 'Responses',
                              backgroundColor: 'rgba(0,80,153,0.8)',
                              borderColor: 'rgb(0,80,153)',
                              borderWidth: 0.5,
                              hoverBackgroundColor: 'rgb(0,80,153)', 
                              hoverBorderColor: 'rgb(0,80,153)',
                              data: DeclareResult[index]
                            }
                          ]}} 
                        />
                      </div>
                    ))
                  }
                </div>
                
              </div>
              
              <br /> <br />
          </>
        ) : (
          <div className="error"> </div>
        )
      }
    </div>
    </>
  );
}

export default Result;