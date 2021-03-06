import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWeeks } from "../../../store/week";
import SideBar from "../SideBar";
import VolumeChart from "./VolumeChart";
import RPEChart from "./RPEChart";
import "./index.css";
const Dashboard = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const allWeeks = useSelector((state) => state.week);
  const allWeekObj = Object.values(allWeeks);

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
      <div className="page-container dash">
        <div className="dashboard-header">
          <h1>{`Welcome ${session.first_name} ${session.last_name}!`}</h1>
          <p>Here are your training stats:</p>
        </div>
        <div style={{ width: "1000px" }}>
          <VolumeChart weeks={allWeekObj} />

          <RPEChart weeks={allWeekObj} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
