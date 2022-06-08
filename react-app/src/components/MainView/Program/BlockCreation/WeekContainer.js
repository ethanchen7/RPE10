import { useDispatch, useSelector } from "react-redux";
import DayContainer from "./DayContainer";
import { addDay } from "../../../../store/day";
import { removeWeek } from "../../../../store/week";
import { MdOutlineClear } from "react-icons/md";
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

  const handleDeleteWeek = () => {
    dispatch(removeWeek(week.id));
  };

  return (
    <div className="week-container">
      <div className="week-label-container">
        <h1 className="week-label">{`Week ${number}`}</h1>
        <MdOutlineClear onClick={handleDeleteWeek} />
      </div>
      <div className="week-table-header">
        <h3></h3>
        <h3>Day</h3>
        <h3>Exercise Name</h3>
        <h3>Weight</h3>
        <h3># of Sets</h3>
        <h3># of Reps</h3>
        <h3>Intended RPE</h3>
      </div>
      {weekDays
        ? weekDays.map((day, id) => (
            <DayContainer day={day} key={`day-${id + 1}`} number={id + 1} />
          ))
        : ""}
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="submit" value="+ Add Day" className="add-day-btn" />
        </form>
      </div>
    </div>
  );
};

export default WeekContainer;
