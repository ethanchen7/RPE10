import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SideBar from "../../SideBar";
import WeekContainer from "./WeekContainer";
import { addWeek } from "../../../../store/week";
import "./index.css";

const BlockCreation = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { blockId } = useParams();

  const weekObjects = useSelector((state) => state.week);
  const blockWeeks = Object.values(weekObjects).filter(
    (week) => week.block_id === parseInt(blockId)
  );
  const blockNumber = location.state.blockNumber;

  const handleAddWeek = () => {
    dispatch(addWeek(blockId));
  };

  return (
    <>
      <SideBar />
      <div className="program-page-container">
        <div className="page-container-header">
          <h1>{`Editing Block ${blockNumber}`}</h1>
        </div>

        <button className="add-week-btn" onClick={handleAddWeek}>
          Add Week
        </button>

        {blockWeeks
          ? blockWeeks.map((week, id) => (
              <WeekContainer
                week={week}
                key={`week-${week.id}`}
                number={id + 1}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default BlockCreation;
