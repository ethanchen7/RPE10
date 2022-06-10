import SideBar from "../SideBar";
import "./index.css";
const Dashboard = () => {
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
