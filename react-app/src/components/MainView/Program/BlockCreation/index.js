import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "../../SideBar";
import WeekContainer from "./WeekContainer";
import { addWeek } from "../../../../store/week";

const BlockCreation = () => {
  const dispatch = useDispatch();
  const { blockId } = useParams();
  //   const allBlockObjects = useSelector((state) => state.block);
  //   const currentBlock = allBlockObjects[blockId];
  const weekObjects = useSelector((state) => state.week);
  const blockWeeks = Object.values(weekObjects).filter(
    (week) => week.block_id === parseInt(blockId)
  );

  const handleAddWeek = () => {
    dispatch(addWeek(blockId));
  };

  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="page-container-header">
          <h1>{`Editing Block ${blockId}`}</h1>
        </div>
        <button onClick={handleAddWeek}>Add Week</button>
        {blockWeeks
          ? blockWeeks.map((week, id) => (
              <WeekContainer
                week={week}
                key={`week-${id + 1}`}
                number={id + 1}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default BlockCreation;
