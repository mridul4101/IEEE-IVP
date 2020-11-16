import React from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from './component/Home/Home';
import Allsurvey from './component/Allsurvey/Allsurvey';
import Mysurvey from './component/Mysurvey/Mysurvey';
import Connectwallet from './component/Connectwallet';
import Help from './component/Help';
import Navbar from './component/Navbar/Navbar';
import Createsurvey from './component/Create/Createsurvey';
import './App.css';

const App=()=> {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/allsurvey" component={Allsurvey}/>
      <Route exact path="/mysurvey" component={Mysurvey}/>
      <Route exact path="/connectwallet" component={Connectwallet}/>
      <Route exact path="/help" component={Help}/>
      <Route exact path="/Createsurvey" component={Createsurvey}/>
      <Redirect to="/"/>
      <Home/>
    </Switch>
    </>
   );
}

export default App;
