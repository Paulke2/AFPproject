import { relativeTimeRounding } from "moment";


const DisplayTimeCard = (props) => {
  return( props.currentTimeCard!==null?<div>
    Name:{props?.currentTimeCard?.employeeName} Hours:{props?.currentTimeCard?.totalHours}
  </div>:<div></div>);
};

export default DisplayTimeCard;
