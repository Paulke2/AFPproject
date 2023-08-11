
import { Button,ListGroup,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchResultFilter from "../functions/SearchResultFilter";
const ProjectJobList = (props)=>{
    let DetermineBackgroundColor=1;
    const determineShow = (projectSearch, name, projectID) => {
        //this function takes projectsearch as a prop
        //and if it matches the job location/project name/project id
        // it will show the project
        return (projectID
          .toString()
          .toLowerCase()
          .includes(projectSearch.toString().toLowerCase()) ||
          name.toLowerCase().includes(projectSearch) ||
          projectSearch.toLowerCase() === "")&& name !== "Office"
          ? true
          : false;
      };
    const navigate = useNavigate();
return (<Card style={{ marginLeft: "50px", width: "90%" }}>
<ListGroup variant="flush">
  {
  props.projects &&
  props.projects.map((project) =>
  SearchResultFilter(props.projectSearch, project.name, project.projectID) ? (
        <ListGroup.Item
        style={{
          backgroundColor:(DetermineBackgroundColor%2?"white":"#F5F5F5"),
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between", // This aligns the content to both ends
          alignItems: "center" // This vertically centers the content
        }}
          onClick={() => navigate("/projects/" + project._id)}
        >
          {project.name} - {project.projectID}
          <div >
          <Button size="sm" hidden={!props.editMode}style={{marginRight:"5px"}}>edit</Button>
          <Button size="sm" hidden={!props.editMode}variant="danger">delete</Button>
          </div>
          <span hidden="true">
          {DetermineBackgroundColor=DetermineBackgroundColor+1}
          </span>
        </ListGroup.Item>
      ) : (
       <></>
      )
    )}
</ListGroup>
</Card>);
}

export default ProjectJobList;