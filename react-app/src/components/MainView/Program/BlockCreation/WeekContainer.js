import { useDispatch, useSelector } from "react-redux";
import DayContainer from "./DayContainer";
import { addDay } from "../../../../store/day";
import "./WeekContainer.css";

const WeekContainer = ({ week, number }) => {
  const dispatch = useDispatch();
  const dayObjects = useSelector((state) => state.day);
  const weekDays = Object.values(dayObjects).filter(
    (day) => day.week_id === week.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDay(week.id));
  };
  console.log(weekDays, "***weekdays***");
  return (
    <div className="week-container">
      <div className="week-label">{`Week ${number}`}</div>
      <div className="week-table-header">
        <p>Day</p>
        <p>Exercise Name</p>
        <p>Weight</p>
        <p># of Sets</p>
        <p># of Reps</p>
        <p>Intended RPE</p>
      </div>
      {weekDays
        ? weekDays.map((day, id) => (
            <DayContainer day={day} key={`day-${id + 1}`} number={id + 1} />
          ))
        : ""}
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="submit" value="Add Day" />
        </form>
      </div>
    </div>
  );
};

export default WeekContainer;
