import { Modal, Button } from "react-bootstrap";
import "./DesignJobModal.css"
const DesignJobModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props?.clickedJob?.projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            issues:
            {props?.clickedJob?.comments && props?.clickedJob?.comments?.map((comment) => (
  <div key={comment}>
    {comment}
    <Button variant="danger" className="DeleteJobButton">-</Button>
  </div>
))}
            <br></br>
            Date Due:
            {props?.clickedJob?.dueDate}
            AssignedTo:
            {props?.clickedJob?.assignedTo}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DesignJobModal;
