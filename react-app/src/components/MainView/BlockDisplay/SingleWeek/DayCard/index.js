import "./index.css";
const DayCard = ({ day, number }) => {
  console.log(day);
  const exerciseArr = Object.values(day.exercises);
  console.log(exerciseArr);
  return (
    <div className="day-note-parent-container">
      <div className="day-card-container">
        <div className="day-card-left">
          <h1>Day</h1>
          <h1>{`${number}`}</h1>
        </div>
        <div className="day-card-right">
          <div className={`day-card-exercises length-${exerciseArr.length}`}>
            {exerciseArr.map((exercise) => {
              return (
                <p>
                  <span>{`${exercise.name}`}</span>
                  {` ${exercise.weight}lbs ${exercise.sets}x${exercise.reps} @${exercise.rpe}`}
                </p>
              );
            })}
          </div>
          <div className="day-card-footer">
            <p>Volume Component</p>
            <p>RPE Component</p>
          </div>
        </div>
      </div>
      <div className="day-notepad-container">
        <textarea placeholder="Any thoughts?" />
      </div>
    </div>
  );
};

export default DayCard;
