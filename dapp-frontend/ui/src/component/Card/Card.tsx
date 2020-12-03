import  React from "react";
import {NavLink} from "react-router-dom";
import "./Card.css" ;
const Card=(props:any)=> {
  return (
    <>
     <div className='col-md-4 col-20 m-auto '>
       <div className="card-container mx-auto mt-2 mb-2 ">
        <div className="cards border border-secondary rounded">
        <div className="card card-front">
          <img src={props.imgsrc} className="card-img-top" alt={props.imgsrc} />
            <div className="card-body">
              <h5 className="card-title ">{props.title}</h5>
            </div>
        </div>
        <div className="card card-back">
            <div className="card-body">
              <h6 className="card-text" >{props.content}</h6>
              <NavLink to={props.links} className="btn btn-outline-info">{props.button}</NavLink>
            </div>
        </div>
        </div>
        </div>
      </div>
    </>
   );
};

export default Card;