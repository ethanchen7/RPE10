import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SideBar from "../SideBar";
import WeekTabs from "./WeekTabs";
import SingleWeek from "./SingleWeek";
import "./index.css";
import { getBlock } from "../../../store/block";
const BlockDisplay = () => {
  const { blockId } = useParams();
  const location = useLocation();
  const currentBlockNumber = location.state.number;

  const blockObj = useSelector((state) => state.block);
  const block = blockObj[parseInt(blockId)];

  let weeks;
  if (block) {
    weeks = Object.values(block.weeks);
  }

  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    if (weeks !== undefined && weeks.length) {
      setCurrentWeek(weeks[0].id);
    } else {
      setCurrentWeek(0);
    }
  }, [block]);

  return (
    <>
      <SideBar />
      <div className="block-page-container">
        <div className="block-page-container-header">
          <div className="header-left">
            <h1>{`Block ${currentBlockNumber}`}</h1>
            <p>{`${block?.name ? block.name : "Unnamed"}`}</p>
          </div>
          <div className="header-right">
            {weeks?.map((week, idx) => (
              <div
                onClick={() => setCurrentWeek(week.id)}
                key={`week-${week.id}`}
              >{`Week ${idx + 1}`}</div>
            ))}
          </div>
        </div>
        <SingleWeek currentWeek={currentWeek} />
      </div>
    </>
  );
};

export default BlockDisplay;
