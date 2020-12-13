import React, { SyntheticEvent, useState } from "react";
import axios from 'axios'

const URL = "http://localhost:5000/user";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    hex: "",
    email:"",
  });
  const [responseFromServer, setResponseFromServer] = useState({
    color:'',
    message:''
  });
  const onSubmitForm = async (event:SyntheticEvent) => {
    event.preventDefault();
    try{
     const response  = await axios.post(URL, data);
     setResponseFromServer({color:'green',message:response.data.message}); 
    }catch(e){
      console.log(e.response.data);
     setResponseFromServer({color:'red',message:e.response.data.error}); 
    }
  };

  const changeHandler = (event:any, attribute:string)=>{
    setData({...data, [attribute]:event.target.value});
  }
  return (
    <div className="row w-100 ">
     <div className=" col-md-8  mx-auto p-4  border border-secondary rounded">
    <div className="border border-info rounded " style={{ background:"white",padding:"10px 10px", margin: " 20px auto" ,color:"black" }}>
      <form
        onSubmit={onSubmitForm}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="name">Name: </label>
        <input type="text" value={data.name} onChange={(e)=>{changeHandler(e,"name")}} name="name" />
        <label htmlFor="metamaskadd">Metamask Id: </label>
        <input type="text" value={data.hex}  onChange={(e)=>{changeHandler(e,"hex")}} name="metamaskadd" />
        <label htmlFor="emailid">Email Id: </label>
        <input type="email" value={data.email}  onChange={(e)=>{changeHandler(e,"email")}} name="emailid" />
        <p style={{color:responseFromServer.color, }}>{responseFromServer.message}</p>
        <button type="submit" className="btn btn-outline-info text-dark m-auto">Submit</button>
      </form>
      
    
      </div>
      <br/>
      <div className="border border-info rounded p-2 m-auto bg-white text-dark">
        <h4>Your Info</h4>
        <p>Name: {data.name}</p>
        <p>Metamask Address: {data.hex}</p>
        <p>Email Id: {data.email}</p>
      </div>
    
    </div>
    </div>
  );
};

export default Form;