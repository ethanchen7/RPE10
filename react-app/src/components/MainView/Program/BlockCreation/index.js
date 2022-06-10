import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import SideBar from "../../SideBar";
import WeekContainer from "./WeekContainer";
import { addWeek } from "../../../../store/week";
import { putBlock } from "../../../../store/block";
import { removeBlock } from "../../../../store/block";
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

  const handleUpdateBlock = () => {
    const payload = {
      name: blockName,
    };
    dispatch(putBlock(blockId, payload));
  };

  const handleDeleteBlock = () => {
    dispatch(removeBlock(blockId));
    history.push("/program");
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
          <button className="delete-block-btn" onClick={handleDeleteBlock}>
            Delete Block
          </button>
          {/* <BsPencil /> */}
        </div>

        <button
          className="add-week-btn"
          onClick={handleAddWeek}
          ref={addWeekBtn}
        >
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
