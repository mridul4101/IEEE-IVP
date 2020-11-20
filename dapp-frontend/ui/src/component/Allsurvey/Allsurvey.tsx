import  React from "react";
import Allsurveydata from "./Allsurveydata";
 import StaticCard from "../StaticCard/StaticCard";
const Allsurvey=()=> {
  return (
    <>
      <div className="my-5">
        <h1 className="text-center">ALL SURVEY</h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
             <div className="row gy-4">
              {
                Allsurveydata.map((val,index)=>{
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

export default Allsurvey;