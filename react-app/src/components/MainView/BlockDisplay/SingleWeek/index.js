import { useSelector } from "react-redux";
import DayCard from "./DayCard";
import "./index.css";

const SingleWeek = ({ currentWeek }) => {
  const weeks = useSelector((state) => state.week);
  let week;
  if (currentWeek !== 0) {
    week = weeks[currentWeek];
  }
  console.log(currentWeek);
  let dayObjects;
  if (week) {
    dayObjects = Object.values(week.days);
  }

  return (
    <div className="day-cards-container">
      {dayObjects?.map((day, idx) => (
        <DayCard number={idx + 1} day={day} />
      ))}
    </div>
  );
};

export default SingleWeek;
