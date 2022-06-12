import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SideBar from "../SideBar";
import SingleWeek from "./SingleWeek";
import "./index.css";

const BlockDisplay = () => {
  const { blockId } = useParams();
  const location = useLocation();

  // block info
  const currentBlockNumber = location.state.number;
  const blockObj = useSelector((state) => state.block);
  const block = blockObj[parseInt(blockId)];

  // week info
  const allWeeks = useSelector((state) => state.week);
  const weekArr = Object.values(allWeeks);
  const weeks = weekArr.filter((week) => week.block_id === parseInt(blockId));

  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    if (weeks !== undefined && weeks.length) {
      setCurrentWeek(weeks[0].id);
    } else {
      setCurrentWeek(0);
    }
  }, [blockId, allWeeks]);

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
                className={`week-tab-label${
                  currentWeek == week.id ? " active" : ""
                }`}
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
