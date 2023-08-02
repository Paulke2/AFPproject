

const DisplayTimeCard = (props) => {
  return props.currentTimeCard !== null ? <div>
    {props.currentTimeCard.employeeName}~{props.currentTimeCard.startofWeek}
  </div> : <></>;
};

export default DisplayTimeCard;
