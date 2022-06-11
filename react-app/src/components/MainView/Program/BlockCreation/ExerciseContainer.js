import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import { putExercise } from "../../../../store/exercise";
import { removeExercise } from "../../../../store/exercise";
import "./ExerciseContainer.css";
import { setDays } from "../../../../store/day";

// const calculateTotalVolume = (weight, sets, reps) => {
//   let totalVolume;
//   // if sets or reps are 0, the exercise is incomplete, and we will omit it
//   if (sets !== 0 || reps !== 0) {
//     // accessory work defaults to 80 lb average
//     if (weight !== 0) {
//       totalVolume = weight * sets * reps;
//     } else {
//       totalVolume = 80 * sets * reps;
//     }
//   }

//   return totalVolume;
// };

const ExerciseContainer = ({ day, exercise }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);

  const [exerciseName, setExerciseName] = useState(
    exercise ? exercise.name : ""
  );
  const [weight, setWeight] = useState(exercise ? exercise.weight : 0);
  const [sets, setSets] = useState(exercise ? exercise.sets : 0);
  const [reps, setReps] = useState(exercise ? exercise.reps : 0);
  const [rpe, setRPE] = useState(exercise ? exercise.rpe : 0);

  useEffect(() => {
    if (exercise) {
      setExerciseName(exercise.name);
      setWeight(exercise.weight);
      setSets(exercise.sets);
      setReps(exercise.reps);
      setRPE(exercise.rpe);
    }
  }, [exercise]);

  const handleDeleteBtn = () => {
    dispatch(removeExercise(exercise.id));
  };

  const handleUpdate = async () => {
    // const totalVol = calculateTotalVolume(weight, sets, reps);
    const payload = {
      name: exerciseName,
      weight,
      sets,
      reps,
      rpe,
      // total_vol: totalVol,
    };
    dispatch(putExercise(exercise.id, payload));
    const response = await fetch(`/api/users/${session.id}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setDays(data.days));
    }
  };

  return (
    <div className="exercise-row">
      <div>{""}</div>
      <MdOutlineClear onClick={handleDeleteBtn} />
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

export default ExerciseContainer;
