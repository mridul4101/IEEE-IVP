import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import { Timer } from './Timer';

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

type CardProps = {
  index: number;
  name: string;
  option: string[];
  handleChange: any;
};

const initialState: SurveyData = {
  Title: '',
  description: '',
  time: '00:00',
  isPublic: false,
  question: [{ question: '', options: [] }],
};


function Question(props: CardProps) {
  return (
    <div
      
      className="text-left bg-white my-3 p-5 rounded"
    >
      <h6>
        <span className="badge badge-pill badge-primary mr-2 text-dark">Q : {props.index + 1}</span>
        {props.name}
      </h6>
      <Form.Group>
        {/* {props.option} */}
        {props.option.map((ele, i) => (
          <Form.Check
            className="ml-5 font-weight-lighter"
            required
            type="radio"
            label={ele}
            name={props.name}
            value={i}
            onChange={(e) => props.handleChange({ [props.name] : i })}
          />
        ))}
      </Form.Group>
    </div>
  );
}

function Surveys() { 
  const { SurveyHash }  = useParams() as {SurveyHash : string};
  const [exist, setExist] = useState<boolean>(true);
  const [spin, setSpin] = useState<boolean>(true);
  const [ans, setAns] = useState<object>({});
  const [newSurvey, setNewSurvey] = useState<SurveyData>(initialState);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => { 
    const hash = await window.surveyInstance.surveys(SurveyHash);
    console.log('Remix : ', hash); 
    const ipfshash = hash[0]; 
    setTimeLeft( hash[3].toNumber()); 
    const data = await axios.get(`https://ipfs.infura.io/ipfs/${ipfshash}`);
    console.log(data.data);
    //  if(data.status !== 200)setExist(false);
    setNewSurvey(data.data);
  };

  const handleChange = (ele: object) => {
    setAns({
      ...ans,
      ...ele,
    });
  };

  const Submit = async () => {
    if(window.wallet)
    {
      const answer = [];
      for (let i in ans) {
        answer.push(ans[i]);
      }
      console.log(answer);
      try {
        const A = await window.surveyInstance.connect(window.wallet).sendSurvey(SurveyHash, answer);
        await A.wait();
        console.log(A);
        // alert("You have Submit your Survey");
        Swal.fire('Good job!', '"You have Submit your Survey', 'success');
      } catch (e) { 
        const add = await window.wallet.getAddress();
        const x = new ethers.VoidSigner(add, window.provider);
        try {
          const A = await window.surveyInstance.connect(x).estimateGas.sendSurvey(SurveyHash, answer);
          console.log(A);
        } catch (e) {
          console.log('Error is : ', e);
          
          var err="";
          if(e?.message?.includes("You have already voted  for this survey"))
            err = "You have already voted for this survey.";
          else if(e?.message?.includes("You have no access for this survey"))
            err = "You are not authorised to take part in this survey.";
          else if(e?.message?.includes("Survey has Ended"))
            err = "Survey has ended.";
          else
            err = e;

          Swal.fire({
            icon: 'error',
            title: 'Oops...', 
            text: `${err}`,
          });
          // console.log(e?.message?.includes("You have already voted  for this survey")); 
        } 
      }
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Connect to wallet!',
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    Submit();
  };


  useEffect(() => {
    (async () => {
      try {
        await getData();
      } catch {
        setExist(false);
      }
      setSpin(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spin]);

    return (
        <div className="mx-5 ">
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
                      {
                        (timeLeft > Date.now()/1000) ? <Timer time={timeLeft} /> : <div className="text-center" style={{color:"white"}}>Survey Time Over!!</div>
                      }
                        {/* <Timer time={timeLeft} /> */}
                        <div style={{ maxWidth: '800px' }} className="mx-auto">
                            <div
                               
                                className="text-left bg-white p-5 rounded"
                            >
                                <h3 className="text-dark"> {newSurvey.Title} </h3>
                                <hr />
                                <ReactMarkdown source={"Description "+": "+newSurvey.description} escapeHtml={false} />
                            </div>
                            <Form onSubmit={handleSubmit}>
                                {
                                    newSurvey.question.map((ele, index) => (
                                        <Question
                                            handleChange={handleChange}
                                            name={ele.question}
                                            index={index}
                                            option={ele.options}
                                        />
                                    ))
                                }
                                <button className="btn btn-primary">Submit </button>
                            </Form>
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

export default Surveys;
