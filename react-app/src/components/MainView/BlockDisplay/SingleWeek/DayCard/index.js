import "./index.css";
const DayCard = () => {
  return (
    <div className="day-note-parent-container">
      <div className="day-card-container">
        <div className="day-card-left">
          <h1>Day</h1>
          <h1>1</h1>
        </div>
        <div className="day-card-right">
          <div className="day-card-exercises">
            <p>Exercise 1</p>
            <p>Exercise 2</p>
            <p>Exercise 3</p>
            <p>Exercise 4</p>
          </div>
          <div className="day-card-footer">
            <p>Volume Component</p>
            <p>RPE Component</p>
          </div>
        </div>
      </div>
      <div className="day-notepad-container">
        <textarea />
      </div>
    </div>
  );
};

export default DayCard;
