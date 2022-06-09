import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import { addExercise } from "../../../../store/exercise";
import { removeDay } from "../../../../store/day";
import "./DayContainer.css";
import ExerciseContainer from "./ExerciseContainer";

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
    console.log("clicked");
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
              key={`exercise-${exercise.id}`}
            />
          ))
        : ""}
      <form onSubmit={(e) => handleAddExercise(e)}>
        <input
          type="submit"
          value="+ Add Exercise"
          className="add-exercise-btn"
        />
      </form>
    </>
  );
};

export default DayContainer;
