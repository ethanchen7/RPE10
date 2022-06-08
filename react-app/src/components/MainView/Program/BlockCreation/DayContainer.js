import "./DayContainer.css";
const DayContainer = ({ day, number }) => {
  return (
    <div className="day-row">
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
