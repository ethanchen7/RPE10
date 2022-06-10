import { useSelector } from "react-redux";
import DayCard from "./DayCard";
import "./index.css";

const SingleWeek = ({ currentWeek }) => {
  const weeks = useSelector((state) => state.week);
  const allDays = useSelector((state) => state.day);
  const currentWeekDaysArr = Object.values(allDays);
  const currentWeekDays = currentWeekDaysArr.filter(
    (day) => day.week_id === parseInt(currentWeek)
  );

  return (
    <div className="day-cards-container">
      {currentWeekDays?.map((day, idx) => (
        <DayCard number={idx + 1} day={allDays[day.id]} key={`day-${day.id}`} />
      ))}
    </div>
  );
};

export default SingleWeek;
