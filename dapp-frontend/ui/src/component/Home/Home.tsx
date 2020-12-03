import  React from "react";
import Homedata from "./Homedata";
import Card from "../Card/Card";
const Home=()=> {
  return (
    <>

    <div className="my-5">
        <h1 className="text-center "><b>ABOUT</b></h1>
      </div>
      <div className="container-fluid mx-auto">
            <div className="row ">
              {
                Homedata.map((val,index)=>{
                  return <Card key={index} imgsrc={val.imgsrc} title={val.title} content={val.content} button={val.button} links={val.links} />
                })
              }
            </div>

          </div>

    </>
   );
};

export default Home;

  

