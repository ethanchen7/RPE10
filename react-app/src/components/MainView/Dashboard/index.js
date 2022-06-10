import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWeeks } from "../../../store/week";
import SideBar from "../SideBar";
import "./index.css";
const Dashboard = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const allWeeks = useSelector((state) => state.week);
  const allWeekObj = Object.values(allWeeks);
  // [{week1}, {week2}]
  const weeksSorted = allWeekObj.sort((a, b) => a.block_id - b.block_id);

  let daysArr = [];
  weeksSorted.forEach((week) => daysArr.push(Object.values(week.days)));
  console.log(weeksSorted);
  console.log(daysArr);

  // daysArr.forEach(day => )

  const labels = ["Week 1", "Week 2"];
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: "",
      },
    ],
  };
  useEffect(() => {
    (async () => {
      if (session) {
        const res = await fetch(`/api/users/${session.id}`);
        if (res.ok) {
          const data = await res.json();
          dispatch(setWeeks(data.weeks));
        }
      }
    })();
  }, [dispatch, session]);

  return (
    <div>
      <SideBar />
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Welcome Demo Athlete!</h1>
          <p>Here are your training stats:</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
