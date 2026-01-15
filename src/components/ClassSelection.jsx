import { useNavigate } from "react-router-dom";

const ClassSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="class-section">
      <h2>Select Your Current Class</h2>

      <div className="cards">
        <div className="card" onClick={() => navigate("/career-after-10")}>
          <h3>After 10th</h3>
          <p>Explore streams & careers after 10th</p>
        </div>

        <div className="card" onClick={() => navigate("/career-after-12")}>
          <h3>After 12th</h3>
          <p>Explore careers after 12th</p>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
