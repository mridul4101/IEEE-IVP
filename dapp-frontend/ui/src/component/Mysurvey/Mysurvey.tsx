import StaticCard from "../StaticCard/StaticCard";
import "../Allsurvey/Allsurvey.css";
import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Timer } from '../Timer';

export default function Mysurvey() {
  // const [allSurvey, setAllSurvey] = useState([]);
  const [allPublic, setAllPublic] = useState([]);
  const [allPrivate, setAllPrivate] = useState([]);
  // const [state, setState] = useState('');

  const getSurvey = async () => {
    if(window.wallet===undefined)
    {
        alert("Wallet not loaded");
        return;
    }
    var addr = await window.wallet.getAddress();
    // setState(addr);
    const filter = window.surveyInstance.filters.NewSurvey(addr, null);
    const logs = await window.surveyInstance.queryFilter(filter);
    const parseLogs = logs.map((log) => window.surveyInstance.interface.parseLog(log));
    const surveyAll = parseLogs.map((ele) => ele.args[1]);
    // console.log('All :', surveyAll);
    const detailsAll = await Promise.all(
        surveyAll.map(async (ele) => {
        const x = await window.surveyInstance.surveys(ele);
        const p = [x[0], x[1], x[2], x[3], x[4],ele];
        return p;
      })
    );
    // setAllSurvey(detailsAll);

    var publicSurveys = [];
    var privateSurveys = [];
    for(var i=0;i<detailsAll.length;i++)
    {
      var type = detailsAll[i][4];
      // console.log(type);
      if(type === true)
        publicSurveys.push(detailsAll[i]);
      else
        privateSurveys.push(detailsAll[i]);
    }

    setAllPublic(publicSurveys);
    setAllPrivate(privateSurveys);
    // console.log('All :', detailsAll);
    return surveyAll;
  };

  useEffect(() => {
    (async () => {
      await getSurvey();
    })();
  }, []);

  const searchbox = {
    border : "none",
    borderBottom : "2px solid #005099",
    outline : "none",
    marginBottom : '5px'
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-center ">MY SURVEY PAGE </h1>
      </div>
      <div className="container ">

        <div className="rows text-left mt30 mb10">
          <div className="header-title">
            <h3 style={{color: "white",textAlign:"center",margin:"10px"}}>Public Survey(s) (Live)</h3>
          </div>
        </div>
          
        <div className="row colorcard border border-outline-white pt-2 ">
          {
            allPublic.map((ele, i) => {
              return (ele[3]>(Date.now()/1000) ? <StaticCard key={i} time={ele[3]} title={ele[1]} button1={"View Survey"} link1={"/SurveyDetail/"+ele[5]} button2={"See Results"} link2={'/Result/' + ele[5]}/> : null)
            })
          }{' '}      
        </div>
      </div>
      
      <div className="container ">

        <div className="rows text-left mt30 mb10">
          <div className="header-title">
            <h3 style={{color: "white",textAlign:"center",margin:"10px"}}>Public Survey(s) (Finished)</h3>
          </div>
        </div>
          
        <div className="row colorcard border border-outline-white pt-2 ">
          {
            allPublic.map((ele, i) => {
              return (ele[3]<(Date.now()/1000) ? <StaticCard key={i} time={ele[3]} title={ele[1]} button1={"View Survey"} link1={"/SurveyDetail/"+ele[5]} button2={"See Results"} link2={'/Result/' + ele[5]}/> : null)
            })
          }{' '}      
        </div>
      </div>

     
      <div className="container">

        <div className="rows text-left mt30 mb10">
          <div className="header-title">
            <h3 style={{color: "white",textAlign:"center",margin:"10px"}}>Private Survey(s) (Live)</h3>
          </div>
        </div>
          
        <div className="row colorcard border border-outline-white pt-2">
          {
            allPrivate.map((ele, i) => {
              return (ele[3]>(Date.now()/1000) ? <StaticCard key={i} time={ele[3]} title={ele[1]} button1={"View Survey"} link1={"/SurveyDetail/"+ele[5]} button2={"See Results"} link2={'/Result/' + ele[5]}/> : null)
            })
          }{' '}      
        </div>
      </div>
      
      <div className="container ">

        <div className="rows text-left mt30 mb10">
          <div className="header-title">
            <h3 style={{color: "white",textAlign:"center",margin:"10px"}}>Private Survey(s) (Finished)</h3>
          </div>
        </div>
          
        <div className="row colorcard border border-outline-white pt-2 ">
          {
            allPrivate.map((ele, i) => {
              return (ele[3]<(Date.now()/1000) ? <StaticCard key={i} time={ele[3]} title={ele[1]} button1={"View Survey"} link1={"/SurveyDetail/"+ele[5]} button2={"See Results"} link2={'/Result/' + ele[5]}/> : null)
            })
          }{' '}      
        </div>
      </div>
     
    </>
  )
}