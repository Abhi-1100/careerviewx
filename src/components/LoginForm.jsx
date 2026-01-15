const LoginForm = ({ nextStep }) => {
  return (
    <div className="login-left">
      <h2>Login</h2>
      <p>Enter your email or mobile number</p>

      <input type="text" placeholder="Email or Mobile" />
      <input type="password" placeholder="Password" />

      <button onClick={nextStep}>Enter</button>
    </div>
  );
};

export default LoginForm;
