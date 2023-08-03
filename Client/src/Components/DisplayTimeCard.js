import { relativeTimeRounding } from "moment";


const DisplayTimeCard = (props) => {
  return( <div>
    Name:{props?.currentTimeCard?.employeeName} Hours:{props?.currentTimeCard?.totalHours}
  </div>);
};

export default DisplayTimeCard;
