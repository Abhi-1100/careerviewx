import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import ClassSelection from "../../components/ClassSelection";
import "./Login.css";

const Login = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="login-container">
      {step === 1 && <LoginForm nextStep={() => setStep(2)} />}
      {step === 2 && <ClassSelection />}
    </div>
  );
};

export default Login;
