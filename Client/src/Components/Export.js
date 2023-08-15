import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as XLSX from 'xlsx';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import ExportToWord from "../functions/ExportToWord";

const Export = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [exportEmployeeOption,setExportEmployeeOption]=useState("All Employees");
  const [exportMainOption,setExportMainOption]=useState("Excel");
  const [exportTimePeriod,setExportTimePeriod]=useState("Week");

  
  const handleExportClick = () => {
    if(exportMainOption === "Excel"){
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([props.currentWeekCards[props.currentEmployee.employeeName]]); // Use props.currentTimeCard here
    XLSX.utils.book_append_sheet(wb, ws, 'firstExcel');
  
    XLSX.writeFile(wb, 'firstExcel.xlsx');
    }else{
    const employeesToExport = exportEmployeeOption==="All Employees" ? Object.keys(props.currentWeekCards) : [props.currentEmployee.employeeName]
    ExportToWord(employeesToExport, props.currentWeekCards)
    }
  };

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
          name="exportEmployeeOption"
          value={exportEmployeeOption}
          onClick={()=>setExportEmployeeOption("Employee")}
          label="Selected Employee"
        />
        <Form.Check // prettier-ignore
           type="radio"
           name="exportEmployeeOption"
           value={exportEmployeeOption}
          onClick={()=>setExportEmployeeOption("All Employees")}
          checked={exportEmployeeOption === "All Employees"}
          label="All Employees"
          id="disabled-custom-switch"
        />
      </Form>
      <br></br>
      <Form>
        
      <Form.Check // prettier-ignore
        type="radio"
        id="custom-switch"
        name="exportTimePeriod"
        value={exportTimePeriod}
          onClick={()=>setExportTimePeriod("Week")}
          checked={exportTimePeriod === "Week"}
        label="Week"
      />
      <Form.Check // prettier-ignore
         type="radio"
         name="exportTimePeriod"
        label="Month"
        value={exportTimePeriod}
        onClick={()=>setExportTimePeriod("Month")}
        id="disabled-custom-switch"
      />
    </Form>
    <br></br>
      <Form>

      <Form.Check // prettier-ignore
        type="radio"
        id="custom-switch"
        name="exportMainOption"
        value={exportMainOption}
        checked={exportMainOption === "Excel"}
        onClick={()=>setExportMainOption("Excel")}
        label="excel"
      />
      <Form.Check // prettier-ignore
         type="radio"
        label="to employee"
        name="exportMainOption"
        value={exportMainOption}
        disabled={exportTimePeriod==="Month"}
        onClick={()=>setExportMainOption("Employee")}
        id="disabled-custom-switch"
      />
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
        <Button variant="success" onClick={handleExportClick}>export</Button>
      </Modal.Footer>
    </Modal>
  </>);
};

export default Export;