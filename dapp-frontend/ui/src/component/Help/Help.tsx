import  React from "react";
import { Carousel } from 'react-bootstrap';
import connectWallet from "./Helpimage/metamask.png";
import surveyform1 from "./Helpimage/createsurveyform.png";
import previewsurvey from "./Helpimage/previewsurvey.png";
import submitsurvey from "./Helpimage/submitsurvey.png";
import metaMaskTransaction from "./Helpimage/metaMaskTransaction.png";
import successfulTransaction from "./Helpimage/successfulTransaction.png";
import allSurvey from "./Helpimage/allSurvey.png";
import ConnectWallet from "./Helpimage/ConnectWallet.png";
import CreateSurvey from "./Helpimage/Createsurveys.png";
import allsurvey from "./Helpimage/All Survey.png";
import mail from "./Helpimage/mail.png";
import mySurvey from "./Helpimage/My Surveys.png";
import authorize from "./Helpimage/authorize.png";
const Help = () => {
  return (
    <>
    
      <div className="my-5 ">
        <h1 className="text-center"><b>HELP DESK</b></h1>
      </div> 
      <div className=" bg-dark border border-outline-white p-5 m-5 ">
      <Carousel>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={ConnectWallet} alt={ConnectWallet}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={connectWallet} alt={connectWallet}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={CreateSurvey} alt={CreateSurvey}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={surveyform1} alt={surveyform1}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={previewsurvey} alt={previewsurvey}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={submitsurvey} alt={submitsurvey}/>
      </Carousel.Item> 
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={metaMaskTransaction} alt={metaMaskTransaction}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={successfulTransaction} alt={successfulTransaction}/>
      </Carousel.Item>
       <Carousel.Item>
        <img className="d-block w-75 m-auto" src={allsurvey} alt={allsurvey}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={allSurvey} alt={allSurvey}/>
      </Carousel.Item> 

      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={mySurvey} alt={mySurvey}/>
      </Carousel.Item> 
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={authorize} alt={authorize}/>
      </Carousel.Item> 
      <Carousel.Item>
        <img className="d-block w-75 m-auto" src={mail} alt={mail}/>
      </Carousel.Item> 
      </Carousel>
      </div>
    </>
  );
   
};
export default Help;