import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import SideBar from "../../SideBar";
import WeekContainer from "./WeekContainer";
import DeleteConfirmationModal from "../DeleteBlock";
import { addWeek } from "../../../../store/week";
import { putBlock } from "../../../../store/block";
import ErrorMessage from "../../../ErrorMessage";
// import { BsPencil } from "react-icons/bs";
import "./index.css";

const BlockCreation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const addWeekBtn = useRef();

  const { blockId } = useParams();

  const blockObjects = useSelector((state) => state.block);
  const weekObjects = useSelector((state) => state.week);
  const blockWeeks = Object.values(weekObjects).filter(
    (week) => week.block_id === parseInt(blockId)
  );
  const blockNumber = location.state.blockNumber;
  const currentBlock = blockObjects[blockId];

  const [blockName, setBlockName] = useState(
    currentBlock ? currentBlock.name : ""
  );
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    if (currentBlock) {
      setBlockName(currentBlock.name);
    }
  }, [blockObjects]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      (e) => {
        if (window.scrollY > 85) {
          addWeekBtn?.current?.classList.add("add-week-sticky");
        } else {
          addWeekBtn?.current?.classList.remove("add-week-sticky");
        }
      },
      true
    );
  }, []);

  const handleAddWeek = () => {
    dispatch(addWeek(blockId));
  };

  const handleUpdateBlock = async () => {
    const payload = {
      name: blockName,
    };
    const update = await dispatch(putBlock(blockId, payload));
    if (update.errors) {
      console.log("hereeee");
      console.log(update.errors);
      const errors = {};
      if (Array.isArray(update.errors)) {
        update.errors.forEach((error) => {
          const label = error.split(":")[0].slice(0, -1);
          const message = error.split(":")[1].slice(1);
          errors[label] = message;
        });
      } else {
        errors.overall = update.errors;
      }
      setErrorMessages(errors);
      console.log(errorMessages);
    } else {
      setErrorMessages({});
    }
  };

  return (
    <>
      <SideBar />
      <div className="program-page-container">
        <div className="page-container-header">
          <h1>{`Editing Block ${blockNumber} - `}</h1>

          <input
            value={blockName}
            onChange={(e) => setBlockName(e.target.value)}
            placeholder="Unnamed"
            onBlur={handleUpdateBlock}
          />
          <DeleteConfirmationModal blockId={blockId} />
        </div>
        {errorMessages ? (
          <ErrorMessage label={""} message={errorMessages.name} />
        ) : (
          ""
        )}

        <p>
          <span style={{ fontWeight: 700 }}>Please note:</span> Exercises that
          are not complete (missing exercise name, sets or reps) will not be
          displayed on the individual Block view.
        </p>
        <p>
          Incomplete exercises will not be factored into average volume or rpe
          calculations.
        </p>
        <p>
          Bodyweight exercises or weights that may vary can be left as 0. Volume
          calculations will be normalized for such exercises.
        </p>
        <button
          className="add-week-btn"
          onClick={handleAddWeek}
          ref={addWeekBtn}
        >
          Add Week
        </button>

        {blockWeeks.length ? (
          blockWeeks.map((week, id) => (
            <WeekContainer
              week={week}
              key={`week-${week.id}`}
              number={id + 1}
            />
          ))
        ) : (
          <h3>Add a week to get started!</h3>
        )}
      </div>
    </>
  );
};

export default BlockCreation;
