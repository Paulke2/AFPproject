import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
//home will call this. make a pop-up/modal with prefilled info taken from the cvs. ask if info is correct, then creates a new project.

const NewProject = () => {
  const [show, setShow] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [error, setError]= useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async (event) => {
    event.preventDefault();

    
    const json = await response.json();
    if(!response.ok){
        setError(json.error);
    }
    else{
      setError(null);
      console.log("new plant added",json);
    }
  };

  return (
    <>

    </>
  );
}
export default NewProject;