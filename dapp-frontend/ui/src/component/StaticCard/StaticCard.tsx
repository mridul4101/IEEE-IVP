import  React from "react";
import {NavLink} from "react-router-dom";
import "./StaticCard.css" ;
import { Timer } from '../Timer';


const StaticCard=(props:any)=> {
  return (
    <>
     <div className='col-md-5 col-20 m-auto '>
       <div className="card-container m-auto ">
        <div className="row">
        <div className="cardtop ">
            <div className="card-body border border-secondary rounded">
                {
                    (props.time > Date.now()/1000) ? <Timer time={props.time}/> : null
                }
                <h5 className="card-title">{props.title}</h5>
                {/* <h6 className="card-text" >{props.description}</h6> */}
                <NavLink to={props.link1} className="btn btn-outline-info">{props.button1}</NavLink>
                <br/><br/>
                <NavLink to={props.link2} className="btn btn-outline-info">{props.button2}</NavLink>
            </div>
        </div>
        </div>
        </div>
      </div>
    </>
   );
};

export default StaticCard;