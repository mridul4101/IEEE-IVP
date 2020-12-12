import React from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from './component/Home/Home';
import Allsurvey from './component/Allsurvey/Allsurvey';
import Mysurvey from './component/Mysurvey/Mysurvey';
import Help from './component/Help/Help';
import Navbar from './component/Navbar/Navbar';
import Createsurvey from './component/Create/Createsurvey';
import Surveys from './component/Surveys';
import Result from './component/Result';
import Form from './component/Form';
import './App.css';

const App=()=> {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/allsurvey" component={Allsurvey}/>
      <Route exact path="/mysurvey" component={Mysurvey}/>
      <Route exact path="/help" component={Help}/>
      <Route exact path="/Createsurvey" component={Createsurvey}/>
      <Route exact path="/Form" component={Form}/>
      <Route exact path="/SurveyDetail/:SurveyHash" component={Surveys}/>
      <Route path="/Result/:SurveyHash" component={Result} />
      <Redirect to="/"/>
      <Home/>
    </Switch>
    </>
   );
}

export default App;
