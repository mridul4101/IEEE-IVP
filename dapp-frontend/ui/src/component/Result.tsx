import React, { useState, useEffect } from 'react';
import {  Spinner,Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {HorizontalBar} from 'react-chartjs-2';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';

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
  console.log('Result :', surveyAll);
  totalResponse = surveyAll.length;
  for(const i of surveyAll){
    for(const j in i){
      DeclareResult[j][i[j]] = DeclareResult[j][i[j]] + 1;
    }
  }
  console.log(DeclareResult);
  return surveyAll;
};

function Result() {
  const { SurveyHash } = useParams()  as {SurveyHash : string};
  const [exist, setExist] = useState<boolean>(true);
  const [spin, setSpin] = useState<boolean>(true);
  const [newSurvey, setNewSurvey] = useState<SurveyData>(initialState);
  const [user, setUser] = useState([]);
  const [temp, setTemp] = useState("");
  const [add, setAdd] = useState(false);
  const [isprivate,SetIsprivate] = useState<Boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const hash = await window.surveyInstance.surveys(SurveyHash);
    console.log('Remix : ', hash);
    const ipfshash = hash[0];
    SetIsprivate(!hash[4]);
    // const data = await axios.get(`https://ipfs.eraswap.cloud/ipfs/${ipfshash}`);
    const data = await axios.get(`https://ipfs.infura.io/ipfs/${ipfshash}`);
    console.log(data.data);
    //  if(data.status !== 200)setExist(false);
    setNewSurvey(data.data);
    const graph:SurveyData = data.data;
    console.log(graph);
    for(const i of graph.question ){ 
      let n = i.options.length;
      console.log('value',i.options.length);
      const x = (new Array(n)).fill(0);
      DeclareResult.push(x);
    }
    console.log(DeclareResult);
    
     
  };
  const addUser = async () => {
      if (window.wallet) {
        try {
          const sur = await window.surveyInstance
            .connect(window.wallet)
            .addUsers(SurveyHash,user);

          console.log('TXN Hash :', sur);
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
            const A = await window.surveyInstance.connect(x).estimateGas.addUsers(SurveyHash,user);
            console.log(A); 
          } catch (e) {
            console.log('Error is : ', e);
            
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
  const addAddress = () => {
    
    setUser([...user,temp]);
    setTemp("");
    
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
    <div className="bg-light">
      {
        spin ? (
          <div className="preloader">
            <Spinner className="loader" animation="border" variant="primary" />
          </div>
        ) : null
      }

      {
        exist ? (
          <>
              <br/><br/>

              <h1 style={{color: "black"}}>Analysis of Survey Result</h1>

              {
                isprivate ? <div style={{ maxWidth: '800px' }} className="mx-auto">
                  <div
                    style={{ borderLeft: '5px solid #4285F4'}}
                    className="text-left bg-white p-5 rounded"
                  >
                    <h4>Add users to be authorised for this survey.</h4>
                    <hr/>

                    <Row>
                      <Col>
                        <div className="form-group column">
                          <input className="form-control col-8" name="user" placeholder="Enter address of user to be authorised" value={temp} onChange={handleChange}/>
                          <br/>
                          <button className="btn btn-primary border bordercircle" onClick={addAddress}> <i className="fa fa-plus m-0" aria-hidden="true"></i></button>
                        </div>                
                      </Col>
                      <Col>
                        <ul className="list-group list-group-flush " style={{overflow:'auto'}} >
                          {
                            user.map(ele => (
                              <>
                                <li className="list-group-item">{ele}</li>
                              </>
                            ))
                          }
                        </ul>
                        <button className="btn btn-primary" onClick={addUser}>Authorize above users for this survey</button>
                      </Col>
                    </Row>
                  </div>
                </div>
                :null
              }

              <br/>
              <br/>

              <h2 className="text-center" style={{color: "black"}}>Total Responses: {totalResponse}</h2>
              <div style={{ maxWidth: '800px' }} className="mx-auto">

                <div
                  style={{ borderLeft: '5px solid #4285F4' }}
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
                      style={{ borderLeft: '5px solid #4285F4' }}
                      className="text-left bg-white my-3 p-5 rounded"
                      >
                        <h6><span className="badge badge-pill badge-primary mr-2" style={{color: "black"}}>Q : {index + 1}</span>{ele.question}</h6>
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
  );
}

export default Result;