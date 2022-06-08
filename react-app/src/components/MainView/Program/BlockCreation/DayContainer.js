import { useDispatch } from "react-redux";
import { MdOutlineClear } from "react-icons/md";
import { removeDay } from "../../../../store/day";
import "./DayContainer.css";

const DayContainer = ({ day, number }) => {
  const dispatch = useDispatch();
  const handleDeleteBtn = () => {
    console.log(day.id);
    dispatch(removeDay(day.id));
  };
  return (
    <div className="day-row">
      <MdOutlineClear onClick={handleDeleteBtn} />
      <div className="day-number">{`Day ${number}`}</div>
      <div className="exercise-name-input">
        <input placeholder="Enter exercise name" />
      </div>
      <div className="exercise-weight-input">
        <input type="number" />
      </div>
      <div className="exercise-sets-input">
        <input type="number" />
      </div>
      <div className="exercise-reps-input">
        <input type="number" />
      </div>
      <div className="exercise-rpe-input">
        <input type="number" />
      </div>
    </div>
  );
};

export default DayContainer;
