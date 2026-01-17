import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        {/* HERO CARD */}
        <div className="hero-card">
          <h2>Your Career Dashboard</h2>
          <p>Track your progress, explore paths, and plan your future.</p>
          <button>Explore Careers</button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">Card 1</div>
          <div className="stat-card">Card 2</div>
          <div className="stat-card">Card 3</div>
          <div className="stat-card">Card 4</div>
        </div>

        {/* CHART AREA */}
        <div className="chart-grid">
          <div className="chart-box">Graph Placeholder</div>
          <div className="chart-box">Graph Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
