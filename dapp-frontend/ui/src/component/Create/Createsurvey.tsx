import React,{useState} from "react";
import {MapProvider} from "./MapState";
import { Tabs, Tab } from 'react-bootstrap';
import Design from './Design';
import Preview from './Preview';
import "./Createsurvey.css";
// import ipfs from "../ipfs";
import Result from './Result';

const Createsurvey = () => {
  const [key,setKey] = useState('Design');

  const handleSelect = (key: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setKey(key) ;
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">CREATE SURVEY</h1>
      </div>
      <MapProvider>
        <div className="survey mx-5 ">
          <div className="row w-100 ">
            <div className=" col-md-8  mx-auto p-4  border border-secondary rounded">
              <div className="tabs ">
                <Tabs
                  defaultActiveKey="See Results"
                  activeKey={key}
                  transition={false}
                  id="noanim-tab-example"
                >
                  <Tab  eventKey="Design" title="Design Survey">
                    <button
                      type="button"
                      onClick={handleSelect('Preview')}
                      className="btn btn-primary  float-right"
                    >
                      {' '}
                      Preview
                    </button>
                    <Design changeTab={handleSelect} />
                    
                    <button
                      type="button"
                      onClick={handleSelect('Preview')}
                      className="btn btn-primary  float-right"
                    >
                      {' '}
                      Preview
                    </button>
                  </Tab>
                  <Tab eventKey="Preview" title="Preview Survey">
                    <button
                      type="button"
                      onClick={handleSelect('Design')}
                      className="btn btn-primary float-left"
                    >
                      <i className="fa fa-pencil"></i> Edit Survey
                    </button>
                    <button
                      type="button"
                      onClick={handleSelect('See Results')}
                      className="btn btn-primary float-right"
                    >
                      {' '}
                      Submit
                    </button>
                    <br />
                    <br />
                    <Preview Next={handleSelect} />
                    <button
                      type="button"
                      onClick={handleSelect('See Results')}
                      className="btn btn-primary "
                    >
                      {' '}
                      Submit
                    </button>
                    <br />
                    <br />
                  </Tab>
                  <Tab eventKey="See Results" title="See results">

                    <Result address="valid" />
                    <br/>
                    <button
                      type="button"
                      onClick={handleSelect('Preview')}
                      className="btn btn-primary float-left"
                    >
                      Back
                    </button>

                    
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </MapProvider>
    </>
  );
};

export default Createsurvey;