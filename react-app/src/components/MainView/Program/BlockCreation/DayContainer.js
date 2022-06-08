import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import { putExercise } from "../../../../store/exercise";

import { removeDay } from "../../../../store/day";
import "./DayContainer.css";

const DayContainer = ({ day, number }) => {
  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercise);
  const exerciseInfo = Object.values(exercises).find(
    (exercise) => exercise.day_id === parseInt(day.id)
  );
  console.log(exerciseInfo);
  console.log(exerciseInfo?.name);

  const [exerciseName, setExerciseName] = useState(
    exerciseInfo ? exerciseInfo.name : ""
  );
  const [weight, setWeight] = useState(exerciseInfo ? exerciseInfo.weight : 0);
  const [sets, setSets] = useState(exerciseInfo ? exerciseInfo.sets : 0);
  const [reps, setReps] = useState(exerciseInfo ? exerciseInfo.reps : 0);
  const [rpe, setRPE] = useState(exerciseInfo ? exerciseInfo.rpe : 0);

  useEffect(() => {
    if (exerciseInfo) {
      setExerciseName(exerciseInfo.name);
      setWeight(exerciseInfo.weight);
      setSets(exerciseInfo.sets);
      setReps(exerciseInfo.reps);
      setRPE(exerciseInfo.rpe);
    }
  }, [exercises]);

  const handleDeleteBtn = () => {
    dispatch(removeDay(day.id));
  };

  const handleUpdate = () => {
    const payload = {
      name: exerciseName,
      weight,
      sets,
      reps,
      rpe,
    };
    dispatch(putExercise(exerciseInfo.id, payload));
  };
  console.log("component rendering");
  return (
    <div className="day-row">
      <MdOutlineClear onClick={handleDeleteBtn} />
      <div className="day-number">{`Day ${number}`}</div>
      <div className="exercise-name-input">
        <input
          placeholder="Enter exercise name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>
      <div className="exercise-weight-input">
        <input
          type="number"
          placeholder="(LBs)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>
      <div className="exercise-sets-input">
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>
      <div className="exercise-reps-input">
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>
      <div className="exercise-rpe-input">
        <input
          type="number"
          value={rpe}
          onChange={(e) => setRPE(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>
    </div>
  );
};

export default DayContainer;
