import { useSelector } from "react-redux";
import VolumeTag from "../../Tags/Volume";
import RPETag from "../../Tags/RPE";
import "./index.css";
const DayCard = ({ day, number }) => {
  const allExercises = useSelector((state) => state.exercise);
  const exerciseObjects = Object.values(allExercises);
  const exerciseArr = exerciseObjects.filter(
    (exercise) => exercise.day_id === parseInt(day.id)
  );
  // const exerciseArr = Object.values(day.exercises);
  let totalVolume = 0;
  let totalRPE = 0;

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
              totalVolume +=
                exercise.sets *
                exercise.reps *
                (exercise.weight > 0 ? exercise.weight : 80);
              totalRPE += exercise.rpe;

              return (
                <>
                  <span>{`${exercise.name}`}</span>
                  <span>{` ${exercise.weight}lbs`}</span>
                  <span>{` ${exercise.sets}x${exercise.reps}`}</span>
                  <span>{` @${exercise.rpe}`}</span>
                </>
              );
            })}
          </div>
          <div className="day-card-footer">
            <VolumeTag volume={Math.floor(totalVolume / 100)} />
            <RPETag rpe={Math.floor(totalRPE / exerciseArr.length)} />
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
