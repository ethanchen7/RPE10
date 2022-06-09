import { useState } from "react";
import "./index.css";
const WeekTabs = ({ weekKeys, setCurrentWeek }) => {
  return (
    <div>
      {weekKeys.map((week, idx) => (
        <div onClick={() => setCurrentWeek(week)}>{`Week ${idx + 1}`}</div>
      ))}
    </div>
  );
};
export default WeekTabs;
