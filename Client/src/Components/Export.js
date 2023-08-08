import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
const Export = () => {
  const [modalShow, setModalShow] = useState(false);
  const [exportEmployeeOption,setExportEmployeeOption]=useState("All Employees");
  const [exportMainOption,setExportMainOption]=useState("excel");
  const [exportTimePeriod,setExportTimePeriod]=useState("week");
return(
  <>
  
    <Button onClick={() => setModalShow(true)} variant="success">
      Export
    </Button>
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form style={{alignContent:"center"}}>
        
        <Form.Check // prettier-ignore
         type="radio"
          id="custom-switch"
          label="Selected Employee"
        />
        <Form.Check // prettier-ignore
           type="radio"
          label="All Employees"
          id="disabled-custom-switch"
        />
      </Form>
      <br></br>
      <Form>
        
      <Form.Check // prettier-ignore
        type="radio"
        id="custom-switch"
        label="Week"
      />
      <Form.Check // prettier-ignore
         type="radio"
        label="Month"
        id="disabled-custom-switch"
      />
    </Form>
    <br></br>
      <Form>

      <Form.Check // prettier-ignore
        type="radio"
        id="custom-switch"
        label="excel"
      />
      <Form.Check // prettier-ignore
         type="radio"
        label="to employee"
        id="disabled-custom-switch"
      />
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  </>);
};

export default Export;
