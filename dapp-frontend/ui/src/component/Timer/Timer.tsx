import React,{useState,useEffect} from 'react';
import './Timer.css';


function renderSecondsRemaining(numberOfSeconds: number): object {
  const days = Math.floor(numberOfSeconds / 60 / 60 / 24);
  const hours = Math.floor((numberOfSeconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor((numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
  const seconds = numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
  const obj = {"days":days,"hour":hours,"min":minutes,"sec":seconds}
  // return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  return obj;
}

 function renderTimestampRemaining(unixTimestampSeconds: number): object {
  const currentTimestamp = Math.round(Date.now() / 1000);
  let secondsRemaining = unixTimestampSeconds - currentTimestamp ;
  if (secondsRemaining < 0) secondsRemaining = 0;
  return renderSecondsRemaining(secondsRemaining);
}


 
export function Timer({time} ) {

  const [timer, setTimer] = useState({days:0,hour:0,min:0,sec:0});

  useEffect(() => {
    const timeCount =  setTimeout(() => {
      setTimer({...timer,...renderTimestampRemaining(time)});
    }, 1000);
    return () => clearTimeout(timeCount);
  });

  

  return (
    <section className="footer_timer mx-auto ">
            <div id="clockdiv">
               <div>
                  <div className="smalltext text-capitalize">Days</div>
                  <span className="days ">{timer.days}</span>
               </div>
               <span className="dot_time">:</span>
               <div>
                  <div className="smalltext text-capitalize">Hours</div>
                  <span className="hours ">{timer.hour}</span>
               </div>
               <span className="dot_time">:</span>
               <div>
                  <div className="smalltext text-capitalize ">Minutes</div>
                  <span className="minutes ">{timer.min}</span>
               </div>
               <span className="dot_time">:</span>
               <div>
                  <div className="smalltext text-capitalize ">Seconds</div>
                  <span className="seconds ">{timer.sec}</span>
               </div>
            </div>
</section>
  )
} 
