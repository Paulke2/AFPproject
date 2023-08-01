
import { Button } from "react-bootstrap";
const moment = require("moment");
const GetTime = (props) =>{
    
    //const DateToCheck =moment().format('L');
  
    // Create a moment object with the specifieD date
    const specificDate = moment(props.dateToCheck);
  
    // Get the start of the week (Sunday in the US, Monday in other regions)
    const startOfWeek = specificDate.clone().startOf("isoWeek");
  
    // Get the end of the week (Saturday in the US, Sunday in other regions)
    const endOfWeek = specificDate.clone().endOf("isoWeek");
  
    // Now you have the start and end dates of the specified week
  
    return(<><Button
        onClick={() => props.setDateToCheck(startOfWeek.subtract(1, "days"))}
      ></Button>
      {startOfWeek.format("l").toString()} -{" "}
      {endOfWeek.format("l").toString()}
      <Button
        onClick={() => props.setDateToCheck(endOfWeek.add(1, "days"))}
      ></Button></>);

}

export default GetTime;