import React, { useState } from "react";


const Form = () => {
  const [data, setData] = useState({
    name: "",
    metamaskadd: "",
    emailid:"",
  });

  const onSubmitForm = (event) => {
    event.preventDefault();
    const { name, metamaskadd,emailid } = event.target;
    setData({
      name: name.value,
      metamaskadd: metamaskadd.value,
      emailid:emailid.value,
    });
  };

  return (
    <div style={{ background:"whitesmoke" , width: "390px",padding:"10px 10px", margin: "40px auto" ,color:"black" }}>
      <form
        onSubmit={(e) => onSubmitForm(e)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />

        <label htmlFor="metamaskadd">Metamask Id: </label>
        <input type="text" name="metamaskadd" />
        <label htmlFor="emailid">Email Id: </label>
        <input type="email" name="emailid" />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br/><br/>
      <div className="border border-dark p-auto m-auto">
        <h4>Your Info</h4>
        <p>Name: {data.name}</p>
        <p>Metamask Address: {data.metamaskadd}</p>
        <p>Email Id: {data.emailid}</p>
      </div>
    </div>
  );
};

export default Form;