import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClear } from "react-icons/md";
import { addExercise } from "../../../../store/exercise";
import { removeDay } from "../../../../store/day";
import "./DayContainer.css";
import ExerciseContainer from "./ExerciseContainer";
import ReactTooltip from "react-tooltip";

const DayContainer = ({ day, number }) => {
  const dispatch = useDispatch();

  const exerciseObjects = useSelector((state) => state.exercise);
  const dayExercises = Object.values(exerciseObjects).filter(
    (exercise) => exercise.day_id === parseInt(day.id)
  );

  const handleDeleteBtn = () => {
    dispatch(removeDay(day.id));
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    dispatch(addExercise(day.id));
  };

  return (
    <>
      <div className="day-row">
        <MdOutlineClear onClick={handleDeleteBtn} />
        <div className="day-number">{`Day ${number}`}</div>
      </div>
      {dayExercises
        ? dayExercises.map((exercise) => (
            <ExerciseContainer
              exercise={exercise}
              day={day}
              key={`exercise-${exercise.id}`}
            />
          ))
        : ""}
      {dayExercises.length < 8 ? (
        <form onSubmit={(e) => handleAddExercise(e)}>
          <input
            type="submit"
            value="+ Add Exercise"
            className="add-exercise-btn"
          />
        </form>
      ) : (
        <>
          <button
            className="add-exercise-btn"
            data-tip="Very ambitious of you, but you can't add more than 8 exercises a day. :("
          >
            + Add Exercise
          </button>
          <ReactTooltip place="bottom" type="error" effect="solid" />
        </>
      )}
    </>
  );
};

export default DayContainer;
