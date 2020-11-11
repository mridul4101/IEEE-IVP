import  React from "react";
import './Home.css';
import Homedata from "./Homedata";
import Card from "../Card";
const Home=()=> {
  return (
    <>

    <div className="my-5">
        <h1 className="text-center">ABOUT</h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row gy-4">
              {
                Homedata.map((val,index)=>{
                  return <Card key={index} imgsrc={val.imgsrc} title={val.title} />
                })
              }
            </div>

          </div>
        </div>
      </div>
    </>
   );
};

export default Home;

  

