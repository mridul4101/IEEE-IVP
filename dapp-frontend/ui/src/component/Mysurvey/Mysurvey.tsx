import React from "react";
import Mysurveydata from "./Mysurveydata";
 import StaticCard from "../StaticCard/StaticCard";
const Mysurvey = () => {
  return (
    <>
      <div className="my-5">
        <h1 className="text-center">MY SURVEY</h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
             <div className="row gy-4">
              {
                Mysurveydata.map((val,index)=>{
                  return <StaticCard key={index}  title={val.title} description={val.description} button={val.button} links={val.links} />
                })
              } 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mysurvey;