
import { Button } from "react-bootstrap";
import leftArrow from "../pictures/pointsLeft.png"
import rightArrow from "../pictures/pointsRight.png"
const moment = require("moment");
moment.updateLocale("en", {
  week: {
    dow: 0, // Sunday
  },
});

const GetTime = (props) =>{
    
  
    // Create a moment object with the specifieD date
    const specificDate = moment(props.dateToCheck);
  
    // Get the start of the week (Sunday in the US, Monday in other regions)
    const startOfWeek = specificDate.clone().startOf("isoWeek");
    const sundayOffSet = startOfWeek.clone().subtract(1,"days");
    // Get the end of the week (Saturday in the US, Sunday in other regions)
    const endOfWeek = specificDate.clone().endOf("isoWeek");
    const SaturdayOffSet = endOfWeek.clone().subtract(1,"days");
    // Now you have the start and end dates of the specified week
  
    return(<><img src={leftArrow}style={{paddingRight:"20%",cursor: "pointer",height:"50px",paddingTop:"5px"}}
        onClick={() => {
          props.setDateToCheck(startOfWeek.subtract(1, "days"));
          props.setCurrentTimeCard(null);
        }}
      ></img>
      {sundayOffSet.format("l").toString()} -{" "}
      {SaturdayOffSet.format("l").toString()}
      <img src={rightArrow} style={{paddingLeft:"20%",cursor: "pointer",height:"50px",paddingTop:"5px"}}
        onClick={() => {
          props.setDateToCheck(endOfWeek.add(1, "days"));
          props.setCurrentTimeCard(null);
        }}
      ></img></>);

}

export default GetTime;