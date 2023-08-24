import CardGroup from "react-bootstrap/CardGroup";
import { useEffect, useState } from "react";
import updateTimeCardDay from "../functions/updateTimeCardDay";
import fetchTimeCard from "../functions/fetchTimeCard";
import "./WeekLayout.css";
import getTotalHoursForDay from "../functions/getTotalHoursForDay";

import WeekCard from "./WeekCard";
const moment = require("moment");
import Alert from "react-bootstrap/Alert";
const WeekLayout = (props) => {
  //map over time employees time cards. if one matches the week, we want to load it. else, cr
  //create a time sheet
  const specificDate = moment(props.dateToCheck);
  const startOfWeek = specificDate.clone().startOf("isoWeek");
  const [error, setError] = useState(null);
  const [SundayString, setSundayString] = useState("");
  const [MondayString, setMondayString] = useState("");
  const [TuesdayString, setTuesdayString] = useState("");
  const [WednesdayString, setWednesdayString] = useState("");
  const [ThursdayString, setThursdayString] = useState("");
  const [FridayString, setFridayString] = useState("");
  const [SaturdayString, setSaturdayString] = useState("");
  const [SundayJobList, setSundayJobList] = useState([]);
  const [MondayJobList, setMondayJobList] = useState([]);
  const [TuesdayJobList, setTuesdayJobList] = useState([]);
  const [WednesdayJobList, setWednesdayJobList] = useState([]);
  const [ThursdayJobList, setThursdayJobList] = useState([]);
  const [FridayJobList, setFridayJobList] = useState([]);
  const [SaturdayJobList, setSaturdayJobList] = useState([]);
  const [SundayNumber, setSundayNumber] = useState();
  const [MondayNumber, setMondayNumber] = useState();
  const [TuesdayNumber, setTuesdayNumber] = useState();
  const [WednesdayNumber, setWednesdayNumber] = useState();
  const [ThursdayNumber, setThursdayNumber] = useState();
  const [FridayNumber, setFridayNumber] = useState();
  const [SaturdayNumber, setSaturdayNumber] = useState();
  const [totalSundayNumber, setTotalSundayNumber] = useState(0);
  const [totalMondayNumber, setTotalMondayNumber] = useState(0);
  const [totalTuesdayNumber, setTotalTuesdayNumber] = useState(0);
  const [totalWednesdayNumber, setTotalWednesdayNumber] = useState(0);
  const [totalThursdayNumber, setTotalThursdayNumber] = useState(0);
  const [totalFridayNumber, setTotalFridayNumber] = useState(0);
  const [totalSaturdayNumber, setTotalSaturdayNumber] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const getStringForDay = (dayNumber, dayString) => {
    return dayNumber !== undefined && dayNumber !== NaN && dayString !== ""
      ? dayString + "-" + "REG" + dayNumber.toString()
      : "";
  };
  const determineOfficeWorker = (weekDay) => {
  
    return props?.currentTimeCard?.[weekDay] !== "" &&
      props?.currentTimeCard?.[weekDay] !== undefined
      ? props?.currentTimeCard?.[weekDay]?.split(",")
      : props?.currentEmployee?.officeWorker
      ? ["Office" + "-REG" + props?.currentEmployee?.officeWorkerHours.toString()]
      : [];
  };
  useEffect(() => {
    setSundayJobList(
      props?.currentTimeCard?.Sunday !== "" &&
        props?.currentTimeCard?.Sunday !== undefined
        ? props?.currentTimeCard?.Sunday.split(",")
        : []
    );
    setMondayJobList(determineOfficeWorker("Monday"));
    setTuesdayJobList(determineOfficeWorker("Tuesday"));
    setWednesdayJobList(determineOfficeWorker("Wednesday"));
    setThursdayJobList(determineOfficeWorker("Thursday"));
    setFridayJobList(determineOfficeWorker("Friday"));
    setSaturdayJobList(
      props?.currentTimeCard?.Saturday !== "" &&
        props?.currentTimeCard?.Saturday !== undefined
        ? props?.currentTimeCard?.Saturday.split(",")
        : []
    );
  }, [
    props?.currentEmployee,
    props?.currentTimeCard?.Sunday,
    props?.currentTimeCard?.Monday,
    props?.currentTimeCard?.Tuesday,
    props?.currentTimeCard?.Wednesday,
    props?.currentTimeCard?.Thursday,
    props?.currentTimeCard?.Friday,
    props?.currentTimeCard?.Saturday,

  ]);

  useEffect(() => {

    setTotalSundayNumber(getTotalHoursForDay(SundayJobList));
    setTotalMondayNumber(getTotalHoursForDay(MondayJobList));
    setTotalTuesdayNumber(getTotalHoursForDay(TuesdayJobList));
    setTotalWednesdayNumber(getTotalHoursForDay(WednesdayJobList));
    setTotalThursdayNumber(getTotalHoursForDay(ThursdayJobList));
    setTotalFridayNumber(getTotalHoursForDay(FridayJobList));
    setTotalSaturdayNumber(getTotalHoursForDay(SaturdayJobList));
 
  }, [
    SundayJobList,
    MondayJobList,
    TuesdayJobList,
    ThursdayJobList,
    FridayJobList,
    SaturdayJobList,
    WednesdayJobList,
  ]);
  const getTotalHours = () => {
    return (
      totalMondayNumber +
      totalTuesdayNumber +
      totalWednesdayNumber +
      totalThursdayNumber +
      totalFridayNumber +
      totalSaturdayNumber +
      totalSundayNumber +
      getWeekNumbers()
    );
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleButtonClick = () => {
    setShowAlert(true);
  };
  const getWeekNumbers = () => {
    const total =
      (MondayNumber ? parseInt(MondayNumber) : 0) +
      (SundayNumber ? parseInt(SundayNumber) : 0) +
      (TuesdayNumber ? parseInt(TuesdayNumber) : 0) +
      (WednesdayNumber ? parseInt(WednesdayNumber) : 0) +
      (ThursdayNumber ? parseInt(ThursdayNumber) : 0) +
      (FridayNumber ? parseInt(FridayNumber) : 0) +
      (SaturdayNumber ? parseInt(SaturdayNumber) : 0);

    return total;
  };
  const handleSave = async (event) => {
    event.preventDefault();
    if (props.currentEmployee) {
      if (
        !props.currentTimeCard ||
        props.currentEmployee.timeCards.some(
          (timeCard) => timeCard.startOfWeek === startOfWeek.format("l")
        )
      ) {
        //this is when is a brand new week.

        console.log("brand new week");
        console.log(MondayJobList?.join(",")+(MondayString&& MondayNumber ? ","+MondayString+"-REG"+MondayNumber:""))
        const timeCard = props.currentEmployee.officeWorker
          ? {
              startOfWeek: startOfWeek.format("l"),
              Sunday: SundayJobList?.join(",")+(SundayString&& SundayNumber ? SundayString+"-REG"+SundayNumber:""),

              Monday: MondayJobList?.join(",")+(MondayString&& MondayNumber ? ","+MondayString+"-REG"+MondayNumber:""),
              Tuesday: TuesdayJobList?.join(",")+(TuesdayString&& TuesdayNumber ? ","+TuesdayString+"-REG"+TuesdayNumber:""),
              Wednesday: WednesdayJobList?.join(",")+(WednesdayString&& WednesdayNumber ? ","+WednesdayString+"-REG"+WednesdayNumber:""),
              Thursday: ThursdayJobList?.join(",")+(ThursdayString&& ThursdayNumber ? ","+ThursdayString+"-REG"+ThursdayNumber:""),
              Friday: FridayJobList?.join(",")+(FridayString&& FridayNumber ? ","+FridayString+"-REG"+FridayNumber:""),
              Saturday: SaturdayJobList?.join(",")+(SaturdayString&& SaturdayNumber ? ","+SaturdayString+"-REG"+SaturdayNumber:""),
              employeeName: props.currentEmployee.employeeName,
              totalHours: getTotalHours(),
            }
          : {
              startOfWeek: startOfWeek.format("l"),
              Sunday: getStringForDay(SundayNumber, SundayString),
              Monday: getStringForDay(MondayNumber, MondayString),
              Tuesday: getStringForDay(TuesdayNumber, TuesdayString),
              Wednesday: getStringForDay(WednesdayNumber, WednesdayString),
              Thursday: getStringForDay(ThursdayNumber, ThursdayString),
              Friday: getStringForDay(FridayNumber, FridayString),
              Saturday: getStringForDay(SaturdayNumber, SaturdayString),
              employeeName: props.currentEmployee.employeeName,
              totalHours: getTotalHours(),
            };

        const response = await fetch("/timeCards/", {
          method: "POST",
          body: JSON.stringify(timeCard),
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
        } else {
          setError(null);
          console.log("new card added", json);

          props.setCurrentTimeCard(json);
          let updatedWeekCards = {
            ...props.currentWeekCards,
            [props.currentEmployee.employeeName]: json,
          };
          props.setCurrentWeekCards(updatedWeekCards);
        }

        const updatedTimeCards = [
          ...props.currentEmployee.timeCards,
          startOfWeek.format("l") + "~~" + json._id.toString(),
        ];
        const newTimeCards = { timeCards: updatedTimeCards };
        const employeesResponse = await fetch(
          `/employees/${props.currentEmployee._id}`,
          {
            method: "PATCH",
            body: JSON.stringify(newTimeCards),
            headers: { "Content-Type": "application/json" },
          }
        );

        const EmployeeJson = await employeesResponse.json();

        if (!employeesResponse.ok) {
          setError(EmployeeJson.error);
        } else {
          setError(null);

          console.log("employee time card updated", EmployeeJson);
          props.setCurrentEmployee(EmployeeJson);

          // Update props.employees with the updated employee information
          const updatedEmployees = props.employees.map((existingEmployee) => {
            if (existingEmployee._id === EmployeeJson._id) {
              return EmployeeJson; // Replace the existing employee with the updated employee
            }
            return existingEmployee;
          });

          props.setEmployees(updatedEmployees);
        }
      } else {
        //if its not a new time card, we need to update our new card.

        const timeCard = {
          startOfWeek: startOfWeek.format("l"),
          Sunday: updateTimeCardDay(
            SundayString,
            SundayNumber,
            SundayJobList,
            props.currentTimeCard.Sunday
          ),
          Monday: updateTimeCardDay(
            MondayString,
            MondayNumber,
            MondayJobList,
            props.currentTimeCard.Monday
          ),
          Tuesday: updateTimeCardDay(
            TuesdayString,
            TuesdayNumber,
            TuesdayJobList,
            props.currentTimeCard.Tuesday
          ),
          Wednesday: updateTimeCardDay(
            WednesdayString,
            WednesdayNumber,
            WednesdayJobList,
            props.currentTimeCard.Wednesday
          ),
          Thursday: updateTimeCardDay(
            ThursdayString,
            ThursdayNumber,
            ThursdayJobList,
            props.currentTimeCard.Thursday
          ),
          Friday: updateTimeCardDay(
            FridayString,
            FridayNumber,
            FridayJobList,
            props.currentTimeCard.Friday
          ),
          Saturday: updateTimeCardDay(
            SaturdayString,
            SaturdayNumber,
            SaturdayJobList,
            props.currentTimeCard.Saturday
          ),
          employeeName: props.currentEmployee.employeeName,
          totalHours: getTotalHours(),
        };

        const timeCardId = await fetchTimeCard(props.currentTimeCard._id);
        const response = await fetch(`/timeCards/${timeCardId._id}`, {
          method: "PATCH",
          body: JSON.stringify(timeCard),
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
        } else {
          setError(null);
          console.log("card updated", json);

          props.setCurrentTimeCard(json);
          //dont even think i need to do these two lines bellow. ill just leave them in for now
          let updatedWeekCards = {
            ...props.currentWeekCards,
            [props.currentEmployee.employeeName]: json,
          };
          props.setCurrentWeekCards(updatedWeekCards);
        }
      }
      //clearing form options

      setSundayNumber(NaN);
      setMondayNumber(NaN);
      setTuesdayNumber(NaN);
      setWednesdayNumber(NaN);
      setFridayNumber(NaN);
      setSaturdayNumber(NaN);
      setSundayString("");
      setMondayString("");
      setTuesdayString("");
      setWednesdayString("");
      setThursdayNumber(NaN);
      setThursdayString("");
      setFridayString("");
      setSaturdayString("");
    } else {
      handleButtonClick();
    }
  };

  return (
    <>
      <Alert
        className="NoEmployeeAlert"
        hidden={!showAlert}
        variant="danger"
        onClose={handleAlertClose}
        dismissible
      >
        Please select an employee to apply this time card.
      </Alert>
      <CardGroup style={{ height: "60vh", padding: "10px" }}>
        <WeekCard
          dayTitle="Sunday"
          jobList={SundayJobList}
          setJobList={setSundayJobList}
          jobString={SundayString}
          jobNumber={SundayNumber}
          onJobStringChange={(selected) => setSundayString(selected[0])}
          onJobNumberChange={(event) => setSundayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalSundayNumber}
          ProjectNames={props.ProjectNames}
        />
        <WeekCard
          dayTitle="Monday"
          jobList={MondayJobList}
          setJobList={setMondayJobList}
          jobString={MondayString}
          jobNumber={MondayNumber}
          onJobStringChange={(selected) => setMondayString(selected[0])}
          onJobNumberChange={(event) => setMondayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalMondayNumber}
          ProjectNames={props.ProjectNames}
        />
        <WeekCard
          dayTitle="Tuesday"
          jobList={TuesdayJobList}
          setJobList={setTuesdayJobList}
          jobString={TuesdayString}
          jobNumber={TuesdayNumber}
          onJobStringChange={(selected) => setTuesdayString(selected[0])}
          onJobNumberChange={(event) => setTuesdayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalTuesdayNumber}
          ProjectNames={props.ProjectNames}
        />
        <WeekCard
          dayTitle="Wednesday"
          jobList={WednesdayJobList}
          setJobList={setWednesdayJobList}
          jobString={WednesdayString}
          jobNumber={WednesdayNumber}
          onJobStringChange={(selected) => setWednesdayString(selected[0])}
          onJobNumberChange={(event) => setWednesdayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalWednesdayNumber}
          ProjectNames={props.ProjectNames}
        />
        <WeekCard
          dayTitle="Thursday"
          jobList={ThursdayJobList}
          setJobList={setThursdayJobList}
          jobString={ThursdayString}
          jobNumber={ThursdayNumber}
          onJobStringChange={(selected) => setThursdayString(selected[0])}
          onJobNumberChange={(event) => setThursdayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalThursdayNumber}
          ProjectNames={props.ProjectNames}
        />
        <WeekCard
          dayTitle="Friday"
          jobList={FridayJobList}
          setJobList={setFridayJobList}
          jobString={FridayString}
          jobNumber={FridayNumber}
          onJobStringChange={(selected) => setFridayString(selected[0])}
          onJobNumberChange={(event) => setFridayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalFridayNumber}
          ProjectNames={props.ProjectNames}
        />
        <WeekCard
          dayTitle="Saturday"
          jobList={SaturdayJobList}
          setJobList={setSaturdayJobList}
          jobString={SaturdayString}
          jobNumber={SaturdayNumber}
          onJobStringChange={(selected) => {
            setSaturdayString(selected[0]);
          }}
          onJobNumberChange={(event) => setSaturdayNumber(event.target.value)}
          onSave={handleSave}
          totalHours={totalSaturdayNumber}
          ProjectNames={props.ProjectNames}
        />
      </CardGroup>
    </>
  );
};

export default WeekLayout;
