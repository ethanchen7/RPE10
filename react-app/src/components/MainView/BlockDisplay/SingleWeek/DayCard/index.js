import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editDay } from "../../../../../store/day";
import { setDays } from "../../../../../store/day";
import ErrorMessage from "../../../../ErrorMessage";
import VolumeTag from "../../Tags/Volume";
import RPETag from "../../Tags/RPE";
import "./index.css";

const DayCard = ({ day, number }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const allExercises = useSelector((state) => state.exercise);
  const exerciseObjects = Object.values(allExercises);
  const exerciseArr = exerciseObjects.filter(
    (exercise) => exercise.day_id === parseInt(day.id)
  );

  const [notes, setNotes] = useState(day.notes);
  const [errorMessages, setErrorMessages] = useState({});

  const handleNoteUpdate = async () => {
    const payload = {
      id: day.id,
      notes,
      week_id: day.week_id,
    };
    const res = await dispatch(editDay(day.id, payload));
    if (res.errors) {
      const errors = {};
      if (Array.isArray(res.errors)) {
        res.errors.forEach((error) => {
          const label = error.split(":")[0].slice(0, -1);
          const message = error.split(":")[1].slice(1);
          errors[label] = message;
        });
      } else {
        errors.overall = res.errors;
      }
      setErrorMessages(errors);
    }
    const response = await fetch(`/api/users/${session.id}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setDays(data.days));
    }
  };

  return (
    <div className="day-note-parent-container">
      <ErrorMessage label={""} message={errorMessages.notes} />
      <div className="day-card-parent">
        <div className="day-card-container">
          <div className="day-card-left">
            <h1>Day</h1>
            <h1>{`${number}`}</h1>
          </div>
          <div className="day-card-right">
            <div className={`day-card-exercises length-${exerciseArr.length}`}>
              {exerciseArr.map((exercise) => {
                if (!exercise.name || !exercise.sets || !exercise.reps) {
                  return "";
                } else {
                  return (
                    <>
                      <span>{`${exercise.name}`}</span>
                      <span>{` ${exercise.weight}lbs`}</span>
                      <span>{` ${exercise.sets}x${exercise.reps}`}</span>
                      <span>{` @${exercise.rpe}`}</span>
                    </>
                  );
                }
              })}
            </div>
            <div className="day-card-footer">
              <VolumeTag volume={Math.floor(day.total_vol / 100)} />
              <RPETag rpe={Math.floor(day.avg_rpe)} />
            </div>
          </div>
        </div>

        <div className="day-notepad-container">
          <textarea
            placeholder="Any thoughts?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            spellCheck={false}
            autoComplete={"false"}
            onBlur={handleNoteUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default DayCard;
